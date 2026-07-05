import { getAdapter, AGENT_IDS } from '../adapters/index.js';
import { parseArgs, defaultContext } from '../cli-helpers.js';
import { formatError, glyph } from '../ui.js';

const HELP = `deckforge uninstall — remove previously installed skills

Usage: deckforge uninstall [--agent claude|codex|opencode|all] [--scope user|project]

Options:
  --agent <name>   Target agent: claude, codex, opencode, or all (default: auto-detect)
  --scope <scope>  Install location: user or project (default: user)
  --help           Show this help

Removes exactly what "install" created, per <target>/.deckforge-manifest.json.
`;

const OPTIONS = {
  agent: { type: 'string' },
  scope: { type: 'string', default: 'user' },
  help: { type: 'boolean', default: false },
};

export async function run(args, ctx = defaultContext()) {
  const parsed = parseArgs(args, OPTIONS);
  if (!parsed.ok) {
    ctx.stderr(formatError(`invalid arguments: ${parsed.message}`, 'run "deckforge uninstall --help" to see valid options'));
    return 1;
  }
  const { values } = parsed;

  if (values.help) {
    ctx.stdout(HELP);
    return 0;
  }

  if (values.scope !== 'user' && values.scope !== 'project') {
    ctx.stderr(formatError(`invalid --scope "${values.scope}"`, 'use --scope user or --scope project'));
    return 1;
  }

  let agentIds;
  if (values.agent) {
    if (values.agent === 'all') {
      agentIds = AGENT_IDS;
    } else if (AGENT_IDS.includes(values.agent)) {
      agentIds = [values.agent];
    } else {
      ctx.stderr(formatError(`unknown agent "${values.agent}"`, `use one of: ${AGENT_IDS.join(', ')}, or all`));
      return 1;
    }
  } else {
    agentIds = AGENT_IDS.filter((id) => getAdapter(id).detect(ctx.env).found);
    if (agentIds.length === 0) {
      ctx.stderr(
        formatError(
          'no supported coding agent was detected on this machine',
          `pass --agent <${AGENT_IDS.join('|')}> to force a target`
        )
      );
      return 2;
    }
  }

  for (const id of agentIds) {
    const adapter = getAdapter(id);
    const result = adapter.uninstall(values.scope, {}, ctx.env);
    if (result.removed.length === 0) {
      ctx.stdout(`${id} (${values.scope}): nothing installed, nothing to do\n`);
    } else {
      ctx.stdout(`${glyph('ok')} ${id} (${values.scope}): removed ${result.removed.length} file(s) from ${result.targetRoot}\n`);
    }
  }

  return 0;
}

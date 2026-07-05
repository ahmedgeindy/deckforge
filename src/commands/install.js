import { getAdapter, AGENT_IDS } from '../adapters/index.js';
import { parseArgs, defaultContext } from '../cli-helpers.js';
import { listBundledSkills } from '../skills.js';
import { packageVersion } from '../version.js';
import { formatError, glyph } from '../ui.js';

const HELP = `deckforge install — install bundled skills into a coding agent

Usage: deckforge install [--agent claude|codex|opencode|all] [--scope user|project] [--force] [--dry-run]

Options:
  --agent <name>   Target agent: claude, codex, opencode, or all (default: auto-detect)
  --scope <scope>  Install location: user or project (default: user)
  --force          Overwrite files that were modified since the last install
  --dry-run        Print planned file operations without writing anything
  --help           Show this help
`;

const OPTIONS = {
  agent: { type: 'string' },
  scope: { type: 'string', default: 'user' },
  force: { type: 'boolean', default: false },
  'dry-run': { type: 'boolean', default: false },
  help: { type: 'boolean', default: false },
};

export async function run(args, ctx = defaultContext()) {
  const parsed = parseArgs(args, OPTIONS);
  if (!parsed.ok) {
    ctx.stderr(formatError(`invalid arguments: ${parsed.message}`, 'run "deckforge install --help" to see valid options'));
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
    ctx.stdout(`Detected agent(s): ${agentIds.join(', ')}\n`);
  }

  const skills = listBundledSkills();
  if (skills.length === 0) {
    ctx.stderr(formatError('no bundled skills found under skills/', 'reinstall deckforge or check the package contents'));
    return 2;
  }

  let hadConflict = false;
  const installOpts = { force: values.force, dryRun: values['dry-run'], cliVersion: packageVersion() };

  for (const id of agentIds) {
    const adapter = getAdapter(id);
    const result = adapter.install(skills, values.scope, installOpts, ctx.env);
    if (!result.ok) {
      hadConflict = true;
      ctx.stderr(
        formatError(
          `${id} (${values.scope}): ${result.conflicts.length} file(s) changed since install: ${result.conflicts.join(', ')}`,
          're-run with --force to overwrite the local changes'
        )
      );
      continue;
    }
    if (values['dry-run']) {
      ctx.stdout(`${id} (${values.scope}) — would install ${skills.length} skill(s) to ${result.targetRoot}:\n`);
      for (const f of result.files) ctx.stdout(`  + ${f}\n`);
      if (result.agentsMdPath) ctx.stdout(`  ~ ${result.agentsMdPath} (managed block)\n`);
    } else {
      ctx.stdout(`${glyph('ok')} ${id} (${values.scope}): installed ${skills.length} skill(s) to ${result.targetRoot}\n`);
      if (result.agentsMdPath) ctx.stdout(`  updated managed block in ${result.agentsMdPath}\n`);
    }
  }

  return hadConflict ? 1 : 0;
}

// `deckforge update` — alias: install --force, restricted to skills whose
// bundled version is newer than what's currently installed for that
// agent/scope. Skills not installed at all are left alone (that's what
// `install` is for); skills already current or ahead are left alone too.

import { getAdapter, AGENT_IDS } from '../adapters/index.js';
import { parseArgs, defaultContext } from '../cli-helpers.js';
import { scopeStatus } from '../skill-status.js';
import { listBundledSkills } from '../skills.js';
import { packageVersion } from '../version.js';
import { formatError, glyph } from '../ui.js';

const HELP = `deckforge update — upgrade installed skills to the bundled versions

Usage: deckforge update [--agent claude|codex|opencode|all] [--scope user|project] [--dry-run]

Equivalent to "install --force", limited to skills that are already
installed and whose bundled version is newer than the installed one.

Options:
  --agent <name>   Target agent: claude, codex, opencode, or all (default: auto-detect)
  --scope <scope>  Install location: user or project (default: user)
  --dry-run        Print planned file operations without writing anything
  --help           Show this help
`;

const OPTIONS = {
  agent: { type: 'string' },
  scope: { type: 'string', default: 'user' },
  'dry-run': { type: 'boolean', default: false },
  help: { type: 'boolean', default: false },
};

export async function run(args, ctx = defaultContext()) {
  const parsed = parseArgs(args, OPTIONS);
  if (!parsed.ok) {
    ctx.stderr(formatError(`invalid arguments: ${parsed.message}`, 'run "deckforge update --help" to see valid options'));
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

  const skills = listBundledSkills();
  const installOpts = { force: true, dryRun: values['dry-run'], cliVersion: packageVersion() };

  for (const id of agentIds) {
    const adapter = getAdapter(id);
    // Check status within this exact scope (not "project shadows user"): we
    // are about to write to `values.scope` specifically, so that's the only
    // installed version that matters for deciding what's stale here.
    const stale = skills.filter((skill) => scopeStatus(adapter, values.scope, skill, ctx.env).status === 'outdated');

    if (stale.length === 0) {
      ctx.stdout(`${id} (${values.scope}): nothing to update\n`);
      continue;
    }

    const result = adapter.install(stale, values.scope, installOpts, ctx.env);
    if (!result.ok) {
      // force:true means installSkillFiles never reports conflicts, but keep the guard for safety.
      ctx.stderr(formatError(`${id} (${values.scope}): update failed`, 're-run "deckforge install --force" directly'));
      continue;
    }
    const label = values['dry-run'] ? 'would update' : 'updated';
    ctx.stdout(`${glyph('ok')} ${id} (${values.scope}): ${label} ${stale.map((s) => s.name).join(', ')}\n`);
  }

  return 0;
}

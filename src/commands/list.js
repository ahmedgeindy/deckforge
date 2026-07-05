import { AGENT_IDS, getAdapter } from '../adapters/index.js';
import { parseArgs, defaultContext } from '../cli-helpers.js';
import { agentStatus } from '../skill-status.js';
import { listBundledSkills } from '../skills.js';
import { formatError, glyph, table } from '../ui.js';

const HELP = `deckforge list — list bundled skills and their install status per agent

Usage: deckforge list [--json]

Options:
  --json   Print machine-readable JSON instead of a table
  --help   Show this help
`;

const OPTIONS = {
  json: { type: 'boolean', default: false },
  help: { type: 'boolean', default: false },
};

const STATUS_GLYPH = {
  current: glyph('ok'),
  outdated: glyph('warn'),
  modified: glyph('warn'),
};

function cell(status) {
  if (status.status === 'not-installed') return '-';
  const suffix = status.status === 'outdated' || status.status === 'modified' ? ` (${status.status})` : '';
  return `${STATUS_GLYPH[status.status]} ${status.installedVersion}${suffix}`;
}

export async function run(args, ctx = defaultContext()) {
  const parsed = parseArgs(args, OPTIONS);
  if (!parsed.ok) {
    ctx.stderr(formatError(`invalid arguments: ${parsed.message}`, 'run "deckforge list --help" to see valid options'));
    return 1;
  }
  const { values } = parsed;

  if (values.help) {
    ctx.stdout(HELP);
    return 0;
  }

  const skills = listBundledSkills();
  const report = skills.map((skill) => {
    const perAgent = {};
    for (const id of AGENT_IDS) {
      perAgent[id] = agentStatus(getAdapter(id), skill, ctx.env);
    }
    return { name: skill.name, version: skill.version, description: skill.description, agents: perAgent };
  });

  if (values.json) {
    ctx.stdout(`${JSON.stringify({ skills: report }, null, 2)}\n`);
    return 0;
  }

  if (report.length === 0) {
    ctx.stdout('No bundled skills found.\n');
    return 0;
  }

  const headers = ['SKILL', 'VERSION', ...AGENT_IDS.map((id) => id.toUpperCase())];
  const rows = report.map((r) => [r.name, r.version, ...AGENT_IDS.map((id) => cell(r.agents[id]))]);
  ctx.stdout(`${table(headers, rows)}\n`);
  return 0;
}

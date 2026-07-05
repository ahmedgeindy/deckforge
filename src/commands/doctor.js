import { spawnSync } from 'node:child_process';

import { AGENT_IDS, getAdapter } from '../adapters/index.js';
import { parseArgs, defaultContext } from '../cli-helpers.js';
import { agentStatus } from '../skill-status.js';
import { listBundledSkills } from '../skills.js';
import { formatError, glyph, table } from '../ui.js';

const HELP = `deckforge doctor — check environment health

Usage: deckforge doctor [--json]

Checks: Node.js version, python3 availability (needed only for
presentation-build-report), which coding agents are detected, and whether
installed skill versions match the bundled ones.

Options:
  --json   Print machine-readable JSON instead of a report
  --help   Show this help
`;

const OPTIONS = {
  json: { type: 'boolean', default: false },
  help: { type: 'boolean', default: false },
};

const MIN_NODE_MAJOR = 18;

function checkNode() {
  const version = process.version;
  const major = Number.parseInt(version.replace(/^v/, '').split('.')[0], 10);
  return { version, ok: major >= MIN_NODE_MAJOR };
}

/** Try `python3 --version` then `python --version`; report whichever answers first. */
function checkPython() {
  for (const command of ['python3', 'python']) {
    const result = spawnSync(command, ['--version'], { encoding: 'utf8' });
    if (result.error || result.status !== 0) continue;
    const raw = `${result.stdout || ''}${result.stderr || ''}`.trim();
    return { found: true, command, version: raw || 'unknown version' };
  }
  return { found: false, command: null, version: null };
}

function skillsReport(env) {
  const skills = listBundledSkills();
  return skills.map((skill) => {
    const agents = {};
    for (const id of AGENT_IDS) agents[id] = agentStatus(getAdapter(id), skill, env);
    return { name: skill.name, version: skill.version, agents };
  });
}

export async function run(args, ctx = defaultContext()) {
  const parsed = parseArgs(args, OPTIONS);
  if (!parsed.ok) {
    ctx.stderr(formatError(`invalid arguments: ${parsed.message}`, 'run "deckforge doctor --help" to see valid options'));
    return 1;
  }
  const { values } = parsed;

  if (values.help) {
    ctx.stdout(HELP);
    return 0;
  }

  const node = checkNode();
  const python = checkPython();
  const agents = AGENT_IDS.map((id) => getAdapter(id).detect(ctx.env));
  const skills = skillsReport(ctx.env);
  const isWindows = process.platform === 'win32';

  const report = {
    node,
    python: { ...python, note: 'only needed for presentation-build-report (5 of 6 skills work without it)' },
    agents,
    skills,
    platform: {
      os: process.platform,
      pythonUtf8Note: isWindows
        ? 'Windows: set PYTHONUTF8=1 before running the presentation-build-report aggregator to avoid console encoding errors.'
        : null,
    },
  };

  const exitCode = node.ok ? 0 : 2;

  if (values.json) {
    ctx.stdout(`${JSON.stringify(report, null, 2)}\n`);
    return exitCode;
  }

  const lines = [];
  lines.push(`${node.ok ? glyph('ok') : glyph('fail')} node ${node.version} (need >=${MIN_NODE_MAJOR})`);
  if (python.found) {
    lines.push(`${glyph('ok')} python: ${python.command} (${python.version})`);
  } else {
    lines.push(`${glyph('warn')} python: not found on PATH — ${report.python.note}`);
  }
  lines.push('');
  lines.push('Agents:');
  for (const a of agents) {
    lines.push(`  ${a.found ? glyph('ok') : glyph('warn')} ${a.agent}: ${a.found ? 'detected' : 'not detected'} (${a.userDir})`);
  }
  ctx.stdout(`${lines.join('\n')}\n`);

  if (skills.length > 0) {
    const headers = ['SKILL', 'BUNDLED', ...AGENT_IDS.map((id) => id.toUpperCase())];
    const rows = skills.map((s) => [
      s.name,
      s.version,
      ...AGENT_IDS.map((id) => (s.agents[id].status === 'not-installed' ? '-' : `${s.agents[id].status} (${s.agents[id].scope})`)),
    ]);
    ctx.stdout(`\n${table(headers, rows)}\n`);
  }

  if (isWindows) {
    ctx.stdout(`\n${glyph('warn')} ${report.platform.pythonUtf8Note}\n`);
  }

  return exitCode;
}

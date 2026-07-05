import fs from 'node:fs';
import path from 'node:path';

import { parseArgs, defaultContext } from '../cli-helpers.js';
import { formatError, glyph } from '../ui.js';

const HELP = `deckforge init — scaffold a new deck workspace

Usage: deckforge init [dir] [--force]

Creates brief.md, sources/, and build/ (with a README explaining what lands
there) under [dir] (default: current directory).

Options:
  --force   Overwrite files that already exist
  --help    Show this help
`;

const OPTIONS = {
  force: { type: 'boolean', default: false },
  help: { type: 'boolean', default: false },
};

const BRIEF_TEMPLATE = `# Deck Brief

## Title
<!-- Working title of the presentation -->

## Audience
<!-- Who is this for? Stance (aligned/neutral/skeptical)? Senior or peer? -->

## Goal
<!-- Must they DECIDE something, CHANGE how they feel/act, UNDERSTAND something, or ACT in the room? -->

## Sources checklist
<!-- List each source doc/data point you plan to draw on. Check it off once it's in sources/. -->
- [ ]
- [ ]
- [ ]
`;

const BUILD_README = `# build/

Pipeline artifacts land here as the DeckForge presentation pipeline runs —
never inside the deliverable/export bundle. Nothing in this directory ships
to the audience.

Expect, per run:
- Per-stage reports (one per pipeline stage: structure, design,
  copywriting, diagram, render, qa)
- \`stage-log.json\` — per-stage tokens/time, appended as each stage completes
- \`execution-report.md\` / \`execution-report.json\` — the final build log
  produced by presentation-build-report (confidence, status, coverage,
  recommendations)

Safe to delete between runs; nothing here is a source input.
`;

function writeScaffoldFile(targetPath, content, force, ctx, results) {
  if (fs.existsSync(targetPath) && !force) {
    results.skipped.push(targetPath);
    return;
  }
  fs.mkdirSync(path.dirname(targetPath), { recursive: true });
  fs.writeFileSync(targetPath, content, 'utf8');
  results.written.push(targetPath);
}

export async function run(args, ctx = defaultContext()) {
  const parsed = parseArgs(args, OPTIONS);
  if (!parsed.ok) {
    ctx.stderr(formatError(`invalid arguments: ${parsed.message}`, 'run "deckforge init --help" to see valid options'));
    return 1;
  }
  const { values, positionals } = parsed;

  if (values.help) {
    ctx.stdout(HELP);
    return 0;
  }

  if (positionals.length > 1) {
    ctx.stderr(formatError('too many arguments', 'usage: deckforge init [dir]'));
    return 1;
  }

  const cwd = ctx.env.cwd ?? process.cwd();
  const targetDir = path.resolve(cwd, positionals[0] ?? '.');

  const results = { written: [], skipped: [] };
  fs.mkdirSync(targetDir, { recursive: true });
  writeScaffoldFile(path.join(targetDir, 'brief.md'), BRIEF_TEMPLATE, values.force, ctx, results);
  writeScaffoldFile(path.join(targetDir, 'sources', '.gitkeep'), '', values.force, ctx, results);
  writeScaffoldFile(path.join(targetDir, 'build', 'README.md'), BUILD_README, values.force, ctx, results);

  for (const p of results.written) ctx.stdout(`${glyph('ok')} wrote ${p}\n`);
  for (const p of results.skipped) ctx.stdout(`${glyph('warn')} skipped ${p} (already exists; use --force to overwrite)\n`);

  ctx.stdout(`\nScaffolded deck workspace at ${targetDir}\n`);
  return 0;
}

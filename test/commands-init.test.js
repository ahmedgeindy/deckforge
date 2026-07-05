import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { test } from 'node:test';

import { run } from '../src/commands/init.js';
import { cleanupEnv, makeCapture, makeEnv } from './_helpers.js';

test('init --help prints usage and exits 0', async () => {
  const cap = makeCapture();
  const code = await run(['--help'], { env: {}, stdout: cap.stdout, stderr: cap.stderr });
  assert.equal(code, 0);
  assert.match(cap.text(), /deckforge init/);
});

test('init scaffolds brief.md, sources/.gitkeep, and build/README.md in the given dir', async () => {
  const env = makeEnv('init-');
  try {
    const cap = makeCapture();
    const code = await run(['my-deck'], { env, stdout: cap.stdout, stderr: cap.stderr });
    assert.equal(code, 0);

    const target = path.join(env.cwd, 'my-deck');
    const brief = fs.readFileSync(path.join(target, 'brief.md'), 'utf8');
    assert.match(brief, /## Title/);
    assert.match(brief, /## Audience/);
    assert.match(brief, /## Goal/);
    assert.match(brief, /Sources checklist/);

    assert.ok(fs.existsSync(path.join(target, 'sources', '.gitkeep')));

    const buildReadme = fs.readFileSync(path.join(target, 'build', 'README.md'), 'utf8');
    assert.match(buildReadme, /stage-log\.json/);
    assert.match(buildReadme, /execution-report\.md/);
    assert.match(buildReadme, /execution-report\.json/);
  } finally {
    cleanupEnv(env);
  }
});

test('init defaults to the current directory when no [dir] is given', async () => {
  const env = makeEnv('init-');
  try {
    const cap = makeCapture();
    await run([], { env, stdout: cap.stdout, stderr: cap.stderr });
    assert.ok(fs.existsSync(path.join(env.cwd, 'brief.md')));
  } finally {
    cleanupEnv(env);
  }
});

test('init does not clobber existing files unless --force is passed', async () => {
  const env = makeEnv('init-');
  try {
    await run([], { env, stdout: () => {}, stderr: () => {} });
    const briefPath = path.join(env.cwd, 'brief.md');
    fs.writeFileSync(briefPath, 'MY CUSTOM CONTENT\n', 'utf8');

    const cap = makeCapture();
    await run([], { env, stdout: cap.stdout, stderr: cap.stderr });
    assert.equal(fs.readFileSync(briefPath, 'utf8'), 'MY CUSTOM CONTENT\n');
    assert.match(cap.text(), /skipped/);

    await run(['--force'], { env, stdout: () => {}, stderr: () => {} });
    assert.notEqual(fs.readFileSync(briefPath, 'utf8'), 'MY CUSTOM CONTENT\n');
  } finally {
    cleanupEnv(env);
  }
});

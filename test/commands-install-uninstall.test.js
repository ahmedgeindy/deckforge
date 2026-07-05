import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { test } from 'node:test';

import { run as install } from '../src/commands/install.js';
import { run as uninstall } from '../src/commands/uninstall.js';
import { cleanupEnv, makeCapture, makeEnv } from './_helpers.js';

test('install --help / uninstall --help print usage and exit 0', async () => {
  const cap1 = makeCapture();
  assert.equal(await install(['--help'], { env: {}, stdout: cap1.stdout, stderr: cap1.stderr }), 0);
  assert.match(cap1.text(), /deckforge install/);

  const cap2 = makeCapture();
  assert.equal(await uninstall(['--help'], { env: {}, stdout: cap2.stdout, stderr: cap2.stderr }), 0);
  assert.match(cap2.text(), /deckforge uninstall/);
});

test('install exits 2 with a --agent fix hint when no agent is detected and none is forced', async () => {
  const env = makeEnv('install-');
  try {
    const cap = makeCapture();
    const code = await install([], { env, stdout: cap.stdout, stderr: cap.stderr });
    assert.equal(code, 2);
    assert.match(cap.errText(), /Error:.*no supported coding agent/i);
    assert.match(cap.errText(), /Fix:.*--agent/);
  } finally {
    cleanupEnv(env);
  }
});

test('install rejects an unknown --agent value with exit 1', async () => {
  const env = makeEnv('install-');
  try {
    const cap = makeCapture();
    const code = await install(['--agent', 'nonexistent'], { env, stdout: cap.stdout, stderr: cap.stderr });
    assert.equal(code, 1);
    assert.match(cap.errText(), /unknown agent/);
  } finally {
    cleanupEnv(env);
  }
});

test('install rejects an unknown --scope value with exit 1', async () => {
  const env = makeEnv('install-');
  try {
    const cap = makeCapture();
    const code = await install(['--agent', 'claude', '--scope', 'galaxy'], { env, stdout: cap.stdout, stderr: cap.stderr });
    assert.equal(code, 1);
    assert.match(cap.errText(), /invalid --scope/);
  } finally {
    cleanupEnv(env);
  }
});

test('install --agent claude --scope project installs all bundled skills and exits 0', async () => {
  const env = makeEnv('install-');
  try {
    const cap = makeCapture();
    const code = await install(['--agent', 'claude', '--scope', 'project'], { env, stdout: cap.stdout, stderr: cap.stderr });
    assert.equal(code, 0);
    assert.ok(fs.existsSync(path.join(env.cwd, '.claude', 'skills', 'presentation-structure', 'SKILL.md')));
    assert.match(cap.text(), /installed 6 skill/);
  } finally {
    cleanupEnv(env);
  }
});

test('install --dry-run plans without writing, then a real install writes, then uninstall removes it', async () => {
  const env = makeEnv('install-');
  try {
    const dry = makeCapture();
    const dryCode = await install(['--agent', 'claude', '--scope', 'project', '--dry-run'], {
      env,
      stdout: dry.stdout,
      stderr: dry.stderr,
    });
    assert.equal(dryCode, 0);
    assert.match(dry.text(), /would install/);
    assert.ok(!fs.existsSync(path.join(env.cwd, '.claude')), 'dry-run must not touch the filesystem');

    await install(['--agent', 'claude', '--scope', 'project'], { env, stdout: () => {}, stderr: () => {} });
    assert.ok(fs.existsSync(path.join(env.cwd, '.claude', 'skills', 'presentation-structure')));

    const uninstallCap = makeCapture();
    const uninstallCode = await uninstall(['--agent', 'claude', '--scope', 'project'], {
      env,
      stdout: uninstallCap.stdout,
      stderr: uninstallCap.stderr,
    });
    assert.equal(uninstallCode, 0);
    assert.ok(!fs.existsSync(path.join(env.cwd, '.claude', 'skills', 'presentation-structure')));
  } finally {
    cleanupEnv(env);
  }
});

test('install refuses a locally modified file (exit 1) and accepts it with --force (exit 0)', async () => {
  const env = makeEnv('install-');
  try {
    await install(['--agent', 'claude', '--scope', 'project'], { env, stdout: () => {}, stderr: () => {} });
    const skillMdPath = path.join(env.cwd, '.claude', 'skills', 'presentation-structure', 'SKILL.md');
    fs.appendFileSync(skillMdPath, '\nlocal edit\n');

    const refusedCap = makeCapture();
    const refusedCode = await install(['--agent', 'claude', '--scope', 'project'], {
      env,
      stdout: refusedCap.stdout,
      stderr: refusedCap.stderr,
    });
    assert.equal(refusedCode, 1);
    assert.match(refusedCap.errText(), /Fix:.*--force/);

    const forcedCode = await install(['--agent', 'claude', '--scope', 'project', '--force'], {
      env,
      stdout: () => {},
      stderr: () => {},
    });
    assert.equal(forcedCode, 0);
    assert.ok(!fs.readFileSync(skillMdPath, 'utf8').includes('local edit'));
  } finally {
    cleanupEnv(env);
  }
});

test('uninstall with nothing installed reports "nothing to do" and exits 0', async () => {
  const env = makeEnv('install-');
  try {
    const cap = makeCapture();
    const code = await uninstall(['--agent', 'claude', '--scope', 'project'], { env, stdout: cap.stdout, stderr: cap.stderr });
    assert.equal(code, 0);
    assert.match(cap.text(), /nothing to do/);
  } finally {
    cleanupEnv(env);
  }
});

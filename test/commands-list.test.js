import assert from 'node:assert/strict';
import { test } from 'node:test';

import { run } from '../src/commands/list.js';
import * as claude from '../src/adapters/claude.js';
import { listBundledSkills } from '../src/skills.js';
import { cleanupEnv, makeCapture, makeEnv } from './_helpers.js';

test('list --help prints usage and exits 0', async () => {
  const cap = makeCapture();
  const code = await run(['--help'], { env: {}, stdout: cap.stdout, stderr: cap.stderr });
  assert.equal(code, 0);
  assert.match(cap.text(), /deckforge list/);
});

test('list --json reports every bundled skill as not-installed in a fresh environment', async () => {
  const env = makeEnv('list-');
  try {
    const cap = makeCapture();
    const code = await run(['--json'], { env, stdout: cap.stdout, stderr: cap.stderr });
    assert.equal(code, 0);

    const { skills } = JSON.parse(cap.text());
    assert.equal(skills.length, listBundledSkills().length);
    for (const skill of skills) {
      assert.equal(skill.agents.claude.status, 'not-installed');
      assert.equal(skill.agents.codex.status, 'not-installed');
      assert.equal(skill.agents.opencode.status, 'not-installed');
    }
  } finally {
    cleanupEnv(env);
  }
});

test('list --json reflects a real install as "current" for that agent', async () => {
  const env = makeEnv('list-');
  try {
    const bundled = listBundledSkills();
    claude.install(bundled, 'user', { cliVersion: '1.0.0' }, env);

    const cap = makeCapture();
    await run(['--json'], { env, stdout: cap.stdout, stderr: cap.stderr });
    const { skills } = JSON.parse(cap.text());

    const structure = skills.find((s) => s.name === 'presentation-structure');
    assert.ok(structure, 'expected presentation-structure in the report');
    assert.equal(structure.agents.claude.status, 'current');
    assert.equal(structure.agents.claude.scope, 'user');
    assert.equal(structure.agents.codex.status, 'not-installed');
  } finally {
    cleanupEnv(env);
  }
});

test('list (table mode) prints a header row naming every agent', async () => {
  const env = makeEnv('list-');
  try {
    const cap = makeCapture();
    const code = await run([], { env, stdout: cap.stdout, stderr: cap.stderr });
    assert.equal(code, 0);
    assert.match(cap.text(), /SKILL/);
    assert.match(cap.text(), /CLAUDE/);
    assert.match(cap.text(), /CODEX/);
    assert.match(cap.text(), /OPENCODE/);
  } finally {
    cleanupEnv(env);
  }
});

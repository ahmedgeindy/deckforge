import assert from 'node:assert/strict';
import { test } from 'node:test';

import { run } from '../src/commands/doctor.js';
import { cleanupEnv, makeCapture, makeEnv } from './_helpers.js';

test('doctor --help prints usage and exits 0', async () => {
  const cap = makeCapture();
  const code = await run(['--help'], { env: {}, stdout: cap.stdout, stderr: cap.stderr });
  assert.equal(code, 0);
  assert.match(cap.text(), /deckforge doctor/);
});

test('doctor --json emits the documented shape and exits 0 on this machine (node >= 18)', async () => {
  const env = makeEnv('doctor-');
  try {
    const cap = makeCapture();
    const code = await run(['--json'], { env, stdout: cap.stdout, stderr: cap.stderr });
    assert.equal(code, 0);

    const report = JSON.parse(cap.text());
    assert.equal(report.node.ok, true);
    assert.match(report.node.version, /^v\d+\.\d+\.\d+/);

    assert.equal(typeof report.python.found, 'boolean');
    assert.ok('note' in report.python);

    assert.equal(report.agents.length, 3);
    for (const agent of report.agents) {
      assert.ok(['claude', 'codex', 'opencode'].includes(agent.agent));
      assert.equal(agent.found, false, `fresh fake env should not detect ${agent.agent}`);
    }

    assert.ok(Array.isArray(report.skills));
    assert.ok(report.skills.length >= 6);
    for (const skill of report.skills) {
      assert.equal(skill.agents.claude.status, 'not-installed');
    }

    assert.ok('platform' in report && 'os' in report.platform);
  } finally {
    cleanupEnv(env);
  }
});

test('doctor rejects unknown options with a one-line problem + fix and exit code 1', async () => {
  const cap = makeCapture();
  const code = await run(['--bogus'], { env: {}, stdout: cap.stdout, stderr: cap.stderr });
  assert.equal(code, 1);
  assert.match(cap.errText(), /Error:/);
  assert.match(cap.errText(), /Fix:/);
});

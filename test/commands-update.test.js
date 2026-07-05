import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { test } from 'node:test';

import { run as install } from '../src/commands/install.js';
import { run as update } from '../src/commands/update.js';
import { readManifest, manifestPath } from '../src/adapters/base.js';
import { cleanupEnv, makeCapture, makeEnv } from './_helpers.js';

test('update --help prints usage and exits 0', async () => {
  const cap = makeCapture();
  const code = await update(['--help'], { env: {}, stdout: cap.stdout, stderr: cap.stderr });
  assert.equal(code, 0);
  assert.match(cap.text(), /deckforge update/);
});

test('update is a no-op when everything installed already matches the bundled version', async () => {
  const env = makeEnv('update-');
  try {
    await install(['--agent', 'claude', '--scope', 'project'], { env, stdout: () => {}, stderr: () => {} });

    const cap = makeCapture();
    const code = await update(['--agent', 'claude', '--scope', 'project'], { env, stdout: cap.stdout, stderr: cap.stderr });
    assert.equal(code, 0);
    assert.match(cap.text(), /nothing to update/);
  } finally {
    cleanupEnv(env);
  }
});

test('update bumps a skill whose manifest-recorded version is older than bundled', async () => {
  const env = makeEnv('update-');
  try {
    await install(['--agent', 'claude', '--scope', 'project'], { env, stdout: () => {}, stderr: () => {} });

    const skillsRoot = path.join(env.cwd, '.claude', 'skills');
    const manifest = readManifest(skillsRoot);
    for (const f of manifest.files) {
      if (f.skill === 'diagram-design') f.skillVersion = '0.9.0';
    }
    fs.writeFileSync(manifestPath(skillsRoot), JSON.stringify(manifest, null, 2), 'utf8');

    const cap = makeCapture();
    const code = await update(['--agent', 'claude', '--scope', 'project'], { env, stdout: cap.stdout, stderr: cap.stderr });
    assert.equal(code, 0);
    assert.match(cap.text(), /updated diagram-design/);

    const after = readManifest(skillsRoot);
    const diagramFiles = after.files.filter((f) => f.skill === 'diagram-design');
    assert.ok(diagramFiles.every((f) => f.skillVersion === '1.0.0'));
  } finally {
    cleanupEnv(env);
  }
});

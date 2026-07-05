import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { test } from 'node:test';

import { run as install } from '../src/commands/install.js';
import { run as uninstall } from '../src/commands/uninstall.js';
import { run as update } from '../src/commands/update.js';
import { readManifest, manifestPath, sha256File } from '../src/adapters/base.js';
import { cleanupEnv, makeCapture, makeEnv } from './_helpers.js';

/**
 * Install to a project-scope claude target, then rewrite its manifest so
 * diagram-design looks like an older (0.9.0) install that also tracked
 * `references/obsolete.md` — a file the current bundle no longer ships.
 * The orphan is created on disk with a matching hash so the skill reads as
 * clean ('outdated'), not 'modified'.
 */
async function setupOutdatedWithOrphan(env) {
  await install(['--agent', 'claude', '--scope', 'project'], { env, stdout: () => {}, stderr: () => {} });

  const skillsRoot = path.join(env.cwd, '.claude', 'skills');
  const orphanAbs = path.join(skillsRoot, 'diagram-design', 'references', 'obsolete.md');
  fs.writeFileSync(orphanAbs, 'left over from an older bundle\n', 'utf8');

  const manifest = readManifest(skillsRoot);
  for (const f of manifest.files) {
    if (f.skill === 'diagram-design') f.skillVersion = '0.9.0';
  }
  manifest.files.push({
    path: 'diagram-design/references/obsolete.md',
    skill: 'diagram-design',
    skillVersion: '0.9.0',
    sha256: sha256File(orphanAbs),
  });
  fs.writeFileSync(manifestPath(skillsRoot), JSON.stringify(manifest, null, 2), 'utf8');
  return { skillsRoot, orphanAbs };
}

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

    // A partial update must not untrack the skills it didn't touch.
    assert.ok(
      after.files.some((f) => f.skill === 'presentation-structure'),
      'manifest entries for untouched skills must be carried over'
    );
  } finally {
    cleanupEnv(env);
  }
});

test('update deletes files orphaned by the new bundle, untracks them, and uninstall then leaves nothing', async () => {
  const env = makeEnv('update-');
  try {
    const { skillsRoot, orphanAbs } = await setupOutdatedWithOrphan(env);

    const cap = makeCapture();
    const code = await update(['--agent', 'claude', '--scope', 'project'], { env, stdout: cap.stdout, stderr: cap.stderr });
    assert.equal(code, 0);
    assert.match(cap.text(), /updated diagram-design/);
    assert.match(cap.text(), /removed 1 orphaned file\(s\): diagram-design\/references\/obsolete\.md/);

    assert.ok(!fs.existsSync(orphanAbs), 'orphaned file must be deleted from disk');
    const after = readManifest(skillsRoot);
    assert.ok(
      !after.files.some((f) => f.path === 'diagram-design/references/obsolete.md'),
      'manifest must no longer list the orphan'
    );

    await uninstall(['--agent', 'claude', '--scope', 'project'], { env, stdout: () => {}, stderr: () => {} });
    assert.deepEqual(fs.readdirSync(skillsRoot), [], 'uninstall after update must leave nothing behind');
  } finally {
    cleanupEnv(env);
  }
});

test('update --dry-run prints the planned orphan deletion and deletes nothing', async () => {
  const env = makeEnv('update-');
  try {
    const { skillsRoot, orphanAbs } = await setupOutdatedWithOrphan(env);

    const cap = makeCapture();
    const code = await update(['--agent', 'claude', '--scope', 'project', '--dry-run'], {
      env,
      stdout: cap.stdout,
      stderr: cap.stderr,
    });
    assert.equal(code, 0);
    assert.match(cap.text(), /would update diagram-design/);
    assert.match(cap.text(), /would remove 1 orphaned file\(s\): diagram-design\/references\/obsolete\.md/);

    assert.ok(fs.existsSync(orphanAbs), 'dry-run must not delete the orphan');
    const manifest = readManifest(skillsRoot);
    assert.ok(
      manifest.files.some((f) => f.path === 'diagram-design/references/obsolete.md'),
      'dry-run must not rewrite the manifest'
    );
  } finally {
    cleanupEnv(env);
  }
});

test('update skips a modified+outdated skill with an explicit message and does not overwrite it', async () => {
  const env = makeEnv('update-');
  try {
    await install(['--agent', 'claude', '--scope', 'project'], { env, stdout: () => {}, stderr: () => {} });

    const skillsRoot = path.join(env.cwd, '.claude', 'skills');
    const skillMdPath = path.join(skillsRoot, 'diagram-design', 'SKILL.md');
    fs.appendFileSync(skillMdPath, '\nUSER LOCAL EDIT\n');

    // Mark the skill as behind the bundle; the stale manifest hash now also
    // mismatches the edited file, so its status is modified+outdated.
    const manifest = readManifest(skillsRoot);
    for (const f of manifest.files) {
      if (f.skill === 'diagram-design') f.skillVersion = '0.9.0';
    }
    fs.writeFileSync(manifestPath(skillsRoot), JSON.stringify(manifest, null, 2), 'utf8');

    const cap = makeCapture();
    const code = await update(['--agent', 'claude', '--scope', 'project'], { env, stdout: cap.stdout, stderr: cap.stderr });
    assert.equal(code, 0, 'skips are not an error');
    assert.match(cap.text(), /skipped diagram-design: locally modified \(installed 0\.9\.0 < bundled 1\.0\.0\)/);
    assert.match(cap.text(), /run install --force to update/);
    assert.doesNotMatch(cap.text(), /nothing to update/, 'a skip is not "nothing to update"');

    assert.ok(fs.readFileSync(skillMdPath, 'utf8').includes('USER LOCAL EDIT'), 'modified file must not be overwritten');
  } finally {
    cleanupEnv(env);
  }
});

test('update still updates a clean+outdated skill while skipping a modified+outdated one', async () => {
  const env = makeEnv('update-');
  try {
    await install(['--agent', 'claude', '--scope', 'project'], { env, stdout: () => {}, stderr: () => {} });

    const skillsRoot = path.join(env.cwd, '.claude', 'skills');
    const modifiedPath = path.join(skillsRoot, 'diagram-design', 'SKILL.md');
    fs.appendFileSync(modifiedPath, '\nUSER LOCAL EDIT\n');

    const manifest = readManifest(skillsRoot);
    for (const f of manifest.files) {
      // diagram-design: modified+outdated; presentation-qa: clean+outdated.
      if (f.skill === 'diagram-design' || f.skill === 'presentation-qa') f.skillVersion = '0.9.0';
    }
    fs.writeFileSync(manifestPath(skillsRoot), JSON.stringify(manifest, null, 2), 'utf8');

    const cap = makeCapture();
    const code = await update(['--agent', 'claude', '--scope', 'project'], { env, stdout: cap.stdout, stderr: cap.stderr });
    assert.equal(code, 0);
    assert.match(cap.text(), /skipped diagram-design: locally modified/);
    assert.match(cap.text(), /updated presentation-qa/);

    const after = readManifest(skillsRoot);
    assert.ok(after.files.filter((f) => f.skill === 'presentation-qa').every((f) => f.skillVersion === '1.0.0'));
    assert.ok(after.files.filter((f) => f.skill === 'diagram-design').every((f) => f.skillVersion === '0.9.0'), 'skipped skill manifest entries untouched');
    assert.ok(fs.readFileSync(modifiedPath, 'utf8').includes('USER LOCAL EDIT'));
  } finally {
    cleanupEnv(env);
  }
});

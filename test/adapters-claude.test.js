import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { test } from 'node:test';

import * as claude from '../src/adapters/claude.js';
import { readManifest } from '../src/adapters/base.js';
import { cleanupEnv, makeEnv, makeFakeSkill, makeTempDir } from './_helpers.js';

function withEnv(fn) {
  const env = makeEnv('claude-');
  try {
    return fn(env);
  } finally {
    cleanupEnv(env);
  }
}

test('claude.detect reports found:false when ~/.claude and ./.claude are both absent', () => {
  withEnv((env) => {
    const result = claude.detect(env);
    assert.equal(result.found, false);
    assert.equal(result.userDir, path.join(env.homeDir, '.claude'));
    assert.equal(result.projectDir, path.join(env.cwd, '.claude'));
  });
});

test('claude.detect reports found:true once ~/.claude exists', () => {
  withEnv((env) => {
    fs.mkdirSync(path.join(env.homeDir, '.claude'), { recursive: true });
    assert.equal(claude.detect(env).found, true);
  });
});

test('claude.install copies skill files verbatim and writes a manifest', () => {
  withEnv((env) => {
    const skillsSrc = makeTempDir('claude-src-');
    const skillA = makeFakeSkill(skillsSrc, { name: 'alpha-skill', version: '1.0.0' });

    const result = claude.install([skillA], 'user', { cliVersion: '9.9.9' }, env);
    assert.equal(result.ok, true);

    const skillsRoot = path.join(env.homeDir, '.claude', 'skills');
    assert.equal(result.targetRoot, skillsRoot);
    assert.ok(fs.existsSync(path.join(skillsRoot, 'alpha-skill', 'SKILL.md')));
    assert.ok(fs.existsSync(path.join(skillsRoot, 'alpha-skill', 'references', 'notes.md')));

    const manifest = readManifest(skillsRoot);
    assert.equal(manifest.version, '9.9.9');
    assert.ok(typeof manifest.installedAt === 'string' && manifest.installedAt.length > 0);
    assert.equal(manifest.files.length, 2);
    assert.ok(manifest.files.every((f) => f.skill === 'alpha-skill' && f.skillVersion === '1.0.0'));

    fs.rmSync(skillsSrc, { recursive: true, force: true });
  });
});

test('claude install/uninstall round-trip removes exactly what was installed, leaving siblings untouched', () => {
  withEnv((env) => {
    const skillsSrc = makeTempDir('claude-src-');
    const skillA = makeFakeSkill(skillsSrc, { name: 'alpha-skill' });

    const skillsRoot = path.join(env.homeDir, '.claude', 'skills');
    // A pre-existing, unrelated skill the user installed by hand.
    fs.mkdirSync(path.join(skillsRoot, 'someone-elses-skill'), { recursive: true });
    fs.writeFileSync(path.join(skillsRoot, 'someone-elses-skill', 'SKILL.md'), 'unrelated\n', 'utf8');

    claude.install([skillA], 'user', {}, env);
    const result = claude.uninstall('user', {}, env);

    assert.equal(result.ok, true);
    assert.equal(result.removed.length, 2);
    assert.ok(!fs.existsSync(path.join(skillsRoot, 'alpha-skill')), 'installed skill dir should be gone');
    assert.ok(!fs.existsSync(path.join(skillsRoot, '.deckforge-manifest.json')), 'manifest should be gone');

    // The shared skills/ root and the unrelated sibling skill must survive.
    assert.ok(fs.existsSync(skillsRoot), 'shared .claude/skills root must not be deleted');
    assert.ok(fs.existsSync(path.join(skillsRoot, 'someone-elses-skill', 'SKILL.md')), 'unrelated skill must survive uninstall');

    fs.rmSync(skillsSrc, { recursive: true, force: true });
  });
});

test('claude.uninstall on a scope with nothing installed is a harmless no-op', () => {
  withEnv((env) => {
    const result = claude.uninstall('project', {}, env);
    assert.deepEqual(result, { ok: true, removed: [], targetRoot: path.join(env.cwd, '.claude', 'skills') });
  });
});

test('claude.install refuses to overwrite a user-modified file unless --force is set', () => {
  withEnv((env) => {
    const skillsSrc = makeTempDir('claude-src-');
    const skillA = makeFakeSkill(skillsSrc, { name: 'alpha-skill' });

    claude.install([skillA], 'project', {}, env);
    const skillMdPath = path.join(env.cwd, '.claude', 'skills', 'alpha-skill', 'SKILL.md');
    fs.appendFileSync(skillMdPath, '\nUser added a note.\n');

    const refused = claude.install([skillA], 'project', {}, env);
    assert.equal(refused.ok, false);
    assert.deepEqual(refused.conflicts, ['alpha-skill/SKILL.md']);
    // Content must be left alone when refused.
    assert.ok(fs.readFileSync(skillMdPath, 'utf8').includes('User added a note.'));

    const forced = claude.install([skillA], 'project', { force: true }, env);
    assert.equal(forced.ok, true);
    assert.ok(!fs.readFileSync(skillMdPath, 'utf8').includes('User added a note.'), 'force must overwrite local edits');

    fs.rmSync(skillsSrc, { recursive: true, force: true });
  });
});

test('claude.install is idempotent when re-run with unchanged bundled content', () => {
  withEnv((env) => {
    const skillsSrc = makeTempDir('claude-src-');
    const skillA = makeFakeSkill(skillsSrc, { name: 'alpha-skill' });

    const first = claude.install([skillA], 'user', {}, env);
    const second = claude.install([skillA], 'user', {}, env);
    assert.equal(first.ok, true);
    assert.equal(second.ok, true);

    fs.rmSync(skillsSrc, { recursive: true, force: true });
  });
});

test('claude.install --dry-run reports the plan without writing any files', () => {
  withEnv((env) => {
    const skillsSrc = makeTempDir('claude-src-');
    const skillA = makeFakeSkill(skillsSrc, { name: 'alpha-skill' });

    const result = claude.install([skillA], 'user', { dryRun: true }, env);
    assert.equal(result.ok, true);
    assert.deepEqual(result.files.sort(), ['alpha-skill/SKILL.md', 'alpha-skill/references/notes.md'].sort());
    assert.ok(!fs.existsSync(path.join(env.homeDir, '.claude')), 'dry-run must not create any directories');

    fs.rmSync(skillsSrc, { recursive: true, force: true });
  });
});

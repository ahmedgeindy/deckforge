import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { test } from 'node:test';

import * as codex from '../src/adapters/codex.js';
import { blockMarkers } from '../src/adapters/base.js';
import { cleanupEnv, makeEnv, makeFakeSkill, makeTempDir } from './_helpers.js';

const { begin: BLOCK_BEGIN, end: BLOCK_END } = blockMarkers('codex');

function withEnv(fn) {
  const env = makeEnv('codex-');
  try {
    return fn(env);
  } finally {
    cleanupEnv(env);
  }
}

function countOccurrences(haystack, needle) {
  return haystack.split(needle).length - 1;
}

test('codex.detect looks for ~/.codex (user) and ./.codex (project)', () => {
  withEnv((env) => {
    assert.equal(codex.detect(env).found, false);
    fs.mkdirSync(path.join(env.homeDir, '.codex'), { recursive: true });
    assert.equal(codex.detect(env).found, true);
  });
});

test('codex.install copies skill files and writes/creates a managed AGENTS.md block', () => {
  withEnv((env) => {
    const src = makeTempDir('codex-src-');
    const skill = makeFakeSkill(src, { name: 'beta-skill', description: 'Handles the beta workflow.' });

    const result = codex.install([skill], 'project', {}, env);
    assert.equal(result.ok, true);

    const skillsRoot = path.join(env.cwd, '.codex', 'deckforge', 'skills');
    assert.ok(fs.existsSync(path.join(skillsRoot, 'beta-skill', 'SKILL.md')));

    const agentsMdPath = path.join(env.cwd, 'AGENTS.md');
    assert.equal(result.agentsMdPath, agentsMdPath);
    const content = fs.readFileSync(agentsMdPath, 'utf8');
    assert.ok(content.includes(BLOCK_BEGIN) && content.includes(BLOCK_END));
    assert.ok(content.includes('beta-skill'));
    assert.ok(content.includes('Handles the beta workflow.'));
    assert.ok(content.includes('SKILL.md'));

    fs.rmSync(src, { recursive: true, force: true });
  });
});

test('installing twice is idempotent: exactly one managed block, not a duplicate', () => {
  withEnv((env) => {
    const src = makeTempDir('codex-src-');
    const skill = makeFakeSkill(src, { name: 'beta-skill' });

    codex.install([skill], 'user', {}, env);
    codex.install([skill], 'user', {}, env);

    const agentsMdPath = path.join(env.homeDir, '.codex', 'AGENTS.md');
    const content = fs.readFileSync(agentsMdPath, 'utf8');
    assert.equal(countOccurrences(content, BLOCK_BEGIN), 1);
    assert.equal(countOccurrences(content, BLOCK_END), 1);

    fs.rmSync(src, { recursive: true, force: true });
  });
});

test('unrelated AGENTS.md content is preserved across install and uninstall', () => {
  withEnv((env) => {
    const src = makeTempDir('codex-src-');
    const skill = makeFakeSkill(src, { name: 'beta-skill' });

    const agentsMdPath = path.join(env.cwd, 'AGENTS.md');
    fs.writeFileSync(agentsMdPath, '# My Project\n\nHand-written instructions that must survive.\n', 'utf8');

    codex.install([skill], 'project', {}, env);
    let content = fs.readFileSync(agentsMdPath, 'utf8');
    assert.ok(content.includes('Hand-written instructions that must survive.'));
    assert.ok(content.includes(BLOCK_BEGIN));

    codex.uninstall('project', {}, env);
    content = fs.readFileSync(agentsMdPath, 'utf8');
    assert.ok(content.includes('Hand-written instructions that must survive.'));
    assert.ok(!content.includes(BLOCK_BEGIN), 'managed block markers must be gone after uninstall');

    fs.rmSync(src, { recursive: true, force: true });
  });
});

test('uninstall deletes AGENTS.md entirely when deckforge created it from nothing', () => {
  withEnv((env) => {
    const src = makeTempDir('codex-src-');
    const skill = makeFakeSkill(src, { name: 'beta-skill' });

    codex.install([skill], 'project', {}, env);
    codex.install([skill], 'project', {}, env); // reinstall must not lose the "we created this" fact
    codex.uninstall('project', {}, env);

    assert.ok(!fs.existsSync(path.join(env.cwd, 'AGENTS.md')), 'AGENTS.md created solely by deckforge should be removed');

    fs.rmSync(src, { recursive: true, force: true });
  });
});

test('codex.install/uninstall round-trip removes exactly the manifest-listed skill files', () => {
  withEnv((env) => {
    const src = makeTempDir('codex-src-');
    const skill = makeFakeSkill(src, { name: 'beta-skill' });

    codex.install([skill], 'user', {}, env);
    const result = codex.uninstall('user', {}, env);
    assert.equal(result.ok, true);
    assert.ok(!fs.existsSync(path.join(env.homeDir, '.codex', 'deckforge', 'skills', 'beta-skill')));

    fs.rmSync(src, { recursive: true, force: true });
  });
});

test('codex.install refuses a user-edited skill file unless --force', () => {
  withEnv((env) => {
    const src = makeTempDir('codex-src-');
    const skill = makeFakeSkill(src, { name: 'beta-skill' });

    codex.install([skill], 'user', {}, env);
    const skillMdPath = path.join(env.homeDir, '.codex', 'deckforge', 'skills', 'beta-skill', 'SKILL.md');
    fs.appendFileSync(skillMdPath, '\nlocal edit\n');

    const refused = codex.install([skill], 'user', {}, env);
    assert.equal(refused.ok, false);
    assert.ok(refused.conflicts.includes('beta-skill/SKILL.md'));

    const forced = codex.install([skill], 'user', { force: true }, env);
    assert.equal(forced.ok, true);

    fs.rmSync(src, { recursive: true, force: true });
  });
});

test('codex.install refuses when the managed block itself was hand-edited, unless --force', () => {
  withEnv((env) => {
    const src = makeTempDir('codex-src-');
    const skill = makeFakeSkill(src, { name: 'beta-skill' });

    codex.install([skill], 'project', {}, env);
    const agentsMdPath = path.join(env.cwd, 'AGENTS.md');
    const edited = fs
      .readFileSync(agentsMdPath, 'utf8')
      .replace(BLOCK_END, `Someone hand-edited this block.\n${BLOCK_END}`);
    fs.writeFileSync(agentsMdPath, edited, 'utf8');

    const refused = codex.install([skill], 'project', {}, env);
    assert.equal(refused.ok, false);
    assert.ok(refused.conflicts.includes('AGENTS.md'));

    const forced = codex.install([skill], 'project', { force: true }, env);
    assert.equal(forced.ok, true);
    assert.ok(!fs.readFileSync(agentsMdPath, 'utf8').includes('Someone hand-edited this block.'));

    fs.rmSync(src, { recursive: true, force: true });
  });
});

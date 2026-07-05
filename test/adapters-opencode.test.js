import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { test } from 'node:test';

import * as opencode from '../src/adapters/opencode.js';
import { blockMarkers } from '../src/adapters/base.js';
import { cleanupEnv, makeEnv, makeFakeSkill, makeTempDir } from './_helpers.js';

const { begin: BLOCK_BEGIN } = blockMarkers('opencode');

function withEnv(fn) {
  const env = makeEnv('opencode-');
  try {
    return fn(env);
  } finally {
    cleanupEnv(env);
  }
}

test('opencode.detect looks for ~/.config/opencode (user) and ./.opencode (project)', () => {
  withEnv((env) => {
    assert.equal(opencode.detect(env).found, false);
    fs.mkdirSync(path.join(env.homeDir, '.config', 'opencode'), { recursive: true });
    assert.equal(opencode.detect(env).found, true);
    assert.equal(opencode.detect(env).userDir, path.join(env.homeDir, '.config', 'opencode'));
  });
});

test('opencode.install uses ~/.config/opencode/deckforge/skills (user) and ./.opencode/deckforge/skills (project)', () => {
  withEnv((env) => {
    const src = makeTempDir('opencode-src-');
    const skill = makeFakeSkill(src, { name: 'gamma-skill' });

    const userResult = opencode.install([skill], 'user', {}, env);
    assert.equal(userResult.targetRoot, path.join(env.homeDir, '.config', 'opencode', 'deckforge', 'skills'));
    assert.ok(fs.existsSync(path.join(userResult.targetRoot, 'gamma-skill', 'SKILL.md')));
    assert.equal(userResult.agentsMdPath, path.join(env.homeDir, '.config', 'opencode', 'AGENTS.md'));

    const projectResult = opencode.install([skill], 'project', {}, env);
    assert.equal(projectResult.targetRoot, path.join(env.cwd, '.opencode', 'deckforge', 'skills'));
    assert.equal(projectResult.agentsMdPath, path.join(env.cwd, 'AGENTS.md'));

    fs.rmSync(src, { recursive: true, force: true });
  });
});

test('opencode install/uninstall round-trip is clean and idempotent', () => {
  withEnv((env) => {
    const src = makeTempDir('opencode-src-');
    const skill = makeFakeSkill(src, { name: 'gamma-skill' });

    opencode.install([skill], 'project', {}, env);
    opencode.install([skill], 'project', {}, env);

    const agentsMdPath = path.join(env.cwd, 'AGENTS.md');
    const content = fs.readFileSync(agentsMdPath, 'utf8');
    assert.equal(content.split(BLOCK_BEGIN).length - 1, 1);

    const result = opencode.uninstall('project', {}, env);
    assert.equal(result.ok, true);
    assert.ok(!fs.existsSync(path.join(env.cwd, '.opencode', 'deckforge', 'skills', 'gamma-skill')));
    assert.ok(!fs.existsSync(agentsMdPath), 'AGENTS.md created solely by deckforge should be removed on uninstall');

    fs.rmSync(src, { recursive: true, force: true });
  });
});

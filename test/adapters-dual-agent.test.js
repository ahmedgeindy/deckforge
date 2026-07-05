// Codex and OpenCode share one AGENTS.md at project scope. These tests pin
// the per-agent managed-block contract: two independent blocks coexist,
// uninstalling one agent never disturbs the other's block or user content,
// and the file is deleted only when deckforge created it and the last
// block leaves.

import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { test } from 'node:test';

import * as codex from '../src/adapters/codex.js';
import * as opencode from '../src/adapters/opencode.js';
import { blockMarkers } from '../src/adapters/base.js';
import { cleanupEnv, makeEnv, makeFakeSkill, makeTempDir } from './_helpers.js';

const CODEX = blockMarkers('codex');
const OPENCODE = blockMarkers('opencode');

function withFixture(fn) {
  const env = makeEnv('dual-');
  const src = makeTempDir('dual-src-');
  const skill = makeFakeSkill(src, { name: 'shared-skill' });
  try {
    return fn(env, skill, path.join(env.cwd, 'AGENTS.md'));
  } finally {
    cleanupEnv(env);
    fs.rmSync(src, { recursive: true, force: true });
  }
}

test('codex + opencode at the same scope keep two independent blocks in one AGENTS.md', () => {
  withFixture((env, skill, agentsMdPath) => {
    codex.install([skill], 'project', {}, env);
    opencode.install([skill], 'project', {}, env);

    const content = fs.readFileSync(agentsMdPath, 'utf8');
    assert.ok(content.includes(CODEX.begin) && content.includes(CODEX.end), 'codex block present');
    assert.ok(content.includes(OPENCODE.begin) && content.includes(OPENCODE.end), 'opencode block present');
  });
});

test('uninstalling codex leaves the opencode block (and the file) intact; last uninstall deletes the file', () => {
  withFixture((env, skill, agentsMdPath) => {
    codex.install([skill], 'project', {}, env);
    opencode.install([skill], 'project', {}, env);

    codex.uninstall('project', {}, env);
    assert.ok(fs.existsSync(agentsMdPath), 'AGENTS.md must survive while opencode still needs it');
    const afterCodex = fs.readFileSync(agentsMdPath, 'utf8');
    assert.ok(!afterCodex.includes(CODEX.begin), 'codex block removed');
    assert.ok(afterCodex.includes(OPENCODE.begin) && afterCodex.includes(OPENCODE.end), 'opencode block untouched');

    opencode.uninstall('project', {}, env);
    assert.ok(!fs.existsSync(agentsMdPath), 'file deckforge created is deleted once the last block leaves');
  });
});

test('same as above in reverse order: uninstall opencode first, then codex', () => {
  withFixture((env, skill, agentsMdPath) => {
    codex.install([skill], 'project', {}, env);
    opencode.install([skill], 'project', {}, env);

    opencode.uninstall('project', {}, env);
    assert.ok(fs.existsSync(agentsMdPath), 'AGENTS.md must survive while codex still needs it');
    const afterOpencode = fs.readFileSync(agentsMdPath, 'utf8');
    assert.ok(!afterOpencode.includes(OPENCODE.begin), 'opencode block removed');
    assert.ok(afterOpencode.includes(CODEX.begin) && afterOpencode.includes(CODEX.end), 'codex block untouched');

    codex.uninstall('project', {}, env);
    assert.ok(!fs.existsSync(agentsMdPath), 'file deckforge created is deleted once the last block leaves');
  });
});

test('a user-authored AGENTS.md is byte-identical after both agents install and uninstall, and is never deleted', () => {
  withFixture((env, skill, agentsMdPath) => {
    const userContent = '# My Project\n\nHand-written instructions that must survive.\n';
    fs.writeFileSync(agentsMdPath, userContent, 'utf8');

    codex.install([skill], 'project', {}, env);
    opencode.install([skill], 'project', {}, env);
    codex.uninstall('project', {}, env);
    opencode.uninstall('project', {}, env);

    assert.ok(fs.existsSync(agentsMdPath), 'user-created AGENTS.md must never be deleted');
    assert.equal(fs.readFileSync(agentsMdPath, 'utf8'), userContent, 'user content must be byte-identical');
  });
});

test('reinstalling one agent while the other is installed keeps exactly one block per agent', () => {
  withFixture((env, skill, agentsMdPath) => {
    codex.install([skill], 'project', {}, env);
    opencode.install([skill], 'project', {}, env);
    codex.install([skill], 'project', {}, env); // refresh codex's block in place

    const content = fs.readFileSync(agentsMdPath, 'utf8');
    assert.equal(content.split(CODEX.begin).length - 1, 1, 'exactly one codex block');
    assert.equal(content.split(OPENCODE.begin).length - 1, 1, 'exactly one opencode block');
  });
});

import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { test } from 'node:test';

import { listBundledSkills, skillsRoot } from '../src/skills.js';

test('skillsRoot resolves to <repo>/skills regardless of process.cwd()', () => {
  const root = skillsRoot();
  assert.equal(path.basename(root), 'skills');
  assert.ok(fs.existsSync(root), `expected ${root} to exist`);
});

test('listBundledSkills enumerates every real bundled skill with usable metadata', () => {
  const skills = listBundledSkills();
  assert.ok(skills.length >= 6, `expected at least 6 bundled skills, got ${skills.length}`);

  const expectedNames = [
    'diagram-design',
    'presentation-build-report',
    'presentation-copywriting',
    'presentation-design',
    'presentation-qa',
    'presentation-structure',
  ];
  const names = skills.map((s) => s.name).sort();
  for (const expected of expectedNames) {
    assert.ok(names.includes(expected), `expected bundled skill "${expected}" to be present`);
  }

  for (const skill of skills) {
    assert.ok(skill.name.length > 0, 'skill.name should not be empty');
    assert.match(skill.version, /^\d+\.\d+\.\d+$/, `skill.version "${skill.version}" should look like semver`);
    assert.ok(skill.description.length > 20, 'skill.description should be a real sentence, not empty/placeholder');
    assert.ok(fs.existsSync(path.join(skill.dir, 'SKILL.md')), `${skill.dir} should contain SKILL.md`);
  }
});

test('listBundledSkills returns skills sorted by directory name', () => {
  const names = listBundledSkills().map((s) => s.name);
  const sorted = [...names].sort();
  assert.deepEqual(names, sorted);
});

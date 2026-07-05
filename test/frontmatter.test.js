import assert from 'node:assert/strict';
import { test } from 'node:test';

import { parseFrontmatter } from '../src/skills.js';

test('parseFrontmatter reads simple key: value lines', () => {
  const text = ['---', 'name: my-skill', 'version: 1.2.3', 'description: Does a thing.', '---', '', '# Body'].join('\n');
  assert.deepEqual(parseFrontmatter(text), {
    name: 'my-skill',
    version: '1.2.3',
    description: 'Does a thing.',
  });
});

test('parseFrontmatter joins folded/indented continuation lines onto the previous value', () => {
  const text = [
    '---',
    'name: folded-skill',
    'version: 1.0.0',
    'description: First line of a long description',
    '  that continues indented on the next line',
    '  and one more continuation line.',
    '---',
    'Body',
  ].join('\n');
  const fm = parseFrontmatter(text);
  assert.equal(
    fm.description,
    'First line of a long description that continues indented on the next line and one more continuation line.'
  );
});

test('parseFrontmatter returns {} when there is no opening fence', () => {
  const text = 'name: nope\nversion: 1.0.0\n';
  assert.deepEqual(parseFrontmatter(text), {});
});

test('parseFrontmatter returns {} when the closing fence is missing', () => {
  const text = ['---', 'name: unterminated', 'version: 1.0.0'].join('\n');
  assert.deepEqual(parseFrontmatter(text), {});
});

test('parseFrontmatter ignores blank lines between fields', () => {
  const text = ['---', 'name: spaced', '', 'version: 2.0.0', '---'].join('\n');
  assert.deepEqual(parseFrontmatter(text), { name: 'spaced', version: '2.0.0' });
});

test('parseFrontmatter handles CRLF line endings', () => {
  const text = ['---', 'name: crlf-skill', 'version: 1.0.0', '---', ''].join('\r\n');
  assert.deepEqual(parseFrontmatter(text), { name: 'crlf-skill', version: '1.0.0' });
});

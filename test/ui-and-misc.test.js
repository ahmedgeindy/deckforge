import assert from 'node:assert/strict';
import { test } from 'node:test';

import { colorEnabled, formatError, glyph, table } from '../src/ui.js';
import { compareVersions, packageVersion } from '../src/version.js';
import { parseArgs } from '../src/cli-helpers.js';

test('table() aligns columns and includes a separator row', () => {
  const out = table(['NAME', 'VER'], [['diagram-design', '1.0.0'], ['x', '2.0.0']]);
  const lines = out.split('\n');
  assert.equal(lines.length, 4); // header, separator, 2 rows
  assert.match(lines[0], /^NAME\s+VER$/);
  assert.match(lines[1], /^-+\s+-+$/);
});

test('formatError renders a one-line problem and a one-line fix', () => {
  const msg = formatError('something is wrong', 'do this instead');
  const lines = msg.trim().split('\n');
  assert.equal(lines.length, 2);
  assert.equal(lines[0], 'Error: something is wrong');
  assert.equal(lines[1], 'Fix: do this instead');
});

test('glyph() returns a non-empty marker for ok/warn/fail', () => {
  for (const kind of ['ok', 'warn', 'fail']) {
    assert.ok(glyph(kind).length > 0);
  }
});

test('colorEnabled() is false when NO_COLOR is set, regardless of stream', () => {
  const prev = process.env.NO_COLOR;
  process.env.NO_COLOR = '1';
  try {
    assert.equal(colorEnabled({ isTTY: true }), false);
  } finally {
    if (prev === undefined) delete process.env.NO_COLOR;
    else process.env.NO_COLOR = prev;
  }
});

test('colorEnabled() is false for a non-TTY stream when NO_COLOR/FORCE_COLOR are unset', () => {
  const prevNoColor = process.env.NO_COLOR;
  const prevForceColor = process.env.FORCE_COLOR;
  delete process.env.NO_COLOR;
  delete process.env.FORCE_COLOR;
  try {
    assert.equal(colorEnabled({ isTTY: false }), false);
  } finally {
    if (prevNoColor !== undefined) process.env.NO_COLOR = prevNoColor;
    if (prevForceColor !== undefined) process.env.FORCE_COLOR = prevForceColor;
  }
});

test('compareVersions compares dotted version strings numerically', () => {
  assert.ok(compareVersions('1.0.0', '1.0.0') === 0);
  assert.ok(compareVersions('1.0.0', '1.2.0') < 0);
  assert.ok(compareVersions('1.10.0', '1.9.0') > 0, 'must compare numerically, not lexically');
  assert.ok(compareVersions('2.0.0', '1.9.9') > 0);
});

test('packageVersion reads this package.json\'s version field', () => {
  assert.match(packageVersion(), /^\d+\.\d+\.\d+$/);
});

test('cli-helpers parseArgs returns ok:false with a message for an unknown option', () => {
  const result = parseArgs(['--nope'], { help: { type: 'boolean', default: false } });
  assert.equal(result.ok, false);
  assert.equal(typeof result.message, 'string');
});

test('cli-helpers parseArgs returns ok:true with parsed values for valid options', () => {
  const result = parseArgs(['--scope', 'user'], { scope: { type: 'string', default: 'project' } });
  assert.equal(result.ok, true);
  assert.equal(result.values.scope, 'user');
});

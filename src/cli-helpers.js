// Small shared helpers for command modules: uniform arg parsing/error
// shape and a default execution context (real process I/O and real
// home/cwd) that tests override with an injected fake.

import { parseArgs as nodeParseArgs } from 'node:util';

/**
 * Wrap node:util parseArgs so option errors come back as a plain
 * `{ok:false, message}` instead of a thrown exception, so every command
 * can format them the same one-line-problem way.
 */
export function parseArgs(args, options) {
  try {
    const { values, positionals } = nodeParseArgs({ args, options, allowPositionals: true, strict: true });
    return { ok: true, values, positionals };
  } catch (err) {
    return { ok: false, message: err.message };
  }
}

/**
 * Default execution context for a command: where to write output, and
 * which home/cwd directories the adapters should treat as "the machine".
 * Tests pass their own ctx with a fake env + capturing stdout/stderr.
 */
export function defaultContext(overrides = {}) {
  return {
    env: {},
    stdout: (text) => process.stdout.write(text),
    stderr: (text) => process.stderr.write(text),
    ...overrides,
  };
}

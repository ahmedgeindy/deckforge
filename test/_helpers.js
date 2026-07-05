// Shared test fixtures. Leading underscore keeps node:test's file
// discovery from treating this as a test file itself.

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

/** A throwaway directory under the OS temp dir; caller must clean it up. */
export function makeTempDir(prefix) {
  return fs.mkdtempSync(path.join(os.tmpdir(), prefix));
}

/** Fake {homeDir, cwd} so adapters/commands never touch the real machine. */
export function makeEnv(prefix = 'deckforge-') {
  return {
    homeDir: makeTempDir(`${prefix}home-`),
    cwd: makeTempDir(`${prefix}cwd-`),
  };
}

export function cleanupEnv(env) {
  for (const dir of [env.homeDir, env.cwd]) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

/** Captures ctx.stdout/ctx.stderr writes as arrays and joined text. */
export function makeCapture() {
  const out = [];
  const err = [];
  return {
    stdout: (s) => out.push(s),
    stderr: (s) => err.push(s),
    out,
    err,
    text: () => out.join(''),
    errText: () => err.join(''),
  };
}

/** A minimal but realistic fake bundled skill, written to rootDir/<name>/. */
export function makeFakeSkill(rootDir, { name, version = '1.0.0', description = 'A fake skill for tests.' }) {
  const dir = path.join(rootDir, name);
  fs.mkdirSync(path.join(dir, 'references'), { recursive: true });
  fs.writeFileSync(
    path.join(dir, 'SKILL.md'),
    `---\nname: ${name}\nversion: ${version}\ndescription: ${description}\n---\n\n# ${name}\n\nBody text.\n`,
    'utf8'
  );
  fs.writeFileSync(path.join(dir, 'references', 'notes.md'), `Reference notes for ${name}.\n`, 'utf8');
  return { name, version, description, dir };
}

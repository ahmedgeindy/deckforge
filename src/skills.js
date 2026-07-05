// Enumerates the bundled skills shipped under <repo>/skills/ and parses
// each SKILL.md's YAML-ish frontmatter (name/version/description).
//
// Resolved relative to this file's own URL (import.meta.url), NOT
// process.cwd(), so `deckforge` works correctly regardless of the
// directory it is invoked from (including when installed globally).

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const SRC_DIR = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.dirname(SRC_DIR);

/** Absolute path to the bundled skills/ directory. */
export function skillsRoot() {
  return path.join(REPO_ROOT, 'skills');
}

/**
 * Parse a SKILL.md frontmatter block into a plain key/value object.
 *
 * The frontmatter is simple `key: value` lines between `---` fences.
 * A value may be folded onto following indented lines; those continuation
 * lines are trimmed and joined onto the value with a single space.
 *
 * @param {string} text full contents of a SKILL.md file
 * @returns {Record<string,string>}
 */
export function parseFrontmatter(text) {
  const lines = text.split(/\r?\n/);
  if (lines.length === 0 || lines[0].trim() !== '---') {
    return {};
  }
  let end = -1;
  for (let i = 1; i < lines.length; i++) {
    if (lines[i].trim() === '---') {
      end = i;
      break;
    }
  }
  if (end === -1) return {};

  const data = {};
  let currentKey = null;
  for (const rawLine of lines.slice(1, end)) {
    if (rawLine.trim().length === 0) continue;
    const isContinuation = /^[ \t]/.test(rawLine) && currentKey != null;
    if (isContinuation) {
      data[currentKey] = `${data[currentKey]} ${rawLine.trim()}`;
      continue;
    }
    const match = /^([A-Za-z0-9_-]+):\s?(.*)$/.exec(rawLine);
    if (match) {
      currentKey = match[1];
      data[currentKey] = match[2].trim();
    }
  }
  return data;
}

/**
 * Enumerate bundled skills: one entry per subdirectory of skills/ that
 * contains a SKILL.md, in alphabetical order.
 *
 * @returns {Array<{name:string, version:string, description:string, dir:string}>}
 */
export function listBundledSkills() {
  const root = skillsRoot();
  if (!fs.existsSync(root)) return [];

  const dirNames = fs
    .readdirSync(root, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();

  const skills = [];
  for (const dirName of dirNames) {
    const dir = path.join(root, dirName);
    const skillMdPath = path.join(dir, 'SKILL.md');
    if (!fs.existsSync(skillMdPath)) continue;
    const text = fs.readFileSync(skillMdPath, 'utf8');
    const fm = parseFrontmatter(text);
    skills.push({
      name: fm.name || dirName,
      version: fm.version || '0.0.0',
      description: fm.description || '',
      dir,
    });
  }
  return skills;
}

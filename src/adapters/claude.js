// Claude Code adapter: skills are auto-discovered natively from
// ~/.claude/skills/<skill>/ (user scope) or ./.claude/skills/<skill>/
// (project scope) via each SKILL.md's frontmatter. Plain directory copy —
// no AGENTS.md / managed block involved.

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {
  installSkillFiles,
  readManifest,
  removeManifest,
  uninstallSkillFiles,
  writeManifest,
} from './base.js';

export const name = 'claude';

function resolvePaths(env = {}) {
  const home = env.homeDir ?? os.homedir();
  const cwd = env.cwd ?? process.cwd();
  return {
    userDir: path.join(home, '.claude'),
    projectDir: path.join(cwd, '.claude'),
    userSkillsRoot: path.join(home, '.claude', 'skills'),
    projectSkillsRoot: path.join(cwd, '.claude', 'skills'),
  };
}

export function detect(env = {}) {
  const p = resolvePaths(env);
  return {
    agent: name,
    found: fs.existsSync(p.userDir) || fs.existsSync(p.projectDir),
    userDir: p.userDir,
    projectDir: p.projectDir,
  };
}

/** Resolve the skills root that this scope installs into. */
export function targets(scope, env = {}) {
  const p = resolvePaths(env);
  return { skillsRoot: scope === 'user' ? p.userSkillsRoot : p.projectSkillsRoot };
}

export function install(skills, scope, opts = {}, env = {}) {
  const { skillsRoot } = targets(scope, env);
  const previousManifest = readManifest(skillsRoot);

  const result = installSkillFiles({ targetRoot: skillsRoot, skills, opts, previousManifest });
  if (!result.ok) return { ok: false, conflicts: result.conflicts, targetRoot: skillsRoot };

  if (!opts.dryRun) {
    writeManifest(skillsRoot, {
      version: opts.cliVersion ?? '0.0.0',
      installedAt: new Date().toISOString(),
      // carriedFiles: entries for skills untouched by this (possibly
      // partial) install — dropping them would untrack those skills.
      files: [...result.carriedFiles, ...result.manifestFiles],
    });
  }
  return {
    ok: true,
    targetRoot: skillsRoot,
    files: result.manifestFiles.map((f) => f.path),
    orphansRemoved: result.orphansRemoved,
  };
}

export function uninstall(scope, opts = {}, env = {}) {
  const { skillsRoot } = targets(scope, env);
  const manifest = readManifest(skillsRoot);
  if (!manifest) return { ok: true, removed: [], targetRoot: skillsRoot };

  const removed = uninstallSkillFiles({ targetRoot: skillsRoot, manifest });
  removeManifest(skillsRoot);
  // Never prune skillsRoot itself: ~/.claude/skills is shared with any
  // other, non-deckforge skills the user has installed there.
  return { ok: true, removed, targetRoot: skillsRoot };
}

export function invocationHelp() {
  return 'Claude Code discovers skills automatically. Ask naturally, or invoke one directly with "/skill-name".';
}

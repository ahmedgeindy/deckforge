// Shared "is this bundled skill installed, and is it current?" logic used
// by both the `list` and `doctor` commands.

import fs from 'node:fs';
import path from 'node:path';
import { readManifest, sha256File } from './adapters/base.js';
import { compareVersions } from './version.js';

/**
 * @typedef {'not-installed'|'current'|'outdated'|'modified'} SkillScopeStatus
 */

/**
 * Status of one bundled skill within one (adapter, scope) install location.
 * @returns {{status: SkillScopeStatus, installedVersion: string|null}}
 */
export function scopeStatus(adapter, scope, skill, env) {
  const { skillsRoot } = adapter.targets(scope, env);
  const manifest = readManifest(skillsRoot);
  const skillFiles = manifest?.files?.filter((f) => f.skill === skill.name) ?? [];
  if (skillFiles.length === 0) {
    return { status: 'not-installed', installedVersion: null };
  }

  for (const f of skillFiles) {
    const abs = path.join(skillsRoot, f.path);
    if (!fs.existsSync(abs) || sha256File(abs) !== f.sha256) {
      return { status: 'modified', installedVersion: skillFiles[0].skillVersion };
    }
  }

  const installedVersion = skillFiles[0].skillVersion;
  if (compareVersions(installedVersion, skill.version) < 0) {
    return { status: 'outdated', installedVersion };
  }
  return { status: 'current', installedVersion };
}

/**
 * Combined status for a skill under one adapter, across both scopes.
 * Project scope takes precedence over user scope when both are installed
 * (mirrors how a project-local install shadows a global one in practice).
 */
export function agentStatus(adapter, skill, env) {
  const project = scopeStatus(adapter, 'project', skill, env);
  if (project.status !== 'not-installed') return { ...project, scope: 'project' };
  const user = scopeStatus(adapter, 'user', skill, env);
  if (user.status !== 'not-installed') return { ...user, scope: 'user' };
  return { status: 'not-installed', installedVersion: null, scope: null };
}

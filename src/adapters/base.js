// Shared low-level helpers used by every adapter: file hashing/copying,
// manifest read/write, conflict detection, and the managed-block
// (AGENTS.md) machinery shared by the codex and opencode adapters.
//
// Nothing here talks to a specific agent's directory layout — that lives
// in claude.js / codex.js / opencode.js.

import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { listBundledSkills } from '../skills.js';

export const MANIFEST_FILENAME = '.deckforge-manifest.json';

export function sha256(content) {
  return crypto.createHash('sha256').update(content).digest('hex');
}

export function sha256File(filePath) {
  return sha256(fs.readFileSync(filePath));
}

export function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

// Build/VCS junk that must never be copied into an install target, even if
// it accidentally exists in the bundled skills/ source tree (e.g. a stray
// __pycache__ left behind by running the build-report skill's pytest suite).
const IGNORED_NAMES = new Set(['__pycache__', '.pytest_cache', '.git', '.DS_Store']);
const IGNORED_FILE_PATTERN = /\.pyc$/;

/** Recursively list files under dir as posix-style relative paths, sorted. */
export function walkFiles(dir) {
  const out = [];
  function walk(current, rel) {
    const entries = fs.readdirSync(current, { withFileTypes: true });
    for (const entry of entries) {
      if (IGNORED_NAMES.has(entry.name)) continue;
      const abs = path.join(current, entry.name);
      const relPath = rel ? `${rel}/${entry.name}` : entry.name;
      if (entry.isDirectory()) walk(abs, relPath);
      else if (entry.isFile() && !IGNORED_FILE_PATTERN.test(entry.name)) out.push(relPath);
    }
  }
  if (fs.existsSync(dir)) walk(dir, '');
  return out.sort();
}

export function copyFile(src, dest) {
  ensureDir(path.dirname(dest));
  fs.copyFileSync(src, dest);
}

/**
 * Recursively remove now-empty directories under `dir`, then remove `dir`
 * itself if it ends up empty. Callers must only ever pass a directory that
 * deckforge fully owns (e.g. a single installed skill's own folder) — never
 * a shared directory that may also hold unrelated, user-owned content.
 */
export function pruneEmptyDirs(dir) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isDirectory()) pruneEmptyDirs(path.join(dir, entry.name));
  }
  if (fs.readdirSync(dir).length === 0) {
    fs.rmdirSync(dir);
  }
}

export function manifestPath(targetRoot) {
  return path.join(targetRoot, MANIFEST_FILENAME);
}

export function readManifest(targetRoot) {
  const p = manifestPath(targetRoot);
  if (!fs.existsSync(p)) return null;
  try {
    return JSON.parse(fs.readFileSync(p, 'utf8'));
  } catch {
    return null;
  }
}

export function writeManifest(targetRoot, manifest) {
  ensureDir(targetRoot);
  fs.writeFileSync(manifestPath(targetRoot), `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
}

export function removeManifest(targetRoot) {
  fs.rmSync(manifestPath(targetRoot), { force: true });
}

/**
 * Given planned files (each `{relPath, readCurrent()}`, where readCurrent
 * returns the file/region's current content or null if absent) and the
 * previous manifest, return the relPaths whose on-disk content no longer
 * matches what was recorded at the last install — i.e. the user edited
 * them since. Files with no prior manifest entry, or that are simply
 * missing on disk, are never conflicts (nothing to refuse overwriting).
 */
export function findConflicts(plannedFiles, previousManifest) {
  const prevByPath = new Map();
  if (previousManifest?.files) {
    for (const f of previousManifest.files) prevByPath.set(f.path, f.sha256);
  }
  const conflicts = [];
  for (const pf of plannedFiles) {
    const prevHash = prevByPath.get(pf.relPath);
    if (prevHash == null) continue;
    const current = pf.readCurrent();
    if (current == null) continue;
    if (sha256(current) !== prevHash) conflicts.push(pf.relPath);
  }
  return conflicts;
}

/**
 * Copy a set of bundled skills into targetRoot (one subdirectory per
 * skill), refusing (unless opts.force) if any destination file was
 * user-modified since the previous install.
 *
 * Lifecycle bookkeeping against previousManifest:
 * - `orphansRemoved`: files the previous manifest tracked for one of the
 *   skills being (re)installed that the new bundle no longer contains.
 *   They are deleted — otherwise they'd sit on disk untracked forever,
 *   invisible to both future updates and uninstall. Dry-run reports them
 *   without deleting.
 * - `carriedFiles`: previous entries for skills NOT in this call (e.g. a
 *   partial `update`). The caller must merge these into the new manifest,
 *   or those skills would silently stop being tracked.
 *
 * @returns {{ok:true, manifestFiles:object[], carriedFiles:object[], orphansRemoved:string[], files:object[]}|{ok:false, conflicts:string[]}}
 */
export function installSkillFiles({ targetRoot, skills, opts = {}, previousManifest }) {
  const files = [];
  for (const skill of skills) {
    for (const rel of walkFiles(skill.dir)) {
      files.push({
        relPath: `${skill.name}/${rel}`,
        srcPath: path.join(skill.dir, rel),
        destPath: path.join(targetRoot, skill.name, rel),
        skill: skill.name,
        skillVersion: skill.version,
      });
    }
  }

  const conflictCandidates = files.map((f) => ({
    relPath: f.relPath,
    readCurrent: () => (fs.existsSync(f.destPath) ? fs.readFileSync(f.destPath) : null),
  }));
  const conflicts = opts.force ? [] : findConflicts(conflictCandidates, previousManifest);
  if (conflicts.length > 0) return { ok: false, conflicts };

  const installedNames = new Set(skills.map((s) => s.name));
  const plannedPaths = new Set(files.map((f) => f.relPath));
  const prevFiles = previousManifest?.files ?? [];
  // `f.skill == null` is the AGENTS.md entry — owned by the managed-block
  // machinery, never by skill-file bookkeeping.
  const orphansRemoved = prevFiles
    .filter((f) => f.skill != null && installedNames.has(f.skill) && !plannedPaths.has(f.path))
    .map((f) => f.path);
  const carriedFiles = prevFiles.filter((f) => f.skill != null && !installedNames.has(f.skill));

  const manifestFiles = [];
  for (const f of files) {
    if (!opts.dryRun) copyFile(f.srcPath, f.destPath);
    manifestFiles.push({
      path: f.relPath,
      skill: f.skill,
      skillVersion: f.skillVersion,
      sha256: sha256File(f.srcPath),
    });
  }

  if (!opts.dryRun) {
    for (const rel of orphansRemoved) {
      fs.rmSync(path.join(targetRoot, rel), { force: true });
    }
    for (const name of installedNames) {
      pruneEmptyDirs(path.join(targetRoot, name));
    }
  }

  return { ok: true, manifestFiles, carriedFiles, orphansRemoved, files };
}

/** Remove manifest-listed skill files (not the AGENTS.md entry) and prune the emptied skill dirs. */
export function uninstallSkillFiles({ targetRoot, manifest }) {
  const removed = [];
  const touchedSkillDirs = new Set();
  for (const f of manifest.files ?? []) {
    if (f.path === 'AGENTS.md') continue;
    const abs = path.join(targetRoot, f.path);
    if (fs.existsSync(abs)) {
      fs.rmSync(abs, { force: true });
      removed.push(f.path);
    }
    touchedSkillDirs.add(f.path.split('/')[0]);
  }
  for (const skillName of touchedSkillDirs) {
    pruneEmptyDirs(path.join(targetRoot, skillName));
  }
  return removed;
}

// --- Managed AGENTS.md blocks (codex, opencode) ---------------------------
//
// Markers are agent-specific (`<!-- deckforge:codex:begin -->` etc.) so two
// agents installed at the same scope keep two independent blocks in the same
// AGENTS.md. Each adapter only ever touches ITS OWN block: uninstalling one
// agent never disturbs the other's block or any user-authored content.

// Matches any agent's markers — used only to answer "does any deckforge
// block remain?" and "is this file purely deckforge-authored?".
const ANY_BLOCK_BEGIN = /<!-- deckforge:[a-z0-9-]+:begin -->/;
const ANY_FULL_BLOCK = /<!-- deckforge:[a-z0-9-]+:begin -->[\s\S]*?<!-- deckforge:[a-z0-9-]+:end -->/g;

/** The begin/end marker pair owned by one agent. */
export function blockMarkers(agentId) {
  return {
    begin: `<!-- deckforge:${agentId}:begin -->`,
    end: `<!-- deckforge:${agentId}:end -->`,
  };
}

/**
 * Whether the file consists solely of deckforge blocks and whitespace —
 * i.e. deckforge effectively authored it and no user content would be lost
 * by deleting it once all blocks are gone. Each adapter's manifest is
 * per-agent, so a second agent installing into a file the first agent
 * created can't learn "deckforge made this" from its own (nonexistent)
 * previous manifest; content inspection is the shared source of truth.
 */
export function deckforgeOwnsFile(content) {
  if (content == null) return true;
  return content.replace(ANY_FULL_BLOCK, '').trim() === '';
}

/** Extract this agent's block body (without markers), or null if absent/malformed. */
export function extractManagedBlock(content, agentId) {
  if (content == null) return null;
  const { begin, end } = blockMarkers(agentId);
  const startIdx = content.indexOf(begin);
  const endIdx = content.indexOf(end);
  if (startIdx === -1 || endIdx === -1 || endIdx < startIdx) return null;
  return content.slice(startIdx + begin.length, endIdx).replace(/^\r?\n/, '').replace(/\r?\n$/, '');
}

/** Insert/replace this agent's managed block in existingContent (null => file doesn't exist yet). */
export function applyManagedBlock(existingContent, blockBody, agentId) {
  const { begin, end } = blockMarkers(agentId);
  const block = `${begin}\n${blockBody}\n${end}`;
  if (existingContent == null) return `${block}\n`;

  const startIdx = existingContent.indexOf(begin);
  const endIdx = existingContent.indexOf(end);
  if (startIdx !== -1 && endIdx !== -1 && endIdx > startIdx) {
    const before = existingContent.slice(0, startIdx);
    const after = existingContent.slice(endIdx + end.length);
    return before + block + after;
  }

  const trimmed = existingContent.replace(/\s+$/, '');
  const sep = trimmed.length > 0 ? '\n\n' : '';
  return `${trimmed}${sep}${block}\n`;
}

/**
 * Strip this agent's managed block out of existingContent. Whitespace is
 * adjusted only at the seams where the block sat — surrounding user content
 * (and any other agent's block) is preserved byte for byte.
 */
export function removeManagedBlock(existingContent, agentId) {
  if (existingContent == null) return null;
  const { begin, end } = blockMarkers(agentId);
  const startIdx = existingContent.indexOf(begin);
  const endIdx = existingContent.indexOf(end);
  if (startIdx === -1 || endIdx === -1 || endIdx < startIdx) return existingContent;

  const before = existingContent.slice(0, startIdx).replace(/\s+$/, '');
  const after = existingContent.slice(endIdx + end.length).replace(/^\s+/, '');
  if (before && after) return `${before}\n\n${after}`;
  if (before) return `${before}\n`;
  return after; // '' when the block was the entire file
}

/** Render the managed-block body listing every installed skill. */
export function buildManagedBlockBody(skills, { agentLabel, skillsRootLabel }) {
  const lines = [
    `DeckForge presentation-pipeline skills for ${agentLabel}.`,
    'Before starting a presentation/deck task, read the relevant SKILL.md below and follow it.',
    '',
  ];
  for (const skill of skills) {
    lines.push(`- **${skill.name}** (v${skill.version}): ${skill.description}`);
    lines.push(`  Read: \`${skillsRootLabel}/${skill.name}/SKILL.md\``);
  }
  return lines.join('\n');
}

/**
 * Install/refresh this agent's managed block in an AGENTS.md file.
 * @returns {{ok:true, manifestEntry:object, agentsMdCreated:boolean}|{ok:false, conflicts:string[]}}
 */
export function installManagedBlock({ agentsMdPath, blockBody, agentId, opts = {}, previousManifest }) {
  const existing = fs.existsSync(agentsMdPath) ? fs.readFileSync(agentsMdPath, 'utf8') : null;
  const prevEntry = previousManifest?.files?.find((f) => f.path === 'AGENTS.md');

  if (!opts.force && prevEntry && existing != null) {
    const currentBlock = extractManagedBlock(existing, agentId);
    const currentHash = currentBlock != null ? sha256(currentBlock) : null;
    if (currentHash !== prevEntry.sha256) {
      return { ok: false, conflicts: ['AGENTS.md'] };
    }
  }

  // "May we delete this file when the last block leaves?" — true when the
  // file doesn't exist yet (we're creating it) or when its current content
  // is purely deckforge blocks (possibly another agent's) + whitespace.
  // Content inspection, not the file's mere existence, is the signal:
  // by a reinstall (or a second agent's install) the file always exists.
  const agentsMdCreated = existing == null || deckforgeOwnsFile(existing);
  const newContent = applyManagedBlock(existing, blockBody, agentId);
  if (!opts.dryRun) {
    ensureDir(path.dirname(agentsMdPath));
    fs.writeFileSync(agentsMdPath, newContent, 'utf8');
  }
  return {
    ok: true,
    manifestEntry: { path: 'AGENTS.md', skill: null, skillVersion: null, sha256: sha256(blockBody) },
    agentsMdCreated,
  };
}

/**
 * Remove this agent's managed block from AGENTS.md. The file itself is
 * deleted only when (a) the manifest says deckforge created it, (b) no
 * other agent's deckforge block remains, and (c) nothing but whitespace
 * remains — otherwise the stripped content is written back.
 */
export function uninstallManagedBlock({ agentsMdPath, manifest, agentId }) {
  if (!manifest?.agentsMdPath || !fs.existsSync(agentsMdPath)) return;
  const existing = fs.readFileSync(agentsMdPath, 'utf8');
  const stripped = removeManagedBlock(existing, agentId);
  const otherBlockRemains = ANY_BLOCK_BEGIN.test(stripped);
  if (manifest.agentsMdCreated && !otherBlockRemains && stripped.trim() === '') {
    fs.rmSync(agentsMdPath, { force: true });
  } else {
    fs.writeFileSync(agentsMdPath, stripped, 'utf8');
  }
}

/**
 * Build a full adapter ({name, detect, targets, install, uninstall,
 * invocationHelp}) for agents that use the file-drop + managed-AGENTS.md-block
 * pattern (codex, opencode). `resolvePaths(env)` must return
 * `{configDir, projectConfigDir, userSkillsRoot, projectSkillsRoot, userAgentsMd, projectAgentsMd}`.
 */
export function makeManagedBlockAdapter({ id, agentLabel, invocationHelp, resolvePaths }) {
  function targets(scope, env) {
    const p = resolvePaths(env);
    return scope === 'user'
      ? { skillsRoot: p.userSkillsRoot, agentsMdPath: p.userAgentsMd, skillsRootLabel: p.userSkillsRootLabel }
      : { skillsRoot: p.projectSkillsRoot, agentsMdPath: p.projectAgentsMd, skillsRootLabel: p.projectSkillsRootLabel };
  }

  function detect(env) {
    const p = resolvePaths(env);
    return {
      agent: id,
      found: fs.existsSync(p.configDir) || fs.existsSync(p.projectConfigDir),
      userDir: p.configDir,
      projectDir: p.projectConfigDir,
    };
  }

  function install(skills, scope, opts = {}, env = {}) {
    const { skillsRoot, agentsMdPath, skillsRootLabel } = targets(scope, env);
    const previousManifest = readManifest(skillsRoot);

    const filesResult = installSkillFiles({ targetRoot: skillsRoot, skills, opts, previousManifest });
    if (!filesResult.ok) return { ok: false, conflicts: filesResult.conflicts, targetRoot: skillsRoot };

    // The block must describe ALL skills installed at this target after the
    // operation — a partial `update` passes only the stale subset, and
    // rebuilding the block from that subset alone would drop the other
    // installed skills' pointers from AGENTS.md. Carried (untouched) skills
    // are resolved against the bundle for their name/version/description.
    const passedNames = new Set(skills.map((s) => s.name));
    const carriedNames = new Set(filesResult.carriedFiles.map((f) => f.skill));
    const carriedSkills = listBundledSkills().filter((s) => carriedNames.has(s.name) && !passedNames.has(s.name));
    const blockSkills = [...skills, ...carriedSkills].sort((a, b) => a.name.localeCompare(b.name));

    const blockBody = buildManagedBlockBody(blockSkills, { agentLabel, skillsRootLabel });
    const blockResult = installManagedBlock({ agentsMdPath, blockBody, agentId: id, opts, previousManifest });
    if (!blockResult.ok) return { ok: false, conflicts: blockResult.conflicts, targetRoot: skillsRoot };

    if (!opts.dryRun) {
      writeManifest(skillsRoot, {
        version: opts.cliVersion ?? '0.0.0',
        installedAt: new Date().toISOString(),
        agentsMdPath,
        agentsMdCreated: blockResult.agentsMdCreated,
        files: [...filesResult.carriedFiles, ...filesResult.manifestFiles, blockResult.manifestEntry],
      });
    }
    return {
      ok: true,
      targetRoot: skillsRoot,
      agentsMdPath,
      files: filesResult.manifestFiles.map((f) => f.path),
      orphansRemoved: filesResult.orphansRemoved,
    };
  }

  function uninstall(scope, opts = {}, env = {}) {
    const { skillsRoot, agentsMdPath } = targets(scope, env);
    const manifest = readManifest(skillsRoot);
    if (!manifest) return { ok: true, removed: [], targetRoot: skillsRoot };

    const removed = uninstallSkillFiles({ targetRoot: skillsRoot, manifest });
    uninstallManagedBlock({ agentsMdPath, manifest, agentId: id });
    removeManifest(skillsRoot);
    pruneEmptyDirs(skillsRoot); // fully deckforge-owned directory: safe to remove once empty
    return { ok: true, removed, targetRoot: skillsRoot };
  }

  return { name: id, detect, targets, install, uninstall, invocationHelp: () => invocationHelp };
}

// Codex adapter: skills are copied to ~/.codex/deckforge/skills/ (user) or
// ./.codex/deckforge/skills/ (project), and a managed block is kept in
// AGENTS.md (user: ~/.codex/AGENTS.md, project: ./AGENTS.md) so the agent
// knows to read the relevant SKILL.md before presentation tasks.

import os from 'node:os';
import path from 'node:path';
import { makeManagedBlockAdapter } from './base.js';

function resolvePaths(env = {}) {
  const home = env.homeDir ?? os.homedir();
  const cwd = env.cwd ?? process.cwd();
  return {
    configDir: path.join(home, '.codex'),
    projectConfigDir: path.join(cwd, '.codex'),
    userSkillsRoot: path.join(home, '.codex', 'deckforge', 'skills'),
    projectSkillsRoot: path.join(cwd, '.codex', 'deckforge', 'skills'),
    userSkillsRootLabel: '~/.codex/deckforge/skills',
    projectSkillsRootLabel: '.codex/deckforge/skills',
    userAgentsMd: path.join(home, '.codex', 'AGENTS.md'),
    projectAgentsMd: path.join(cwd, 'AGENTS.md'),
  };
}

const adapter = makeManagedBlockAdapter({
  id: 'codex',
  agentLabel: 'Codex',
  invocationHelp:
    'Codex reads AGENTS.md automatically; it will follow the pointers there to each skill\'s SKILL.md.',
  resolvePaths,
});

export const name = adapter.name;
export const detect = adapter.detect;
export const targets = adapter.targets;
export const install = adapter.install;
export const uninstall = adapter.uninstall;
export const invocationHelp = adapter.invocationHelp;

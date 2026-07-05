// OpenCode adapter: skills are copied to ~/.config/opencode/deckforge/skills/
// (user) or ./.opencode/deckforge/skills/ (project), and a managed block is
// kept in AGENTS.md (user: ~/.config/opencode/AGENTS.md, project: ./AGENTS.md)
// — OpenCode reads AGENTS.md the same way Codex does.

import os from 'node:os';
import path from 'node:path';
import { makeManagedBlockAdapter } from './base.js';

function resolvePaths(env = {}) {
  const home = env.homeDir ?? os.homedir();
  const cwd = env.cwd ?? process.cwd();
  return {
    configDir: path.join(home, '.config', 'opencode'),
    projectConfigDir: path.join(cwd, '.opencode'),
    userSkillsRoot: path.join(home, '.config', 'opencode', 'deckforge', 'skills'),
    projectSkillsRoot: path.join(cwd, '.opencode', 'deckforge', 'skills'),
    userSkillsRootLabel: '~/.config/opencode/deckforge/skills',
    projectSkillsRootLabel: '.opencode/deckforge/skills',
    userAgentsMd: path.join(home, '.config', 'opencode', 'AGENTS.md'),
    projectAgentsMd: path.join(cwd, 'AGENTS.md'),
  };
}

const adapter = makeManagedBlockAdapter({
  id: 'opencode',
  agentLabel: 'OpenCode',
  invocationHelp:
    'OpenCode reads AGENTS.md automatically; it will follow the pointers there to each skill\'s SKILL.md.',
  resolvePaths,
});

export const name = adapter.name;
export const detect = adapter.detect;
export const targets = adapter.targets;
export const install = adapter.install;
export const uninstall = adapter.uninstall;
export const invocationHelp = adapter.invocationHelp;

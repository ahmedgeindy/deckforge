// Adapter registry: maps agent id -> adapter module.

import * as claude from './claude.js';
import * as codex from './codex.js';
import * as opencode from './opencode.js';

export const ADAPTERS = { claude, codex, opencode };
export const AGENT_IDS = Object.keys(ADAPTERS);

/** @returns {typeof claude} the adapter module for the given agent id */
export function getAdapter(id) {
  const adapter = ADAPTERS[id];
  if (!adapter) {
    throw new Error(`unknown agent "${id}" (valid: ${AGENT_IDS.join(', ')})`);
  }
  return adapter;
}

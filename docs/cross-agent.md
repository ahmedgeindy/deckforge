# Cross-Agent Installation & Invocation

DeckForge is agent-agnostic: the six skills are plain Markdown (`SKILL.md` + `references/`), and each supported coding agent discovers and invokes them by a different mechanism. This document is honest about which mechanism is which — only Claude Code has native skill discovery; Codex and OpenCode get the skills onto disk and then rely on an instruction block in `AGENTS.md` telling the agent to go read them.

## Claude Code

**Install:**

```
deckforge install --agent claude --scope user
deckforge install --agent claude --scope project
```

**Where files land:**

| Scope | Path |
|---|---|
| User | `~/.claude/skills/<skill>/` |
| Project | `.claude/skills/<skill>/` |

**Discovery mechanism:** native. Claude Code scans skill directories for `SKILL.md` files and parses their YAML frontmatter (`name`, `version`, `description`) at startup — the `description` field is what the agent matches against the user's request to decide whether to load a skill. No extra configuration or manifest step is required beyond having the files in a discovered location.

**Invocation:** ask naturally — Claude Code matches the request against each installed skill's `description` and loads the matching `SKILL.md` on its own. A skill can also be invoked explicitly, e.g. asking for `presentation-structure` by name.

**Uninstall:** `deckforge uninstall --agent claude --scope user` (or `--scope project`) removes exactly the files `install` created, tracked in `<target>/.deckforge-manifest.json` — it does not touch anything else in the skills directory.

## Codex

**Install:**

```
deckforge install --agent codex --scope user
deckforge install --agent codex --scope project
```

**Where files land:**

| Scope | Path |
|---|---|
| User | `~/.codex/deckforge/skills/` |
| Project | `.codex/deckforge/skills/` |

**Discovery mechanism:** Codex has no native skill-loading system, so DeckForge does not claim one. Install copies the skill files to the paths above, then appends a managed block to `AGENTS.md`:

```
<!-- deckforge:begin -->
... one entry per installed skill, naming it and pointing at its SKILL.md path,
    with an instruction to read the relevant SKILL.md before presentation tasks ...
<!-- deckforge:end -->
```

This is an **instruction block the agent reads as part of its system context** — it is not a plugin API and not a slash-command registry. The agent follows the block's instruction to open and read a `SKILL.md` file when a presentation task comes up; it is exactly as reliable as Codex's general instruction-following, not a guaranteed hook. If `AGENTS.md` does not exist yet, it is created containing only the managed block.

**Invocation:** ask naturally, in the same session where `AGENTS.md` is loaded. There is no `/skill-name` command for Codex — the managed block is what makes the agent aware the skills exist and where to find them.

**Uninstall:** `deckforge uninstall --agent codex --scope user|project` deletes the copied skill files (via the manifest, same as Claude Code) and removes the managed block from `AGENTS.md` by its `<!-- deckforge:begin -->` / `<!-- deckforge:end -->` markers only — content outside the markers is never touched.

## OpenCode

**Install:**

```
deckforge install --agent opencode --scope user
deckforge install --agent opencode --scope project
```

**Where files land:**

| Scope | Path |
|---|---|
| User | `~/.config/opencode/deckforge/skills/` |
| Project | `.opencode/deckforge/skills/` |

**Discovery mechanism:** the same file-drop + managed `AGENTS.md` block pattern as Codex (OpenCode also reads `AGENTS.md`). Same honesty note applies: this is an instruction block, not native skill discovery. If `AGENTS.md` is missing, it is created with only the block.

**Invocation:** ask naturally, same as Codex — no native slash-command equivalent.

**Uninstall:** same mechanism as Codex — manifest-tracked file removal plus managed-block removal by markers.

## Managed-block discipline (Codex + OpenCode)

Both adapters share one rule: **managed-block edits never touch content outside the markers.** Anything a user or another tool has written into `AGENTS.md` outside `<!-- deckforge:begin -->…<!-- deckforge:end -->` survives every `install`, `update`, and `uninstall`. `deckforge update` (alias for `install --force` on skills whose bundled version is newer) regenerates the block's contents in place, in the same position, without disturbing surrounding text.

## Compatibility matrix

| | Claude Code | Codex | OpenCode |
|---|---|---|---|
| Skill discovery | Native (`SKILL.md` frontmatter scan) | Managed `AGENTS.md` instruction block | Managed `AGENTS.md` instruction block |
| User-scope path | `~/.claude/skills/<skill>/` | `~/.codex/deckforge/skills/` | `~/.config/opencode/deckforge/skills/` |
| Project-scope path | `.claude/skills/<skill>/` | `.codex/deckforge/skills/` | `.opencode/deckforge/skills/` |
| Invocation | Ask naturally, or reference the skill by name | Ask naturally (agent reads the referenced `SKILL.md`) | Ask naturally (agent reads the referenced `SKILL.md`) |
| Slash-command equivalent | Yes (skill name) | No | No |
| Uninstall | Manifest-tracked file removal | Manifest-tracked file removal + marker-scoped `AGENTS.md` edit | Manifest-tracked file removal + marker-scoped `AGENTS.md` edit |
| `deckforge doctor` checks | Agent dir present, installed vs. bundled versions | Agent dir present, installed vs. bundled versions, `AGENTS.md` block present | Agent dir present, installed vs. bundled versions, `AGENTS.md` block present |

## `--agent all` and auto-detect

`deckforge install` with no `--agent` flag auto-detects which agents' directories already exist on the machine and installs to all of them, listing what it found first. `--agent all` installs to all three regardless of detection. Both respect `--scope`, `--force`, and `--dry-run` identically across agents — the adapter interface (`detect()`, `install()`, `uninstall()`, `invocationHelp()`) is the same shape for all three; only the paths and the discovery mechanism differ, as described above.

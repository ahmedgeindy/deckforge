# DeckForge v1.0.0 — Release Specification

**Status:** Release-candidate preparation. DO NOT PUBLISH — human review gates GitHub push and npm publish.
**Date:** 2026-07-06

## 1. What DeckForge is

DeckForge is an agent-agnostic skill pack + CLI that turns a coding agent (Claude Code, Codex, OpenCode) into a disciplined presentation pipeline: six staged skills that take source material to a finished deck with an auditable engineering build log.

Pipeline: `structure → design → copywriting → diagram → render → qa → build-report`.

| Stage | Skill | What it does |
|---|---|---|
| 1 | presentation-structure | Narrative outline: story frameworks, QA gates, kill-filter, fact bank |
| 2 | presentation-design | Visual system: design tokens, 11 slide archetypes, AI-tell avoidance |
| 3 | presentation-copywriting | Slide copy: title craft, registers, 18-check fact-fidelity gate |
| 4 | diagram-design | Diagrams: escalation ladder (prose→list→table→diagram), spec contract |
| 5 | presentation-qa | Final gate: check catalog, consistency sweeps, SHIP/BLOCKED verdict |
| 6 | presentation-build-report | Internal build log: confidence rubric, telemetry, PASS/FAILED status (Python aggregator) |

Skills are Markdown instruction sets (progressive disclosure: SKILL.md + references/). Only stage 6 ships code: a stdlib-only Python 3 aggregator with its pytest suite.

## 2. Locked decisions (defaults chosen for RC; flag at review)

- **Name:** DeckForge. npm package **`deckforge`** (bin: `deckforge`). Fallback if name taken at publish time: `deckforge-cli` (checklist item — verify with `npm view deckforge` before publish).
- **License:** MIT. Copyright holder: Ahmed Geindy.
- **Version:** 1.0.0 everywhere (package.json, each SKILL.md `version:` frontmatter already 1.0.0, CHANGELOG).
- **Repo layout:** single npm package (NOT a workspaces monorepo for v1 — the only runtime artifacts are markdown skills + one Python module + a thin installer CLI; a monorepo adds ceremony with zero payoff until a JS core exists). Revisit at v2 if a renderer/core package materializes.
- **Node:** >=18. **Zero npm dependencies** (ANSI colors, arg parsing, fs ops via stdlib).
- **Python:** >=3.9, stdlib only, needed ONLY for the build-report aggregator. `deckforge doctor` checks it; absence degrades gracefully (5 of 6 skills work without it).
- **v1.1 backlog explicitly out of scope:** qa double-penalty rubric fix, render_md empty-list placeholder, cosmetic-severity count. Ship v1.0 rubric as-is; note in CHANGELOG "Known calibration items".

## 3. Repository layout

```
DeckForge/
├── package.json               # name deckforge, bin, files whitelist, engines
├── bin/deckforge.js           # entry — dispatch to src/commands/*
├── src/
│   ├── commands/              # install, uninstall, list, doctor, init, update
│   ├── adapters/              # claude.js, codex.js, opencode.js (+ base.js)
│   ├── ui.js                  # ANSI helpers, prompts, error formatting
│   └── skills.js              # skill manifest reader (frontmatter parse)
├── skills/                    # the six skills, verbatim from v1.0 freeze
│   ├── presentation-structure/
│   ├── presentation-design/
│   ├── presentation-copywriting/
│   ├── diagram-design/
│   ├── presentation-qa/
│   └── presentation-build-report/   # incl. scripts/*.py + tests
├── examples/
│   ├── quickstart/            # brief.md → what to ask the agent, expected flow
│   └── build-report-sample/   # real fixture package + generated execution-report.{md,json}
├── docs/
│   ├── release-spec.md        # this file
│   ├── pipeline.md            # stage-by-stage guide, artifact contracts
│   ├── skills-reference.md    # per-skill: triggers, inputs, outputs, references map
│   ├── confidence-rubric.md   # scoring/status policy (user-facing digest)
│   ├── cross-agent.md         # Claude Code / Codex / OpenCode installation + invocation
│   └── faq.md
├── test/                      # node:test suites for CLI + adapters
├── .github/
│   ├── workflows/ci.yml       # node test + pytest on 3 OS
│   ├── workflows/release.yml  # tag-triggered, MANUAL approval, npm publish --dry-run gate
│   ├── ISSUE_TEMPLATE/{bug.yml,feature.yml}
│   └── PULL_REQUEST_TEMPLATE.md
├── README.md
├── LICENSE
├── CHANGELOG.md
├── CONTRIBUTING.md
├── SECURITY.md
├── CODE_OF_CONDUCT.md
└── .gitignore / .npmignore (or files whitelist)
```

## 4. CLI surface (`deckforge`)

Conventions: every command supports `--help`; errors are one-line problem + one-line fix; exit codes 0/1/2 (ok / user error / environment error); `--json` on list/doctor for scripting; no telemetry, no network calls ever.

- `deckforge install [--agent claude|codex|opencode|all] [--scope user|project] [--force] [--dry-run]`
  Copies skills into the agent's discovery location (see §5). Default agent: auto-detect (which agent dirs exist); if several, install to all detected after listing them. Idempotent; `--force` overwrites modified files, otherwise refuses with diff hint.
- `deckforge uninstall [--agent ...] [--scope ...]` — removes exactly what install created (manifest tracked in `<target>/.deckforge-manifest.json`).
- `deckforge list [--json]` — bundled skills + versions + install status per agent.
- `deckforge doctor [--json]` — checks: node version, python3 presence/version, agent dirs found, installed skill versions vs bundled, PYTHONUTF8 note for Windows.
- `deckforge init [dir]` — scaffolds a deck workspace: `brief.md` template, `sources/`, `build/` layout with README explaining pipeline artifacts.
- `deckforge update` — alias: install --force for skills whose bundled version is newer.

## 5. Cross-agent adapters

Adapter interface (`src/adapters/base.js`): `detect() → {found, userDir, projectDir}`, `install(skills, scope, opts)`, `uninstall(scope)`, `invocationHelp()`.

- **Claude Code (`claude.js`)** — user scope `~/.claude/skills/<skill>/`, project scope `.claude/skills/<skill>/`. Skills auto-discovered natively via SKILL.md frontmatter. Invocation: ask naturally or `/skill-name`.
- **Codex (`codex.js`)** — copies skills to `~/.codex/deckforge/skills/` (project: `.codex/deckforge/skills/`) and appends a managed block (`<!-- deckforge:begin -->…<!-- deckforge:end -->`) to `AGENTS.md` describing each skill and telling the agent to read the relevant SKILL.md before presentation tasks. Uninstall removes the block by markers.
- **OpenCode (`opencode.js`)** — same file-drop + managed AGENTS.md block pattern (OpenCode reads AGENTS.md); files under `~/.config/opencode/deckforge/skills/` (project: `.opencode/deckforge/skills/`).

Managed-block edits never touch content outside markers; if AGENTS.md is missing it is created with only the block.

## 6. Documentation set

README.md is the front door: what/why (2 paragraphs + pipeline diagram), 60-second quickstart (`npm i -g deckforge && deckforge install && deckforge init my-deck`), skill table, agent-compat matrix, example output screenshot-as-markdown, links into docs/. Everything else lives in docs/ (§3 list). Tone: engineering-grade, zero hype — the copywriting skill's own anti-hype rules apply to our README.

## 7. Examples

- `examples/quickstart/`: `brief.md` (realistic product-review brief), `sources/` (2 small fake source docs), `EXPECTED.md` (what the pipeline produces at each stage, with the actual stage artifacts trimmed).
- `examples/build-report-sample/`: eval-0 clean fixture (6 stage reports + stage-log.json) + the real generated `execution-report.md`/`.json` — shows the flight-recorder deliverable honestly (it was produced by the actual aggregator).

## 8. CI / GitHub readiness

- `ci.yml`: matrix {ubuntu, macos, windows} × node 18/20/22 → `node --test`; python 3.9/3.12 → `pytest skills/presentation-build-report/scripts` (with `PYTHONUTF8=1`). Markdown link check (lychee or a no-dep node script).
- `release.yml`: on tag `v*`: run CI, `npm pack`, attach tarball to GitHub Release draft, `npm publish` behind environment approval. Never auto-publishes.
- Issue/PR templates, CODEOWNERS (@ahmedgeindy), branch = main.

## 9. Release checklist (RELEASE-CHECKLIST.md at repo root)

Pre-push: all tests green (node + pytest), `npm pack --dry-run` file list reviewed, README quickstart executed verbatim on a clean machine/temp dir, LICENSE holder confirmed, npm name availability checked, repo URL set in package.json, CHANGELOG 1.0.0 dated, no workspace/eval artifacts leaked into tarball, secrets scan.
Publish (human): create GitHub repo, push, tag v1.0.0, npm publish, verify `npx deckforge doctor` from registry.

## 10. Delegation plan (build order)

1. Controller: scaffold + copy skills (clean: no .git/.pytest_cache/__pycache__) + package.json + LICENSE + .gitignore. Commit.
2. Parallel agents (disjoint paths, this spec as shared brief):
   A. CLI: bin/ + src/ + test/ (largest task)
   B. docs/: pipeline.md, skills-reference.md, confidence-rubric.md, cross-agent.md, faq.md (reads skills/ for ground truth)
   C. examples/ (reuses eval-0 fixture + real report)
   D. .github/ + community files (CONTRIBUTING, SECURITY, CODE_OF_CONDUCT, templates, workflows) + CHANGELOG + RELEASE-CHECKLIST
3. Controller: README.md last (needs final CLI surface), integration verify (tests, npm pack dry-run, temp-dir install smoke on all 3 adapters, pytest), review pass, fix, commit series, RC report to user. STOP before any push/publish.

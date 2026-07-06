# DeckForge

**A presentation pipeline for coding agents.** Six staged skills turn Claude Code, Codex, or OpenCode into a disciplined deck-building system: narrative structure, visual design, copywriting, diagrams, QA, and an auditable engineering build log — instead of one long "make me a presentation" prompt.

DeckForge governs *what goes on the slides and whether it's true*. Your agent (and your renderer of choice — HTML, PPTX, anything) does the building. Every deck ends with a machine-checked verdict (`PASS` / `PASS WITH WARNINGS` / `FAILED`) and an execution report that records what was claimed, what was verified, what was skipped, and why.

```
brief + sources
        │
        ▼
┌───────────────┐   ┌───────────────┐   ┌───────────────┐   ┌───────────────┐
│ 1 structure   │──▶│ 2 design      │──▶│ 3 copywriting │──▶│ 4 diagrams    │
│ outline +     │   │ tokens +      │   │ titles, body, │   │ escalation    │
│ fact bank     │   │ archetypes    │   │ fact fidelity │   │ ladder, specs │
└───────────────┘   └───────────────┘   └───────────────┘   └───────────────┘
                                                                    │
        ┌───────────────────────────────────────────────────────────┘
        ▼
┌───────────────┐   ┌───────────────┐   ┌─────────────────────────────┐
│ 5 render      │──▶│ 6 qa          │──▶│ 7 build report              │
│ your deck     │   │ SHIP/BLOCKED  │   │ confidence, telemetry,      │
│ system        │   │ verdict       │   │ PASS/FAILED — internal log  │
└───────────────┘   └───────────────┘   └─────────────────────────────┘
```

Seven pipeline stages; six are DeckForge skills — stage 5 (render) is your own deck system.

## Quickstart

```bash
npm install -g deckforge-cli

deckforge install          # copies skills into your detected agent(s)
deckforge init my-deck     # scaffolds brief.md, sources/, build/
cd my-deck
```

(The npm package is `deckforge-cli` — the unsuffixed name was already taken by an unrelated project — but the command it installs is plain `deckforge`.)

Then open your agent in that directory and ask:

> Build me a presentation from brief.md — follow the DeckForge pipeline.

Artifacts land in `build/` as the stages run; the final `build/execution-report.md` tells you whether the deck is fit to ship and what to fix if it isn't. Full walkthrough: [`examples/quickstart/WALKTHROUGH.md`](examples/quickstart/WALKTHROUGH.md).

## The six skills

| Stage | Skill | What it enforces |
|---|-------|------------------|
| 1 | `presentation-structure` | Narrative outline from story frameworks; every claim traced to a fact bank; kill-filter cuts slides that don't earn their place |
| 2 | `presentation-design` | Design tokens, 11 slide archetypes, evidence craft, 26 AI-tell checks |
| 3 | `presentation-copywriting` | Title/body craft by register; a six-step fact-fidelity gate plus 18 copy-quality checks; escalates instead of inventing |
| 4 | `diagram-design` | Escalation ladder (prose → list → table → diagram); every edge verb-labeled and provenanced; demotion is legal and always reported |
| 6 | `presentation-qa` | Check catalog, consistency sweeps, accessibility annex; computes a `SHIP` / `SHIP-WITH-ACCEPTED-MAJORS` / `BLOCKED` verdict from pre-agreed gates |
| 7 | `presentation-build-report` | Internal build log: per-stage + weighted-overall + weakest-stage confidence, telemetry, source coverage, prioritized recommendations. Deterministic Python aggregator — never part of the deliverable |

(Stage 5, render, is your deck system — HTML, PPTX, anything your agent can drive.)

Skills are Markdown instruction sets (progressive disclosure: a short `SKILL.md`, detailed `references/`). Only the build report ships code — a stdlib-only Python 3 module with its own test suite. Details: [`docs/skills-reference.md`](docs/skills-reference.md).

## Agent compatibility

| Agent | Install target | Discovery mechanism |
|-------|----------------|---------------------|
| Claude Code | `~/.claude/skills/` or `./.claude/skills/` | Native skill discovery (SKILL.md frontmatter) |
| Codex | `~/.codex/deckforge/skills/` | Managed block in `AGENTS.md` pointing at each skill |
| OpenCode | `~/.config/opencode/deckforge/skills/` | Managed block in `AGENTS.md` pointing at each skill |

`deckforge install` auto-detects which agents are present; `--agent` and `--scope user|project` override. Uninstall removes exactly what install created (manifest-tracked). Honest caveat: on Codex and OpenCode the mechanism is an instruction block the agent reads, not native skill support — see [`docs/cross-agent.md`](docs/cross-agent.md).

## CLI

```
deckforge install    [--agent claude|codex|opencode|all] [--scope user|project] [--force] [--dry-run]
deckforge uninstall  [--agent ...] [--scope ...]
deckforge list       [--json]
deckforge doctor     [--json]
deckforge init       [dir]
deckforge update
```

Zero npm dependencies. No network calls, no telemetry — ever. `deckforge doctor` checks node/python versions and agent detection.

**Requirements:** Node ≥ 18. Python ≥ 3.9 (stdlib only) — needed *only* for the build-report aggregator; the other five skills work without it. Windows: run Python with `PYTHONUTF8=1` (the skills say this themselves; `doctor` reminds you).

## The execution report

Every pipeline run ends with an internal build log — never a slide, never in the export bundle:

- **Two confidence numbers, always:** a weighted overall (is the build broadly healthy?) *and* the weakest stage (what's the risk floor?). A deck must not inherit its worst stage as its headline score — and a healthy average must not hide one shaky stage.
- **Zero fabrication:** unmeasured telemetry is `"not captured"`, silent stages are `"none reported"`. Numbers are never invented.
- **Deterministic:** same inputs, same report. Scoring rubric and status policy live in code, not vibes: [`docs/confidence-rubric.md`](docs/confidence-rubric.md).

A real generated sample (fixture package in, actual aggregator output out): [`examples/build-report-sample/`](examples/build-report-sample/).

## Documentation

- [`docs/pipeline.md`](docs/pipeline.md) — stage-by-stage guide and artifact contracts
- [`docs/skills-reference.md`](docs/skills-reference.md) — per-skill reference
- [`docs/confidence-rubric.md`](docs/confidence-rubric.md) — scoring and build-status policy
- [`docs/cross-agent.md`](docs/cross-agent.md) — installation and invocation per agent
- [`docs/faq.md`](docs/faq.md) — common questions
- [`CHANGELOG.md`](CHANGELOG.md) — including known calibration items planned for v1.1

## Contributing

See [`CONTRIBUTING.md`](CONTRIBUTING.md). Skill behavior changes bump the skill's `version:` frontmatter and get a CHANGELOG entry; the confidence rubric in `skills/presentation-build-report/references/confidence-and-status.md` is canonical.

## License

[MIT](LICENSE)

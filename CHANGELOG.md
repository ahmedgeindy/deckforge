# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed

- **presentation-build-report** — the CLI now validates `stage-records.json`, `qa.json`, `meta.json` and `stage-log.json` before computing anything. A malformed input prints one `ERROR:` line naming the file, record and field, writes no report, and exits 1, instead of a Python traceback. An unrecognised QA verdict (for example a typo of `BLOCKED`) is now an error rather than being treated as not blocked. A UTF-8 BOM in the JSON files is accepted.
- **presentation-build-report** — `python <skill dir>/scripts/build_report.py <build_dir>` now works from any working directory. `python -m scripts.build_report` from the skill directory still works.

## [1.0.0] - 2026-07-06

Initial release.

### Added

- **presentation-structure** — narrative outline builder: story frameworks, QA gates, kill-filter, fact bank.
- **presentation-design** — visual design system builder: design tokens, 11 slide archetypes, AI-tell avoidance.
- **presentation-copywriting** — slide copy writer: title craft, tone registers, 18-check fact-fidelity gate.
- **diagram-design** — diagram spec builder: escalation ladder (prose → list → table → diagram), spec contract.
- **presentation-qa** — final quality gate: check catalog, consistency sweeps, SHIP/BLOCKED verdict.
- **presentation-build-report** — internal engineering build log aggregator: confidence rubric, telemetry, PASS / PASS WITH WARNINGS / FAILED status (stdlib-only Python, with pytest suite).
- Installer CLI (`deckforge`) with `install` / `uninstall` / `list` / `doctor` / `init` / `update` commands and adapters for Claude Code, Codex, and OpenCode.
- Documentation set: pipeline guide, skills reference, confidence rubric digest, cross-agent installation guide, FAQ.
- Examples: quickstart brief with expected per-stage pipeline output, and a build-report sample fixture with a real generated execution report.

### Known calibration items (planned for 1.1)

- **QA double-penalty** — a finding raised by `presentation-qa` docks a stage's confidence score, and can *also* trip a verdict gate that independently affects `build_status` — the same issue is counted against the build twice. Deferred to 1.1; v1.0 ships the rubric as specified in `skills/presentation-build-report/references/confidence-and-status.md`.
- **Cosmetic empty-list rendering** — `render_md.py` renders some empty finding lists with a placeholder line rather than omitting the section. Cosmetic only; the underlying data and computed verdict are unaffected.
- **Cosmetic-severity counts not surfaced** — the aggregator tracks blocker/major/minor/failed-gate counts but does not currently break out a separate cosmetic-severity count in the rendered report.

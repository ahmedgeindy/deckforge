# Contributing to DeckForge

## Dev setup

```
git clone https://github.com/ahmedgeindy/deckforge.git
cd deckforge
```

Requirements:

- Node.js >= 18 (zero npm dependencies — no `npm install` step is needed to run the test suite)
- Python >= 3.9 (stdlib only, needed for the `presentation-build-report` aggregator)

Run the checks:

```
npm test              # node:test suite (CLI + adapters)
pip install pytest
npm run test:python   # pytest skills/presentation-build-report/scripts -q
```

On Windows, set `PYTHONUTF8=1` before running the Python suite (CI does this for you).

## Repo layout

See `docs/release-spec.md` §3 for the full repository layout and what lives where (CLI in `bin/`/`src/`, the six skills in `skills/`, docs in `docs/`, examples in `examples/`, tests in `test/`).

## Editing a skill

Skills are versioned. If you change a skill's behavior (not just prose/typo fixes):

1. Bump that skill's `version:` field in its `SKILL.md` frontmatter.
2. Add a CHANGELOG.md entry describing the change.
3. If the change touches `presentation-build-report`, treat `skills/presentation-build-report/references/confidence-and-status.md` as canonical — it documents the exact constants in `scripts/config.py`. Code and docs must agree; if you change one, update the other in the same PR, and update/add tests under `skills/presentation-build-report/scripts/test_*.py` accordingly.

Never report or imply a metric, score, or count that the code doesn't actually compute — this applies to skill docs, the CLI, and this repo's own docs equally.

## Commit style

Use [Conventional Commits](https://www.conventionalcommits.org/) (`feat:`, `fix:`, `docs:`, `chore:`, `test:`, `refactor:`) for commit subjects.

## Pull request flow

1. Fork/branch from `main`.
2. Make your change; keep it focused.
3. Run `npm test` and `npm run test:python` locally.
4. Fill out the PR template checklist (tests, docs, no fabricated metrics, CHANGELOG entry).
5. Open the PR — CI runs the same node + pytest matrix as local. `CODEOWNERS` auto-requests review.

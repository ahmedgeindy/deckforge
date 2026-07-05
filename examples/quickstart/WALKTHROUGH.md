# Quickstart — build your first deck with DeckForge

This walks through turning `brief.md` + `sources/` in this folder into a finished presentation,
using DeckForge's seven-stage pipeline (six skills plus your own renderer). Expect ~10 minutes of
your own time plus however long your agent takes to run the stages (the build-report-sample
example shows what a finished run's telemetry looks like — fixture data of ~15 minutes of agent
time / ~238K tokens for a 12-slide deck; yours will vary).

**Read this first:** DeckForge does not render slides itself. It is a set of instruction skills
(Markdown) that teach your coding agent a disciplined pipeline, plus one Python script that
aggregates an internal build log at the end. Your agent — Claude Code, Codex, or OpenCode — does
the actual thinking and writing at every stage, including the final render (it needs a rendering
skill of its own, such as `document-skills:pptx`, or a project-specific deck renderer). If you
skip installing a renderer, stages 1-4 and 6-7 still work; stage 5 (render) is on you to supply.

## 1. Install DeckForge

```bash
npm i -g deckforge
deckforge install
```

`deckforge install` auto-detects which agents you have (Claude Code, Codex, OpenCode) and copies
the six skills into each one's discovery location. Run `deckforge list` afterward to confirm
what's installed where, or `deckforge doctor` to check Python is available for stage 7 (the
build-report aggregator; the other stages don't need Python).

If you'd rather scope the install to just this project instead of your whole user account, add
`--scope project` and re-run `deckforge install` from your project root.

## 2. Open your agent in this directory

```bash
cd examples/quickstart
# then launch your agent (claude, codex, or opencode) in this directory
```

This folder already has what a real deck workspace needs: `brief.md` and `sources/`. (For a new
project of your own, `deckforge init my-deck` scaffolds this same layout with a blank
`brief.md` template.)

## 3. Ask your agent to build the deck

Prompt it plainly, e.g.:

> Build me a presentation from brief.md — follow the DeckForge pipeline.

You don't need to name each skill — the pipeline skills are written to trigger on this kind of
request. If your agent asks clarifying questions the brief didn't answer, that's the structure
stage's intake step working as intended (see Step 0 of `presentation-structure`) — answer them
and continue.

## 4. What happens at each stage

| # | Stage | Skill | What it does with this brief |
|---|-------|-------|-------------------------------|
| 1 | structure | `presentation-structure` | Reads `brief.md` + `sources/`, picks a narrative framework (this brief is a decision meeting, skeptical-on-ROI/aligned-on-mission — expect an answer-first pyramid), writes a slide-by-slide outline, runs 10 QA gates on it, and should ask you to approve the outline before continuing. |
| 2 | design | `presentation-design` | Assigns each outlined slide a layout archetype, applies the design-token system, checks acceptance budgets (hero numbers per slide, dark-slide count, etc.). |
| 3 | copywriting | `presentation-copywriting` | Writes the actual slide titles/body copy, tracing every number and quote back to `metrics-summary.md` / `customer-feedback-notes.md`. Runs a six-step fact-fidelity gate plus 18 copy-quality checks — this is what stops it from inventing a stat neither source file contains. |
| 4 | diagram | `diagram-design` | Decides which slides need an actual diagram vs. a list/table (the escalation ladder) — for this brief, expect at most a small funnel or timeline, not one on every slide. |
| 5 | render | *your renderer* | DeckForge doesn't ship this stage. Your agent hands the approved outline + copy to whatever rendering skill you have installed (e.g. `document-skills:pptx`) to produce the actual file. |
| 6 | qa | `presentation-qa` | Fresh-eyes pass over the rendered deck: severity-tagged findings, a consistency sweep across slides, and a SHIP/BLOCKED verdict. |
| 7 | build report | `presentation-build-report` | Always runs last, even if QA finds problems. Aggregates everything above into an internal engineering log — never part of the deck itself. |

## 5. What to expect in `build/`

If your agent follows the pipeline as instructed, you'll end up with a `build/` directory next
to (not inside) the rendered deck, containing:

- `stage-log.json` — tokens/duration per stage, captured live during the run.
- `inputs/stage-records.json`, `inputs/qa.json`, `inputs/meta.json` — harvested from each stage's
  own report.
- `execution-report.md` and `execution-report.json` — the two files
  `scripts/build_report.py` writes.

See `../build-report-sample/` for a full worked example of exactly these files (from a different
fictional deck) if you want to see the shape before your own run finishes.

## 6. Reading the execution report

Open `build/execution-report.md`. What to look for, top to bottom:

- **Build Status line** — one of `PASS`, `PASS WITH WARNINGS`, or `FAILED`. `PASS` means every
  expected stage reported in and QA shipped clean; anything else means read further before
  treating the deck as done.
- **Confidence** — two different numbers, not one: a **weighted-overall** score across all
  scored stages, and a **weakest-stage** score (the single lowest-confidence stage, called out by
  name). A high weighted-overall can hide one shaky stage — always check which stage is weakest.
  `render` never gets a confidence score (there's nothing for the aggregator to grade there).
- **Skipped by design** — cut slides, rejected design changes, demoted diagram candidates, each
  with a stated reason. This is a feature, not noise: it's the paper trail for "why isn't X in
  the deck."
- **Needs Verification / Assumptions / Conflicting Sources** — should read "none reported" on a
  clean run like the sample. If your real run surfaces any of these, resolve them before you
  present — they mean a stage flagged something it couldn't confirm from your source material.
- **Recommendations** — prioritized (P1 first); on a clean build this is just "no high-impact
  improvements identified."

This file is for you and your team, not for the audience in the brief — never attach it to the
deck you actually present.

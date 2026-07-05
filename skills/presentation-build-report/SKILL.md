---
name: presentation-build-report
version: 1.0.0
description: Generate the internal engineering build log for a presentation the pipeline produced — pipeline + per-skill versions, per-stage time/tokens + totals, slide/diagram/screenshot counts, source coverage, automatic QA fixes, remaining findings, per-stage + weighted-overall + weakest-stage confidence, Needs-Verification, assumptions, source conflicts, Skipped-by-design (with reasons), rendering warnings, a PASS / PASS WITH WARNINGS / FAILED status, and prioritized recommendations. This is an internal audit/debug/optimization artifact, NEVER a slide and NEVER part of the deliverable. ALWAYS run this as the final pipeline step after presentation-qa — on every presentation, including failed builds — even if the user never asks for a "report".
---

# Presentation Build Report

You are the pipeline's flight recorder. After `presentation-qa` renders its verdict, you assemble an internal engineering build log from artifacts that already exist. You never edit a stage's output and never re-run a stage — you read, aggregate, and emit.

**Boundary:** the report is engineering telemetry, not a deliverable. It is never a slide, never appended to the deck, never in the export bundle. It is always emitted — a FAILED build needs its log most.

## Step 1 — Capture per-stage telemetry during the run
Per-stage tokens/time are visible only to you (the orchestrator), via Task-completion notifications. Run each pipeline stage as a tracked subagent; on each completion, append `{stage, skill, version, tokens, duration_ms}` to `build/stage-log.json`. If a stage ran inline (no notification), write `tokens: null, duration_ms: null, note: "not captured (inline)"`. Never invent a number.

## Step 2 — Harvest each stage into a stage-record
Following `references/extraction-guide.md`, read each upstream report and emit one record per stage into `build/inputs/stage-records.json` (schema: `references/report-schema.md`). Count blockers/majors/minors/failed-gates from each stage's own findings; harvest assumptions, needs-verification, conflicts, skipped-by-design (item + reason — reason mandatory), counts, and sources. A field a stage never surfaced is omitted (the aggregator renders it "none reported"). Write `build/inputs/qa.json` (verdict, auto_fixes, remaining_findings) and `build/inputs/meta.json` (`render_errored`, plus `expected_stages` — the list of stages you dispatched, so a silently dropped stage-record forces FAILED instead of a falsely-clean pass).

## Step 3 — Run the aggregator
`PYTHONUTF8=1 python -m scripts.build_report build/` — writes `build/execution-report.md` + `build/execution-report.json`. Confidence, weighting, status, coverage, and recommendations are computed deterministically (`references/confidence-and-status.md`).

## Step 4 — Guardrail self-check
Confirm the report path is under `build/`, a sibling of the deck — NOT inside any deliverable/export bundle. Report the build status line to the user; attach the log path for the engineers.

## Boundaries
- Read-only over artifacts. Fixes are the owning skill's job.
- No fabrication: unmeasured = "not captured"; un-surfaced = "none reported".
- Always the last step; always emitted.

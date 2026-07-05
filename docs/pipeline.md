# Pipeline

DeckForge runs seven stages, in a fixed order, from source material to a finished deck plus an internal build log:

```
structure → design → copywriting → diagram → render → qa → build-report
```

Six stages are DeckForge skills (Markdown instruction sets under `skills/`). The fifth stage, **render**, is not a DeckForge skill — it is the user's own renderer or deck system (`document-skills:pptx`, an HTML deck system, or a project-specific one). DeckForge governs content, design, and QA; it does not ship a renderer.

This document describes what each stage consumes and produces, how the orchestrating agent (the coding agent driving the pipeline — Claude Code, Codex, or OpenCode) hands artifacts from one stage to the next, and ends with one worked example.

## Stage-by-stage guide

### 1. `presentation-structure` — narrative outline

**What it does:** Decides what the slides say and in what order, before any visual or wording work. Runs an intake (audience, goal, format, artifact type, raw material), routes to a story framework via a 2×2 (conclusion placement × audience posture), writes the one-sentence message, sets a slide/time budget, storyboards a dot-dash outline, and gets the ghost deck approved. Runs 10 QA gates on the outline itself (so-what, vertical/horizontal flow, elevator test, shape check, loop ledger, SUCCESs sweep, rule of three, red team, ending) before handoff.

**Consumes:** a brief, source documents/data, and the user's answers to the intake questions.

**Produces:** the locked outline — per slide: beat, full-sentence assertion title, evidence intent, layout archetype hint, chapter — plus the **verified fact bank** (every stat traced to a source), the outline-gate results, and the kill-filter log (slides cut and why).

**Hand-off:** the orchestrating agent holds the approved outline and fact bank as the pipeline's first immutable artifact. Every later stage treats both as read-only input; a stage that finds a structural problem (a beat that can't be designed, diagrammed, or worded honestly) flags it back to this stage rather than silently patching it downstream.

### 2. `presentation-design` — visual system

**What it does:** Transforms the locked outline into a visual spec: extracts (never invents) brand tokens, classifies each beat's rhetorical job and maps it to one of 11 archetypes, checks archetype rhythm across the deck, emits a per-slide composition spec (dominant element, look order, fill level, accent spend, grid placement, evidence spec, build steps, speaker-notes routing), and runs a 26-item AI-tell elimination pass. Emits a design-review report and gets it approved before anything is rendered.

**Consumes:** the locked outline, delivery mode (presented / sent-ahead / both), audience overlay (executive / presales / marketing), brand assets, and venue constraints.

**Produces:** the token sheet (type ramp, spacing, color roles, grid), the deck map (one row per slide: beat, job, archetype, dominant element, look order, fill, accent, builds), the design-review report (severity-ordered findings, budgets ledger, disposition log), and the per-slide composition spec.

**Hand-off:** the token sheet and per-slide composition spec become the shared visual contract every later stage snaps to — copy fits the spec's word budgets, diagrams spend the spec's one permitted accent, the renderer places only what the spec's grid placements allow, and QA re-checks the render against this same spec rather than inventing new design opinions.

### 3. `presentation-copywriting` — slide copy

**What it does:** Renders each locked claim into final wording — assertion title, kicker, subtitle, body/bullets, annotations, captions, source lines, CTA, speaker notes, alt text — for the audience register (executive / presales / marketing), without changing what any claim asserts. Every quantitative claim is treated as an invariant tuple (value, unit, aggregation, baseline, conditions, comparator, date, hedge) that must survive every rewrite in meaning. Runs a six-step fact-fidelity gate plus an anti-pattern sweep before handoff.

**Consumes:** the locked outline + fact bank, the design spec (archetype, word budgets, delivery mode, overlay), and the underlying source/technical material.

**Produces:** per-slide copy (`assertionTitle`, `kicker`, `subtitle`, `bodyCopy`/`bullets`, `annotations`, `caption`, `sourceLine`, `ctaText`, `speakerNotes`, `altText`), a deck-level message-house vocabulary sheet, the fact-fidelity report, and escalation flags (`SPLIT_SLIDE`, `GROUPING_INVALID`, `TITLE_BODY_MISMATCH`, `EVIDENCE_GAP`, `MISSING_SLIDE`, `BUDGET_OVERFLOW`, `FACT_UNSOURCED`).

**Hand-off:** downstream treats every copy string as immutable. Any renderer-side truncation or rewrap beyond the supplied break hint is a `BUDGET_OVERFLOW` escalation back to this stage, never a silent edit at render time. Escalation flags this stage raises are never resolved here — the orchestrating agent routes each to its owning stage (usually `presentation-structure`).

### 4. `diagram-design` — information graphics

**What it does:** For every slide whose archetype/evidence spec calls for a diagram, names the relationship the content asserts, gates it against eight "don't diagram" conditions and an escalation ladder (prose → list → table → diagram), ghosts the exhibit, constructs the chosen form, sets the one emphasis target, authors builds, and runs four acceptance gates (speed, falsifiability, two-way trace, stranger test) before emitting the spec. "No diagram" — a demotion back down the ladder — is a first-class, reported output, not a failure.

**Consumes:** the locked slide specs (assertion titles are written upstream; the diagram is derived from the title, never the reverse), the source content, the deck token sheet, delivery mode, and audience.

**Produces:** one `diagramSpec` per diagram actually built (form, nodes, verb-labeled edges with provenance, groups, layout hints, build steps, the one accent target), a **demotion report** (content that stayed text/list/table, and why), and a **two-way trace table** (every element traces to source; every source claim traces to an element or the demotion report).

**Hand-off:** a deck can legitimately have zero diagrams — the demotion report is what tells the orchestrating agent (and later, the build report) that this was a deliberate decision, not a dropped stage. Diagram specs are handed to the renderer alongside the copy and design spec; QA later re-checks render-fragile invariants (crossings, node counts, accent discipline) against this same spec.

### 5. render — the user's own renderer

**What it does:** Builds the actual deck file(s) from the approved outline, design spec/token sheet, copy, and diagram specs. This is not a DeckForge skill — it is whatever rendering system the user has (`document-skills:pptx`, an HTML deck system, a project-specific renderer). DeckForge has no rendering rubric to enforce here; it only insists the renderer honor the upstream hard invariants (only token values, only archetype layouts snapped to the grid, no shrink-to-fit, no silent copy edits).

**Consumes:** the approved outline, token sheet + composition spec, locked copy, and diagram specs.

**Produces:** the rendered/exported deck (PPTX/PDF/HTML/PNG-per-slide, per delivery mode).

**Hand-off:** the orchestrating agent records whether render succeeded or errored (`render_errored`) — this flows straight into the build report's status computation, because a render failure is not diluted into a confidence average (see `docs/confidence-rubric.md`). Both the render output (pixels) and the export internals (object model, notes, metadata) are handed to QA — some checks need one, some need the other.

### 6. `presentation-qa` — final gate

**What it does:** The independent final sweep over the built artifact: 7 passes, each run in a fresh context with only that pass's contract artifacts (never the build conversation, never a prior pass's findings) — lint, content integrity (bidirectional acceptance matrix + fact verification + number footing), story (re-run render-fragile outline gates), design + cognition + AI-tell sweep, copy, accessibility, and cross-slide consistency — plus escalation passes (dry-run, red team) for high-stakes decks. Computes one of three verdicts from a boolean gate fixed before any finding exists.

**Consumes:** the approved outline + fact bank, design spec + token sheet + design-review report, final copy + diagram specs, the render (PNGs) and export (file internals), delivery mode, audience overlay, and stakes tier.

**Produces:** the QA report (acceptance matrix, verification ledger, consistency sheet, severity-ordered findings table, accessibility annex, escalation outputs) and the verdict: `SHIP` / `SHIP-WITH-ACCEPTED-MAJORS` / `BLOCKED`.

**Hand-off:** QA never fixes anything itself — every finding names the minimal fix and its owning stage. The orchestrating agent routes accepted fixes back to their owning stage and re-runs whichever passes are voided by that fix before sign-off. The verdict, the disposition of remaining findings, and each stage's own finding counts are what `presentation-build-report` harvests next — QA's report is read, never re-run, by stage 7.

### 7. `presentation-build-report` — internal build log

**What it does:** The pipeline's flight recorder. After QA renders its verdict, this stage reads (never edits, never re-runs) every upstream artifact and assembles an internal engineering build log: pipeline + per-skill versions, per-stage time/tokens, slide/diagram/screenshot counts, source coverage, QA auto-fixes and remaining findings, per-stage + weighted-overall + weakest-stage confidence, Needs-Verification items, assumptions, source conflicts, skipped-by-design items (with reasons), rendering warnings, a computed `PASS` / `PASS WITH WARNINGS` / `FAILED` status, and a priority-ordered recommendations list. This report is never a slide and never ships in the deck.

**Consumes:** `build/stage-log.json` (per-stage telemetry captured by the orchestrating agent as each stage's Task completes), `build/inputs/stage-records.json` (one harvested record per stage, per `references/extraction-guide.md`), `build/inputs/qa.json` (QA's verdict + auto-fixes + remaining findings), and `build/inputs/meta.json` (`render_errored`, `expected_stages`).

**Produces:** `build/execution-report.md` and `build/execution-report.json`, written by the stdlib-only Python aggregator (`PYTHONUTF8=1 python -m scripts.build_report build/`, exit code 2 on a `FAILED` status). See `docs/skills-reference.md` for the CLI and `docs/confidence-rubric.md` for the scoring rules.

**Hand-off:** this is the terminal stage. Its output is engineering telemetry for the people running the pipeline, kept under `build/` — a sibling of the deck, never inside the deliverable/export bundle.

## How the orchestrating agent carries artifacts forward

Each stage's output is the next stage's immutable input. Concretely, the orchestrating agent:

1. Runs stage 1 and holds the **outline + fact bank** as the first contract artifact. Every later stage receives it read-only.
2. Runs stage 2 against the outline; holds the **token sheet + deck map + per-slide composition spec** alongside the outline.
3. Runs stage 3 against the outline + design spec; holds the **locked copy** alongside both.
4. Runs stage 4 against the outline + copy + token sheet, for slides whose spec calls for a diagram; holds the **diagram specs** (possibly none) alongside everything so far.
5. Hands the outline, design spec, copy, and diagram specs to the **renderer**; holds the **rendered/exported deck** and records `render_errored` if it failed.
6. Runs stage 6 against the full artifact set plus the render/export; holds the **QA report + verdict**.
7. After every stage above, appends one entry to `build/stage-log.json` (or a `"not captured (inline)"` note if no Task-completion telemetry was available) and, per `references/extraction-guide.md`, harvests one stage-record into `build/inputs/stage-records.json` — never inventing a count or finding a stage didn't itself surface. Writes `build/inputs/qa.json` from the QA verdict and `build/inputs/meta.json` (`render_errored`, `expected_stages`). Runs the stage-7 aggregator to produce `build/execution-report.{md,json}`.

A note on stage 1's own wording: `presentation-structure`'s `SKILL.md` (Step 6) describes handing off "to the rendering layer" directly, because the skill is also usable standalone, outside the full DeckForge pipeline. Inside DeckForge's locked stage order, the orchestrating agent inserts `presentation-design`, `presentation-copywriting`, and `diagram-design` between the outline and the renderer — which is exactly what those three skills' own scope notes describe ("hand off to downstream siblings in pipeline order; otherwise pass straight to the renderer").

## Artifact-flow diagram

```
 brief / source material
        │
        ▼
 ┌───────────────────────┐
 │ 1 presentation-        │
 │   structure            │
 └───────────────────────┘
        │  outline + fact bank  (immutable from here on)
        ▼
 ┌───────────────────────┐
 │ 2 presentation-        │
 │   design               │
 └───────────────────────┘
        │  + token sheet / deck map / composition spec
        ▼
 ┌───────────────────────┐
 │ 3 presentation-        │
 │   copywriting          │
 └───────────────────────┘
        │  + locked per-slide copy
        ▼
 ┌───────────────────────┐
 │ 4 diagram-design        │
 └───────────────────────┘
        │  + diagramSpec(s) (may be none) / demotion report
        ▼
 ┌───────────────────────┐
 │ 5 render                │   <- user's own renderer/deck system,
 │   (not a DeckForge      │      not a DeckForge skill
 │    skill)                │
 └───────────────────────┘
        │  rendered deck (pptx/html/pdf/png) + export internals
        ▼
 ┌───────────────────────┐
 │ 6 presentation-qa       │
 └───────────────────────┘
        │  QA report + verdict (SHIP / SHIP-WITH-ACCEPTED-MAJORS / BLOCKED)
        ▼
 ┌───────────────────────┐          each stage above also feeds:
 │ 7 presentation-build-  │◄───────  build/stage-log.json
 │   report (python)      │◄───────  build/inputs/stage-records.json
 │                         │◄───────  build/inputs/qa.json
 │                         │◄───────  build/inputs/meta.json
 └───────────────────────┘
        │
        ▼
 build/execution-report.md
 build/execution-report.json
```

## Worked walkthrough: a quarterly-review deck

A user tells their agent: *"Build me a quarterly-review deck for the board — we hit $2.1M ARR, missed the churn target, and need approval for the Q3 hiring plan."*

1. **Structure.** The agent loads `presentation-structure`, runs the intake (audience: the board, aligned but time-poor; goal: DECIDE on the hiring plan; format: 20-minute live slot; artifact: presented, no send-ahead needed), and routes via the 2×2 to an answer-first pyramid. It writes the one-sentence message ("Q2 growth funds the Q3 hiring plan, but only if we fix churn now"), sets a 5-slide-plus-appendix budget, storyboards the dot-dash outline, and gets the ghost deck approved. Output: the locked outline + fact bank (ARR, churn rate, headcount ask, each traced to the finance export).
2. **Design.** The agent loads `presentation-design` against that outline. Delivery mode is presented-live, executive overlay. It extracts the company's existing brand palette into token roles, classifies each beat (claim, quantitative proof, comparison, close), maps them to Statement/Evidence/Compare/Close archetypes, runs the rhythm and AI-tell passes, and produces the design-review report and per-slide composition spec. The user approves the deck map.
3. **Copywriting.** The agent loads `presentation-copywriting` against the outline + design spec. It fills the message house, drafts titles ("Q2 revenue hit $2.1M ARR, up 34% — but churn erased a third of it"), writes subtitles/annotations/speaker notes, and runs the fact-fidelity gate. No claim strengthens or generalizes beyond the fact bank; a churn-driver claim the source docs don't fully support gets a `FACT_UNSOURCED` flag.
4. **Diagram.** The agent loads `diagram-design` for the one slide whose spec calls for a graphic — the hiring-plan timeline. It names the relationship ("quarter precedes quarter"), gates it, and emits a timeline `diagramSpec` with six milestones and the current-quarter accent. A second candidate (three unrelated culture initiatives) fails the gate for no nameable relationship and is demoted to a spaced list — reported, not hidden.
5. **Render.** The agent hands outline + design spec + copy + the one diagram spec to the project's renderer, which produces the PPTX and a PNG export per slide. No render error.
6. **QA.** The agent loads `presentation-qa` against the full artifact set plus the render/export. Fresh-context passes run in order; the acceptance matrix confirms every beat is delivered, fact verification finds the `FACT_UNSOURCED` claim was already softened to a hedge, and the accessibility pass confirms contrast on the real export. Verdict: `SHIP-WITH-ACCEPTED-MAJORS` (one accepted major: a churn-driver claim's exact figure lives only in the appendix, owner: the CFO).
7. **Build report.** The agent has been appending a stage-record after each of the five stages above and a telemetry entry after each Task completion. It writes `qa.json` (verdict `SHIP-WITH-ACCEPTED-MAJORS`, 1 remaining major) and `meta.json` (`render_errored: false`, `expected_stages: ["structure","design","copywriting","diagram","qa"]`), then runs `PYTHONUTF8=1 python -m scripts.build_report build/`. Because the QA verdict is `SHIP-WITH-ACCEPTED-MAJORS`, `build_status` computes to `PASS WITH WARNINGS` even though every stage's confidence band is High — the aggregator reports the accepted major honestly rather than smoothing it away. The agent hands the user the deck and the report path.

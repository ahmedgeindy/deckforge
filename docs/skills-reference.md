# Skills Reference

All six skills are Markdown instruction sets (a `SKILL.md` plus a `references/` directory of detail files, loaded only when the step that needs them runs — progressive disclosure). Every skill is at **version 1.0.0**. Only `presentation-build-report` ships code (a stdlib-only Python 3 aggregator with its own pytest suite).

---

## presentation-structure

**Version:** 1.0.0
**Purpose:** Decide what the slides say and in what order — story framework, assertion titles, evidence intent, layout archetype per beat — before any visual or wording work happens.

**When it triggers:** whenever a presentation, deck, pitch, keynote, webinar, board pack, all-hands, or talk is being created, outlined, structured, or improved — including a bare "make me a pptx about X," because the narrative structure has to be chosen before any slide is written. Also triggers to diagnose why an existing deck feels flat, unpersuasive, or like a list.

**Inputs:** audience (stance, seniority, room temperature), goal (decide / change / understand / act), format (time slot, live/remote/hybrid), artifact type (presented / read / both), and the raw source material and known objections.

**Outputs:** the locked slide-by-slide outline (beat, full-sentence assertion title, evidence intent, layout archetype, chapter), the verified fact bank, the results of 10 outline-level QA gates, and the kill-filter log of cut slides.

**References:**

| File | One-line description |
|---|---|
| `references/story-frameworks.md` | Message-level frameworks (A) and the story-arc family (C) — Duarte Sparkline, Hero's Journey, Pixar Story Spine, Freytag, Kishōtenketsu, and related arcs. |
| `references/business-frameworks.md` | Answer-first/pyramid consulting frameworks (B — SCQA, Minto, BLUF) plus teaching/explanation frameworks (E — The Explanation, Gagné loop). |
| `references/pitch-sales-frameworks.md` | Pitch and sales skeletons (D) — investor decks, Raskin/Dunford sales narratives, Challenger. |
| `references/audience-formats.md` | Audience and format playbooks (F) — per-format slide/time budgets and pacing by room type. |
| `references/slide-doctrine.md` | Slide-level doctrine (G) — the structure-to-slide interface handed to the rendering layer. |
| `references/persuasion-overlays.md` | Persuasion and memory overlays (H) — apply on top of any chosen framework. |
| `references/sources.md` | Sources index for the frameworks and claims used across this skill's reference files. |

---

## presentation-design

**Version:** 1.0.0
**Purpose:** Transform a validated outline into a visual system — typography hierarchy, grids, design tokens, archetype choice, evidence treatment — and prove the decisions in a design-review report before any file is rendered.

**When it triggers:** whenever an outline/storyboard is ready to become slides; whenever the user asks to design, restyle, polish, beautify, or "make slides look professional/human"; whenever a deck feels AI-generated or templated; always between `presentation-structure` and any rendering step. Also runs a design review on an existing deck's visual system.

**Inputs:** the validated outline (immutable), delivery mode (presented / sent-ahead / both), audience overlay, brand assets (logo, palette, typefaces, or an existing deck/site to extract from), and venue/renderer constraints.

**Outputs:** the token sheet (type ramp, spacing scale, color roles, radius/elevation, grid), the deck map (per-slide beat/job/archetype/dominant element/look order/fill/accent/builds), the design-review report (severity-ordered findings, budgets ledger, disposition log), and the per-slide composition spec handed to copy, diagrams, and the renderer.

**References:**

| File | One-line description |
|---|---|
| `references/design-tokens.md` | The design-token system — type ramp, spacing scale, color roles, radius/elevation, brand extraction, and the consolidated numeric floors/budgets appendix. |
| `references/grid-composition.md` | The 12-column grid, alignment/asymmetry/whitespace doctrine, reading-flow engineering, per-archetype grid-span recipes, and slidedoc typography. |
| `references/archetypes.md` | The 11 slide archetypes (when/composition/type/don't/mode), the selection procedure, deck-wide rhythm rules, and the builds/motion grammar. |
| `references/evidence-craft.md` | Evidence treatment — screenshots, diagrams, charts/tables, icons, and the speaker-notes/handout division of labor. |
| `references/ai-tells.md` | The 26-item AI-tell blacklist (layout repetition, decoration, content-shape-driven layout, imagery, typography/color) plus the inverse failure of random variation. |
| `references/audience-overlays.md` | The executive / presales-technical / marketing-external audience dials. |
| `references/design-review.md` | The severity ladder, the per-slide and per-deck checks, and the design-review report's output structure. |
| `references/sources.md` | 24 resolved source conflicts and the sources index. |

---

## presentation-copywriting

**Version:** 1.0.0
**Purpose:** Turn a locked outline + design spec into final slide copy — titles, takeaways, body text, kickers, captions, callouts, CTAs, speaker notes, alt text — in the right register, without ever changing what a claim asserts.

**When it triggers:** whenever slide text is written or rewritten; whenever the user asks to draft or punch up titles, headlines, takeaways, or speaker notes; whenever docs, specs, benchmarks, or meeting notes must become slide text; always between `presentation-design` and any diagram/rendering step. Also audits an existing deck's copy for fact drift, hype vocabulary, and machine-text tells.

**Inputs:** the locked outline (claims, fact bank, per-slide rung intent, stance), the design spec (archetype, word budgets, delivery mode, audience overlay), and the underlying source/technical material.

**Outputs:** per-slide copy (`assertionTitle`, `kicker`, `subtitle`, `bodyCopy`/`bullets`, `annotations`, `caption`, `sourceLine`, `ctaText`, `speakerNotes`, `altText`), the deck-level message-house vocabulary sheet, the fact-fidelity report, and escalation flags (`SPLIT_SLIDE`, `GROUPING_INVALID`, `TITLE_BODY_MISMATCH`, `EVIDENCE_GAP`, `MISSING_SLIDE`, `BUDGET_OVERFLOW`, `FACT_UNSOURCED`).

**References:**

| File | One-line description |
|---|---|
| `references/title-craft.md` | Sentence construction, Minto phrasing, the so-what ladder, front-loading, quantified specificity, title forms/budgets, the 11-step drafting procedure, and the weak-title taxonomy. |
| `references/body-microcopy.md` | Takeaways/body copy (title-as-takeaway, precision split, claim-evidence pairing) plus every micro-copy element — kickers, captions, annotations, axis labels, source lines, CTAs, alt text, casing/numerals. |
| `references/speaker-notes.md` | The cue-vs-script resolution, the five-part per-slide notes template, ear register, timing math, and the handout-strip handoff. |
| `references/registers.md` | The benefit-feature ladder, the register dial map, the worked five-step rendering procedure, presales credibility mechanics, and mixed-room handling. |
| `references/translation-procedure.md` | The compression whitelist/blacklist, abstraction laddering with stop rules, jargon keep/define/replace, precision preservation, hedging honesty, and de-marketing. |
| `references/fact-fidelity-qa.md` | The six-step fidelity gate, the 18 copy-quality gates, automation notes, and consolidated lint lists/ladders. |
| `references/anti-patterns.md` | 30 text-layer AI-tells (tell, why, detect, fix), 19 resolved source conflicts, and the sources index. |

---

## diagram-design

**Version:** 1.0.0
**Purpose:** Design the internal structure of every information graphic on a slide — or rule that the content should not be a diagram at all — extracting structure from source content rather than inventing it.

**When it triggers:** whenever bullets, prose, or technical/business content must become a visual; whenever the user asks to show a flow/architecture/timeline/process/options or "make this visual"; whenever a slide is a list of steps, roles, stages, decisions, or options; always between `presentation-copywriting` and the renderer when a slide's spec calls for a graphic. Also audits an existing deck's diagrams for invented structure, fake cycles, decorative arrows, and SmartArt decoration.

**Inputs:** the locked slide specs (assertion titles, written upstream), the source content (the only legal quarry for structure), the deck token sheet (accent discipline), delivery mode, and audience.

**Outputs:** one `diagramSpec` per diagram actually built (form, nodes, verb-labeled provenanced edges, groups, layout hints, build steps, the one emphasis target), a demotion report (content kept as text/list/table, and why), and a two-way trace table (every element traces to source; every source claim traces to an element or the demotion report).

**References:**

| File | One-line description |
|---|---|
| `references/selection-procedure.md` | The core model, the N1–N8 "don't diagram" gate, the escalation ladder, the seven-step selection algorithm, the linguistic-cue table, density thresholds, split rules, and the ghost spec. |
| `references/form-catalog.md` | 14 diagram forms — process flow, sequence, swimlane, timeline, journey, funnel, cycle/CLD, hierarchy family, architecture, ecosystem, position maps, decision tree, comparison matrix — each with when/composition/type/don't. |
| `references/construction-mechanics.md` | Shared layout discipline (crossings/bends/symmetry, rank discipline) plus per-form construction mechanics and renderer-portability notes. |
| `references/emphasis-builds.md` | The one accented element per form, the three-state defocus ladder, build grammar, and audience modulation of the same form. |
| `references/spec-contract-anti-patterns.md` | The `diagramSpec` schema, the renderer-runnable QA number set, hard invariants, and a 12-item anti-pattern blacklist with detect/fix. |
| `references/sources-conflicts.md` | Upstream contract pointers, 16 resolved conflicts, the sources index, and confidence flags on derived numeric caps. |

---

## presentation-qa

**Version:** 1.0.0
**Purpose:** Run the final, independent quality gate over the full pre-render package and/or the rendered deck — verify delivery against every upstream contract and compute a ship/no-ship verdict. Never redesigns or rewrites.

**When it triggers:** whenever a deck or slides need reviewing, checking, auditing, or QA-ing; whenever the user asks "is this deck ready?" or wants a pre-send/pre-meeting review, post-render verification, accessibility check, or consistency check; always as the last pipeline step after a renderer builds the file, even if the user never says "QA."

**Inputs:** the approved outline + fact bank, the design spec + token sheet + design-review report, the final copy + diagram specs, the render (PNGs) and export (file internals), delivery mode, audience overlay, and stakes tier.

**Outputs:** the QA report (acceptance matrix, verification ledger, consistency sheet + deviations, severity-ordered findings table, accessibility annex, escalation outputs) and the computed verdict: `SHIP` / `SHIP-WITH-ACCEPTED-MAJORS` / `BLOCKED`.

**References:**

| File | One-line description |
|---|---|
| `references/pass-structure.md` | The core model in full, the 7 passes (inputs/outputs/why), escalation passes, the re-run rule, stakes scaling, and the upstream disposition index (every upstream gate/check mapped to a verb and owning pass). |
| `references/check-catalog.md` | The full check catalog for Passes 0–4 (lint, content, story, design, copy), the AI-pattern final sweep (T1–T9), the complete Blocker enumeration, and a quick reference for the gate agent. |
| `references/consistency-sweeps.md` | Pass 6 — the deck style-sheet extraction sub-pass and the S1–S6 enforcement sweeps. |
| `references/accessibility-cognitive-load.md` | Pass 5's WCAG battery, color-vision battery, dyslexia-overlay verification, the presented/sent-ahead mode fork, plus the Mayer/CLT cognitive-load battery run inside Pass 3. |
| `references/signoff-and-failure-catalog.md` | The QA report structure and skeleton, the boolean ship gate, triage semantics, and the catalog of failures that ship anyway. |
| `references/sources-and-conflicts.md` | 13 resolved conflicts (by rule, never averaged) and the sources index. |

---

## presentation-build-report

**Version:** 1.0.0
**Purpose:** Assemble the pipeline's internal engineering build log from artifacts that already exist — read-only, never re-running or editing a stage. This is telemetry for the people running the pipeline, never a slide and never part of the deliverable.

**When it triggers:** always, as the last pipeline step, immediately after `presentation-qa` renders its verdict — on every build, including failed ones, even if the user never asks for a report.

**Inputs:** `build/stage-log.json` (per-stage token/duration telemetry captured from Task-completion notifications, or `"not captured (inline)"` if a stage ran without one), `build/inputs/stage-records.json` (one harvested record per stage — see `references/extraction-guide.md`), `build/inputs/qa.json` (QA verdict, auto-fixes, remaining findings), and `build/inputs/meta.json` (`render_errored`, `expected_stages`).

**Outputs:** `build/execution-report.md` and `build/execution-report.json` — pipeline + per-skill versions, per-stage telemetry and totals, deck-fact counts, source coverage, the QA section, per-stage confidence with the weighted overall and the weakest stage, Needs-Verification/assumptions/conflicts, skipped-by-design items, rendering warnings, the computed build status, and the priority-ordered recommendations list.

**References:**

| File | One-line description |
|---|---|
| `references/confidence-and-status.md` | The deterministic scoring rubric — per-stage score formula, bands, the two overall numbers and why both are reported, the build-status decision table, and the recommendations-priority table. Wins over any other source if numbers ever disagree. |
| `references/extraction-guide.md` | The per-upstream-skill harvest map: where each stage's artifact lives and which stage-record field each piece feeds, plus the zero-fabrication rule ("not captured" vs. "none reported") and cross-stage discipline against double-counting. |
| `references/report-schema.md` | Ground truth for the three JSON shapes — the stage-record, the `qa.json`/`meta.json` staging files, and the `execution-report.json` output — with worked examples per stage type. |

### CLI

Run from the skill directory (`skills/presentation-build-report/`):

```
PYTHONUTF8=1 python -m scripts.build_report <build_dir>
```

- **Inputs read from `<build_dir>`:** `inputs/stage-records.json`, `inputs/qa.json`, `inputs/meta.json`, and `stage-log.json` (a sibling of `inputs/`, not inside it).
- **Outputs written to `<build_dir>`:** `execution-report.md` and `execution-report.json`.
- **Exit codes:** `0` if the computed `build_status` is `PASS` or `PASS WITH WARNINGS`; `2` if it is `FAILED`; `1` if the CLI is called with no `<build_dir>` argument at all.
- `PYTHONUTF8=1` is a recommended Windows-encoding precaution, not a hard requirement: the shipped scripts specify `encoding="utf-8"` on every file operation and run clean without it. The skills still instruct agents to set it so any auxiliary Python written around the pipeline inherits safe defaults under `cp1252` consoles (harmless everywhere else).
- Missing `inputs/qa.json` defaults to a clean-build baseline (`verdict: SHIP`, zero findings); missing `inputs/meta.json` defaults to `render_errored: false` with no `expected_stages` check. Neither default should be relied on in practice — always write real `qa.json` and `meta.json` files.

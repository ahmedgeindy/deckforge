# Extraction Guide

This is the per-upstream-skill map: for each stage, where its report artifact lives, and exactly which stage-record field each piece of that artifact feeds. Follow `report-schema.md` for the target shape. Grounded in the actual `SKILL.md`/`references/*` prose of each of the five upstream skills, not guesses.

**Zero-fabrication rule (repeated from the SKILL.md — this is load-bearing):** every field below is either directly read off an upstream artifact, or omitted. Never estimate, interpolate, or infer a count/finding/flag that a stage did not itself surface. Two distinct honesty strings exist downstream and you should think in these terms while harvesting:
- **`"not captured"`** — the measurement channel itself was unavailable (e.g. no telemetry notification for an inline stage; intake never enumerated source counts). Used by the aggregator for `counts` and `source_coverage`.
- **`"none reported"`** — the channel existed but this stage had nothing to say (e.g. no assumptions, no conflicts). Used by the aggregator for the harvested list fields when the union across all stages is empty, and per-item for a missing `skipped_by_design` reason.
You never need to write either string yourself — you produce it by *omitting* the field/list entry; the aggregator fills in the correct string. Writing a fabricated zero or an invented list entry defeats the whole purpose of this skill.

## structure → `presentation-structure`

Artifact: the locked outline (with its slide-by-slide narrative + evidence spec) and the **QA gates** run on that outline before handoff (`SKILL.md` "QA gates" section — So-what test, vertical/horizontal flow, elevator test, shape check, loop ledger, SUCCESs sweep, rule of three/four-ceiling, red team, ending gate).

| stage-record field | comes from |
|---|---|
| `failed_gates` | count of the outline's QA gates that did not pass on first run (a gate re-run to pass after a revision doesn't count against this number — only gates still failing at outline lock). |
| `blockers` / `majors` / `minors` | this skill's own prose does not use a Blocker/Major/Minor ladder for the outline stage the way design/copywriting/qa do — its gates are pass/fail. In practice this stage typically reports `failed_gates` only, with severity counts at 0 unless the orchestrator layers a severity policy on top. Never force-fit a severity count that was not actually assigned. |
| `assumptions` | anything the outline had to assume to close a claim (e.g. a close date, a headcount figure) where the source material didn't state it outright. |
| `needs_verification` | claims the verified-fact bank could not source (the skill's evidence-craft principle: "every stat traces to a source" — anything that doesn't yet trace is a Needs-Verification item, not an invented number). |
| `conflicts` | places where two source documents disagree on the same fact, surfaced during fact-bank assembly. |
| `skipped_by_design` | the kill-filter step ("delete any slide that can't hang on [the elevator script]") — each cut slide/section, with the reason it failed the kill-filter or the so-what test. |
| `counts.slides` | the number of slides in the locked, presented outline (excluding appendix, unless the orchestrator wants appendix counted separately — be explicit about which you mean). |
| `sources.discovered` / `sources.consumed` / `sources.unconsumed` | the intake's source inventory (documents, decks, data handed in) vs. what actually made it into the fact bank / a slide. **This skill's SKILL.md does not mandate a formal source-inventory artifact** — if intake never enumerated a discovered/consumed count, omit `sources` entirely rather than guessing; the aggregator will correctly render `"not captured"`. |

## design → `presentation-design`

Artifact: the **design-review report** (`references/design-review.md`; emitted at Step 6, "before rendering — this is the deliverable gate"): token sheet, deck map, severity-ordered findings (Blocker/Major/Minor/Cosmetic), budgets ledger, disposition log.

| stage-record field | comes from |
|---|---|
| `blockers` / `majors` / `minors` | tally the design-review report's severity-ordered findings table by severity. **Cosmetic-severity findings are not counted** — the schema has no cosmetic bucket; log them in your own working notes if useful, but don't fold them into `minors`. |
| `failed_gates` | any of this skill's fixed acceptance budgets (hero numbers, dark-slide count, evidence-annotation caps, etc.) that the disposition log could not bring into compliance. |
| `skipped_by_design` | the disposition log's "rejected changes" ("no objective quality increase") plus any evidence-craft item consciously not built (e.g. a screenshot considered but dropped). |
| `counts.screenshots_used` / `counts.screenshots_discarded` | the evidence-craft decisions in the deck map / disposition log — screenshots that made it into a slide vs. ones captured/considered and discarded. If the design-review report doesn't itemize this, omit both keys rather than guessing. |
| `warnings` | any rendering-relevant risk the design-review flags for the renderer to watch (e.g. a layout the token sheet can't guarantee at a given breakpoint). |
| `assumptions` / `needs_verification` / `conflicts` | design stage rarely originates new facts, so these are usually empty for this stage — leave them omitted; do not copy structure's items here (that would double-count them in the aggregator's flattened union). |

## copywriting → `presentation-copywriting`

Artifact: the **fact-fidelity QA gate** report (`references/fact-fidelity-qa.md`, run at Step 6) and the **escalation flags** raised at Step 7 (`SPLIT_SLIDE`, `GROUPING_INVALID`, `TITLE_BODY_MISMATCH`, `EVIDENCE_GAP`, `MISSING_SLIDE`, `FACT_UNSOURCED`).

| stage-record field | comes from |
|---|---|
| `needs_verification` | every `FACT_UNSOURCED` flag ("a claim the outline needs but the fact bank can't source") — copy the claim text, not just the flag name. |
| `conflicts` | any fact-fidelity finding where copy had to choose between two source values for the same claim. |
| `blockers` / `majors` / `minors` | tally the fact-fidelity gate's 18 copy-quality checks by the severity this skill assigns them (a wrong number or invented quote is a Blocker-class fidelity failure; a weaker anti-pattern hit — e.g. hype vocabulary — is typically Minor). Use the severity the fact-fidelity report itself states; don't re-derive it. |
| `skipped_by_design` | any claim/beat this skill declined to write copy for and escalated instead (e.g. `EVIDENCE_GAP` — "intended rung exceeds what the fact bank pays for" — the copy for that rung was not written; the reason is the escalation flag's own text). |
| `warnings` | none typical for this stage; leave `warnings` empty unless the fact-fidelity report itself calls out a render-relevant risk (e.g. a caption that will overflow a fixed frame). |
| `assumptions` | any wording choice this skill had to make where the fact bank was directionally clear but not literally explicit (rare — most such gaps should instead become `needs_verification`). |

**Escalation-flag handling note:** `SPLIT_SLIDE`, `GROUPING_INVALID`, `TITLE_BODY_MISMATCH`, and `MISSING_SLIDE` are structural defects this skill "raises... and never resolves" — they are copywriting's findings about the *outline*, not about copy itself. Route them into `conflicts` if they represent a factual disagreement, otherwise into `needs_verification` if they need a human decision, or count them toward `majors`/`blockers` if the fact-fidelity report assigns them a severity. Never drop an escalation flag silently — every flag must land in exactly one stage-record field.

## diagram → `diagram-design`

Artifact: the emitted `diagramSpec`(s) (schema in `references/spec-contract-anti-patterns.md`), the **demotion report** (any diagram candidate that was demoted down the escalation ladder — prose → list → table → diagram — with the reason, e.g. "kept as list: no relation cues"), and per-edge provenance ("every edge verb-labeled + provenanced").

| stage-record field | comes from |
|---|---|
| `counts.diagrams` | the number of `diagramSpec` objects actually emitted for rendering (not the number of candidates considered). |
| `skipped_by_design` | every demotion — each candidate that did not become a diagram, with the demotion reason verbatim (e.g. "no relation cues — kept as list"). Demotion is explicitly legal and must always be reported, never hidden. |
| `needs_verification` | any edge/relation this skill could not fully provenance (a claimed relationship between two nodes without a traceable source). |
| `blockers` / `majors` / `minors` | tally violations of the universal invariants (crossings, bends/edge, node count, nesting depth, label size, build-step count, single emphasis target, edge provenance) against the anti-pattern catalog's severity, if the spec-contract QA pass assigns one; a hard invariant violation that blocks rendering is a Blocker. |
| `failed_gates` | the N1–N8 gate + escalation-ladder check, if it did not clear cleanly for a given diagram. |
| `conflicts` | rare for this stage; only if two source documents disagree on the structure being diagrammed (e.g. conflicting process-step ordering). |
| `warnings` | any diagram this skill flags as risky for the renderer (e.g. near the node/nesting ceiling). |

## qa → `presentation-qa`

Artifact: the QA report per `references/signoff-and-failure-catalog.md` — acceptance matrix, verification ledger, consistency sheet, the **severity-ordered findings table** (check ID, slide(s), mechanism statement, pass, verb, disposition, owner), the accessibility annex, escalation outputs, and the computed **verdict** (`SHIP` / `SHIP-WITH-ACCEPTED-MAJORS` / `BLOCKED`).

| stage-record field / output | comes from |
|---|---|
| `blockers` / `majors` / `minors` | tally the findings table by severity (Blocker/Major/Minor). **Cosmetic findings are logged but not counted** here either — same rule as design. |
| `failed_gates` | any of the fixed verdict-gate criteria that did not clear (0 Blockers, all Majors dispositioned, 100% acceptance-matrix delivered-or-accepted, 100% fact coverage on exposed claims, clean cross-slide ledger, clean-or-excepted lint, clean a11y blocking set) — each unmet criterion is one failed gate. |
| `warnings` | the render-tell / AI-pattern sweep passes (check IDs `T1`–`T9`) and the `Q0` lint pass (overflow/clip, stated-count vs rendered-count, footing, placeholders, etc.) — any finding from these mechanical passes that isn't already counted as a severity finding. |
| `needs_verification` | any fact-coverage gap the QA pass could not close (an exposed claim without a traceable source, found during QA's own fact-verification pass — distinct from the ones copywriting already flagged; don't duplicate copywriting's `FACT_UNSOURCED` items here unless QA is reporting a *new* gap it found). |
| `conflicts` | any cross-slide consistency-sheet deviation (numbers/dates/terms that disagree across slides), from the consistency sweep. |
| `skipped_by_design` | not typical for the QA stage itself (QA doesn't build content to skip) — usually omitted. |
| **`qa.json` → `verdict`** | the report's final computed verdict line, verbatim (`SHIP`, `SHIP-WITH-ACCEPTED-MAJORS`, or `BLOCKED`). |
| **`qa.json` → `auto_fixes`** | count of findings the disposition log shows as fixed-and-reverified (mechanical or owner-applied fixes that were re-run and passed), not findings merely accepted. |
| **`qa.json` → `remaining_findings`** | the findings table's still-open rows after disposition: `{blockers, majors, minors}` counts plus a free-text `list` of the finding summaries, for the humans reading the Markdown report. |

## render (renderer, not a "skill" in this pipeline's SKILL.md sense)

There is no `presentation-*` skill for rendering in this repo's skill set — it is `document-skills:pptx` or the project's own deck system. Emit a minimal stage-record: `{"stage": "render", "skill": "<renderer name>", "version": "<if known, else omit>"}`. `render` is never confidence-scored (it has no gate rubric — see `confidence-and-status.md`), so do not populate `blockers`/`majors`/`minors`/`failed_gates` for it from renderer output; instead, any render failure becomes `meta.json`'s `render_errored: true`, and any render-time visual glitch becomes a `warnings` entry (on this record or attributed to whichever upstream stage owns the affected content).

## Cross-stage discipline

- **Don't double-count.** If two stages both mention the same underlying fact conflict or Needs-Verification item, decide which stage *originated* the flag and record it there once. The aggregator's `needs_verification`/`conflicts`/`assumptions`/`rendering_warnings` fields are a flattened union across every stage-record — a duplicate entered twice will appear twice in the rendered report.
- **`sources.discovered`/`sources.consumed`/`sources.unconsumed`** is usually only meaningful on the `structure` stage record (it owns intake), but any stage that separately tracks source usage (e.g. `design` tracking which screenshots from the discovered pool it actually placed) may also report it — the aggregator takes the max of `discovered`/`consumed` across all stage-records and unions `unconsumed`, so duplicate reporting from two stages of the *same* underlying pool would double up `unconsumed` entries unless they list identical strings. When in doubt, report source coverage once, on the stage that owns intake.
- **If a stage produced no artifact at all** (crashed, was skipped by the orchestrator, etc.), that is not the same as "clean" — do not write a stage-record implying it ran cleanly. Either it is missing entirely (which the aggregator will catch as `all_stages_complete = False` → `FAILED`), or if it degraded gracefully, record the real degraded state (e.g. `failed_gates` reflecting what didn't run).

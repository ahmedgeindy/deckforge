# Confidence & Status Rubric

This is a user-facing digest of the scoring and build-status policy `presentation-build-report` runs. The rubric is deterministic and mechanical on purpose — no stage self-scores; every score is derived from that stage's own reported findings, the same "verdict from a pre-agreed gate, zero new judgment" philosophy `presentation-qa` applies to its own ship/no-ship verdict.

**Source of truth:** every number in this document is verified against `skills/presentation-build-report/references/confidence-and-status.md`, which mirrors the constants in `scripts/config.py` and the logic in `scripts/confidence.py` / `scripts/status.py` / `scripts/recommendations.py`. If this document and that file ever disagree, `confidence-and-status.md` (and the code it mirrors) wins.

## Per-stage score

Every scored stage starts at 100 and is docked for its own findings:

| Finding type | Penalty |
|---|---|
| Blocker | −25 |
| Major | −10 |
| Minor | −3 |
| Failed gate / acceptance check | −15 |

```
score = 100 − (blockers*25 + majors*10 + minors*3 + failed_gates*15)
score = clamp(score, 0, 100)
```

A stage with 1 blocker, 2 majors, 1 minor, and 1 failed gate loses 25+20+3+15 = 63 points → score 37. A stage's score can never go below 0 or above 100.

## Bands

| Score range | Band |
|---|---|
| ≥ 85 | High |
| 60 – 84 | Medium |
| < 60 | Low |

The boundaries are inclusive on the low end of each range: 85 is High, 84 is Medium, 60 is Medium, 59 is Low.

## Render is never scored

Only five stages ever receive a confidence score: **structure, design, copywriting, diagram, qa.** `render` is deliberately excluded — it has no gate rubric of its own (the renderer either produces a usable artifact or it doesn't). Giving it a confidence number would imply a rubric that doesn't exist. Instead, a render problem drives `build_status` directly (via `render_errored`, see below) and surfaces as a rendering warning — never diluted into an average with the five scored stages.

## Two overall numbers, always both

The report always carries **two** top-line confidence numbers — never just one.

### Weighted overall confidence

Default stage weights (sum to 1.0):

| Stage | Weight |
|---|---|
| structure | 0.25 |
| copywriting | 0.20 |
| qa | 0.25 |
| design | 0.15 |
| diagram | 0.15 |

```
weighted_overall = Σ(weight[s] * score[s])  over present stages s
```

**If a stage is absent** (for example, no diagrams were needed, so there is no `diagram` stage-record), its weight is not simply dropped — the remaining present stages' weights are renormalized to sum back to 1.0:

```
present   = { s: score[s] for s in stage_scores if s in stage weights }
total_w   = Σ weight[s]  for s in present
weighted  = Σ(score[s] * weight[s]  for s in present) / total_w
```

Worked example — `diagram` absent, remaining weights {structure .25, copywriting .20, qa .25, design .15} sum to 0.85:

```
weighted_overall = (0.25*structure + 0.20*copywriting + 0.25*qa + 0.15*design) / 0.85
```

If literally no stage has a score at all, `weighted_overall` is `0.0` — an edge case that should never occur in practice; it means the build has zero confidence-scored stages.

### Weakest-stage confidence

```
weakest_stage = the (stage, score) pair with the minimum score
```

Ties are broken by the order stages were encountered internally — not a meaningful tiebreak to design around.

### Why both numbers are always reported

**A deck must not inherit its lowest stage as its overall score, and a healthy weighted average must not hide one shaky stage.** These guard against two different failure modes at once:

- Reporting *only* the weighted overall would let one badly-scored stage (say, `qa` at 40) get smoothed away by four clean stages at 100 — the weighted number stays comfortably in the 90s, and a reader looking only at the headline number would never learn `qa` needs attention.
- Reporting *only* the weakest stage would make a genuinely strong build look worse than it is, and would fail to communicate that only one narrow area is a risk.

One smoothed headline number answers "is this build broadly healthy?"; one named risk floor answers "what specifically needs attention?" Neither question can honestly substitute for the other, so both numbers ship together, every time.

## Build status decision table

`build_status` is computed from seven inputs: the QA verdict, `render_errored`, `all_stages_complete`, `rendering_warnings`, `needs_verification`, `conflicts`, and which stages (if any) landed in the Low band. The QA verdict is normalized first (uppercased, non-letters stripped), so `"ship with accepted majors"`, `"SHIP-WITH-ACCEPTED-MAJORS"`, and `"Ship_With_Accepted_Majors"` all read identically.

Rows are checked top-to-bottom and are exclusive:

| Condition | Result |
|---|---|
| verdict is `BLOCKED`, **or** `render_errored` is true, **or** `all_stages_complete` is false | **FAILED** |
| (none of the above) **and** ( verdict is `SHIP-WITH-ACCEPTED-MAJORS`, **or** there are rendering warnings, **or** there are Needs-Verification items, **or** there are conflicts, **or** any stage is in the Low band ) | **PASS WITH WARNINGS** |
| none of the above | **PASS** |

`all_stages_complete` comes from `meta.json`'s `expected_stages`: if the orchestrating agent declares the stages it dispatched, any expected stage whose record never arrived makes the build incomplete — reported as `FAILED` plus a `missing_stages` list and an "Incomplete build" banner. This is the deterministic guard against a silently dropped stage-record: without declaring `expected_stages`, a missing record would just renormalize the confidence weights and the build would look falsely clean.

## Recommendations priority (P1–P6)

Recommendations are derived from the report's own signals — no new analysis, just naming the highest-impact next step for each signal that fired. Lower priority number = higher impact = listed first.

| Priority | Fires when | Target |
|---|---|---|
| P1 | remaining blockers > 0 | `presentation-qa` / owning skills |
| P2 | a stage's band is Low (one entry per such stage) | that stage's name |
| P3 | remaining majors > 0 | owning skills |
| P4 | conflicts is non-empty | `presentation-structure` / source owners |
| P5 | needs-verification is non-empty | fact owners |
| P6 | source-coverage ratio < 1.0 and there are unconsumed sources | `presentation-structure` intake |

If none of the six conditions fire, the section is not left empty — it is exactly one entry: priority 1, target "none," action "Build is clean — no high-impact improvements identified." The section never pads a clean build with filler recommendations.

## The zero-fabrication rule

The aggregator never estimates, interpolates, or invents a count, finding, or flag that a stage did not itself surface. Two distinct honesty strings exist, and they mean different things:

- **`"not captured"`** — the measurement channel itself was unavailable. Used for `counts` and `source_coverage` when no stage-record ever reported that field — for example, no telemetry notification existed for an inline stage, or intake never enumerated a source count. This means: *we don't know, because nothing was ever measured.*
- **`"none reported"`** — the channel existed and was checked, but every stage had nothing to say. Used for the harvested list fields (`needs_verification`, `assumptions`, `conflicts`, `rendering_warnings`, `skipped_by_design`) when the union across all stages is empty, and per-item when a `skipped_by_design` entry omits its (mandatory) reason. This means: *we looked, and there was nothing there.*

The distinction matters because the two strings answer different questions: "not captured" says the measurement channel was down; "none reported" says the stage had nothing to say through a channel that was open. Collapsing them into one placeholder would hide which case actually happened. Nobody writes either string by hand — they produce it by *omitting* the field or list entry; the aggregator fills in the correct string. Writing a fabricated zero or an invented list entry defeats the purpose of the report.

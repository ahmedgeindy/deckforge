# Confidence & Status Rubric

This is the deterministic scoring/decision logic the aggregator runs (`scripts/confidence.py`, `scripts/status.py`, `scripts/recommendations.py`, wired together in `scripts/assemble.py`, constants from `scripts/config.py`). The rubric is objective and reproducible on purpose — no stage self-scores; scores are derived mechanically from that stage's own reported findings, the same "verdict from a pre-agreed gate, zero new judgment" philosophy `presentation-qa` uses for its own verdict.

The numbers below are the actual constants in `scripts/config.py`. If you ever see a different number quoted elsewhere for this skill, this file (and the code it mirrors) wins.

## 1. Per-stage confidence score

Every scored stage starts at **100** and is docked for its own findings:

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

(`scripts/confidence.py::stage_score`.) A stage with 1 blocker, 2 majors, 1 minor, and 1 failed gate loses 25+20+3+15 = 63 points → score 37. A stage can never go below 0 (a very bad stage floors at 0, it does not go negative) and never above 100.

## 2. Bands

| Score range | Band |
|---|---|
| ≥ 85 | High |
| 60 – 84 | Medium |
| < 60 | Low |

(`scripts/confidence.py::band` — note the boundaries are inclusive on the low end of each range: `band(85) == "High"`, `band(84) == "Medium"`, `band(60) == "Medium"`, `band(59) == "Low"`.)

## 3. Which stages are scored — `render` is excluded

Only these five stages ever get a confidence score (`config.CONFIDENCE_STAGES`):

```
structure, design, copywriting, diagram, qa
```

**`render` is deliberately never scored.** It has no gate rubric — the renderer either produces a usable artifact or it doesn't, and that fact already drives `build_status` directly via `render_errored` (see §5) and shows up as `rendering_warnings`. Giving it a confidence number would imply a rubric that doesn't exist; instead, a render problem is reported as a warning/failure, not diluted into an average.

## 4. Two overall numbers — weighted overall AND weakest stage

The report always carries **two** top-line confidence numbers, deliberately never just one:

### 4a. Weighted overall confidence

Default stage weights (`config.STAGE_WEIGHTS`, sum to 1.0):

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

**Absent-stage weight redistribution:** if a stage has no record for this build (e.g. no diagrams were needed, so there is no `diagram` stage-record and therefore no `diagram` score), its weight is not simply dropped — the remaining present stages' weights are renormalized to sum back to 1.0. Concretely (`scripts/confidence.py::weighted_overall`):

```
present   = { s: score[s] for s in stage_scores if s in STAGE_WEIGHTS }
total_w   = Σ weight[s]  for s in present
weighted  = Σ(score[s] * weight[s]  for s in present) / total_w
result    = round(weighted, 1)
```

Worked example — `diagram` absent, remaining weights {structure .25, copywriting .20, qa .25, design .15} sum to 0.85:

```
weighted_overall = (0.25*structure + 0.20*copywriting + 0.25*qa + 0.15*design) / 0.85
```

If literally no stage has a score at all, `weighted_overall` is `0.0` (an edge case that should never occur in practice — it means the build has zero confidence-scored stages).

### 4b. Weakest-stage confidence

```
weakest_stage = the (stage, score) pair with the minimum score
```

(`scripts/confidence.py::weakest_stage` — a plain `min` over the per-stage scores; ties are broken by dict iteration order, i.e. whichever stage the `by_stage` dict encounters first at that minimum.) Reported as `{"stage": <name>, "score": <int>, "band": <band(score)>}` in the output JSON.

### 4c. Why both are always reported

**A deck must not inherit its lowest stage as its overall score, and a healthy weighted average must not hide one shaky stage.** These are two different failure modes this design guards against simultaneously:

- Reporting *only* the weighted overall would let one badly-scored stage (e.g. `qa` at 40) get smoothed away by four clean stages at 100 — the weighted number stays comfortably in the 90s (see `test_weighted_never_equals_weakest_when_others_high` in `scripts/test_confidence_overall.py`: weighted overall is always **greater than** the weakest stage's score whenever other stages are healthy). A reader looking only at the headline number would never learn `qa` needs attention.
- Reporting *only* the weakest stage would make a genuinely strong build look worse than it is, and would not communicate that only one narrow area is a risk.

Surfacing both — a smoothed headline number for "is this build broadly healthy" and a named risk floor for "what specifically needs attention" — serves both questions without either number lying by omission.

## 5. Build status decision table

`scripts/status.py::build_status` computes exactly one of three strings from six inputs: `qa_verdict`, `render_errored`, `all_stages_complete`, `rendering_warnings`, `needs_verification`, `conflicts`, `low_conf_stages` (the stages at Low band).

`qa_verdict` is normalized first — uppercased with every non-letter character stripped, so `"ship with accepted majors"`, `"SHIP-WITH-ACCEPTED-MAJORS"`, and `"Ship_With_Accepted_Majors"` all normalize identically.

| Condition | Result |
|---|---|
| normalized verdict is `BLOCKED`, **or** `render_errored` is true, **or** `all_stages_complete` is false | **FAILED** |
| (none of the above) **and** ( normalized verdict is `SHIPWITHACCEPTEDMAJORS`, **or** `rendering_warnings` is non-empty, **or** `needs_verification` is non-empty, **or** `conflicts` is non-empty, **or** `low_conf_stages` is non-empty ) | **PASS WITH WARNINGS** |
| none of the above | **PASS** |

Rows are checked top-to-bottom and are exclusive — a `BLOCKED` verdict is always `FAILED` even if it would otherwise also look like a warnings case. `all_stages_complete` in `scripts/assemble.py` derives from `meta.json`'s `expected_stages`: if you declare the stages you dispatched, any expected stage whose record never arrived makes `all_stages_complete` false (→ FAILED), and the missing stages are listed in the report's `missing_stages` field plus an "Incomplete build" banner. If `expected_stages` is omitted it falls back to `len(stage_records) > 0` — the aggregator's minimal signal, with the orchestrator responsible for supplying every stage's record (see `report-schema.md` §3).

## 6. Recommendations priority (derived from the same signals)

`scripts/recommendations.py::synthesize` turns the report's own signals into a priority-ordered action list — no new analysis, just naming the highest-impact next step for each signal that fired:

| Priority | Fires when | Target |
|---|---|---|
| 1 | `remaining_findings.blockers > 0` | `presentation-qa / owning skills` |
| 2 | a stage's band is `Low` (one entry per such stage) | that stage's name |
| 3 | `remaining_findings.majors > 0` | `owning skills` |
| 4 | `conflicts` is non-empty | `presentation-structure / source owners` |
| 5 | `needs_verification` is non-empty | `fact owners` |
| 6 | `source_coverage.ratio < 1.0` **and** `source_coverage.unconsumed` is non-empty | `presentation-structure intake` |

Lower priority number = higher impact = listed first. If none of the six conditions fire, the section is not left empty — it is exactly one entry: `{"priority": 1, "target": "none", "action": "Build is clean — no high-impact improvements identified.", "payoff": "—"}`. The section never pads a clean build with filler recommendations.

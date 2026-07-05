# Report Schema

This document is the ground truth for three JSON shapes: the **stage-record** you write into `build/inputs/stage-records.json`, the **`qa.json`** / **`meta.json`** staging files, and the **`execution-report.json`** the aggregator (`scripts/build_report.py` → `scripts/assemble.py`) produces. All three mirror the actual dataclasses/functions in `scripts/` exactly — if this file and the code ever disagree, the code wins; fix this file.

## 1. Stage record (`build/inputs/stage-records.json`)

`build/inputs/stage-records.json` is a JSON **list** of stage-record objects, one per pipeline stage that ran. Each object is loaded with `schema.StageRecord.from_dict(d)`. `from_dict` silently drops any key that isn't a declared field — only the fields below survive.

| Field | Type | Default if omitted | Meaning |
|---|---|---|---|
| `stage` | string | *(required)* | Canonical stage id: `structure`, `design`, `copywriting`, `diagram`, `render`, or `qa` (see `config.STAGE_ORDER`). |
| `skill` | string | *(required)* | The skill name that produced the stage, e.g. `presentation-structure`. |
| `version` | string | `"unversioned"` | The stage skill's `version:` frontmatter value. Omit the field entirely (don't guess) if the skill has no version declared — the aggregator fills in `"unversioned"`. |
| `blockers` | int | `0` | Count of that stage's own Blocker-severity findings. |
| `majors` | int | `0` | Count of that stage's own Major-severity findings. |
| `minors` | int | `0` | Count of that stage's own Minor-severity findings. |
| `failed_gates` | int | `0` | Count of that stage's own failed gate/acceptance checks (distinct from findings — e.g. a QA-gate boolean that didn't clear). |
| `assumptions` | list[str] | `[]` | Assumptions the stage recorded while producing its output. |
| `needs_verification` | list[str] | `[]` | Claims/flags the stage could not source and flagged for verification (e.g. a `FACT_UNSOURCED` flag). |
| `conflicts` | list[str] | `[]` | Source-material conflicts the stage surfaced (e.g. "doc A vs doc B on ARR"). |
| `skipped_by_design` | list[object] | `[]` | Items the stage deliberately did not build. Each entry is `{"item": str, "reason": str}`. `reason` is mandatory in the harvest protocol; the aggregator defaults a missing `reason` key to `"none reported"` per-item (see section 5). |
| `counts` | dict | `{}` | Deck-fact counters this stage can report. Recognized keys: `slides`, `diagrams`, `screenshots_used`, `screenshots_discarded`. Any subset is fine — only report what this stage actually measured. |
| `sources` | dict | `{}` | Source-material coverage this stage can report: `{"discovered": int, "consumed": int, "unconsumed": [str, ...]}`. Any subset is fine. |
| `warnings` | list[str] | `[]` | Rendering/render-tell warnings surfaced at or attributable to this stage. |

**Unknown-key rule:** any key in the input dict that is not one of the fields above is dropped by `from_dict` — it will not raise an error, and it will not appear anywhere in the report. Don't rely on extra keys to carry information.

**Omission rule (per stage-record):** for the scalar counters (`blockers`, `majors`, `minors`, `failed_gates`) omitting the field means **zero**, not "unknown" — only write a nonzero count you actually derived from that stage's own findings; never write a nonzero guess. For the list/dict fields (`assumptions`, `needs_verification`, `conflicts`, `skipped_by_design`, `counts`, `sources`, `warnings`), omitting the field means "this stage did not surface this channel" — leave it out rather than writing `[]`/`{}` yourself; the effect is identical (`StageRecord` defaults to empty), but omitting is the honest signal that nothing was harvested versus explicitly confirming zero.

**Fields, not stages, are omittable.** Never omit an entire stage from `stage-records.json` just because it produced nothing noteworthy — `render` legitimately carries only `stage`/`skill`/`version` (it is never confidence-scored, see `confidence-and-status.md`), but every stage that ran must have a record, or the build is reported as `all_stages_complete = False` → `build_status = "FAILED"` (`scripts/status.py`).

### 1.1 Worked examples (one per stage type)

These are drawn verbatim from the fixture in `scripts/test_assemble.py::records()` — the aggregator's own golden test data.

**structure:**
```json
{
  "stage": "structure",
  "skill": "presentation-structure",
  "version": "1.0.0",
  "majors": 1,
  "counts": { "slides": 14 },
  "sources": { "discovered": 12, "consumed": 9, "unconsumed": ["a.pdf", "b.txt", "c.pdf"] },
  "assumptions": ["Q3 close assumed"],
  "conflicts": ["doc A vs doc B on ARR"]
}
```

**design** (a clean stage — every field besides the three identity fields legitimately empty/zero):
```json
{
  "stage": "design",
  "skill": "presentation-design",
  "version": "1.0.0"
}
```

**copywriting:**
```json
{
  "stage": "copywriting",
  "skill": "presentation-copywriting",
  "version": "1.0.0",
  "needs_verification": ["$1.8M savings unsourced"]
}
```

**diagram:**
```json
{
  "stage": "diagram",
  "skill": "diagram-design",
  "version": "1.0.0",
  "counts": { "diagrams": 3 },
  "skipped_by_design": [
    { "item": "5-item list", "reason": "no relation cues — kept as list" }
  ]
}
```

**qa:**
```json
{
  "stage": "qa",
  "skill": "presentation-qa",
  "version": "1.0.0",
  "majors": 2,
  "warnings": ["S7 y-axis units missing"]
}
```

## 2. `build/inputs/qa.json`

A single object (not a list), consumed by `assemble.assemble(..., qa=...)`:

```json
{
  "verdict": "SHIP-WITH-ACCEPTED-MAJORS",
  "auto_fixes": 4,
  "remaining_findings": {
    "blockers": 0,
    "majors": 2,
    "minors": 1,
    "list": ["S7 units", "..."]
  }
}
```

- `verdict` — one of `SHIP`, `SHIP-WITH-ACCEPTED-MAJORS`, `BLOCKED` (case/hyphen/space-insensitive — `scripts/status.py` normalizes by stripping non-letters and upper-casing). This is copied verbatim into the output report's `qa.verdict`.
- `auto_fixes` — integer count of QA-disposition auto-fixes applied.
- `remaining_findings` — `{"blockers": int, "majors": int, "minors": int, "list": [str, ...]}`. `blockers` and `majors` here drive `recommendations` priority 1/3 (build status is driven by `verdict`, not by these counts directly). `list` is free-text findings rendered verbatim in the Markdown QA section.

If `build/inputs/qa.json` is missing entirely, `build_report.run` defaults it to `{"verdict": "SHIP", "auto_fixes": 0, "remaining_findings": {"blockers": 0, "majors": 0, "minors": 0, "list": []}}` — i.e. a clean-build default, never a fabricated failure or success beyond that neutral baseline. Don't rely on this default in practice — always write a real `qa.json`.

## 3. `build/inputs/meta.json`

```json
{ "render_errored": false, "expected_stages": ["structure", "design", "copywriting", "diagram", "qa"] }
```

Recognized keys:
- `render_errored` (bool) — `true` forces `build_status = "FAILED"` regardless of everything else (`scripts/status.py`). If the file is missing, defaults to `{"render_errored": false}`.
- `expected_stages` (list, optional) — the stages the orchestrator actually dispatched. The aggregator marks the build incomplete (→ `build_status = "FAILED"`, plus a `missing_stages` list in the report and an "Incomplete build" banner) if any expected stage's record never arrived. This is the deterministic guard against a silently dropped stage-record: without it, a missing record would just renormalize the confidence weights and report clean. Omit it only if you accept that stage-completeness is unchecked (falls back to "at least one record present"). List only the stages you expected — e.g. drop `diagram` when the deck legitimately has no diagrams.

## 4. `build/stage-log.json` (telemetry, not staged under `inputs/`)

A JSON **list** of telemetry entries, one per Task-completion notification observed by the orchestrator:

```json
{ "stage": "structure", "skill": "presentation-structure", "version": "1.0.0", "tokens": 84000, "duration_ms": 120000 }
```

For a stage that ran inline (no Task notification available):

```json
{ "stage": "design", "skill": "presentation-design", "version": "1.0.0", "tokens": null, "duration_ms": null, "note": "not captured (inline)" }
```

`scripts/telemetry.py::totals()` sums `tokens`/`duration_ms` across all entries where both are non-null; any entry where either is `null` is excluded from the sums and its `stage` name is added to `inline_stages` instead. There is no partial credit — a `tokens: 5000, duration_ms: null` entry is treated as fully excluded, not half-counted.

## 5. `execution-report.json` output shape

This is exactly what `scripts/assemble.py::assemble()` returns and `scripts/build_report.py::run()` writes to `execution-report.json` (and feeds to `render_md.render()` for `execution-report.md`).

```json
{
  "pipeline_version": "1.0.0",
  "generated_at": "2026-07-05T00:00:00Z",
  "build_status": "PASS WITH WARNINGS",
  "skills": [
    { "stage": "structure", "skill": "presentation-structure", "version": "1.0.0" },
    { "stage": "design", "skill": "presentation-design", "version": "1.0.0" },
    { "stage": "copywriting", "skill": "presentation-copywriting", "version": "1.0.0" },
    { "stage": "diagram", "skill": "diagram-design", "version": "1.0.0" },
    { "stage": "qa", "skill": "presentation-qa", "version": "1.0.0" }
  ],
  "stage_telemetry": [ "the raw stage-log.json entries, unmodified" ],
  "totals": { "tokens": 284000, "duration_ms": 890000, "duration_s": 890.0, "inline_stages": ["design"] },
  "counts": { "slides": 14, "diagrams": 3, "screenshots_used": "not captured", "screenshots_discarded": "not captured" },
  "source_coverage": { "discovered": 12, "consumed": 9, "ratio": 0.75, "unconsumed": ["a.pdf", "b.txt", "c.pdf"] },
  "qa": { "verdict": "SHIP-WITH-ACCEPTED-MAJORS", "auto_fixes": 4, "remaining_findings": { "blockers": 0, "majors": 2, "minors": 1, "list": ["S7 units", "..."] } },
  "confidence": {
    "by_stage": {
      "structure": { "score": 90, "band": "High" },
      "design": { "score": 100, "band": "High" },
      "copywriting": { "score": 100, "band": "High" },
      "diagram": { "score": 100, "band": "High" },
      "qa": { "score": 80, "band": "Medium" }
    },
    "weighted_overall": { "score": 94.0, "band": "High" },
    "weakest_stage": { "stage": "qa", "score": 80, "band": "Medium" }
  },
  "needs_verification": ["$1.8M savings unsourced"],
  "assumptions": ["Q3 close assumed"],
  "conflicts": ["doc A vs doc B on ARR"],
  "skipped_by_design": [
    { "item": "5-item list", "reason": "no relation cues — kept as list", "stage": "diagram" }
  ],
  "rendering_warnings": ["S7 y-axis units missing"],
  "recommendations": [
    { "priority": 1, "target": "...", "action": "...", "payoff": "..." }
  ]
}
```

Notes on this shape, keyed to the exact code that produces it (`scripts/assemble.py`):

- **`skills`** is stage-records re-emitted as `{stage, skill, version}` triples, sorted by `config.STAGE_ORDER` (`structure, design, copywriting, diagram, render, qa`) — this is execution order, not input order.
- **`by_stage`** only contains entries for stages in `config.CONFIDENCE_STAGES` (`structure, design, copywriting, diagram, qa` — **`render` is never scored**, by construction: it is simply never looked up there).
- **`counts`**, when a key was never reported by any stage-record, renders `"not captured"` for that key (measurement channel unavailable) — see `deckfacts.merge_counts`. When multiple stages report the same count key, the value from the latest stage in `STAGE_ORDER` wins (e.g. a `render`-stage slide count overrides a `structure`-stage one).
- **`source_coverage`**, when no stage-record reported any `sources`, is the single object `{"discovered": "not captured", "consumed": "not captured", "ratio": "not captured", "unconsumed": []}` (all four keys collapse together — it is not per-key).
- **`needs_verification`**, **`assumptions`**, **`conflicts`**, **`rendering_warnings`** — each is the flattened union across every stage-record's corresponding list field, in stage order. If that union is empty across the whole build, the field is the single-element list `["none reported"]` — this is the "un-surfaced" fallback (distinct from `"not captured"`, which is reserved for measurement/coverage gaps, never for these harvested-opinion lists).
- **`skipped_by_design`** — each stage-record's entries are re-emitted with `stage` attached. If a record's entry omits `reason`, the aggregator fills `"none reported"` for that one entry (not the whole list). If no stage-record has any `skipped_by_design` entries anywhere in the build, the whole field becomes the single placeholder object `{"item": "none reported", "reason": "—", "stage": "—"}`.
- **`recommendations`** — always at least one entry; see `confidence-and-status.md` for the priority table. When nothing fires, the single entry is `{"priority": 1, "target": "none", "action": "Build is clean — no high-impact improvements identified.", "payoff": "—"}`.
- **`generated_at`** — pass-through of whatever the caller supplied; `build_report.run()` never supplies it explicitly, so in the CLI path it is `assemble.assemble`'s own `datetime.now(timezone.utc).isoformat()` default.

The `.md` and `.json` outputs are rendered from this exact same dict (`render_md.render(report)`), so they cannot drift from each other — but they can drift from this document if the code changes without this file being updated. Treat the code in `scripts/assemble.py`, `scripts/deckfacts.py`, and `scripts/render_md.py` as the source of truth.

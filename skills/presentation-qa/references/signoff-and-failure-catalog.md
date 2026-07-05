> Extracted from the presentation-qa master knowledge base (research synthesis, 2026-07-03).
> Lanes: [COG] [PROC]; upstream contracts [STR] [DES] — see sources-and-conflicts.md.

# QA report format, sign-off & the failure catalog

## 7. QA report format & sign-off

Extends [DES §9.4] (design-review report) and [PROC §11.32] to the final gate. Sign-off is written, criteria-based, and precedes distribution; an undocumented "looks good" is unauditable.

**Ship criteria are boolean and fixed BEFORE the review** (criteria defined after findings get negotiated to fit them [PROC §11.33]). Default gate:
`{0 Blockers · all Majors dispositioned · acceptance matrix 100% delivered-or-accepted · fact coverage 100% on exposed claims · cross-slide ledger clean · lint clean-or-excepted · accessibility blocking set clean for the declared mode}`

### 7.1 Report structure (emit in this order)
1. **Header**: deck · version/hash · mode (presented-stage / presented-lit-room / screen-share / sent-ahead — drives the severity modifier and the P-battery) · audience overlay · gate date · passes run + agent/lens per pass · escalation passes run (y/n + why).
2. **Acceptance matrix** (Q1.1–Q1.3): rows = outline beats; columns = {beat ID, planned assertion, planned evidence, built slide #, delivers? Y/N/partial, deviation note}; reverse table of unclaimed slides. Drops and insertions called out above the table.
3. **Verification ledger**: fact-bank trace coverage (n/n; exposed-claim coverage separately), cross-slide number ledger (rows + match status), unverified-claim list, recomputation failures.
4. **Consistency sheet + deviations**: the extracted style sheet and every S1–S6 finding.
5. **Findings table**: severity-ordered; each = {ID of failed check, slide(s), finding in mechanism format — "for [audience], [element] risks [failure] because [mechanism]" [DES §9.1] — pass that found it, verb (ASSERT/RE-RUN/NEW), disposition (fix / accept-with-reason+owner / reject-with-reason), impression-tagged items marked}. Lint output enters this table with rule-class severities; silent dropping of findings is banned — the audit trail is the product [PROC §8.24].
6. **Accessibility annex**: A/CVD battery results per mode; delivery-notes block (A11/P3) for live decks.
7. **Escalation outputs** (high-stakes only): timing math vs slot, question-list coverage, red-team attacks + where each is answered, premortem risks + mitigations.
8. **Verdict — deterministic, zero new judgment**: `SHIP` / `SHIP-WITH-ACCEPTED-MAJORS` (owners named) / `BLOCKED` (blocker list). The verdict line is computed from the table against the pre-agreed boolean gate; if the verdict requires prose to justify, the criteria were wrong.

### 7.1b Skeleton (field names normative; layout free)
```
QA GATE REPORT
  deck / version-hash / mode / overlay / date / passes+agents / escalations
ACCEPTANCE MATRIX
  beats: n approved · n delivered · n partial · n dropped(⛔) · n inserted
  [beatID | planned assertion | planned evidence | slide# | Y/N/partial | deviation]
VERIFICATION LEDGER
  fact coverage: n/n (exposed: n/n) · unverified: [...] · recompute fails: [...]
  number ledger: n rows · n mismatched(⛔)
CONSISTENCY
  style sheet: [terminology | numbers | dates | caps | punctuation]
  deviations: S1..S6 rows
FINDINGS (severity-ordered)
  [checkID | slide(s) | mechanism statement | pass | verb | disposition | owner]
ACCESSIBILITY ANNEX
  A1..A11, CVD per mode · delivery-notes block (live decks)
ESCALATION (high-stakes)
  timing vs slot · question coverage · red-team attacks→answers · premortem
VERDICT: SHIP | SHIP-WITH-ACCEPTED-MAJORS(owners) | BLOCKED(list)
  gate booleans: [blockers=0? | majors dispositioned? | matrix 100%? |
                  exposed facts 100%? | ledger clean? | lint clean? | a11y set clean?]
```

### 7.2 Triage semantics
Severity = impact × frequency × persistence (+ exposure), collapsed to the single ladder for gate decisions; the factors live in each finding's mechanism text for tie-breaking within a level [PROC §8.22, conflict resolution]. Disposition is recorded per finding; a human owner's acceptance of a Major is itself a recorded decision. After dispositions: re-run voided passes (pass-structure.md re-run rule), then re-emit the report with a new version hash.

## 8. Failure catalog — what ships anyway (priority driver for check ordering)

Each: failure → root mechanism → catching check. Sourced [PROC §12] + [COG] + XCAI build history; this list is why Pass 0 runs first and why the ledger/matrix are non-optional.

| Failure class | Root mechanism | Caught by |
|---|---|---|
| Cross-slide number mismatch | value updated in one place, no single source of truth | S1 ledger |
| Stale number survives an update cycle | manual paste chains between versions | Q1.8 version diff |
| Placeholder/template remnant | meaning-level proofing skips "furniture" | Q0.1 + T2/T7 (in-image + internals) |
| Orphan references after late edits | no reference sweep post-edit | Q0.5 / S5 |
| Publicly falsifiable fact error | everyone assumed someone else checked | Q1.4/Q1.5 (100% exposed coverage) |
| Typos in the biggest type | display text read as gestalt shape; familiarity highest on most-seen slides | Q4.6 reverse-order + display-text spellcheck |
| Count claim ≠ rendered count | copy written before layout capped the list | Q0.3 |
| Wrong-audience leftovers (notes, hidden slides, metadata) | artifact reuse across audiences | S6 export inspection |
| Format/branding drift mid-deck | multi-author assembly without contract | S3/S4 + [DES 18] ASSERT |
| Broken build/narration sync; deck runs long | per-slide review never plays the deck | dry-run pass |
| Dropped spec widget / silent render truncation | extraction pipelines drop structured elements | Q3.8 / T3 / Q1.1(b) evidence-legibility |
| Accent marking the wrong element | emphasis applied per-slide without argument state | M3 |
| Baseline/definition vanished with an earlier slide | transient-information blindness in per-slide review | C5 (deck-level check) |
| Wrong takeaway extractable from a "clean" slide | vertical-flow gap survives visual polish | Q2.2 |

Known gaps (iteration 2): pass-type error-rate evidence is transferred from prose/software QA, not deck-native (MED); dyslexia-overlay spacing evidence MED (failed small-delta replications); no controlled evidence yet on optimal pass count for agent (vs human) reviewers — current stance: fresh contexts are ≈free, keep full separation, compress human touchpoints instead [PROC §13].

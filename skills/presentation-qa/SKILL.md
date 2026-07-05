---
name: presentation-qa
version: 1.0.0
description: Run the final quality gate on a presentation before it ships — a fresh-eyes, checklist-driven verification sweep over the complete pre-render package (outline + design spec + copy + diagram specs) and/or the rendered deck (PPTX/PDF/HTML/PNG). Use this skill whenever a deck or slides need reviewing, checking, auditing, or QA-ing; whenever the user asks "is this deck ready?", "check my presentation", "look this over before I send it", or wants a pre-send/pre-meeting review, post-render verification, accessibility check, or consistency check; and ALWAYS as the last pipeline step after a renderer builds the file — even if the user never says "QA". It verifies and reports with a ship/no-ship verdict; it never redesigns or rewrites.
---

# Presentation QA

You are the FINAL GATE. Upstream, the pipeline ran `presentation-structure` (locked outline + fact bank + 11 outline gates) → `presentation-design` (token sheet + spec + design-review report) → `presentation-copywriting` (final copy) → diagram specs → a renderer (`document-skills:pptx`, an HTML deck system). You receive their artifacts and answer one question: **does the built deck deliver what was approved, and does it violate any rule in the pipeline's shared rulebook?** Then you compute a verdict: ship, fix-then-ship, or return-to-owner.

**Prime directive — verify, don't create.** Never redesign, rewrite, reorder, or invent fixes. Every finding cites a numbered check; every recommended fix is the *minimal* correction plus the owning upstream skill that executes it. A QA pass that "improves" content is itself a defect. Hold no opinion about what the deck should say — only whether it delivers what was approved.

**Independence is the mechanism, not a nicety.** Authors cannot proof their own work — expectation overwrites perception. Run each pass in a fresh context (a subagent via the Agent tool where available) that receives ONLY the contract artifacts plus that pass's checklist — never the build conversation, never a previous pass's findings ("previous review found no issues" is banned prompting). Findings merge only at aggregation. If you built or edited this deck earlier in the session, that is precisely why the passes must run fresh.

## Core model — seven ideas everything derives from

1. **Verify, don't create.** The outline, spec, and copy are other skills' outputs. You check delivery against contract; redesign-for-its-own-sake is a finding class, not a service.
2. **The builder never signs off its own work.** Fresh contexts per pass; artifacts only; anti-rubber-stamp.
3. **Checklist over impression.** Every pass runs from its explicit check catalog (~50% fewer false positives, reproducible). Ad-hoc observations are allowed but tagged `impression` and need a named mechanism before they can drive a fix.
4. **One error class per pass.** Hunting several error types at once drops detection for all of them. Coarse before fine: never polish what content review may still void.
5. **Three verbs.** Every check is ASSERT (confirm the upstream check ran and its verdict holds on spot-inspection), RE-RUN (execute again on the render/export — anything the renderer can break is never ASSERTed), or NEW (only this skill runs it: facts, regression, consistency, WCAG, cognition, render tells). This resolves "don't duplicate upstream" vs "a claim verified only by its author is unverified".
6. **One severity ladder, computed verdict.** Blocker / Major / Minor / Cosmetic, with promotion modifiers: sent-ahead mode +1 level, systemic (token-class) +1, high-exposure slide (title/statement/hero) +1. Ship criteria are boolean and fixed BEFORE review.
7. **Mechanical first, judgment second.** Lint runs before any judgment pass; lint findings feed triage, never verdicts.

## Reference files — read before the pass that uses them

| File | Contents | Needed for |
|---|---|---|
| `references/pass-structure.md` | core model in full, the 7 passes with inputs/outputs/why, escalation passes, re-run rule, stakes scaling, upstream disposition index (every [STR] gate + [DES] check → verb + owning pass) | Step 0; routing any upstream rule (Steps 3–4) |
| `references/check-catalog.md` | check IDs Q0.x–Q4.x (passes 0–4), AI-pattern sweep T1–T9 + RE-RUN subset, complete Blocker set, judgment-only list, iron rules | Steps 1–5, 9 |
| `references/consistency-sweeps.md` | style-sheet extraction + enforcement sweeps S1–S6 | Step 7 |
| `references/accessibility-cognitive-load.md` | WCAG battery A1–A11, CVD1–3, dyslexia overlay, mode fork P1–P5, Mayer/CLT battery M1–M12 + C1–C7 | Steps 4, 6 |
| `references/signoff-and-failure-catalog.md` | report structure + skeleton, boolean ship gate, triage semantics, what-ships-anyway failure catalog | Steps 0 (gate), 9–10 |
| `references/sources-and-conflicts.md` | 13 resolved conflicts (by rule, never averaged), sources index, upstream contract paths | when rules seem to clash |

Upstream catalogs this skill cites but never restates: `presentation-design/references/design-review.md` (severity ladder + checks 1–24) and `presentation-design/references/ai-tells.md` (tells 1–26). Cite their IDs.

## Step 0 — Intake the package

Collect before any checking (ask for what's missing; note gaps as findings — a missing design-review report is itself Q3.7):

1. **Approved outline + fact bank** — from `presentation-structure`. No outline → the acceptance matrix cannot run; say so and offer a degraded gate (passes 0, 4–6 + render checks only).
2. **Design spec + token sheet + design-review report** — from `presentation-design`.
3. **Final copy + diagram specs** — from the copy/diagram lanes if they ran.
4. **Render** (PNG set per slide) and **export** (PPTX/PDF file + its internals: object model, notes, metadata, masters). Prefer both; RENDER checks need pixels, EXPORT checks need file internals.
5. **Delivery mode** — presented-stage / presented-lit-room / screen-share / sent-ahead. Drives the accessibility blocking set, M6, and the +1 severity modifier. "Both" = two artifacts, two gates.
6. **Audience overlay** — sets C1 caps, M7/M8 strictness, R2 jargon whitelist.
7. **Stakes tier** — routine internal / standard external / high-stakes. Sets which passes are mandatory (table in `pass-structure.md`); sent-ahead always makes Pass 5 mandatory.

Fix the boolean ship gate NOW, before any finding exists (default in `signoff-and-failure-catalog.md`) — criteria defined after findings get negotiated to fit them.

## Step 1 — Pass 0: mechanical lint

Run every Q0 check (`check-catalog.md`) over spec + plain-text extraction + export internals: placeholder remnants (the single most-shipped failure class), stated-count vs rendered-count, % footing, cross-reference targets, token conformance, fact-key mismatches, hedge words, footer/wayfinding integrity. Output pre-severitied finding rows and the seed style sheet for Pass 6. Cheap, deterministic, de-noises every later pass — which is why it runs first and unconditionally.

## Step 2 — Pass 1: content integrity (fresh context)

Inputs: outline + fact bank + render. Traverse in story order. (a) Build the **bidirectional acceptance matrix** (Q1.1–Q1.3): every approved beat → a built slide that delivers it (meaning intact, evidence present AND legible, rhetorical job survives); every built slide → a beat ID. Dropped beat = Blocker; unclaimed slide = unapproved insertion. (b) **Fact verification** (Q1.4–Q1.5): every number, name, date, quote, superlative traces to the fact bank; 100% coverage on exposed claims (titles, hero stats, superlatives), primary-source-only for those. (c) **Numbers** (Q1.6–Q1.8): foot every total, recompute every %, diff vs the prior deck version. A Blocker here voids all downstream passes for the affected slides — run this before spending any judgment elsewhere.

## Step 3 — Pass 2: story (fresh context)

Inputs: outline + built titles/copy + the structure-stage gate report. The 11 outline gates already ran upstream — consult the disposition index (`pass-structure.md` §2.0): RE-RUN only the render-fragile subset (Q2.1 titles-alone on *built* titles — builders "improve" copy; Q2.2 vertical flow; Q2.4 loop closures; red-team answers still exist), ASSERT the rest (so-what, elevator, shape, SUCCESs, stance). Story defects are argument-level, a different detection mode from claim checking — never merge this pass into Pass 1.

## Step 4 — Pass 3: design + cognition + AI sweep (fresh context)

Inputs: design spec + design-review report + render PNGs. Look at the **thumbnail grid first** (defamiliarization), then per-slide. (a) RE-RUN render-fragile design checks Q3.1–Q3.6, Q3.8 (squint, glance, dominance, evidence honesty, mode compliance, render fidelity — overflow, clipped text, dropped widgets), citing [DES] check numbers. (b) ASSERT the design-review report exists and was dispositioned (Q3.7). (c) NEW: run the Mayer/CLT battery (M/C checks, `accessibility-cognitive-load.md` §5) — thresholds come from the audience overlay. (d) AI sweep (`check-catalog.md` §6): ASSERT the spec-stage tell sweep ran; RE-RUN the pixel-detectable subset (renderers re-introduce tells — font substitution, theme gradients, card regularization); run render-only tells T1–T9.

## Step 5 — Pass 4: copy (fresh context)

Inputs: plain-text extraction + audience overlay + render. Traverse in **reverse slide order** plus a plain-text read — breaking the narrative starves meaning-level processing so attention stays on the surface, and big type hides typos (it is read as gestalt shape). Run Q4.0–Q4.8: typos incl. display text and notes, noun-stacks, jargon vs overlay, headline form, number presentation, front-loading, register (WARN-ceiling — the copy lane owns register), granularity uniformity. Never gate on reading-grade formulas (Q4.0). Copy runs after design because copy fixes don't invalidate layout; layout fixes may rewrite copy.

## Step 6 — Pass 5: accessibility (fresh context)

Inputs: render + export + declared mode. Run against the EXPORT, never the authoring preview — exports silently drop tags, alt text, and widgets. Full battery in `accessibility-cognitive-load.md`: A1–A11 (contrast on real pixels, grayscale survival, reading order, takeaway-stating alt text, programmatic titles, flashing, captions), CVD simulation on color-encoded slides, dyslexia-overlay verification (verify tokens deliver it; never prescribe "dyslexia fonts"), and the P1–P5 mode fork. Blocking set depends on mode: presented → {A1, A3, A7, CVD1, CVD2}; sent-ahead adds {A4, A5}.

## Step 7 — Pass 6: consistency (fresh context, LAST)

Inputs: FINAL plain-text extraction + export internals + the Pass-0 seed sheet. Runs last because it is relational — instance A vs instance B slides apart — and earlier fixes change exactly what it sweeps. Method: **extract, then enforce** — complete the deck style sheet (terminology canon, number/date/caps/punctuation rules), then run S1–S6 (`consistency-sweeps.md`): number ledger closure (any cross-slide mismatch = Blocker — audiences catch a deck contradicting itself), timeline agreement, terminology/format drift, cross-reference integrity, wrong-audience leftovers in file internals. Language layer only; token-layer consistency is [DES check 18] — ASSERT.

## Step 8 — Escalation passes (high-stakes decks only)

- **Dry-run** (presented): narrate end-to-end — timing math (notes words ÷ ~130 wpm vs slot), build order vs narration beats, click count in presentation mode; emit the per-slide audience-question list and verify every question has an in-deck/notes/appendix answer.
- **Red team + premortem**: one adversarial lens per stakeholder type attacking the THESIS, not the craft; premortem prompt ("the meeting failed — write why"). A thesis-level kill is a Blocker even when every craft check passes; output routes to content/appendix, never to polish.

## Step 9 — Triage, disposition, re-runs

Aggregate all passes' findings (dedupe keeping highest severity). Apply the ladder + the three promotion modifiers (mode / systemicity / exposure). Record a disposition per finding — fix / accept-with-reason+owner / reject-with-reason; silent dropping is banned, the audit trail is the product. **Re-run rule:** any applied fix voids, for the affected slides, every pass at or after the pass that found it — re-run those passes on the fixed slides before sign-off, then re-emit with a new version hash.

## Step 10 — Emit the QA report + verdict

Emit per `signoff-and-failure-catalog.md`, in order: header (deck, hash, mode, overlay, passes run) · acceptance matrix · verification ledger · consistency sheet + deviations · severity-ordered findings table (each: check ID, slide(s), mechanism statement "for [audience], [element] risks [failure] because [mechanism]", pass, verb, disposition, owner) · accessibility annex · escalation outputs · **verdict**. The verdict is computed from the pre-agreed boolean gate, zero new judgment: `SHIP` / `SHIP-WITH-ACCEPTED-MAJORS` (owners named) / `BLOCKED` (blocker list, each with its return-to-skill). If the verdict needs prose to justify, the criteria were wrong.

## Quick reference

**Pass order and what each catches** (order is load-bearing — see `pass-structure.md` for why):
0 Lint → placeholders, counts, footing, tokens, references · 1 Content → dropped beats, unverified facts, bad math · 2 Story → title drift, open loops, missing answers · 3 Design → hierarchy/evidence/render failures, cognition overload, AI tells · 4 Copy → typos, jargon, headline form · 5 Accessibility → contrast, color-only meaning, alt/order, mode fit · 6 Consistency → numbers/dates/terms that disagree across slides.

**Severity ladder**: Blocker = cannot ship (wrong fact, number mismatch, dishonest data, dropped beat, placeholder, wrong takeaway, a11y blocking set) · Major = ship only with a named owner's recorded accept · Minor = fix if time, log if not · Cosmetic = log. Modifiers: sent-ahead +1 · systemic +1 · high-exposure slide +1. Complete Blocker enumeration: `check-catalog.md`.

**Verdict gate (default)**: 0 Blockers · all Majors dispositioned · acceptance matrix 100% delivered-or-accepted · fact coverage 100% on exposed claims · cross-slide ledger clean · lint clean-or-excepted · a11y blocking set clean for the declared mode.

**Cheap fresh eyes** (use per pass): thumbnail grid · plain-text extraction · reverse slide order · titles-read-aloud · presentation-mode click-through.

## Scope notes

- **Fixes are executed by their owning skills, never here.** Route: story/beats/facts → `presentation-structure` · layout/tokens/archetypes → `presentation-design` · wording/register → `presentation-copywriting` · diagram content → `diagram-design` · overflow/font/export mechanics → the renderer. Your output names the check, the minimal fix, and the owner.
- Outline-stage QA (the 11 gates) lives in `presentation-structure`; the pre-render design review lives in `presentation-design`. This skill is the *independent final sweep* over the built artifact — their PASS reports are inputs (ASSERT), never substitutes.
- If asked to "just fix it too": emit the report first, get dispositions, then hand each accepted fix to its owning skill in pipeline order and re-run the voided passes. Never patch the artifact silently mid-review — that makes the reviewer the builder, and the builder never signs off.
- No approved outline / no upstream reports? Run the degraded gate (Step 0.1), report which passes could not run, and never present the result as a full gate.

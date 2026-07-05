> Extracted from the presentation-qa master knowledge base (research synthesis, 2026-07-03).
> Lanes: [COG] cognitive-load-accessibility · [PROC] qa-process-rubrics. Upstream contracts: [STR] presentation-structure master · [DES] presentation-design master. All cited IDs resolve there — see sources-and-conflicts.md.

# Core model & pass structure

**Pipeline position: FINAL GATE.** Input = the complete pre-render package (locked outline + design spec + copy + diagram specs) and, when available, the rendered artifact (PNG set + object model) and export (PPTX/PDF). This skill **verifies and reports; it never creates, rewrites, or redesigns**. Every fix it recommends cites a failed check; execution of fixes belongs upstream or to the renderer.

## 0. Core model

Six load-bearing ideas plus a sequencing rule. When anything seems ambiguous, resolve by returning here.

**0.1 Verify, don't create.** The outline is immutable [DES §0.1]; the design spec is the design skill's output; copy is the copy lane's. The QA skill holds no opinion about what the deck *should* say or look like — only whether the built artifact delivers what was approved and violates no rule in the pipeline's shared rulebook. A QA agent that "improves" content is a defect (redesign-for-its-own-sake is itself a finding class [DES §9]).

**0.2 The builder never signs off its own work.** Authors structurally cannot proof their own artifact: expectation overwrites perception — the intended version competes with and beats the actual one [PROC §2.5, Stafford]. Therefore the final gate runs in fresh contexts that never saw the build conversation: each pass's agent receives ONLY the contract artifacts (outline, spec, render) plus that pass's checklist [PROC §1.3].

**0.3 Checklist over impression.** Checklists beat ad-hoc review on false positives (~50% fewer) and reproducibility — decisive in a pipeline where spurious findings drive harmful auto-fixes [PROC §9.25]. Every pass runs from an explicit check catalog (check-catalog.md, consistency-sweeps.md, accessibility-cognitive-load.md). Ad-hoc observation is permitted but its findings are tagged `impression` and need a named mechanism before they can drive any fix. Checklists catch ineptitude, not ignorance — keep them short per pause point (5–9 items at gates), not one mega-list [PROC §9.26]. Passes are READ-DO procedures; sign-off is a DO-CONFIRM pause point [PROC §9.27].

**0.4 One error class per pass.** Hunting several error types simultaneously drops detection rates for all of them; separated passes with fresh eyes each raise per-class accuracy [PROC §1.1]. Coarse before fine: never polish what content review may still rewrite. A Blocker found at pass N voids later-pass results for the affected slides; re-run them after the fix [PROC §1.2].

**0.5 The three verification verbs — pointer discipline operationalized.** Upstream skills own their rules; the final gate never restates rationale, but "don't duplicate" must not become "don't verify" (Independence Principle: a claim verified only by its author is unverified [PROC §3.8]). Every check carries one verb:
- **ASSERT** — confirm the upstream check *ran*: its report section exists, is complete, and its verdict is consistent with the artifact on spot-inspection. Used for spec-stage judgment checks upstream already executed (e.g., archetype selection, framework routing).
- **RE-RUN** — execute the check again on the RENDER/EXPORT, because rendering can invalidate a spec-stage pass (overflow, widget drop, font substitution, contrast on real pixels). Anything the renderer can break gets RE-RUN, never ASSERT.
- **NEW** — checks only this skill runs (fact/number verification, regression matrix, consistency sweeps, WCAG/export mechanics, Mayer/CLT battery, render-time tells).

**0.6 One severity ladder, hard gate semantics.** Adopt — do not fork — the design skill's ladder [DES §9.1], extended with the process lane's release semantics [PROC §8.23]:
- **Blocker — cannot ship**: wrong/unverifiable fact or number; cross-slide number mismatch; dishonest data (axis, lie factor); dropped outline beat; placeholder/template remnant; wrong takeaway extractable; the ⛔ accessibility set (accessibility-cognitive-load.md).
- **Major — ship only with a named owner's recorded accept**: takeaway at risk; illegible key evidence; unanswered killer objection; broken cross-reference; systemic consistency break; AI tell present.
- **Minor — fix if time, log if not**: single-instance inconsistencies, friction items, orphan words.
- **Cosmetic — log only.**
Severity modifiers: (a) **mode** — the same defect is one level HIGHER in a sent-ahead deck (re-read, forwarded, screen-reader-consumed) than in a presented one [PROC §8.22, COG P2]; (b) **systemicity** — a token-class defect hitting many slides promotes one level; (c) **exposure** — defects on title/statement/hero slides promote one level (verification effort allocates by exposure, not count [PROC §3.10]).

**0.7 Mechanical first, judgment second.** All lintable checks (Pass 0) run before any judgment pass: they are cheap, deterministic, and their output feeds triage — lint findings are inputs, never verdicts [PROC §10.31]. Judgment passes then spend attention only where meaning lives.

## 1. The pass structure

Seven sequential stages (a lint stage + six review passes), each a fresh-context agent holding only its checklist and the artifacts — never a previous pass's findings ("previous review found no issues" is banned prompting; findings merge only at aggregation [PROC §9.29]). For high-stakes decks the six passes may run as parallel independent lenses (3–5 reviewers find ~75% of defects vs ~35% for one; dedupe at aggregation keeping the highest severity [PROC §9.28]).

**Artifact routing (from [COG §6]):** SPEC-stage findings are cheapest to fix — report them even when a render exists; RENDER/EXPORT checks require the built artifact; DELIVERY checks emit as notes and never block a render. Each pass below declares its inputs and its output artifact.

**PASS 0 · LINT (mechanical, automatable, runs on everything first).** NEW.
*Inputs*: spec + plain-text extraction of render + export internals. *Output*: pre-severitied findings rows + seed style sheet.
Placeholder/template remnants (lorem ipsum, TBD/TODO/XXX, "Click to add", template dummy names/dates); doubled words; straight/curly quote mix; double spaces; stated-count vs rendered-element-count; % totals ≈100; date/number format regexes; cross-reference targets exist; token conformance (font roles, off-scale spacing, contrast ratios, type floors — [DES] appendix values); identical-fact-key → identical-value across slides; banned hedge words and "significant" without a number [STR §3.15]. Output: pre-severitied findings table rows + the machine-extracted style sheet (consistency-sweeps.md §3.1) for Pass 6.
*Why first*: highest-value catches per unit cost (placeholder remnants are the single most-shipped failure class [PROC §12]); results de-noise every later pass.

**PASS 1 · CONTENT-INTEGRITY.** NEW. Traversal: story order.
*Inputs*: approved outline + fact bank + render. *Output*: acceptance matrix + verification ledger.
(a) **Regression vs approved outline** — the bidirectional acceptance matrix (Q1.1–Q1.3): every beat delivered, every slide claims a beat. (b) **Fact verification** — every on-slide number, name, date, quote, superlative traces to the verified-fact bank [STR §4 Step 4]; claims with no bank entry are unverified insertions (Blocker until sourced). 100% coverage on exposed claims (titles, hero stats, superlatives, competitor claims); trace-check on body detail [PROC §3.8–3.10]. (c) **Numbers pass** — footing, recomputation, cross-instance ledger seeded here (consistency-sweeps.md §3.2).
*Why first among review passes*: a content Blocker voids everything downstream; facts are the discontinuous-cost error class (one publicly falsifiable claim can destroy trust in the whole artifact [PROC §3.10]).

**PASS 2 · STORY.** Mostly ASSERT + targeted RE-RUN. Traversal: story order.
*Inputs*: outline + built titles/copy + structure-stage gate report. *Output*: story findings + gate-coverage assertion.
Verifies the structure layer survived the build: titles-alone-tell-the-story (RE-RUN on built titles — builders "improve" copy [PROC §5.14]), vertical flow per slide, loop ledger closed, shape check, red-team answers present. Cites [STR §4 Step 7 gates 1–11]; the gate ran at outline stage — this pass re-runs the render-fragile subset (titles, loop closure, bookend wording) and asserts the rest.
*Why separate from content-integrity*: story defects are argument-level (order, flow, promise-keeping), a different detection mode from claim-level verification; merging them re-creates the "read for everything" failure.

**PASS 3 · DESIGN.** RE-RUN of render-fragile design checks + the cognition battery. Traversal: thumbnail grid first, then per-slide.
*Inputs*: design spec + design-review report + render (PNG set). *Output*: design/cognition findings + AI-sweep results.
(a) RE-RUN on RENDER: squint/thumbnail test, glance test, one-dominant-element, look-order plausibility, hierarchy levels, evidence rules (axes, direct labels, annotation), rhythm/budget checks visible in the thumbnail grid — citing [DES §9.2 checks 1–13, §9.3 checks 14–24] by number. (b) ASSERT: the design-review report exists, findings were dispositioned. (c) NEW: the Mayer/CLT battery (accessibility-cognitive-load.md §5) — upstream states the doctrine [STR §G3]; the checkable-rule formulations run here.
*Why separated*: visual verification requires the rendered artifact and a different re-representation (thumbnails = defamiliarization [PROC §2.6]); cognition checks need SPEC+RENDER+NOTES jointly.

**PASS 4 · COPY.** NEW + RE-RUN. *Inputs*: plain-text extraction + audience overlay + render. *Output*: copy findings. Traversal: **reverse slide order** (breaking the narrative starves meaning-level processing and leaves attention on the surface [PROC §2.7]) plus a plain-text extraction read (no layout to hide behind).
Typos including display-size text (title typos survive because big type is read as gestalt shape [PROC §12]); readability checks R1–R6 (check-catalog.md Q4.x) — never grade formulas on fragments (R0 [COG §3]); register/jargon vs audience overlay; headline sentence quality.
*Why after design*: copy fixes are cheap and don't invalidate layout; layout fixes may rewrite copy.

**PASS 5 · ACCESSIBILITY.** NEW, mechanical-heavy. *Inputs*: render + export + declared mode. *Output*: accessibility annex + delivery-notes block. Runs against RENDER + EXPORT — the exported artifact, never the authoring preview (exports silently drop tags/alt/widgets [COG P4, STR §5 lesson 10]).
The full accessibility battery (accessibility-cognitive-load.md §4): WCAG A-series, CVD simulation, dyslexia-overlay verification, projected-vs-read fork. Blocking set depends on mode (§4.4).
*Why separate*: entirely mechanical + export-artifact-scoped; mixing it into design review buries deterministic checks inside judgment work.

**PASS 6 · CONSISTENCY.** NEW. *Inputs*: final plain-text extraction + export internals + Pass-0 seed sheet. *Output*: completed style sheet + S-series findings. Runs LAST, over the final byte-state of all text and numbers (earlier-pass fixes change exactly what this pass sweeps).
Style-sheet extraction then enforcement; cross-slide number ledger closure; terminology canon; format uniformity; cross-reference integrity (consistency-sweeps.md). Language-layer only — the token layer is [DES §9.3 check 18] territory (ASSERT).
*Why last and separate*: consistency errors are relational (instance A vs instance B slides apart) — a lookup task against an externalized sheet, not a reading task; it must see the deck's final state [PROC §4.12].

**ESCALATION PASSES (high-stakes decks only):**
- **Dry-run/walkthrough** (presented decks): narrated end-to-end run — timing math (notes words ÷ ~130 wpm vs pacing band [STR §2.3]), spoken transitions exist, build order matches narration beats [DES §4.3], click count verified in presentation mode. Emits a per-slide audience-question list; every question needs an in-deck, notes, or appendix answer (feeds [STR] red-team gate) [PROC §6.16–6.18].
- **Red team / murder board**: one adversarial agent per stakeholder type attacking the THESIS, not the craft; plus the premortem prompt ("the meeting failed — write why", prospective hindsight +30%) [PROC §7.19–7.21]. Output routes to content/appendix, never to polish. A thesis-level kill is a Blocker even when every craft check passes.

**Re-run rule:** any applied fix voids, for the affected slides, every pass at or after the pass that found it; those passes re-run on the fixed slides before sign-off.

**Stakes scaling (which passes are mandatory) [PROC §13 four-eyes resolution]:**
| Deck class | Mandatory | Optional/escalation |
|---|---|---|
| Routine internal | Pass 0 + Pass 1 + one combined fresh-context review of 2–4 | 5–6 if sent-ahead |
| Standard external / exec | Passes 0–6 sequential, one agent each | dry-run if presented live |
| High-stakes (board, investor, public) | Passes 0–6 as parallel independent lenses + dry-run + red team + premortem | second human dispositioner |
Sent-ahead mode always makes Pass 5 mandatory (P2 blocking set) and promotes all severities one level (§0.6).

**Pass-order summary (why this order and no other):**
1. Lint → cheapest, de-noises everything.
2. Content-integrity → Blockers here void all downstream work.
3. Story → argument must hold before its rendering is judged.
4. Design → needs render; invalidated by content/story fixes, so runs after them.
5. Copy → cheap fixes that don't invalidate layout; layout fixes may rewrite copy, so copy waits.
6. Accessibility → measures the export, which must be near-final.
7. Consistency → relational sweep over the FINAL byte state; anything earlier would sweep stale text.

## 2.0 Upstream disposition index — every upstream rule, one verb, one owning pass

This table IS the consolidation: it assigns each upstream check a final-gate disposition so nothing is re-argued and nothing is skipped. Rationale for every rule lives at the cited ID — never restated here.

**Structure gates [STR §4 Step 7]:**
| Gate | Name | Verb | Final-gate pass | Why |
|---|---|---|---|---|
| 1 | So-what test | ASSERT + spot-check | 2 | judgment ran at outline; build rarely breaks it |
| 2 | Vertical flow | RE-RUN | 2 | builders alter copy/evidence; the gap re-opens |
| 3 | Horizontal flow (titles-alone) | RE-RUN | 2 | title edits during build are common |
| 4 | Elevator test | ASSERT | 2 | outline property; build can't break it if gate 3 holds |
| 5 | Glance test | RE-RUN | 3 | rendering changes word counts, focal weights |
| 6 | Shape check | ASSERT | 2 | slide ORDER is locked; verify no reorder occurred |
| 7 | Loop ledger | RE-RUN (closures only) | 2 | closure wording is copy — edits break bookends |
| 8 | SUCCESs sweep | ASSERT | 2 | outline-stage property |
| 9 | Kosslyn audit | RE-RUN (unit count + salience) | 3 | render determines perceptual units and salience |
| 10 | Red team | ASSERT + answer-existence RE-RUN | 2 | questions fixed at outline; answers can vanish in edits |
| 11 | Narrative acceptance | superseded | 1 | Q1.1–Q1.3 is its full formalization |

**Design review [DES §9.2–§9.3]:**
| Checks | Content | Verb | Pass |
|---|---|---|---|
| 1–3 (dominance, squint, glance) | render-fragile hierarchy | RE-RUN | 3 |
| 4 (headline form) | assertion sentence, ≤2 lines, largest | RE-RUN | 4 (Q4.3) |
| 5–7 (one idea, position, grouping) | composition | RE-RUN | 3 |
| 8–10 (type, color, spacing tokens) | mechanical invariants | RE-RUN via lint | 0 (Q0.6) |
| 11 (evidence rules) | axes, labels, annotation | RE-RUN | 3 (Q3.4) |
| 12–13 (word budget, element-job) | spec discipline | RE-RUN / ASSERT | 3 |
| 14 (layer-cake) | = structure gate 3 | RE-RUN once | 2 (Q2.1) |
| 15–16 (rhythm, budgets) | deck-level pacing | ASSERT + grid inspection | 3 (Q3.5) |
| 17 (AI-tell sweep) | [DES §7] items 1–26 | ASSERT + render subset RE-RUN | 3 (check-catalog.md §6) |
| 18–19 (token/concept-color consistency) | system layer | ASSERT + lint overlap | 0/6 |
| 20 (mode compliance) | presented/sent-ahead rules | RE-RUN | 3 (Q3.6) |
| 21 (appendix scent) | deferred-detail pointers | ASSERT + S5 target check | 6 |
| 22 (branding) | logo bookends, no invention | ASSERT | 3 |
| 23 (story fidelity) | outline text unmodified | RE-RUN | 1 (Q1.3) |
| 24 (audience overlay) | named + applied | ASSERT; sets C7/R2 thresholds | 3/4 |

**Design AI tells [DES §7 items 1–26]**: ASSERT the sweep ran; RE-RUN on render the pixel-detectable subset (fonts, gradients, card regularity, emphasis repetition — check-catalog.md §6); the taxonomy itself is never restated.

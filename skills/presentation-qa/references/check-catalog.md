> Extracted from the presentation-qa master knowledge base (research synthesis, 2026-07-03).
> Lanes: [COG] [PROC]; upstream contracts [STR] [DES] — see sources-and-conflicts.md. Cited rule IDs resolve upstream; never restate their rationale.

# Full check catalog (passes 0–4) + AI-pattern final sweep + gate-agent quick reference

Format: `ID · PASS/FAIL rule · severity default · verb · source`. Passes 5–6 are cataloged in accessibility-cognitive-load.md and consistency-sweeps.md; the cognition battery in accessibility-cognitive-load.md §5. Severity marks: ⛔ Blocker · ▲ Major · △ Minor.

## Pass 0 — Lint (all ⛔ or ▲ by class; all NEW; [PROC §10.30])
- **Q0.1** No placeholder/template remnant anywhere (text, notes, alt text, metadata, master slides). ⛔
- **Q0.2** No doubled words, double spaces, mixed quote styles, orphan punctuation. △
- **Q0.3** Every stated count ("N reasons/steps/modules") equals the rendered element count. ⛔ (dishonest-claim class; capped layouts truncate silently [STR §5 lesson 2])
- **Q0.4** Percentages presented as parts of a whole sum to ~100 (±1 rounding, noted). ⛔
- **Q0.5** Every cross-reference target exists (appendix IDs, "slide N", agenda items each delivered by a section). ▲
- **Q0.6** Token conformance: only ramp sizes/roles, on-scale spacing, floors respected, ≤3 sizes/slide — the [DES] appendix mechanical invariants. ▲ RE-RUN
- **Q0.7** Same fact key → byte-identical value on every occurrence, or a stated reason (rounding note, different period). ⛔ (feeds the S1 ledger, consistency-sweeps.md)
- **Q0.8** No hedge/vague-quantifier vocabulary where a number is claimable ("significant", "substantial") [STR §3.15]. △
- **Q0.9** Footer/page-number continuity: identical everywhere or absent entirely [DES §6.1]. △
- **Q0.10** Wayfinding integrity on decks >~15 slides: divider ghost numerals = CHAPTER number, never slide index (documented live bug [STR §5 lesson 3]); persistent chapter labels consistent; agenda is never slide 1. ▲

## Pass 1 — Content integrity (all NEW)
- **Q1.1** Forward trace: every approved outline beat maps to a built slide that delivers it — assertion meaning intact (paraphrase only if outline marked non-verbatim), planned evidence present AND legible, rhetorical job survives (a planned comparison split across two slides fails even with all content present). Dropped beat = ⛔ [PROC §5.14–5.15].
- **Q1.2** Backward trace: every built slide claims a beat ID; a slide with none is an unapproved insertion. ▲ (⛔ if it carries new claims)
- **Q1.3** Outline text alterations reported verbatim (story-fidelity, [DES §9.3 check 23]); never silently accepted. ▲
- **Q1.4** Every on-slide factual statement (number, name, date, quote, superlative) traces to a fact-bank entry; no entry → unverified insertion. ⛔
- **Q1.5** Exposed claims (title/statement slides, hero numbers, "first/only/fastest", competitor claims, anything quotable) verified against a PRIMARY source in the bank — never two copies of the same derivative source [PROC §3.9]. Secondary-only support downgrades allowed prominence. ⛔
- **Q1.6** Every stated total/percentage recomputes from its own slide's parts (footing). ⛔
- **Q1.7** Chart values match their labels and annotations; axis, units, source line present per [DES §5.3]. ⛔ RE-RUN
- **Q1.8** Version diff vs prior deck edition (when one exists): every changed number changed intentionally; no stale survivals. ▲

## Pass 2 — Story (cites [STR §4 Step 7]; gate numbers in braces)
- **Q2.1** Titles-alone test: built assertion headlines, read in sequence, reproduce the full argument {gate 3}. ▲ RE-RUN
- **Q2.2** Vertical flow: each title claims exactly what its built body proves — soften the title or strengthen the evidence, never leave the gap {gate 2}. ⛔ when the gap yields a wrong takeaway; else ▲. RE-RUN
- **Q2.3** So-what: no element without a stated implication tied to the title {gate 1}. ASSERT + spot-check. △
- **Q2.4** Loop ledger closed: no orphan opened loops; bookend closes in the opening's original words {gate 7} [STR §H6/H8]. ▲ RE-RUN
- **Q2.5** Shape check: no accidental hype-then-caveats ending; risks precede resolution {gate 6} [STR §C10]. ASSERT. ▲
- **Q2.6** Red-team coverage: each of the 5–8 hardest predicted questions has an in-deck, notes, or appendix answer {gate 10}. ASSERT; RE-RUN only that answers still exist post-edit. ▲
- **Q2.7** Elevator/exec-summary skim test: bold sentences alone deliver the complete argument {gate 4} [STR §B4]. ASSERT. ▲
- **Q2.8** Answer placement matches the declared audience stance [STR §0]; a stance change since outline approval reopens the outline, not this gate. ASSERT. ▲
- **Q2.9** Post-Q&A re-close slide exists for live decks; final slide is the message/CTA, never "Thank You / Questions?" [STR §H5/F12]. ASSERT. △

## Pass 3 — Design (cites [DES §9.2/§9.3] check numbers; cognition battery in accessibility-cognitive-load.md §5)
- **Q3.1** Squint/thumbnail: takeaway and grouping survive blur {DES 2}. ▲ RE-RUN
- **Q3.2** Glance test ~3s per presented slide; proxies: ≤~40 words, one focal element {DES 3, 12}. ▲ RE-RUN
- **Q3.3** One dominant element; stated look-order plausible on the render {DES 1}. ▲ RE-RUN
- **Q3.4** Evidence honesty: bars/lines zero-based (persuasion default), lie factor 0.95–1.05, direct labels, no legends on presented charts, annotated proof point {DES 11}. ⛔ for dishonest axes; ▲ else. RE-RUN
- **Q3.5** Rhythm/budgets on the thumbnail grid: archetype run ≤2, no archetype >40%, density alternation, emphasis budgets {DES 15–16}. ASSERT + grid inspection. △
- **Q3.6** Mode compliance: presented → builds marked, legends stripped, notes populated; sent-ahead → builds flattened, self-standing labels {DES 20}. ▲ RE-RUN
- **Q3.7** Design-review report exists, findings dispositioned, every applied change cites its failed check {DES §9.4}. ASSERT. ▲ if absent.
- **Q3.8** Render fidelity: no overflow/shrink-to-fit evidence, no clipped text, no widget dropped from spec (each spec'd diagram/structured element actually renders) — extraction pipelines drop these silently [STR §5 lesson 10]. ⛔ NEW RE-RUN

## Pass 4 — Copy (readability rules from [COG §3])
- **Q4.0** Process rule: never gate slides on reading-grade formulas (Flesch-Kincaid etc.) — fragment segmentation, false-easy noun-stacks, layout-blindness, glance-vs-read all break them (R0). Formulas permitted only as △ WARN on headlines, which are real sentences (R4).
- **Q4.1** No fragment with >3 consecutive nouns/adjectives (noun-stack density, R1). ▲
- **Q4.2** Every term/acronym outside the declared audience overlay's vocabulary is defined at first use (R2); inversely, no belabored definitions of field-standard terms for expert overlays (C7 interaction). ▲
- **Q4.3** Headline = one complete sentence, one clause, ≤~12 words, contains a verb (R4; doctrine owned by [STR §G1]). ▲ RE-RUN
- **Q4.4** Numbers: ≤3 sig figs presented, one stat per slide, rescaled to human terms (R5 — pointers to [STR §H2/H7], [DES §5.3]). △ ASSERT + spot-check.
- **Q4.5** Front-loading: first 2 words of any heading carry its meaning (R3 → [DES §2.5]). ASSERT. △
- **Q4.6** Zero typos, including display-size text and speaker notes; run in reverse slide order + plain-text extraction. ▲ (⛔ on title slide) NEW
- **Q4.7** Register: personalization floor — zero second-person pronouns across a persuasion/teaching deck's headlines+notes → △ WARN only (M10; copy lane owns register; never auto-fail on exec decks — conflict X6).
- **Q4.8** Uniform granularity per visual group: one {label, detail} shape per diagram/list/grid — never bare words mixed with full sentences in sibling cells [STR §5 lesson 5]. ▲ RE-RUN

## 6. AI-pattern final sweep (inside Pass 3)

**The design skill owns the taxonomy**: [DES §7 items 1–26] (`presentation-design/references/ai-tells.md`) with per-item detection heuristics, plus the master test "did the content choose this, or the template?". Final-gate treatment: **ASSERT** the design lane's tell sweep ran ([DES §9.3 check 17]) and **RE-RUN the render-detectable subset** on actual pixels — spec-stage sweeps can pass while the renderer re-introduces tells (default fonts substituted in, gradient themes applied, cards regularized).

**Render-time tells this skill ADDS (NEW — symptoms only a built artifact shows):**
- **T1** Nonsense/garbled text inside generated imagery (diffusion artifacts) — ⛔.
- **T2** Placeholder text surviving INSIDE images/charts where plain-text lint can't see it (OCR sweep) — ⛔.
- **T3** Widget-drop symptoms: an outline-spec'd diagram/step-strip/callout rendered as plain text or missing (= Q3.8) — ⛔.
- **T4** Font-substitution artifacts: doubled glyphs, wrong metrics, tofu boxes, fallback font mixing mid-line — ▲.
- **T5** Shrink-to-fit evidence: type below floor, compressed leading, text touching container edges (overflow is structural, never typographic [DES §1.1]) — ▲.
- **T6** Build-state leftovers in exports: half-revealed builds frozen mid-state, dimmed history exported as the final state — ▲.
- **T7** Default template residue in file internals: theme names, template author metadata, unused master slides with stock content — △ (⛔ if visible content).
- **T8** Uniform AI-image grade across "photos" (one glossy synthetic treatment presented as photography) — ▲, per [DES §7 item 20].
- **T9** Identical-emphasis habituation on render: the accent appearing on N slides in the same position/role, reading as chrome (RE-RUN of [DES §7 item 5/24] on pixels) — △.

**The RE-RUN subset of [DES §7] (pixel-detectable, renderer can re-introduce them after a clean spec sweep):** items 2 (equal-card walls — renderer regularization), 6 (evenly-stretched sparse content — auto-layout), 9 (container gradients — theme application), 12 (uniform radius — token defaults), 17 (identical bullet rhythm — visible only in final copy), 23 (default-font-for-everything — font substitution), 25 (mid-palette scheme — palette fallback). The remaining tells are spec-stage properties: ASSERT.

Disposition: tells are Major by default [DES §9.1]; a tell that changes the extractable takeaway promotes to Blocker.

## Quick reference for the gate agent

**The complete Blocker set (ship-stopping, enumerated once):**
- Content: Q0.1 placeholder remnant · Q0.3 count mismatch · Q0.4 % footing · Q0.7 fact-key mismatch · Q1.1 dropped beat · Q1.4 untraced claim · Q1.5 exposed claim without primary source · Q1.6 recompute failure · Q1.7 chart-label mismatch · Q3.4 dishonest axes · Q3.8/T3 dropped widget · T1/T2 in-image garbage/placeholder.
- Story: Q2.2 when the wrong takeaway is extractable.
- Consistency: S1 number ledger mismatch · S2 timeline disagreement · S6 wrong-audience leftovers.
- Cognition: M3 accent-on-wrong-element · M6 (presented) · C1 interactivity overload · C5 transient dependency.
- Accessibility (mode-dependent, accessibility-cognitive-load.md §4.5): A1, A3, A7, CVD1, CVD2 always; + A4, A5 sent-ahead.
- Escalation: a red-team thesis-level kill, regardless of craft-check results.

**Judgment-only list (never auto-fail, always LLM-reviewed, finding must cite the check ID)** [PROC §10.30]:
does the title claim what the evidence shows (Q2.2) · is a paraphrase meaning-preserving (Q1.1) · is a source adequate/independent (Q1.5) · does the archetype fit the rhetorical job (ASSERT territory) · will THIS audience misread the slide (C7/R2) · is a red-team objection answered convincingly · grayscale takeaway survival (A3) · tone/register fit (Q4.7) · seductive-detail relevance (M2) · A10 materiality.

**The five defamiliarization re-representations (each is a cheap fresh eye [PROC §2.6]):**
thumbnail grid · plain-text extraction · reverse slide order · titles-read-aloud in sequence · presentation-mode click-through.

**Iron rules, one line each:**
1. Builder never signs off (§0.2). 2. Artifact only, never prior findings, into each pass (anti-rubber-stamp). 3. Lint feeds triage, never verdicts. 4. Severity by the one ladder; disposition recorded per finding; nothing silently dropped. 5. Verdict is computed, not argued. 6. Fixes re-open passes (re-run rule). 7. QA reports; upstream fixes.

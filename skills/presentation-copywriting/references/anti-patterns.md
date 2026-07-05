# Copy anti-patterns, resolved conflicts & sources

> Provenance: sliced from the presentation-copywriting master knowledge base — a deduplicated, conflict-resolved synthesis of four research lanes: [HC] assertion-headline-craft, [MP] marketing-presales-copy, [TT] technical-translation, [MC] slide-microcopy-notes. Confidence is HIGH unless marked (MED)/(LOW). §-numbers are the master numbering: §0 → SKILL.md · §1 title-craft.md · §2–3 body-microcopy.md · §4 speaker-notes.md · §5 registers.md · §6 translation-procedure.md · §7 + appendix fact-fidelity-qa.md · §8–10 this file. Letter codes (G/H/B/C/D/F) point to presentation-structure references; "design §n" to presentation-design references.

## 8. COPY ANTI-PATTERN BLACKLIST

Format: **Tell — WHY — DETECT → FIX.** Design §7 owns visual tells; these are the text-layer tells. The root cause is the same: regression to the training median — vague where meaning should be specific, uniform where importance should vary, certain where evidence is bounded.

### A. Vocabulary

1. **Hype-vocabulary tokens** — unfalsifiable intensity claims; documented expert "fluff immunity"; also the highest-frequency LLM-copy markers (double damage) — DETECT: revolutionary, game-changing, disruptive, cutting-edge, next-generation, seamless(ly), effortless, blazing-fast, robust, powerful, best-in-class, world-class, unqualified enterprise-grade, leverage-as-verb, empower, unlock, supercharge, incidental "AI-powered" → FIX: replace each with its evidence or delete the claim [MP §6.2].
2. **Buzzword substitution** — a named mechanism swapped for a hype synonym changes the fact AND burns ethos — DETECT: hype token where the source names a mechanism → FIX: restore the mechanism name + one measured outcome [TT §8.1].
3. **Vague quantifiers** — unfalsifiable, a different magnitude per listener — DETECT: significant(ly), substantial(ly), several, many, considerable, meaningful, dramatically, massively → FIX: the number (routed per title-craft §1.5) [HC §6.1].
4. **Intensifier carpet** — emphasis inflation, the text twin of accent overuse — DETECT: >1–2 intensifiers per deck; ANY intensifier attached to a number (the number IS the intensity) → FIX: delete; let magnitudes carry emphasis [TT §8.12].
5. **Weasel attribution** — an unsupported claim in a source costume — DETECT: "studies show", "industry-leading", "widely recognized" with no named source → FIX: name it or cut it [TT §8.10].
6. **Superlative without scope** — invites live falsification, poisoning every other claim — DETECT: only/first/largest/best without scope + date + source → FIX: add the verifiable scope or delete [TT §7.4].

### B. Fake certainty & fact drift

7. **Certainty inflation** — an epistemic hedge stripped in compression; speculation ships as fact — DETECT: source has may/should/pilot/conditions, copy doesn't; "guarantees/ensures/eliminates" anywhere → FIX: restore as a bounded range or step the verb down [TT §8.2].
8. **Feature-verb inflation** — DETECT: modal in source ("supports", "can") rendered indicative ("does", "automatically") → FIX: verb-ladder audit [TT §8.7].
9. **Naked relative delta** — numerator-only persuasion — DETECT: %, ratio, or Nx with no base/comparator on the slide or in notes → FIX: attach base + comparator; prefer the absolute pair [TT §8.3].
10. **Threshold rounding / false precision** — DETECT: rounded values near 100%, SLA bounds, compliance limits; decimals with small n → FIX: exact at thresholds; conservative direction; precision ≤ measurement [TT §8.4].
11. **Scope-qualifier amputation** — the claim silently generalizes — DETECT: the source sentence has a conditional clause, the slide doesn't → FIX: qualifier in subtitle/label type or source line, first-level never buried [TT §8.5].
12. **Aggregation swap** — DETECT: p95→"typically", median→"average", peak→"sustained" → FIX: keep the term of art, gloss it [TT §8.6].
13. **Roadmap present tense** — unreleased capability as shipped — DETECT: claims sourced to roadmap/RFC/design docs in present tense → FIX: future tense + date, or cut [TT §8.8].
14. **Benefit invention** — a so-what rung with no assumption chain — DETECT: outcome claims with no traceable chain to a source fact → FIX: insert the assumption or descend a rung [TT §8.9].
15. **Jargon mistranslation** — a term of art replaced by a stronger plain gloss — DETECT: security/availability/compliance terms paraphrased → FIX: term + gloss pattern [TT §8.11].
16. **Fake damaging admission** — a humble-brag posing as candor burns more trust than silence — DETECT: "admissions" that are compliments in disguise → FIX: a real, costly, bounded drawback or nothing [MP §6.4].
17. **Hedged ask** — commitment hedges on recommendations read as unowned — DETECT: consider/explore/potentially in a CTA or recommendation title → FIX: verb + magnitude + deadline + owner; hedge the evidence instead (structure rule 15 + translation-procedure §6.4).

### C. Rhythm & template uniformity

18. **Uniform bullet rhythm** — identical lengths assert equal importance (almost never true) and are the single most reliable machine-text tell — DETECT: per-slide word-count CV <0.2; every bullet verb-first same tense → FIX: vary length with importance; promote the key item to the title; delete one bullet from every four [MC §6; design Tells-C3].
19. **Uniform title template** — DETECT: >80% of titles matching one syntactic pattern; lengths within ±1 word → FIX: vary form BY FUNCTION per title-craft §1.7 [HC §10.12].
20. **Kicker/title echo** — DETECT: kicker repeats a title word → FIX: kicker names the category, title carries the claim [MC §5.8].
21. **Duplicated phrases across the copy stack** — redundancy cost with zero information — DETECT: pairwise-distinctness scan (fact-fidelity-qa §7.2-17) → FIX: delete the lower element or give it its real job [MC §1].
22. **Generic benefit appendage** — "…to save time and money" mechanically appended — DETECT: identical benefit clause on multiple features → FIX: anchor in the audience's named workflow/metric or cut [MP §3.3].
23. **Anaphora on the canvas** — repeated openers are delivery rhetoric, machine-looking as visible bullets — DETECT: same first word on ≥3 sibling items → FIX: move the rhythm to the talk track (MED) [MC §6.6].

### D. Register & tone

24. **Title-case/ALL-CAPS shouting** — casing a claim as a label undercuts the assertion doctrine; caps lose word shape — DETECT: Title Case Everywhere; caps outside the single kicker role → FIX: sentence case deck-wide (body-microcopy §3.7) [MC §10; design Tells-C5].
25. **Throat-clearing openers** — spend the verdict slot on nothing — DETECT: "In order to", "It is important to note", "As shown", "Note that", "Based on our analysis" → FIX: delete; verdict first [HC §5.1; MC §4.5].
26. **Nominalization clusters** — buried verbs hide the actor and the energy — DETECT: "-tion of", "-ment of", "resulted in", "led to the [noun]" → FIX: un-bury the verb [HC §5.5].
27. **Register collision** — hype on an architecture slide, protocol names on a marketing hero; "mechanism + hype benefit" reads worst of all — DETECT: registers §5.2 dial mismatch scan → FIX: re-render at the register's rung [MP §6.1/§11.10].
28. **Vendor-subject headlines** — the deck talks about itself — DETECT: vendor/product as grammatical subject of the payload on non-mechanism slides → FIX: audience outcome as payload, vendor as agent [MP §1.1].
29. **Filler quotes** — praise without a specific is negative proof — DETECT: quotes with no number/specific, or unattributed → FIX: body-microcopy §2.4 quote craft [MP §7.3].
30. **Empty category padding** — DETECT: "the process of", "in order to", "solution for" → FIX: cut; the word budget is spent on numbers, units, qualifiers first [TT §1.5].

## 9. CONFLICTS RESOLVED (by rule, never averaged)

| # | Conflict | Positions | Resolution |
|---|---|---|---|
| 1 | Title length | Alley ≤2 lines · Slideworks ≤15 words · design ≤10 presented | ≤2 lines is the invariant; words derived per mode: presented 6–10 (≤12), read ≤15, statement ≤6 [HC §8; MC §2.5] |
| 2 | Doumont redundancy vs Mayer redundancy (G3) | encode message in multiple channels vs on-slide text duplicating speech hurts (d≈0.86) | Message-redundant, wording-divergent: same message in different encodings; never the same words in two verbal channels. Title asserts, chart evidences, speaker elaborates [TT §2] |
| 3 | "No hedging" (structure rule 15) vs hedging honesty | recommendations must commit vs evidence must stay bounded | Different objects: COMMITMENT hedges banned, EPISTEMIC hedges protected. Committed ask on qualified evidence [TT §6.5; MP §10.4] |
| 4 | Precise vs round numbers (3 lanes) | precision = credibility (Caples; negotiation research) vs round = glanceable (design ≤3 sig figs) vs round = motivational (OBHDP 2016) | Route by job: chart display rounds (under threshold/claim-strength/reversibility tests, conservative direction); titles round by default; the ONE credibility-bearing claim number keeps source precision (≤1/slide); motivational round-gloss only atop a visible exact figure; exact-in-title when number-credibility is the live objection (MED — consumer-context transfer) [HC §6.3; MP §2.1; TT §5.6] |
| 5 | Active voice vs front-loading | BLUF/McKinsey always-active vs NNg passive-redemption | Default active; invert only when the news-noun must lead [HC §5.4] |
| 6 | Question titles | engagement research pro vs BLUF/Betteridge anti | By stance and slot: verdict default; questions only at answered pivots/discovery decks; never on evidence slides; 0 exec [HC §7.2] |
| 7 | Benefits-first (Ogilvy/Caples) vs mechanism-first (developer marketing) | who states the benefit | Register split: marketing writer states benefit (feature = proof); presales writer states mechanism (reader derives benefit, stated once quantified); exec writer states outcome (mechanism → appendix). Never "mechanism + hype benefit" [MP §6.1] |
| 8 | Curiosity headlines vs assertion-always (G1) | Caples curiosity class + H6 hooks vs answer-first | Assertion default; curiosity only at outline-designated hook beats, specific-but-incomplete wording, ≤2/deck, marketing register, never exec [MP §1.4] |
| 9 | Parallelism | writing guides: keep items parallel vs AI-tell: uniform bullets read machine-made | Different axes: parallel grammatical FORM yes, uniform LENGTH no; length tracks information content; one deliberate break/deck = emphasis [MC §6; HC §12.5] |
| 10 | Notes: cues vs script | coaches keywords-only vs Duarte/AE full prose | Split by consumer & phase: the pipeline emits an ear-register script + cue skeleton; the presenter compresses across rehearsals [MC §8.1] |
| 11 | First-person CTA (+~90% button tests) vs verb+owner+deadline asks | | Medium split: first-person grammar only for clickable/QR contexts; spoken decks use audience-verb + date + owner [MP §8.3] |
| 12 | Klement job stories vs Ulwick outcome statements | theoretical feud | Devices compatible: job stories at problem beats, outcome statements at value beats [MP §5.2] |
| 13 | Damaging admission vs "never volunteer negatives" folklore | | Admission wins for skeptical/technical audiences (Jensen, Hoffman D3, F4 steelman) — but it must be real and costly; fake admissions burn worse than silence [MP §6.4] |
| 14 | Plain language vs terms of art | simplify vs precision | Simplify syntax, never substance: plain structure around precise terminology; gloss beside, never replace in contestable claims [TT §1.2/§4.5] |
| 15 | Captions on every image (journalism) vs minimal on-canvas text (Mayer) | | Mode split: captions for read decks + provenance-bearing evidence only; presented decks mostly none [MC §3.4] |
| 16 | Where the claim sits (slide title vs chart-internal takeaway) | | Same principle, one instance: whichever container is the unit of consumption carries the claim; the other slot goes descriptive [MC §2.4] |
| 17 | "Hedging harms credibility" (coaching folklore) vs Jensen 2008/2011 | | Different objects: filler + hedged recommendations harm; attributed bounded technical limitations help. Hedge the evidence, never the ask [MP §10.4; TT §6] |
| 18 | NNg prose rules (15–20-word sentences, paragraphs) vs slide-copy fragments | | Register-of-artifact split: NNg prose rules govern the READ artifacts (slidedoc pages, notes, handouts); presented-slide copy is stricter (fragments + assertion titles per G1/G2) [TT conflict 6] |
| 19 | Sales culture "always push titles to action altitude" vs vertical honesty (Minto/Tufte) | | The ladder stops at the rung the evidence proves; action altitude only on recommendation slides whose evidence pays for it [HC §12.6] |

## 10. SOURCES INDEX

Full per-claim citations live in the four lane files (workspace research); this index is the deck-level map with confidence grades.

**Canonical craft (HIGH):**
- Michael Alley — assertion-evidence.com; Alley & Neeley 2005; *Craft of Scientific Presentations* (2005 PDF unparsed; rules verified via Northeastern/Khoury summaries, MED-HIGH). Recall evidence upstream (structure G1).
- Barbara Minto, *The Pyramid Principle* — blank-assertion + two-summary-types quotes verified (StrategyU; barbaraminto.com).
- Jean-luc Doumont, *Trees, Maps, and Theorems* — three laws via agreeing secondaries (MED-HIGH; primary unfetched).
- John Caples, *Tested Advertising Methods*; David Ogilvy (readership multipliers MED); Claude Hopkins, *Scientific Advertising* (Schlitz case HIGH, figures MED); Joseph Sugarman, *Adweek Copywriting Handbook* (secondary-sourced).
- Geoffrey Moore positioning template; message-house corpus (MED-HIGH).
- AR 25-50 (BLUF); Federal Plain Language Guidelines; Google developer documentation style guide.

**Research findings (graded):**
- NN/g: first-2-words, headings-as-microcontent, passive-redemption, plain-language-for-experts, technical-jargon decision tree, text-scanning eyetracking (all fetched, HIGH).
- Jensen 2008 *HCR* 34:347–369 + Jensen et al. 2011 (hedging increases trustworthiness — HIGH; an inverted small-model PDF summary was caught and discarded); Gustafson & Rice 2020 typology (MED).
- van der Bles et al., PNAS 2020 (numeric ranges preserve trust; vague verbal hedges destroy it — HIGH).
- Boutron et al., JAMA 2010 spin taxonomy + clinician-impact RCT PMC5736039 (HIGH).
- Denes-Raj & Epstein 1994; Reyna & Brainerd 2008 (denominator neglect — HIGH); frequency-format studies (MED).
- Oppenheimer 2006 (buzzword credibility cost — HIGH); Hyland 1996/1998 (epistemic hedging — HIGH).
- Curiosity-gap concreteness, *Scientific Reports* 2024/2025, ~27K Upworthy tests (HIGH).
- Precision-effect vs round-number literatures (MED — consumer/negotiation context; direction transfers, effect sizes don't).
- Gutman 1982 / Reynolds & Gutman 1988 laddering (MED-HIGH).

**Practitioner corpora (convergent MED-HIGH; individual items MED):**
- Consulting titles: Slideworks (fetched), Deckary, Analyst Academy, High Bridge; slidescience.co blocked (403, via summaries MED); Hustle Fund VC-title guidance ("80% of information" figure MED).
- Developer marketing: Heavybit, daily.dev, Okoone, StrategicNerds ("90%+ distrust" figures LOW, direction HIGH).
- CTA: CXL/Unbounce/Zapier/Campaign Monitor (direction HIGH, magnitudes MED-LOW — vendor A/B tests).
- Micro-copy: Datawrapper (Muth), Poynter/IJNet captions, Economist/FT conventions (secondary, MED), Duarte speaker-notes, W3C WAI + Microsoft a11y, Purdue OWL, speechwriting corpus (CRS, Throughline), sentence-case UX consensus, speaking-rate consensus (130–150 wpm).
- JTBD: Klement (jtbd.info), Ulwick (Strategyn), Google Design Sprint Kit (templates HIGH).

**Lane-file map (for per-claim citations and verbatim source quotes; files live in the research workspace):**
- `assertion-headline-craft.md` [HC] — title construction, Minto phrasing, BLUF/front-loading, title forms, weak-title taxonomy, drafting procedure.
- `marketing-presales-copy.md` [MP] — tested-advertising headline craft, FAB laddering, value prop/JTBD, technical-credibility register, claim–evidence pairing, CTA, register map.
- `technical-translation.md` [TT] — claim-strength invariant, plain language, laddering stop rules, jargon tree, precision tuple, hedging honesty, de-marketing, fidelity QA gate.
- `slide-microcopy-notes.md` [MC] — copy stack, takeaway/title division, captions, annotations, labels/kickers, parallelism, budgets ledger, speaker notes, alt text, casing.

**Known gaps for iteration 2:**
- Alley 2005 primary PDF unparsed (word-count specifics beyond the 2-line rule are secondhand); Doumont primary unfetched; Sugarman secondaries only.
- No deck-specific eyetracking of title parsing (web-heading research transferred, MED); no controlled study of hedge-stripping in business (vs clinical) presentations; no quantitative study of the hype-vocabulary penalty (practitioner consensus only); precision-vs-round literature is consumer-context (MED transfer).
- Gustafson & Rice 2020 typology worth a primary read; Aagaard ContentVerve originals offline.

# Fact-fidelity QA — drift detection, copy gates, lint lists & escalation flags

> Provenance: sliced from the presentation-copywriting master knowledge base — a deduplicated, conflict-resolved synthesis of four research lanes: [HC] assertion-headline-craft, [MP] marketing-presales-copy, [TT] technical-translation, [MC] slide-microcopy-notes. Confidence is HIGH unless marked (MED)/(LOW). §-numbers are the master numbering: §0 → SKILL.md · §1 title-craft.md · §2–3 body-microcopy.md · §4 speaker-notes.md · §5 registers.md · §6 translation-procedure.md · §7 + consolidated appendix this file · §8–10 anti-patterns.md. Letter codes (G/H/B/C/D/F) point to presentation-structure references; "design §n" to presentation-design references.

Run AFTER copy is drafted, BEFORE design/render handoff; **re-run on any copy edit** — tightening is where drift happens [TT §9].

## 7.1 The six-step translation-fidelity gate

1. **Fact diff.** Extract {value, unit, aggregation, denominator, conditions, comparator, date/version, hedge} tuples from the source and from the copy. Every copy tuple must map to a source tuple via a legal transform: verbatim | display-rounding passing the §6.3 tests | stated format conversion | compression with qualifier retained. A copy tuple with no source parent = invention → cut or source it. A source hedge with no copy descendant = certainty inflation → restore.
2. **Verb audit.** List every claim verb; none moved up the certainty ladder; modals preserved or bounded, never dropped.
3. **Denominator audit.** Every %, ratio, multiple has base + comparator visible on the slide or in notes with scent.
4. **Spin sweep.** Boutron's three categories against the deck: primary metric led with; no equivalence from no-difference; no claim broader than tested scope.
5. **Round-trip test.** Could a domain expert reconstruct the original claim's STRENGTH from slide + notes? Stricter: the glanced layer alone must not overstate — a slide that overstates plus a note that corrects still FAILS (glance-mode readers never see notes). Honesty lives at the highest-compression layer; detail may add precision but never reverse direction.
6. **Audience re-check.** Jargon two-question test rerun against the actual room; ladder altitude matches the register overlay.

## 7.2 Copy-quality gates (run alongside; mechanical where possible) [MP §11; MC §12; HC §11]

7. **Payload test**: per headline — is the grammatical payload the audience's outcome? Does the title contain the so-what?
8. **Orphaned-adjective sweep**: every evaluative adjective/adverb maps to a fact-bank item or dies.
9. **Hype blacklist** (anti-patterns §8-A): zero hits presales/exec; ≤1 marketing.
10. **Rung check**: one benefit altitude per slide; deck altitude matches the registers §5.2 map.
11. **Hedge audit**: claims unhedged or bounded-attributed; recommendations never hedged; ≥1 limitations line on any presales benchmark slide.
12. **Adjacency check**: claim and proof co-located; one proof per claim.
13. **Vocabulary consistency**: one category noun; signature terms identical across title/dividers/close; product name in one form.
14. **CTA check**: verb-first, next-24h concrete, dated, owner named, verbatim-repeated at re-close; verb friction matches stance.
15. **Register-collision scan**: marketing vocabulary on presales slides and vice versa.
16. **One claim-bearing element per slide**; it has a verb and passes falsifiability.
17. **Pairwise distinctness**: kicker/title/subtitle/annotation/caption/alt/one-liner share no repeated phrase.
18. **Budgets ledger** (body-microcopy §3.8) respected; overflow → cut/split flags, never shrink.
19. **Parallel lists**: same grammatical form; length variance present (word-count CV ≥0.2); ≤1 deliberate break per deck.
20. **Casing/numerals**: sentence case everywhere; single caps kicker; digits.
21. **Notes**: one-liner (8–16 words) + ear-register track + verbatim transition + bracketed directions + backup; no canvas text repeated; words ÷ 130–150 ≈ dwell budget; one-liners read as a coherent spoken argument end-to-end.
22. **Alt text**: present or decorative-marked everywhere; chart alt = form + subject + takeaway; unique slide titles; meaningful link text.
23. **Titles deck pass**: read-aloud coherence; 3-title out-of-context spot check; template-uniformity + vague-quantifier lint.
24. **Stranger paraphrase test**: a cold reader restates each headline in their own words without loss — else rewrite.

## 7.3 Automation notes (for the skill implementation)

Mechanically lintable with no judgment: vague-quantifier list (below), hype-token list (below), intensifier count (anti-patterns §8-4), throat-clearing openers (§8-25), nominalization patterns (§8-26), finite-verb presence in titles, counting-title pattern (title-craft §1.2), word/line budgets (body-microcopy §3.8), bullet length CV, title-template uniformity (>80% one pattern; length ±1 word), casing, digit usage, denominator presence near %/×-tokens, pairwise phrase duplication across the stack, notes word-count ÷ wpm vs dwell budget, alt-text presence, unique slide titles, CTA verbatim-repeat.

Judgment-required (flag, don't auto-fix): fact diff against source tuples (§7.1-1), verb-ladder movement, rung/altitude checks, spin sweep, falsifiability, out-of-context readability, register collision, admission authenticity. The report format mirrors design §9: findings by severity, each citing the failed check; fixes applied only where a check names the defect.

---

## CONSOLIDATED LINT LISTS & LADDERS (quick reference for the generator) [master appendix]

**Vague-quantifier lint list** (each hit needs a number or a justified qualitative exemption): significant(ly), substantial(ly), several, many, considerable, meaningful, dramatically, massively, "up to X" doing heavy lifting, roughly (unbounded), some, most (unquantified), numerous, vast.

**Hype-vocabulary blacklist** (zero presales/exec; ≤1 deliberate marketing): revolutionary, game-changing, disruptive, cutting-edge, next-generation, seamless(ly), effortless, blazing-fast, robust, powerful, best-in-class, world-class, enterprise-grade (unqualified), military-grade, leverage (verb), empower, unlock, supercharge, AI-powered (incidental), state-of-the-art, industry-leading.

**Throat-clearing / dead-opener list** (delete on sight): "In order to", "It is important to note (that)", "As shown", "As we can see", "Based on our analysis", "Note that", "It could (perhaps) be argued that", "It should be noted that", "The process of", "solution for".

**Nominalization detect patterns** (un-bury the verb): "-tion of", "-ment of", "-ance of", "resulted in", "led to the [noun]", "provide a reduction in", "perform an evaluation of", "conduct an analysis of".

**Certainty ladder** (translation may move DOWN, never UP): might → can → should → does (measured) → will → guaranteed. Modal in source rendered indicative in copy = violation.

**Abstraction ladder** (climb with "so what?", descend with "how, specifically?"): implementation detail → feature/attribute → functional benefit → business outcome → strategic/emotional value. Stop rules: evidence ceiling · decision altitude · emotional rung off-slide (technical decks) · title one rung above on-slide evidence.

**Invariant tuple** (must survive every rendering): {value, unit, aggregation, denominator/baseline, conditions/scope, comparator, date/version, hedge}.

**Rounding tests** (all three must pass for display rounding): no threshold crossed · rounded number supports no stronger claim (benefits round DOWN, costs UP) · exact figure reachable via notes/appendix scent.

**Hedge triage**: epistemic (conditions/limits/probability) → keep, may formalize to a range · throat-clearing → cut · vague ("some uncertainty remains") → convert to bounded numeric form. Hedge the evidence, never the ask.

**Title budgets**: presented 6–10 words (≤12 hard) · read ≤15 · statement ≤6 · always ≤2 lines, break at phrase boundary, sentence case, no terminal period, finite verb, first 2–3 words = entity + direction.

**Micro budgets**: kicker 1–3 words no verb · subtitle 1 line (measure/units/scope) · annotation ≤10 words with number/cause, ≤2/chart · caption ≤2 sentences · alt 1–2 sentences (form + subject + takeaway) · notes one-liner 8–16 words · talk track ≈130–150 words/minute of dwell.

**Register one-liners**: exec = decision + quantified so-what, hedge estimates never the ask, zero hype · presales = mechanism + measured result + attributed bounds, reader derives the benefit, zero hype · marketing = benefit with one exact number and one proof anchor, ≤1 hype token, ≤2 curiosity titles.

**Deck-level passes**: titles-only read-aloud (coherent argument, no spoken connectives) · one-liners read-aloud (coherent 60–90s spoken version) · vocabulary sheet (one category noun, signature terms verbatim) · CTA verbatim at re-close · template-uniformity lint · fact diff re-run after every edit.

**Escalation flags this skill may raise (and never resolves itself)**:

- `SPLIT_SLIDE` — two finite verbs with independent so-whats in one title (structure owns splits).
- `GROUPING_INVALID` — no statable insight or joint effect for a grouped section (Minto, title-craft §1.2).
- `TITLE_BODY_MISMATCH` — title topic not provable from the body spec (outline bug).
- `EVIDENCE_GAP` — the beat's intended rung exceeds what the fact bank pays for (needs new evidence or a lower rung, owner decision).
- `MISSING_SLIDE` — titles-only read-aloud requires a spoken connective (a link in the argument has no slide).
- `BUDGET_OVERFLOW` — copy cannot fit the design budget without semantic loss (design owns split/cut).
- `FACT_UNSOURCED` — a claim needed by the outline has no fact-bank parent (fact-owner verification required).

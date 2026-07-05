# Technical-to-audience translation — the fact-safe wording transformation

> Provenance: sliced from the presentation-copywriting master knowledge base — a deduplicated, conflict-resolved synthesis of four research lanes: [HC] assertion-headline-craft, [MP] marketing-presales-copy, [TT] technical-translation, [MC] slide-microcopy-notes. Confidence is HIGH unless marked (MED)/(LOW). §-numbers are the master numbering: §0 → SKILL.md · §1 title-craft.md · §2–3 body-microcopy.md · §4 speaker-notes.md · §5 registers.md · §6 this file · §7 + appendix fact-fidelity-qa.md · §8–10 anti-patterns.md. This file also carries the §0.2 compression whitelist/blacklist in full. Letter codes (G/H/B/C/D/F) point to presentation-structure references; "design §n" to presentation-design references.

This is the wording transformation from source docs (specs, benchmarks, architecture docs, release notes) into slide copy, under the claim-strength invariant: a rendered claim may become SHORTER, PLAINER, HIGHER-ALTITUDE — never STRONGER, BROADER, MORE CERTAIN [TT §0]. There are exactly two legal move classes (whitelisted compression, and rung changes that carry their assumptions); a third — inventing, strengthening, or generalizing — is fabrication with extra steps.

## 6.0 The compression whitelist & blacklist [master §0.2]

**Compression WHITELIST (fact-safe syntax moves)** [TT §0; plainlanguage.gov]:
- Un-bury nominalizations into verbs (the verb carries the action; the nominalization adds words and hides the actor).
- Cut throat-clearing and politeness hedges (zero epistemic content).
- Activate voice, present tense, name the actor — passive hides WHO acts, often the load-bearing fact.
- Front-load: the first 2 words carry the meaning (scanning readers).
- Prose → number + label; sentence → verb phrase; keep the qualifier, drop the padding.
- Format conversion WITH statement: % ↔ natural frequency, table ↔ chart (form choice is design's).

**Compression BLACKLIST (semantic moves disguised as compression)** [TT §0]:
- Paraphrasing a term of art (§6.2) · rounding across thresholds (§6.3) · deleting epistemic hedges (§6.4) · renaming aggregation types · dropping denominators, baselines, or scope qualifiers · upgrading claim verbs up the certainty ladder.

Slogan: **compress the syntax, never the semantics.** Every quantitative claim is an invariant tuple {value, unit, aggregation, denominator/baseline, conditions/scope, comparator, date/version, hedge} that must survive verbatim in meaning — on the slide, or in notes/appendix with scent, with meaning-changing caveats staying at FIRST level (Tufte/Columbia; structure G5) [TT §5].

## 6.1 Abstraction laddering — climb with "so what?", descend with "how, specifically?" [TT §3]

Technical ladder: implementation detail → feature → functional benefit → business outcome → strategic/emotional value (means-end chain, Gutman 1982). **Every rung up adds an assumption; fact drift lives at rung boundaries** — state a climbed claim as a conditional carrying its assumption, or verify the assumption with the fact owner so it enters the fact bank. Four stop rules:

- **A — evidence ceiling**: stop at the highest rung the evidence still pays for; above it is Boutron category-3 spin. The rung you can defend under one hostile "how do you know?" is the rung the slide states.
- **B — decision altitude**: stop where THIS audience's decision lives (exec = outcome; technical evaluator = functional benefit + mechanism; peer = mechanism). Climbing past it reads as marketing; stopping below it fails the so-what test.
- **C — the emotional rung stays off-slide in technical decks** (speaker's channel; sequence, don't blend — structure H7). The marketing overlay may put it on-slide with one proof anchor.
- **D — title altitude**: the title sits exactly ONE rung above its on-slide evidence; a 2-rung gap cannot be verified by looking → insert the middle rung or lower the title.

Ladder DOWN freely: every abstract claim gets one concrete instantiation (photographable test, structure H2) — adding a true concrete example never inflates a claim.

## 6.2 Jargon: keep / define / replace [TT §4]

NNg two-question test — how many of THIS audience know the term × how important is it here:

| Familiarity | Importance | Action |
|---|---|---|
| Most/all know it | any | use bare — explaining a known term signals the deck wasn't written for them |
| Few know it | low | replace with plain language |
| Few know it | high | keep + explain in context (contextual explanation beats textbook definition) |

- **Pairing order encodes the audience**: unfamiliar-majority → plain term first, term-of-art in parentheses; familiar-majority → reversed. On slides the gloss goes in label/micro type or notes, never inflating the headline.
- **Terms of art may be GLOSSED but never REPLACED in a contestable claim** — the plain paraphrase is a different (usually stronger, vaguer) claim; replacing it is fact drift (WordRake; plainlanguage.gov).
- Acronyms expanded at first use AND at section starts (nonlinear consumption). No glossary walls — define at point of use, full glossary to appendix with scent.
- Writers cannot self-judge familiarity (curse of knowledge): decide for the least-expert person with decision power; gloss for the rest.
- **Plain language is for experts too** (NNg "Plain Language Is for Everyone, Even Experts"): highly educated readers crave succinct, scannable copy like everyone else — expertise adds vocabulary, not working memory or reading time. Plain = simplify SYNTAX (10–12th-grade structure for experts vs 6–8th general), preserve precision — the precise term stays when the room knows it; the verbose gloss would be the noise. Never justify dense slide copy by "the audience is technical" — density tolerance changes (design §8.2 allows +1 step), syntax-complexity tolerance does not.
- **Word-choice rules for the budgeted canvas** (plainlanguage.gov): familiar > far-fetched, concrete > abstract, single word > circumlocution, short > long. Each unfamiliar or padded word taxes the single verbal channel the audience is also using to LISTEN. Spend the word budget on numbers, units, and qualifiers first; connective tissue is what gets cut.

## 6.3 Precision preservation [TT §5]

- **The invariant tuple survives** (§6.0) — on the slide or in notes/appendix with scent; meaning-changing caveats at first level.
- **Numbers keep their conditions**: a benchmark figure without payload/hardware/concurrency is a stronger claim than the benchmark made.
- **Never ship a naked relative delta**: denominator neglect makes audiences over-weight numerators (Denes-Raj & Epstein 1994; Reyna & Brainerd 2008); every %, ratio, and "Nx" carries base + comparator; the absolute before→after pair is often MORE persuasive and always more honest.
- **Aggregation names are facts**: median ≠ mean ≠ p95 ≠ max; "typically" for a tail statistic is drift. Keep the term, gloss it if needed.
- **Rounding tests** (bounding design's ≤3-sig-fig display rule): (a) *threshold* — never round across a decision/contract/compliance line; (b) *claim-strength* — if the rounded number supports a stronger claim, keep exact; when rounding, benefits DOWN, costs UP (the direction that survives an audit); (c) *reversibility* — the exact figure lives in notes/appendix with scent. False precision is the mirror crime: decimals beyond measurement resolution.
- **% vs natural frequency**: pick by magnitude — small probabilities are underweighted as percentages and perceived more accurately as absolute frequencies (health-communication format studies, MED transfer). Then hold the format AND the denominator constant deck-wide for comparable quantities: a "1 in x" series with varying x defeats comparison. Format conversion is a whitelisted move only when stated (§6.0).
- **Rescaling is a wording-time move**: deltas, multiples, and shares over raw values; unfamiliar units paired with a known anchor — pre-compute the comparison for the one-fixation reader, never leave it as audience arithmetic (Duarte via structure H2/G6) [HC §6.4].

## 6.4 Hedging honesty [TT §6]

- **Hedges are epistemic content, not style** (Hyland 1998). Triage: (a) EPISTEMIC hedges (probability, conditions, limitations) must survive — may be compressed or formalized into bounded numeric form; (b) THROAT-CLEARING → cut freely; (c) VAGUE uncertainty → convert to a bounded range.
- **The precise hedge is both the honest and the persuasive form**: numeric ranges barely affect trust; vague verbal uncertainty destroys it (van der Bles et al., PNAS 2020 + BBC field experiment). A range is one visual token — the hedge costs no word budget.
- **The verb is the certainty dial**: might → can → should → does (measured) → will → guaranteed. Translation may move a claim DOWN this ladder, never UP. "Supports X" ≠ "does X automatically".
- **Reconciliation with upstream rule 15** (anti-patterns conflict 3): commitment hedges banned (the ask commits); epistemic hedges protected (the evidence qualifies). The correct pairing is a committed recommendation standing on honestly-bounded evidence. Stripping the evidence hedge to make the ask look safer is the exact failure both rules exist to prevent.
- **Boutron spin taxonomy = the audit frame** (JAMA 2010): (1) selective reporting — leading with a favorable secondary metric; (2) inappropriate interpretation — success from ambiguous results, equivalence from absence of difference; (3) inappropriate extrapolation — generalizing past tested scope. Experts do NOT auto-correct spin (clinician RCT, PMC5736039) — expert audiences protect against jargon failure, not overstatement.

## 6.5 De-marketing [TT §7]

- Register for technical evidence: "educate, not persuade" (Google dev-style guide). Deck-level persuasion is carried by STRUCTURE (upstream); the sentence level stays evidential. Persuasive architecture + neutral sentences beats neutral architecture + hyped sentences.
- **Buzzwords are negative calories**: needless complexity lowers judged author competence (Oppenheimer 2006).
- **Adjective-substitution procedure**: for each intensifier/superlative, (a) find the evidence and state the measurement, or (b) delete the CLAIM, not just the adjective — softening is the same unsupported claim at lower volume.
- Superlatives survive only with verifiable scope + date + source; weasel attributions ("studies show", "industry-leading") name the source or die; "simple/easy/just" is judged by the USER's experience — show the step count instead.

## 6.6 Doumont's three laws rank-order every copy decision [TT §2]

(1) Adapt to the audience — nothing is well written, only well read; (2) maximize signal-to-noise — for every word ask "does this change what the audience will DO or BELIEVE?", no → cut; (3) effective redundancy — same MESSAGE through multiple encodings (title asserts, chart evidences, speaker elaborates), never the same WORDS in two verbal channels (Mayer reconciliation, anti-patterns conflict 2). Doumont's slide rule is an independent third derivation of assertion-evidence — convergence cited; the doctrine lives upstream (G1).

## 6.7 The translation procedure (per fact, per slide)

1. Pull the source tuple from the fact bank; confirm hedge and scope as written.
2. Choose the rung via stop rules A–D for the slide's register (registers §5.2).
3. If climbing: attach the assumption as a conditional, or verify it into the fact bank.
4. Apply the compression whitelist only (§6.0); route displaced tuple elements to subtitle (body-microcopy §2.2), label type, or notes backup (speaker-notes §4.2-5) with scent.
5. Jargon pass (§6.2); precision pass (§6.3); hedge triage (§6.4); de-marketing sweep (§6.5).
6. Emit; the fact-fidelity §7 gate diffs the result against the source.

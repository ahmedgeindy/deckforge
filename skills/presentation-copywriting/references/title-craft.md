# Title craft — assertion titles that carry the argument

> Provenance: sliced from the presentation-copywriting master knowledge base — a deduplicated, conflict-resolved synthesis of four research lanes: [HC] assertion-headline-craft, [MP] marketing-presales-copy, [TT] technical-translation, [MC] slide-microcopy-notes. Confidence is HIGH unless marked (MED)/(LOW). §-numbers are the master numbering: §0 → SKILL.md · §1 this file · §2–3 body-microcopy.md · §4 speaker-notes.md · §5 registers.md · §6 translation-procedure.md · §7 + appendix fact-fidelity-qa.md · §8–10 anti-patterns.md. Letter codes (G/H/B/C/D/F) point to presentation-structure references; "design §n" to presentation-design references.

Division of labor: upstream G1 (structure) owns the assertion-title CONCEPT and the recall evidence (23%→57%, Alley et al. 2006); design §3 owns rendering (largest text, ≤2 lines, top-left, phrase-boundary wrap). This file owns the words.

## 1.1 Sentence-construction rules (Alley)

- **Write a full sentence with a finite verb, making one assertion.** Phrase headlines force the audience to derive the takeaway themselves; a sentence is the slide's topic sentence and carries the recall gain (Alley & Neeley 2005; assertion-evidence.com) [HC §2.1].
- **≤2 lines; break line 1 at a natural phrase boundary** — emit an explicit break-point hint in the spec; the renderer honors it [HC §2.2].
- **Sentence case, no terminal period.** Question marks stay only on genuine question-form titles (Alley verbatim rule) [HC §2.3; casing rationale in body-microcopy §3.7].
- **Assert, don't tease**: state the finding, not the topic of the finding. Test: could someone who sees ONLY the title state the slide's conclusion? [HC §2.5]

## 1.2 Minto phrasing rules

- **Ban intellectually blank counting titles** ("[number] [reasons/factors/steps]…" — auto-reject). A summary states the group's insight (situation groupings) or the joint effect of the grouped actions — the only two legal summary types (Minto, verified quotes) [HC §3.1–3.2].
- **The governing thought must be NEW information answering the audience's one question**; intro wording reminds, the apex informs [HC §3.3].
- **Each title raises exactly one next question** (Why? / How?) that the level below answers; two-claim titles fork the dialogue → split (escalate `SPLIT_SLIDE`) [HC §3.5].
- **Essence only**: after drafting, delete words until deletion changes meaning [HC §3.4].

## 1.3 The so-what ladder (consulting action titles)

Draft the observation, ask "so what?" until the sentence states an implication at the audience's decision altitude, then STOP one rung before exceeding what the evidence proves. Rungs: raw observation → comparison/insight → implication → action (MED for the 4-rung formulation; components HIGH: Slideworks, Minto vertical logic) [HC §4.2]. Evidence slides usually stop at insight/implication; recommendation slides at action. Full ladder mechanics + stop rules in translation-procedure §6.1 — the title sits exactly ONE rung above its on-slide evidence [TT §3.5].

- **Insightful = falsifiable and non-obvious.** Negate the title; if the negation is absurd, the title is empty (Slideworks) [HC §4.3].
- **Vertical logic constrains every word**: numbers match the exhibit exactly; qualifiers ("main", "fastest-growing") have visible support; causal verbs only where causality is shown, else association verbs. One unsupported word teaches the room to audit every subsequent title [HC §4.5].
- **Horizontal logic lives in the wording**: titles read in sequence must form a prose argument via given-new chaining; a "but"-beat title carries its tension word; anywhere the read-aloud needs a spoken connective, a title is misworded or a slide is missing (escalate `MISSING_SLIDE`) [HC §4.4].

## 1.4 Front-loading mechanics (BLUF / NNg)

- **Verdict in the first clause**; subordinate clauses trail, never lead. Ban openers of the "In order to… / As shown… / Based on our analysis… / It is important to note…" class (AR 25-50; Animalz) [HC §5.1].
- **First 2–3 words (~11 chars) must carry topic AND direction** — mask everything after word 3; if the meaning dies, reorder (NNg "First 2 Words") [HC §5.2].
- **Titles must work out of context** — forwarded decks, mid-deck opens, screenshots: every title is quoted alone in exec skim mode (NNg "Headings Are Pick-Up Lines") [HC §5.3].
- **Choose voice by which noun must lead**: default active; invert/passivize ONLY when the news is the object, not the actor (NNg passive-redemption vs BLUF — resolved, not averaged; see anti-patterns conflict 5) [HC §5.4].
- **Nominalizations banned**: un-bury -tion/-ment/-ance nouns into main verbs; detect "-tion of", "resulted in", "led to the [noun]" (plain-language doctrine, convergent) [HC §5.5].
- **Active voice, concrete verbs of motion, present tense by default**; future only with a basis [HC §4.6].

## 1.5 Quantified specificity in titles

- **Numbers over vague quantifiers, always** — lint for significant/substantial/several/many/considerable/meaningful; each hit needs a figure or a justified qualitative exemption (Tufte via design §3) [HC §6.1].
- **Recommendation titles require {verb + object + magnitude + horizon}**; missing elements are QA findings [HC §6.2].
- **Precision routing** (three-lane conflict, resolved once — anti-patterns conflict 4): titles round to ≤2–3 significant figures (glance processing); the source-precise figure lives in body/notes. Exceptions that put the exact figure in the title: (a) the credibility of the number IS the live objection (diligence, skeptical CFO); (b) the number is the claim's persuasive payload and the register is presales/evidential (Caples: exact reads as measured) — then ≤1 exact number per slide [HC §6.3; MP §2.1; TT §5.6].
- **Rescale to human terms**: pre-computed deltas, multiples, shares; pair unfamiliar units with a known anchor — do the comparison FOR the one-fixation reader (Duarte via structure H2/G6) [HC §6.4].

## 1.6 Headline payload (tested-advertising layer)

- **Lead with the audience's self-interest**: the grammatical payload names what THEY get or avoid; the vendor appears as agent, not subject (Caples' keyed tests: self-interest > news > curiosity) [MP §1.1].
- **The benefit/so-what goes IN the title**, not the body — skim readers read only the title layer (Ogilvy; magnitudes MED, direction HIGH) [MP §1.2].
- **News framing needs a date/version anchor**; a stale "introducing…" on a mature capability is a trust breaker [MP §1.3].
- **Clarity over cleverness**: no puns or idioms needing a re-read; clever only when the literal meaning works alone (Ogilvy; the copy twin of the glance test) [MP §1.6].

## 1.7 Title forms — when each [HC §7]

| Form | When | Budget |
|---|---|---|
| Verdict sentence | DEFAULT — every evidence, comparison, recommendation, summary slide | ~80%+ of content slides |
| Question | Genuinely open questions the NEXT slide(s) answer; framing/pivot slides; discovery-led decks. Never on an evidence slide | ≤2/deck; ~0 presales; 0 exec |
| Curiosity/story tease | Outline-designated hook beats only; specific-but-incomplete wording (concrete nouns, one withheld resolution — curvilinear-concreteness finding, *Sci. Reports* 2024) | ≤2/deck, marketing register; never exec [MP §1.4–1.5] |
| Bare number / statement | The number IS the message; context line ≤8 words beneath | within design hero budget (1–2/deck) |
| Topic label | Non-argument slides only: title, agenda, appendix tabs, legal | everywhere else = defect #1 |

Form mix is an anti-tell requirement: >80% of titles in one syntactic template reads machine-made; vary BY FUNCTION, not randomly (design §7 Tells-C4) [HC §7.5].

**Question-form sub-rules** [HC §7.2]: (a) the very next slide(s) must answer it — an unanswered question title is a broken loop (QA: the loop ledger has a closing slide); (b) legal on framing/agenda/pivot slides and discovery-led decks where the verdict is deliberately delayed (a structure-layer routing decision, F4 — within each slide the title still fronts that slide's local point); (c) direct-address questions outperform abstract ones (persuasion research: self-referencing questions provoke elaboration, MED — web-headline transfer); (d) NEVER on an evidence slide — data under a question reads as evasion. The engagement-vs-BLUF conflict resolves by stance: aligned/impatient → verdict; neutral-curious or delayed-thesis → questions at pivots. Never average into weak hybrids (one-word question titles).

**Curiosity-form wording** (the ≤2 sanctioned hook beats; placement owned by structure H6): specific-but-incomplete — concrete nouns and one withheld resolution; never fully vague (clickbait erodes source trust), never fully resolved (that is a verdict title — use it on body slides). Clickthrough vs concreteness is an inverted U (~27K Upworthy A/B tests, *Sci. Reports* 2024 — HIGH) [MP §1.4].

**Story-form titles** carry curiosity + proof simultaneously: a named actor, an implied transformation, a withheld ending compressed into one line — legal on customer-story section openers in marketing/sales decks; the structure smuggles social proof inside a curiosity gap (Caples' most-famous tested winner) [MP §1.5].

**Bare-number mechanics**: supply the numeral + a ≤8-word context line that makes the magnitude concrete via comparison or equivalence — "do the math for the viewer" applies doubly when the number stands alone [HC §7.3; design §4.1-2].

## 1.8 Length budgets (routed, never averaged) [HC §8; MC §2.5]

The **≤2-line rule is the invariant**; word counts derive from it at render size:

- Presented slide: target 6–10 words, hard ceiling ~12.
- Read/slidedoc mode: up to ~15 words, still ≤2 lines, still front-loaded.
- Statement/divider: ≤6 words (design statement budget).
- Exec-summary bold lead sentences (slide-2 prose, not titles): ~125 chars (BCG practice via structure B4).

Fix over-budget titles by cutting qualifiers and merging numbers — never by shrinking font (design: overflow is structural).

## 1.9 Title-drafting procedure (per slide, then per deck) [HC §11]

1. Write the raw finding as one ugly long sentence.
2. Ladder to the beat's intended rung; stop at evidence altitude (§1.3, §6.1).
3. Falsifiability check + Minto blank-assertion check.
4. Compress: cut throat-clearers, un-bury verbs, replace vague quantifiers with routed numbers.
5. Front-load: words 1–3 = entity + direction; choose voice by which noun leads.
6. Form check against §1.7 budgets.
7. Length check (§1.8); emit the break-point hint.
8. Vertical audit: every noun/verb/number provable from the body spec.

Deck-level:

9. Titles-only read-aloud (coherent argument, ABT alternation, no spoken connectives needed).
10. Out-of-context spot check on 3 random titles.
11. Template-uniformity + vague-quantifier lint across all titles.

Escalation: double claims, grouping failures, title–body mismatches → structure, never wordsmithing.

## 1.10 How executive readers parse titles (the behavior model you design for) [HC §9]

- **Titles-first, linear-ish flip**: senior readers page through reading titles only, sampling a body only when a title surprises, alarms, or contradicts a prior. Consequences: (a) the title sequence must be self-sufficient as an argument; (b) an under-claiming title hides your best work; an over-claiming title triggers the audit that kills deck-level trust (Deckary; convergent consulting practice — MED-HIGH, no deck-specific eyetracking).
- **First fixation = top-left, first words**: F-pattern/layer-cake scanning (NNg via design §2.5). The writer's lever is word ORDER; the designer's is position — both must front-load.
- **Out-of-context consumption is the norm, not the edge case**: decks are forwarded internally (~30% of converting pitch decks, structure D5), opened mid-way, screenshotted into chat. Every title must work with zero narration and zero neighbors — the copywriting-layer justification for full-sentence titles even on "obvious" slides.
- **Interruption is designed-for**: execs interrupt AT the title; a well-worded title invites the RIGHT interruption on the slide built to answer it — word each title so the one question it provokes (§1.2) is the question its body answers.
- **VC variant**: ~1 min for a whole deck; full-sentence titles carry most of the information consumed; generic labels (Problem/Market/Team) are skipped as furniture (Hustle Fund — advice HIGH, quantities MED).

## 1.11 Weak-title taxonomy (detect → fix) [HC §10]

1. **Topic label** — no finite verb → write the finding.
2. **Blank count** — number + plural abstract noun → state the shared insight or joint effect.
3. **Truism** — negation absurd → climb to a contestable rung.
4. **Hedged claim** — could/may/potentially/consider stacks → verbs, numbers, deadlines; if you can't commit, the analysis isn't done.
5. **Process narration** — "we analyzed…" → state what it FOUND; method to kicker/appendix.
6. **Buried verb** — -tion/-ment + helper verbs → §1.4.
7. **Back-loaded verdict** — mask-after-word-3 fails → invert.
8. **Over-claim** — causal verb over correlation; universal over partial → soften the title or strengthen the evidence, never leave the gap.
9. **Vague quantifier** → the number.
10. **Double claim** — two finite verbs, independent so-whats → split (escalate).
11. **Unanswered question / negative-Betteridge** → verdict form, or add the answering slide.
12. **Uniform template deck-wide** → vary form by function.
13. **Orphan jargon/acronym in the verdict slot** → plain-language subject first.
14. **Title–body topic mismatch** → outline bug, escalate.

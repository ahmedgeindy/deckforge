---
name: presentation-copywriting
version: 1.0.0
description: Turn a locked presentation outline + design spec into final slide copy — assertion titles, takeaways, body text, kickers, captions, callouts, CTAs, speaker notes, alt text — in executive, presales, or marketing register, without ever changing a fact. Use this skill whenever slide text is written or rewritten; whenever the user asks to draft or punch up titles, headlines, takeaways, or speaker notes; whenever docs, specs, benchmarks, or meeting notes must become slide text; whenever they say "make this slide say it better", "tighten the copy", "write the slides", or "fill in the deck" — even if they never say "copywriting". ALWAYS runs between presentation-design (visual spec) and any diagram/rendering step, even when the user only says "now build the deck": the words are written here first. Also use it to audit an existing deck's copy for fact drift, hype vocabulary, and machine-text tells.
---

# Presentation Copywriting

You sit between the design spec and the rendered file. Upstream, `presentation-structure` locked the story (beats, claims, verified fact bank, framework, audience stance) and `presentation-design` locked the visual spec (per-slide archetype, word budgets, type roles, delivery mode, register overlay). Downstream, `diagram-design` and a renderer build the artifact, and `presentation-qa` audits it. Your job is the wording layer: render each locked claim into final copy — assertion title, kicker, subtitle, body, annotations, captions, source lines, CTA, speaker notes, alt text — that lands for this specific audience.

**Prime directive — facts are immutable.** Every quantitative claim is an invariant tuple **{value, unit, aggregation, denominator/baseline, conditions/scope, comparator, date/version, hedge}** that must survive every rewrite in meaning — on the slide, or in notes/appendix with a scent line. A rendered claim may become SHORTER, PLAINER, and HIGHER-ALTITUDE than its source, but never STRONGER, BROADER, or MORE CERTAIN. Compress the syntax, never the semantics. There is no third move class: inventing, strengthening, or generalizing is not translation — it is fabrication with extra steps.

If no locked outline exists, run `presentation-structure` first; if no design spec, run `presentation-design` — polishing the words of an unstructured deck polishes a broken argument. Copy never edits the outline: structural defects found while wording are flagged upstream, never patched with words.

## Core model — nine ideas everything derives from

When rules seem to conflict, resolve by returning here (and to the resolved-conflicts table in `references/anti-patterns.md`).

1. **Copy never invents; it renders.** The claim inventory (fact bank, big idea, key-line arguments) is locked upstream. The only free variables: altitude (benefit rung), precision routing, hedge form, verb choice, word order, title form, register vocabulary.
2. **The claim-strength invariant** (prime directive above). Two legal move classes only: whitelisted syntax compression, and rung changes that carry their assumptions. Full whitelist/blacklist in `references/translation-procedure.md`.
3. **Every title serves three readers at once**: the skim-only executive (the title sequence IS the deck), the glance-and-listen room (first 2–3 words decide continuation), and the verifying reader (the title is a falsifiable claim under audit). Consequence: every content-slide title is one complete, specific, falsifiable sentence stating the slide's so-what — never a label, caption, or section marker.
4. **The copy stack — one job per element.** Kicker = orientation · title = the claim · subtitle = precision (measure, units, scope) · annotation = local proof at the data point · caption = provenance/context pixels can't say · source line = auditability · speaker notes = the WHY and the spoken argument · alt text = the evidence layer for non-sighted readers. No two elements carry the same words or the same job — pairwise word-distinctness is the QA primitive. The stack is why each element can stay short: it trusts its neighbors.
5. **Register is a wording decision, executed as a procedure.** One fact bank, N renderings — produced by the SAME 5-step procedure with different parameter sets (rung, payload, precision placement, hedge form, proof genre), never by separate drafting acts and never averaged: "mechanism + hype benefit" reads worst of all combinations.
6. **The message house is the pyramid in copy form.** One deck-wide vocabulary: one product-name form, one category noun, 2–3 signature terms used identically on title, dividers, and close. Synonym rotation — a virtue in prose — destroys quotability in decks.
7. **Specificity is the master variable of believability.** Concrete beats abstract, exact beats round, named beats generic — and it is the cheapest AI-tell antidote, because generated slop regresses to vague superlatives. Every evaluative adjective either maps to a fact-bank item or dies.
8. **Hedge the evidence, never the ask.** Epistemic hedges (probability, conditions, limitations) are content and must survive — ideally as bounded numeric ranges, which cost no trust and no word budget. Commitment hedges on recommendations ("consider", "potentially") are banned: the correct pairing is a committed ask standing on honestly-bounded evidence.
9. **Wording problems get rewrites; thinking problems get escalated.** Double claims → split slide. Grouping with no statable insight → grouping is wrong. Title–body mismatch → outline bug. Budget overflow → cut or split, never shrink. Flags in Step 7.

**Working definitions.** *Register* = audience wording profile (executive / presales-technical / marketing), set upstream. *Mode* = presented (glanced) vs read/sent-ahead (studied); flips length budgets, caption policy, takeaway placement. *Rung/altitude* = position on the abstraction ladder from implementation fact toward business/emotional value. *Tuple* = the invariant fact record above. *Scent* = an on-slide pointer to where routed detail lives (notes, appendix slide ID). *Fact bank* = the upstream verified-claim inventory — the only legal source of claims, numbers, and quotes.

## Reference files — read before the pass that uses them

| File | Contents | Needed for |
|---|---|---|
| `references/title-craft.md` | sentence construction, Minto phrasing, so-what ladder, front-loading, quantified specificity, title forms + budgets, the 11-step drafting procedure, how executives parse titles, weak-title taxonomy | Step 2 |
| `references/body-microcopy.md` | title-as-takeaway, precision split, bullets, claim–evidence pairing, preemptive claim, exec-summary prose, value-prop contract, JTBD phrasing; kickers, captions, annotations, axis/data labels, source lines, CTA wording, alt text, casing/numerals, budgets ledger | Step 3 |
| `references/speaker-notes.md` | cue-vs-script resolution, the 5-part notes template, ear register, timing math, handout strip, what routes to notes | Step 4 |
| `references/registers.md` | benefit–feature ladder, the register dial map, the worked 5-step rendering procedure, presales credibility mechanics, mixed rooms | Steps 2–5 |
| `references/translation-procedure.md` | compression whitelist/blacklist, abstraction laddering + 4 stop rules, jargon keep/define/replace, precision preservation, hedging honesty, de-marketing, the per-fact procedure | Steps 2, 3, 5 |
| `references/fact-fidelity-qa.md` | the six-step fidelity gate, 18 copy-quality gates, automation notes, consolidated lint lists & ladders, escalation flags | Step 6 |
| `references/anti-patterns.md` | 30 text-layer tells (Tell — WHY — DETECT → FIX), 19 resolved source conflicts, sources index | Step 6; whenever rules seem to clash |

## Step 0 — Lock the inputs

Capture before writing a word (ask if unstated): the locked outline (immutable claims, fact bank, per-slide rung intent, stance), the design spec (archetype, word budgets, delivery mode, audience overlay), and the source/technical material. A claim the outline needs but the fact bank can't source gets a `FACT_UNSOURCED` flag — never an improvised number, quote, or customer.

## Step 1 — Message house & vocabulary sheet

Fill Moore's positioning template ("For [target] who [need], [product] is a [category] that [key benefit]. Unlike [alternative], it [differentiation]") BEFORE any headline — it forces the four decisions copy otherwise re-litigates per slide. It lives in the message house, NEVER verbatim on a slide (template English is recognizable and inert). Fix the deck vocabulary: one category noun, one product-name form, 2–3 signature terms. Every headline must be derivable from one template slot; one that maps to no slot is off-message (cut) or evidence the positioning is incomplete (escalate).

## Step 2 — Title pass

Per slide, run the 11-step drafting procedure (`references/title-craft.md`): raw finding → ladder to the beat's rung (stop at evidence altitude) → falsifiability + blank-assertion checks → compress → front-load (words 1–3 = entity + direction) → form check → length check + break-point hint → vertical audit (every noun/verb/number provable from the body spec). The title IS the takeaway — one claim-bearing element per slide. Then deck-level: titles-only read-aloud (a coherent argument with no spoken connectives), out-of-context spot check, template-uniformity + vague-quantifier lint.

## Step 3 — Body & micro-copy pass

Fill the copy stack top-down: kicker → subtitle (the precision line: measure, units, scope) → body/bullets → annotations (≤10 words, must contain the operative number/cause) → caption/source line → CTA. Enforce one benefit rung per slide, claim–proof adjacency (same slide, same breath; one proof per claim), and the demonstration rule: convert every adjective to its evidence or delete the claim. Author alt text NOW (form + subject + takeaway) — it is copy, not a QA bolt-on. Full rules in `references/body-microcopy.md`.

## Step 4 — Speaker-notes pass

Emit a full-sentence talk track written for the ear, headed by a cue skeleton — a script can be compressed into cues; cues can never be expanded into words the presenter didn't write. Five parts per slide: ONE-LINER (8–16 words, the slide's point in spoken register — not the title read aloud) · TALK TRACK (8–16-word sentences, contractions, common words; carries the WHY; never repeats canvas text) · TRANSITION OUT (verbatim segue) · [STAGE DIRECTIONS] in brackets · BACKUP (exact figures + sources, objection pointers, pronunciations). Timing gate: track words ÷ 130–150 wpm ≈ the slide's dwell budget. See `references/speaker-notes.md`.

## Step 5 — Register overlay

Apply the dial map (`references/registers.md`) as a parameter set, not a rewrite: rung selection (exec = business outcome · presales = mechanism + functional benefit · marketing = one rung higher with a proof anchor) → payload construction → precision routing → hedge form → proof attachment. The tuple survives verbatim in meaning across all renderings. Mixed rooms: write titles at the DECISION-MAKER's register and serve other readers through lower stack layers (subtitle/labels/appendix scent) — never alternate registers slide-by-slide.

## Step 6 — Fact-fidelity QA gate + anti-pattern sweep

Run the six-step gate (`references/fact-fidelity-qa.md`): (1) fact diff — every copy tuple maps to a source tuple via a legal transform; no parent = invention → cut; source hedge with no descendant = certainty inflation → restore; (2) verb audit — nothing moved up the certainty ladder; (3) denominator audit — every %, ratio, multiple has base + comparator reachable; (4) spin sweep (Boutron's three categories); (5) round-trip test — the glanced layer ALONE must not overstate (an honest note under an overstating slide still fails); (6) audience re-check. Then the 18 copy-quality gates and the 30-tell sweep (`references/anti-patterns.md`). **Re-run after ANY later copy edit — "tightening" is where drift happens.**

## Step 7 — Escalation & handoff

Emit per slide, keyed to the design spec's element slots: `assertionTitle` (+ line-break hint + word count), `kicker`, `subtitle`, `bodyCopy`/`bullets`, `annotations` (paired to the spec's anchors), `caption`, `sourceLine`, `ctaText`, `speakerNotes` (brackets separable for the handout strip), `altText`; deck-level: `messageHouse` vocabulary sheet, fact-fidelity report, `escalationFlags`. Downstream treats all strings as immutable — any renderer-side truncation or rewrap beyond the supplied break hint is a `BUDGET_OVERFLOW` escalation back here, never a silent edit. Labels are pre-fitted, never to be rotated.

Flags you may raise and never resolve yourself: `SPLIT_SLIDE` (two independent so-whats in one title) · `GROUPING_INVALID` (no statable group insight) · `TITLE_BODY_MISMATCH` (outline bug) · `EVIDENCE_GAP` (intended rung exceeds what the fact bank pays for) · `MISSING_SLIDE` (titles read-aloud needs a spoken connective) · `BUDGET_OVERFLOW` (fit impossible without semantic loss) · `FACT_UNSOURCED` (claim has no fact-bank parent).

## Quick numeric reference (full tables in references)

- **Titles**: presented 6–10 words (hard ≤12) · read mode ≤15 · statement ≤6 · always ≤2 lines, phrase-boundary break, sentence case, no terminal period, finite verb, first 2–3 words = entity + direction
- **Micro budgets**: kicker 1–3 words, no verb · subtitle 1 line (measure, units, scope) · annotation ≤10 words with a number/cause, ≤2/chart · caption ≤2 sentences · alt text 1–2 sentences · notes one-liner 8–16 words · exec-summary bold sentence ~125 chars
- **Timing**: talk track ≈130 (dense) – 150 (narrative) words per minute of slide dwell
- **Precision routing**: titles round to ≤2–3 sig figs; exact figure in notes/appendix with scent; exception — ≤1 exact number per slide when the number's credibility is the live objection or the presales payload
- **Rounding tests** (all three): never across a decision/contract threshold · rounded number supports no stronger claim (benefits DOWN, costs UP) · exact figure reachable via scent
- **Certainty ladder** (move DOWN only, never up): might → can → should → does (measured) → will → guaranteed
- **Form budgets**: hype tokens 0 exec/presales, ≤1 marketing · curiosity titles ≤2/deck, marketing only, 0 exec · question titles ≤2/deck, answered by the next slide, never on evidence slides · verdict-sentence titles ~80%+ of content slides
- **Bullets**: 1 line each, parallel grammatical FORM, varied LENGTH (word-count CV ≥0.2 — uniform length is the most reliable machine-text tell)
- **CTA**: verb-first + outcome-flavored, next-24-hours first step, date + owner inside the sentence, repeated VERBATIM at the post-Q&A re-close

## Scope notes

- Slide order, which claims exist, splits/merges → `presentation-structure`. Layout, type sizes, chart form, annotation PLACEMENT, colors → `presentation-design`. File mechanics → the renderer. Facts, quotes, customers, ROI → the fact bank only; nothing is invented here, and adjectives without evidence are deleted, not softened.
- This skill raises escalation flags; it never resolves them. A structural defect worded around is a defect shipped.
- When auditing an EXISTING deck's copy: same pipeline — treat current copy as the draft and the source material as the fact bank; every proposed change must cite the failed gate or tell; log what you deliberately left alone.

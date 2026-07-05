> Extracted from the presentation-qa master knowledge base (research synthesis, 2026-07-03).
> Synthesized from 2 research lanes — `cognitive-load-accessibility.md` = [COG], `qa-process-rubrics.md` = [PROC] (in `presentation-qa-workspace/research/`) — against the two upstream contracts:
> **[STR]** `presentation-structure-workspace/research/master-knowledge.md` — story layer: frameworks, assertion titles (§G1), fact bank (§4 Step 4), the 11 outline QA gates (§4 Step 7), glance test (§G2), Mayer/CLT doctrine (§G3), Kosslyn audit (§G4).
> **[DES]** `presentation-design-workspace/research/master-knowledge.md` — visual layer: tokens (§1), archetypes (§4), evidence craft (§5), AI-tell blacklist (§7 items 1–26), design-review report + severity ladder (§9), numeric floors appendix. The operational versions live in `presentation-design/references/` (design-review.md, ai-tells.md).

# Conflicts resolved & sources index

## 9. Conflicts resolved (by rule, never averaged)

Consolidates [COG X1–X7] + [PROC §13] + synthesis-level conflicts found while merging. When two rules seem to clash mid-review, resolve here — never split the difference.

1. **"Don't duplicate upstream" vs Independence Principle** (the central tension of a final gate): resolved by the verb system (pass-structure.md §0.5) — ASSERT judgment-heavy spec checks (trust + spot-audit), RE-RUN everything the renderer can invalidate, NEW for this skill's own layer. Duplication of *rationale* is banned; duplication of *verification on a new artifact* is the job.
2. **Design review (pre-render) vs final gate (post-render)**: not competing reviews — [DES §9] validates the spec, this gate validates the artifact against spec + contract. A design-review PASS is an input (Q3.7), never a substitute.
3. **Mayer redundancy (M6) vs accessibility captions (SC 1.2.2)**: boundary condition, not conflict — captions live in a toggleable track for viewers who can't use audio (Mayer's documented helps-case); narration pasted into slide bodies still FAILS [COG X1].
4. **WCAG 3:1 large-text allowance vs pipeline 4.5:1**: stricter wins projected (ambient-light contrast collapse); WCAG is the floor cited, the token sheet is the rule enforced [COG X2].
5. **Dyslexia wide spacing vs display negative tracking**: scope split — overlay spacing applies to body text (read), display type keeps design tracking (glanced as shape) [COG X3]; cream-background shift only in an explicitly requested overlay [COG X4]; dyslexia fonts: side with controlled evidence, never mandate [COG X5].
6. **Personalization (M10) vs exec register**: severity downgrade — WARN owned by the copy lane; never a FAIL on exec decks [COG X6].
7. **Effect-size precision**: cite Mayer medians as lab-condition MED; severity mapping uses the stable principle-strength ORDER, robust across the 2025 meta-analysis [COG X7].
8. **Checklist vs ad-hoc detection counts** (research genuinely mixed): adopt checklists for reproducibility + false-positive control (decisive in an auto-fix pipeline); keep a tagged `impression` channel so expert observation isn't lost [PROC §13].
9. **Four-eyes rigor vs cost**: scale by stakes — routine decks: builder + one fresh-context gate; high-stakes: 3–5 parallel lenses (Nielsen curve caps useful reviewers ~5) + escalation passes [PROC §13].
10. **More passes vs diminishing returns**: passes are cheap for agents (fresh context ≈ free) — keep full separation; compress human TOUCHPOINTS to one dispositioning session over the aggregated table [PROC §13].
11. **Single severity rating vs multi-factor scoring**: single ladder for gate semantics (ship/no-ship needs one dimension); factors recorded in mechanism text for within-level tie-breaks [PROC §13].
12. **Consistency severity** (researchers implied different levels): codified — cross-slide NUMBER/date mismatch = Blocker (dishonest-data class); systemic terminology/format drift = Major; single-instance deviation = Minor. The discriminator is whether the audience can catch the deck contradicting itself.
13. **Reading-grade metrics** (tooling convention vs slide reality): banned on fragments with mechanism stated (R0's four failure modes); permitted only as a WARN on headlines-only [COG §3].

## 10. Sources

Primary evidence lives in the two lane files; this section indexes by domain.

- **Process & passes**: professional proofreading multi-pass practice (Grammarly; An American Editor); Stafford fresh-eyes mechanism (Univ. of Sheffield, via Wired) — MED (journalistic coverage); four-eyes/rubber-stamp doctrine (COSO usage; Zampa) → [PROC §14].
- **Verification**: editorial fact-checking models + Independence Principle (KSJ Handbook; TiJ Guide; PEN America); IB pitchbook footing practice (Mergers & Inquisitions; Macabacus) — MED practitioner lore; Bard/JWST case (Reuters/NPR, Feb 2023) as the discontinuous-cost anchor.
- **Consistency**: copyeditor style-sheet doctrine (Brenner; Knowadays); investor red-flag literature on numbers-that-don't-tie (Forbes/DeckEZ).
- **Regression**: RTM doctrine (Guru99; Abstracta); XCAI narrative-acceptance-matrix lesson [STR §5 lesson 10].
- **Review science**: checklist-vs-ad-hoc inspection research (arXiv 0909.4260 vs Porter/Lanubile — conflict stated); Nielsen & Molich 35%/75% evaluator curve; NN/g severity ratings; Gawande, *The Checklist Manifesto*; Klein premortem (HBR 2007; +30% prospective hindsight); murder-board doctrine (US Army origin).
- **Cognition**: Mayer, *Multimedia Learning* + Cambridge Handbook ch.13–14 (incl. social-cue principles); 2025 boundary-condition meta-analysis (ScienceDirect S1747938X25000673); Sweller/Ayres/Kalyuga CLT (element interactivity, transient information, expertise reversal); Flesch-Kincaid limitation analyses → [COG §7].
- **Accessibility**: WCAG 2.1/2.2 (w3.org/TR/WCAG22); W3C WAI accessible-presentations guidance; Okabe & Ito 2008 CVD-safe palette; Brettel/Viénot/Machado simulation algorithms; dyslexia evidence chain (Zorzi 2012 PNAS; Wery & Diliberto 2017; Kuster 2018; Galliussi 2020 non-replication; BDA Style Guide 2023) — confidence per-claim in [COG §4.3].
- **Automation**: Vale prose-linting practice (Datadog/Elastic writeups); Macabacus deck-native checks.
- **Upstream contracts**: [STR] and [DES] master files (paths in the header above) — all cited rule IDs resolve there.

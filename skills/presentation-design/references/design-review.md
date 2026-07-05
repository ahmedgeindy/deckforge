> Extracted from the presentation-design master knowledge base (research synthesis, 2026-07-03).
> Source tags: [Duarte] [Zen] [AE]/[Tufte] [DS] [NNg]/[Figma] [PC] [Tools] [Tells] [Ev] — see sources.md.
> Numbers on a 1280x720 basis (px~pt) unless stated.

## 9. DESIGN-REVIEW REPORT (run BEFORE rendering)

The skill produces this report on its own spec, then revises. Improve ONLY where quality objectively increases against these checks — no redesign-for-its-own-sake; every proposed change must name the check it fixes [Tells inverse-failure, NNg §8].

### 9.1 Severity ladder [NNg §8.3]
- **Blocker**: message cannot be extracted at a glance, or the WRONG takeaway is extracted; story altered; brand violated; dishonest data (axis, lie factor).
- **Major**: takeaway at risk — contested hierarchy (two focal elements), key evidence illegible at distance, archetype mismatched to rhetorical job, AI-tell present.
- **Minor**: friction — off-scale spacing, weak alignment, line length over budget, orphan words, inconsistent component styling.
- **Cosmetic**: polish opportunities that don't affect message extraction.

Finding format (evidential + non-defensive): "For [this audience/goal], [element] risks [specific failure] because [mechanism]" [NNg §8.3 — satisfies both IDEO framing and Nielsen substance]. Critique at the right fidelity: structure/hierarchy findings before type findings before polish findings; never restructure at polish stage [NNg §8.1].

### 9.2 Per-slide checks
1. One dominant element; 1st/2nd/3rd-look order stated and plausible [NNg §1].
2. Squint/thumbnail test: takeaway and grouping survive blur [NNg §1.6].
3. Glance Test: point extractable in ~3s (presented mode) [Duarte §2].
4. Headline = front-loaded full-sentence assertion, ≤2 lines, largest text [AE-A2].
5. One idea; if two, the split is flagged [Duarte §3, Zen #17].
6. Position: takeaway in top-left band; nothing critical bottom-right [NNg §1.4].
7. Grouping legible from spacing alone; between-gap ≥2× within-gap; boxes only where whitespace can't group [NNg §4].
8. Type: ≤3 sizes, roles from the ramp, above floors; line length ≤65 chars; no shrink-to-fit [DS, Tools-A4].
9. Color: one accent on the point; semantic colors semantic-only; contrast ≥4.5:1 text / 3:1 marks [DS §6].
10. Spacing values on the token scale; elements on the grid; margins respected [Tools-A3].
11. Evidence rules for the archetype in play (§5): honest axes, direct labels, annotated proof point, crop/annotation caps, connector discipline.
12. Word budget: ≤~40 visible words presented; detail routed to speaker notes [Duarte §4, AE-A5].
13. No element that cannot state its job (subtractive check) [Zen #1].

### 9.3 Per-deck checks
14. Titles alone, read in sequence, tell the full story (layer-cake test) [NNg §2].
15. Archetype run-length ≤2; no archetype >40%; density alternates; act boundaries visible in thumbnail grid [Tells-A1, PC §2.3, Zen #16].
16. Emphasis budgets respected: hero numbers ≤2, dark slides 2–4, full-bleeds budgeted, gradient ≤1 signature use [§0.7].
17. Full AI-tell sweep: §7 items 1–26 each checked with its detection heuristic.
18. Token consistency: no palette drift, no font drift, title anchor stable, one icon style, one screenshot treatment, footer identical-or-absent [Tells inverse-failure].
19. Concept-colors never reassigned; annotation/focus recipe uniform across charts, screenshots, diagrams [Zen #23, Ev §4].
20. Mode compliance: presented → builds marked, legends stripped, notes populated; sent-ahead → builds flattened, self-standing labels, C4-complete diagrams [Ev §4].
21. Appendix scent present for every deferred detail; ≤2 disclosure levels [NNg §5].
22. Branding: extracted tokens honored; logo only at bookends (presented); no invented brand elements [§6.1].
23. Story fidelity: outline text unmodified; slide order unchanged; no invented content [Tools-A6].
24. Audience overlay applied (§8) and named in the report header.

### 9.4 Report output structure
Emit before rendering, in this order:
1. **Header**: deck title · delivery mode (presented-stage / presented-room / screen-share / sent-ahead) · audience overlay · brand source · slide count.
2. **Token sheet**: the resolved §1 tables (type roles with sizes for the declared mode, spacing scale, color roles with hex + contrast verification, radius/elevation choices) and the named theme direction with one-line rationale. Optionally 2–3 named theme directions answering different strategic questions, with rationale, for the caller to choose [Tools-A7].
3. **Deck map**: per-slide row of {#, beat, rhetorical job, archetype, dominant element, 1st/2nd/3rd look, fill level (sparse/medium/dense), accent spend, build steps (presented)}. Rhythm violations visible in this table by inspection.
4. **Findings**: severity-ordered (Blocker → Cosmetic), each in the mechanism format of §9.1, each naming the check number it fails and the minimal fix. AI-tell sweep results included with the triggering heuristic values.
5. **Budgets ledger**: hero numbers used/allowed, dark slides, full-bleeds, gradients, container styles, caps roles.
6. **Disposition rule**: apply fixes only where a check objectively fails; log rejected changes with reason ("no objective quality increase") — the improve-only-where-quality-objectively-increases rule, enforced by requiring every change to cite its check [NNg §8.3 decision-separation].

---

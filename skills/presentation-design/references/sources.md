> Extracted from the presentation-design master knowledge base (research synthesis, 2026-07-03).
> Source tags: [Duarte] [Zen] [AE]/[Tufte] [DS] [NNg]/[Figma] [PC] [Tools] [Tells] [Ev] — see sources.md.
> Numbers on a 1280x720 basis (px~pt) unless stated.

## 10. CONFLICTS RESOLVED (resolution rules, not averages)

R1. **Tufte "replace slides with documents" vs Alley "redesign slides"** → branch on mode: presented decks follow Alley on-canvas (empirically validated) and honor Tufte by routing density to notes/appendix/pre-read; sent-ahead decks move toward Tufte (denser, self-standing) [AE C1].
R2. **Tufte density vs Mayer coherence** → discriminator is relevance to the slide's single assertion + visual subordination: contextual detail may stay if layered quietly; anything serving a different assertion moves; decoration condemned by both [AE C2].
R3. **Consistency vs variety (Pitch vs anti-slop)** → two layers: tokens consistent, composition varies by meaning. Never let one satisfy the other [Tools-C1, Tells].
R4. **Rule-of-thirds vs centered symmetry** → by archetype: image-led → thirds/off-center; Statement/big-number/divider → centered symmetric. Never average — slightly-off-center statements read as mistakes [Zen C2].
R5. **Dark vs light palette** → venue/mode input: palette follows room light; dark is the stage answer, not the universal one [Zen C1/#11].
R6. **Gradients/depth: tell or tool** → intent density: one functional depth cue = craft; container gradients everywhere = slop. Cap ~1 decorative effect per slide, each must name what it separates [Tools-C2].
R7. **Cards recommended and condemned** → grouping tool, not default container: parallel countable items, 3–4 max, once or twice per deck [Tools-C3].
R8. **Line-chart axis truncation** → default lines to zero in persuasion decks (Correll: disclosure doesn't remove the bias); truncate only when zero is meaningless, label prominently [Ev §3.5].
R9. **Duarte's pie tolerance vs Tufte/Datawrapper** → pies only for a 2–3-slice big/small gestalt; bars for any real comparison [Duarte conflicts, Ev §3.1].
R10. **Animation budgets (Reynolds minimal vs Apple pervasive)** → both agree motion serves narrative only; rehearsed presented decks get the synchronized-reveal budget; unrehearsed or sent-ahead get minimal [Zen C3].
R11. **Reynolds "no text" vs Apple statement slides** → fake conflict: a giant 3–6-word phrase is processed as an image; both ban paragraph text [Zen C4].
R12. **Never-share-slides vs deck-as-document** → required branching input, not a choice the skill makes silently [Zen C5].
R13. **Word budgets (30 vs 40) & font floors (28 vs 30 vs age÷2)** → proxies; the Glance Test and back-of-room legibility are the rules; floors in §1.1 are renderer heuristics [Duarte conflicts].
R14. **"Commit to one layout primitive" (web) vs "vary layouts" (slides)** → different layers: commit at system layer, vary at composition layer [Tells].
R15. **IDEO "I like/I wish" vs Nielsen's ban** → IDEO governs social framing, Nielsen governs evidential content; findings state mechanism + audience + risk [NNg §8.3].
R16. **Line-height 1.125–1.2 vs 1.5** → role split: 1.05–1.2 display/title, 1.35–1.5 body [NNg §9, DS §1.3].
R17. **Display weight 300 vs 600** → invariant is tight metrics at size; weight floor 400 projected; light display only for retina-read decks [PC §7].
R18. **4px vs 8px spacing scales** → not a conflict (8 ⊂ 4); pick ONE per deck, never emit off-scale [PC §7].
R19. **12-col vs 16-col grid** → 12 for slides (3-up divisibility); keep the 8px mini-unit regardless [DS §7].
R20. **Full-window vs cropped screenshots** → docs read full windows; slides crop to the proving region + 10–20% context [Ev §1.2].
R21. **Self-standing diagrams (C4) vs narrated minimalism** → mode fork: presented strips legends and builds progressively; sent-ahead satisfies the full C4 checklist [Ev §2.6].
R22. **Constraints: floor vs ceiling** → enforce invariants mechanically (grid, tokens, floors), spend judgment only on released variables (composition, emphasis, pacing) [Tools-C4/A5].
R23. **Red annotation default (Ritza) vs deck accent** → use the deck accent for annotations; red only where alarm semantics are intended [Ev §1.3].
R24. **Emphasis attracts vs fancy-formatting gets ignored** → emphasis must be native (weight/size/isolation/one accent), never promotional costume (gradients, starbursts, boxed shouting); identical repeated emphasis habituates into chrome [NNg §9.3].

---


## 11. SOURCES INDEX

| Tag | File | Anchor sources | Confidence profile |
|---|---|---|---|
| [Duarte] | duarte.md | duarte.com Glance Test guide; HBR 2012; MIT Sloan annotation article; slide:ology / Resonate / Slidedocs | HIGH primary; Slidedocs sections MED-HIGH (ebook unfetchable, 2 agreeing secondaries) |
| [Zen] | presentation-zen-apple-keynotes.md | garrreynolds.com design tips (primary); Presentation Zen ch.5–6; Camillieri ex-Apple (Medium); Gallo/Forbes | HIGH primary; Apple analyses MED-HIGH |
| [AE]/[Tufte] | assertion-evidence-tufte.md | assertion-evidence.org; Garner & Alley IJEE 2013 (110-student controlled study, p<.01); Alley et al. 2006; Cognitive Style of PowerPoint (full primary text); VDQI; Envisioning Information; Beautiful Evidence; Doumont 2005 | HIGH; Thai replication MED |
| [DS] | design-systems.md | Fluent 2 + Carbon token sources (primary GitHub); M3/Apple HIG via verified secondaries; WCAG 2.1 | [H] Fluent/Carbon/WCAG; [M] M3/Apple; [S] slide derivations |
| [NNg]/[Figma] | visual-hierarchy-nng-figma-ideo.md | NN/g eyetracking articles (8, primary); Figma best-practices/blog; IDEO journal; Nielsen uxtigers design-crit | HIGH; IDEO fidelity quotes MED-HIGH |
| [PC] | product-craft-stripe-linear-notion.md | Live structural audits of stripe.com/linear.app/notion.com (2026-07); linear.app/brand; token teardowns | HIGH patterns; exact teardown values MED |
| [Tools] | pitch-beautifulai-gamma.md | Pitch blog/guides (primary); Beautiful.ai smart-slides page; Gamma via 5+ triangulated reviews | Pitch HIGH; Beautiful.ai HIGH/MED; Gamma MED |
| [Tells] | ai-tells-taxonomy.md | Developers Digest 16-pattern catalog; 2Slides; Presenti; dev.to/prg.sh root cause; Ramotion/Toptal | MED-HIGH+; "71% Stanford" stat LOW (directional); browser-chrome tell LOW-MED |
| [Ev] | screenshots-diagrams-evidence.md | c4model.com; storytellingwithdata (Knaflic); Datawrapper Academy; Correll et al.; Ritza style guide; Jotham Gunn; Zight | HIGH primaries; vendor comparison guides LOW-MED; node caps + screenshot text floors DERIVED |

Known gaps flagged for iteration 2: no authoritative screenshot text-size floor; no canonical diagram node cap; Duarte Slidedocs primary PDF unfetched; Gamma primary 403.

---

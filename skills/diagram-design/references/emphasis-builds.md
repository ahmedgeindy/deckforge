> Sliced from the diagram-design master knowledge base (deduplicated, conflict-resolved synthesis of 3 research lanes: [Tax] diagram-taxonomy-selection · [Craft] diagram-craft-mechanics · [B2S] bullets-to-structure; 2026-07).
> This file: master §4 (emphasis + narration + audience modulation). Cross-refs: §0/§2 → selection-procedure.md · §1 → form-catalog.md · §3 → construction-mechanics.md · §5–§6 → spec-contract-anti-patterns.md · §7–§8 → sources-conflicts.md. "design §…" / "structure §…" = the presentation-design / presentation-structure masters (normative upstream; on disk see presentation-design/references/).
> Confidence HIGH unless marked (MED)/(LOW); "derived" numbers come from legibility math, never citations (R15). Numbers on the 1280×720 basis.

# 4. EMPHASIS + NARRATION

## 4.1 The one accented element, per form

Upstream invariants: one accent, ≤1 accented element per slide (design §6.2); focus/defocus = accent on the focus + gray the rest, one deck-wide recipe (design §5.0). This layer names WHERE the accent goes per form — the accent target is a required spec field:

| Form | Default accent target |
|---|---|
| Process flow | the hinge step |
| Sequence | the one message the headline asserts (the failure / the removed hop) |
| Swimlane | the boundary-crossing handoff arrow(s) |
| Timeline | TODAY or the decision point |
| Journey | the emotion-curve pit (or peak) |
| Funnel | the leaking stage |
| Cycle / CLD | the arc or loop being argued |
| Hierarchy | the branch/layer under argument |
| Architecture | the narrated path or the NEW component |
| Ecosystem | your position or the contested link |
| 2×2 | the item(s) the recommendation moves |
| Decision tree | the recommended path (dead branches at ~40–60% ink) |
| Matrix | the verdict column (plus the conceded cell narrated, not accented) |

**The defocus ladder** (consolidated dim levels — implement as precomputed gray/opacity tokens, §3.7, so all renderers agree):

- *Context that must stay readable* (rejected decision-tree branches, non-narrated lanes, unaccented series): ~40–60% ink — still legible, visibly demoted.
- *Build history* (already-narrated elements in a progressive build): dimmed to ~25% salience but never removed — they are memory anchors (structure G7).
- *Grayed-full pre-state* (re-highlight mode): the whole structure at the context level, with only the narrated region at full ink + accent.

Never more than these three states plus the accent on one slide — a fourth salience level exceeds the ~4-chunk perceptual budget (structure G3/Kosslyn). Emphasis must read native, not promotional: weight, position, isolation, and the single accent — never glows, badges, or a second accent hue (design §6.2/R24).

## 4.2 Builds (delta over structure G7 / design §4.3+§5.2)

- **Deictic sync**: an element appears the second it is first spoken, and narration uses the node's label VERBATIM — temporal contiguity (Mayer d≈1.30) at element grain; label/word mismatch forces a visual search. Speaker notes for a diagram slide are written per build step; each step's first sentence contains the new element's label.
- **Build unit per form** (the unit is a narration CLAUSE, not a node): flow/architecture → one path segment or subsystem per beat · sequence → one message or request-response pair · swimlane → chronological along the flow, NEVER lane-by-lane (lane-order builds destroy causality — the story is the ball moving between lanes) · decision tree → per reveal-order rule below · network → hub, then clusters, then the single claim-bearing edge · matrix → by column if options-first, by row if criteria-first · timeline → era by era, L→R · CLD → loop by loop, one lap narrated each.
- **Reveal vs re-highlight decision rule** (sharpens upstream's two options): ADDITIVE REVEAL when topology is the surprise or read-ahead would spoil; GRAYED-FULL + RE-HIGHLIGHT when the gestalt is needed as context throughout (handoff stories, "you are here" zooms, any diagram the audience saw earlier).
- **Branch reveal order mirrors the deck's conclusion placement** (structure §0): answer-first deck → recommended path first, eliminated branches as due diligence; skeptical-audience deck → branches in elimination order, the recommendation last standing. The tree is the argument in miniature; a mismatched build order leaks the ending or buries the lede (derived, MED — cross-skill tie).
- **The last build step is the takeaway**: the final click adds the accent annotation stating the conclusion at the point of proof. A build ending on mere completeness fizzles.
- **Step budget**: build steps = narration beats, ≤5–7 per diagram slide; a step whose narration is "and this connects to that" merges into the previous step.
- **Static degradation**: backwards-authoring (upstream) guarantees stable positions; additionally each intermediate step must be self-labeled enough that exported per-step frames read in sequence without narration (message/step numbers help).

## 4.3 Audience modulation

SQVID dials (C6) + design §8 overlays: executive → Context-level zoom, name+type nodes, delta accented, ≤30 words; technical → Container/Component zoom, protocols on connectors, notation restored in sent-ahead; external/marketing → schematic only, journey/statement-weighted. Notation fidelity always loses to the glance test on PRESENTED slides and is restored in read artifacts (§7 R3).

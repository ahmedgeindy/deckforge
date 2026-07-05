> Sliced from the diagram-design master knowledge base (deduplicated, conflict-resolved synthesis of 3 research lanes: [Tax] diagram-taxonomy-selection · [Craft] diagram-craft-mechanics · [B2S] bullets-to-structure; 2026-07).
> This file: master §5 (spec-emission contract + QA number set + hard invariants) and §6 (anti-pattern blacklist). Cross-refs: §0/§2 → selection-procedure.md · §1 → form-catalog.md · §3 → construction-mechanics.md · §4 → emphasis-builds.md · §7–§8 → sources-conflicts.md. "design §…" / "structure §…" = the presentation-design / presentation-structure masters (normative upstream; on disk see presentation-design/references/).
> Confidence HIGH unless marked (MED)/(LOW); "derived" numbers come from legibility math, never citations (R15). Numbers on the 1280×720 basis.

# 5. SPEC-EMISSION CONTRACT

Extends the design master's per-slide spec (§1.5) — those fields (beatRef, rhetoricalJob, archetype, assertionHeadline, lookOrder, gridPlacement, buildSteps, speakerNotes, appendixRefs) still apply. A `diagramSpec` embedded in `evidenceSpec` must contain:

```
diagramSpec:
  form:            one of form-catalog §1 (process-flow | sequence | swimlane | timeline | journey |
                   funnel | cycle | cld | hierarchy | driver-tree | architecture |
                   ecosystem | quadrant | spectrum | venn | decision-tree | matrix)
  relationship:    the one-phrase relationship claim (C1) — the falsifiable object G-B tests
  zoom:            (architecture only) context | container | component
  nodes:           [{id, label (hard-wrapped at phrase boundaries), detail (one line or null,
                   uniform {label,detail} granularity per group — structure §5 XCAI rule),
                   type, rank, group|lane|quadrant, isEmphasisTarget}]
  edges:           [{from, to, verbLabel (source verb, never "uses"), style (solid|dashed —
                   ≤2 declared types), direction (always uni), provenance (the source phrase
                   that licensed this edge — G-C trace)}]
  groups:          [{id, label, members, renderAs (lane|zone|pool|phase-band)}]
  layoutHints:     {flowDirection (L2R|T2B), ranks ({rank: [nodeIds]}), coordinateFrame
                   (absolute px, 1280×720, grid-snapped), scaleDeclaration (timeline:
                   true-to-scale|sequential), portabilityFlags ([svg-only features]),
                   autoLayoutAllowed (true ONLY if pure topology — §3.7)}
  emphasisTarget:  the ONE accented element id + the accent's meaning (§4.1)
  buildSteps:      [{elements, narrationFirstSentence (contains new element's label verbatim),
                   mode (additive|rehighlight)}]   # presented mode only; ≤5–7
  appendixSplit:   what was pruned for transfer (C5) + information-scent pointer text
  traceTable:      [{element|edge → source sentence}] two-way; plus unrouted-claims list (G-C)
  demotionReport:  null | "kept as list/table because <no cues | below minimum | speed-test tie>"
  sqvidDials:      {simple↔elaborate, vision↔execution, delta↔status-quo}
```

**Renderer-runnable QA number set** (consolidated; run before render, report violations by check id):
crossings = 0 · bends/edge ≤ 2 · distinct edge styles ≤ 2 (+accent) · uniform node aspect per type · distinct coordinate count ≤ ranks+2 · every label ≥ label role (16px presented) · lane height ≥ 95px · lanes ≤ 4 (5 absolute) · lifelines ≤ 5 · messages ≤ 7–9 · tree leaves ≤ 7, depth ≤ 3 · matrix ≤ 5×7, one highlighted column, ≥1 conceded row · funnel stages numbered with real counts · CLD ≤ 2 loops / ≤ 7 variables, every loop R/B-labeled · hierarchy ≤ 3 levels / ~12 leaves · network ≤ 10 actors, no bundling · nodes overall within design ~6–12 cap · exactly one emphasisTarget · every edge has verbLabel + provenance · build steps ≤ 7.

**Hard invariants** (renderer refuses otherwise): no form the cue scan didn't license (§6 #1 enforcement point) · no arrow without a directional source relation · no cycle/funnel/hub geometry without its licensing condition verified · overflow → split/downgrade, never shrink · only token values and grid positions (design §1.5) · outline text unmodified.

---

# 6. ANTI-PATTERN BLACKLIST (detection heuristics power the QA pass)

Extends design §7 (equal-card walls, icon grids, centered overload etc. live there). Format: **Tell — WHY — DETECT → FIX.**

1. **SmartArt decoration (the gallery picks the structure).** A layout chosen from a shape gallery asserts a relation the words never stated; list-decorating layouts add false claims, not polish — DETECT: proposed form has no licensing row in the §2.3 cue scan; chevrons/cycles/pyramids/converging arrows with a null-case source → FIX: renderer refuses unlicensed forms and falls back to the spaced list (hard invariant, §5).
2. **Decorative arrows = false causal claims.** Viewers systematically read arrows as function/causation [Heiser & Tversky] — an arrow changes what the audience believes the slide says — DETECT: any edge lacking a `provenance` source phrase; arrows between parallel list items → FIX: delete the arrow or find the source verb; inverse power move: when content IS causal, arrows are mandatory and verb-labeled.
3. **Forced hub-and-spoke.** The template default for "N items + 1 theme": looks organized while requiring zero detected relations; implies the spokes are peers AND all center-dependent — two claims rarely both true — DETECT: delete the hub mentally; if spoke meanings are unchanged, the hub is decoration (or the topic restated, which belongs in the title) → FIX: ranked list or Blueprint zones; hub-and-spoke legal only with dependency verbs in the source ("all four teams consume…").
4. **Fake cycle.** The circle asserts recurrence — DETECT: last step's output is not the first step's input; no "iterate/feeds back/in turn" cue → FIX: straighten into a flow.
5. **Fake funnel.** The taper asserts monotonic attrition — DETECT: no stage counts, or counts that don't shrink, or re-entry paths → FIX: process flow, or bars if comparison is the job.
6. **Equal-node lies.** Equal geometry asserts equal importance — DETECT: all boxes equal with no emphasisTarget; six evenly-happy journey stages; an all-full Harvey column; symmetric layout over asymmetric meaning → FIX: rank — hinge step ≥2× weight/accent; concede a matrix row; symmetry only where meaning is symmetric (§3.0).
7. **Spaghetti / hairball.** Crossings are the single worst aesthetic violation [Purchase] — DETECT: crossings > 0; >12 nodes; edge bundling proposed; >2 edge styles → FIX: cluster + inter-cluster edges only; split by zoom/scenario; appendix the full graph.
8. **Mixed-grammar hybrid.** Two relation classes on one canvas make every edge ambiguous and the slide unfalsifiable — DETECT: two of {flow, hierarchy, comparison, causation} encoded spatially at once; a second demoted annotation channel → FIX: §2.6 split rules (nest / sibling slides / one demoted channel).
9. **Notation dump.** UML furniture, BPMN glyphs, decision-analysis shape codes, legends on a presented slide = extraneous load for non-literate audiences — DETECT: activation bars, alt-frames, event circles, any legend, undefined acronyms in a presented spec → FIX: strip per form-catalog 1.2 / §3.3; restore only in sent-ahead artifacts (§7 R3).
10. **Working-artifact exhibition.** Mind maps, workshop CLDs, BPMN repositories, 4-lane research journey maps show process, not point — DETECT: form flagged divergent/analyst-grade; element count far over §2.5 caps; no single emphasisTarget nameable → FIX: extract the one transfer-worthy relationship (C5); full artifact to appendix.
11. **Self-flattering geometry.** Audiences discount known clichés — DETECT: presenter top-right in a 2×2; presenter as untested hub; petal diagram; all-win matrix → FIX: action-verb quadrants + defensible axes; delete-the-hub test; conceded rows (§3.4).
12. **Over-conversion for rhythm.** A diagram invented to break up text slides is the most damaging noise because it asserts false relations (design §7 #26 inverse-failure) — DETECT: demotionReport says null-case but a diagram was emitted anyway; rhythm cited as the reason for form choice → FIX: N8's legal moves (Statement promotion, split, table).

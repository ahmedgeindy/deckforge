> Sliced from the diagram-design master knowledge base (deduplicated, conflict-resolved synthesis of 3 research lanes: [Tax] diagram-taxonomy-selection · [Craft] diagram-craft-mechanics · [B2S] bullets-to-structure; 2026-07).
> This file: master §3 (construction mechanics + renderer portability). Cross-refs: §0/§2 → selection-procedure.md · §1 → form-catalog.md · §4 → emphasis-builds.md · §5–§6 → spec-contract-anti-patterns.md · §7–§8 → sources-conflicts.md. "design §…" / "structure §…" = the presentation-design / presentation-structure masters (normative upstream; on disk see presentation-design/references/).
> Confidence HIGH unless marked (MED)/(LOW); "derived" numbers come from legibility math, never citations (R15). Numbers on the 1280×720 basis.

# 3. CONSTRUCTION MECHANICS

## 3.0 Shared discipline (all forms)

Base rules live in design §5.2 (one flow direction · unidirectional verb-labeled arrows · zero crossings · uniform node schema, one abstraction level · ≤2 nesting · containment as quiet background · builds authored backwards) — reference, don't restate. This layer EXTENDS with layout-quality mechanics:

- **Trade order when constraints bite: crossings >> bends > symmetry** [Purchase et al., validated] — sacrifice symmetry to remove a crossing, never the reverse; max-symmetry layouts provably force crossings.
- **Symmetry only where meaning is symmetric.** Symmetric placement asserts equivalence (Gestalt); mirroring non-equivalent items is the layout version of the equal-card lie. Legitimate: mirrored split/join pairs bracketing a scoped block.
- **Rank discipline (Sugiyama, applied manually)**: every node gets a rank along the flow axis; same-rank nodes share one alignment line; edges span exactly 1 rank. An edge spanning >2 ranks means a missing intermediate concept or a mis-ranked node — fix the MODEL, not the routing. All sinks (outcomes) on the final rank.
- **Coordinate-count check (automatable)**: distinct x + distinct y positions ≈ ranks + 2; coordinate proliferation = jitter = free-placement failure (design §2 bans free placement).
- **Edge-length economy**: sibling edges equal length; ONE deliberately long edge reads as distance/difficulty — spend it on the painful handoff or the gap being closed; accidental long edges leak false meaning (derived, MED).
- **Routing purity**: orthogonal OR straight per diagram (upstream); diagonals reserved for tree fans and radial spokes; mixed families read unplanned.
- **Equal node sizes within a type** — size variation implies unwarranted importance; emphasis comes from accent/position/isolation, not box size [Camunda; upstream uniform schema]. (The deliberate ≥2× dominant element is the ONE sanctioned exception, and it is the emphasis target, §4.)

## 3.1 Swimlane

- Lanes are NAMED ROLES, never vague groups — the lane axis IS the second message; lane label = the noun the narration uses.
- Lane order is an argument decision, then a crossing-minimization decision: protagonist (whoever the claim is about) in the TOP lane (primacy band); remaining lanes reordered to minimize boundary crossings [Camunda]. Alphabetical/org-chart order wastes free information.
- **Happy path runs straight, on one horizontal line, ideally inside one lane**; deviations branch off it. If the happy path zigzags lanes, the lane ordering is wrong [Camunda].
- Strict L→R time axis; no leftward-exiting/rightward-entering flows; long returns become link markers (A→⊕ … ⊕→B), never snaking lines.
- Lane chrome loses the salience contest: quiet background bands or hairlines, label rotated or top-left; heavy borders compete with nodes.
- Handoff annotations: wait-time vs touch-time at the crossing; handoff count in the title (practitioner claim: most delay concentrates at blind handoffs, MED).

## 3.2 Sequence (beyond form-catalog 1.2's selection rules)

- Column math drives the lifeline cap: inter-lifeline width ≈ (1280−160)/(N−1); a 16px verb-phrase label needs ~180–260px → 5 lifelines max, 4 with long labels (derived).
- Collapse infrastructure into one "Platform" lifeline; phase bands (auth / payment) split >7 messages across slides.
- C4-dynamic "free-form" layout is liberty from lifeline geometry, NOT from the deck grid — numbered arrows snap to the locked architecture layout (§7 R9).

## 3.3 Decision tree

- **No universal yes/no side convention exists (verified absence)** — flowchart standards mandate only "label every branch Yes/No, never left/right." The enforceable rules: (a) CONSISTENCY — within one diagram the same polarity always exits the same side; (b) MAIN-PATH-STRAIGHT — the recommended path continues along the main axis, rejected branches drop away (straightness pre-encodes the verdict).
- MECE logically, equal spacing visually, NEVER equal emphasis: siblings share a rank with even gaps (logical peers); the recommended path gets accent + weight; dead branches muted at ~40–60% ink. A decision tree exists to kill branches.
- **Verdict rank**: all terminal outcomes aligned on one right-edge rank, uniformly formatted (outcome + consequence) — the audience's real task is comparing outcomes; alignment lets them scan the column without re-traversing the tree (derived from Sugiyama sink-alignment).
- Drop decision-analysis shape code (square=decision, circle=chance) for exec audiences — say it in words; restore for analyst artifacts (§7 R3).
- 15–20 nodes → summary tree + per-branch detail slides.

## 3.4 Comparison matrix

- **Row order = argument order**: criteria sorted by decision weight for THIS audience, most decisive on top (F-pattern hot band); the top 2 rows are the criteria the recommendation hinges on — say so in the title. Alphabetical order randomizes the argument.
- **Column order**: recommended option in the LAST column (reading terminus = verdict slot) or adjacent to the strongest rival; highlight exactly ONE column (tint or border = the deck accent); never highlight rows AND a column.
- **Cell-encoding ladder — one encoding per row, never mixed**: binary fact → check/–; graded qualitative → Harvey balls (4–5 fill levels max, legend defined once at micro role — fill levels are not self-evident); true quantity → the number itself (Tufte table rules upstream). Checkmarks for actually-graded qualities is lying by quantization.
- **Credibility discipline (highest-leverage matrix rule): never win every row.** Expert survey: 90%+ of Harvey-ball slides show the presenter all-full — read as bias, not analysis [Suster via storypitchdecks]. Concede 1–2 rows genuinely and neutralize in narration ("they win on X; X stops mattering when…"). The conceded cell is what makes the winning cells believed.
- Criteria must be the AUDIENCE'S decision criteria (buyer language, jobs-to-be-done), not the feature list — cherry-picked criteria are detectable and discount the whole exhibit; strategic arguments compare business model/distribution/pricing, not features.
- Petal diagrams: inherently self-flattering — avoid [expert survey].

## 3.5 Timeline / journey encoding channels

- Brehmer design space (representation × scale × layout; 20 viable combos) [TVCG 2017]. Slide defaults: **linear + chronological + unified**. Two useful non-defaults: SEQUENTIAL scale (even spacing by index) when durations are irrelevant; FACETED layout (parallel mini-timelines, shared axis) for comparing streams. Radial/spiral only for genuinely cyclical claims.
- **Declare the scale, and pick it by the claim**: duration/gap claims ("18 idle months, then 3 launches in a quarter") REQUIRE true-to-scale spacing — even spacing destroys the evidence; pure-order claims → sequential spacing is honest and cleaner. Extends the upstream lie-factor rule with claim-driven selection.
- **One encoding channel per variable, never double-booked**: sequence → horizontal position; emotion/friction → vertical position; phase/ownership → background band; magnitude → marker size only if nothing else uses size. Redundant channels on the SAME variable are good (the pit = lowest point AND accent); two variables on one channel is the error [Bertin-style channel logic].
- Journey slide = phase band + emotion curve (≤2 of NN/g's 4 lanes); the emotion curve is DATA — draw honestly, annotate only min and max.

## 3.6 Ecosystem / network

- Cluster first, then draw only inter-cluster edges; aggregate within-cluster links. Fit the boundary to the cluster, not the cluster to the box — pack members naturally, draw the zone around the resulting shape (inverse of template thinking).
- Hub emphasis = center position + ≥2× size + accent; peers on a ring at even angular spacing (free-form maps have no axes, so position is a free channel).
- **No edge bundling at slide scale**: research verdict — bundling looks neat but does not reliably improve readability (parameter-sensitive; trades clutter for faithfulness loss); a slide diagram that seems to need bundling has too many edges → aggregate to cluster-level [TVCG bundling literature].
- Label edges with the value exchanged ($, data, leads) — an unlabeled ecosystem edge is decorative string (extends the upstream verb-label rule to non-flow maps).

## 3.7 Renderer portability (pptx shapes / mermaid / SVG)

- **Design to the weakest renderer in the pipeline (pptx shapes)**: rectangles/rounded-rects; straight + single-elbow orthogonal connectors; uniform arrowheads; solid + dashed strokes; flat fills; horizontal text + 90°-rotated lane labels; opacity-based dimming. SVG-only features (curved edges, text-on-path, custom arrowheads, blobs, filters) must be flagged in the spec.
- **Auto-layout cannot carry an argument.** Mermaid/dagre/ELK optimize global aesthetics, not YOUR emphasis — they cannot guarantee hub-at-center, happy-path-straight, verdict-rank alignment, or stable positions across build steps. Auto-layout acceptable only when the argument is pure topology; any diagram where POSITION carries meaning (most, per §1–§3) needs coordinate-level control.
- **pptx connector traps**: python-pptx elbow routing diverges from PowerPoint's own (issue #946); connection points reliable only on rectangles; moved shapes drag connectors by offset. Rule for generated pptx: compute absolute connector geometry explicitly — connectors as dumb lines with explicit begin/end on a fixed layout; rectangle-family nodes only.
- **Text metrics differ per renderer/font**: size labels with 20–30% width headroom; hard-wrap at phrase boundaries at authoring time; never renderer auto-wrap or auto-shrink (shrink violates the type floor).
- **One coordinate frame**: absolute px on the 1280×720 grid (design 12-col + 8px baseline); grid-snapped integers; convert percentages at spec-emission time.
- **Build steps as first-class artifacts**: dimming via opacity or precomputed gray tokens (portable), never filters; each step exportable as its own static frame; the whole diagram grouped as one logical unit.

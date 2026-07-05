> Sliced from the diagram-design master knowledge base (deduplicated, conflict-resolved synthesis of 3 research lanes: [Tax] diagram-taxonomy-selection · [Craft] diagram-craft-mechanics · [B2S] bullets-to-structure; 2026-07).
> This file: master §1 (form catalog). Cross-refs: §0/§2 → selection-procedure.md · §3 → construction-mechanics.md · §4 → emphasis-builds.md · §5–§6 → spec-contract-anti-patterns.md · §7–§8 → sources-conflicts.md. "design §…" / "structure §…" = the presentation-design / presentation-structure masters (normative upstream; on disk see presentation-design/references/ — evidence-craft.md carries design §5.x, archetypes.md carries design §4.1).
> Confidence HIGH unless marked (MED)/(LOW); "derived" numbers come from legibility math, never citations (R15). Numbers on the 1280×720 basis.

# 1. FORM CATALOG

Format per entry: **RELATIONSHIP → WHEN → STRUCTURE → EMPHASIS → DON'T (misuse signals double as routing tests) → SLIDE vs DOC**. Shared craft (arrows, labels, containment, builds) lives in design §5.2 + construction-mechanics.md §3.0 and applies to ALL forms. Caps are working-memory/legibility proxies (MED, derived) — the hard rules are the upstream glance test and label floor.

Master fork [Lengler & Eppler process/structure coding]: **does the relationship unfold in TIME (1.1–1.7) or exist all-at-once (1.8–1.12)?**

## 1.1 Process flow (linear boxes + arrows)
- RELATIONSHIP: ordered steps with temporal/causal dependency, one actor or actor-agnostic — "how does it work/happen?"
- WHEN: mechanism or workflow where ORDER is the message. The default time-family form.
- STRUCTURE: L→R on 16:9; 3–7 steps (5±2 band); ≤2 decision diamonds (more → 1.12); >7 steps → split by phase or zoom, never shrink.
- EMPHASIS: the step the argument hinges on gets the accent + ≥2× weight — never equal boxes for unequal steps (design Tells-A2).
- DON'T: arrows over arbitrary order (it's a list — de-diagram, N2); steps loop back (→1.7); multiple owners matter (→1.3); dates matter (→1.4).
- SLIDE vs DOC: slide = the transfer subset; the exception-complete flowchart is a doc artifact.

## 1.2 Sequence / interaction diagram
- RELATIONSHIP: who says what to whom in what order — messages between 2–4 parties over time.
- WHEN: the message is the ORDER OF EXCHANGES (call chains, escalations, request/response, the eliminated round-trip).
- STRUCTURE: **default to C4-dynamic style — numbered accent arrows 1..n overlaid on the architecture diagram the deck already taught** — continuity beats new notation; one scenario per slide [c4model.com]. True UML lifeline form only when TIME ORDERING ITSELF is the claim (races, latency, round-trips): vertical lifelines + horizontal labeled arrows and nothing else; cap 3–5 lifelines (derived — column-width math; no authoritative cap exists, verified absence), ≤7–9 messages, split by phase with quiet horizontal bands. Number every message — numbers anchor narration and survive silent export.
- EMPHASIS: ONE exchange carries the argument (the failure, the extra hop) — accent it, gray the rest. Before/after flows: two panels, SAME actors in SAME order at identical scale (design Comparison #5).
- DON'T: activation bars, return arrows, destruction X, alt/loop frames on presented slides (unexplained notation = extraneous load; an alt-frame becomes two slides, a loop becomes "×N" on the label); one actor only (→1.1); order irrelevant (→1.9); merge relay-only actors — a forwarder adds a column but no information.
- SLIDE vs DOC: sent-ahead to engineers restores UML notation (upstream mode split, §7 R3).

## 1.3 Swimlane / cross-functional flow
- RELATIONSHIP: roles × sequence — "who owns each step and where does work cross a boundary." The one canonical compound form [C4].
- WHEN: ≥2 teams/roles/systems share a process AND handoffs, ownership gaps, or boundary friction are the point. If ownership is not the point, lanes are pure overhead → 1.1.
- STRUCTURE: horizontal lanes, names left; 2–4 lanes presented (5 absolute — derived from lane-height ≥95px legibility math; no authoritative BPMN cap exists, verified absence); 5–9 steps total; BPMN distilled to four elements ONLY — lanes, task boxes, ≤1 gateway diamond, sequence arrows. Full mechanics §3.1.
- EMPHASIS: **the cross-lane handoff ARROWS are the payload** — a swimlane's entire value over a flat flow is its set of boundary crossings; accent the crossing(s), count them in the title.
- DON'T: every step in one lane (→1.1); lanes as categories not actors (→1.8 layer stack or matrix); dominant rework loops (one loop-back arrow max, or reframe as 1.7); >4 lanes → merge minor roles or split by phase.
- SLIDE vs DOC: event circles, message-flow glyphs, artifact markers are doc notation; two organizations = two pools + dashed message flows only when the inter-org boundary IS the claim.

## 1.4 Timeline / roadmap
- RELATIONSHIP: events positioned on CALENDAR time — "when?" Distinct from 1.1: flow encodes dependency order (no dates); timeline encodes date position (no mechanism). Pick per the headline's verb ("depends on" vs "lands in Q3").
- WHEN: history→present→future, phased plan, milestone commitments. Roadmap = future-facing timeline with uncertainty.
- STRUCTURE: composition specced upstream (design §4.1 #7: single L→R axis, ≤6–8 milestones, TODAY accented, future dashed). This layer adds Brehmer's design space + claim-driven scale (§3.5): parallel workstreams → 2–3 stream rows (faceted, the timeline version of small multiples); a dependency-complete Gantt with critical path is a DOC artifact, never a slide.
- EMPHASIS: TODAY or the decision point; one accent.
- DON'T: no real dates (→1.1); even spacing when durations carry the claim (§3.5 honesty rule); >8 milestones (split by era); radial/spiral layouts unless the claim is genuinely cyclical (novelty tax).
- SLIDE vs DOC: roadmap futures decay in specificity (quarters→themes), never in density — uniform 3-year detail reads as fiction (derived, MED).

## 1.5 Journey map
- RELATIONSHIP: stages × inner experience of ONE persona pursuing a goal — sequence where the FELT quality is the argument.
- WHEN: pain→gain narratives, day-in-the-life, CX cases — only in service of a known decision [NN/g gate]; a journey map with no business question is wallpaper. Journey vs timeline: experiential/relative stages vs calendar/factual. Journey vs flow: use ONLY if emotion is load-bearing, else it's a process flow wearing makeup.
- STRUCTURE: composition upstream (design §4.1 #8: 3–6 stages, ONE emotion channel, peak stage dominant). NN/g's 4 stacked lanes (phases/actions/thoughts/emotions) compress to ≤2 on slides — phase band + emotion curve; thoughts become 1–2 verbatim callouts pinned at the curve's extremes (§3.5).
- EMPHASIS: the pit (or peak) of the emotion curve — usually the pain the proposal removes; annotate only min and max.
- DON'T: no persona ("users" in general → the emotion line is fiction, MED); flat emotion line (→1.1); multiple personas on one map (split); flattening the dip to look professional deletes the reason to act.
- SLIDE vs DOC: the full research map (persona rows, quotes, opportunities) is a slidedoc/appendix artifact; the slide is curve + stages + one accented point.

## 1.6 Funnel
- RELATIONSHIP: ordered stages + monotonic attrition — the only sanctioned sequence-carrying-quantity hybrid.
- WHEN: real counts drop stage-to-stage and the LOSS is the message (pipeline, hiring, activation). The shape asserts "fewer survive each step" — draw only when numerically true.
- STRUCTURE: 3–6 stages, each labeled with its real number AND stage-over-stage conversion %; horizontal reads better on 16:9 (MED, derived from L→R doctrine).
- EMPHASIS: the ONE stage where the argument lives (the leak).
- DON'T: no numbers (a process flow in a funnel costume — a false quantitative claim); stages without attrition; re-entry (→1.7). Precise cross-segment/period comparison → bars beat the funnel shape (route to design §5.3; §7 R6).
- SLIDE vs DOC: same form; doc adds the full cohort table.

## 1.7 Cycle & causal loop
- RELATIONSHIP: cycle = closed repeating sequence (the return arc is the point); causal loop diagram (CLD) = feedback among variables — reinforcing (R) or balancing (B) loops answering "why does this system behave this way?"
- WHEN: cycle — genuinely recurring loops (cadences, iteration, lifecycles); a flywheel = cycle + claimed self-reinforcement — be ready to say WHY each arc strengthens the next, else it's decoration. CLD — non-obvious dynamics (vicious/virtuous cycles, why fixes fail); justified exactly when interacting variables exceed the ~3–4 minds handle unaided [systems-thinking literature].
- STRUCTURE: cycle — 3–6 nodes, entry point marked (cycles have no natural top-left), one revolution = one narration pass. CLD — the strictest density cap of any form: ≤2 loops, ≤6–7 variables presented; label each loop R or B; variables must be quantities that can rise/fall ("morale", not "the team"); every link believed CAUSAL, never correlational — one spurious link poisons the diagram's credibility.
- EMPHASIS: the arc or node being argued; CLD builds loop-by-loop, one full lap narrated per loop.
- DON'T: the classic SmartArt failure — a linear process bent into a circle because circles look nicer: if the last step's output is not the first step's input, it is not a cycle (§6 #4); CLD notation on an unliterate audience with <60s dwell — pre-train R/B (structure G3) or downgrade to a 3-node plain cycle.
- SLIDE vs DOC: full causal model → appendix; slide gets ≤2 loops.

## 1.8 Hierarchy family: tree / org chart / layer stack / pyramid / driver tree
- RELATIONSHIP: containment, reporting, decomposition, or support — "A is composed of / governs / rests on / is driven by B."
- WHEN & WHICH: org chart = authority ("who reports to whom", T→B); tree = decomposition/taxonomy (incl. MECE issue trees); driver/logic tree = many-to-one causation with ≥3 MECE leaves converging on one outcome; layer stack = dependency-by-position (user-facing top, foundation bottom — design Blueprint #4, NO arrows needed); pyramid = ranked strata ONLY when lower layers genuinely support AND outnumber upper ones, else it's a ranked list drawn pompously (MED).
- STRUCTURE: ≤3 visible levels, ≤~12 leaf nodes; strict single-parent — if any node needs two parents it is not a tree; switch to network (1.10) before drawing a lie.
- EMPHASIS: accent the branch/layer being argued; gray the rest.
- DON'T: cross-links creeping in (→1.10); levels mixing kinds (a team next to a value); org chart when the argument is FLOW across the org (→1.3); mind maps are radial working artifacts, almost never slides (N7).
- SLIDE vs DOC: deeper trees → appendix full version with an information-scent pointer.

## 1.9 Architecture / topology
- RELATIONSHIP: components + connections — "what talks to what"; structure, not time.
- WHEN: system composition, integration story, "where the new piece goes."
- STRUCTURE: composition fully specced upstream (design §4.1 #3 + §5.2). This layer adds C4's selection rule: **abstraction-first, notation-second — pick the ZOOM LEVEL for the audience before drawing**: Context (one box + external actors — execs/partners) → Container (deployable units — engineering leadership) → Component (internals — the owning team). ONE level per slide; a Context→Container zoom across slides is a legitimate build. Code level (4) never belongs on a slide.
- EMPHASIS: the narrated/critical path or the NEW component (design §4.1 #3).
- DON'T: mixed zoom (a function next to a SaaS vendor); order-of-calls headline (→1.2); market actors, not systems (→1.10).
- SLIDE vs DOC: sent-ahead satisfies the full C4 self-standing checklist (design §5 mode fork).

## 1.10 Ecosystem / network / relationship map
- RELATIONSHIP: heterogeneous actors + value/influence exchanges — a network whose edges are relationships (money, data, influence), not wires.
- WHEN: "who are the players and how does value move" — market maps, platform strategies, stakeholders. A slide network exists to prove ONE structural claim (hub centrality, cluster existence, white space, chokepoint); if the claim survives as a hierarchy or flow, use that — node-link is the most expensive layout to read.
- STRUCTURE: ≤8–10 actors; edge types ≤2, declared (e.g., money solid, data dashed); cluster into labeled zones and draw only inter-cluster edges — the design ~6–12 cap applies at CLUSTER level (§3.6); position is a free channel: center = core, periphery = edge.
- EMPHASIS: YOUR position or the contested link; hub = center + ≥2× size + accent.
- DON'T: hairball (>12 nodes → cluster or appendix); untyped edges ("connected" is not a message); hub-and-spoke ("everything through US") is inherently self-flattering — must be literally true of the flows shown (MED, editorial; delete-the-hub test §6 #3); logo gardens — top-N per category, census in appendix, UNLESS crowdedness itself is the claim (then it's a Comparison panel, not a map).
- SLIDE vs DOC: full actor census and within-cluster edges → appendix.

## 1.11 Position maps: 2×2 / spectrum / Venn
- RELATIONSHIP: items located in a judged qualitative space — position, and the implied action per region, is the message.
- WHEN: 2×2 — exactly two independent dimensions that jointly matter; qualitative strategic tradeoffs; portfolio triage. Spectrum — ONE dimension suffices (don't inflate to 2×2). Venn — genuine shared-membership claims, 2–3 sets max.
- STRUCTURE: axes must be genuinely the two that matter AND orthogonal — correlated axes put everything on the diagonal and the matrix says nothing; ≤~7–8 plotted items; label quadrants with ACTION VERBS ("fund / kill / pilot"), not abstract nouns — a 2×2 is a decision engine, not a filing system.
- EMPHASIS: the item(s) the recommendation moves or keeps.
- DON'T: axes that are actually measured numbers → scatter plot (design §5.3) — pretending judgment is measurement is a lie-factor issue; 3+ dimensions genuinely matter (→1.13 matrix); every quadrant evenly populated with no action following (dashboard, not argument); axes chosen so you land top-right — audiences know the cliché and discount it (MED; mitigation: action-verb quadrants + honest placement + a defensible answer to "why these two axes?"); the Venn "sweet spot" center is equally clichéd (MED).
- SLIDE vs DOC: identical; doc may add the scoring rationale.

## 1.12 Decision tree / decision flowchart
- RELATIONSHIP: conditional branching — "if X, then path A" — a map of choices and consequences, not of time. Distinct from 1.1: flow = what WILL happen; tree = what happens UNDER EACH CONDITION.
- WHEN: triage logic, eligibility rules, "how we'll decide," option trees. Minimum ≥2 branch points — one branch is an "if" sentence, not a diagram.
- STRUCTURE: root left, outcomes right (L→R on 16:9; T→B only for shallow 2-level trees); binary yes/no questions at each node; ≤3 decision levels, ≤~7 leaves presented; full layout mechanics §3.3.
- EMPHASIS: the PATH the argument recommends (walking one accented path is the narration; other branches exist to show rigor).
- DON'T: branches rejoining repeatedly (a process with exceptions → 1.1 + one exception callout); probability/EV math on branches (analyst artifact — conclusion on the slide, tree in appendix); >3 levels fails the glance test structurally.
- SLIDE vs DOC: full rule set → appendix/doc; slide gets the summary tree.

## 1.13 Boundary case: comparison matrix (options × criteria)
- RELATIONSHIP: discrete alternatives evaluated on shared attributes. **A table, not a diagram** — base craft upstream (design §4.1 #5 Comparison + Tufte table rules, ≤~20 cells); this skill owns the DECISION and the argument-bearing mechanics (§3.4).
- ROUTING: matrix when >2 criteria matter or values are checkable facts; 2×2 when exactly two judged dimensions dominate; 2 options × 2 criteria is a sentence, not a table; exactly 2 options with rich structure → Comparison panels (design #5).

## 1.14 Adjacent forms routed elsewhere (so cue scans have a target for everything)
- **Problem→solution pairs** (cue row PROBLEM–SOLUTION): two-column paired layout, each problem aligned 1:1 to its solution — a mirrored-structure composition, not a diagram; compose per design Comparison/Blueprint grammar.
- **Waterfall** (quantified additive decomposition): a chart — route to design §5.3; only when the numbers genuinely add.
- **Harvey-ball scorecard**: the graded-qualitative encoding of the matrix (§3.4), not a separate form.
- **Geographic map**: only when position ON the map carries the message; otherwise it's a comparison table in costume (cue row SPATIAL).
- **Portrait/identity ("who/what is X")**: a Statement/Full-image/Showcase job — design §4.1; no relationship, no diagram (N1).
- **Concept map** (network with labeled links, many-to-many ideas): renders under 1.10 network rules; if it's single-parent it was a tree all along (1.8).

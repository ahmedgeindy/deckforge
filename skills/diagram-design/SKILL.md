---
name: diagram-design
version: 1.0.0
description: Design the internal structure of every information graphic on a slide — architecture, process flow, sequence, swimlane, timeline/roadmap, journey map, funnel, cycle/causal-loop, decision tree, comparison matrix, 2×2, ecosystem/relationship map — and rule on when content should NOT be a diagram at all. Use this skill whenever bullets, prose, or technical/business content must become a visual; whenever the user asks to "show the flow / architecture / timeline / process / options", "turn this into a diagram", "make this visual", or "how do I show this"; whenever a slide is a list of steps, roles, stages, decisions, or options — even if nobody says "diagram"; and ALWAYS between presentation-copywriting (locked words) and any rendering skill when a slide's archetype or evidence spec calls for an information graphic. Also use it to audit an existing deck's diagrams for invented structure, fake cycles, decorative arrows, and SmartArt decoration.
---

# Diagram Design

You sit between words and file. Pipeline: `presentation-structure` → `presentation-design` → `presentation-copywriting` → **diagram-design** → renderer → `presentation-qa`. Input: slides whose archetype/evidence spec calls for an information graphic (architecture, timeline, journey, comparison matrix, swimlane, sequence, process flow, decision tree, ecosystem, relationship map), the source technical/business content, and the deck token sheet (accent discipline). Output, per diagram: a renderable spec — form, nodes {label, detail}, verb-labeled edges with provenance, groups, layout hints, build steps, the ONE accent target — plus a **demotion report** (content that should stay text/list/table) and a **two-way trace table** (every element traces to source; every source claim traces to an element or the demotion report).

**Prime directive — extract structure; never invent it.** The content's relationship licenses the form — never the topic, never a template. Viewers read geometry as claims: an arrow asserts causation, a circle asserts recurrence, symmetry asserts equivalence — even when the author meant decoration. So every node, edge, and position must trace to explicit source words or author-confirmed facts; an empty skeleton slot is invented structure, and the slide dies. "No diagram" is a first-class output: a demotion honestly reported beats a decorated lie, because a false structure is a false statement the audience can't easily challenge — and once they catch one, they stop trusting the real ones.

Upstream is immutable: assertion titles, beat order, wording, tokens, grid are input, not material. A beat that cannot be diagrammed honestly is flagged back upstream, never silently "fixed" with a shape.

## Core model — seven ideas everything derives from

1. **A diagram earns its place only when a RELATIONSHIP is the message.** Diagrams add no information; they re-index the same facts by 2D location so cross-sentence inferences (order, path, ownership, dependency) become look-ups instead of working-memory computation — up to ~6× easier [Larkin & Simon 1987]. Name the relationship in one phrase ("A precedes B", "A contains B") before sketching; no phrase → don't diagram.
2. **The relationship TYPE selects the form.** Sequence→ordered axis, hierarchy→containment, tradeoff→orthogonal axes. Choosing by topic or gallery is the SmartArt failure: a shape asserting a relation the content doesn't have. Selection order is fixed: name relationship → shortlist forms → tiebreak → compose. Never reverse.
3. **Extraction, never invention.** Every element traces to source words ("then", "because", "owns") — untraceable elements are deleted or queried back to the author [Heiser & Tversky 2006].
4. **One relationship per canvas.** Two spatial grammars at once (timeline that is also an org chart) collapse the indexing advantage. The one canonical compound (roles×sequence) gets the one form built for it — swimlane — never an overlay; otherwise split.
5. **Design for transfer, not analysis.** The form that helped you think (full CLD, complete BPMN map) is usually wrong to show. Prune by what the room must DO after 30 seconds — decide, locate themselves, assign ownership, spot the leak; the analysis version goes to appendix.
6. **The audience's question routes; SQVID dials render.** who/what→hierarchy · when→timeline · how→flow · why-mechanism→causal loop · how-much→chart (OUT of scope — hand off). Then dial the SAME form: execs get simple/vision/delta; engineers get elaborate/execution/status-quo. Modulate, don't switch forms.
7. **The empirical ceiling is the target.** Matched flowcharts/swimlanes/timelines beat prose ~17% on speed [Passera 2018] — a correct conversion answers the title's question FASTER, not just prettier. That grounds the acceptance gate: tie → ship the list.

## When NOT to diagram (negative space — as load-bearing as the catalog)

N1 no nameable relationship → Statement · N2 independent parallel points → spaced list (chevrons around unrelated items assert relations that don't exist) · N3 true prose logic ("because, although, therefore") → prose/slidedoc — boxing deletes the connectives that carried the meaning · N4 quantity is the message → chart, not diagram (funnel is the only sanctioned hybrid, real numbers only) · N5 trivially known relationship → say it · N6 decoration test: headline alone loses nothing → cut · N7 working artifacts (mind maps, workshop CLDs) show process, not point → extract the one transfer-worthy relationship · N8 never convert for deck rhythm — legal moves are promote-to-Statement, split, or table.

**Escalation ladder** — climb only as high as content forces: prose → spaced list (≤4 parallel items) → table (≥2 items × ≥2 shared attributes) → diagram (TOPOLOGY only — the message lives in relations between items). Demotion is legal and reported ("kept as list: no relation cues") so QA can tell restraint from laziness.

## Reference files — read before the pass that uses them

| File | Contents | Needed for |
|---|---|---|
| `references/selection-procedure.md` | full core model + N1–N8 + ladder, the 7-step algorithm, linguistic-cue table, density thresholds, split rules, acceptance gates G-A–G-D, ghost spec | Steps 1–2 (every slide) |
| `references/form-catalog.md` | 14 forms: relationship / when / structure / emphasis / don't (routing tests) / slide-vs-doc | Step 3, before drawing any form |
| `references/construction-mechanics.md` | shared layout discipline (crossings >> bends > symmetry, rank discipline) + per-form mechanics + renderer portability | Step 3 |
| `references/emphasis-builds.md` | accent target per form, defocus ladder, build grammar, audience modulation | Steps 4–5 |
| `references/spec-contract-anti-patterns.md` | `diagramSpec` schema, renderer-runnable QA number set, hard invariants, 12 anti-patterns with DETECT→FIX | Step 6 + every QA pass |
| `references/sources-conflicts.md` | upstream contract pointers, 16 resolved conflicts, sources index, confidence flags | when rules seem to clash, or provenance is questioned |

## Step 0 — Lock the inputs

Capture before any work (ask if unstated): the **locked slide specs** (assertion titles are written FIRST, upstream — the diagram is derived from the title, never vice versa) · the **source content** (prose, bullets, docs — the only legal quarry for structure) · the **token sheet** (the deck accent this skill spends, one element per slide) · **delivery mode** (presented strips notation; sent-ahead restores UML/BPMN) · **audience** (routes tiebreaks and SQVID dials). No validated upstream spec → run the upstream skills first; diagramming an unstructured deck decorates a broken argument.

## Step 1 — Classify the relationship and gate (`selection-procedure.md`)

Run the seven-step pipeline per slide:

1. **Parse the assertion title's predicate** — the highest-precision cue: "flows through"→flow/swimlane, "depends on"→driver tree, "hinges on whether"→decision tree, "repeats"→cycle, "grew"→chart (hand off). Write the relationship phrase.
2. **Gate**: run N1–N8 and the ladder. Exit early to statement/list/table/chart/prose — report the demotion, don't hide it.
3. **Cue scan** the supporting prose against the linguistic-cue table; structural cues (repeated actor-subjects, dates in most bullets) outrank weak lexical ones. Cue scan and title disagree → ask the author, never average.
4. **Fork**: unfolds in TIME (flow, sequence, swimlane, timeline, journey, funnel, cycle) or exists ALL-AT-ONCE (hierarchy, architecture, ecosystem, 2×2, decision tree)?
5. **Family → form** via the catalog; run each candidate's DON'T list as routing tests BEFORE drawing; check density minima — below minimum → descend the ladder.
6. **Tiebreak** in priority order: audience's question → what the room does next (decide/assign/fix/build) → dwell budget (downgrade the FORM, never shrink the type) → slide-vs-doc → notation literacy.
7. **Set SQVID dials**, then ghost (Step 2).

Mixed structure → split rules: outer relation picks the slide form (max nesting 2); peer relations become sibling slides; at most ONE demoted annotation channel. Deck-level check: two flows already in a row → swap an equivalent form; the rule of three lives at the story layer, never as a diagram target.

## Step 2 — Ghost the exhibit (cheap falsifier + invention firewall)

Before investing in content, sketch `{title, relationship phrase, form family, named-but-unfilled item slots, emphasized-element slot, expected fact source}`. If the skeleton cannot be sketched from the title, the title has no provable claim — discovering that after rendering is ~10× costlier. Every ghost slot must later be filled by traced real content or the slide is cut; empty slots are exactly where invented structure sneaks in. Initialize the trace table here, not after rendering.

## Step 3 — Construct (`form-catalog.md` + `construction-mechanics.md`)

Apply the chosen form's STRUCTURE entry plus shared discipline: crossings >> bends > symmetry (sacrifice symmetry to kill a crossing, never the reverse); Sugiyama rank discipline (edges span exactly 1 rank — a longer edge means a missing concept: fix the model, not the routing); equal node sizes within a type; symmetry only where meaning is symmetric; one deliberately long edge = the painful handoff, spent on purpose. Design to the weakest renderer (pptx shapes: rectangles, single-elbow connectors, opacity dimming); flag SVG-only features. Auto-layout only when the argument is pure topology — dagre/ELK cannot guarantee hub-at-center, happy-path-straight, or stable build positions.

## Step 4 — Set the ONE emphasis target (`emphasis-builds.md`)

Every form has a default accent home (table below); the accent target is a required spec field, and there is exactly one. Defocus everything else via the three-state ladder (context ~40–60% ink · build history ~25% · grayed-full pre-state) — never a fourth salience level, never a second accent hue, never glows or badges.

## Step 5 — Author the builds (presented mode only)

Backwards from the finished diagram, so positions never shift. Deictic sync: each element appears the second it is first spoken, and narration uses the node's label VERBATIM. Build unit per form (swimlane builds chronologically along the flow, NEVER lane-by-lane — the story is the ball crossing lanes). Additive reveal when topology is the surprise; grayed-full + re-highlight when the gestalt is needed throughout. ≤5–7 steps; the LAST step adds the takeaway annotation at the point of proof — a build ending on mere completeness fizzles.

## Step 6 — QA gates, then emit the spec (`spec-contract-anti-patterns.md`)

Run the four acceptance gates: **G-A speed** (cold reader answers the title's question faster than from the list; tie → ship the list) · **G-B falsifiability** (reverse arrows, swap lanes, break the loop — if no perturbation makes the slide false, it encodes no structure → revert) · **G-C two-way trace** (no orphan elements, no silently dropped source claims) · **G-D stranger test** (text stripped, a stranger names the relation class in ~3s; needing to explain HOW TO READ IT = failure). Then run the renderer-runnable QA number set and the 12-item anti-pattern scan (fake cycle, fake funnel, forced hub, decorative arrows, equal-node lies, all-win matrix…). Emit the full `diagramSpec` — including `provenance` on every edge, `emphasisTarget`, `traceTable`, `demotionReport`, `appendixSplit` — and hand off to the renderer with hard invariants attached: no form the cue scan didn't license; no arrow without a directional source relation; overflow → split/downgrade, never shrink.

## Quick numeric reference (1280×720 basis; derived caps are bands, not citations — full tables in references)

- **Universal**: crossings 0 · bends ≤2/edge · edge styles ≤2 (+accent) · nodes ~6–12 · nesting ≤2 · labels ≥16px presented · distinct coordinates ≤ ranks+2 · build steps ≤5–7 · exactly one emphasisTarget · every edge verb-labeled + provenanced
- **Per form**: flow 3–7 steps, ≤2 diamonds · sequence 3–5 lifelines, ≤7–9 numbered messages · swimlane 2–4 lanes (5 absolute), lane ≥95px, 5–9 steps · timeline 6–8 milestones · journey 3–6 stages, one emotion curve · funnel 3–6 stages with real counts · cycle 3–6 nodes, entry marked · CLD ≤2 loops, ≤7 variables, all R/B-labeled · hierarchy ≤3 levels, ~12 leaves · decision tree depth ≤3, ≤7 leaves, verdict rank aligned · ecosystem ≤8–10 actors, ≤2 edge types · 2×2 ≤8 items, action-verb quadrants · matrix ≤5×7, ONE highlighted column, ≥1 conceded row
- **Accent target by form**: flow→hinge step · sequence→the asserted message · swimlane→the boundary-crossing handoff · timeline→TODAY/decision point · journey→the emotion pit · funnel→the leak · cycle/CLD→the argued arc/loop · hierarchy→the argued branch · architecture→the NEW component/narrated path · ecosystem→your position/contested link · 2×2→the item the recommendation moves · decision tree→the recommended path · matrix→the verdict column

## Scope notes

- **Slide archetype choice, tokens, grid, rhythm** → upstream `presentation-design`. This skill designs INSIDE the evidence region of an already-composed slide; it points at upstream rules (one accent, glance test, no free placement) and never restates or contradicts them.
- **QUANTITY messages** → data charts, owned by `presentation-design`'s evidence-craft ladder. Hand off; never draw a data chart here. The funnel is the single sanctioned hybrid, and only with real, monotonically shrinking numbers.
- **Words** → `presentation-copywriting`; titles and outline text are immutable here (node labels are extracted from source, not authored fresh). **Story and beat order** → `presentation-structure`.
- **Comparison matrix** base craft (Tufte table rules) is upstream; this skill owns the decision to use one and the argument-bearing mechanics (row order = argument order, verdict column, the conceded row).
- Rendering mechanics, fonts, export bugs → the renderer. This skill emits a spec; if asked to "just draw it", still run the gate and the ghost first — a demotion report on bullets is 10× cheaper than a rendered lie.
- Derived caps (lanes, lifelines, node counts) came from legibility math where authoritative sources are verifiably absent — present them as bands, never cite them to users as external authority.

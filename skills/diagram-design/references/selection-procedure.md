> Sliced from the diagram-design master knowledge base (deduplicated, conflict-resolved synthesis of 3 research lanes: [Tax] diagram-taxonomy-selection · [Craft] diagram-craft-mechanics · [B2S] bullets-to-structure; 2026-07).
> This file: master §0 (core model, negative space, escalation ladder — the gate) + §2 (the runtime selection algorithm). Cross-refs: §1 → form-catalog.md · §3 → construction-mechanics.md · §4 → emphasis-builds.md · §5–§6 → spec-contract-anti-patterns.md · §7–§8 → sources-conflicts.md. "design §…" / "structure §…" = the presentation-design / presentation-structure masters (normative upstream; on disk see presentation-design/references/).
> Confidence HIGH unless marked (MED)/(LOW); "derived" numbers come from legibility math, never citations (R15). Numbers on the 1280×720 basis.

# 0. CORE MODEL

Seven load-bearing ideas; when rules below seem to conflict, resolve by returning here.

**C1 — A diagram earns its place only when a RELATIONSHIP is the message.** Diagrams never add information to the prose they replace; they re-index the SAME information by 2D location, so related facts sit together and cross-sentence inferences (order, path, ownership, dependency, delta) become look-ups instead of working-memory computations — solutions up to ~6× easier than informationally equivalent sentences [Larkin & Simon 1987]. No load-bearing relationship → nothing to index spatially → the diagram is decoration. Before sketching, name the relationship in one phrase ("A precedes B", "A contains B", "A feeds back into A"). No phrase → §0.2 (don't diagram). [Tax P1, B2S P0.1]

**C2 — The relationship TYPE, never the topic or the template, selects the form.** Every diagram family is a spatial encoding of exactly one relationship class (sequence→ordered axis, hierarchy→vertical containment, tradeoff→orthogonal axes). Choosing by topic or gallery produces the SmartArt failure: a shape asserting a relationship the content doesn't have — a visual lie the audience decodes as confusion or filler. Selection order is fixed: name relationship → shortlist forms (§2) → tiebreak → compose per design-layer craft. Never reverse. [Tax P2; Zelazny's chain generalized to qualitative content, B2S P2.4]

**C3 — Extract structure; never invent it.** Viewers read diagram geometry as claims: arrows are read as function/causation, circles as recurrence, even when the author meant decoration [Heiser & Tversky 2006]. Every node, edge, and position must trace to explicit source words ("then", "because", "owns", "reports to") or author-confirmed facts; untraceable elements are deleted or queried. A false structure is worse than a plain list because it is a false statement the audience can't easily challenge. [B2S P0.2]

**C4 — One relationship per canvas; one message per exhibit.** A diagram encoding two spatial grammars at once (timeline that is also an org chart) collapses the locational-indexing advantage [C1; Mayer coherence, structure G3]. If the beat genuinely needs a canonical compound (roles×sequence), use the ONE form built for that pair (swimlane), never an overlay of two forms; otherwise split per §2.6. The exhibit's assertion title (structure G1) is written before the exhibit exists and fixes the question the diagram must answer. [Tax P4, B2S P3.1/P4.1]

**C5 — Design for transfer, not analysis: pick and prune by what the AUDIENCE must DO next.** Knowledge visualization for transfer (audience-facing) is a different artifact from visualization for exploration (analyst-facing) [Eppler & Burkhard]. The form that helped you think (full CLD, complete BPMN map, research journey map) is usually wrong to show. For each candidate ask "what should the room be able to do after 30 seconds — decide, locate themselves, assign ownership, spot the leak?" Keep only elements serving that act; the analysis version goes to appendix (layering, not deletion — design §5.2). [Tax P5]

**C6 — The audience's question routes; SQVID dials render.** The interrogative the slide's headline answers names the family [Roam]: who/what→identity/hierarchy · how much→chart (OUT of scope, design §5.3) · where→position/map · when→timeline · how→flow/mechanism · why→interacting forces (quantitative why→chart; structural why→causal loop, §7 R2). After form selection, five rendering dials adapt the SAME form to the room [Roam SQVID]: Simple↔Elaborate, Quality↔Quantity, Vision↔Execution, Individual↔Comparison, Delta↔Status-quo. Execs get simple/vision/delta (fewer nodes, what CHANGES accented); engineers get elaborate/execution/status-quo. Modulate, don't switch forms. [Tax P3/P6]

**C7 — The empirical ceiling is the design target.** When content genuinely carries contingency/role/chronology structure, matched flowcharts/swimlanes/timelines beat prose ~17% on speed and +0.54/5 on accuracy with no expertise reversal [Passera 2018]; graphics on comprehension overall g≈0.39 [Guo et al. 2020] (MED for generalization to decks). A correct conversion makes the title's question answerably FASTER, not just prettier — this grounds the speed gate (§2.7). [B2S P0.3]

## 0.1 When NOT to diagram (negative space — as load-bearing as the catalog)

- **N1 No nameable relationship → no diagram.** Lone fact → Statement/big-number archetype (design §4.1). A diagram around one fact dilutes it.
- **N2 Independent parallel points → spaced list.** Chevrons/cycles wrapped around unrelated items assert relations that don't exist; the audience wastes effort decoding the lie, then trusts real diagrams less. ≤4 items → design §3 list rules.
- **N3 True prose logic → prose.** Chained qualitative argument ("because, although, therefore") is sequential — exactly what sentences encode best [L&S inverse]. Boxing it deletes the connectives that carried the meaning; that's the memo/slidedoc lane (structure F13).
- **N4 Quantity is the message → chart, not diagram** (design §5.3 ladder). Funnel is the ONLY sanctioned hybrid, and only with real numbers (form-catalog 1.6).
- **N5 Trivially known relationship → say it, don't draw it.** Diagramming a 3-step commonplace spends a slide proving nothing; reads as filler (LOW, editorial).
- **N6 Decoration test.** If the diagram were replaced by its headline sentence alone and nothing were lost → cut. Diagram-level coherence principle (Mayer d≈0.86, structure G3).
- **N7 Working artifacts ≠ show artifacts.** Mind maps, workshop CLDs, BPMN repositories, research journey maps are divergent thinking tools; presenting one shows your process, not your point — extract the one transfer-worthy relationship [C5].
- **N8 Null-case content is never converted for rhythm.** When deck rhythm (design §4.2) demands relief on a list-heavy stretch, legal moves are promote-to-Statement, split, or table-if-second-attribute-exists — never add arrows. [B2S P5.6]

## 0.2 The escalation ladder (words-side complement to design §5.3's numbers ladder)

Climb only as high as content forces; every rung adds decoding overhead. **Rung 0 prose**: one claim, one quote, one conditional sentence — typography IS the visual. **Rung 1 spaced list**: ≤4 parallel items, one attribute each, no cross-relations (a list of 3 stays a list; >4 → group into categories or climb). **Rung 2 table**: earned by TWO dimensions — ≥2 items × ≥2 shared attributes, or contingency lookup [Wright & Reid 1973 (MED)]; a 1-attribute table is a padded list (demote); a table whose message is one cell is a Statement (promote). **Rung 3 diagram**: earned by TOPOLOGY only — the message lives in relations between items, licensed by the cue scan (§2.3). Rung-skipping and DEMOTION are both legal: a failed diagram falls back down (diagram→table→list) rather than being decorated harder, and the skill reports demotions explicitly ("kept as list: no relation cues") so QA can distinguish restraint from laziness. [B2S §2]

---

# 2. SELECTION PROCEDURE (the skill's runtime algorithm)

## 2.1 The seven steps

1. **Parse the assertion title** (locked upstream, structure G1). Its PREDICATE is the highest-precision cue in the pipeline because titles were QA'd upstream: "grew/declined" → chart (hand off, design §5.3) · "depends on / is driven by" → driver tree · "differs from / beats" → comparison · "consists of / spans / sits on" → hierarchy/Blueprint · "flows through / hands off" → flow/swimlane · "hinges on whether" → decision tree · "repeats / feeds back" → cycle/CLD · "connects / positions" → network/2×2. Write the relationship phrase [C1]. Multiple relationships → the one the HEADLINE asserts; others are appendix material [C4].
2. **Gate: should this be a diagram at all?** Run §0.1 N1–N8 and the ladder §0.2. Exit early to statement / list / table / chart / prose. Demotions are reported, not hidden.
3. **Cue scan on the supporting prose/bullets** (§2.3 table) to confirm or refine the relationship class; structural cues outrank weak lexical ones (§2.4). Cue scan and title disagree → ask the author, never average.
4. **Time-or-structure fork**: unfolds in time → forms 1.1–1.7; exists at once → forms 1.8–1.12.
5. **Family → form** via form-catalog §1 entries; run each candidate's DON'T list as routing tests BEFORE drawing ("would this signal fire?"). Check the density thresholds (§2.5) — below the minimum → descend the ladder.
6. **Tiebreakers, in priority order:**
   1. *Audience question* [C6]: what interrogative will THIS room ask? Same process: execs ask "who owns it / what changes" (→swimlane/delta-accented flow); engineers ask "how exactly" (→sequence/architecture); customers ask "what's it like" (→journey).
   2. *Next act* [C5]: decide (2×2, tree, matrix) · assign (swimlane, org) · fix (CLD, funnel-leak) · build (architecture, roadmap).
   3. *Density vs dwell slot* (structure G9): a form whose honest minimum exceeds the slide's dwell budget loses to the simpler family member (CLD → 3-node cycle; BPMN → 3-lane swimlane; full journey → emotion curve). Downgrade the FORM, never shrink the type (design overflow rule).
   4. *Slide vs doc* (structure F13): dependency-complete Gantts, full CLDs, research journey maps, level-3+ architecture, full rulebooks are READ artifacts — slide carries the transfer subset + information-scent pointer.
   5. *Notation literacy* (structure G3 pre-training): UML/BPMN/R-B notation only for audiences that read it; otherwise distill to boxes/arrows/lanes, or spend one pre-training beat.
7. **Set the SQVID dials** [C6], ghost the exhibit (title + skeleton + item slots + emphasized element — the cheap falsifier: if you cannot sketch the skeleton from the title, the title has no provable claim), then emit the spec (§5) and hand off to design-layer composition (§2.6 grid recipes, §5.2 craft, §4.3 builds).

## 2.2 Deck-level check before finalizing

Selection runs per-beat but must consult the deck's archetype rhythm (design §4.2): two flows already in a row → swap in an equivalent form (numbered phase table) rather than a third flow. Cardinality always comes from the content — the rule of three lives at the story layer, never as a diagram-layer target (§7 R10).

## 2.3 Linguistic-cue table (detection grammar for latent structure)

Grounded in Meyer's expository text-structure research (writers organize informational text into a small set of connective-signaled structures; the connectives are machine-detectable). Match on stems, case-insensitive; lists indicative, not exhaustive.

| Relation | Word/pattern cues | Latent structure | Target form |
|---|---|---|---|
| SEQUENCE | first, then, next, after, before, finally, step, phase, "once X…" | ordered steps, one actor | 1.1 process flow |
| CHRONOLOGY | dates, years, quarters, "by Q3", since, ago, milestone, roadmap | events on a time axis | 1.4 timeline (dates present → timeline; absent → flow) |
| CAUSATION | because, leads to, results in, drives, causes, therefore, due to, enables, prevents | cause→effect chain or many-to-one | causal chain (1.1) or driver tree (1.8); arrows REQUIRED — they carry the causal semantics |
| COMPARISON | vs, whereas, unlike, however, more/less than, trade-off, "compared to" | items rated on shared dimensions | design Comparison #5; >2 items × >2 criteria → 1.13 matrix; exactly 2 judged dimensions → 1.11 |
| CONDITION | if, then, unless, otherwise, "depending on", eligibility, "either…or" | branching logic | 1.12 decision tree; ONE branch stays a sentence |
| ROLES + ACTIONS | named actors as subjects ("X submits… Y approves…"), owner, handoff, escalate, RACI verbs | actors × steps with handoffs | 1.3 swimlane — empirically strongest for "who does what" [Passera] |
| COMPOSITION | consists of, contains, comprises, part of, types of, reports to, subset | tree / layer membership | 1.8 hierarchy family; position encodes membership, no arrows |
| PROBLEM–SOLUTION | problem, risk, pain, gap → solution, fix, mitigation, "to address this" | paired mapping | two-column paired layout, 1:1 aligned (1.14) |
| RANKING | most important, top, primary, critical, ranked | ordered list, unequal weights | ranked layout — lead item 2–3× weight (breaks equal-card tell); quantified → bars (design §5.3) |
| CYCLE / FEEDBACK | recurring, loop, iterate, "which in turn", "feeds back", flywheel | closed loop | 1.7 — only if last output = first input |
| INTERACTION / EXCHANGE | integrates with, calls, talks to, sends, pays, supplies | components/actors + typed links | 1.9 architecture or 1.10 ecosystem |
| SPATIAL | regions, markets, sites, geographies | location-anchored facts | map only when position carries the message; else a table in costume |
| QUANTITY | numbers, %, growth, share, ratio | data | HAND OFF → design §5.3 ladder |
| DESCRIPTION (null) | "such as", features, "including", parallel noun phrases, no connectives | flat set | stays list/table (§0.2); NEVER diagrammed (N8) |

## 2.4 Structural cues outrank weak lexical ones

Writers under-signal — low-skill writers omit connectives even when deep structure is present [Meyer, MED]. Repeated actor-subjects across bullets → swimlane even without "handoff" vocabulary; a date in >half the bullets → timeline; parallel "X: description" bullets → list/table; wildly mixed grammatical types → no single structure, split (§2.6). Score both signal classes; take the stronger; when they conflict (steps that also carry dates: is the message ORDER or SCHEDULE?), ask the author.

## 2.5 Density thresholds (minimum content to EARN each form; below minimum → descend the ladder)

| Form | Minimum to earn it | Cap before split |
|---|---|---|
| Spaced list | 2 items | ≤4 items |
| Table | ≥2 items × ≥2 shared attributes | ≤20 numbers / ~7×4 cells |
| Process flow | ≥3 genuinely ordered steps | 5–7 boxes, then phase-group |
| Sequence | ≥2 actors exchanging ≥3 messages | ≤5 lifelines, ≤7–9 messages |
| Swimlane | ≥2 roles AND ≥1 handoff | ≤4 lanes, ≤9–10 steps |
| Timeline | ≥3 dated events AND dates matter | 6–8 milestones |
| Journey | persona + ≥3 stages + non-flat emotion | 3–6 stages |
| Funnel | quantified monotonic drop-off | 3–6 stages |
| Cycle | closed loop verified | ≤6 stations |
| CLD | >3 interacting variables, all causal | ≤2 loops, ≤7 variables |
| Hierarchy/tree | ≥2 levels × ≥2 siblings | ≤3 levels, ~12 leaves |
| Driver tree | ≥3 MECE leaves → 1 outcome | ≤2 levels presented |
| Architecture | ≥3 components + typed connections | ~6–12 nodes (design cap) |
| Ecosystem | ≥4 actors + ≥1 typed exchange | ≤8–10 actors, edge types ≤2 |
| 2×2 | exactly 2 independent judged dimensions | ≤~8 plotted items |
| Decision tree | ≥2 branch points | depth ≤3, ≤7 leaves |
| Matrix | >2 criteria × ≥2 options, checkable | ≤5 options × ≤7 criteria |

## 2.6 Mixed-structure content — split rules (priority order)

1. **One relation type per canvas** [C4]. Arrows/positions can mean one thing per diagram before readers guess per-edge; blended diagrams are also unfalsifiable — no single question tests them.
2. **Nesting rule**: when relations NEST ("old process vs new process" = comparison OF two sequences), the OUTER relation picks the slide form (Comparison panels), the inner renders inside panels, identically framed. Max depth 2; three levels → split slides. Detection: comparison governing sequence → comparison-of-flows; sequence governing condition → flowchart with one diamond; causation governing quantity → driver tree with numbers at leaves.
3. **Peer relations → sibling slides**: two same-level relation classes = two messages = two exhibits, each with its own title; the detector proposes the split, the structure layer's storyline owns whether both survive.
4. **Dominant-relation heuristic** for genuinely entangled prose: diagram the relation the TITLE needs; demote the other to ONE annotation channel — sequence → numbering inside nodes; causation → one highlighted arrow; ownership → node-border coding. Never more than one demoted channel; two demotions needed → return to rule 3.

## 2.7 Acceptance gates (accept/revert tests per conversion)

- **G-A Speed test (primary)**: a cold reader must answer the title's question FASTER and at least as accurately from the diagram as from the original list/prose; tie → ship the list (a tie means there was no search cost to remove). Automatable proxy: simulate 3 audience questions (title's + two follow-ups — "what must I do if X?", "who is responsible for Y?", "what happens after Z?"); each must be answerable by pointing at ONE location, not scanning regions. [Larkin & Simon; Passera]
- **G-B Reversibility/falsifiability**: mentally reverse every arrow, shuffle the sequence, reparent a node, swap two lanes, break the loop. If NO perturbation makes the slide false, the diagram encodes no structure → revert to list. Each perturbation should contradict an identifiable source sentence — that sentence is the edge's provenance record.
- **G-C Coverage/no-invention audit**: two-way trace — (a) every element maps to source words (no invention, C3); (b) every source claim appears, is routed to notes/appendix, or is explicitly cut (no silently dropped qualifier — structure G5). Orphan elements or unrouted claims → reject the spec.
- **G-D Form-level stranger test**: with all text stripped, a zero-context viewer identifies WHICH relation the skeleton encodes (flow? hierarchy? comparison?) in ~3s. Ambiguous skeleton → fix layout, not labels. Form recognition is the pre-attentive payoff the whole conversion buys — familiar forms beat exotic ones for exactly this reason; a form family the audience has never seen needs teaching, and taught conventions move the computation back onto the viewer plus overhead (the explanation test: if the finished diagram needs a spoken paragraph to explain HOW TO READ IT — its conventions, not its content — it has failed; simplify the form or descend the ladder).

## 2.8 The ghost spec (intermediate artifact between selection and emission)

Storyboard each diagram slide as title + skeleton BEFORE investing in content: `{title, relationship phrase, form family, item slots (named but unfilled), emphasized-element slot, expected source of facts}` — the diagram-layer instance of the McKinsey ghost deck (structure §4 step 5). Two jobs:

- **Cheap falsifier**: if the skeleton cannot be sketched from the title, the title has no provable claim or the evidence doesn't exist — discovering that after rendering is ~10× costlier. The ghost also pre-decides the relation type, preventing the renderer from defaulting back to bullets.
- **Invention firewall**: every ghost slot must later be filled by traced real content or the slide is cut — empty slots are exactly where invented structure (§6 #1–#5) sneaks in. The G-C trace table is initialized at ghost stage, not after rendering.

The ghost feeds the deck-level ghost-deck review upstream; storyline approval happens on ghosts, full specs are emitted only for surviving slides.

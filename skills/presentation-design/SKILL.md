---
name: presentation-design
version: 1.0.0
description: Transform a validated presentation outline into a world-class visual design spec — typography hierarchy, grids, design tokens, slide archetypes, evidence craft, AI-tell elimination — before any file is rendered. Use this skill whenever a presentation outline, storyboard, or deck structure is ready to be turned into slides; whenever the user asks to design, restyle, polish, beautify, or "make slides look good/professional/human"; whenever a deck "feels AI-generated", templated, or repetitive; and ALWAYS between presentation-structure (which locks the story) and any rendering skill like document-skills:pptx (which builds the file) — even if the user only says "now build the deck". Also use it to run a design review on an existing deck's visual system.
---

# Presentation Design

You sit between story and file. Upstream, `presentation-structure` produced a validated outline — beats, assertion titles, evidence intents, chapters. Downstream, a rendering skill (`document-skills:pptx`, an HTML deck system, or a project deck skill) builds the artifact. Your job is the visual transformation layer: decide how each locked message becomes *visible* — typography, hierarchy, composition, color, evidence treatment — and prove the decisions in a design-review report before a single slide is rendered.

**Prime directive — the story is immutable.** The outline's messages, wording, order, and evidence intents are input, not material. You never add, cut, reorder, or rephrase content (if a beat genuinely cannot be designed, flag it back upstream — don't silently fix it). You improve only visual communication, and only where a named check objectively fails. Never redesign for redesign's sake: variation that doesn't map to a change in meaning is noise, and noise reads machine-made just as loudly as uniformity.

If no validated outline exists yet, stop and run `presentation-structure` first — designing an unstructured deck polishes a broken argument. If downstream siblings exist (`presentation-copywriting`, `diagram-design`, `presentation-qa`), hand off to them in pipeline order; otherwise pass the spec straight to the renderer.

## Core model — seven ideas everything derives from

1. **Design serves the locked story.** Layout is chosen by each beat's *rhetorical job* (claim, proof, comparison, pivot, rest), never by its content shape ("it has 4 bullets"). Content-shape-driven layout is the root cause of AI slop.
2. **Hierarchy = where eyes go, engineered.** Six salience levers — scale, contrast, weight, position, isolation, grouping. Every slide spec states its intended 1st/2nd/3rd-look order; if you can't write that order down, the slide isn't designed yet.
3. **One dominant visual idea per slide.** Exactly one dominant element (≥2× the visual weight of anything else). Two focal points = two slides. Slides are free; attention is not.
4. **The Glance Test is the acceptance test.** A presented slide must land its point in ~3 seconds — audiences cannot read and listen at once. Word counts are proxies; the 3-second test is the rule.
5. **Delivery mode is decided FIRST.** Presented (glanced, sparse, builds, narration carries detail) vs sent-ahead/read (self-standing, denser, builds flattened, full labels) flips nearly every downstream rule. A hybrid "slideument" fails both audiences — if the deck is both, spec two artifacts.
6. **Two-layer rule.** Tokens (palette, type roles, spacing, grid, title anchor, icon style) are invariant deck-wide; composition (archetype, density, alignment, focal scale) varies — and only when meaning changes. A deck can be 100% token-consistent and 0% monotonous. This resolves consistency-vs-variety permanently.
7. **Emphasis is a budget with a ledger.** Hero numbers 1–2/deck, dark slides 2–4, exactly one S.T.A.R. moment, ≤1 accented element per slide, ≤1 decorative effect per slide. Spent everywhere, emphasis is wallpaper.

Master test for every recurring pattern: **"Did the content choose this, or did the template?"**

## Reference files — read before the pass that uses them

| File | Contents | Needed for |
|---|---|---|
| `references/design-tokens.md` | type ramp, spacing scale, color roles, radius/elevation, brand extraction, numeric floors & budgets | Step 2 |
| `references/grid-composition.md` | 12-col grid, alignment, asymmetry, whitespace, reading flow, typography hierarchy, slidedoc rules | Step 4 |
| `references/archetypes.md` | the 11 archetypes (when/composition/type/don't/mode), selection procedure, rhythm rules, builds | Steps 3–4 |
| `references/evidence-craft.md` | screenshots, diagrams, charts/tables, icons, speaker-notes routing | Step 4 (evidence slides) |
| `references/ai-tells.md` | 26-tell blacklist with detection heuristics + fixes | Step 5 |
| `references/audience-overlays.md` | executive / presales / marketing dials | Step 1 |
| `references/design-review.md` | severity ladder, 24 checks, report output structure | Step 6 |
| `references/sources.md` | 24 resolved source conflicts, sources index | when rules seem to clash |

## Step 0 — Lock the inputs

Capture before any design work (ask if unstated; offer defaults):

1. **Outline** — the validated storyboard (immutable). If it lacks per-beat evidence intents or layout hints, work from the assertion titles.
2. **Delivery mode** — presented-stage / presented-lit-room / screen-share / sent-ahead. This is the single highest-leverage input. "Both" = two artifacts.
3. **Audience overlay** — executive / presales-technical / marketing-external (see `references/audience-overlays.md`).
4. **Brand assets** — logo, palette, typefaces, an existing deck or site to extract from. Branding is *extracted, never invented*.
5. **Constraints** — venue light (drives dark vs light), renderer target, existing template obligations.

## Step 1 — Brand extraction → token sheet

Map the brand into the token roles (`references/design-tokens.md`): brand primary → `accent` (or a structural color if too saturated for text-scale use); brand neutrals → bg/surface/ink; brand type → the 6-role ramp. Verify every text pairing ≥4.5:1 and marks ≥3:1 mechanically — when a brand color fails, shift its *tone*, never its hue. Logo at bookends only (title + close); per-slide logos and footers are chartjunk. No brand assets supplied → derive a temperament from domain + audience and present it as a *proposal* (2–3 named theme directions with rationale), never a fait accompli — and never default to the safe mid-palette or the AI-signature violet gradient.

Emit the token sheet once per deck: type-role table (for the declared mode), spacing scale, color roles with hex + contrast results, radius/elevation, grid. Every downstream size/gap/color references a role name, never a raw value.

## Step 2 — Beat classification → archetype map

For each outline beat: classify its rhetorical job — context / claim / proof-quantitative / proof-artifact / comparison / structure / chronology / experience / pivot / rest / boundary — then map job → archetype (`references/archetypes.md`): claim→Statement, quantitative proof→Evidence, artifact proof→Showcase, structure→Blueprint or Architecture-diagram, chronology→Timeline, experience→Journey, comparison→Comparison, mood→Full-image, rest→Minimal, boundary→Chapter-divider. A beat carrying two jobs splits into two slides — never compress. Incoming bullet lists are un-designed input: classify the relationship first (sequence? hierarchy? alternatives?), then choose sequence-of-builds / diagram / spaced list.

## Step 3 — Rhythm pass

Check the archetype sequence as a whole: run-length ≤2, no archetype >40% of content slides, no two consecutive slides at the same fill level (after two dense evidence slides, a Statement or Minimal breathes). Alternate split sides. Act boundaries visible (divider or statement at each turn). Place the deck's ONE S.T.A.R. moment — a stripped-bare full-bleed or lone giant statistic at the outline's planned peak — and allocate the emphasis budgets (hero numbers, dark slides, full-bleeds, the single sanctioned gradient). Deliberate echo is good when content is genuinely parallel; the echo must map to a parallel in meaning.

## Step 4 — Per-slide composition spec

For each slide emit (see `references/grid-composition.md` + `references/evidence-craft.md`):

- `beatRef` (immutable outline pointer) · `rhetoricalJob` · `archetype`
- `assertionHeadline` — full sentence, ≤2 lines, largest text, top-left (except centered archetypes)
- `dominantElement` + `lookOrder` [1st/2nd/3rd] + `fillLevel` (sparse/medium/dense)
- `accentSpend` — the one accented element, or none
- `gridPlacement` — 12-col spans from the archetype's recipe
- `evidenceSpec` — chart type by message, screenshot framing from the decision tree, diagram flow/nodes/connectors
- `buildSteps` (presented only — what appears on which narration beat; diagram builds authored backwards)
- `speakerNotes` — ALL secondary detail routes here; the canvas keeps only headline + the one evidence
- `appendixRefs` — information scent for deferred depth

Hard invariants for the renderer: only token values; only archetype layouts snapped to the grid (no free placement); overflow triggers split-or-cut, never shrink-to-fit; no element that cannot state its job.

## Step 5 — AI-tell elimination pass

Run every detection heuristic in `references/ai-tells.md` against the spec — all 26, not a sample: archetype runs, equal-card walls, icon grids, repeated hero metrics, evenly-stretched sparse content, container gradients, pills, colored left-borders, decorative lines, centered-text overload, emoji bullets, identical bullet rhythm, browser chrome everywhere, mid-palette safety, and the inverse failure (random variation — >2 font families, palette drift, wandering title anchor — is equally machine-made). Each hit becomes a finding with the triggering heuristic value.

## Step 6 — Design-review report (before rendering — this is the deliverable gate)

Produce the report per `references/design-review.md`: header (mode, overlay, brand source) · token sheet · deck map (one row per slide: beat, job, archetype, dominant element, look order, fill, accent, builds — rhythm violations visible by inspection) · findings severity-ordered (Blocker/Major/Minor/Cosmetic), each naming the check it fails, in mechanism form ("For this audience, X risks Y because Z") · budgets ledger · disposition log (fixes applied only where a check objectively failed; rejected changes logged with "no objective quality increase").

Show the report to the user and get approval before rendering — feedback on a deck map is 10× cheaper than on rendered slides.

## Step 7 — Hand off to the rendering layer

Pass the approved spec + token sheet to the renderer (`document-skills:pptx` or the project's deck system). Insist on the hard invariants (Step 4). After rendering, request the renderer's visual QA sweep AND verify spec fidelity: does each built slide deliver its specified dominant element, look order, and archetype? Structured widgets (diagrams, annotation markers, build steps) get flagged for targeted QA — generic pipelines silently drop them.

## Quick numeric reference (1280×720 basis; full tables in references)

- **Acceptance**: 3-second Glance Test per presented slide · squint/thumbnail survival · titles-alone tell the story
- **Type**: ≤3 sizes visible/slide · ≤2 weights/deck (+1 display) · headline:body ≥2.5:1 · presented floors body 20 / label 16 / micro 13 · line length 40–65 chars · weight floor 400 projected
- **Words**: presented ≤~40 visible · statement ≤6 · exec overlay ≤30 · slidedoc 100–200/page (250 ceiling)
- **Color**: 1 accent, ≤1 accented element/slide · text ≥4.5:1, marks ≥3:1 · never pure #000/#FFF · concept-colors never reassigned
- **Budgets/deck**: hero numbers 1–2 · dark slides 2–4 · S.T.A.R. exactly 1 · signature gradient ≤1 · full-window screenshot frame ≤1 · caps role 1 · card-grid moments 1–2
- **Rhythm**: archetype run ≤2 · no archetype >40% · alternate fill levels · mode change ≈ every 10 min
- **Evidence**: screenshot annotations ≤3–4 · chart annotations ≤2 · diagram ~6–12 nodes, ≤2 nesting, zero crossings · bars AND lines start at zero (persuasion default) · table ≤~20 numbers

## Scope notes

- Story, wording, slide order → upstream (`presentation-structure`). Copy polish → `presentation-copywriting` if present. File mechanics, fonts embedding, export bugs → the renderer.
- This skill emits a *spec and report*, not a file. If the user asks you to "just build it", still emit the deck map + token sheet first (compressed is fine), get a nod, then render — the gate exists because rendered-slide feedback is expensive.
- When improving an EXISTING deck: same pipeline, but the current deck is the input spec; every proposed change must cite the failed check; log what you deliberately left alone.

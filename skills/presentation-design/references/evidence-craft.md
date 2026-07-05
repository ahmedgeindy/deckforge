> Extracted from the presentation-design master knowledge base (research synthesis, 2026-07-03).
> Source tags: [Duarte] [Zen] [AE]/[Tufte] [DS] [NNg]/[Figma] [PC] [Tools] [Tells] [Ev] — see sources.md.
> Numbers on a 1280x720 basis (px~pt) unless stated.

## 5. EVIDENCE CRAFT

**Unifying mechanism — subtractive emphasis:** one deck-wide focus/defocus recipe (accent on the focus + gray/dim/mute on the rest) applied identically to charts, screenshots, and diagrams [Ev §4]. Measured payoff: decluttering raised perceived professionalism; adding focus raised clarity, aesthetics, AND recall of conclusions (Northwestern Visual Thinking Lab via Knaflic) [Ev §3.3].

### 5.1 Screenshots [Ev §1]
Framing decision tree:
1. Is the mobile form factor part of the claim? → device frame.
2. Is "this is a real shipped web product" part of the claim? → minimal browser chrome (traffic-lights + URL bar; never full OS furniture). Max ~1 full-window framing per deck — chrome on every screenshot is an AI tell [Tells-D2 (LOW-MED)].
3. Otherwise → frameless, cropped to the proving region + 10–20% context padding; hairline border if backgrounds can merge.

Rules: capture at 2×/Retina, scale down never up; screenshot text at final size ≥ deck label size (else crop tighter, don't shrink); fixed display width across the deck — vary crop, not scale; one elevation effect (shadow OR backdrop OR frame), identical every time; annotations ≤3–4, rectangles for regions (no gap to target), arrows only for small targets (tip lands exactly on the element), >2 callouts → numbered markers + side rail; one annotation accent = the deck accent; dim/desaturate non-relevant regions instead of adding markers; multi-step flows = one screenshot per step across slides, never one dense capture. De-identification: solid-fill boxes only (blur/pixelation are reversible); premium move is realistic demo data so nothing needs redacting; blur is an attention tool, never a privacy tool.

### 5.2 Diagrams [Ev §2]
- One flow direction; arrows mean ONE thing per diagram (data flow XOR dependency), every line unidirectional + specific-verb label; bidirectional arrows split into two; uniform arrowheads/stroke/style — any variation must carry declared meaning.
- One abstraction level per canvas; uniform node schema; acronyms defined; protocols only for technical audiences.
- Zero crossings; orthogonal routing in dense diagrams, straight lines in sparse — never mixed.
- Boundaries as background containment (light/dashed, label top-left); ≤2 nesting levels.
- **Progressive builds authored BACKWARDS**: duplicate the finished diagram, delete the last-explained elements, repeat — guarantees positions never shift between steps [Ev §2.5, Gunn]. Elements never move between steps. Alternative: full structure grayed, re-highlight the narrated region per step (better when the whole shape is needed for context).
- Split by abstraction zoom or by scenario, never by halving the canvas. Complexity is controlled by layering, not deletion: full-detail version → appendix.

### 5.3 Charts & data [Tufte, Duarte §11, Ev §3]
- **Chart type follows the message**: trend → line; category comparison → bar (horizontal when names are long); part-to-whole → bar/stacked-bar (pie only for a 2–3-slice big/small gestalt — see conflict R9); correlation → scatter; distribution → histogram; many series → small multiples (identical scales, comparison within one eyespan), never a spaghetti chart or slide-sequenced comparison [Ev §3.1, Tufte-B4]. Boring familiar forms beat exotic ones on a glanced slide.
- **Conclusion-first**: chart title = the takeaway sentence; the audience verifies rather than decodes [Duarte §11, Zen #13, Ev §3.4].
- **Direct-label everything; kill legends** (eye ping-pong + working-memory round-trip per series) [Tufte-B11, Ev §3.2]. ≤7 series absolute; on slides 1 accent + rest gray.
- **Annotate the proof point**: the number/event proving the headline gets a label at its exact data location, accent-colored, second-largest text on the slide [Tufte-B11, Ev §3.4]. Duarte's five annotation moves: highlight, label, bracket (delta/average), delineate (goal line exposing the gap), explode (subcategory breakout) — "do the math for the viewer" [Duarte §11]. ≤2 annotations per slide chart.
- **Axis honesty**: bars start at zero, always (length encoding). Lines too, by default, in persuasion decks — truncation inflates perceived trends for lines as much as bars, and disclosure does NOT remove the bias (Correll et al.) [Ev §3.5]; truncate only when zero is meaningless (temperature, index), then label the range prominently. Lie factor 0.95–1.05; no 3D, no area-scaled icons for linear quantities [Tufte-B3]. Set the axis before setting the message.
- **Declutter**: erase borders, backgrounds, most gridlines, tick minutiae; gray any kept axis; smallest effective difference for every secondary layer [Tufte-B1/B6]. Slides get ~half the data density of the document version. Round to ≤3 significant figures.
- Source + units in micro type on the slide [Tufte-B9]. Every chart must answer: compared to what? caused by what? — if it can't, the problem isn't design [Tufte-B9].
- Tables: for ≤~20 exact numbers or lookup; whitespace + light horizontal rules, no spreadsheet grid, right-aligned numbers, uniform precision, highlight the assertion cell; table+sparkline hybrid covers value AND direction at glance resolution [Tufte-B12/B13/B5].

### 5.4 Icons & illustration
Icons only where they disambiguate faster than a word (platform logos, file types, direction). One style, one stroke weight, one size, one color (ink or gray — not accent), semantically exact. Never icon-per-bullet, never the lightbulb/rocket/gear/handshake cluster, never emoji as bullets [Tells-A3/D3/C2, PC §6.2, Tools-B5]. Illustration, if any: one quiet recessive style deck-wide. Replace icon abstractions with tiny real artifacts (mini-chart, logo, photo crop) where possible.

### 5.5 Speaker notes & handout — the three-artifact division of labor
A presentation is three artifacts, never merged [Zen #8, AE-A5]:
1. **Slides** (canvas): assertion headline + the one piece of visual evidence. Nothing else.
2. **Speaker notes** (`speakerNotes` field): sub-assertions, background, derivations, equations, full citations, "we'll also want to say…" content. Routing detail here is what makes the canvas rules achievable — it is the escape valve, not a dumping ground.
3. **Handout/appendix**: notes-page PDF (slide on top, prose beneath — sentence headlines make it self-orienting [AE-A5]) or a proper slidedoc/document for dense multivariate evidence, engineering tables, long causal chains [Tufte-B10 "route, don't fight"]. Content beyond ~250 words/page wants to be a document, not slides [Duarte §4].
The skill emits all three streams; a request to "just add it to the slide" is answered by routing to stream 2 or 3 with an information-scent pointer on the slide [NNg §5].

---

> Extracted from the presentation-design master knowledge base (research synthesis, 2026-07-03).
> Source tags: [Duarte] [Zen] [AE]/[Tufte] [DS] [NNg]/[Figma] [PC] [Tools] [Tells] [Ev] — see sources.md.
> Numbers on a 1280x720 basis (px~pt) unless stated.

## 1. DESIGN-TOKEN SYSTEM

Spec deck-level tokens BEFORE any per-slide layout [Duarte §5, Zen #23, DS]. Per-slide decisions then only choose arrangement, never re-invent the system.

### 1.1 Type ramp — roles, not sizes
Six roles maximum [DS §1.1, all four design systems converge]:

| Role | Job | Presented (1280×720) | Read/sent-ahead | Weight | Line-height | Tracking |
|---|---|---|---|---|---|---|
| display | hero numbers, statement slides | 60–100 | 48–72 | 600 (or 1 display weight) | 1.0–1.15 | −1%…−3% |
| headline | slide-title assertion | 36–54 | 28–40 | 600 | 1.05–1.2 | −1%…−2% |
| title | section labels, chart titles | 22–28 | 18–22 | 600 | 1.2–1.3 | 0 |
| body | content text | 20–24 | 16–18 | 400 | 1.35–1.5 | 0 |
| label | axis, captions, kickers | 16 | 13–14 | 400/500 | 1.3–1.4 | +2–4% if caps |
| micro | sources, footnotes | 13–14 (floor) | 12 (floor) | 400 | 1.3 | +1–2% |

Sources: sizes [DS §6 (S), PC §8, AE-A2 (28pt headline, 18–24pt body floors), Tools-A4 (Pitch 32/24 floors)]; metrics [DS §1.3, PC §1.2, Figma].

Ramp rules (these de-amateur type faster than font choice [PC §1.2]):
- **Line-height inverse to size**: ~1.1× at display → ~1.45× at body. Never one global line-height token [DS §1.3, all four systems].
- **Tracking flips sign**: negative ≥40pt, positive on small caps/labels [DS §1.3 (M), PC §1.2].
- **Adjacent-role ratio ≥1.33**, headline:body ≥2.5:1 [DS (S), PC §1.1]. Big jumps make hierarchy pre-attentive; close sizes create mush [Zen #19]. Skip steps from a modular scale (ratio ≤~1.4 base [Figma]) rather than inventing values.
- **≤3 sizes visible per slide; ≤2 weights per deck** (400/600; +1 optional display weight). Weight can substitute for size at equal point size (label/value pairs in KPIs and tables) [DS §1.3, PC §1.3]. Weight floor 400 for projected decks — 300 dies on projectors; light display only for retina-read decks [PC §1.3, conflict PC-1].
- **Overflow is structural, never typographic**: content that would push type below its floor triggers slide-split or cut, never shrink-to-fit [Tools-A4].
- Sans-serif for projection [AE-A2, Zen #12]; serif body permissible in read decks [Duarte §9 (MED)]. Max 2 typefaces (or 1 superfamily) [Tools-D]. Prefer higher x-height faces for distance legibility [Tools-D].

**Mode remap mechanics.** Projected↔read is a ROLE REMAP (one table swap), never per-slide resizing — mirrors Carbon's productive(14px)/expressive(16px) split [DS §1.2/§6]. The projected:read ratio is ~1.33–1.5×. Display/headline roles may flex with content length (Carbon expressive model); label/micro roles stay FIXED deck-wide so axes and sources are consistent [DS §1.3]. The spec emits the role table once per deck + a `mode` field; every text element references a role name, never a size.

### 1.2 Spacing scale
- 8px mini-unit; fixed nonlinear token scale, e.g. **8, 16, 24, 40, 64, 96** on 720p [DS §2, Carbon]. Forbid off-scale values — consistent gaps are the single strongest cue of professional production, detected pre-attentively even by non-designers [Tools-A3]. Allow one explicit optical-nudge escape hatch [DS §7].
- **Grouping rule (numeric)**: between-group gap ≥2× within-group gap; cluster-gap ≤½ section-gap [NNg §4.1, DS §2]. A glancer decodes slide structure from spacing alone; uniform spacing everywhere = zero perceivable structure.
- Card/container padding = one token, identical on every card in the deck [DS §2].

### 1.3 Color roles (~10)
`bg` · `surface` (one tone-ladder step off bg) · `ink` (near-black, never #000) · `ink-muted` (secondary text) · `accent` · `on-accent` · `positive` · `negative` · `warning` · `hairline` [DS §4 (S)]. Every filled role declares its on-partner up front [M3 via DS]. Light/dark theme = remap the role layer only, never touch slide content [DS, Fluent alias model].
- **One accent**, reserved for "the point" — never decoration [Duarte §7, NNg §1.2, PC §4.1 — strongest cross-lane convergence in the corpus]. Semantic chart colors ≠ accent; each meaningful color carries exactly one meaning [PC §4.2].
- Near-black ink + off-white surface + 2 grays + 1 accent is the convergent neutral chassis [PC §4.1]. 60-30-10 distribution: 60% neutral, 30% structural/brand, 10% accent [Figma §7].
- Contrast: design to **4.5:1 for all text** (even where WCAG "large text" allows 3:1 — projector wash-out costs a stop); 3:1 for chart marks, hairlines, icons [DS §6, WCAG]. M3 tone-gap mechanics (≥40 tone ≈ 3:1, ≥50 ≈ 4.5:1) give a mechanical verification [DS §4 (M)].

### 1.4 Radius / elevation / effects
- ONE card radius + one smaller chip radius; nested radius = outer − padding [DS §5]. Radius is a brand-temperature dial (sharp = institutional/precise; round = warm/consumer) — pick per deck personality, apply everywhere [DS §7, Tools-B11].
- Depth via surface-tone steps + hairlines, not shadows (shadows vanish or muddy on projectors) [DS §5]. If shadow used: ONE neutral level deck-wide [Ev §1.1, Tells-B6].
- Decorative-effect budget: ≤1 per slide; every depth cue must answer "what does this separate or emphasize?" [Tools-C2].

### 1.5 Spec-emission contract (what a slide spec must contain)
Per deck: `mode`, `audienceOverlay`, `tokens` (type-role table, spacing scale, color roles + hex, radius/elevation, grid), `themeDirection` + rationale, `budgetsLedger` (hero/dark/full-bleed/gradient allocations).
Per slide: `beatRef` (immutable outline pointer), `rhetoricalJob`, `archetype`, `assertionHeadline` (full sentence), `dominantElement`, `lookOrder` [1st/2nd/3rd], `fillLevel` (sparse/medium/dense), `accentSpend` (the one accented element, or none), `gridPlacement` (column spans from the 12-col grid), `evidenceSpec` (chart/screenshot/diagram parameters per §5), `buildSteps` (presented only — what appears on which narration beat [Zen #24]), `speakerNotes` (all secondary detail routed here [AE-A5]), `appendixRefs` (information scent for deferred detail [NNg §5]).
Hard invariants the renderer must enforce: only token values for sizes/gaps/colors; only archetype layouts (no free placement); overflow → split/cut, never shrink; no element without a stated job [Zen #1, Tools-A2/A3/A4].

---


## 6. COLOR & BRANDING

### 6.1 Build on the EXISTING brand — extract, don't invent
The skill preserves branding; it never invents a new identity or redesigns for its own sake. Extraction procedure:
1. Extract from supplied brand assets: primary hue(s), neutrals, typeface(s), radius/shape temperament, logo treatment.
2. **Map extracted values into the token roles of §1.3** — brand primary usually becomes `accent` (or a structural 30% color if too saturated for text-scale accents); brand neutrals become bg/surface/ink; brand type maps to the role ramp. Branding lives in the token layer; the composition rules above are brand-agnostic [DS Fluent alias model, Tools-B10].
3. Verify contrast mechanically (4.5:1 text, 3:1 marks) — adjust tone, not hue, when a brand color fails on a given surface [DS §4].
4. Brand once: logo on title/closing slides only. Per-slide logos, footers, watermarks are chartjunk and habituate into invisibility by slide 3 [Tufte-B2, Zen #2, NNg §3]. (Sent-ahead decks may keep a quiet page footer — present identically everywhere or absent entirely; inconsistent footers are an AI tell [Tells].)
5. Palette-swap over a fixed house structure is the inverse of craft: hold palette steady WITHIN the deck, vary structure with meaning [Tools-B10].

Edge cases:
- **Multiple brand colors**: pick ONE as accent (the most saturated that passes contrast at label scale); others become structural 30%-tier colors or are dropped for the deck — never rotate accents per slide [NNg §1.2].
- **Brand color fails contrast as text/accent**: keep the hue, shift the tone until the pairing passes (M3 tone-gap mechanics) — a darker/lighter step of the brand hue is still the brand [DS §4].
- **Dark-first brands**: the brand dark becomes `ink` in the light theme and `bg` in the dark theme; verify the sequential-palette direction flip [DS §4].
- **No usable brand assets supplied**: derive palette temperament from the content's domain and audience (Pitch discovery step) [Tools-B10] and present it as a proposal, not a fait accompli — never default to the mid-palette median [Tells-E3] or the ~260–290° gradient hue [Tells-B1].

### 6.2 Accent discipline & semantics
- One accent, one job, ≤1 accented element per slide — the key bar, the verdict word, the delta [Duarte §7, PC §4.1, NNg §1.2].
- Concept-colors: assign each recurring concept one color and never reassign it mid-deck — the audience learns the grammar within minutes [Zen #23].
- Semantic colors (positive/negative/warning) appear ONLY with semantic meaning and are visually distinct from the accent [PC §4.2, DS §4].
- Chart palettes: ordered categorical sequence taken in order; sequential = monochromatic ramp, theme-aware (on dark themes lightest = largest); diverging only for signed data; never a gradient as a data encoding [DS §4, Carbon].

### 6.3 Dark vs light contexts
Palette follows room light, not fashion [Zen #11, C1]: lit room / screen-share / read deck → dark ink on light ground; dark hall/stage → light on near-black (tinted gradient, never flat #000 — glare, camera blooming, crushed blacks) [Zen #22 (MED)]. Within a light deck, dark slides are punctuation (dividers, the one climactic statement), 2–4 per deck [PC §4.3]. Dark theme = token-layer remap (§1.3), with sequential-palette direction flipped [DS §4].

---


## APPENDIX — CONSOLIDATED NUMERIC FLOORS & BUDGETS (1280×720 basis; quick reference for the generator)

**Acceptance tests**: 3-second Glance Test per presented slide [Duarte §2] · squint/thumbnail survival [NNg §1.6] · titles-alone tell the story [NNg §2].

**Type**: 6 roles max · ≤3 sizes/slide · ≤2 weights/deck (+1 display) · adjacent-role ratio ≥1.33 · headline:body ≥2.5:1 · headline ≤2 lines, ≤10 words, full sentence · body line-height 1.35–1.5, display 1.0–1.2 · tracking −1…−3% ≥40pt, +2–4% caps-labels · presented floors: body 20, label 16, micro 13–14 · read floors: body 16, micro 12 · weight floor 400 projected · line length 40–65 chars · ≤3 hierarchy levels visible.

**Words**: presented slide ≤~40 visible (proxy) · statement ≤6 · dividers/title ≤15 · exec overlay ≤30 · slidedoc 100–200/page, 250 ceiling.

**Spacing/grid**: 8px mini-unit · scale 8,16,24,40,64,96 · margins 64–80 (≥5% width) · gutters 24–32 · 12 columns · between-group ≥2× within-group · card padding = one token.

**Color**: ~10 roles · 1 accent, ≤1 accented element/slide · 60-30-10 · text ≥4.5:1, marks ≥3:1 · never #000/#FFF pure · concept-colors never reassigned · ≤7 chart series, 1 accent + gray rest.

**Budgets per deck**: hero numbers 1–2 · dark slides 2–4 · signature gradient ≤1 · full-bleeds budgeted · S.T.A.R. moment exactly 1 · decorative effects ≤1/slide · transition types 2–3 · full-window screenshot frame ≤1 · caps role 1 · card-grid moments 1–2.

**Rhythm**: archetype run ≤2 · no archetype >40% · no two consecutive slides at same fill level · mode change ≈ every 10 min · alternate split sides.

**Evidence**: screenshot annotations ≤3–4 · chart annotations ≤2 · diagram ~6–12 nodes (legibility-capped, derived) · nesting ≤2 · zero line crossings · table ≤~20 numbers · 3 sig figs · bars AND lines start at zero (persuasion default) · lie factor 0.95–1.05 · crop padding 10–20% · stat slides ≤3 numbers.

> Extracted from the presentation-design master knowledge base (research synthesis, 2026-07-03).
> Source tags: [Duarte] [Zen] [AE]/[Tufte] [DS] [NNg]/[Figma] [PC] [Tools] [Tells] [Ev] — see sources.md.
> Numbers on a 1280x720 basis (px~pt) unless stated.

## 2. GRID & COMPOSITION

### 2.1 The 16:9 master grid
- **12 columns** (divides by 2/3/4/6 — beats Carbon's 16 for 3-up slides [DS §3 conflict]), margins **64–80px (≥5% of width)** all sides, gutters 24–32px, 8px baseline rows [DS §3 (S), PC §3.1]. Decks need proportionally larger margins than UIs — slides are viewed whole, like posters.
- Images/charts snap to grid cells at fixed aspect ratios (16:9, 4:3, 3:2, 1:1, 2:1) — no freeform sizing [DS §3, Carbon].
- **No free placement, ever**: every slide instantiates a named archetype snapped to this grid [Tools-A2]. Free placement is where amateur decks fail (misalignment, accidental hierarchy).
- Content never touches the margin; layout recomputes when content changes — never a hole or a crush [Tools-A1].

### 2.2 Alignment discipline
- Every element shares an edge or centerline with something else [Figma §4.3]. Left-align text blocks to column edges; ragged-right. Centered multi-line body text is a composition error [NNg §4.3, Tells-C1].
- Title anchor position constant deck-wide (same x/y) — positional consistency is craft, prevents jumping between slides [Tells-A7 nuance, NNg §4.3]. Vary the title's LANGUAGE, never its chrome.

### 2.3 Asymmetry doctrine
- Default content layout: asymmetric **~40/55 split** (text column / visual) with deliberate gutter; alternate sides across consecutive slides for rhythm [PC §3.2]. Asymmetry creates a scan path (entry → payoff); it follows importance ratios (2/3–1/3), never applied as its own template [Tells rule 6].
- **Centering reserved for single-focus moments only**: title slide, chapter dividers, statement slides, lone hero number [PC §3.2, Zen C2]. Centering is the zero-decision layout; all-centered decks read as templates [Tells-C1]. Do not average: slightly-off-center statements look like mistakes [Zen C2].

### 2.4 Whitespace doctrine
- Whitespace is an active element — purposeful emptiness, the cheapest and first hierarchy tool [Zen #4 "Ma", Duarte §8, NNg §1.5]. Isolation amplifies: the moat of space around the key element scales with its importance [PC §3.1].
- Whitespace is **clustered, not rationed**: generous on one side of a dominant element beats mathematically even distribution, which reads sterile/machine-made [Tells-A6]. Statement slides: content ≤~⅓ of canvas area (MED, derived) [Zen #4].
- Prefer whitespace over boxes for grouping; enclosure (common region) is the strongest but costliest cue — spend containers only on genuinely parallel comparable units [NNg §4.2]. Boxes-inside-boxes is the classic corporate failure.
- When a presented slide feels empty, that is usually correct — never add to "balance" [Duarte §8].

### 2.5 Reading-flow engineering
- Entry top-left (LTR); takeaway in the top-left band; nothing critical bottom-right (systematically skipped) [NNg §1.4]. In split layouts the LEFT column is read first — driver left, illustration right.
- Design for the **layer-cake scan**: assertion headline = stripe #1, one evidence block beneath. F-pattern is what eyes do when design gives no cues — you don't choose whether people scan, only whether scanning works [NNg §2].
- Reading order must be recoverable from layout alone: top-left entry, Z or F path, exit at the takeaway [PC §3.3]. Front-load: first 2 words of any heading carry its meaning [NNg §1.4].
- Squint/thumbnail test verifies all of it: blur the slide; if the takeaway doesn't survive, the hierarchy failed [NNg §1.6 — the best automatable check].

### 2.6 Grid-span recipes per archetype (12-col, 720p basis) [derived from §2 + §4]
| Archetype | Canonical spans | Notes |
|---|---|---|
| Full-image | full-bleed (ignores margins by design) | text in quiet zone, thirds intersections |
| Statement / big-number | content centered within cols 3–10 | vertical optical center, slightly above geometric center |
| Architecture-diagram | headline band + diagram cols 1–12 within margins | side rail cols 10–12 if narrated text needed |
| Blueprint | zones on 3/4/6-col splits per structure | zone gaps = section token |
| Comparison | panels cols 1–6 / 7–12, equal | shared headline band; delta marker spans the gutter |
| Evidence | headline band; chart cols 1–8 or 1–12; annotation inside chart area | source line in micro at bottom-left |
| Timeline | axis spans cols 1–12; markers on grid columns | date labels below axis, fixed size |
| Journey | path spans cols 1–12; stages on equal column groups; peak stage widened | emotion channel = vertical position within rows |
| Showcase | screenshot cols 1–8 (~55–65% canvas), side rail cols 9–12 | or screenshot cols 3–10 centered when no rail |
| Minimal | single element in cols 2–7 (off-center) | whitespace clustered right |
| Chapter-divider | centered, cols 4–9 | kicker above title, one spacing token apart |
These are defaults, not straitjackets — a spec may deviate one step when content demands it, and must note why (composition-layer freedom [Tools-A5]).

---


## 3. TYPOGRAPHY HIERARCHY

- **Headline = full-sentence assertion**, the takeaway itself, ≤2 lines, ≤10 words / ~60 chars, verb included, largest text on the slide, top-left [AE-A2 empirically backed: recall gains attach specifically to the sentence headline, Alley et al. 2006; Garner & Alley 2013 p<.01; PC §1.4, Ev §3.4]. Topic labels ("Q3 Results") force the audience to derive the point — banned. If a title wraps, break at a phrase boundary, don't let the renderer wrap mid-phrase [PC §1.4].
- Title FORM follows slide function — question when posing one, verdict sentence for a takeaway, bare number when the number is the message. Uniform syntactic templates ("Six Words, With Colon") on >80% of slides is an AI tell [Tells-C4].
- **Line length**: body 40–65 chars/line; enforce via text-box width (~50–60% of canvas), not manual breaks [Figma, PC §2.1, Tools-D ≤12 words/line]. Full-width text on 16:9 ≈ 90–120 chars = unscannable.
- **Hierarchy levels ≤3 visible per slide** (dominant/supporting/ambient) [Duarte §6, Zen #10]; Tufte's Columbia analysis: ≤2 levels for content, deep nesting signals rank 4–5 simultaneous ways and buries fatal facts [Tufte-B10].
- Emphasis via **weight, case, size — never color** for text emphasis ("text rainbow" forbidden) [Duarte §10]; bold only the 2–4 load-bearing words, never whole sentences [NNg §1.3]. One all-caps role max in the system (letter-spaced kicker) [Tells-C5]. No underline/italic for emphasis on screen [PC §1.3].
- **When text IS the visual**: a 3–6-word phrase set at display scale is processed as an image (single fixation) — a legitimate visual, not a text slide [Zen #18, C4; Duarte §9]. Typography + placement + whitespace do all the work; nothing else on the canvas.
- Bullets: last resort. Reclassify every incoming list as (a) a sequence across slides/builds, (b) a relationship diagram, or (c) if unavoidable, ≤4 items separated by whitespace, no bullet glyphs, each item front-loaded [Zen #21 — strongest cross-source agreement; AE-A3]. Vary item lengths — identical bullet rhythm (word-count CV <0.2) is the single most reliable text tell [Tells-C3].
- Vague quantifiers ("significant", "substantial") replaced by numbers [Tufte-B10].

### 3.1 Slidedoc typography (the read-deck ruleset) [Duarte §10 (MED-HIGH)]
When mode = sent-ahead at document density (exec pre-reads, leave-behinds):
- Rigid 5-level hierarchy set once in the master and never violated per page: Title → Subtitle → Subheads → Body → Callouts/footnotes, each with fixed treatment (titles always same case/position; footnotes always one style).
- Body 50–70 chars (~12–15 words) per line; any text block wider than ~2 lines is set in columns on a real 3–4-column grid — the grid IS the navigation when no presenter exists.
- Emphasis by weight/CASE/size/italics, never color ("text rainbow" fails colorblind readers and cheapens the accent).
- Density budget: 100–200 words/page typical, 250 hard ceiling — beyond that, write a document [Duarte §4, conflicts-2].
- Richer palette permitted (up to ~5 colors + 2 neutrals) and serif body acceptable — reading distance, not projection [Duarte §9/§10].
- One idea per page still applies; active voice.

---

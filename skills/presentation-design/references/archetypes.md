> Extracted from the presentation-design master knowledge base (research synthesis, 2026-07-03).
> Source tags: [Duarte] [Zen] [AE]/[Tufte] [DS] [NNg]/[Figma] [PC] [Tools] [Tells] [Ev] — see sources.md.
> Numbers on a 1280x720 basis (px~pt) unless stated.

## 4. SLIDE ARCHETYPE PLAYBOOK

Layout is selected by rhetorical job, then composed within the system grid. Internal components of an archetype stay pixel-identical across the deck; the archetype mix varies with meaning [PC §5.1, Tools-A2].

### 4.1 The eleven archetypes

Each entry: WHEN (rhetorical job) / COMPOSITION / TYPE & COLOR / DON'T / MODE VARIANT.

**1. Full-image** — [Duarte §12, Zen #7]
- WHEN: emotional anchor, S.T.A.R. moment, opening/closing mood, the one concrete image that makes an abstract claim real [Zen #6 picture-superiority: strongest for concrete common subjects at delayed recall — exactly the presented condition].
- COMPOSITION: one high-res image, full-bleed edge-to-edge (native to 16:9, removes the frame-within-frame document feel); subject on rule-of-thirds power points; text placed in the image's quiet/low-detail zone; subtle scrim only if contrast demands (scrim is signal-preserving, not decoration) [Zen #7/#14]. Never tile multiple small images — fragments attention.
- TYPE & COLOR: ≤1 line of text, headline or display role, light-on-dark or dark-on-light per the image's quiet zone; no accent needed — the image is the emphasis.
- DON'T: stock metaphors, images without a referent in the claim, low-res enlarged imagery, more than one image.
- MODE: identical in both modes; sent-ahead may add a micro-role caption/credit.

**2. Statement** — [Zen #18, C4]
- WHEN: act boundaries, pivots, the claim the audience must quote afterward; the compression to ≤6 words IS the value.
- COMPOSITION: one phrase at display scale, centered, symmetric, content ≤⅓ of canvas — vast clustered emptiness. Processed as an image in a single fixation [Zen #18].
- VARIANT — big-number: one numeral 60–100pt + one context line at label scale that makes the magnitude concrete (a comparison or equivalence — "dress up the number") [Zen #20, PC §5.2]. Multiple KPIs → multiple slides (presented) or a stat band ≤3 numbers [PC §5.2].
- TYPE & COLOR: display role, dramatically larger than any other archetype (type-scale jump ≥2×); accent optionally on the operative word or the numeral.
- DON'T: supporting bullets beneath the phrase; slightly-off-center placement (reads as a mistake [Zen C2]); repeating hero numerals across the deck (budget 1–2 at the argument's peak [Tells-A5]).
- MODE: identical; the sent-ahead variant may add one micro-role source line for a statistic.

**3. Architecture-diagram** — [Ev §2]
- WHEN: "how the system works," component relationships, integration story.
- COMPOSITION: one flow direction held throughout (L→R for process/request/data — suits 16:9; T→B for hierarchy/layers); nodes at ONE abstraction level, uniform node schema {name + type}, identical node type sizes; containment boundaries as background (light fill or dashed hairline, label top-left, nodes stay dominant); ≤2 nesting levels; zero line crossings — reroute or split; ~6–12 nodes before split (derived; the real cap is node-label legibility ≥ label role size). Split by abstraction zoom or scenario, never by halving the canvas.
- CONNECTORS: every line unidirectional + labeled with a specific verb (never "uses"); uniform arrowheads/stroke; orthogonal routing in dense diagrams, straight in sparse — never mixed; arrows mean ONE thing per diagram (data flow XOR dependency).
- TYPE & COLOR: node labels at label role minimum; the narrated/critical path gets the accent, everything else ink/gray (focus/defocus recipe §5.0).
- DON'T: mixed granularity (a system next to a function); bare or bidirectional arrows; legends on presented slides; heavy group boxes competing with contents.
- MODE: presented → progressive build (authored backwards, §5.2) or grayed-full + re-highlight; narration replaces labels. Sent-ahead → full C4 self-standing checklist: title, scope, key/legend, labeled arrows, defined acronyms.

**4. Blueprint** — structured framework/plan (derived composite: [Duarte §6 proximity/hierarchy, Ev §2.4 layer stacks, Tells-A2 ranking])
- WHEN: "how the pieces fit" — frameworks, operating models, phased plans, pillar structures; the outline beat is a taxonomy WITH internal structure, not a flow.
- COMPOSITION: labeled zones on the grid where POSITION encodes the meaning: layer stack (T→B, user-facing top, foundation bottom) when the message is "what sits on what" — dependency by position alone, no arrows; quadrant/zone map when two dimensions organize the parts; column groups for parallel workstreams. Proximity = relatedness; containment = belonging.
- RANKING: the load-bearing phase/pillar gets ≥2× visual weight or the accent; never equal cells for unequal parts [Tells-A2]. If all parts truly are peers, say so in the headline and use this form once, not five times.
- TYPE & COLOR: title role for zone labels, body for content; one caps kicker role permissible for zone names; accent on the zone the argument is about.
- DON'T: icon-per-cell decoration; equal-card grids; boxes-in-boxes beyond 2 levels; pouring a 7-part structure into 3 columns.
- MODE: presented → may build zone-by-zone in narration order; sent-ahead → complete with a one-line description per zone.

**5. Comparison** — [Ev §1.6, Tufte-B4/B12]
- WHEN: before/after, ours/theirs, option A vs B, old way/new way — the DELTA is the message.
- COMPOSITION: two panels, identical framing/scale/crop/vertical alignment so the visual system diffs automatically (change blindness is real — audiences fail to spot differences unaided); before/old LEFT, after/new RIGHT (reading-order causality); delta marked explicitly — accent cue on the changed region of the "after," "before" treatment slightly gray-toned to endorse the preferred side. Comparisons live within one eyespan, never across slide transitions [Tufte-B4]; >2 options → small multiples with identical scales.
- TABLE FORM: for exact-value comparisons — light horizontal rules only (no spreadsheet grid), right-aligned numbers, uniform precision, bold/tint the one cell/row the headline is about; ≤~20 numbers on a slide, else appendix [Tufte-B12/B13]; optional sparkline column for direction-at-a-glance [Tufte-B5].
- DON'T: mismatched crops/scales between panels; equal visual endorsement when the deck argues for one side; three-way comparisons as three equal cards.
- MODE: sent-ahead adds explicit column headers and a source line.

**6. Evidence** — chart/data proof [AE, Tufte, Ev §3]
- WHEN: the headline claim needs quantitative proof.
- COMPOSITION: assertion headline (the claim) + ONE chart proving it, occupying the evidence zone (~80% of canvas below the headline band [AE-A2]); chart type follows the message (§5.3); annotation at the proving data point.
- TYPE & COLOR: one highlighted series in accent, ALL context series gray; direct labels at line ends/on bars, no legend; annotation in accent, second-largest text on the slide; axis text at label role, gray.
- DECISION LADDER: 1–3 numbers → don't chart, set them huge (Statement/big-number) [Ev §3.1]; ≤~20 exact numbers → table; shape/trend/outlier → chart; many series → small multiples.
- DON'T: evenly-colored multi-series charts; topic-label titles; truncated axes; legends; 3D; >2 annotations; chart + unrelated decorative image on one slide.
- MODE: presented → strip to macro reading, notes carry derivation; sent-ahead → titled, sourced, units on-slide, may re-densify one step.

**7. Timeline** — chronology/roadmap (derived composite: [Ev §2 direction+cap logic, Zen #24 builds, Tells-A5 budget])
- WHEN: history → present → future, phased roadmap, "how we got here / where this goes."
- COMPOSITION: single L→R axis (16:9-native); milestones as uniform markers at even or true-to-scale spacing (pick one and say which — false even spacing over uneven intervals is a mild lie-factor issue [Tufte-B3]); TODAY or the decision point gets accent + ≥2× weight; past slightly muted; future lighter or dashed (visibly unbuilt); ≤6–8 milestones per slide, else split by era.
- TYPE & COLOR: label role for dates (fixed size deck-wide), body for milestone text ≤1 line each; one accent.
- DON'T: alternating up/down milestone flags that force zigzag reading (attention tax [NNg §2 zigzag]); icon-per-milestone; equal emphasis on all milestones.
- MODE: presented → build phases in narration order; sent-ahead → complete with all labels.

**8. Journey** — experiential path (derived composite: [Duarte §1 audience-as-hero, NNg §1 salience, Ev §2 path discipline])
- WHEN: user/customer experience stages, pain→gain narrative, day-in-the-life; distinct from Timeline: Journey is experiential (the audience's world), Timeline is calendar/factual.
- COMPOSITION: directional path of 3–6 stages, each stage = {label + one-line state}; emotion/friction encoded by ONE consistent channel only (vertical position as an emotion curve, OR a color ramp, OR one icon set — never several at once); the stage where the argument lives (the pain point or the win) is the dominant element: accent + isolation + ≥2× weight.
- HONESTY: visualize the audience's pain truthfully — naming the hardship is a design decision that builds trust (validation) [Duarte §1].
- DON'T: six equal smiling stages (equal cells assert equal importance — the argument has a peak); generic persona clip-art; emoji emotion markers [Tells-C2].
- MODE: presented → reveal stages with narration; sent-ahead → full path visible with a one-liner per stage.

**9. Showcase** — product/screenshot proof [Ev §1, PC §6.1]
- WHEN: "it exists, it ships, it looks like this" — the artifact itself is the evidence.
- COMPOSITION: one real screenshot dominant (~55–65% of canvas), cropped to the proving region + 10–20% context padding; frame matches the claim (frameless for feature detail; minimal browser chrome or device frame ONLY when "real shipped product / mobile" is itself the message — ≤1 full-window framing per deck); hairline border when screenshot bg can merge with slide bg; ONE elevation treatment (shadow OR backdrop OR frame) identical on every screenshot slide; fixed display width across the deck — vary crop, not scale.
- ANNOTATION: ≤3–4 markers; rectangles flush on targets, arrows tips exactly on the element; >2 callouts → numbered markers + side rail; annotation color = deck accent; dim/desaturate non-relevant regions rather than adding markers.
- EVIDENCE LADDER: real screenshot / real chart / real photo > schematic diagram > pure typography > (banned) stock metaphor [PC §6.1].
- DON'T: multi-step flows in one dense capture (one step per slide); upscaled captures; screenshot text below the deck's label size at final scale; blur as redaction (solid fill only; best: realistic demo data).
- MODE: presented → crop hard, narrate; sent-ahead → fuller annotation, may show full window when whole-page layout is the evidence.

**10. Minimal** — tempo break (derived composite: [PC §2.3 density alternation, Zen #4 Ma, Tells-A6 clustered whitespace])
- WHEN: breathing room after dense evidence runs; a quiet aside, a single supporting fact, a transition beat that isn't an act boundary.
- COMPOSITION: one short line at body/title scale OR a single small visual, positioned by the reading path (upper-left third or optical center), whitespace clustered generously to one side — NOT evenly rationed (even distribution of sparse content is machine-made sterility [Tells-A6]).
- REGISTER: differs from Statement by volume — Statement shouts (display type, act boundary, centered); Minimal whispers (body/title scale, off-center, a beat of rest).
- DON'T: adding decoration "because there's room" [Zen #4]; promoting every Minimal to a Statement (flattens the intensity curve).
- MODE: identical in both.

**11. Chapter-divider** — [Zen #25, PC §4.3]
- WHEN: section boundary; teaches the deck's act structure (rule-of-three body organization [Zen #25]).
- COMPOSITION: centered, symmetric; section number or kicker (caps, letter-spaced, label role) + section title as a short assertion; optionally a recurring headline motif tying sections to the talk's one-line message [Zen #25].
- TYPE & COLOR: strongest legitimate home for the inverted (dark) treatment — dark slides as punctuation, 2–4 per deck max, tinted near-black (never flat #000), light text at 90–95% white, same single accent [PC §4.3, Zen #22]; also the one sanctioned home for a deck-signature gradient if the brand owns one [Tools-C2].
- DON'T: decorative divider lines, pills, or agenda-repetition clutter; a different divider design per section (dividers are a repeated layout archetype — identical structure teaches the grammar [Zen #23]).
- MODE: identical; sent-ahead may add a 1-line section abstract.

### 4.1b Archetype selection procedure
For each outline beat: (1) classify the rhetorical job — context / claim / proof / comparison / structure / chronology / experience / artifact / pivot / rest / boundary; (2) map job → archetype (claim→Statement, proof-quantitative→Evidence, proof-artifact→Showcase, structure→Blueprint or Architecture-diagram, chronology→Timeline, experience→Journey, comparison→Comparison, mood→Full-image, rest→Minimal, boundary→Chapter-divider); (3) if a beat carries multiple jobs, split into multiple slides — never compress [Duarte §3]; (4) check the emerging sequence against §4.2 rhythm rules and swap equivalent forms (e.g., Statement↔Minimal, table↔chart) to fix runs. Incoming bullet lists are UN-DESIGNED input: classify the relationship first (sequence? hierarchy? alternatives?), then pick sequence-of-slides / diagram / spaced list [Zen #21].

### 4.2 Layout-rhythm rules across the deck
- **Never the same archetype 3× in a row** (run-length ≤2); no single archetype >40% of content slides [Tells-A1, Tools-B3, Zen #16 (derived threshold)].
- **No two consecutive slides at the same fill level** — alternate sparse/dense; after 2 dense evidence slides insert a Statement or Minimal [PC §2.3, Duarte §7 visual pacing].
- Deliberate echo is human and good when content is genuinely parallel (three case studies share a form) — the echo must map to a parallel in meaning [Tells-A1 counter].
- Alternate split sides across consecutive split-layout slides [PC §3.2].
- Visible act boundaries: Chapter-divider or Statement at each section turn; map beats to Duarte's sparkline (what-is ↔ what-could-be) and let visual register shift with it (muted/dense vs vivid/open) [Duarte §12 (MED for the mapping)].
- Engineer ONE S.T.A.R. moment: a single stripped-bare slide — evocative full-bleed image or a giant lone statistic — at the planned emotional peak. It works because every neighboring slide isn't that [Duarte §12].
- Pattern-interrupt cadence: a mode/texture change roughly every 10 minutes of content [Zen #25].
- Thumbnail-grid check: view the whole deck as thumbnails; rhythm, act boundaries, and archetype variety must be visible at that size [Zen #16, NNg §1.6].

### 4.3 Builds & motion grammar
- Builds (presented only): content appears at the moment it is spoken, never before — anything visible is read immediately; showing point 4 while speaking point 1 splits attention [Zen #24]. Builds serve narrative order (timeline progressions, accumulating recaps, diagram assembly); if a build's motive is fitting more on the slide, split the slide instead [Zen #24, Camillieri litmus].
- Motion is the strongest attention magnet available — spending it on decoration causes fatigue and devalues it for the moments that matter [Zen #15]. Budget: 2–3 subtle transition types per DECK, defined as system tokens, never per-slide choices; no repetitive or slow effects.
- Budget calibration by context: rehearsed presented deck → full synchronized-reveal budget; unrehearsed presenter → minimal builds; sent-ahead → zero (every meaningful build step becomes its own slide, or the slide stands complete) [Zen C3].
- Diagram builds follow §5.2 (authored backwards; elements never move between steps).

---

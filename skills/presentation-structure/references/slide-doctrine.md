# Slide-Level Doctrine (G): the structure-slide interface

> Reference file of the `presentation-structure` skill. Framework codes (A1, B2, C1...) are stable across SKILL.md and all reference files.

### G. Slide-level doctrine (the structure–slide interface)

#### G1. Assertion-Evidence / Action Titles (twin doctrines)
- **Structure**: Every content slide = (1) a complete-sentence ASSERTION as the headline (max 2 lines, the slide's one takeaway — an insight, never a topic label: "Costs grew 10% p.a., double revenue growth", not "Cost overview"); (2) body = the VISUAL EVIDENCE that proves it (chart, diagram, photo — not bullets); (3) the speaker's voice carries the explanation. Consulting twin: McKinsey action titles + Zelazny's chain (message determines title, title determines chart form — never the reverse).
- **When to use**: Every body slide of every deck; the single best-evidenced slide format. Relax the no-bullets rule only for read-style slidedocs.
- **Slide mapping**: The sequence of sentence headlines, read in order, IS the argument (horizontal flow). One assertion = one slide; a two-assertion slide gets split. Write the headline FIRST, then pick the visual.
- **Pitfalls**: Hedged or topic-label titles are the #1 tell of a weak deck; a title that couldn't be wrong isn't saying anything (falsifiability test). Title–body integrity (vertical flow): nothing in the title the body doesn't prove; nothing in the body irrelevant to the title — soften the title or strengthen the evidence, never leave the gap.
- **Evidence**: Moving a key point from a bullet into the sentence headline raised recall from 23% → 57% (Alley et al. 2006); assertion-evidence beats default PowerPoint on comprehension, misconceptions, cognitive load, and delayed recall (Garner & Alley 2013).
- **Relatives**: Assertion-evidence (academic) and action titles (consulting) are the same doctrine discovered independently; Minto's dot-dash dots become these titles.

#### G2. Glance Test (Duarte)
- **Structure**: Every projected slide comprehensible in ~3 seconds, like a highway billboard: one idea, one dominant focal element, contrast marking what matters, generous whitespace, minimal text.
- **When to use**: Any deck projected while someone speaks; the fastest QA gate on a finished deck.
- **Slide mapping**: Mechanical proxies for an automated check: >~25 words on a presented slide = fail; >1 dominant focal element = fail; message must be inferred rather than read = fail.
- **Pitfalls**: If the deck must ALSO be read standalone, don't compromise the projected version — make a second artifact (F13).

#### G3. Cognitive-science bedrock (Mayer + Sweller/CLT)
- **Structure**: The empirically strongest effects, with sizes: temporal contiguity — narrate a visual while it's on screen, never "as we saw two slides ago" (d≈1.30); spatial contiguity — labels ON the graphic, never a distant legend (d≈1.10); coherence — cut every extraneous word/picture/logo/footer (d≈0.86); redundancy — putting your spoken words on the slide HURTS learning; graphics+narration beat graphics+narration+text (d≈0.86); modality — spoken words + graphics beat printed words + graphics (d≈0.72); segmenting — learner-paced chunks (d≈0.70); signaling — cues marking organization (d≈0.46–0.69); pre-training — name the parts before the process (d≈0.46). CLT: working memory ≈ 4 chunks; split-attention and transient-information effects (slides vanish — anything held across slides overloads).
- **When to use**: Any explanatory slide; strongest for novices and complex material. Expertise-reversal caveat: expert audiences tolerate and sometimes prefer denser slides.
- **Slide mapping**: Graphic carries content, voice carries words, on-screen text = headline + labels. High intrinsic load → MORE slides carrying LESS each. Comparisons the audience must make across two slides go on ONE slide. One pre-training slide before process slides. Complex process = one build slide, not N consecutive slides.
- **Pitfalls**: The redundancy principle is the most misunderstood: never read slides aloud; never display paragraphs while talking — the two verbal inputs collide.

#### G4. Kosslyn's 8 principles (failure-detection audit)
- **Structure**: Discriminability, perceptual organization (layout implies relationships whether intended or not), salience (attention goes to the biggest difference), limited capacity (~4 units), informative change (every perceptual change must convey meaning), appropriate knowledge, compatibility (form matches meaning), relevance.
- **When to use**: Final audit over a finished deck — it detects failures the generative frameworks miss.
- **Slide mapping**: Per slide: ≤4 perceptual units; most important element = most salient; nothing changes without meaning; visual groupings match logical groupings.
- **Pitfalls**: His field study: discriminability and limited-capacity violated in ~100% of real decks, informative-change in 93%. Top three audience complaints — the priority list for any builder: (1) speakers reading slides word-for-word, (2) too much per slide to absorb before advancing, (3) main point obscured by irrelevant detail.

#### G5. Tufte doctrine (headline honesty; slides vs documents)
- **Structure**: Bullet hierarchies fragment logic; deep nesting buries critical caveats; sequencing data across slides destroys comparison. For evidence-heavy decisions: distribute a written memo/handout, use slides only for shared focus. Tables usually beat graphics for ≤~20 numbers.
- **When to use**: High-stakes technical/decision content; any data slide where a buried caveat could mislead.
- **Slide mapping**: Never bury the decisive fact below bullet level 2. Data-slide titles must be honest assertions of what the evidence actually shows, with the key caveat at first level.
- **Pitfalls**: The Columbia/Boeing slide hid that the debris strike was ~640x outside the tested regime under a reassuring title; the CAIB formally cited PowerPoint briefing culture. Counterweight: assertion-evidence research shows the problem is PowerPoint's DEFAULTS, not slides per se.

#### G6. Data-slide doctrine (Knaflic / Few)
- **Structure**: One chart, one message per data slide; the takeaway IS the title ("Estimated 2015 spending is above budget", never "2015 Spending"). Annotate directly at the data point that proves the title; gray down non-essential series; label directly, no legends. Table vs graph by audience task: table for precise lookups, mixed units, summary+detail; graph when the message lives in the SHAPE (trend, comparison, outlier).
- **Slide mapping**: If one chart supports two messages, repeat it on two consecutive slides, each styled/annotated for its own message. Precise numbers → table in appendix; chart on the presented slide. Source line + units on every exhibit.
- **Pitfalls**: Answering too many questions in one visual answers none. Few's meta-rule: first ask how the audience will USE the numbers, then pick the display.

#### G7. Builds / progressive disclosure
- **Structure**: Reveal one element per click; each click = one speaking beat; previously revealed items DIM (~25%) but stay visible as memory anchors; current item highest-contrast.
- **When to use**: Complex diagrams, process flows, multi-part arguments — wherever audiences would read ahead or later parts depend on remembering earlier ones.
- **Slide mapping**: A 4-step process = ONE slide with 4 build stages, not 4 slides (transient-information effect). In PDF/static export, emulate with repeated slides each adding one dimmed-history element. Each build moment counts against the time budget like a slide.
- **Pitfalls**: Build ONLY when each reveal earns its own commentary — animating bullets for style violates informative-change. The reveal unit is one IDEA, not one line.

#### G8. Wayfinding (agenda / dividers / trackers)
- **Structure**: For decks >~15 slides or 3+ sections: agenda near the front (≤4–5 items), each section opened by a DIVIDER (the agenda re-shown with current section highlighted, or a large-type ≤5-word title), optional persistent tracker bar on long decks, closing loop back to the agenda-level summary.
- **Slide mapping**: Dividers are near-empty signaling slides (44–64pt, mental reset, recap/pause points; ~10–15 seconds each). XCAI lesson: the divider's ghost numeral is the CHAPTER number, never the slide index (a live bug).
- **Pitfalls**: Dividers answer the questions long-deck audiences silently ask — "where are we?" and "how much is left?". Exception: exec decision decks get NO agenda slide (F1) — the exec summary is the agenda. Agenda is never slide 1 anywhere; the hook comes first.

#### G9. Slide-budget heuristics
- **Structure**: The invariant is per-moment cognitive dwell, not slide count. Pacing bands: dense data/decision slides 1.5–3 min each; standard business content 1–2 min/slide; keynote image slides 15–20s each (3+/min is fine); virtual delivery needs a visual change every 20–30s; auto-advance formats are fixed (PechaKucha 20×20s, Ignite 20×15s); pitch = 10 slides/20 min (Kawasaki).
- **Slide mapping**: Example 30-min business talk: plan ~22–24 min of talking (leave 20–25% for discussion) → ~12–18 content moments + title + dividers + closer. A 10-min talk ≈ 7–12 slides. Appendix slides are free (not presented). Builds count as separate moments.
- **Pitfalls**: "How many slides?" is the wrong question until each slide's density is known. If the budget forces >1 idea per slide, cut ideas — never densify. The 30pt font floor doubles as a content governor.


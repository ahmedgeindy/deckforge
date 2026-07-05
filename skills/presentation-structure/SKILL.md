---
name: presentation-structure
version: 1.0.0
description: Structure presentations the way great human communicators do — story-first, audience-first — before any slides are built. Produces a slide-by-slide narrative outline (framework, assertion titles, evidence, peak moment, chapter map) ready to hand to a rendering skill like document-skills:pptx. Use this skill whenever the user wants to create, outline, structure, or improve a presentation, deck, pitch, keynote, webinar, board pack, all-hands, training session, or talk — including when they only say "make me a pptx about X" or "help me present Y", because choosing the narrative structure must happen before any slide is written. Also use it to diagnose why an existing deck feels flat, unpersuasive, or like a list.
---

# Presentation Structure & Storytelling

Every good deck is a story: a gap/tension (what-is vs what-could-be, situation vs complication) plus a resolution. Every framework in this skill is that same narrative physics at a different compression ratio and answer placement. Your job here is **stage 0**: decide what the slides say and in what order. Visual polish and file mechanics belong to the rendering layer (`document-skills:pptx` or a project deck skill) — hand off to it once the outline is approved.

The deliverable of this skill is a **slide-by-slide outline**: per slide — beat, full-sentence assertion title, intended evidence/exhibit, layout archetype, chapter. Get it approved before anyone builds a slide; feedback on 20 titles is 10x cheaper than on 20 finished slides.

## Step 0 — Intake

Capture these before anything else. If the user's request leaves them unstated, ask (batch the questions; offer sensible defaults):

1. **Audience** — who exactly? Stance: aligned/trusting, neutral, or skeptical/resistant? Senior or peer? Cold or warm room? Morale: complacent (urgency framing works) or change-fatigued (use aspiration framing)?
2. **Goal** — must they DECIDE something, CHANGE how they feel/act, UNDERSTAND something, or ACT in the room? What is the one question this deck was invited to answer?
3. **Format** — time slot, live/remote/hybrid, auto-advance?
4. **Artifact** — presented live, read asynchronously (pre-read, cold-sent deck, leave-behind), or both? **"Both" means build two artifacts** — one file serving both jobs fails at both (the "slideument" is the #1 corporate deck failure).
5. **Raw material** — what content, data, and proof exist? What are the audience's 1–3 killer objections?

## Step 1 — Route via the 2x2

The master ordering variable is **conclusion placement**: friendly/busy/senior → answer FIRST; neutral learners → answer emerges MIDWAY; skeptical/hostile → answer LAST. Never bury the answer for an impatient exec; never cold-open the answer on a hostile room (early explicit claims measurably increase resistance).

| | Audience must DECIDE | Audience must CHANGE |
|---|---|---|
| **Aligned / trusting** | Answer-first pyramid: SCQA + Minto, BLUF (B1–B4) | Duarte Sparkline what-is/what-could-be (C1); Golden Circle (C11) for pure inspiration |
| **Skeptical / resistant** | Discovery-led pyramid: evidence before answer (B3; F4 if hostile) | Full story arc: Sparkline with heavy grounding, Hero's Journey (C3), Challenger (D9) for sales |

**Special cases override the 2x2:**
- Teaching a process → The Explanation (E1); true training with practice → Gagné loop (E2)
- Case study / postmortem → Pixar Story Spine (C4); full-aftermath story → Freytag (C5)
- Insight/research reveal, no crisis → Kishōtenketsu (C6); low-morale room → Situation–Opportunity (B2 variant)
- Commitment in the room (sales close, fundraising appeal, behavior change) → Monroe's Motivated Sequence (C7)
- Investor raise → default investor skeleton (D1), opener chosen by lead-from-strength (D4)
- Sales first call → Raskin narrative (D7) + Dunford follow-through (D8); status-quo-biased buyer → Challenger (D9)
- Origin story → Hero's Journey (C3)
- Nothing fits / under 10 minutes → Hook–Meat–Payoff (C8)

**Where the codes live** — read the matching reference before outlining:
- A (message-level) + C (story arcs): `references/story-frameworks.md`
- B (pyramid/consulting) + E (teaching): `references/business-frameworks.md`
- D (pitch & sales): `references/pitch-sales-frameworks.md`
- F (audience/format playbooks): `references/audience-formats.md`
- G (slide-level doctrine): `references/slide-doctrine.md`
- H (persuasion/memory overlays): `references/persuasion-overlays.md`

## Step 2 — Write the one-sentence message

Before any outline: one full sentence, ≤15 words, containing a stake and an angle — an idea, not a topic ("More choice makes us less happy", not "choice"). It must be phrasable as "…AND…BUT…THEREFORE…" — if it can't, there is no narrative yet (exactly ONE "but": and-and-and = dead report; many buts = confusion). Four traditions converge on this move: Duarte's Big Idea, TED throughline, Olson's ABT, Minto's governing thought.

Then write the 30-second elevator script: answer + 3 supports (~75 words). If you can't produce it, the thinking isn't finished. This sentence becomes the kill-filter: delete any slide that can't hang on it.

## Step 3 — Set the budget

Budget per **cognitive moment**, not per slide — an image needs seconds, a chart needs minutes; builds count as moments. If the budget forces two ideas onto one slide, cut ideas — never densify.

| Format | Budget | Pacing |
|---|---|---|
| Exec briefing | 3–5 summary slides + 10:1 appendix (10% rule) | present ≤5 min of a 30-min slot; design to be interrupted |
| Business talk, 30 min | ~12–18 content moments + dividers + closer | 1–2 min/slide; plan for 75–80% of the slot |
| Dense data/decision review | fewer slides | 1.5–3 min/slide |
| Investor pitch | 10–14 slides (20–25 hard ceiling) | ~2 min/slide; separate send-ahead version |
| Demo day / lightning, 2–5 min | 3–7 slides | one idea total |
| Keynote, image-led | many | 15–20s/slide fine; reset attention every ~10 min |
| Webinar / remote | 40–60 light slides per 45 min | visual change every 20–30s; interaction every 3–10 min; first poll before minute 7 |
| Send-ahead deck | 10–19 pages, slidedoc density | each page parseable <10s; whole deck skimmable <4 min |

Act-level time split: setup ≤25% (10% if the audience already lives the current reality), middle ~50%, resolution ~25%; turning points at ~10% and ~85%.

## Step 4 — Storyboard (dot-dash outline)

In text, before any slide tool:

- **Dots = slides**: each written as its future full-sentence action title. **Dashes = evidence**: the data/exhibit that proves each dot.
- **Horizontal flow test**: the dot list alone must read as a complete, gap-free argument. Consecutive titles alternate And/But/Therefore — never three ANDs in a row; one BUT per section. If a slide can be freely reordered, it isn't part of the story — cut it or send it to appendix.
- **Plan the peak FIRST**: exactly ONE STAR moment (prop, live demo, dramatized statistic, sound bite, emotive story) at ~60–80% through, dramatizing the core idea. Two peaks flatten into none. Memory keeps only the peak and the end (peak-end rule) — engineer both.
- **Loop ledger**: master curiosity loop opened on slides 1–2, closed just before the ask; every mini-loop tracked open→close in two columns; ship no orphans. Final slide answers/completes slide 1 in its original words (bookend).
- **Verified-fact bank**: every stat traces to a source; pick 3–5 hero metrics and give each a dedicated large-stat moment; ban invented ROI/customers/logos/testimonials; ban exact-count copy ("all eight components") that a capped layout may silently truncate; de-identify third-party names in planned screenshots NOW, not at render time.
- **Story before statistics, never blended**: one named person/case first, the aggregate on the NEXT slide. Adding stats to a story measurably suppresses the emotional response.
- **Emotional shape check**: plot each slide's emotional altitude. Target man-in-a-hole (end HIGHER than the start). The most common accidental shape is Icarus — strong opening, then risks/caveats landing the final beat on a downslope. Risks go BEFORE the resolution, never after. A flat line = a report, not a talk.
- **Wayfinding** (decks >~15 slides): named chapters, agenda reframed as ≤4 QUESTIONS (never slide 1 — the hook comes first; exec decks get NO agenda, the summary IS the agenda), divider slides re-showing the map with the current chapter highlighted; divider ghost numerals = CHAPTER number, never the slide index. Plan 1–2 pattern-interrupt slides per chapter (full-bleed stat, dark break, statement slide) so long decks don't run 30 structurally identical slides.
- **Layout archetype per beat** (Cover / Divider / Statement / StatPanel / Showcase / Compare / Blueprint / Close…), with uniform {label, detail} granularity inside each visual group — never mix bare words with full sentences in one grid.
- **Appendix list**: 5–10 slides, each pre-answering one NAMED anticipated question (methodology, deeper cuts, scenarios, benchmarks, risks). Red-team the 5–8 hardest questions to generate them.
- **Talk-track hint per slide**: one line of what the speaker says (the slide shows evidence; the voice carries the words). For read artifacts, this line expands into the on-page prose.

## Step 5 — Ghost deck & approval

Emit the ~20%-fidelity version: titles + one-line headlines + sketched exhibits. Get the user's approval ON THE OUTLINE before any rendering. Ask explicitly: should the storyline change? What data gaps must be filled? Each sketched exhibit becomes an analysis task; genuinely update the story when data contradicts the sketch. If the logic breaks at ghost-deck stage, no amount of design will save the final deck.

## Step 6 — Hand off to the rendering layer

Once approved, load the rendering skill (`document-skills:pptx`, or the project's own deck skill if one exists) and pass it the outline. Slide-construction doctrine that the outline already encodes (see `references/slide-doctrine.md` for the evidence):

- Assertion headline first, then the ONE visual that proves it — message determines title, title determines chart form, never the reverse. Moving the key point from a bullet into the sentence headline raised recall 23%→57%.
- One idea per slide; glance test ~3 seconds (>~25 words on a presented slide = fail); labels on the graphic, never a distant legend; never display paragraphs while talking (redundancy effect works AGAINST you).
- Data slides: the takeaway IS the title; annotate directly at the proving data point; gray down non-essentials; source + units on every exhibit; one stat per slide — the one you want remembered.
- Builds: one reveal per speaking beat, previous items dimmed but visible; a 4-step process = ONE build slide, not 4 slides.
- Write the exec summary LAST, place it as slide 2 (skim test: bold sentences alone deliver the whole argument).

**After rendering, two QA checks are mandatory** (they catch different failures): a fresh-eyes visual sweep, AND a narrative acceptance matrix — does each built slide still deliver its outlined beat? Structured widgets (diagrams, step strips, callout labels) get flagged for targeted QA — generic conversion pipelines silently drop them.

## QA gates (run on the outline, before handoff)

1. **So-what test** — every element's implication stated and tied to its title, or cut/appendix.
2. **Vertical flow** — each title claims exactly what its body will prove; a title that couldn't be wrong isn't saying anything.
3. **Horizontal flow** — titles alone reproduce the storyline.
4. **Elevator test** — recommendation speakable in 30 seconds.
5. **Shape check** — man-in-a-hole, no accidental Icarus.
6. **Loop ledger** — no orphan loops; bookend closes in original words.
7. **SUCCESs sweep** — simple core? unexpected open? concrete ("photographable") claims? credible at human scale? one identifiable person? story resolved?
8. **Rule of three / four-ceiling** — 3 sections, 3 supports per claim by default; never more than 4 of anything perceptual in one group.
9. **Red team** — 5–8 hardest questions each have an in-deck or appendix answer.
10. **Ending** — last beat is NEVER "Thank You / Questions?"; Q&A sits at ~75% or per-audience (execs: continuous; hostile: written/moderated), with a re-close slide queued after it. The final words in the room are yours.

## Worked example (compressed)

Request: *"30 minutes with our CEO to get the $2M platform-migration approved. She's supportive but time-poor. Live meeting."*

Intake → aligned + decision + live + presented → answer-first pyramid (B1–B4), exec 10% rule (F1), continuous Q&A. Message: "Migrating to X by Q3 saves $1.8M/yr and unblocks the enterprise roadmap." (AND we're growing, BUT the platform caps us, THEREFORE migrate by Q3.)

Dot-dash (presented portion — 5 slides + appendix):
1. *Cover* — "The $2M decision that unblocks our enterprise roadmap" (hook, not "Platform Migration Update")
2. *Exec summary (written last)* — "Approve the $2M migration to X by Q3: it pays back in 14 months and removes our top-3 enterprise blockers" — bold claims: cost ▸ risk ▸ roadmap
3. *StatPanel* — "Staying costs $1.8M/yr in overruns and lost deals" — hero metric large; named lost customer story first, aggregate second
4. *Compare* — "Of three options, phased migration is the only one that hits Q3 without a feature freeze" — honest pros/cons
5. *Close* — "Approve $2M now → phase 1 live in 8 weeks — here's the first step" (ask + owner + date)
- Appendix A1–A8: named questions ("What breaks during cutover?", "Why not renegotiate the current contract?"...), each one slide. Pre-wire the CFO 1:1 before the meeting; rehearse being interrupted at any slide.

## Scope notes

- This skill decides structure and content order. Fonts, palettes, geometry, export bugs → rendering layer.
- Timings for webinars/all-hands are practitioner defaults, not laws; DocSend dwell-time data is directional — re-verify when precision matters.
- Speaker-note/talk-track authoring beyond the one-line hint per slide is out of scope (flag it to the user as a follow-up if they're presenting live).

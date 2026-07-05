> Extracted from the presentation-qa master knowledge base (research synthesis, 2026-07-03).
> Lanes: [COG] [PROC]; upstream contracts [STR] [DES] — see sources-and-conflicts.md. Full formulations of these rules live in [COG §1–§4].

# Accessibility checks (Pass 5) + cognitive-load / Mayer battery (inside Pass 3)

## 4. Accessibility checks (Pass 5 — WCAG-mapped, mechanical)

Scope rule: WCAG binds the EXPORTED artifact; live delivery substitutes the speaker for the screen reader (A11). ~8% of male viewers have a CVD — a 50-person room contains affected viewers; this is capacity math, not compliance theater.

### 4.1 WCAG battery (IDs and SC mappings from [COG §4.1])
| ID | Check (PASS condition) | SC | Sev | Artifact |
|---|---|---|---|---|
| A1 | Text contrast ≥4.5:1 measured on real pixels incl. text-over-image (sample extremes under the text box, not averages); pipeline's 4.5:1-everywhere supersedes the 3:1 large-text allowance for projected mode (conflict X2) | 1.4.3 | ⛔ | RENDER |
| A2 | Meaning-bearing graphics (marks, strokes, connectors) ≥3:1 vs adjacent | 1.4.11 | ▲ | RENDER |
| A3 | Grayscale re-render: takeaway, accent, series identities, pos/neg distinctions all survive without color (labels, position, weight, pattern, icon) | 1.4.1 | ⛔ | RENDER |
| A4 | Programmatic object order matches visual reading order (headline → evidence → source) | 1.3.2 | ⛔ | EXPORT |
| A5 | Every informative visual carries alt text stating its TAKEAWAY — the assertion headline is usually the correct alt text verbatim; decoratives marked decorative; no filename/genre alts | 1.1.1 | ⛔ | EXPORT |
| A6 | Unique programmatic slide title per slide (may be visually hidden); dividers/statements are the usual offenders | — | ▲ | EXPORT |
| A7 | Nothing flashes >3×/second (animations, video, GIFs) | 2.3.1 | ⛔ | SPEC/RENDER |
| A8 | Embedded video captioned; audio-only transcribed | 1.2.2 | ▲ | EXPORT |
| A9 | Data tables use real header rows; link text describes destination | — | ▲ | EXPORT |
| A10 | Load-bearing text baked into images reproduced in alt (OCR-vs-object-model diff) | — | ▲ | EXPORT |
| A11 | Live-delivery checklist emitted as delivery notes (speaker describes visuals aloud; never blocks a render) | — | △ | DELIVERY |

### 4.2 Color-vision battery (scoped: the 1-accent+gray system immunizes most slides — run only on multi-series / semantic-color / diverging-palette slides [COG CVD4])
- **CVD1** ⛔ — every color-encoded-meaning slide survives simulation of deuteranopia, protanopia, tritanopia (standard matrices); adjacent meaning-bearing colors keep ΔL* ≥ ~20 or a redundant channel.
- **CVD2** ⛔ — red-vs-green never the sole differentiator; pos/neg semantics always ride a second channel (checked once, under A3).
- **CVD3** — no verified brand chart palette supplied → categorical series default to Okabe-Ito, taken in order; sequential data → monochromatic lightness ramp (inherently CVD-safe, already [DES §6.2]).

### 4.3 Dyslexia overlay (verification, not addition — evidence-ranked [COG §4.3])
- Specialty "dyslexia fonts" are NOT required or recommended (no reliable benefit, HIGH confidence); a spec swapping to one "for accessibility" gets △ (unfounded + token violation).
- BDA-aligned rules are already free under the design tokens — verify the token sheet delivers them (sans-serif, body leading ≥1.35, ragged-right, no italic emphasis, 40–65-char lines): mechanical inspection.
- A declared dyslexia overlay may set body leading 1.5 and substantially widen BODY tracking (MED confidence — large-delta evidence only); display type keeps design tracking (conflict X3).

### 4.4 Mode fork (the accessibility dimension of presented-vs-read [COG §4.4])
- **P1 projected** ▲ — verify on RENDER: 4.5:1 everywhere, weight ≥400, no hairline data strokes <2px, no saturated pure-blue/red small text; flag dark-background decks destined for lit rooms.
- **P2 sent-ahead** ⛔ — A4/A5/A6 become BLOCKING (a screen reader may be the actual consumer); deck must be self-standing (legends/labels restored, builds flattened — [DES §9.3 check 20]).
- **P3 live** — alt/reading-order do nothing for the room; narration inherits their job → emit A11 notes keyed to every Evidence/Showcase slide.
- **P4 export fidelity** ▲ — run every A-check against the EXPORT, never the authoring preview.
- **P5 both-mode** — two artifacts (upstream iron rule); run the P1 battery on the presented artifact and the P2 battery on the read artifact. Never one battery on a hybrid.

### 4.5 Implementation notes (all mechanical)
- **Contrast measurement (A1)**: compute on rendered pixels; for text over images/scrims sample the darkest and lightest regions under the text bounding box, never the average.
- **Grayscale test (A3)**: desaturate the render; the judgment step ("does the takeaway survive?") is the ONE non-mechanical item in this pass — cite A3 in the finding.
- **CVD simulation (CVD1)**: Brettel/Viénot or Machado matrices (the Color Oracle/Coblis engines); operationalize distinguishability as ΔL* ≥ ~20 or surviving hue separation plus a redundant channel.
- **Reading order / titles / alt (A4–A6)**: walk the export's object model (PPTX shape order per slide XML; PDF tag tree) — content in master-layout placeholders inherits correct order; free-floating text boxes are the usual offender.
- **Alt-text derivation (A5)**: the pipeline's assertion headlines make correct alt text mechanically derivable from the spec; a generator that cannot produce it has a missing spec field — flag upstream rather than hand-writing alts at the gate.
- **Blocking set by mode**: presented → {A1, A3, A7, CVD1, CVD2}; sent-ahead → those plus {A4, A5} and A6 promotes to ⛔-adjacent ▲.

## 5. Cognitive-load / Mayer checks (run inside Pass 3; full formulations in [COG §1–2])

Doctrine and effect sizes live upstream [STR §G3]; these are the checkable-rule forms. Severity uses the stable principle-strength ORDER (contiguity/multimedia > coherence/redundancy > signaling/pre-training > social cues), not lab-exact effect sizes (conflict X7).

| ID | Rule (FAIL condition) | Sev | Mode | Verb |
|---|---|---|---|---|
| M1 | Explanatory slide is text-only when a relevant depiction exists/is constructible (Statement/Minimal/Divider exempt — display phrases are processed as images) | ▲ | both | NEW |
| M2 | Any element without a referent in the slide's assertion; NEW sub-check: seductive details — an on-slide fact supporting a DIFFERENT assertion than the headline (visual checks miss these) | ▲ | both | NEW |
| M3 | Accent/annotation marks an element that does NOT prove the headline (signaling the wrong thing beats no signal for damage) | ⛔ | both | NEW RE-RUN |
| M4 | Label/callout physically separated from referent; legend on a presented chart (= [DES §5.3] rule; this is its cognitive justification) | ▲ | both | RE-RUN |
| M5 | Narration for slide N describes content visible on a different slide ("as we saw two slides ago"); build step k revealed while notes discuss k−1 | ▲ | presented | NEW |
| M6 | Body text duplicates narration in sentence form (≥~7-word near-verbatim overlap with notes). Exempt: sent-ahead mode; short labels; caption tracks (conflict X1) | ⛔ | presented | NEW |
| M7 | >4-stage process/diagram lands as one static dense slide with no builds | ▲ | presented | NEW |
| M8 | ≥4 audience-novel components on a process slide with no prior naming slide/build (mechanical test of [STR §G3] pre-training mandate) | ▲ | both | NEW |
| M9 | Explanatory prose in slide body while speaker notes are empty/thin (route to notes; reverses for long complex verbal content and sent-ahead) | ▲ | presented | NEW |
| M10 | Zero second-person pronouns deck-wide in persuasion/teaching decks — WARN only, copy lane owns register (X6) | △ | both | NEW |
| M11 | TTS narration declared in a recorded deck — WARN with modern-TTS caveat (LOW-MED) | △ | recorded | NEW |
| M12 | Presenter image occludes/competes with evidence (▲); presenter image on content slides at all (△); a visibly pointing/annotating hand is NOT a violation (embodiment) | ▲/△ | recorded | NEW |
| C1 | Interactivity count: elements that must be held SIMULTANEOUSLY (nodes + relations + cross-referencing annotations) >4 novice / >~6 expert. This counts RELATIONS, which Kosslyn's ≤4-unit audit [STR §G4] does not — 4 nodes + 5 labeled arrows ≈ 9 interacting elements | ⛔ | both | NEW |
| C2 | High-interactivity content arrives with none of: prior parts-naming, builds/per-step slides, appendixRef to the full version (deletion-instead-of-layering) | ▲ | both | NEW |
| C4 | Layout scrambles the schema: comparison panels on different scales/crops; sequence steps in non-causal order | ▲ | both | RE-RUN |
| C5 | A slide's assertion requires a value/definition shown only on an earlier slide or said only aloud (transient channel); baselines/acronyms/thresholds must be re-shown, persist dimmed, or be overlay-common-knowledge | ⛔ | both | NEW |
| C7 | Expertise reversal — the master threshold modifier: audienceOverlay sets C1 caps and M7/M8 strictness; definitions of field-standard terms for expert rooms are extraneous (FAIL); mixed rooms layer, never average | ▲ | both | NEW |

Pointers (assert upstream ran, never re-execute): C3 extraneous load ↔ M2/M4/M6 + [DES §7] sweep; C6 split-attention ≡ M4 (run once); R3/R5/R6 ↔ [DES] checks.

### 5.1 Execution notes for the cognition battery [COG §6]
- **Mechanical subset (run with lint tooling)**: M4 (legend/label geometry), M6 (text-vs-notes overlap diff), M7 (buildSteps presence vs stage count), C1 (node+edge+annotation count from diagram spec).
- **Judgment subset (LLM-evaluated, must cite the check ID in the finding)**: M1–M3, M5, M8, C2, C4, C5, C7.
- **Threshold source**: `audienceOverlay` (from the design spec, [DES §8]) sets C1 caps (novice 4 / expert ~6), M7/M8 strictness, and the R2 jargon whitelist. Mixed rooms: apply the layered rule (big picture → deep dive), never averaged thresholds.
- **Blocker set within this battery**: {M3, M6 presented-mode, C1, C5}. Everything else ▲/△ per table.
- **Boundary-condition discipline**: never over-enforce M6 (non-native audiences, pre-read text, caption tracks are documented helps-cases) or M10–M12 (WARN ceiling); when a boundary condition applies, record it in the finding's mechanism text instead of suppressing the finding.

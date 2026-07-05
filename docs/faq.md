# FAQ

## Do I need Python?

Only for `presentation-build-report`'s aggregator. The other five skills (`presentation-structure`, `presentation-design`, `presentation-copywriting`, `diagram-design`, `presentation-qa`) are pure Markdown instruction sets — an agent reads and follows them with no code execution at all. `deckforge doctor` checks for Python 3.9+ and reports its absence, but that absence degrades gracefully: 5 of 6 skills work without it. You only need Python when you want the final `execution-report.md`/`.json` build log.

## Why is my execution report FAILED?

`build_status` computes to `FAILED` when any one of three things is true: the QA verdict is `BLOCKED`, the render step errored (`render_errored: true` in `meta.json`), or the build is incomplete (a stage you declared in `expected_stages` never produced a stage-record). Check `build/execution-report.md` — it lists which of the three fired, and for an incomplete build, the specific `missing_stages`. See `docs/confidence-rubric.md` for the full decision table.

## Why do the docs keep prefixing `PYTHONUTF8=1` on Windows?

It is a belt-and-suspenders encoding precaution, not a hard requirement. The shipped aggregator specifies `encoding="utf-8"` on every file operation and runs clean without the flag. But the report content is full of non-ASCII characters (em dashes, arrows), Windows consoles default to a `cp1252`-family encoding, and agents often write small auxiliary Python scripts around the pipeline that do *not* set encodings explicitly — the flag makes those safe too. It is harmless everywhere else, so the skills instruct agents to always include it:

```
PYTHONUTF8=1 python -m scripts.build_report build/
```

## Can I use just one skill, without running the whole pipeline?

Yes, for the five Markdown skills. Each is written to be independently invokable — for example, `presentation-qa`'s own `SKILL.md` describes running "a degraded gate" if no upstream outline or design-review report exists, and `presentation-design` says to pass its spec straight to the renderer if no downstream copywriting/diagram/QA siblings are being used. `presentation-build-report` is the exception: it aggregates other stages' artifacts, so it needs at least one stage-record to summarize — running it alone with an empty `build/inputs/` produces a report that says exactly that (zero confidence-scored stages, `weighted_overall: 0.0`).

## Which agents are supported?

Claude Code, Codex, and OpenCode. See `docs/cross-agent.md` for install paths and the important difference in discovery mechanism: Claude Code discovers skills natively; Codex and OpenCode get the skill files copied to disk plus a managed instruction block in `AGENTS.md` telling the agent to go read them.

## Does DeckForge phone home, or send any telemetry?

No. Every `deckforge` command is local: no network calls, ever, and no telemetry of any kind. The "telemetry" the build-report skill talks about (`build/stage-log.json` — per-stage tokens/duration) is local file I/O written by the orchestrating agent onto disk in your own `build/` directory; it never leaves your machine.

## How do decks actually get rendered?

DeckForge does not ship a renderer. It governs content (`presentation-structure`), visual design (`presentation-design`), copy (`presentation-copywriting`), diagrams (`diagram-design`), and final QA (`presentation-qa`) — the actual file (PPTX, HTML, PDF) is built by your own rendering system, referred to throughout the skills as "the renderer" (`document-skills:pptx`, an HTML deck system, or a project-specific one). `presentation-build-report` never scores the render stage for exactly this reason: DeckForge has no rendering rubric to hold it to.

## Can I change the stage weights used for the weighted-overall confidence score?

Yes — they're constants in `skills/presentation-build-report/scripts/config.py` (`STAGE_WEIGHTS`). Editing them is a real fork of the shipped rubric: the numbers in `docs/confidence-rubric.md` describe the defaults, and once you change `config.py`, your local code is the new source of truth, not this document. If you fork the weights, keep a note of why — the default weighting (structure .25, copywriting .20, qa .25, design .15, diagram .15) was a deliberate v1.0 choice, not an arbitrary one.

## What's planned for v1.1?

Three known calibration items in the confidence rubric, explicitly out of scope for v1.0 and shipped as-is: a QA double-penalty interaction in the rubric, an empty-list placeholder cosmetic issue in `render_md`, and a cosmetic-severity counting question. See `CHANGELOG.md`'s "Known calibration items" for the current list — v1.0's rubric ships as specified in `docs/confidence-rubric.md` regardless.

## What happens if a pipeline stage crashes or gets skipped?

If you declared it in `meta.json`'s `expected_stages` and its stage-record never arrives, the build is marked incomplete and `build_status` is `FAILED`, with the missing stage named. If you never declared `expected_stages`, the aggregator falls back to "at least one stage-record exists" as its only completeness signal — a silently-dropped stage would just renormalize the confidence weights and the build would look clean. Always declare `expected_stages` for anything other than a quick manual run.

## Why do `presentation-design`, `presentation-copywriting`, `diagram-design`, and `presentation-qa` keep telling me to "run the upstream skill first"?

Because each treats the previous stage's output as immutable input, not a draft. Designing an unstructured deck polishes a broken argument; writing copy for an undesigned deck locks word budgets that don't exist yet; diagramming an unstructured deck decorates a broken argument; and QA-ing a deck with no approved outline means there's no acceptance matrix to check against. Each skill will run a degraded pass and say so rather than silently pretending the missing upstream artifact doesn't matter.

## What does `SHIP-WITH-ACCEPTED-MAJORS` mean, and why does my build still say `PASS WITH WARNINGS`?

`SHIP-WITH-ACCEPTED-MAJORS` is `presentation-qa`'s verdict: no blockers, but at least one Major finding was consciously accepted with a named owner rather than fixed. The build-report aggregator treats that verdict as one of several conditions that force `PASS WITH WARNINGS` (alongside rendering warnings, Needs-Verification items, conflicts, or any stage in the Low band) — a deck can ship and still carry a documented, owned risk. The warning is the point: it keeps the accepted risk visible in engineering telemetry even though the deck itself is fine to send.

## Do Cosmetic-severity findings hurt a stage's confidence score?

No. The per-stage score formula only counts Blockers (−25), Majors (−10), Minors (−3), and failed gates (−15). Cosmetic findings from `presentation-design` and `presentation-qa` are real and logged in their own reports, but they are deliberately excluded from the scoring formula — there is no cosmetic bucket in the rubric.

## Can I install DeckForge to only one agent, or do I have to install to all three?

`deckforge install --agent claude|codex|opencode|all` controls this explicitly. With no `--agent` flag, install auto-detects which agent directories already exist on your machine and installs to all of them (after listing what it found). Uninstall takes the same `--agent`/`--scope` flags and removes exactly what its matching install created.

## I edited a skill file locally — what happens when I run `deckforge update`?

`deckforge update` is an alias for `install --force` restricted to skills whose bundled version is newer than what's installed. `--force` overwrites modified files; without it, `install` refuses to touch a locally modified file and gives you a diff hint instead. If you want to keep local edits, don't run `update` for that skill, or diff and reapply your changes after.

## Do I need npm, or can I just copy the `skills/` folder manually?

The skills are plain Markdown — copying `skills/<name>/` to wherever your agent discovers skills works without the CLI. The CLI (`deckforge install`) exists for convenience: it knows each agent's exact discovery path per scope, writes the `AGENTS.md` managed block for Codex/OpenCode, and tracks what it created in a manifest so `uninstall` and `update` are clean. Manual copies work but you lose the manifest-tracked uninstall and the AGENTS.md block.

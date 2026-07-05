# build-report-sample

A worked example of the flight-recorder deliverable from stage 7 (`presentation-build-report`):
what a finished pipeline run looks like on disk, and the internal engineering build log the
aggregator produces from it.

The deck is fictional: "Acme Q2 Business Review," a 12-slide business review for a made-up
company called Acme. There is no real Acme data here — names, numbers, and quotes are invented
for this example.

## Layout

```
build-report-sample/
├── package/                         # what a completed pipeline run leaves behind
│   ├── deck/final/acme-q2-review.html   # stand-in for the rendered deliverable (stub, not a real deck)
│   ├── reports/                         # per-stage reports (stages 1-5), as each skill would write them
│   │   ├── structure-report.md
│   │   ├── design-review.md
│   │   ├── copywriting-fact-fidelity.md
│   │   ├── diagram-report.md
│   │   └── render-log.md
│   ├── reports/qa-report.md             # stage 6 (qa) verdict, input to stage 7
│   └── stage-log.json                   # per-stage tokens/duration, captured during the run (see Step 1 of the skill)
└── expected-output/                 # what scripts.build_report actually produced from package/
    ├── execution-report.md
    ├── execution-report.json
    └── inputs/                          # the harvested stage-records the aggregator consumed
        ├── stage-records.json
        ├── qa.json
        └── meta.json
```

`package/` is the raw material a build-report run works from: the reports each upstream stage
(structure, design, copywriting, diagram, render, qa) leaves behind, plus the telemetry log
captured while the pipeline ran. `expected-output/` is downstream of that: the harvested
`inputs/*.json` (produced by the "harvest each stage" step of the skill, `references/extraction-guide.md`)
and the two files `scripts/build_report.py` writes when it aggregates those inputs.

**`expected-output/` was produced by the real aggregator, not hand-written.** It is copied
verbatim from an actual run of `skills/presentation-build-report/scripts/build_report.py`
against the harvested inputs above — nothing in that directory was authored by hand to look
plausible. `package/` (the per-stage `.md` reports and `stage-log.json`) is the upstream fixture
those inputs were harvested from; it is illustrative, written to match the shape real skills
produce, not itself aggregator output.

## Regenerating the report yourself

The aggregator only needs `inputs/stage-records.json`, `inputs/qa.json`, `inputs/meta.json`, and
`stage-log.json` sitting under a build directory — it does not read `package/reports/` or
`package/deck/` directly (those are what a human/agent would harvest the inputs from in a real
run; here the harvest step is already done for you in `expected-output/inputs/`).

To reproduce `expected-output/execution-report.{md,json}` from scratch:

**POSIX (macOS/Linux, bash/zsh):**

```bash
# from the repo root
mkdir -p /tmp/deckforge-build/inputs
cp examples/build-report-sample/expected-output/inputs/stage-records.json /tmp/deckforge-build/inputs/
cp examples/build-report-sample/expected-output/inputs/qa.json           /tmp/deckforge-build/inputs/
cp examples/build-report-sample/expected-output/inputs/meta.json         /tmp/deckforge-build/inputs/
cp examples/build-report-sample/package/stage-log.json                   /tmp/deckforge-build/

cd skills/presentation-build-report
PYTHONUTF8=1 python -m scripts.build_report /tmp/deckforge-build
# writes /tmp/deckforge-build/execution-report.md and execution-report.json
```

**Windows (PowerShell):**

```powershell
# from the repo root
New-Item -ItemType Directory -Force -Path "$env:TEMP\deckforge-build\inputs" | Out-Null
Copy-Item examples\build-report-sample\expected-output\inputs\stage-records.json "$env:TEMP\deckforge-build\inputs\"
Copy-Item examples\build-report-sample\expected-output\inputs\qa.json           "$env:TEMP\deckforge-build\inputs\"
Copy-Item examples\build-report-sample\expected-output\inputs\meta.json         "$env:TEMP\deckforge-build\inputs\"
Copy-Item examples\build-report-sample\package\stage-log.json                   "$env:TEMP\deckforge-build\"

Set-Location skills\presentation-build-report
$env:PYTHONUTF8 = "1"
python -m scripts.build_report "$env:TEMP\deckforge-build"
# writes execution-report.md and execution-report.json into $env:TEMP\deckforge-build
```

Diff the result against `expected-output/execution-report.md` / `.json` — it should match
byte-for-byte (aside from the `generated_at` timestamp, which is wall-clock at run time).

## What the report shows

This is a clean-build example: build status `PASS`, verdict `SHIP`, zero blockers/majors, two
minor findings auto-fixed during QA, 6/6 sources consumed, 12 slides, 3 diagrams, 4 screenshots
used / 1 discarded, weighted-overall confidence 98.5 (weakest stage: qa at 94). Not every real
build looks this clean — see `docs/confidence-rubric.md` for how status degrades (PASS WITH
WARNINGS, FAILED) when a stage reports findings or a stage-record goes missing.

# Examples

Two examples, aimed at two different questions.

## `quickstart/`

**For: someone about to run DeckForge for the first time.** A realistic (fictional) B2B brief —
"Northlight Insights Q2 Business Review," an internal budget-renewal deck for exec staff — with
its two source documents already written, plus `WALKTHROUGH.md` walking through installing
DeckForge, prompting your agent, what happens at each pipeline stage, and how to read the
resulting build log. Start here if you haven't run the pipeline before. Nothing in this example
is pre-rendered — you drive it yourself with your own agent.

## `build-report-sample/`

**For: understanding what the stage-7 build log actually looks like before you run anything.** A
frozen, already-finished example: a fictional clean pipeline run (`package/`) and the real
`execution-report.md` / `.json` (`expected-output/`) that `scripts/build_report.py` produced from
it — copied verbatim from an actual run, with exact regeneration commands included. Look here if
you want to see the flight-recorder deliverable's shape, or to sanity-check your own
`execution-report.md` against a known-good one.

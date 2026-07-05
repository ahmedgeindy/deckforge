def _fmt(v):
    return "not captured" if v is None else v


def render(report):
    L = []
    L.append("# Execution Report — Internal Engineering Build Log")
    L.append("")
    L.append("> **INTERNAL build log — NOT a presentation deliverable.** "
             "This file is for auditing, debugging, and optimization. "
             "It must NEVER be shipped, appended to the deck, or included in the export bundle.")
    L.append("")
    L.append(f"**Generated:** {report['generated_at']}  ")
    L.append(f"**Pipeline version:** {report['pipeline_version']}")
    L.append("")
    L.append(f"## Build Status: {report['build_status']}")
    L.append("")
    if report.get("missing_stages"):
        L.append(f"> **Incomplete build** — expected stage record(s) never arrived: "
                 f"{', '.join(report['missing_stages'])}.")
        L.append("")

    L.append("## Skills & Versions (execution order)")
    L.append("")
    L.append("| # | Stage | Skill | Version |")
    L.append("|---|-------|-------|---------|")
    for i, s in enumerate(report["skills"], 1):
        L.append(f"| {i} | {s['stage']} | {s['skill']} | {s['version']} |")
    L.append("")

    t = report["totals"]
    L.append("## Telemetry")
    L.append("")
    L.append("| Stage | Tokens | Duration (ms) |")
    L.append("|-------|--------|---------------|")
    for e in report["stage_telemetry"]:
        L.append(f"| {e.get('stage')} | {_fmt(e.get('tokens'))} | {_fmt(e.get('duration_ms'))} |")
    L.append(f"| **TOTAL** | **{t['tokens']}** | **{t['duration_ms']}** ({t['duration_s']}s) |")
    if t["inline_stages"]:
        L.append("")
        L.append(f"_Inline stages excluded from totals (not captured): {', '.join(t['inline_stages'])}._")
    L.append("")

    c = report["counts"]
    L.append("## Counts")
    L.append("")
    L.append(f"- Slides: {c['slides']}")
    L.append(f"- Diagrams generated: {c['diagrams']}")
    L.append(f"- Screenshots used: {c['screenshots_used']}")
    L.append(f"- Screenshots discarded: {c['screenshots_discarded']}")
    L.append("")

    sc = report["source_coverage"]
    L.append("## Source Coverage")
    L.append("")
    L.append(f"- Discovered: {sc['discovered']}")
    L.append(f"- Consumed: {sc['consumed']}")
    L.append(f"- Coverage ratio: {sc['ratio']}")
    if sc["unconsumed"]:
        L.append("- Discovered but unconsumed:")
        for u in sc["unconsumed"]:
            L.append(f"  - {u}")
    L.append("")

    q = report["qa"]
    rf = q.get("remaining_findings", {})
    L.append("## QA")
    L.append("")
    L.append(f"- Verdict: {q.get('verdict')}")
    L.append(f"- Automatic QA fixes applied: {_fmt(q.get('auto_fixes'))}")
    L.append(f"- Remaining findings: {rf.get('blockers', 0)} blocker(s), "
             f"{rf.get('majors', 0)} major(s), {rf.get('minors', 0)} minor(s)")
    for item in rf.get("list", []):
        L.append(f"  - {item}")
    L.append("")

    conf = report["confidence"]
    L.append("## Confidence")
    L.append("")
    L.append("| Stage | Score | Band |")
    L.append("|-------|-------|------|")
    for stage, v in conf["by_stage"].items():
        L.append(f"| {stage} | {v['score']} | {v['band']} |")
    L.append("")
    wo, ws = conf["weighted_overall"], conf["weakest_stage"]
    if not conf["by_stage"]:
        L.append("- **Weighted overall:** not scored (no stage carries a confidence rubric)")
        L.append("- **Weakest stage:** not scored")
    else:
        L.append(f"- **Weighted overall:** {wo['score']} ({wo['band']})")
        L.append(f"- **Weakest stage:** {ws['stage']} — {ws['score']} ({ws['band']})")
    L.append("")

    def bullets(title, items):
        L.append(f"## {title}")
        L.append("")
        for it in items:
            L.append(f"- {it}")
        L.append("")

    bullets("Needs Verification", report["needs_verification"])
    bullets("Assumptions", report["assumptions"])
    bullets("Conflicting Sources", report["conflicts"])

    L.append("## Skipped by design")
    L.append("")
    for s in report["skipped_by_design"]:
        L.append(f"- {s['item']} — _reason:_ {s['reason']} ({s['stage']})")
    L.append("")

    bullets("Rendering Warnings", report["rendering_warnings"])

    L.append("## Recommendations")
    L.append("")
    for i, r in enumerate(report["recommendations"], 1):
        L.append(f"{i}. _(P{r['priority']})_ **[{r['target']}]** {r['action']} — _{r['payoff']}_")
    L.append("")
    return "\n".join(L)

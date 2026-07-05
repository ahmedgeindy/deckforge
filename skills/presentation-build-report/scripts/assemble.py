from datetime import datetime, timezone

from scripts import config, confidence, telemetry, deckfacts, status, recommendations


def _order_key(stage):
    return config.STAGE_ORDER.index(stage) if stage in config.STAGE_ORDER else 99


def assemble(*, stage_records, stage_log, qa, render_errored, generated_at=None,
             expected_stages=None):
    recs = sorted(stage_records, key=lambda r: _order_key(r.stage))
    generated_at = generated_at or datetime.now(timezone.utc).isoformat()

    # A stage the orchestrator expected but whose record never arrived = an
    # incomplete build (a dropped record silently renormalizes the weights and
    # would otherwise report clean). If expected_stages isn't declared, fall
    # back to "at least one record" (orchestrator-trusted, per spec §7).
    present_stages = {r.stage for r in recs}
    if expected_stages:
        missing_stages = [s for s in expected_stages if s not in present_stages]
        all_stages_complete = not missing_stages
    else:
        missing_stages = []
        all_stages_complete = len(recs) > 0

    by_stage = {}
    for r in recs:
        if r.stage in config.CONFIDENCE_STAGES:
            sc = confidence.stage_score(r)
            by_stage[r.stage] = {"score": sc, "band": confidence.band(sc)}
    scores = {s: v["score"] for s, v in by_stage.items()}
    wo = confidence.weighted_overall(scores)
    ws, wss = confidence.weakest_stage(scores)

    def harvest(attr):
        out = []
        for r in recs:
            out.extend(getattr(r, attr))
        return out

    skipped = []
    for r in recs:
        for s in r.skipped_by_design:
            skipped.append({"item": s.get("item"), "reason": s.get("reason", "none reported"), "stage": r.stage})

    warnings = harvest("warnings")
    needs_ver = harvest("needs_verification")
    conflicts = harvest("conflicts")
    src_cov = deckfacts.source_coverage(recs)
    low_conf = [s for s, v in by_stage.items() if v["band"] == "Low"]

    build_stat = status.build_status(
        qa_verdict=qa.get("verdict"), render_errored=render_errored,
        all_stages_complete=all_stages_complete, rendering_warnings=warnings,
        needs_verification=needs_ver, conflicts=conflicts, low_conf_stages=low_conf)

    rec_list = recommendations.synthesize(
        remaining_findings=qa.get("remaining_findings", {}), by_stage_conf=by_stage,
        needs_verification=needs_ver, conflicts=conflicts, source_coverage=src_cov)

    return {
        "pipeline_version": config.PIPELINE_VERSION,
        "generated_at": generated_at,
        "build_status": build_stat,
        "missing_stages": missing_stages,
        "skills": [{"stage": r.stage, "skill": r.skill, "version": r.version} for r in recs],
        "stage_telemetry": stage_log,
        "totals": telemetry.totals(stage_log),
        "counts": deckfacts.merge_counts(recs),
        "source_coverage": src_cov,
        "qa": qa,
        "confidence": {
            "by_stage": by_stage,
            "weighted_overall": {"score": wo, "band": confidence.band(wo)},
            "weakest_stage": {"stage": ws, "score": wss, "band": confidence.band(wss)},
        },
        "needs_verification": needs_ver or ["none reported"],
        "assumptions": harvest("assumptions") or ["none reported"],
        "conflicts": conflicts or ["none reported"],
        "skipped_by_design": skipped or [{"item": "none reported", "reason": "—", "stage": "—"}],
        "rendering_warnings": warnings or ["none reported"],
        "recommendations": rec_list,
    }

def synthesize(*, remaining_findings, by_stage_conf, needs_verification, conflicts, source_coverage):
    recs = []
    rf = remaining_findings or {}
    if rf.get("blockers", 0) > 0:
        recs.append({"priority": 1, "target": "presentation-qa / owning skills",
                     "action": f"Resolve {rf['blockers']} open blocker(s) before reissuing.",
                     "payoff": "Unblocks ship."})
    for stage, c in (by_stage_conf or {}).items():
        if c.get("band") == "Low":
            recs.append({"priority": 2, "target": stage,
                         "action": f"Raise {stage} confidence (score {c.get('score')}); address its findings/failed gates.",
                         "payoff": "Lifts weakest-stage floor + weighted overall."})
    if rf.get("majors", 0) > 0:
        recs.append({"priority": 3, "target": "owning skills",
                     "action": f"Clear {rf['majors']} accepted major(s) next iteration.",
                     "payoff": "Moves status toward clean PASS."})
    if conflicts:
        recs.append({"priority": 4, "target": "presentation-structure / source owners",
                     "action": f"Reconcile {len(conflicts)} conflicting source(s).",
                     "payoff": "Removes factual ambiguity."})
    if needs_verification:
        recs.append({"priority": 5, "target": "fact owners",
                     "action": f"Verify {len(needs_verification)} flagged claim(s).",
                     "payoff": "Converts Needs-Verification to sourced fact."})
    sc = source_coverage or {}
    ratio = sc.get("ratio")
    if isinstance(ratio, (int, float)) and ratio < 1.0 and sc.get("unconsumed"):
        recs.append({"priority": 6, "target": "presentation-structure intake",
                     "action": f"Review {len(sc['unconsumed'])} discovered-but-unconsumed source(s); "
                               "confirm intentional or fold in missed evidence.",
                     "payoff": "Improves source coverage."})
    if not recs:
        return [{"priority": 1, "target": "none",
                 "action": "Build is clean — no high-impact improvements identified.", "payoff": "—"}]
    return sorted(recs, key=lambda r: r["priority"])

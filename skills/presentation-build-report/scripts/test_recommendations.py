from scripts import recommendations

def syn(**kw):
    base = dict(remaining_findings={"blockers": 0, "majors": 0, "minors": 0},
                by_stage_conf={}, needs_verification=[], conflicts=[],
                source_coverage={"ratio": 1.0, "unconsumed": []})
    base.update(kw)
    return recommendations.synthesize(**base)

def test_clean_build_single_none_rec():
    recs = syn()
    assert len(recs) == 1 and recs[0]["target"] == "none"

def test_priority_ordering_blocker_first():
    recs = syn(remaining_findings={"blockers": 1, "majors": 2, "minors": 0},
               by_stage_conf={"qa": {"score": 50, "band": "Low"}},
               source_coverage={"ratio": 0.5, "unconsumed": ["x.pdf"]})
    prios = [r["priority"] for r in recs]
    assert prios == sorted(prios)
    assert recs[0]["priority"] == 1  # blockers highest impact

def test_low_conf_stage_named():
    recs = syn(by_stage_conf={"qa": {"score": 55, "band": "Low"}, "design": {"score": 90, "band": "High"}})
    assert any("qa" in r["target"] for r in recs)
    assert all("design" not in r["target"] for r in recs)

def test_coverage_gap_triggers_rec():
    recs = syn(source_coverage={"ratio": 0.6, "unconsumed": ["notes.txt"]})
    assert any("coverage" in r["action"].lower() or "unconsumed" in r["action"].lower() for r in recs)

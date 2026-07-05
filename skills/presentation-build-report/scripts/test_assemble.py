from scripts import assemble
from scripts.schema import StageRecord

def records():
    return [
        StageRecord.from_dict({"stage": "structure", "skill": "presentation-structure", "version": "1.0.0",
                               "majors": 1, "counts": {"slides": 14},
                               "sources": {"discovered": 12, "consumed": 9, "unconsumed": ["a.pdf", "b.txt", "c.pdf"]},
                               "assumptions": ["Q3 close assumed"], "conflicts": ["doc A vs doc B on ARR"]}),
        StageRecord.from_dict({"stage": "design", "skill": "presentation-design", "version": "1.0.0"}),
        StageRecord.from_dict({"stage": "copywriting", "skill": "presentation-copywriting", "version": "1.0.0",
                               "needs_verification": ["$1.8M savings unsourced"]}),
        StageRecord.from_dict({"stage": "diagram", "skill": "diagram-design", "version": "1.0.0",
                               "counts": {"diagrams": 3},
                               "skipped_by_design": [{"item": "5-item list", "reason": "no relation cues — kept as list"}]}),
        StageRecord.from_dict({"stage": "qa", "skill": "presentation-qa", "version": "1.0.0",
                               "majors": 2, "warnings": ["S7 y-axis units missing"]}),
    ]

def log():
    return [
        {"stage": "structure", "skill": "presentation-structure", "version": "1.0.0", "tokens": 84000, "duration_ms": 120000},
        {"stage": "design", "skill": "presentation-design", "version": "1.0.0", "tokens": None, "duration_ms": None, "note": "not captured (inline)"},
        {"stage": "copywriting", "skill": "presentation-copywriting", "version": "1.0.0", "tokens": 60000, "duration_ms": 90000},
        {"stage": "diagram", "skill": "diagram-design", "version": "1.0.0", "tokens": 50000, "duration_ms": 80000},
        {"stage": "qa", "skill": "presentation-qa", "version": "1.0.0", "tokens": 90000, "duration_ms": 600000},
    ]

def build():
    return assemble.assemble(
        stage_records=records(), stage_log=log(),
        qa={"verdict": "SHIP-WITH-ACCEPTED-MAJORS", "auto_fixes": 4,
            "remaining_findings": {"blockers": 0, "majors": 2, "minors": 1, "list": ["S7 units", "..."]}},
        render_errored=False, generated_at="2026-07-05T00:00:00Z")

def test_top_level_shape():
    r = build()
    assert r["pipeline_version"] == "1.0.0"
    assert [s["stage"] for s in r["skills"]] == ["structure", "design", "copywriting", "diagram", "qa"]
    assert r["totals"]["tokens"] == 284000
    assert r["totals"]["inline_stages"] == ["design"]
    assert r["counts"]["slides"] == 14 and r["counts"]["diagrams"] == 3

def test_confidence_block():
    r = build()["confidence"]
    assert r["by_stage"]["structure"]["score"] == 90   # 1 major
    assert r["by_stage"]["qa"]["score"] == 80           # 2 majors
    assert "render" not in r["by_stage"]                # render not scored
    assert r["weighted_overall"]["score"] > r["weakest_stage"]["score"]
    assert r["weakest_stage"]["stage"] == "qa"

def test_harvested_lists_carry_stage_and_reason():
    r = build()
    assert r["needs_verification"] == ["$1.8M savings unsourced"]
    assert r["conflicts"] == ["doc A vs doc B on ARR"]
    assert r["skipped_by_design"][0]["reason"]  # reason always present
    assert r["skipped_by_design"][0]["stage"] == "diagram"

def test_status_and_recommendations():
    r = build()
    assert r["build_status"] == "PASS WITH WARNINGS"   # accepted majors + warnings + needs-verify
    assert r["source_coverage"]["ratio"] == 0.75
    assert len(r["recommendations"]) >= 1

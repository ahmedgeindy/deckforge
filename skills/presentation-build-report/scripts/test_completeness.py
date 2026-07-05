from scripts import assemble, render_md
from scripts.schema import StageRecord

FULL = ["structure", "design", "copywriting", "diagram", "qa"]


def rec(stage):
    return StageRecord.from_dict({"stage": stage, "skill": stage, "version": "1.0.0"})


def clean_qa():
    return {"verdict": "SHIP", "auto_fixes": 0,
            "remaining_findings": {"blockers": 0, "majors": 0, "minors": 0, "list": []}}


def test_missing_expected_stage_forces_failed():
    # copywriting/design/diagram records dropped; expected set declares them
    r = assemble.assemble(stage_records=[rec("structure"), rec("qa")], stage_log=[],
                          qa=clean_qa(), render_errored=False, expected_stages=FULL)
    assert r["build_status"] == "FAILED"
    assert set(r["missing_stages"]) == {"design", "copywriting", "diagram"}


def test_all_expected_present_not_failed_for_completeness():
    r = assemble.assemble(stage_records=[rec(s) for s in FULL], stage_log=[],
                          qa=clean_qa(), render_errored=False, expected_stages=FULL)
    assert r["build_status"] == "PASS"
    assert r["missing_stages"] == []


def test_no_expected_stages_falls_back_to_nonempty():
    # backward-compatible: without a declared expected set, any records = complete
    r = assemble.assemble(stage_records=[rec("structure")], stage_log=[],
                          qa=clean_qa(), render_errored=False)
    assert r["build_status"] != "FAILED"
    assert r["missing_stages"] == []


def test_incomplete_build_surfaced_in_markdown():
    r = assemble.assemble(stage_records=[rec("structure")], stage_log=[],
                          qa=clean_qa(), render_errored=False, expected_stages=FULL)
    md = render_md.render(r)
    assert "Incomplete build" in md
    assert "design" in md and "copywriting" in md


def test_render_no_scored_stages_says_not_scored():
    # render-only build: no stage carries a confidence rubric
    r = assemble.assemble(stage_records=[rec("render")], stage_log=[],
                          qa=clean_qa(), render_errored=False)
    md = render_md.render(r)
    assert "not scored" in md
    assert "None — 0" not in md  # the old degenerate display must be gone


def test_render_auto_fixes_none_is_not_captured():
    r = assemble.assemble(stage_records=[rec(s) for s in FULL], stage_log=[],
                          qa={"verdict": "SHIP", "remaining_findings": {}},  # no auto_fixes key
                          render_errored=False, expected_stages=FULL)
    md = render_md.render(r)
    assert "Automatic QA fixes applied: not captured" in md


def test_recommendations_use_sequential_ordinal():
    # a build whose top signal is majors (priority 3) must still render "1." first
    r = assemble.assemble(stage_records=[rec(s) for s in FULL], stage_log=[],
                          qa={"verdict": "SHIP-WITH-ACCEPTED-MAJORS", "auto_fixes": 0,
                              "remaining_findings": {"blockers": 0, "majors": 2, "minors": 0, "list": []}},
                          render_errored=False, expected_stages=FULL)
    md = render_md.render(r)
    recs_section = md.split("## Recommendations", 1)[1]
    assert "\n1. " in recs_section        # sequential ordinal starts at 1
    assert "(P3)" in recs_section         # underlying priority tier still shown

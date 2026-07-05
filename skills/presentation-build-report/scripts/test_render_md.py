from scripts import assemble, render_md
from scripts.test_assemble import records, log

def report():
    return assemble.assemble(
        stage_records=records(), stage_log=log(),
        qa={"verdict": "SHIP-WITH-ACCEPTED-MAJORS", "auto_fixes": 4,
            "remaining_findings": {"blockers": 0, "majors": 2, "minors": 1, "list": ["S7 units"]}},
        render_errored=False, generated_at="2026-07-05T00:00:00Z")

def test_has_all_sections():
    md = render_md.render(report())
    for heading in ["Build Status", "Skills", "Version", "Telemetry", "Source Coverage",
                    "Confidence", "Weighted", "Weakest", "Needs Verification", "Assumptions",
                    "Conflicting", "Skipped by design", "Rendering Warnings", "Recommendations"]:
        assert heading in md, f"missing section: {heading}"

def test_declares_internal_never_deliverable():
    md = render_md.render(report()).lower()
    assert "internal" in md and ("never" in md and "deliverable" in md)

def test_skipped_by_design_shows_reason():
    md = render_md.render(report())
    assert "no relation cues" in md   # the reason text survives

def test_both_confidences_present_and_distinct():
    md = render_md.render(report())
    assert "Weighted overall" in md and "Weakest stage" in md

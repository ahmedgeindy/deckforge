from scripts import status

BASE = dict(qa_verdict="SHIP", render_errored=False, all_stages_complete=True,
            rendering_warnings=[], needs_verification=[], conflicts=[], low_conf_stages=[])

def test_pass_clean():
    assert status.build_status(**BASE) == "PASS"

def test_failed_on_blocked():
    assert status.build_status(**{**BASE, "qa_verdict": "BLOCKED"}) == "FAILED"

def test_failed_on_render_error():
    assert status.build_status(**{**BASE, "render_errored": True}) == "FAILED"

def test_failed_on_incomplete_stage():
    assert status.build_status(**{**BASE, "all_stages_complete": False}) == "FAILED"

def test_warnings_on_accepted_majors():
    assert status.build_status(**{**BASE, "qa_verdict": "SHIP-WITH-ACCEPTED-MAJORS"}) == "PASS WITH WARNINGS"

def test_warnings_on_each_soft_signal():
    for k in ["rendering_warnings", "needs_verification", "conflicts", "low_conf_stages"]:
        assert status.build_status(**{**BASE, k: ["x"]}) == "PASS WITH WARNINGS"

def test_verdict_normalization():
    assert status.build_status(**{**BASE, "qa_verdict": "ship with accepted majors"}) == "PASS WITH WARNINGS"
    assert status.build_status(**{**BASE, "qa_verdict": "blocked"}) == "FAILED"

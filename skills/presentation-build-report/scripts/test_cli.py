import json, os
from scripts import build_report

def _seed(tmp_path):
    inp = tmp_path / "inputs"
    inp.mkdir()
    (inp / "stage-records.json").write_text(json.dumps([
        {"stage": "structure", "skill": "presentation-structure", "version": "1.0.0", "counts": {"slides": 12}},
        {"stage": "qa", "skill": "presentation-qa", "version": "1.0.0", "majors": 1},
    ]), encoding="utf-8")
    (inp / "qa.json").write_text(json.dumps(
        {"verdict": "SHIP", "auto_fixes": 0, "remaining_findings": {"blockers": 0, "majors": 0, "minors": 0, "list": []}}
    ), encoding="utf-8")
    (inp / "meta.json").write_text(json.dumps({"render_errored": False}), encoding="utf-8")
    (tmp_path / "stage-log.json").write_text(json.dumps([
        {"stage": "structure", "tokens": 10, "duration_ms": 100},
        {"stage": "qa", "tokens": 20, "duration_ms": 200},
    ]), encoding="utf-8")
    return str(tmp_path)

def test_run_writes_both_outputs(tmp_path):
    bd = _seed(tmp_path)
    report = build_report.run(bd)
    assert os.path.exists(os.path.join(bd, "execution-report.json"))
    assert os.path.exists(os.path.join(bd, "execution-report.md"))
    saved = json.load(open(os.path.join(bd, "execution-report.json"), encoding="utf-8"))
    assert saved["build_status"] in ("PASS", "PASS WITH WARNINGS")
    assert saved["totals"]["tokens"] == 30
    assert report["pipeline_version"] == "1.0.0"

def test_failed_build_status(tmp_path):
    bd = _seed(tmp_path)
    import json as J
    p = os.path.join(bd, "inputs", "qa.json")
    q = J.load(open(p, encoding="utf-8")); q["verdict"] = "BLOCKED"
    J.dump(q, open(p, "w", encoding="utf-8"))
    report = build_report.run(bd)
    assert report["build_status"] == "FAILED"

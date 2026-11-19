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


# ---- input errors and working directory (CLI level) --------------------------------

import subprocess
import sys

import pytest

SCRIPT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "build_report.py")


def _cli(build_dir, cwd):
    return subprocess.run([sys.executable, SCRIPT, str(build_dir)], cwd=str(cwd),
                          capture_output=True, text=True, encoding="utf-8")


def test_runs_from_any_working_directory(tmp_path):
    (tmp_path / "build").mkdir()
    bd = _seed(tmp_path / "build")
    elsewhere = tmp_path / "elsewhere"
    elsewhere.mkdir()
    r = _cli(bd, elsewhere)
    assert r.returncode == 0, r.stderr
    assert r.stdout.startswith("BUILD STATUS: ")
    assert os.path.exists(os.path.join(bd, "execution-report.json"))


def test_module_form_still_works_from_the_skill_directory(tmp_path):
    (tmp_path / "build").mkdir()
    bd = _seed(tmp_path / "build")
    skill_dir = os.path.dirname(os.path.dirname(SCRIPT))
    r = subprocess.run([sys.executable, "-m", "scripts.build_report", bd], cwd=skill_dir,
                       capture_output=True, text=True, encoding="utf-8")
    assert r.returncode == 0, r.stderr


def _write(tmp_path, rel, text):
    p = tmp_path / rel
    p.parent.mkdir(parents=True, exist_ok=True)
    p.write_text(text, encoding="utf-8")


@pytest.mark.parametrize("rel,text,expect", [
    ("inputs/stage-records.json", '[{"skill": "x"}]', "missing required field 'stage'"),
    ("inputs/stage-records.json", '[{"stage": "qa", "skill": "presentation-qa", "majors": "two"}]', "majors must be a whole number"),
    ("inputs/stage-records.json", "{bad", "is not valid JSON"),
    ("inputs/stage-records.json", '{"stage": "qa"}', "must be a JSON list"),
    ("inputs/qa.json", '{"verdict": "BLOCKD"}', "not recognised"),
    ("inputs/meta.json", '{"render_errored": "no"}', "render_errored must be true or false"),
    ("stage-log.json", '[{"stage": "qa", "tokens": "84k"}]', "tokens must be a whole number"),
])
def test_bad_input_gives_a_clear_error_and_no_traceback(tmp_path, rel, text, expect):
    bd = tmp_path / "build"
    _write(bd, "inputs/stage-records.json", '[{"stage": "qa", "skill": "presentation-qa"}]')
    _write(bd, rel, text)
    r = _cli(bd, tmp_path)
    assert r.returncode == 1
    assert "Traceback" not in r.stderr
    assert r.stderr.startswith("ERROR: ")
    assert expect in r.stderr
    assert "Fix:" in r.stderr
    assert not os.path.exists(bd / "execution-report.json"), "nothing is written on bad input"
    assert not os.path.exists(bd / "execution-report.md")


def test_missing_build_directory_is_a_clear_error(tmp_path):
    r = _cli(tmp_path / "nope", tmp_path)
    assert r.returncode == 1
    assert "Traceback" not in r.stderr
    assert "does not exist" in r.stderr


def test_no_arguments_prints_usage_with_both_forms():
    r = subprocess.run([sys.executable, SCRIPT], capture_output=True, text=True, encoding="utf-8")
    assert r.returncode == 1
    assert "build_report.py <build_dir>" in r.stderr and "-m scripts.build_report" in r.stderr


def test_shipped_example_inputs_still_validate():
    from scripts import validate
    root = os.path.abspath(os.path.join(os.path.dirname(SCRIPT), "..", "..", "..", "examples", "build-report-sample"))
    inputs = os.path.join(root, "expected-output", "inputs")
    if not os.path.isdir(inputs):
        pytest.skip("examples/ is not present in an installed skill")
    validate.validate_stage_records(validate.load_json(os.path.join(inputs, "stage-records.json"), "r"))
    validate.validate_qa(validate.load_json(os.path.join(inputs, "qa.json"), "q"))
    validate.validate_meta(validate.load_json(os.path.join(inputs, "meta.json"), "m"))
    validate.validate_stage_log(validate.load_json(os.path.join(root, "package", "stage-log.json"), "s"))

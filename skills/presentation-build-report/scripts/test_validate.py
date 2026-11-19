import json

import pytest

from scripts import validate
from scripts.validate import InputError


def rec(**kw):
    return {"stage": "qa", "skill": "presentation-qa", **kw}


def msg(fn, data):
    with pytest.raises(InputError) as e:
        fn(data)
    return str(e.value)


# ---- stage records ----------------------------------------------------------

def test_valid_records_pass_and_unknown_keys_are_allowed():
    data = [rec(version="1.0.0", majors=2, counts={"slides": 3, "diagrams": None},
                sources={"discovered": 4, "consumed": 3, "unconsumed": ["a.pdf"]},
                skipped_by_design=[{"item": "x"}], extra_key="ignored")]
    assert validate.validate_stage_records(data) is data


def test_empty_list_is_valid():
    assert validate.validate_stage_records([]) == []


def test_records_must_be_a_list():
    assert "must be a JSON list" in msg(validate.validate_stage_records, {"stage": "qa"})


def test_record_must_be_an_object():
    m = msg(validate.validate_stage_records, ["qa"])
    assert "stage-records.json[0] must be an object, got a string" in m


def test_missing_stage_names_the_record_and_field():
    m = msg(validate.validate_stage_records, [{"skill": "x"}])
    assert m == "stage-records.json[0] is missing required field 'stage'"


def test_missing_skill_mentions_the_stage():
    m = msg(validate.validate_stage_records, [{"stage": "design"}])
    assert "[0] (stage 'design') is missing required field 'skill'" in m


def test_empty_stage_string_rejected():
    assert "stage must be a non-empty string" in msg(validate.validate_stage_records, [{"stage": " ", "skill": "x"}])


@pytest.mark.parametrize("field", ["blockers", "majors", "minors", "failed_gates"])
@pytest.mark.parametrize("bad", ["two", -1, 1.5, True, None])
def test_counters_must_be_whole_numbers(field, bad):
    m = msg(validate.validate_stage_records, [rec(**{field: bad})])
    assert f".{field} must be a whole number >= 0" in m
    assert "(stage 'qa')" in m


@pytest.mark.parametrize("field", ["assumptions", "needs_verification", "conflicts", "warnings"])
def test_string_lists_checked(field):
    assert f".{field} must be a list of strings, got a string" in msg(validate.validate_stage_records, [rec(**{field: "oops"})])
    assert f".{field}[1] must be a string, got a number" in msg(validate.validate_stage_records, [rec(**{field: ["ok", 5]})])


def test_version_must_be_string():
    assert ".version must be a string" in msg(validate.validate_stage_records, [rec(version=1)])


def test_skipped_by_design_shape():
    assert "skipped_by_design must be a list" in msg(validate.validate_stage_records, [rec(skipped_by_design="x")])
    assert "skipped_by_design[0] must be an object" in msg(validate.validate_stage_records, [rec(skipped_by_design=["x"])])
    assert "skipped_by_design[0].item must be a string" in msg(validate.validate_stage_records, [rec(skipped_by_design=[{"reason": "r"}])])
    assert "skipped_by_design[0].reason must be a string" in msg(validate.validate_stage_records, [rec(skipped_by_design=[{"item": "i", "reason": 3}])])


def test_counts_and_sources_shape():
    assert "counts must be an object" in msg(validate.validate_stage_records, [rec(counts=[1])])
    assert "counts.slides must be a whole number" in msg(validate.validate_stage_records, [rec(counts={"slides": "12"})])
    assert "sources must be an object" in msg(validate.validate_stage_records, [rec(sources=3)])
    assert "sources.discovered must be a whole number" in msg(validate.validate_stage_records, [rec(sources={"discovered": "9"})])
    assert "sources.unconsumed must be a list of strings" in msg(validate.validate_stage_records, [rec(sources={"unconsumed": "a.pdf"})])


# ---- qa / meta / stage-log ---------------------------------------------------

def test_qa_valid_forms():
    for v in ("SHIP", "ship with accepted majors", "SHIP-WITH-ACCEPTED-MAJORS", "blocked"):
        validate.validate_qa({"verdict": v})
    validate.validate_qa({})  # every key is optional


def test_qa_unknown_verdict_is_an_error_not_a_pass():
    m = msg(validate.validate_qa, {"verdict": "BLOCKD"})
    assert "not recognised" in m and "BLOCKED" in m


def test_qa_shape_errors():
    assert "must be a JSON object" in msg(validate.validate_qa, [])
    assert "verdict must be a string" in msg(validate.validate_qa, {"verdict": 1})
    assert "auto_fixes must be a whole number" in msg(validate.validate_qa, {"auto_fixes": "4"})
    assert "remaining_findings must be an object" in msg(validate.validate_qa, {"remaining_findings": 2})
    assert "remaining_findings.majors must be a whole number" in msg(validate.validate_qa, {"remaining_findings": {"majors": "2"}})
    assert "remaining_findings.list must be a list of strings" in msg(validate.validate_qa, {"remaining_findings": {"list": "x"}})


def test_meta_shape():
    validate.validate_meta({"render_errored": False, "expected_stages": ["qa"]})
    assert "render_errored must be true or false" in msg(validate.validate_meta, {"render_errored": "false"})
    assert "expected_stages must be a list of strings" in msg(validate.validate_meta, {"expected_stages": "qa"})
    assert "must be a JSON object" in msg(validate.validate_meta, [])


def test_stage_log_shape():
    validate.validate_stage_log([{"stage": "design", "tokens": None, "duration_ms": None, "note": "inline"}])
    assert "must be a JSON list" in msg(validate.validate_stage_log, {})
    assert "stage-log.json[0] must be an object" in msg(validate.validate_stage_log, [1])
    assert "stage-log.json[1].tokens must be a whole number" in msg(validate.validate_stage_log, [{}, {"tokens": "84k"}])


# ---- loading ------------------------------------------------------------------

def test_load_json_reports_position_of_syntax_error(tmp_path):
    p = tmp_path / "x.json"
    p.write_text('{\n  "a": 1,\n  oops\n}', encoding="utf-8")
    with pytest.raises(InputError) as e:
        validate.load_json(str(p), "inputs/x.json")
    m = str(e.value)
    assert "inputs/x.json" in m and "is not valid JSON" in m and "line 3 column 3" in m


def test_load_json_accepts_a_utf8_bom(tmp_path):
    p = tmp_path / "x.json"
    p.write_bytes(b"\xef\xbb\xbf" + json.dumps({"a": 1}).encode())
    assert validate.load_json(str(p), "x") == {"a": 1}


def test_load_json_rejects_non_utf8(tmp_path):
    p = tmp_path / "x.json"
    p.write_bytes(b"\xff\xfe\x00bad")
    with pytest.raises(InputError, match="not valid UTF-8"):
        validate.load_json(str(p), "x")

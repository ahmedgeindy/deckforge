"""Input validation for the build-report CLI.

Every function raises ``InputError`` with a message that names the file, the
record or field, what was expected and what was found, so the orchestrating
agent can fix the input instead of reading a Python traceback. Nothing here
changes what a *valid* input produces; unknown extra keys are still ignored
(see references/report-schema.md).
"""
import json
import re

_COUNTERS = ("blockers", "majors", "minors", "failed_gates")
_STR_LISTS = ("assumptions", "needs_verification", "conflicts", "warnings")
_COUNT_KEYS = ("slides", "diagrams", "screenshots_used", "screenshots_discarded")
_VERDICTS = ("SHIP", "SHIPWITHACCEPTEDMAJORS", "BLOCKED")


class InputError(Exception):
    """The build inputs are unusable; the message says why and how to fix it."""


def _kind(value):
    if value is None:
        return "null"
    if isinstance(value, bool):
        return "a boolean"
    if isinstance(value, (int, float)):
        return "a number"
    if isinstance(value, str):
        return "a string"
    if isinstance(value, list):
        return "a list"
    if isinstance(value, dict):
        return "an object"
    return type(value).__name__


def _is_int(value):
    return isinstance(value, int) and not isinstance(value, bool)


def _need_int(value, where, allow_none=False):
    if value is None and allow_none:
        return
    if not _is_int(value) or value < 0:
        raise InputError(f"{where} must be a whole number >= 0, got {_kind(value)} ({json.dumps(value)})")


def _need_str_list(value, where):
    if not isinstance(value, list):
        raise InputError(f"{where} must be a list of strings, got {_kind(value)}")
    for i, item in enumerate(value):
        if not isinstance(item, str):
            raise InputError(f"{where}[{i}] must be a string, got {_kind(item)}")


def load_json(path, label):
    """Read a UTF-8 JSON file (a leading BOM is accepted); raise InputError on any failure."""
    try:
        with open(path, encoding="utf-8-sig") as f:
            return json.load(f)
    except json.JSONDecodeError as e:
        raise InputError(
            f"{label} ({path}) is not valid JSON: {e.msg} at line {e.lineno} column {e.colno}") from None
    except UnicodeDecodeError:
        raise InputError(f"{label} ({path}) is not valid UTF-8 text") from None
    except OSError as e:
        raise InputError(f"{label} ({path}) could not be read: {e.strerror or e}") from None


def validate_stage_records(data, label="stage-records.json"):
    if not isinstance(data, list):
        raise InputError(f"{label} must be a JSON list of stage records, got {_kind(data)}")
    for i, rec in enumerate(data):
        name = rec.get("stage") if isinstance(rec, dict) and isinstance(rec.get("stage"), str) else None
        where = f"{label}[{i}]" + (f" (stage '{name}')" if name else "")
        if not isinstance(rec, dict):
            raise InputError(f"{where} must be an object, got {_kind(rec)}")
        for key in ("stage", "skill"):
            if key not in rec:
                raise InputError(f"{where} is missing required field '{key}'")
            if not isinstance(rec[key], str) or not rec[key].strip():
                raise InputError(f"{where}.{key} must be a non-empty string, got {_kind(rec[key])}")
        if "version" in rec and not isinstance(rec["version"], str):
            raise InputError(f"{where}.version must be a string, got {_kind(rec['version'])}")
        for key in _COUNTERS:
            if key in rec:
                _need_int(rec[key], f"{where}.{key}")
        for key in _STR_LISTS:
            if key in rec:
                _need_str_list(rec[key], f"{where}.{key}")
        if "skipped_by_design" in rec:
            sk = rec["skipped_by_design"]
            if not isinstance(sk, list):
                raise InputError(f"{where}.skipped_by_design must be a list, got {_kind(sk)}")
            for j, entry in enumerate(sk):
                if not isinstance(entry, dict):
                    raise InputError(
                        f'{where}.skipped_by_design[{j}] must be an object like {{"item": "...", "reason": "..."}}, got {_kind(entry)}')
                if not isinstance(entry.get("item"), str):
                    raise InputError(f"{where}.skipped_by_design[{j}].item must be a string, got {_kind(entry.get('item'))}")
                if "reason" in entry and not isinstance(entry["reason"], str):
                    raise InputError(f"{where}.skipped_by_design[{j}].reason must be a string, got {_kind(entry['reason'])}")
        if "counts" in rec:
            counts = rec["counts"]
            if not isinstance(counts, dict):
                raise InputError(f"{where}.counts must be an object, got {_kind(counts)}")
            for key in _COUNT_KEYS:
                if key in counts:
                    _need_int(counts[key], f"{where}.counts.{key}", allow_none=True)
        if "sources" in rec:
            src = rec["sources"]
            if not isinstance(src, dict):
                raise InputError(f"{where}.sources must be an object, got {_kind(src)}")
            for key in ("discovered", "consumed"):
                if key in src:
                    _need_int(src[key], f"{where}.sources.{key}", allow_none=True)
            if "unconsumed" in src:
                _need_str_list(src["unconsumed"], f"{where}.sources.unconsumed")
    return data


def validate_qa(data, label="qa.json"):
    if not isinstance(data, dict):
        raise InputError(f"{label} must be a JSON object, got {_kind(data)}")
    if "verdict" in data:
        v = data["verdict"]
        if not isinstance(v, str):
            raise InputError(f"{label}: verdict must be a string, got {_kind(v)}")
        # An unrecognised verdict would otherwise be treated as "not blocked", so a
        # typo like "BLOCKD" could turn a failed build into a passing one.
        if re.sub(r"[^A-Z]", "", v.upper()) not in _VERDICTS:
            raise InputError(
                f"{label}: verdict {json.dumps(v)} is not recognised; use SHIP, SHIP-WITH-ACCEPTED-MAJORS or BLOCKED")
    if "auto_fixes" in data:
        _need_int(data["auto_fixes"], f"{label}: auto_fixes")
    if "remaining_findings" in data:
        rf = data["remaining_findings"]
        if not isinstance(rf, dict):
            raise InputError(f"{label}: remaining_findings must be an object, got {_kind(rf)}")
        for key in ("blockers", "majors", "minors"):
            if key in rf:
                _need_int(rf[key], f"{label}: remaining_findings.{key}")
        if "list" in rf:
            _need_str_list(rf["list"], f"{label}: remaining_findings.list")
    return data


def validate_meta(data, label="meta.json"):
    if not isinstance(data, dict):
        raise InputError(f"{label} must be a JSON object, got {_kind(data)}")
    if "render_errored" in data and not isinstance(data["render_errored"], bool):
        raise InputError(f"{label}: render_errored must be true or false, got {_kind(data['render_errored'])}")
    if "expected_stages" in data and data["expected_stages"] is not None:
        _need_str_list(data["expected_stages"], f"{label}: expected_stages")
    return data


def validate_stage_log(data, label="stage-log.json"):
    if not isinstance(data, list):
        raise InputError(f"{label} must be a JSON list of telemetry entries, got {_kind(data)}")
    for i, entry in enumerate(data):
        where = f"{label}[{i}]"
        if not isinstance(entry, dict):
            raise InputError(f"{where} must be an object, got {_kind(entry)}")
        for key in ("tokens", "duration_ms"):
            if key in entry:
                _need_int(entry[key], f"{where}.{key}", allow_none=True)
    return data

import json
import os
import sys

# `python <skill dir>/scripts/build_report.py <build_dir>` puts scripts/ itself on
# sys.path, not its parent, so the `from scripts import ...` below would fail unless
# the current directory happened to be the skill directory. Make the skill directory
# importable explicitly so the command works from any working directory.
_SKILL_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if _SKILL_DIR not in sys.path:
    sys.path.insert(0, _SKILL_DIR)

from scripts import assemble  # noqa: E402
from scripts import validate  # noqa: E402
from scripts.schema import StageRecord  # noqa: E402


def _load(path, default, label, validator):
    if not os.path.exists(path):
        return default
    return validator(validate.load_json(path, label), label)


def run(build_dir):
    inp = os.path.join(build_dir, "inputs")
    if not os.path.isdir(build_dir):
        raise validate.InputError(f"build directory {build_dir!r} does not exist or is not a directory")
    raw_records = _load(os.path.join(inp, "stage-records.json"), [],
                        "inputs/stage-records.json", validate.validate_stage_records)
    stage_records = [StageRecord.from_dict(d) for d in raw_records]
    qa = _load(os.path.join(inp, "qa.json"),
               {"verdict": "SHIP", "auto_fixes": 0,
                "remaining_findings": {"blockers": 0, "majors": 0, "minors": 0, "list": []}},
               "inputs/qa.json", validate.validate_qa)
    meta = _load(os.path.join(inp, "meta.json"), {"render_errored": False},
                 "inputs/meta.json", validate.validate_meta)
    stage_log = _load(os.path.join(build_dir, "stage-log.json"), [],
                      "stage-log.json", validate.validate_stage_log)

    report = assemble.assemble(stage_records=stage_records, stage_log=stage_log,
                               qa=qa, render_errored=bool(meta.get("render_errored")),
                               expected_stages=meta.get("expected_stages"))

    from scripts import render_md
    with open(os.path.join(build_dir, "execution-report.json"), "w", encoding="utf-8") as f:
        json.dump(report, f, indent=2, ensure_ascii=False)
    with open(os.path.join(build_dir, "execution-report.md"), "w", encoding="utf-8") as f:
        f.write(render_md.render(report))
    return report


def main(argv=None):
    argv = argv or sys.argv[1:]
    if not argv:
        print("usage: python <skill dir>/scripts/build_report.py <build_dir>\n"
              "   or: python -m scripts.build_report <build_dir>   (run from the skill directory)", file=sys.stderr)
        return 1
    try:
        report = run(argv[0])
    except validate.InputError as e:
        print(f"ERROR: {e}", file=sys.stderr)
        print("Fix: correct that input (schema: references/report-schema.md) and re-run. "
              "Nothing was written.", file=sys.stderr)
        return 1
    print(f"BUILD STATUS: {report['build_status']}")
    return 2 if report["build_status"] == "FAILED" else 0


if __name__ == "__main__":
    raise SystemExit(main())

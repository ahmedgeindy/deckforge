import json
import os
import sys

from scripts import assemble
from scripts.schema import StageRecord


def _load(path, default):
    if not os.path.exists(path):
        return default
    with open(path, encoding="utf-8") as f:
        return json.load(f)


def run(build_dir):
    inp = os.path.join(build_dir, "inputs")
    raw_records = _load(os.path.join(inp, "stage-records.json"), [])
    stage_records = [StageRecord.from_dict(d) for d in raw_records]
    qa = _load(os.path.join(inp, "qa.json"),
               {"verdict": "SHIP", "auto_fixes": 0,
                "remaining_findings": {"blockers": 0, "majors": 0, "minors": 0, "list": []}})
    meta = _load(os.path.join(inp, "meta.json"), {"render_errored": False})
    stage_log = _load(os.path.join(build_dir, "stage-log.json"), [])

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
        print("usage: python -m scripts.build_report <build_dir>", file=sys.stderr)
        return 1
    report = run(argv[0])
    print(f"BUILD STATUS: {report['build_status']}")
    return 2 if report["build_status"] == "FAILED" else 0


if __name__ == "__main__":
    raise SystemExit(main())

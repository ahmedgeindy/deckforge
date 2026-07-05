import pathlib
import re

SKILLS = ["presentation-structure", "presentation-design", "presentation-copywriting",
          "diagram-design", "presentation-qa", "presentation-build-report"]


def test_every_skill_declares_version():
    # test file lives in .../skills/presentation-build-report/scripts/ -> skills root is parents[2]
    root = pathlib.Path(__file__).resolve().parents[2]
    for s in SKILLS:
        text = (root / s / "SKILL.md").read_text(encoding="utf-8")
        fm = text.split("---", 2)[1]  # first frontmatter block
        assert re.search(r"^version:\s*\d+\.\d+\.\d+\s*$", fm, re.M), f"{s} missing version"

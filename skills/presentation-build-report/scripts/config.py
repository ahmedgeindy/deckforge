PIPELINE_VERSION = "1.0.0"

STAGE_ORDER = ["structure", "design", "copywriting", "diagram", "render", "qa"]

STAGE_WEIGHTS = {
    "structure": 0.25,
    "copywriting": 0.20,
    "qa": 0.25,
    "design": 0.15,
    "diagram": 0.15,
}

CONFIDENCE_STAGES = ["structure", "design", "copywriting", "diagram", "qa"]

PENALTIES = {"blocker": 25, "major": 10, "minor": 3, "failed_gate": 15}

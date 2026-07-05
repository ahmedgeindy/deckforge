from scripts import config


def stage_score(record):
    p = config.PENALTIES
    off = (record.blockers * p["blocker"] + record.majors * p["major"]
           + record.minors * p["minor"] + record.failed_gates * p["failed_gate"])
    return max(0, min(100, 100 - off))


def band(score):
    if score >= 85:
        return "High"
    if score >= 60:
        return "Medium"
    return "Low"


def weighted_overall(stage_scores):
    present = {s: sc for s, sc in stage_scores.items() if s in config.STAGE_WEIGHTS}
    if not present:
        return 0.0
    total_w = sum(config.STAGE_WEIGHTS[s] for s in present)
    weighted = sum(sc * config.STAGE_WEIGHTS[s] for s, sc in present.items()) / total_w
    return round(weighted, 1)


def weakest_stage(stage_scores):
    if not stage_scores:
        return (None, 0)
    stage = min(stage_scores, key=lambda s: stage_scores[s])
    return (stage, stage_scores[stage])
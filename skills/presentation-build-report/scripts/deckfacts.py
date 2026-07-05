from scripts import config

_COUNT_KEYS = ["slides", "diagrams", "screenshots_used", "screenshots_discarded"]


def _stage_rank(stage):
    return config.STAGE_ORDER.index(stage) if stage in config.STAGE_ORDER else -1


def merge_counts(records):
    out = {}
    for key in _COUNT_KEYS:
        best_rank, best_val = -2, "not captured"
        for r in records:
            v = r.counts.get(key)
            if v is not None and _stage_rank(r.stage) >= best_rank:
                best_rank, best_val = _stage_rank(r.stage), v
        out[key] = best_val
    return out


def source_coverage(records):
    discovered = consumed = None
    unconsumed = []
    seen = set()
    for r in records:
        s = r.sources or {}
        if s.get("discovered") is not None:
            discovered = max(discovered or 0, s["discovered"])
        if s.get("consumed") is not None:
            consumed = max(consumed or 0, s["consumed"])
        for item in s.get("unconsumed", []):
            if item not in seen:
                seen.add(item)
                unconsumed.append(item)
    if discovered is None and consumed is None:
        return {"discovered": "not captured", "consumed": "not captured",
                "ratio": "not captured", "unconsumed": []}
    ratio = round(consumed / discovered, 2) if discovered else "not captured"
    return {"discovered": discovered if discovered is not None else "not captured",
            "consumed": consumed if consumed is not None else "not captured",
            "ratio": ratio, "unconsumed": unconsumed}

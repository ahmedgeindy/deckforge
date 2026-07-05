def totals(stage_log):
    tokens = 0
    duration_ms = 0
    inline = []
    for e in stage_log:
        tok, dur = e.get("tokens"), e.get("duration_ms")
        if tok is None or dur is None:
            inline.append(e.get("stage"))
            continue
        tokens += tok
        duration_ms += dur
    return {
        "tokens": tokens,
        "duration_ms": duration_ms,
        "duration_s": round(duration_ms / 1000, 1),
        "inline_stages": inline,
    }

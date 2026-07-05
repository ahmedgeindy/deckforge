from scripts import telemetry

def test_totals_sum_and_inline_exclusion():
    log = [
        {"stage": "structure", "tokens": 84000, "duration_ms": 120000},
        {"stage": "design", "tokens": None, "duration_ms": None, "note": "not captured (inline)"},
        {"stage": "qa", "tokens": 90000, "duration_ms": 600000},
    ]
    t = telemetry.totals(log)
    assert t["tokens"] == 174000
    assert t["duration_ms"] == 720000
    assert t["duration_s"] == 720.0
    assert t["inline_stages"] == ["design"]

def test_empty_log():
    t = telemetry.totals([])
    assert t["tokens"] == 0 and t["inline_stages"] == []

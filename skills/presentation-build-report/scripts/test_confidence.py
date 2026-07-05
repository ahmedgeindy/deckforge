from scripts import confidence
from scripts.schema import StageRecord

def mk(**kw):
    return StageRecord.from_dict({"stage": "x", "skill": "x", **kw})

def test_clean_stage_is_100_high():
    assert confidence.stage_score(mk()) == 100
    assert confidence.band(100) == "High"

def test_penalty_arithmetic():
    # 1 blocker(25) + 2 majors(20) + 1 minor(3) + 1 failed_gate(15) = 63 off -> 37
    assert confidence.stage_score(mk(blockers=1, majors=2, minors=1, failed_gates=1)) == 37

def test_clamped_at_zero():
    assert confidence.stage_score(mk(blockers=10)) == 0

def test_bands():
    assert confidence.band(85) == "High"
    assert confidence.band(84) == "Medium"
    assert confidence.band(60) == "Medium"
    assert confidence.band(59) == "Low"

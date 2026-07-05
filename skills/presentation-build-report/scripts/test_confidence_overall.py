from scripts import confidence

def test_weighted_all_present():
    scores = {"structure": 100, "copywriting": 100, "qa": 60, "design": 100, "diagram": 100}
    # 0.25*100+0.20*100+0.25*60+0.15*100+0.15*100 = 90.0
    assert confidence.weighted_overall(scores) == 90.0

def test_weight_redistribution_when_stage_absent():
    # diagram absent: remaining weights {0.25,0.20,0.25,0.15} sum 0.85, renormalized
    scores = {"structure": 100, "copywriting": 100, "qa": 60, "design": 100}
    exp = (0.25*100 + 0.20*100 + 0.25*60 + 0.15*100) / 0.85
    assert confidence.weighted_overall(scores) == round(exp, 1)

def test_weakest_stage():
    scores = {"structure": 96, "copywriting": 88, "qa": 74, "design": 90, "diagram": 91}
    assert confidence.weakest_stage(scores) == ("qa", 74)

def test_weighted_never_equals_weakest_when_others_high():
    scores = {"structure": 100, "copywriting": 100, "qa": 40, "design": 100, "diagram": 100}
    w = confidence.weighted_overall(scores)
    assert w > 40  # deck must not inherit its lowest stage

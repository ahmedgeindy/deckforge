from scripts import deckfacts
from scripts.schema import StageRecord

def mk(stage, **kw):
    return StageRecord.from_dict({"stage": stage, "skill": stage, **kw})

def test_merge_counts_latest_stage_wins():
    recs = [
        mk("structure", counts={"slides": 14}),
        mk("diagram", counts={"diagrams": 3}),
        mk("render", counts={"slides": 15, "screenshots_used": 5, "screenshots_discarded": 2}),
    ]
    c = deckfacts.merge_counts(recs)
    assert c["slides"] == 15          # render later than structure
    assert c["diagrams"] == 3
    assert c["screenshots_used"] == 5
    assert c["screenshots_discarded"] == 2

def test_merge_counts_missing_is_not_captured():
    c = deckfacts.merge_counts([mk("structure", counts={"slides": 10})])
    assert c["slides"] == 10
    assert c["diagrams"] == "not captured"

def test_source_coverage():
    recs = [mk("structure", sources={"discovered": 12, "consumed": 9, "unconsumed": ["a.pdf", "b.txt"]})]
    sc = deckfacts.source_coverage(recs)
    assert sc["discovered"] == 12 and sc["consumed"] == 9
    assert sc["ratio"] == 0.75
    assert sc["unconsumed"] == ["a.pdf", "b.txt"]

def test_source_coverage_absent():
    sc = deckfacts.source_coverage([mk("structure")])
    assert sc["discovered"] == "not captured" and sc["unconsumed"] == []

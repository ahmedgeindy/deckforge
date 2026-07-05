from scripts import config, schema

def test_config_constants():
    assert config.PIPELINE_VERSION == "1.0.0"
    assert abs(sum(config.STAGE_WEIGHTS.values()) - 1.0) < 1e-9
    assert config.CONFIDENCE_STAGES == ["structure", "design", "copywriting", "diagram", "qa"]
    assert "render" not in config.CONFIDENCE_STAGES
    assert config.PENALTIES == {"blocker": 25, "major": 10, "minor": 3, "failed_gate": 15}

def test_stagerecord_roundtrip_and_defaults():
    r = schema.StageRecord.from_dict({"stage": "structure", "skill": "presentation-structure", "version": "1.0.0"})
    assert r.blockers == 0 and r.majors == 0 and r.minors == 0 and r.failed_gates == 0
    assert r.assumptions == [] and r.skipped_by_design == [] and r.counts == {} and r.sources == {}
    d = r.to_dict()
    assert d["stage"] == "structure" and d["version"] == "1.0.0"
    assert schema.StageRecord.from_dict(d).to_dict() == d

def test_stagerecord_missing_version_defaults_unversioned():
    r = schema.StageRecord.from_dict({"stage": "diagram", "skill": "diagram-design"})
    assert r.version == "unversioned"

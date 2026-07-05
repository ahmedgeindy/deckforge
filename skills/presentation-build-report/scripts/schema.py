from dataclasses import dataclass, field, asdict


@dataclass
class StageRecord:
    stage: str
    skill: str
    version: str = "unversioned"
    blockers: int = 0
    majors: int = 0
    minors: int = 0
    failed_gates: int = 0
    assumptions: list = field(default_factory=list)
    needs_verification: list = field(default_factory=list)
    conflicts: list = field(default_factory=list)
    skipped_by_design: list = field(default_factory=list)  # [{"item","reason"}]
    counts: dict = field(default_factory=dict)              # slides/diagrams/screenshots_used/screenshots_discarded
    sources: dict = field(default_factory=dict)             # {discovered,consumed,unconsumed[]}
    warnings: list = field(default_factory=list)

    @classmethod
    def from_dict(cls, d):
        allowed = {f for f in cls.__dataclass_fields__}
        return cls(**{k: v for k, v in d.items() if k in allowed})

    def to_dict(self):
        return asdict(self)

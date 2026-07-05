def _norm(verdict):
    return "".join(ch for ch in (verdict or "").upper() if ch.isalpha())


def build_status(*, qa_verdict, render_errored, all_stages_complete,
                 rendering_warnings, needs_verification, conflicts, low_conf_stages):
    v = _norm(qa_verdict)
    if v == "BLOCKED" or render_errored or not all_stages_complete:
        return "FAILED"
    soft = (v == "SHIPWITHACCEPTEDMAJORS"
            or rendering_warnings or needs_verification or conflicts or low_conf_stages)
    return "PASS WITH WARNINGS" if soft else "PASS"

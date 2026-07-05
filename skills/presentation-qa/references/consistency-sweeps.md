> Extracted from the presentation-qa master knowledge base (research synthesis, 2026-07-03).
> Lanes: [COG] [PROC]; upstream contracts [STR] [DES] — see sources-and-conflicts.md.

# Cross-slide consistency sweeps (Pass 6 — all NEW)

Method: **extract, then enforce** — never check consistency from memory. Two sub-passes [PROC §4.12]:

## 3.1 The deck style sheet (sub-pass A: extraction)
Machine-extract the deck's de-facto decisions into a sheet; Pass 0 lint seeds it, Pass 6 completes it:
- **Terminology**: one canonical name per product/feature/concept (no rotating synonyms); feature names and navigation strings verbatim-authentic [STR §5 lesson 9]; each acronym defined once then used consistently.
- **Numbers**: decimal places, thousands separators, currency symbols, unit style (%, pp, ×), rounding policy.
- **Dates**: one format deck-wide; fiscal-vs-calendar declared.
- **Capitalization**: one rule per text role; product-name casing verbatim.
- **Punctuation**: terminal periods on bullets all-or-none per role; serial comma; dash style.
The sheet doubles as the lint exception list (proper nouns, brand spellings) [PROC §10.31]. Token-layer consistency (fonts, colors, spacing, title anchor) is [DES §9.3 check 18] — ASSERT, don't re-sweep.

## 3.2 Enforcement sweeps (sub-pass B: matching)
- **S1 · Number ledger** ⛔ — every fact stated on 2+ slides gets a ledger row {value, slides, match?}. Any mismatch is a Blocker (dishonest-data class: it proves no one read the whole deck, and audiences catch it) [PROC §4.13]. Includes summary-vs-body figures and exec-summary-vs-section numbers.
- **S2 · Timeline agreement** ⛔ — every date/milestone stated in 2+ places (roadmap vs timeline vs prose) agrees.
- **S3 · Terminology drift** ▲ systemic / △ single instance — every instance matches the sheet's canonical term.
- **S4 · Format drift** ▲ systemic — dates, numbers, casing, bullet punctuation each match the sheet rule; detection = regex per sheet row over plain-text extraction.
- **S5 · Cross-reference integrity** ▲ — "see appendix A2" / "as shown on slide N" / agenda promises: every referent exists after all edits (orphan references are a documented top slip-through [PROC §12]).
- **S6 · Wrong-audience leftovers** ⛔ — export inspection for internal codenames, watermarks, candid speaker notes in a sent file, hidden slides with sensitive data, embedded spreadsheet data behind pasted charts, stale metadata [PROC §12].

Detection procedure order: plain-text extraction → sheet extraction → regex/exact-match sweeps → ledger closure → export-internals inspection. All mechanical except judging whether a paraphrase is meaning-preserving (judgment-only list [PROC §10.30]).

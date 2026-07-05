// ANSI color helpers, aligned tables, and ok/warn/fail glyphs.
//
// Colors are disabled when NO_COLOR is set (https://no-color.org) or when
// stdout is not a TTY (piped/redirected output). Glyphs fall back to ASCII
// on legacy Windows terminals that don't render unicode box/status glyphs
// (conhost without a modern terminal wrapper).
//
// Every function here is a pure formatter that returns a string; commands
// decide where to write it, which keeps this module trivially testable.

/** Whether ANSI color codes should be emitted for the given stream. */
export function colorEnabled(stream = process.stdout) {
  if (process.env.NO_COLOR != null && process.env.NO_COLOR !== '') return false;
  if (process.env.FORCE_COLOR != null && process.env.FORCE_COLOR !== '' && process.env.FORCE_COLOR !== '0') return true;
  return Boolean(stream && stream.isTTY);
}

function wrap(code, stream) {
  return (text) => (colorEnabled(stream) ? `\x1b[${code}m${text}\x1b[0m` : String(text));
}

export const bold = (text, stream) => wrap('1', stream)(text);
export const dim = (text, stream) => wrap('2', stream)(text);
export const red = (text, stream) => wrap('31', stream)(text);
export const green = (text, stream) => wrap('32', stream)(text);
export const yellow = (text, stream) => wrap('33', stream)(text);
export const cyan = (text, stream) => wrap('36', stream)(text);

/**
 * Whether the current terminal is expected to render unicode glyphs.
 * Legacy Windows consoles (plain conhost, no Windows Terminal / VS Code /
 * ConEmu wrapper) commonly mangle box-drawing and status glyphs.
 */
export function supportsUnicodeGlyphs() {
  if (process.platform !== 'win32') return true;
  return Boolean(process.env.WT_SESSION || process.env.TERM_PROGRAM || process.env.ConEmuTask);
}

const ASCII_GLYPHS = { ok: 'OK', warn: '!', fail: 'X' };
const UNICODE_GLYPHS = { ok: '✔', warn: '⚠', fail: '✘' };

/**
 * Plain (uncolored) status glyph for kind "ok" | "warn" | "fail".
 * Kept uncolored so it can be embedded in aligned table cells without
 * ANSI escape codes throwing off column width math.
 */
export function glyph(kind) {
  const set = supportsUnicodeGlyphs() ? UNICODE_GLYPHS : ASCII_GLYPHS;
  return set[kind] ?? '?';
}

/** Colorized status glyph, for use in standalone (non-table) lines. */
export function statusGlyph(kind, stream) {
  const g = glyph(kind);
  if (kind === 'ok') return green(g, stream);
  if (kind === 'warn') return yellow(g, stream);
  if (kind === 'fail') return red(g, stream);
  return g;
}

/**
 * Render rows as a simple aligned table (two spaces between columns).
 * @param {string[]} headers
 * @param {string[][]} rows
 */
export function table(headers, rows) {
  const all = [headers, ...rows];
  const widths = headers.map((_, col) =>
    Math.max(...all.map((row) => String(row[col] ?? '').length))
  );
  const renderRow = (row) => row.map((cell, col) => String(cell ?? '').padEnd(widths[col])).join('  ').trimEnd();
  const separator = widths.map((w) => '-'.repeat(w)).join('  ');
  return [renderRow(headers), separator, ...rows.map(renderRow)].join('\n');
}

/** One-line problem + one-line fix, formatted for stderr. */
export function formatError(problem, fix) {
  return `Error: ${problem}\nFix: ${fix}\n`;
}

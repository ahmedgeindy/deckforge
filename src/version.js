// Small version helpers: read this package's own version, and compare
// dotted version strings (skills use plain `major.minor.patch`, not full
// semver ranges, so a tiny numeric comparator is sufficient).

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const SRC_DIR = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.dirname(SRC_DIR);

let cachedPackageVersion;

/** Version of the deckforge package itself, read from package.json. */
export function packageVersion() {
  if (cachedPackageVersion) return cachedPackageVersion;
  const pkgPath = path.join(REPO_ROOT, 'package.json');
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
  cachedPackageVersion = pkg.version;
  return cachedPackageVersion;
}

/**
 * Compare two dotted version strings numerically, part by part.
 * Missing or non-numeric parts are treated as 0.
 * @returns {number} negative if a<b, 0 if equal, positive if a>b
 */
export function compareVersions(a, b) {
  const pa = String(a ?? '0').split('.');
  const pb = String(b ?? '0').split('.');
  const len = Math.max(pa.length, pb.length);
  for (let i = 0; i < len; i++) {
    const na = Number.parseInt(pa[i], 10) || 0;
    const nb = Number.parseInt(pb[i], 10) || 0;
    if (na !== nb) return na - nb;
  }
  return 0;
}

#!/usr/bin/env node
/**
 * Build time guardrail for hard rule section 10: no dashes or hyphens in
 * customer facing copy. It scans the IDR copy data modules, where string values
 * render directly as prose, and fails the build on a hyphen, en dash, or em dash.
 *
 * Slugs, ids, and module paths legitimately use hyphens and are never rendered
 * as prose, so any spaceless token (slug, identifier, or import specifier) is
 * allowed. The known tradeoff: a prose mistake written with no spaces (e.g.
 * "out-of-network") looks like a token and would pass. Real prose hyphens almost
 * always sit between spaced words (e.g. "self-funded plans"), which are caught.
 *
 * Only double quoted literals are scanned; the copy modules use double quotes
 * exclusively, and skipping single quotes avoids matching across apostrophes in
 * prose such as "the plan's offer".
 */

import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const FILES = [
  "src/lib/idr/guides.ts",
  "src/lib/idr/comparisons.ts",
  "src/lib/idr/proof-points.ts",
];

/** Spaceless tokens: slugs, ids, and import specifiers. Never rendered prose. */
const TOKEN_LIKE = /^[@./\w-]+$/;
const DASH = /[-\u2013\u2014]/;

/** Blank out comments while preserving newlines so line numbers stay accurate. */
function stripComments(src) {
  return src
    .replace(/\/\*[\s\S]*?\*\//g, (match) => match.replace(/[^\n]/g, " "))
    .split("\n")
    .map((line) => (/^\s*\/\//.test(line) ? "" : line))
    .join("\n");
}

function stringLiterals(src) {
  const out = [];
  const re = /"((?:[^"\\]|\\.)*)"/g;
  let match;
  while ((match = re.exec(src)) !== null) {
    out.push({ value: match[1], index: match.index });
  }
  return out;
}

const violations = [];
for (const rel of FILES) {
  const src = stripComments(readFileSync(join(root, rel), "utf8"));
  for (const { value, index } of stringLiterals(src)) {
    if (value.length === 0) continue;
    if (!/\s/.test(value) && TOKEN_LIKE.test(value)) continue;
    if (DASH.test(value)) {
      const line = src.slice(0, index).split("\n").length;
      violations.push({ rel, line, value });
    }
  }
}

if (violations.length > 0) {
  console.error(
    "Copy hyphen check failed. Customer facing copy must not contain hyphens or dashes (slugs and ids excepted).",
  );
  for (const v of violations) {
    console.error(`  ${v.rel}:${v.line}  ${JSON.stringify(v.value)}`);
  }
  console.error(
    `\n${violations.length} violation(s). Rewrite to avoid the dash (for example "out of network", "self funded", "five minute").`,
  );
  process.exit(1);
}

console.log(`Copy hyphen check passed: ${FILES.length} files clean.`);

#!/usr/bin/env node
/**
 * Build time guardrail: no em dashes (U+2014) or en dashes (U+2013) in
 * customer facing copy. ASCII hyphens in compound modifiers (15-minute,
 * out-of-network) are allowed.
 *
 * Comments are stripped so code documentation is not flagged. Remaining hits
 * in prose, metadata, JSX text, and email templates fail the build. There is
 * no allowlist for leftover copy: a red build is the remaining work list.
 */

import { readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const SRC = join(root, "src");

const EXTRA_FILES = [
  "src/lib/seo/metadata.ts",
  "src/lib/seo/og-image.tsx",
  "src/lib/seo/json-ld.ts",
  "src/lib/case-review.ts",
  "src/lib/contact.ts",
  "src/lib/landing/metadata.ts",
  "src/lib/idr/comparisons.ts",
];

const DASH = /[\u2013\u2014]|&mdash;|&ndash;|&#8212;|&#8211;|&#x201[34];/gi;

function walk(dir, pred, out = []) {
  for (const name of readdirSync(dir)) {
    if (name === "node_modules" || name === ".next") continue;
    const path = join(dir, name);
    const st = statSync(path);
    if (st.isDirectory()) walk(path, pred, out);
    else if (pred(path)) out.push(path);
  }
  return out;
}

function matchesScope(absPath) {
  const rel = relative(root, absPath).replaceAll("\\", "/");
  if (rel.startsWith("src/app/") && rel.endsWith(".tsx")) return true;
  if (rel.startsWith("src/components/") && rel.endsWith(".tsx")) return true;
  if (rel.startsWith("src/lib/content/") && rel.endsWith(".ts")) return true;
  if (rel.startsWith("src/lib/email/") && rel.endsWith(".ts")) return true;
  if (rel.startsWith("src/lib/") && rel.endsWith(".ts") && /copy/i.test(rel.split("/").pop() ?? "")) {
    return true;
  }
  return EXTRA_FILES.includes(rel);
}

/** Blank out comments while preserving newlines so line numbers stay accurate. */
function stripComments(src) {
  return src
    .replace(/\/\*[\s\S]*?\*\//g, (match) => match.replace(/[^\n]/g, " "))
    .split("\n")
    .map((line) => (/^\s*\/\//.test(line) ? "" : line))
    .join("\n");
}

const files = [
  ...walk(SRC, matchesScope),
  ...EXTRA_FILES.map((rel) => join(root, rel)),
].filter((path, index, all) => all.indexOf(path) === index);

const violations = [];
for (const abs of files) {
  const rel = relative(root, abs).replaceAll("\\", "/");
  let src;
  try {
    src = stripComments(readFileSync(abs, "utf8"));
  } catch {
    continue;
  }
  const lines = src.split("\n");
  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    if (!DASH.test(line)) continue;
    DASH.lastIndex = 0;
    violations.push({ rel, line: i + 1, value: line.trim() });
  }
}

if (violations.length > 0) {
  console.error(
    "Copy dash check failed. Customer facing copy must not contain em dashes or en dashes. Compound hyphens (15-minute, out-of-network) are allowed.",
  );
  for (const v of violations) {
    console.error(`  ${v.rel}:${v.line}  ${JSON.stringify(v.value)}`);
  }
  console.error(
    `\n${violations.length} violation(s). Recast the sentence. Do not swap the dash for a comma or a hyphen.`,
  );
  process.exit(1);
}

console.log(`Copy dash check passed: ${files.length} files clean.`);

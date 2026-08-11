#!/usr/bin/env node
/**
 * Fails if absolute "never batch / no batching" positioning reappears in src/.
 * Allows this script and docs to mention the banned phrases.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = process.cwd();
const SRC = join(ROOT, "src");

const BANNED = [
  { re: /never\s+batch(?:es|ed)?/i, label: "never batch*" },
  { re: /\bno\s+batching\b/i, label: "no batching" },
  { re: /isn't configurable[\s\S]{0,80}batch|batch[\s\S]{0,80}isn't configurable/i, label: "isn't configurable + batch" },
  { re: /does not batch claims/i, label: "does not batch claims" },
];

const TEXT_EXT = new Set([".ts", ".tsx", ".js", ".jsx", ".mjs", ".json", ".md"]);

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    if (name === "node_modules" || name === ".next") continue;
    const path = join(dir, name);
    const st = statSync(path);
    if (st.isDirectory()) walk(path, out);
    else {
      const ext = name.includes(".") ? `.${name.split(".").pop()}` : "";
      if (TEXT_EXT.has(ext)) out.push(path);
    }
  }
  return out;
}

const hits = [];
for (const file of walk(SRC)) {
  const text = readFileSync(file, "utf8");
  const rel = relative(ROOT, file);
  for (const { re, label } of BANNED) {
    if (re.test(text)) {
      hits.push({ file: rel, label });
    }
  }
}

if (hits.length > 0) {
  console.error("check:batching failed. Absolute batching language found:");
  for (const hit of hits) {
    console.error(`  ${hit.file} (${hit.label})`);
  }
  process.exit(1);
}

console.log("check:batching ok: no banned absolute batching phrases in src/.");

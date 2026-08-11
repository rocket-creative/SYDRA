#!/usr/bin/env node
/**
 * Fails CI when any source in src/lib/content/sources.json has a lastVerified
 * date older than STALE_DAYS (default 120). Run via: npm run check:sources
 */

import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const STALE_DAYS = 120;
const MS_PER_DAY = 24 * 60 * 60 * 1000;

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const sourcesPath = join(root, "src/lib/content/sources.json");

/** @type {{ id: string; label: string; lastVerified?: string }[]} */
const sources = JSON.parse(readFileSync(sourcesPath, "utf8"));
const now = Date.now();
const stale = [];

for (const source of sources) {
  if (!source.lastVerified) {
    stale.push({ id: source.id, label: source.label, reason: "missing lastVerified" });
    continue;
  }
  const verified = Date.parse(source.lastVerified);
  if (Number.isNaN(verified)) {
    stale.push({
      id: source.id,
      label: source.label,
      reason: `invalid lastVerified "${source.lastVerified}"`,
    });
    continue;
  }
  const ageDays = (now - verified) / MS_PER_DAY;
  if (ageDays > STALE_DAYS) {
    stale.push({
      id: source.id,
      label: source.label,
      reason: `lastVerified ${source.lastVerified} (${Math.floor(ageDays)} days ago; limit ${STALE_DAYS})`,
    });
  }
}

if (stale.length > 0) {
  console.error(`check:sources failed: ${stale.length} stale or invalid source(s):\n`);
  for (const item of stale) {
    console.error(`  - ${item.id}: ${item.reason}`);
  }
  console.error("\nRe-verify sources and update lastVerified. See docs/seo/sourced-references-refresh.md.");
  process.exit(1);
}

console.log(`check:sources ok: ${sources.length} sources verified within ${STALE_DAYS} days.`);

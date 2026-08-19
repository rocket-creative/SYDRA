/**
 * Asserts the two site-wide promises this pass was built on:
 *
 *   1. Every route in the sitemap resolves.
 *   2. Every route offers a way to convert, and the 15-minute call is the one
 *      being led with. A page whose only conversion path is the claim review is
 *      reported so the call-first hierarchy cannot silently regress.
 *
 * Legal and utility routes are exempt from needing the call, but still must
 * resolve. Usage: node scripts/verify-cta-coverage.mjs http://127.0.0.1:3137
 */

const BASE = process.argv[2] ?? "http://127.0.0.1:3137";

/** Routes with no conversion duty. Thank-you pages already converted. */
const CTA_EXEMPT = new Set(["/privacy", "/terms"]);

const sitemapUrls = async () => {
  const index = await (await fetch(`${BASE}/sitemap-index.xml`)).text();
  const children = [...index.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  const paths = new Set();
  for (const child of children) {
    const path = new URL(child).pathname;
    const xml = await (await fetch(`${BASE}${path}`)).text();
    for (const m of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) {
      paths.add(new URL(m[1]).pathname);
    }
  }
  return [...paths].sort();
};

async function main() {
  const paths = await sitemapUrls();
  const broken = [];
  const noCta = [];
  const claimReviewOnly = [];

  for (const path of paths) {
    const res = await fetch(`${BASE}${path}`);
    if (res.status !== 200) {
      broken.push(`${path} -> HTTP ${res.status}`);
      continue;
    }
    const html = await res.text();
    const hasCall = html.includes('href="/demo');
    const hasClaimReview = html.includes('href="/case-review');

    if (CTA_EXEMPT.has(path)) continue;
    if (!hasCall && !hasClaimReview) noCta.push(path);
    else if (!hasCall) claimReviewOnly.push(path);
  }

  console.log(`Routes checked: ${paths.length}`);
  console.log(`Broken: ${broken.length}`);
  broken.forEach((b) => console.log(`  FAIL ${b}`));
  console.log(`No CTA at all: ${noCta.length}`);
  noCta.forEach((p) => console.log(`  FAIL ${p}`));
  console.log(`Claim review but no call: ${claimReviewOnly.length}`);
  claimReviewOnly.forEach((p) => console.log(`  WARN ${p}`));

  process.exit(broken.length > 0 || noCta.length > 0 ? 1 : 0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

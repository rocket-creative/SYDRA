/**
 * Sandbox fallback for check:forms. Playwright's Chromium cannot launch inside
 * the agent sandbox, so this asserts the same contract against served HTML with
 * fetch instead of a real browser.
 *
 * What it does NOT cover, and why check:forms stays the real gate: step 2 of the
 * lead form only renders after a successful step 1 submission, which needs a
 * browser. Run `npm run check:forms` before shipping.
 */

const BASE = process.argv[2] ?? "http://127.0.0.1:3137";

/*
 * `deferred` marks a route whose form sits behind a <Suspense> boundary. The
 * form reads useSearchParams, so Next serves the fallback and mounts the form on
 * hydration. Fetched HTML can only prove the boundary shipped; the form itself
 * is a browser-only assertion that belongs to check:forms.
 */
const FORM_ROUTES = [
  { path: "/", anchor: "lead-form" },
  { path: "/demo", anchor: "demo-form", deferred: true },
  { path: "/case-review", anchor: "case-review-form", deferred: true },
  { path: "/recover", anchor: "lead-form" },
  { path: "/idr-recovery-calculator", anchor: "calculator-lead-form", deferred: true },
  { path: "/r", anchor: "lead-form" },
  { path: "/r/tx", anchor: "lead-form" },
  { path: "/idr-for-billing-companies", anchor: "billing-lead-form", deferred: true },
  { path: "/idr-for-contingency-firms", anchor: "contingency-lead-form", deferred: true },
  { path: "/sydra-vs-idr-attorney", anchor: "attorney-lead-form", deferred: true },
];

const REQUIRED_LINKS = [
  "/idr-recovery-calculator",
  "/case-review",
  "/sydra-vs-idr-attorney",
  "/idr-for-billing-companies",
  "/idr-for-contingency-firms",
  "#path-never-filed",
  "#path-contingency-client",
  "#path-rcm",
  "#path-contingency-firm",
];

const results = [];
const record = (pass, name, detail = "") => results.push({ pass, name, detail });

const get = async (path) => {
  const res = await fetch(`${BASE}${path}`);
  return { status: res.status, html: await res.text() };
};

async function main() {
  for (const route of FORM_ROUTES) {
    const { status, html } = await get(route.path);

    if (route.deferred) {
      record(
        status === 200 && html.includes("animate-pulse"),
        `${route.path}: ships the Suspense boundary that mounts #${route.anchor} (form itself needs check:forms)`,
        `http=${status} fallback=${html.includes("animate-pulse")}`,
      );
      continue;
    }

    const hasAnchor = html.includes(`id="${route.anchor}"`);
    const hasAction = html.includes('action="/api/postcard-lead"');
    const hasEmail = html.includes('name="email"');
    record(
      status === 200 && hasAnchor && hasAction && hasEmail,
      `${route.path}: form at #${route.anchor} posts to /api/postcard-lead with an email field`,
      `http=${status} anchor=${hasAnchor} action=${hasAction} email=${hasEmail}`,
    );
  }

  const apiRes = await fetch(`${BASE}/api/postcard-lead`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      leadKind: "partial",
      email: "verify-forms-static@example.com",
      website: "",
      marketingConsent: false,
    }),
  });
  const apiBody = await apiRes.json().catch(() => ({}));
  record(
    apiRes.status === 200 && apiBody.ok !== false,
    "/api/postcard-lead accepts a lead",
    `HTTP ${apiRes.status} ${JSON.stringify(apiBody)}`,
  );

  const { html: home } = await get("/");
  const main = home.slice(home.indexOf("<main"), home.lastIndexOf("</main>"));
  const hrefs = [...main.matchAll(/href="([^"]+)"/g)].map((m) => m[1]);

  for (const href of REQUIRED_LINKS) {
    record(hrefs.includes(href), `homepage links to ${href}`);
  }
  record(
    hrefs.some((h) => h.startsWith("mailto:sales@sydrahealth.com")),
    'homepage keeps the "Ask a question" mailto',
  );
  record(
    hrefs.filter((h) => h === "tel:+19147056830").length >= 5,
    "every CTA block offers the published number as a tel: link",
    `tel links found: ${hrefs.filter((h) => h.startsWith("tel:")).length}`,
  );
  record(
    home.includes("(914) 705 6830"),
    "the number renders as readable text, not just an href",
  );
  record(
    !hrefs.some((h) => h.startsWith("mailto:") && h.includes("Demo%20request")),
    "no mailto stands in for a demo booking",
  );

  const internal = [...new Set(hrefs.filter((h) => h.startsWith("/")))];
  for (const href of internal) {
    const res = await fetch(`${BASE}${href}`);
    record(res.status === 200, `homepage link ${href} resolves`, `HTTP ${res.status}`);
  }

  let failed = 0;
  for (const result of results) {
    if (!result.pass) failed += 1;
    console.log(`${result.pass ? "PASS" : "FAIL"}  ${result.name}`);
    if (result.detail && !result.pass) console.log(`    ${result.detail}`);
  }
  console.log(`\n${results.length - failed}/${results.length} checks passed.`);
  process.exit(failed > 0 ? 1 : 0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

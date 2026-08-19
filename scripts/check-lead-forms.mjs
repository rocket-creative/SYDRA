/**
 * Lead form consistency check. Drives a running server and asserts that every
 * lead-capture page mounts the same form and that the homepage reaches the pages
 * that hold it:
 *
 *   1. Every route in FORM_ROUTES renders a form at its anchor whose step 1 asks
 *      for a work email and posts to /api/postcard-lead. A page that drifts onto
 *      its own component or its own endpoint fails here.
 *   2. Step 2 renders the full qualification set.
 *   3. The live endpoint accepts a lead.
 *   4. The homepage links to each path's destination page, keeps the approved
 *      mailto, and no longer routes the demo CTA through a mailto.
 *   5. Every internal link on the homepage resolves.
 *
 * Delivery itself is not asserted here: it needs RESEND_API_KEY and would send
 * real mail. Recipients are centralised in src/lib/email/inbox-recipients.ts.
 *
 * Usage: npm run check:forms -- http://localhost:3000
 */

import { chromium } from "@playwright/test";

const BASE = process.argv[2] ?? "http://localhost:3137";

/** Every page that captures a lead, with the anchor its form is mounted at. */
const FORM_ROUTES = [
  { path: "/", anchor: "lead-form" },
  { path: "/demo", anchor: "demo-form" },
  { path: "/case-review", anchor: "case-review-form" },
  { path: "/recover", anchor: "lead-form" },
  { path: "/idr-recovery-calculator", anchor: "calculator-lead-form" },
  { path: "/r", anchor: "lead-form" },
  { path: "/r/tx", anchor: "lead-form" },
  /*
   * The three audience pages. Each is a paid destination for keywords that name
   * its audience, so it captures the lead in place rather than sending the
   * visitor to /demo first. Unlike the routes above these are statically
   * rendered, so the form only exists after hydration; that is exactly the
   * failure a fetch-based check cannot see, which is why they belong here.
   */
  { path: "/idr-for-billing-companies", anchor: "billing-lead-form" },
  { path: "/idr-for-contingency-firms", anchor: "contingency-lead-form" },
  { path: "/sydra-vs-idr-attorney", anchor: "attorney-lead-form" },
];

const EXPECTED_STEP_ONE = ["email"];
const EXPECTED_STEP_TWO = ["practiceName", "name", "role", "phone", "state", "disputesPerMonth"];

/**
 * Path sections must reach the page written for that audience. Mirrors
 * PATH_DETAIL_LINKS in src/lib/content/homepage.ts; update both together.
 *
 * /demo is absent on purpose: the demo CTA is withheld until a booking provider
 * is live, so the homepage offers a phone call, the calculator, and the embedded
 * form instead.
 *
 * /case-review replaced /how-it-works here when the never-filed path was
 * re-pointed. That section promises Sydra identifies the claims and manages the
 * deadlines, which /how-it-works contradicts by opening with the reader drafting
 * a submission. /how-it-works stays reachable from the sitewide header nav.
 */
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

const visibleFieldNames = (scope, skip) =>
  [...scope.querySelectorAll("input, select")]
    .filter((el) => el.type !== "hidden" && !skip.includes(el.name))
    .map((el) => el.name);

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  // 1. Same form, same endpoint, everywhere.
  for (const route of FORM_ROUTES) {
    await page.goto(`${BASE}${route.path}`, { waitUntil: "networkidle" });
    const found = await page.evaluate((anchorId) => {
      const root = document.getElementById(anchorId);
      if (!root) return null;
      const form = root.querySelector("form");
      if (!form) return { formPresent: false };
      return {
        formPresent: true,
        action: form.getAttribute("action"),
        fields: [...form.querySelectorAll("input, select")]
          .filter((el) => el.type !== "hidden" && el.name !== "website")
          .map((el) => el.name),
      };
    }, route.anchor);

    const name = `${route.path}: shared form at #${route.anchor} posts to /api/postcard-lead`;
    if (!found) {
      record(false, name, `#${route.anchor} not in the DOM`);
      continue;
    }
    if (!found.formPresent) {
      record(false, name, `#${route.anchor} has no <form>`);
      continue;
    }
    record(
      EXPECTED_STEP_ONE.every((f) => found.fields.includes(f)) &&
        found.action === "/api/postcard-lead",
      name,
      `action=${found.action} fields=${found.fields.join(",")}`,
    );
  }

  // 2. The live endpoint accepts a lead. Without RESEND_API_KEY it still records
  //    the fallback log, which is the part that must not regress.
  const apiResponse = await page.request.post(`${BASE}/api/postcard-lead`, {
    data: {
      leadKind: "partial",
      email: "check-lead-forms@example.com",
      website: "",
      marketingConsent: false,
    },
  });
  const apiBody = await apiResponse.json().catch(() => ({}));
  record(
    apiResponse.status() === 200 && apiBody.ok !== false,
    "/api/postcard-lead accepts a lead",
    `HTTP ${apiResponse.status()} ${JSON.stringify(apiBody)}`,
  );

  /*
   * 3. Step 2 field set. Step 2 only renders once step 1 reports a delivered
   *    email, and delivery needs RESEND_API_KEY, so stub the response. The real
   *    endpoint is covered above.
   */
  await page.route("**/api/postcard-lead", (route) =>
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ ok: true, emailDelivered: true }),
    }),
  );
  await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
  await page.fill("#lead-form input[name=email]", "check-lead-forms@example.com");
  await page.click("#lead-form button[type=submit]");
  await page.waitForSelector("#lead-form input[name=practiceName]", { timeout: 15_000 });
  const stepTwoFields = await page.evaluate(
    (skip) =>
      [...document.querySelectorAll("#lead-form form input, #lead-form form select")]
        .filter((el) => el.type !== "hidden" && !skip.includes(el.name))
        .map((el) => el.name),
    ["website", "email"],
  );
  const missingFields = EXPECTED_STEP_TWO.filter((f) => !stepTwoFields.includes(f));
  record(
    missingFields.length === 0,
    "step 2 renders the full qualification set",
    `missing=${missingFields.join(",")} present=${[...new Set(stepTwoFields)].join(",")}`,
  );
  await page.unroute("**/api/postcard-lead");

  // 4. Homepage reaches every destination.
  await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
  const links = await page.evaluate(() =>
    [...document.querySelectorAll("main a[href]")].map((a) => a.getAttribute("href")),
  );
  for (const href of REQUIRED_LINKS) {
    record(links.includes(href), `homepage links to ${href}`);
  }
  record(
    links.some((h) => h?.startsWith("mailto:sales@sydrahealth.com")),
    'homepage keeps the "Ask a question" mailto',
  );
  record(
    links.filter((h) => h === "tel:+19147056830").length >= 5,
    "every CTA block offers the published number as a tel: link",
    `tel links found: ${links.filter((h) => h?.startsWith("tel:")).length}`,
  );
  const bodyText = await page.evaluate(() => document.querySelector("main").innerText);
  record(
    bodyText.includes("(914) 705 6830"),
    "the number renders as readable text, not just an href",
  );
  record(
    !links.some((h) => h?.startsWith("mailto:") && h.includes("Demo%20request")),
    "no mailto stands in for a demo booking",
  );

  // 5. No broken internal links.
  for (const href of [...new Set(links.filter((h) => h?.startsWith("/")))]) {
    const res = await page.request.get(`${BASE}${href}`);
    record(res.status() === 200, `homepage link ${href} resolves`, `HTTP ${res.status()}`);
  }

  await browser.close();

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

/**
 * One-off check: full lead submit fires Google Ads "Submit lead form" and
 * navigates to the matching thank-you URL. Conversion may fire on the form
 * page (event_callback) and/or thank-you (backup, same send_to).
 *
 *   node scripts/test-google-ads-conversion.mjs [baseUrl]
 */
import { chromium } from "@playwright/test";

const baseUrl = process.argv[2] ?? "https://www.sydrahealth.com";
const expectedSendTo = "AW-18244375722/MhI6CKKQz8scEKqpzPtD";

function isConversionEvent(args) {
  return (
    args[0] === "event" &&
    args[1] === "conversion" &&
    args[2]?.send_to === expectedSendTo
  );
}

async function runScenario(browser, scenario) {
  const page = await browser.newPage();
  const gtagCalls = [];
  const googleRequests = [];

  page.on("request", (request) => {
    const url = request.url();
    if (
      url.includes("googleadservices.com") ||
      url.includes("googletagmanager.com") ||
      url.includes("google.com/ccm/collect") ||
      url.includes("doubleclick.net")
    ) {
      googleRequests.push(url);
    }
  });

  await page.exposeFunction("recordGtagCall", (...args) => {
    gtagCalls.push(args);
  });

  await page.addInitScript(() => {
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
      window.recordGtagCall(Array.from(arguments));
      const params = arguments[2];
      if (arguments[0] === "event" && params && typeof params.event_callback === "function") {
        params.event_callback();
      }
    }
    window.gtag = gtag;
  });

  await page.route("**/api/postcard-lead", async (route) => {
    let leadKind = "partial";
    try {
      leadKind = route.request().postDataJSON()?.leadKind ?? "partial";
    } catch {
      leadKind = "partial";
    }
    const body =
      leadKind === "full" ? scenario.apiBody : { ok: true, emailDelivered: true };
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(body),
    });
  });

  await page.goto(`${baseUrl}${scenario.path}`, { waitUntil: "networkidle" });

  await page.locator(`#${scenario.anchorId}-email`).fill("conversion-test@example.com");
  await page.getByRole("button", { name: scenario.stepOneCta }).click();

  await page.locator(`#${scenario.anchorId}-practiceName`).waitFor({
    state: "visible",
    timeout: 10000,
  });
  await page.locator(`#${scenario.anchorId}-practiceName`).fill("Test Practice");
  await page.locator(`#${scenario.anchorId}-name`).fill("Conversion Test");
  await page.locator(`#${scenario.anchorId}-role`).selectOption("billing");
  await page.locator(`#${scenario.anchorId}-phone`).fill("5551234567");
  await page.locator(`#${scenario.anchorId}-state`).selectOption("NY");
  await page.locator(`#${scenario.anchorId}-disputesPerMonth`).selectOption("5_to_15");
  if (scenario.productInterest) {
    await page
      .locator(`input[name="productInterest"][value="${scenario.productInterest}"]`)
      .check();
  }
  await page.getByRole("button", { name: scenario.stepTwoCta }).click();

  let landedOnThankYou = true;
  try {
    await page.waitForURL(`**${scenario.thankYouPath}`, { timeout: 10000 });
  } catch {
    landedOnThankYou = false;
  }
  await page.waitForTimeout(1500);

  const dataLayer = await page.evaluate(() =>
    Array.from(window.dataLayer ?? []).map((entry) => Array.from(entry)),
  );
  const allCalls = [...gtagCalls, ...dataLayer];
  const conversionEvent = allCalls.find(isConversionEvent);
  const onThankYou =
    landedOnThankYou && page.url().includes(scenario.thankYouPath);

  await page.close();

  return {
    name: scenario.name,
    landedOnThankYou: onThankYou,
    explicitConversionFired: Boolean(conversionEvent),
    gtagCallCount: allCalls.length,
    googleRequestCount: googleRequests.length,
    sampleCalls: allCalls.slice(0, 8),
  };
}

const scenarios = [
  {
    name: "demo",
    path: "/demo",
    anchorId: "demo-form",
    stepOneCta: "Book a free demo",
    stepTwoCta: "Request demo",
    productInterest: "sydra_software",
    thankYouPath: "/demo/thank-you",
    apiBody: { ok: true },
  },
  {
    name: "case-review",
    path: "/case-review",
    anchorId: "case-review-form",
    stepOneCta: "Start free claim review",
    stepTwoCta: "Submit claim review request",
    productInterest: null,
    thankYouPath: "/case-review/thank-you",
    apiBody: { ok: true },
  },
  {
    name: "case-review-email-undelivered",
    path: "/case-review",
    anchorId: "case-review-form",
    stepOneCta: "Start free claim review",
    stepTwoCta: "Submit claim review request",
    productInterest: null,
    thankYouPath: "/case-review/thank-you",
    apiBody: { ok: true, emailDelivered: false },
  },
];

const browser = await chromium.launch({ headless: true });
const results = [];
let failed = false;

for (const scenario of scenarios) {
  const result = await runScenario(browser, scenario);
  results.push(result);
  if (!result.landedOnThankYou || !result.explicitConversionFired) {
    failed = true;
  }
}

await browser.close();

console.log(
  JSON.stringify(
    {
      baseUrl,
      expectedSendTo,
      results,
    },
    null,
    2,
  ),
);

if (failed) {
  console.error(
    "FAIL: expected thank-you navigation and Google Ads conversion with send_to",
    expectedSendTo,
  );
  process.exit(1);
}

console.log("PASS: Google Ads conversion fired for demo and case-review.");

/**
 * One-off check: submitting the demo form redirects to /demo/thank-you and the
 * Google Ads "Submit lead form" conversion fires there (once), driven by the
 * sessionStorage hand-off. Usage:
 *   node scripts/test-google-ads-conversion.mjs [baseUrl]
 */
import { chromium } from "@playwright/test";

const baseUrl = process.argv[2] ?? "https://www.sydrahealth.com";
const expectedSendTo = "AW-18244375722/MhI6CKKQz8scEKqpzPtD";

const browser = await chromium.launch({ headless: true });
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
  }
  window.gtag = gtag;
});

await page.route("**/api/demo", async (route) => {
  await route.fulfill({
    status: 200,
    contentType: "application/json",
    body: JSON.stringify({ ok: true, redirect: "/demo/thank-you" }),
  });
});

await page.goto(`${baseUrl}/demo`, { waitUntil: "networkidle" });

await page.locator("#name").fill("Conversion Test");
await page.locator("#email").fill("conversion-test@example.com");
await page.locator("#practiceName").fill("Test Practice");
await page.getByRole("button", { name: "Continue" }).click();

await page.locator("#specialty").selectOption("neurosurgery");
await page.locator("#state").selectOption("NY");
await page.locator("#disputesPerMonth").selectOption("5_to_15");
await page.locator("#idrApproach").selectOption("in_house_manual");
await page.getByRole("button", { name: "Schedule my demo" }).click();

// The conversion now fires on the thank-you page (after navigation), not in
// the submit handler. Wait for that navigation, then let the mount effect run.
let landedOnThankYou = true;
try {
  await page.waitForURL("**/demo/thank-you", { timeout: 10000 });
} catch {
  landedOnThankYou = false;
}
await page.waitForTimeout(1500);

const dataLayer = await page.evaluate(() =>
  Array.from(window.dataLayer ?? []).map((entry) => Array.from(entry)),
);

const allCalls = [...gtagCalls, ...dataLayer];
const conversionEvent = allCalls.find(
  (args) =>
    args[0] === "event" &&
    args[1] === "conversion" &&
    args[2]?.send_to === expectedSendTo,
);

console.log(JSON.stringify({
  baseUrl,
  landedOnThankYou: landedOnThankYou && page.url().includes("/demo/thank-you"),
  gtagCallCount: allCalls.length,
  explicitConversionFired: Boolean(conversionEvent),
  googleRequestCount: googleRequests.length,
  googleRequests: googleRequests.slice(-5),
  expectedSendTo,
  sampleCalls: allCalls.slice(0, 8),
}, null, 2));

await browser.close();

if (!conversionEvent) {
  console.error(
    "FAIL: expected Google Ads conversion event on /demo/thank-you with send_to",
    expectedSendTo,
  );
  process.exit(1);
}

console.log("PASS: Google Ads conversion fired on /demo/thank-you.");

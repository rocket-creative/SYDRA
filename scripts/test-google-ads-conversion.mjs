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

await page.route("**/api/postcard-lead", async (route) => {
  await route.fulfill({
    status: 200,
    contentType: "application/json",
    body: JSON.stringify({ ok: true }),
  });
});

await page.goto(`${baseUrl}/demo`, { waitUntil: "networkidle" });

// Step 1: email only (anchorId on /demo is demo-form).
await page.locator("#demo-form-email").fill("conversion-test@example.com");
await page.getByRole("button", { name: "Book your free five minute demo" }).click();

// Step 2: full lead.
await page.locator("#demo-form-practiceName").waitFor({ state: "visible", timeout: 10000 });
await page.locator("#demo-form-practiceName").fill("Test Practice");
await page.locator("#demo-form-name").fill("Conversion Test");
await page.locator("#demo-form-role").selectOption("billing");
await page.locator("#demo-form-phone").fill("5551234567");
await page.locator("#demo-form-state").selectOption("NY");
await page.locator("#demo-form-disputesPerMonth").selectOption("5_to_15");
await page.locator('input[name="productInterest"][value="sydra_software"]').check();
await page.getByRole("button", { name: "Request demo" }).click();

// The conversion fires on the thank-you page (after navigation), not in the
// submit handler. Wait for that navigation, then let the mount effect run.
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

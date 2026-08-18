import { expect, test } from "@playwright/test";

import { ROUTES } from "./routes";

/**
 * Design-level mobile checks that sit alongside the structural harness in
 * mobile.spec.ts. These are judgement calls encoded as floors:
 *
 * 1. Content type never renders below 12px, so captions and disclaimers stay
 *    readable at arm's length.
 * 2. Every page that sells something puts a conversion path within two screens,
 *    either in the content or as a persistent sticky bar.
 *
 * One representative phone width is enough; the structural harness already
 * sweeps all five.
 */
const CHECK_WIDTH = 390;
const MIN_CONTENT_FONT_PX = 12;
const MAX_CTA_SCREENS = 2;

/** Legal notices and post-submit confirmations have nothing to convert. */
const NO_CONVERSION_ROUTES = new Set([
  "/privacy",
  "/terms",
  "/do-not-sell",
  "/case-review/thank-you",
  "/demo/thank-you",
  "/recover/thank-you",
]);

type SmallText = { size: number; text: string };

for (const route of ROUTES) {
  test(`${route.name} mobile-first (${route.path})`, async ({ page }, testInfo) => {
    const width = testInfo.project.use.viewport?.width ?? 0;
    test.skip(width !== CHECK_WIDTH, "covered at the representative phone width");

    await page.goto(route.path, { waitUntil: "load" });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(250);

    // 1) Readable content type. Decorative subtrees are exempt: they are hidden
    //    from assistive tech and carry no information.
    const smallText: SmallText[] = await page.evaluate((min) => {
      const bad: SmallText[] = [];
      document
        .querySelectorAll<HTMLElement>("main p, main li, main dd, main dt, main figcaption")
        .forEach((el) => {
          if (el.closest("[aria-hidden='true']")) return;
          const text = (el.textContent || "").trim();
          if (text.length < 25) return;
          const cs = getComputedStyle(el);
          if (cs.display === "none" || cs.visibility === "hidden") return;
          const size = parseFloat(cs.fontSize);
          if (size < min) bad.push({ size, text: text.slice(0, 60) });
        });
      return bad;
    }, MIN_CONTENT_FONT_PX);

    expect(
      smallText,
      `Content below ${MIN_CONTENT_FONT_PX}px on ${route.path}: ${JSON.stringify(smallText, null, 2)}`,
    ).toEqual([]);

    if (NO_CONVERSION_ROUTES.has(route.path)) return;

    // 2) Conversion within reach. Sticky bars reveal themselves once the page
    //    heading scrolls away, so look for one after scrolling.
    const viewportHeight = testInfo.project.use.viewport?.height ?? 900;
    const reach = await page.evaluate(() => {
      const siteHeader = (el: Element) => {
        const header = el.closest("header");
        return Boolean(header && !header.closest("main"));
      };
      /*
       * tel: counts. On a phone a tap-to-call link is the most direct conversion
       * on the page, and it is the homepage's primary CTA while demo booking
       * waits on a scheduler.
       */
      const candidates = document.querySelectorAll<HTMLElement>(
        "main a[href*='case-review'], main a[href^='/demo'], main a[href^='tel:'], main form input, main form select",
      );
      for (const el of candidates) {
        if (siteHeader(el)) continue;
        const r = el.getBoundingClientRect();
        if (r.width === 0 && r.height === 0) continue;
        return Math.round(r.top + window.scrollY);
      }
      return null;
    });

    await page.evaluate((y) => window.scrollTo(0, y), viewportHeight * 2);
    await page.waitForTimeout(400);
    const sticky = await page.evaluate(() => {
      const el = document.querySelector("[data-sticky-cta]");
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return { top: Math.round(r.top), bottom: Math.round(r.bottom) };
    });

    if (sticky) {
      // Viewport-relative, so a transform on an ancestor (which would make it the
      // containing block and leave the bar stranded mid-document) fails here.
      expect(
        sticky.bottom,
        `Sticky CTA on ${route.path} is not pinned to the viewport bottom: ${JSON.stringify(sticky)}`,
      ).toBeGreaterThanOrEqual(viewportHeight - 2);
      expect(sticky.top).toBeLessThan(viewportHeight);
    }

    const withinReach = reach !== null && reach <= viewportHeight * MAX_CTA_SCREENS;
    expect(
      withinReach || sticky !== null,
      `${route.path} gives phones no conversion path within ${MAX_CTA_SCREENS} screens ` +
        `(first in-content CTA at ${reach ?? "none"}px, no sticky bar). ` +
        `Add a hero CTA or pass stickyCtaHref to the page shell.`,
    ).toBe(true);
  });
}

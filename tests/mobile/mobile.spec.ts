import { mkdirSync } from "node:fs";
import { join } from "node:path";

import { expect, test } from "@playwright/test";

import { ROUTES } from "./routes";

const MIN_TAP = 44;
const SCREENSHOT_DIR = join(process.cwd(), "tests", "mobile", "__screenshots__");

mkdirSync(SCREENSHOT_DIR, { recursive: true });

type Offender = {
  tag: string;
  cls: string;
  right: number;
  width: number;
};

type SmallInput = { name: string; fontSize: number };

type SmallTarget = {
  tag: string;
  role: string;
  cls: string;
  width: number;
  height: number;
  text: string;
};

for (const route of ROUTES) {
  test(`${route.name} (${route.path})`, async ({ page }, testInfo) => {
    const width = testInfo.project.use.viewport?.width ?? 0;

    const response = await page.goto(route.path, { waitUntil: "load" });
    expect(
      response?.status() ?? 0,
      `${route.path} should not be an error page`,
    ).toBeLessThan(400);

    // Let fonts and layout settle so measurements reflect the final render.
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(300);

    await page.screenshot({
      path: join(SCREENSHOT_DIR, `${route.name}-w${width}.png`),
      fullPage: true,
    });

    // 1) Horizontal overflow — the single most important mobile failure.
    const overflow = await page.evaluate(() => {
      const de = document.documentElement;
      const vw = de.clientWidth;
      const offenders: Offender[] = [];
      document.querySelectorAll<HTMLElement>("body *").forEach((el) => {
        const cs = getComputedStyle(el);
        // Fixed/sticky bars are allowed to span the viewport; skip them.
        if (cs.position === "fixed") return;
        const r = el.getBoundingClientRect();
        if (r.width > 0 && r.right > vw + 1) {
          offenders.push({
            tag: el.tagName.toLowerCase(),
            cls: typeof el.className === "string" ? el.className.slice(0, 80) : "",
            right: Math.round(r.right),
            width: Math.round(r.width),
          });
        }
      });
      return {
        scrollWidth: de.scrollWidth,
        clientWidth: de.clientWidth,
        offenders: offenders.slice(0, 12),
      };
    });

    expect(
      overflow.scrollWidth,
      `Horizontal overflow on ${route.path} at ${width}px ` +
        `(scrollWidth ${overflow.scrollWidth} > clientWidth ${overflow.clientWidth}). ` +
        `Widest offenders: ${JSON.stringify(overflow.offenders, null, 2)}`,
    ).toBeLessThanOrEqual(overflow.clientWidth + 1);

    // 2) Inputs must render at >= 16px to avoid iOS auto-zoom on focus.
    const smallInputs: SmallInput[] = await page.evaluate(() => {
      const bad: SmallInput[] = [];
      document
        .querySelectorAll<HTMLElement>("input, select, textarea")
        .forEach((el) => {
          if (el.offsetParent === null) return; // not rendered
          const type = el.getAttribute("type");
          if (type === "hidden") return;
          const fontSize = parseFloat(getComputedStyle(el).fontSize);
          if (fontSize < 16) {
            bad.push({
              name: el.getAttribute("name") || el.id || el.tagName.toLowerCase(),
              fontSize: Math.round(fontSize * 10) / 10,
            });
          }
        });
      return bad;
    });

    expect(
      smallInputs,
      `Inputs below 16px on ${route.path} will trigger iOS zoom: ${JSON.stringify(smallInputs)}`,
    ).toEqual([]);

    // 3) Tap targets. Controls (button/summary/select/role) are always
    //    enforced. Links get the WCAG 2.5.8 inline exception: an <a> that is
    //    phrasing content inside a text block (prose, list item, heading) is
    //    allowed to be shorter, since it flows with surrounding text. For the
    //    remaining standalone controls we require >= 44px height; icon-only
    //    controls (no text) must also be >= 44px wide.
    const smallTargets: SmallTarget[] = await page.evaluate((min) => {
      const TEXT_BLOCK =
        "p, li, dd, dt, address, figcaption, blockquote, h1, h2, h3, h4, h5, h6";
      const bad: SmallTarget[] = [];
      const selector =
        "a, button, [role='button'], select, summary, [role='switch']";
      document.querySelectorAll<HTMLElement>(selector).forEach((el) => {
        const cs = getComputedStyle(el);
        if (cs.display === "none" || cs.visibility === "hidden") return;
        const r = el.getBoundingClientRect();
        if (r.width === 0 || r.height === 0) return;
        // Inline text links inside prose/lists are exempt.
        if (el.tagName === "A" && el.closest(TEXT_BLOCK)) return;
        const text = (el.textContent || "").trim();
        const iconOnly = text.length === 0;
        const tooShort = r.height < min - 0.5;
        const tooNarrow = iconOnly && r.width < min - 0.5;
        if (tooShort || tooNarrow) {
          bad.push({
            tag: el.tagName.toLowerCase(),
            role: el.getAttribute("role") || "",
            cls: typeof el.className === "string" ? el.className.slice(0, 60) : "",
            width: Math.round(r.width),
            height: Math.round(r.height),
            text: text.slice(0, 30),
          });
        }
      });
      return bad;
    }, MIN_TAP);

    expect(
      smallTargets,
      `Sub-44px tap targets on ${route.path} at ${width}px: ${JSON.stringify(smallTargets, null, 2)}`,
    ).toEqual([]);
  });
}

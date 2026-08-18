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

    // 4) Header integrity. The logo must keep its full width and never sit
    //    under another header control. Regression guard for the header CTA,
    //    whose component base class sets `inline-flex` and once beat a
    //    `hidden` utility, squeezing the logo link to zero width on phones.
    const headerLayout = await page.evaluate(() => {
      const header = document.querySelector("header");
      if (!header) return null;
      const box = (el: Element | null) => {
        if (!el) return null;
        const r = el.getBoundingClientRect();
        if (r.width === 0 && r.height === 0) return null;
        return { left: Math.round(r.left), right: Math.round(r.right), width: Math.round(r.width) };
      };
      const logoLink = header.querySelector('a[aria-label="Sydra home"]');
      return {
        logoLink: box(logoLink),
        logoImg: box(logoLink?.querySelector("img") ?? null),
        cta: box(header.querySelector('a[href*="case-review"]')),
      };
    });

    expect(headerLayout?.logoImg, `Header logo should render on ${route.path}`).toBeTruthy();
    expect(
      headerLayout!.logoImg!.right,
      `Header logo overflows its link box on ${route.path} at ${width}px: ${JSON.stringify(headerLayout)}`,
    ).toBeLessThanOrEqual(headerLayout!.logoLink!.right + 1);

    if (headerLayout?.cta) {
      expect(
        headerLayout.cta.left,
        `Header CTA overlaps the logo on ${route.path} at ${width}px: ${JSON.stringify(headerLayout)}`,
      ).toBeGreaterThanOrEqual(headerLayout.logoImg!.right);
    }

    if (route.path === "/") {
      /*
       * CONFLICT(homepage spec 2): #lead-form exists again, so the `found`
       * assertion passes, but the placement assertion below does not. This one
       * encodes the previous homepage, where the form sat second in the mobile
       * order. Spec 2 fixes the section order as hero, paths, proof, thesis,
       * four path detail sections, the case study tables, then #cta, which puts
       * the form around 5800px on a 390px phone against a 1350px budget.
       *
       * Honouring it means either hoisting a form above the path sections, which
       * contradicts spec 2, or retiring this assertion in favour of the looser
       * conversion-within-two-screens rule in mobile-first.spec.ts, which the
       * homepage now passes via the /demo CTA in the first path section. That is
       * a conversion decision, not a test fix, so it is left failing.
       */
      const leadFormPlacement = await page.evaluate(() => {
        const form = document.getElementById("lead-form");
        const viewportHeight = window.innerHeight;
        if (!form) return { found: false, top: null, viewportHeight };
        const rect = form.getBoundingClientRect();
        return { found: true, top: Math.round(rect.top), viewportHeight };
      });

      expect(leadFormPlacement.found, "Homepage should render #lead-form on mobile").toBe(true);
      expect(
        leadFormPlacement.top,
        `#lead-form should start within 1.5 viewport heights on ${route.path} at ${width}px`,
      ).toBeLessThan(Math.round((leadFormPlacement.viewportHeight ?? 800) * 1.5));

      const menuButton = page.getByRole("button", { name: /open menu/i });
      await expect(menuButton).toBeVisible();
      await menuButton.scrollIntoViewIfNeeded();
      await menuButton.click();
      const drawerNav = page.getByRole("navigation", { name: /primary mobile/i });
      await expect(drawerNav).toBeVisible();
      const pricingLink = drawerNav.getByRole("link", { name: "Pricing" });
      await expect(pricingLink).toBeVisible();
      // WCAG 2.5.8 floor, not an exact value: drawer links carry min-h-12 (48px).
      const pricingMinHeight = await pricingLink.evaluate((el) =>
        parseFloat(getComputedStyle(el).minHeight),
      );
      expect(
        pricingMinHeight,
        "drawer links should reserve at least a 44px tap target",
      ).toBeGreaterThanOrEqual(MIN_TAP);

      // Drawer must cover the viewport, not be trapped inside the sticky header
      // (a leftover transform on header creates a fixed containing block).
      const drawerBox = await drawerNav.boundingBox();
      expect(drawerBox, "mobile drawer should have a bounding box").not.toBeNull();
      expect(
        drawerBox!.height,
        "mobile drawer height should cover most of the viewport",
      ).toBeGreaterThan((testInfo.project.use.viewport?.height ?? 900) * 0.9);
      expect(drawerBox!.y, "mobile drawer should start near the top of the viewport").toBeLessThan(8);
    }
  });
}

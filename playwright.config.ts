import { defineConfig, devices } from "@playwright/test";

/**
 * Mobile-first verification harness. Boots `next dev` and drives every route
 * template (tests/mobile/routes.ts) at the five EK baseline viewport widths,
 * asserting no horizontal overflow, no iOS-zoom inputs, and 44px tap targets,
 * while capturing a full-page screenshot per route per width for review.
 *
 * The widths mirror EK-MOBILE-FIRST-PROMPT.md: 360 (Android floor), 375
 * (legacy iPhone SE/mini), 390 (iPhone standard), 402 (iPhone 17/Pro), 440
 * (Pro Max).
 */
const WIDTHS = [360, 375, 390, 402, 440] as const;
const VIEWPORT_HEIGHT = 900;

export default defineConfig({
  testDir: "./tests/mobile",
  // next dev compiles each route on first hit; keep generous, bounded timeouts.
  timeout: 90_000,
  expect: { timeout: 10_000 },
  fullyParallel: true,
  workers: process.env.CI ? 2 : 4,
  retries: 1,
  reporter: [["list"], ["html", { open: "never", outputFolder: "tests/mobile/report" }]],
  use: {
    baseURL: "http://localhost:3137",
    navigationTimeout: 60_000,
    trace: "retain-on-failure",
  },
  projects: WIDTHS.map((width) => ({
    name: `w${width}`,
    use: {
      ...devices["Pixel 7"],
      viewport: { width, height: VIEWPORT_HEIGHT },
      isMobile: true,
      hasTouch: true,
    },
  })),
  webServer: {
    // Test the production build, not `next dev`. Dev mode intermittently
    // corrupts the compiled globals.css chunk under parallel cold load; the
    // production server is stable and is the exact output users receive.
    // `npm run build` also runs the copy-hyphen check. Dedicated port avoids
    // contention with any dev server on 3000.
    command: "npm run build && next start -p 3137",
    url: "http://localhost:3137",
    reuseExistingServer: false,
    timeout: 300_000,
  },
});

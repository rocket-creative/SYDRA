import { COMPARISON_SLUGS } from "@/lib/idr/comparisons";
import { NAMED_PAYER_SLUGS } from "@/lib/idr/denial-reasons";
import { GUIDE_SLUGS } from "@/lib/idr/guides";
import {
  IDR_CODES,
  IDR_PAYERS,
  LAUNCH_STATE_CODES,
  SPECIALTIES,
  stateSlug,
} from "@/lib/idr/taxonomy";
import { RESOURCE_SLUGS } from "@/lib/content/resources/articles";

export type MobileRoute = {
  /** A stable, filesystem-safe name used for screenshots and test titles. */
  name: string;
  /** The path to navigate to (relative to baseURL). */
  path: string;
};

/**
 * Representative samples for the programmatic routes. These are computed from
 * the same data sources and slug helpers the app uses (see src/app/sitemap.ts
 * and the [code]/[state]/[payer] page guards), so each sample resolves to a
 * real page rather than a notFound(). One sample per dynamic template.
 */
const sampleCode = IDR_CODES[0]!.code;
const sampleStateCode = LAUNCH_STATE_CODES[0]; // "TX" — a launch state, so getStatePathway() is defined
const sampleStateSlug = stateSlug(sampleStateCode);
const samplePayer =
  IDR_PAYERS.find((p) => NAMED_PAYER_SLUGS.has(p.slug))?.slug ?? IDR_PAYERS[0]!.slug;
const sampleSpecialty = SPECIALTIES[0]!.slug;
const sampleGuide = GUIDE_SLUGS[0];
const sampleComparison = COMPARISON_SLUGS[0];
const sampleResource = RESOURCE_SLUGS[0];

/** Static routes (every non-parameterized page in src/app). */
const STATIC_ROUTES: MobileRoute[] = [
  { name: "home", path: "/" },
  { name: "demo", path: "/demo" },
  { name: "demo-thank-you", path: "/demo/thank-you" },
  { name: "pricing", path: "/pricing" },
  { name: "how-it-works", path: "/how-it-works" },
  { name: "what-is-idr", path: "/what-is-idr" },
  { name: "sydra-vs-idr-attorney", path: "/sydra-vs-idr-attorney" },
  { name: "in-house-idr", path: "/in-house-idr" },
  { name: "security", path: "/security" },
  { name: "resources", path: "/resources" },
  { name: "faq", path: "/faq" },
  { name: "about", path: "/about" },
  { name: "contact", path: "/contact" },
  { name: "privacy", path: "/privacy" },
  { name: "terms", path: "/terms" },
  { name: "idr", path: "/idr" },
  { name: "idr-guide", path: "/idr/guide" },
  { name: "postcard", path: "/r" },
];

/** One representative sample per dynamic route template. */
const DYNAMIC_ROUTES: MobileRoute[] = [
  { name: "idr-cpt-code", path: `/idr/cpt/${sampleCode}` },
  { name: "idr-cpt-code-state", path: `/idr/cpt/${sampleCode}/${sampleStateSlug}` },
  {
    name: "idr-cpt-code-state-payer",
    path: `/idr/cpt/${sampleCode}/${sampleStateSlug}/${samplePayer}`,
  },
  { name: "idr-state", path: `/idr/state/${sampleStateSlug}` },
  { name: "idr-state-specialty", path: `/idr/state/${sampleStateSlug}/${sampleSpecialty}` },
  { name: "idr-payer", path: `/idr/payer/${samplePayer}` },
  { name: "idr-specialty", path: `/idr/specialty/${sampleSpecialty}` },
  { name: "idr-guide-slug", path: `/idr/guide/${sampleGuide}` },
  { name: "compare-slug", path: `/compare/${sampleComparison}` },
  { name: "resources-slug", path: `/resources/${sampleResource}` },
  { name: "postcard-state", path: `/r/${sampleStateCode.toLowerCase()}` },
];

export const ROUTES: MobileRoute[] = [...STATIC_ROUTES, ...DYNAMIC_ROUTES];

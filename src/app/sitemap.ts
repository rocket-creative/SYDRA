import type { MetadataRoute } from "next";

import { US_STATES } from "@/lib/constants/us-states";
import { COMPARISON_SLUGS } from "@/lib/idr/comparisons";
import { composeDenialReasons, payerAngleIsDistinct } from "@/lib/idr/denial-engine";
import { NAMED_PAYER_SLUGS } from "@/lib/idr/denial-reasons";
import { GUIDE_SLUGS } from "@/lib/idr/guides";
import { CURRENT_WAVE, isIndexable } from "@/lib/idr/indexable";
import { plainLineLength } from "@/lib/idr/pain-content";
import { RESOURCE_SLUGS } from "@/lib/content/resources/articles";
import {
  idrCodePath,
  idrCodeStatePath,
  idrCodeStatePayerPath,
  idrSpecialtyPath,
  idrStatePath,
  idrStateSpecialtyPath,
} from "@/lib/idr/seo";
import { getStatePathway } from "@/lib/idr/state-pathways";
import {
  IDR_CODES,
  SPECIALTIES,
  codesForSpecialty,
  stateSlug,
} from "@/lib/idr/taxonomy";
import { RELEASED_CPT_WAVES } from "@/lib/seo/phasing";
import { siteUrl } from "@/lib/site";

/**
 * Sitemap index (build spec section 5.4). Child sitemaps split by tier. Each
 * child lists ONLY pages where isIndexable is true, so the file content is the
 * single source of truth for what Google may index. As CURRENT_WAVE rises, more
 * URLs appear automatically. A noindex URL is never listed.
 *
 * Deep CPT tiers are large, so they are emitted per released state (each state
 * carries about 190 code by state pages plus roughly 2,280 code by state by
 * payer pages, well under the 50,000 URL ceiling). They only appear once wave 3
 * is live, which keeps the index free of empty children before then.
 */

type Entry = {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
};

const NON_CANONICAL_GUIDE_SLUGS = new Set(["what-is-no-surprises-act-idr"]);
const CPT_ID_PREFIX = "cpt-";
const NAMED_PAYERS = [...NAMED_PAYER_SLUGS];

export async function generateSitemaps() {
  const children: { id: string }[] = [
    { id: "core" },
    { id: "specialties" },
    { id: "guides" },
    { id: "states" },
  ];

  // The deep CPT tiers only carry indexable URLs once wave 3 is live.
  if (CURRENT_WAVE >= 3) {
    children.push({ id: "cpt" });
    for (const code of RELEASED_CPT_WAVES) {
      children.push({ id: `${CPT_ID_PREFIX}${stateSlug(code)}` });
    }
  }

  return children;
}

function toSitemap(base: string, now: Date, entries: Entry[]): MetadataRoute.Sitemap {
  return entries.map(({ path, priority, changeFrequency }) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));
}

function coreEntries(): Entry[] {
  const marketingPages: Entry[] = [
    { path: "", priority: 1, changeFrequency: "weekly" },
    { path: "/demo", priority: 0.9, changeFrequency: "monthly" },
    { path: "/pricing", priority: 0.9, changeFrequency: "monthly" },
    { path: "/how-it-works", priority: 0.8, changeFrequency: "monthly" },
    { path: "/what-is-idr", priority: 0.8, changeFrequency: "monthly" },
    { path: "/sydra-vs-idr-attorney", priority: 0.8, changeFrequency: "monthly" },
    { path: "/in-house-idr", priority: 0.8, changeFrequency: "monthly" },
    { path: "/security", priority: 0.75, changeFrequency: "monthly" },
    { path: "/resources", priority: 0.7, changeFrequency: "weekly" },
    { path: "/faq", priority: 0.7, changeFrequency: "monthly" },
    { path: "/about", priority: 0.7, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.75, changeFrequency: "monthly" },
    { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
    { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
    { path: "/idr", priority: 0.86, changeFrequency: "weekly" },
    { path: "/idr/guide", priority: 0.78, changeFrequency: "weekly" },
  ];

  const articlePages: Entry[] = RESOURCE_SLUGS.map((slug) => ({
    path: `/resources/${slug}`,
    priority: 0.6,
    changeFrequency: "monthly",
  }));

  const comparisonPages: Entry[] = COMPARISON_SLUGS.map((slug) => ({
    path: `/compare/${slug}`,
    priority: 0.7,
    changeFrequency: "monthly",
  }));

  return [...marketingPages, ...articlePages, ...comparisonPages];
}

function specialtyEntries(): Entry[] {
  if (!isIndexable({ tier: "specialty" })) return [];
  return SPECIALTIES.map((s) => ({
    path: idrSpecialtyPath(s.slug),
    priority: 0.84,
    changeFrequency: "monthly",
  }));
}

function guideEntries(): Entry[] {
  return GUIDE_SLUGS.filter(
    (slug) =>
      !NON_CANONICAL_GUIDE_SLUGS.has(slug) && isIndexable({ tier: "guide" }),
  ).map((slug) => ({
    path: `/idr/guide/${slug}`,
    priority: 0.7,
    changeFrequency: "monthly",
  }));
}

/** State hubs plus specialty by state pages, indexable only. */
function stateEntries(): Entry[] {
  const entries: Entry[] = [];
  for (const s of US_STATES) {
    const pathway = getStatePathway(s.code);
    const isLaunch = pathway?.isLaunch ?? false;

    if (
      isIndexable({
        tier: "state",
        hasStatePathway: !!pathway,
        stateCode: s.code,
        isLaunchState: isLaunch,
      })
    ) {
      entries.push({
        path: idrStatePath(s.code),
        priority: 0.84,
        changeFrequency: "monthly",
      });
    }

    for (const specialty of SPECIALTIES) {
      const codes = codesForSpecialty(specialty.slug);
      const first = codes[0];
      const reasonCount = first
        ? composeDenialReasons({ code: first.code, stateName: s.name }).reasons
            .length
        : 0;
      if (
        isIndexable({
          tier: "specialtyState",
          hasStatePathway: !!pathway,
          reasonCount,
          stateCode: s.code,
          isLaunchState: isLaunch,
        })
      ) {
        entries.push({
          path: idrStateSpecialtyPath(s.code, specialty.slug),
          priority: 0.82,
          changeFrequency: "monthly",
        });
      }
    }
  }
  return entries;
}

/** CPT all states hubs, indexable only (wave 3+). */
function cptHubEntries(): Entry[] {
  return IDR_CODES.filter((c) =>
    isIndexable({ tier: "cpt", plainLineLength: plainLineLength(c.code) }),
  ).map((c) => ({
    path: idrCodePath(c.code),
    priority: 0.86,
    changeFrequency: "monthly",
  }));
}

/** CPT by state and CPT by state by payer for one released state, indexable only. */
function cptStateEntries(targetStateSlug: string): Entry[] {
  const state = US_STATES.find((s) => stateSlug(s.code) === targetStateSlug);
  if (!state) return [];
  const pathway = getStatePathway(state.code);
  const entries: Entry[] = [];

  for (const c of IDR_CODES) {
    const code = c.code;
    const pll = plainLineLength(code);
    const reasonCount = composeDenialReasons({ code, stateName: state.name })
      .reasons.length;

    if (
      isIndexable({
        tier: "cptState",
        hasStatePathway: !!pathway,
        reasonCount,
        plainLineLength: pll,
        stateCode: state.code,
      })
    ) {
      entries.push({
        path: idrCodeStatePath(code, state.code),
        priority: 0.9,
        changeFrequency: "monthly",
      });
    }

    for (const payer of NAMED_PAYERS) {
      const payerReasonCount = composeDenialReasons({
        code,
        stateName: state.name,
        payerSlug: payer,
      }).reasons.length;
      if (
        isIndexable({
          tier: "cptStatePayer",
          hasStatePathway: !!pathway,
          reasonCount: payerReasonCount,
          plainLineLength: pll,
          stateCode: state.code,
          payerAngleIsDistinct: payerAngleIsDistinct(code, payer),
        })
      ) {
        entries.push({
          path: idrCodeStatePayerPath(code, state.code, payer),
          priority: 0.88,
          changeFrequency: "monthly",
        });
      }
    }
  }
  return entries;
}

export default async function sitemap(props: {
  id: Promise<string>;
}): Promise<MetadataRoute.Sitemap> {
  const id = await props.id;
  const base = siteUrl();
  const now = new Date();

  if (id === "core") return toSitemap(base, now, coreEntries());
  if (id === "specialties") return toSitemap(base, now, specialtyEntries());
  if (id === "guides") return toSitemap(base, now, guideEntries());
  if (id === "states") return toSitemap(base, now, stateEntries());
  if (id === "cpt") return toSitemap(base, now, cptHubEntries());

  if (id.startsWith(CPT_ID_PREFIX)) {
    return toSitemap(base, now, cptStateEntries(id.slice(CPT_ID_PREFIX.length)));
  }

  return [];
}

import type { MetadataRoute } from "next";

import { RESOURCE_SLUGS } from "@/lib/content/resources/articles";
import { COMPARISON_SLUGS } from "@/lib/idr/comparisons";
import { GUIDE_SLUGS } from "@/lib/idr/guides";
import {
  getIndexableCodeStatePayers,
  getIndexableCodeStates,
} from "@/lib/idr/queries";
import {
  idrCodePath,
  idrCodeStatePath,
  idrCodeStatePayerPath,
  idrStatePath,
} from "@/lib/idr/seo";
import { SPECIALTIES } from "@/lib/idr/taxonomy";
import { US_STATES } from "@/lib/constants/us-states";
import { siteUrl } from "@/lib/site";

type Entry = {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteUrl();
  const now = new Date();

  const articlePages: Entry[] = RESOURCE_SLUGS.map((slug) => ({
    path: `/resources/${slug}`,
    priority: 0.6,
    changeFrequency: "monthly",
  }));

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
    ...articlePages,
  ];

  // Entity hub pages (always linkable; priority per playbook section 7).
  const idrIndex: Entry[] = [
    { path: "/idr", priority: 0.86, changeFrequency: "weekly" },
    { path: "/idr/guide", priority: 0.78, changeFrequency: "weekly" },
  ];
  const specialtyPages: Entry[] = SPECIALTIES.map((s) => ({
    path: `/idr/specialty/${s.slug}`,
    priority: 0.84,
    changeFrequency: "monthly",
  }));
  // Guides whose canonical defers to a primary page are excluded so the sitemap
  // emits only canonical URLs (playbook section 7.3).
  const NON_CANONICAL_GUIDE_SLUGS = new Set(["what-is-no-surprises-act-idr"]);
  const guidePages: Entry[] = GUIDE_SLUGS.filter(
    (slug) => !NON_CANONICAL_GUIDE_SLUGS.has(slug),
  ).map((slug) => ({
    path: `/idr/guide/${slug}`,
    priority: 0.7,
    changeFrequency: "monthly",
  }));
  const comparisonPages: Entry[] = COMPARISON_SLUGS.map((slug) => ({
    path: `/compare/${slug}`,
    priority: 0.7,
    changeFrequency: "monthly",
  }));

  // Only emit data-backed (indexable) entity pages. Seed-only environments
  // contribute nothing here, which is the intended gating behavior.
  const [codeStates, codeStatePayers] = await Promise.all([
    getIndexableCodeStates(),
    getIndexableCodeStatePayers(),
  ]);

  const codeHubPaths = new Map<string, Entry>();
  const codeStatePages: Entry[] = [];
  for (const { code, state } of codeStates) {
    codeStatePages.push({
      path: idrCodeStatePath(code, state),
      priority: 0.9,
      changeFrequency: "monthly",
    });
    codeHubPaths.set(code, {
      path: idrCodePath(code),
      priority: 0.86,
      changeFrequency: "monthly",
    });
  }

  // State hubs carry reviewed eligibility content and are always indexable, so
  // every state is emitted regardless of benchmark data tier.
  const statePages: Entry[] = US_STATES.map((s) => ({
    path: idrStatePath(s.code),
    priority: 0.84,
    changeFrequency: "monthly",
  }));

  const codeStatePayerPages: Entry[] = codeStatePayers.map(
    ({ code, state, payerSlug }) => ({
      path: idrCodeStatePayerPath(code, state, payerSlug),
      priority: 0.88,
      changeFrequency: "monthly",
    }),
  );

  const entries: Entry[] = [
    ...marketingPages,
    ...idrIndex,
    ...specialtyPages,
    ...guidePages,
    ...comparisonPages,
    ...Array.from(codeHubPaths.values()),
    ...codeStatePages,
    ...statePages,
    ...codeStatePayerPages,
  ];

  return entries.map(({ path, priority, changeFrequency }) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));
}

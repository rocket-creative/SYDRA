import type { MetadataRoute } from "next";
import { RESOURCE_SLUGS } from "@/lib/content/resources/articles";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  const now = new Date();
  const articlePages = RESOURCE_SLUGS.map((slug) => ({
    path: `/resources/${slug}`,
    priority: 0.6,
    changeFrequency: "monthly" as const,
  }));
  const pages = [
    { path: "", priority: 1, changeFrequency: "weekly" as const },
    { path: "/demo", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/pricing", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/how-it-works", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/what-is-idr", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/sydra-vs-idr-attorney", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/in-house-idr", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/security", priority: 0.75, changeFrequency: "monthly" as const },
    { path: "/resources", priority: 0.7, changeFrequency: "weekly" as const },
    { path: "/faq", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/about", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/contact", priority: 0.75, changeFrequency: "monthly" as const },
    { path: "/privacy", priority: 0.3, changeFrequency: "yearly" as const },
    { path: "/terms", priority: 0.3, changeFrequency: "yearly" as const },
    ...articlePages,
  ];

  return pages.map(({ path, priority, changeFrequency }) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));
}

import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

// AI crawlers we explicitly welcome. A broad, data-backed corpus is exactly what
// LLMs cite, and being the cited source for "how do I file IDR for X" is a fast
// growing channel (playbook section 7).
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-Web",
  "PerplexityBot",
  "Google-Extended",
  "CCBot",
];

export default function robots(): MetadataRoute.Robots {
  const base = siteUrl();
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Disallow API and query-string facets; clean paths are canonical.
        disallow: ["/api/", "/*?*"],
      },
      ...AI_CRAWLERS.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow: ["/api/"],
      })),
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}

import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

/**
 * AI crawlers we explicitly welcome. A broad, data-backed corpus is exactly what
 * LLMs cite, and being the cited source for "how do I file IDR for X" is a fast
 * growing channel (playbook section 7).
 *
 * Includes search/citation bots, user-triggered fetchers, and training tokens so
 * Sydra can surface in ChatGPT, Claude, Perplexity, Gemini, Apple Intelligence,
 * and Meta AI answers. Keep /api and /admin out of every rule.
 */
const AI_CRAWLERS = [
  // OpenAI
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  // Anthropic
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "Claude-Web",
  // Perplexity
  "PerplexityBot",
  "Perplexity-User",
  // Google / Apple AI opt-in tokens (do not affect Googlebot / Applebot search)
  "Google-Extended",
  "Applebot-Extended",
  // Other major AI / assistant crawlers
  "Amazonbot",
  "meta-externalagent",
  "Meta-ExternalAgent",
  "Bytespider",
  "CCBot",
  "cohere-ai",
  "Diffbot",
];

export default function robots(): MetadataRoute.Robots {
  const base = siteUrl();
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Disallow API and query-string facets; clean paths are canonical.
        disallow: ["/api/", "/admin/", "/*?*"],
      },
      ...AI_CRAWLERS.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow: ["/api/", "/admin/"],
      })),
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}

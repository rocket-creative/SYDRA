import { US_STATES } from "@/lib/constants/us-states";
import { RESOURCE_SLUGS } from "@/lib/content/resources/articles";
import { RESOURCE_UPDATE_SLUGS } from "@/lib/content/resources/updates";
import { COMPARISONS } from "@/lib/idr/comparisons";
import { GUIDES } from "@/lib/idr/guides";
import { idrSpecialtyPath, idrStatePath } from "@/lib/idr/seo";
import { SPECIALTIES } from "@/lib/idr/taxonomy";
import { siteUrl } from "@/lib/site";

/** Citation-cluster HTML paths that always have a markdown twin. */
export const STATIC_MARKDOWN_PATHS = [
  "/",
  "/what-is-idr",
  "/how-it-works",
  "/pricing",
  "/faq",
  "/glossary",
  "/security",
  "/about",
  "/contact",
  "/case-review",
  "/idr-filing-deadline",
  "/in-house-idr",
  "/idr-for-billing-companies",
  "/idr-for-contingency-firms",
  "/sydra-vs-idr-attorney",
  "/idr-recovery-calculator",
  "/demo",
  "/schedule",
  "/roadmap",
  "/privacy",
  "/terms",
  "/do-not-sell",
  "/idr",
  "/idr/guide",
  "/resources",
  "/resources/updates",
] as const;

export function htmlPathToMarkdownPath(htmlPath: string): string {
  if (htmlPath === "/" || htmlPath === "") return "/index.md";
  return `${htmlPath.replace(/\/$/, "")}.md`;
}

export function markdownHref(htmlPath: string): string {
  return `${siteUrl()}${htmlPathToMarkdownPath(htmlPath)}`;
}

export function allMarkdownHtmlPaths(): string[] {
  const dynamic = [
    ...GUIDES.map((g) => `/idr/guide/${g.slug}`),
    ...COMPARISONS.map((c) => `/compare/${c.slug}`),
    ...RESOURCE_SLUGS.map((slug) => `/resources/${slug}`),
    ...RESOURCE_UPDATE_SLUGS.map((slug) => `/resources/updates/${slug}`),
    ...SPECIALTIES.map((s) => idrSpecialtyPath(s.slug)),
    ...US_STATES.map((s) => idrStatePath(s.code)),
  ];
  return [...STATIC_MARKDOWN_PATHS, ...dynamic];
}

export function hasMarkdownTwin(htmlPath: string): boolean {
  const normalized = htmlPath === "" ? "/" : htmlPath.replace(/\/$/, "") || "/";
  return allMarkdownHtmlPaths().includes(normalized);
}

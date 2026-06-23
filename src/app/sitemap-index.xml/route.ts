import { generateSitemaps } from "@/app/sitemap";
import { siteUrl } from "@/lib/site";

/**
 * Sitemap index.
 *
 * When app/sitemap.ts exports generateSitemaps, Next serves the child sitemaps
 * at /sitemap/<id>.xml and reserves /sitemap.xml for its own metadata route,
 * which then returns 404 for the bare path. robots.txt advertises /sitemap.xml,
 * so a `beforeFiles` rewrite (next.config.ts) maps /sitemap.xml to this handler.
 * The <sitemapindex> is built from the same generateSitemaps() children so the
 * index and the children can never drift.
 */
export const revalidate = 86400;

export async function GET() {
  const base = siteUrl();
  const children = await generateSitemaps();
  const lastmod = new Date().toISOString();

  const entries = children
    .map(
      ({ id }) =>
        `  <sitemap>\n    <loc>${base}/sitemap/${id}.xml</loc>\n    <lastmod>${lastmod}</lastmod>\n  </sitemap>`,
    )
    .join("\n");

  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</sitemapindex>\n`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}

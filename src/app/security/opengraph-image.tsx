import { createOgImageResponse, OG_TAGLINES } from "@/lib/seo/og-image";

export const runtime = "nodejs";
export const alt = OG_TAGLINES.security;
export const size = { width: 1200, height: 630 };

export default function OgImage() {
  return createOgImageResponse(OG_TAGLINES.security);
}

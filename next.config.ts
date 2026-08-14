import type { NextConfig } from "next";

const securityHeaders = [
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  {
    // Google tag (gtag.js) + Ads + GA4 allowlist from
    // https://developers.google.com/tag-platform/security/guides/csp
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      [
        "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
        "https://www.googletagmanager.com",
        "https://*.googletagmanager.com",
        "https://www.googleadservices.com",
        "https://www.google.com",
        "https://pagead2.googlesyndication.com",
        "https://googleads.g.doubleclick.net",
        "https://va.vercel-scripts.com",
      ].join(" "),
      "style-src 'self' 'unsafe-inline'",
      [
        "img-src 'self' data: blob:",
        "https://www.googletagmanager.com",
        "https://*.googletagmanager.com",
        "https://www.google-analytics.com",
        "https://*.google-analytics.com",
        "https://www.google.com",
        "https://*.google.com",
        "https://google.com",
        "https://www.googleadservices.com",
        "https://pagead2.googlesyndication.com",
        "https://googleads.g.doubleclick.net",
        "https://*.g.doubleclick.net",
        "https://ad.doubleclick.net",
      ].join(" "),
      "font-src 'self' data:",
      [
        "connect-src 'self'",
        "https://*.supabase.co",
        "https://calendly.com",
        "https://*.calendly.com",
        "https://www.googletagmanager.com",
        "https://*.googletagmanager.com",
        "https://www.google-analytics.com",
        "https://*.google-analytics.com",
        "https://*.analytics.google.com",
        "https://analytics.google.com",
        "https://www.google.com",
        "https://*.google.com",
        "https://google.com",
        "https://www.googleadservices.com",
        "https://pagead2.googlesyndication.com",
        "https://googleads.g.doubleclick.net",
        "https://*.g.doubleclick.net",
        "https://ad.doubleclick.net",
        "https://stats.g.doubleclick.net",
        "https://va.vercel-scripts.com",
        "https://vitals.vercel-insights.com",
      ].join(" "),
      [
        "frame-src 'self'",
        "https://calendly.com",
        "https://*.calendly.com",
        "https://www.googletagmanager.com",
        "https://td.doubleclick.net",
        "https://*.doubleclick.net",
      ].join(" "),
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self' mailto:",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async rewrites() {
    return {
      // Serve the sitemap index at the canonical /sitemap.xml. Next reserves
      // that path for the generateSitemaps metadata route (which 404s the bare
      // path), so a beforeFiles rewrite intercepts it before app routing.
      beforeFiles: [{ source: "/sitemap.xml", destination: "/sitemap-index.xml" }],
      afterFiles: [],
      fallback: [],
    };
  },
  async redirects() {
    return [
      {
        source: "/plans",
        destination: "/pricing",
        permanent: true,
      },
      {
        // Canonical topic lives at the root page; avoid two pages competing.
        source: "/compare/sydra-vs-idr-attorney",
        destination: "/sydra-vs-idr-attorney",
        permanent: true,
      },
      {
        // Legacy WordPress / Squarespace style legal URLs from Search Console 404s.
        source: "/terms-and-conditions",
        destination: "/terms",
        permanent: true,
      },
      {
        source: "/privacy-policy",
        destination: "/privacy",
        permanent: true,
      },
      {
        // Google Ads sitelink pointed here; canonical page is /how-it-works.
        source: "/how-sydra-works",
        destination: "/how-it-works",
        permanent: true,
      },
      {
        // Broken post-submit target seen in live tests; real page lives under /demo.
        source: "/thank-you",
        destination: "/demo/thank-you",
        permanent: false,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;

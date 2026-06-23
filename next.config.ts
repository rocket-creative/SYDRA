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
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https://www.googletagmanager.com https://www.google.com https://www.googleadservices.com https://googleads.g.doubleclick.net",
      "font-src 'self' data:",
      "connect-src 'self' https://*.supabase.co https://calendly.com https://*.calendly.com https://www.googletagmanager.com https://www.google-analytics.com https://*.google-analytics.com https://www.google.com https://www.googleadservices.com https://googleads.g.doubleclick.net",
      "frame-src 'self' https://calendly.com https://*.calendly.com https://td.doubleclick.net https://*.doubleclick.net",
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

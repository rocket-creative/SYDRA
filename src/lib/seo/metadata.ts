import type { Metadata } from "next";

import { siteUrl } from "@/lib/site";

const SITE_NAME = "Sydra";

function ogImageUrl(): string {
  return `${siteUrl()}/opengraph-image`;
}

const OG_IMAGE_ALT = "Sydra NSA IDR software for surgical groups";

type PageMetadataInput = {
  /** Full page title, 50–60 chars, keyword first, brand last */
  title: string;
  /** Meta description, 150–160 chars */
  description: string;
  /** Path without domain, e.g. `/about` or `` for homepage */
  path: string;
  robots?: Metadata["robots"];
};

export function buildPageMetadata({
  title,
  description,
  path,
  robots = { index: true, follow: true },
}: PageMetadataInput): Metadata {
  const canonical = `${siteUrl()}${path === "" ? "" : path}`;
  const ogImage = ogImageUrl();

  return {
    title: { absolute: title },
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: SITE_NAME,
      locale: "en_US",
      type: "website",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: OG_IMAGE_ALT,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    robots,
  };
}

/** Homepage metadata (also used as root layout default). */
export const HOME_METADATA = buildPageMetadata({
  title: "NSA IDR Software for Surgical Groups | Sydra",
  description:
    "NSA and federal IDR software for surgical billing teams. File disputes in under 5 minutes. Eligibility, prior auth, CPT review, and compliance tools included.",
  path: "",
});

export const PAGE_METADATA = {
  about: buildPageMetadata({
    title: "About Sydra | Built by Surgeons and RCM Operators",
    description:
      "Meet the Kronos Health team behind Sydra. Dr. John Abrahams, Heisha Rivera, and Chelsea built NSA IDR software used by surgical billing teams nationwide.",
    path: "/about",
  }),
  plans: buildPageMetadata({
    title: "Sydra Plans | Self Serve, Support, and Full Service",
    description:
      "Compare Sydra Self Serve, Sydra plus Kronos Support, and Kronos Full Service. No published pricing. Schedule a demo to find the right tier for your practice.",
    path: "/plans",
  }),
  demo: buildPageMetadata({
    title: "Schedule a Sydra Demo | NSA IDR Walkthrough Live",
    description:
      "Book a 15 minute Sydra demo on a real denied claim. Built for surgical billing teams filing federal IDR and NSA disputes. Sandbox access available on the call.",
    path: "/demo",
  }),
  howItWorks: buildPageMetadata({
    title: "How Sydra Works | NSA IDR Software Step by Step",
    description:
      "See Sydra on a real claim end to end. Upload an EOB, draft an IDR in under 5 minutes, and submit with your billing team in control. ModMed supported today.",
    path: "/how-it-works",
  }),
  security: buildPageMetadata({
    title: "Sydra Security | HIPAA Safeguards and Trust",
    description:
      "Built to support HIPAA safeguards. BAA on request, AWS hosting, encryption, tenant isolation, audit logging, and SOC 2 aligned controls for surgical billing teams using Sydra.",
    path: "/security",
  }),
  faq: buildPageMetadata({
    title: "Sydra FAQ | NSA IDR Pricing, Onboarding, Support",
    description:
      "Answers about Sydra onboarding, pricing, workflow, claims, support tiers, and when to choose Kronos Full Service instead of Sydra software for your practice.",
    path: "/faq",
  }),
  contact: buildPageMetadata({
    title: "Contact Sydra | Demo, Sales, and Support Channels",
    description:
      "Schedule a demo, contact sales, or reach customer support. Hours 9:00 to 5:00 ET, Monday through Friday. Email response within 24 business hours.",
    path: "/contact",
  }),
  privacy: buildPageMetadata({
    title: "Sydra Privacy Policy | Kronos Health Website Data",
    description:
      "How Kronos Health and Sydra collect, use, and protect information submitted through demo requests, contact forms, and email links on this marketing website.",
    path: "/privacy",
  }),
  terms: buildPageMetadata({
    title: "Sydra Terms of Use | Kronos Health Website Agreement",
    description:
      "Terms governing use of the Sydra marketing website operated by Kronos Health. Software use is governed by separate customer agreements and business associate agreements.",
    path: "/terms",
  }),
  thankYou: buildPageMetadata({
    title: "Demo Request Received | Sydra",
    description:
      "Your Sydra demo request was received. Our team will review and follow up within one business day at the time you selected.",
    path: "/demo/thank-you",
    robots: { index: false, follow: false },
  }),
} as const;

import type { Metadata } from "next";

import { siteUrl } from "@/lib/site";

const SITE_NAME = "Sydra";

export const DEFAULT_OG_IMAGE_ALT =
  "Sydra — NSA IDR software for surgical billing teams. Under 5 minutes per claim.";

function ogImageUrl(path = ""): string {
  const base = siteUrl();
  return path ? `${base}${path}/opengraph-image` : `${base}/opengraph-image`;
}

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  ogImageAlt?: string;
  ogImagePath?: string;
  robots?: Metadata["robots"];
};

export function buildPageMetadata({
  title,
  description,
  path,
  ogImageAlt = DEFAULT_OG_IMAGE_ALT,
  ogImagePath,
  robots = { index: true, follow: true },
}: PageMetadataInput): Metadata {
  const canonical = `${siteUrl()}${path === "" ? "" : path}`;
  const ogImage = ogImagePath ? ogImageUrl(ogImagePath) : ogImageUrl();

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
          alt: ogImageAlt,
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

export const HOME_METADATA = buildPageMetadata({
  title: "NSA IDR Software for Surgical Billing Teams | Sydra",
  description:
    "Sydra prepares federal IDR submissions in under 5 minutes per claim. Specialty trained for orthopedic, neurosurgery, spine, and plastics. HIPAA controls. BAA available. Free demo.",
  path: "",
});

export const PAGE_METADATA = {
  about: buildPageMetadata({
    title: "About Sydra — Built by Kronos Health | Dr. John M. Abrahams, MD | Sydra",
    description:
      "Sydra is built by Kronos Health, founded by Dr. John M. Abrahams, a practicing board certified neurosurgeon. The software was built from a working RCM operation, not a technology startup.",
    path: "/about",
    ogImagePath: "/about",
  }),
  pricing: buildPageMetadata({
    title: "Sydra Pricing — NSA IDR Software Plans | Sydra",
    description:
      "Sydra pricing is quoted on your demo call based on specialty and monthly OON volume. Structured below typical 20% attorney contingency. Three tiers: Self Serve, Support, Full Service.",
    path: "/pricing",
    ogImagePath: "/pricing",
    ogImageAlt: "Sydra pricing — NSA IDR software plans for surgical billing teams.",
  }),
  demo: buildPageMetadata({
    title: "Schedule a Sydra Demo — 15 Minutes on a Real Denied Claim | Sydra",
    description:
      "We walk through Sydra on an actual denied claim from your specialty. Eligibility check, draft generation, DOCX export in real time. You see the output before you commit to anything.",
    path: "/demo",
    ogImagePath: "/demo",
  }),
  howItWorks: buildPageMetadata({
    title: "How Sydra Prepares an NSA IDR Submission | Step by Step | Sydra",
    description:
      "From EOB upload to IDRE portal submission. Eligibility check, AI draft generation, clinical narrative from op note, prior determination citations, DOCX export. Under 5 minutes.",
    path: "/how-it-works",
    ogImagePath: "/how-it-works",
  }),
  security: buildPageMetadata({
    title: "Sydra Security — HIPAA Controls, BAA, AWS Bedrock, PHI Handling | Sydra",
    description:
      "Sydra handles PHI under HIPAA controls. AWS Bedrock with HIPAA eligible Claude Sonnet 4. Encryption at rest and in transit. BAA available. SOC 2 in progress, not yet certified.",
    path: "/security",
    ogImagePath: "/security",
  }),
  faq: buildPageMetadata({
    title: "Sydra FAQ — NSA IDR Software Questions Answered | Sydra",
    description:
      "Detailed answers to billing team and practice administrator questions about Sydra's NSA IDR software. Eligibility, CPT coding, HIPAA, integration, pricing, and more.",
    path: "/faq",
  }),
  contact: buildPageMetadata({
    title: "Contact Sydra — Sales, Demos, and Support | Sydra",
    description:
      "Schedule a demo, ask a pricing question, or reach customer support. Sales: sales@kronosrevenue.health. Support: support@sydrahealth.com. Responses within one business day.",
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

/** @deprecated Use PAGE_METADATA.pricing */
export const PLANS_METADATA = PAGE_METADATA.pricing;

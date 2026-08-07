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
  /** Override the canonical URL when this page should defer to another (e.g. a
   *  guide variant that points at the primary explainer). Defaults to `path`. */
  canonicalPath?: string;
  ogImageAlt?: string;
  ogImagePath?: string;
  keywords?: string[];
  robots?: Metadata["robots"];
};

export function buildPageMetadata({
  title,
  description,
  path,
  canonicalPath,
  ogImageAlt = DEFAULT_OG_IMAGE_ALT,
  ogImagePath,
  keywords,
  robots = { index: true, follow: true },
}: PageMetadataInput): Metadata {
  const canonicalTarget = canonicalPath ?? path;
  const canonical = `${siteUrl()}${canonicalTarget === "" ? "/" : canonicalTarget}`;
  const ogImage = ogImagePath ? ogImageUrl(ogImagePath) : ogImageUrl();

  return {
    title: { absolute: title },
    description,
    ...(keywords && keywords.length > 0 ? { keywords } : {}),
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
    title: "About Sydra | Dr. John M. Abrahams, MD | Sydra",
    description:
      "Sydra is founded by Dr. John M. Abrahams, a practicing board certified neurosurgeon. The software was built from a working RCM operation, not a technology startup.",
    path: "/about",
    ogImagePath: "/about",
  }),
  pricing: buildPageMetadata({
    title: "NSA IDR Software Pricing for Surgical Billing Teams | Sydra",
    description:
      "Sydra pricing is quoted on your demo call based on specialty and monthly OON volume. Structured below typical 20% attorney contingency. Three tiers: Self Serve, Support, Full Service.",
    path: "/pricing",
    ogImagePath: "/pricing",
    ogImageAlt: "Sydra pricing — NSA IDR software plans for surgical billing teams.",
  }),
  demo: buildPageMetadata({
    title: "NSA IDR Software Demo on a Real Denied Claim | Sydra",
    description:
      "We walk through Sydra on an actual denied claim from your specialty. Eligibility check, draft generation, DOCX export in real time. You see the output before you commit to anything.",
    path: "/demo",
    ogImagePath: "/demo",
  }),
  howItWorks: buildPageMetadata({
    title: "How to File an NSA IDR Submission, Step by Step | Sydra",
    description:
      "From EOB upload to IDRE portal submission. Eligibility check, AI draft generation, clinical narrative from op note, prior determination citations, DOCX export. Under 5 minutes.",
    path: "/how-it-works",
    ogImagePath: "/how-it-works",
  }),
  whatIsIdr: buildPageMetadata({
    title: "What Is IDR? No Surprises Act Dispute Resolution | Sydra",
    description:
      "IDR means Independent Dispute Resolution under the No Surprises Act. See who qualifies, deadlines and fees, and how surgical billing teams recover underpaid out of network claims.",
    path: "/what-is-idr",
    ogImageAlt:
      "What IDR means under the No Surprises Act, explained for surgical billing teams.",
  }),
  sydraVsAttorney: buildPageMetadata({
    title: "Sydra vs an IDR Attorney | Keep the 20% You Would Pay | Sydra",
    description:
      "IDR attorneys keep about 20 percent of every recovery. Compare the fee math against Sydra software your billing team runs in house, and see exactly what you keep.",
    path: "/sydra-vs-idr-attorney",
    ogImageAlt:
      "Sydra software compared with an IDR attorney on the 20 percent contingency fee.",
  }),
  inHouseIdr: buildPageMetadata({
    title: "In House IDR | Scale Federal Disputes Without Headcount | Sydra",
    description:
      "Filing federal IDR by hand takes 25 to 40 minutes per claim. See what that labor costs at your volume and how Sydra adds capacity without adding staff.",
    path: "/in-house-idr",
    ogImageAlt:
      "Running federal IDR in house at scale without adding billing headcount.",
  }),
  security: buildPageMetadata({
    title: "Sydra Security — HIPAA Controls, BAA, AWS Bedrock, PHI Handling | Sydra",
    description:
      "Sydra handles PHI under HIPAA controls. AWS Bedrock with HIPAA eligible Claude Sonnet 4. Encryption at rest and in transit. BAA available. SOC 2 aligned, report under NDA.",
    path: "/security",
    ogImagePath: "/security",
  }),
  faq: buildPageMetadata({
    title: "Sydra FAQ — NSA IDR Software Questions Answered | Sydra",
    description:
      "Detailed answers to billing team and practice administrator questions about Sydra's NSA IDR software. Eligibility, CPT coding, HIPAA, integration, pricing, and more.",
    path: "/faq",
    ogImageAlt:
      "Answers to common questions about Sydra NSA IDR software for surgical billing teams.",
  }),
  resources: buildPageMetadata({
    title: "Resources — Federal IDR and No Surprises Act Guides | Sydra",
    description:
      "Practical guides for surgical billing teams on the federal IDR process, eligibility, deadlines, fees, win rates, and the No Surprises Act. Written for providers, not patients.",
    path: "/resources",
    ogImageAlt:
      "Federal IDR and No Surprises Act guides for surgical billing teams.",
  }),
  contact: buildPageMetadata({
    title: "Contact Sydra — Sales, Demos, and Support | Sydra",
    description:
      "Schedule a demo, ask a pricing question, or reach customer support. Email sales@sydrahealth.com. Responses within one business day.",
    path: "/contact",
    ogImageAlt: "Contact Sydra for sales, demos, and customer support.",
  }),
  privacy: buildPageMetadata({
    title: "Sydra Privacy Policy | Website Data Practices",
    description:
      "How Sydra collects, uses, and shares information from demo requests, claim reviews, and contact forms, including marketing emails and Google Customer Match advertising.",
    path: "/privacy",
  }),
  doNotSell: buildPageMetadata({
    title: "Do Not Sell or Share My Personal Information | Sydra",
    description:
      "Opt out of sale or sharing of your personal information for advertising, unsubscribe from Sydra marketing emails, or request deletion of marketing site data.",
    path: "/do-not-sell",
  }),
  terms: buildPageMetadata({
    title: "Sydra Terms of Use | Website Agreement",
    description:
      "Terms governing use of the Sydra marketing website. Software use is governed by separate customer agreements and business associate agreements.",
    path: "/terms",
  }),
  thankYou: buildPageMetadata({
    title: "Demo Request Received | Sydra",
    description:
      "Your Sydra demo request was received. Our team will review and follow up within one business day at the time you selected.",
    path: "/demo/thank-you",
    robots: { index: false, follow: false },
  }),
  caseReview: buildPageMetadata({
    title: "Free NSA IDR Claim Review | Sydra",
    description:
      "Request a free claim review. Share your practice details and out of network volume. Sydra follows up within one business day with a clear recommendation.",
    path: "/case-review",
  }),
  caseReviewThankYou: buildPageMetadata({
    title: "Claim Review Request Received | Sydra",
    description:
      "Your Sydra claim review request was received. Our team will follow up within one business day.",
    path: "/case-review/thank-you",
    robots: { index: false, follow: false },
  }),
} as const;

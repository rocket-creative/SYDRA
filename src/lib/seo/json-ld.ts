import { getContactEmail, getContactPhoneDisplay } from "@/lib/contact";
import { siteUrl } from "@/lib/site";

export const SYDRA_ORG_ID = () => `${siteUrl()}/#organization`;
export const SYDRA_WEBSITE_ID = () => `${siteUrl()}/#website`;
export const SYDRA_SOFTWARE_ID = () => `${siteUrl()}/#software`;
export const SYDRA_LOGO_URL = () => `${siteUrl()}/sydra-logo-nav.svg`;

const DEFAULT_SAME_AS = ["https://www.linkedin.com/company/sydra-health/"] as const;

/** Comma separated social profile URLs from NEXT_PUBLIC_ORG_SAME_AS when set. */
export function organizationSameAs(): string[] {
  const raw = process.env.NEXT_PUBLIC_ORG_SAME_AS?.trim();
  if (!raw) {
    return [...DEFAULT_SAME_AS];
  }
  return raw
    .split(",")
    .map((url) => url.trim())
    .filter((url) => url.length > 0);
}

type BreadcrumbItem = {
  name: string;
  path: string;
};

export function breadcrumbJsonLd(items: BreadcrumbItem[]) {
  const base = siteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.path === "" ? base : `${base}${item.path}`,
    })),
  };
}

/** Stable Person @id for Dr. Abrahams; educational pages reference this via reviewedBy. */
export const DR_ABRAHAMS_PERSON_ID = () => `${siteUrl()}/about#dr-abrahams`;

/**
 * Physician JSON-LD for Dr. John Abrahams.
 * Credentials are limited to facts already stated on /about.
 */
export function drAbrahamsPersonJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Physician",
    "@id": DR_ABRAHAMS_PERSON_ID(),
    name: "Dr. John Abrahams, MD",
    jobTitle: "Founder, Board Certified Neurosurgeon",
    description:
      "Dr. John Abrahams, MD is a practicing neurosurgeon in New York. Fellow, American Association of Neurological Surgeons. Past President, Brain and Spine Surgeons of New York. Founder, Sydra. He reviews all medical content published by Sydra.",
    medicalSpecialty: "Neurosurgery",
    worksFor: { "@id": SYDRA_ORG_ID() },
    memberOf: {
      "@type": "MedicalOrganization",
      name: "American Association of Neurological Surgeons",
    },
    url: `${siteUrl()}/about`,
  };
}

export function webPageJsonLd({
  path,
  name,
  description,
  reviewedBy,
}: {
  path: string;
  name: string;
  description: string;
  /** When true, sets reviewedBy to Dr. Abrahams Person @id. */
  reviewedBy?: boolean;
}) {
  const base = siteUrl();
  const url = `${base}${path}`;
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}/#webpage`,
    url,
    name,
    description,
    isPartOf: { "@id": SYDRA_WEBSITE_ID() },
    about: { "@id": SYDRA_ORG_ID() },
    ...(reviewedBy ? { reviewedBy: { "@id": DR_ABRAHAMS_PERSON_ID() } } : {}),
  };
}

/**
 * Person + WebPage with reviewedBy for educational surfaces.
 * Spread into PageJsonLd data arrays alongside FAQ/Service/Article nodes.
 */
export function medicallyReviewedWebPageJsonLd({
  path,
  name,
  description,
}: {
  path: string;
  name: string;
  description: string;
}) {
  return [
    drAbrahamsPersonJsonLd(),
    webPageJsonLd({ path, name, description, reviewedBy: true }),
  ];
}

export function faqPageJsonLd(questions: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}

export function articleJsonLd({
  path,
  headline,
  description,
  datePublished,
  dateModified,
  reviewedBy,
  type = "Article",
}: {
  path: string;
  headline: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  /** When true, sets reviewedBy to Dr. Abrahams Person @id. */
  reviewedBy?: boolean;
  /** Use NewsArticle for dated regulatory updates that read as news. */
  type?: "Article" | "NewsArticle";
}) {
  const base = siteUrl();
  const url = `${base}${path}`;
  return {
    "@context": "https://schema.org",
    "@type": type,
    "@id": `${url}/#article`,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    headline,
    description,
    datePublished,
    dateModified: dateModified ?? datePublished,
    inLanguage: "en-US",
    isPartOf: { "@id": SYDRA_WEBSITE_ID() },
    author: { "@id": SYDRA_ORG_ID() },
    publisher: { "@id": SYDRA_ORG_ID() },
    image: SYDRA_LOGO_URL(),
    ...(reviewedBy ? { reviewedBy: { "@id": DR_ABRAHAMS_PERSON_ID() } } : {}),
  };
}

export function newsArticleJsonLd(
  input: Omit<Parameters<typeof articleJsonLd>[0], "type">,
) {
  return articleJsonLd({ ...input, type: "NewsArticle" });
}

export function howToJsonLd({
  path,
  name,
  description,
  steps,
}: {
  path: string;
  name: string;
  description: string;
  steps: { name: string; text: string }[];
}) {
  const base = siteUrl();
  const url = `${base}${path}`;
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "@id": `${url}/#howto`,
    name,
    description,
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
  };
}

export function itemListJsonLd(items: { name: string; path: string }[]) {
  const base = siteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: `${base}${item.path}`,
    })),
  };
}

export function definedTermSetJsonLd({
  path,
  name,
  terms,
}: {
  path: string;
  name: string;
  terms: { name: string; description: string; url?: string }[];
}) {
  const base = siteUrl();
  const url = `${base}${path}`;
  return {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    "@id": `${url}/#definedtermset`,
    name,
    url,
    hasDefinedTerm: terms.map((term) => ({
      "@type": "DefinedTerm",
      name: term.name,
      description: term.description,
      inDefinedTermSet: `${url}/#definedtermset`,
      ...(term.url ? { url: term.url } : {}),
    })),
  };
}

export function serviceJsonLd({
  name,
  description,
  serviceType,
}: {
  name: string;
  description: string;
  serviceType: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    serviceType,
    provider: { "@id": SYDRA_ORG_ID() },
    areaServed: "United States",
  };
}

export function softwareApplicationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": SYDRA_SOFTWARE_ID(),
    name: "Sydra",
    applicationCategory: "HealthcareApplication",
    operatingSystem: "Web browser",
    url: siteUrl(),
    description:
      "NSA IDR software for surgical billing teams. File federal independent dispute resolution claims in under 5 minutes. Specialty trained for orthopedic, neurosurgery, spine, and plastic surgery CPT sets. Built on AWS Bedrock with HIPAA controls.",
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "USD",
      description:
        "Pricing shared on demo call. Structured below typical 20% attorney contingency fee.",
    },
    featureList: [
      "AI drafted federal IDR submissions using Claude Sonnet 4 on AWS Bedrock",
      "State IDR pathway support: TX live, NY CA NJ FL AZ rolling out 2026",
      "Real time eligibility verification 270/271",
      "Prior authorization drafting",
      "CPT code assessment from operative notes",
      "213+ ingested IDR determinations with 90%+ provider win rate in reference library",
      "HIPAA controls AWS BAA SOC 2 aligned",
      "ModMed EMR integration Stedi clearinghouse",
    ],
    creator: {
      "@type": "Organization",
      "@id": SYDRA_ORG_ID(),
      name: "Sydra",
    },
  };
}

/** Free tool schema for the standalone IDR recovery calculator page. */
export function webApplicationJsonLd({
  path,
  name,
  description,
}: {
  path: string;
  name: string;
  description: string;
}) {
  const url = `${siteUrl()}${path}`;
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": `${url}/#webapplication`,
    name,
    description,
    url,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web browser",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    provider: { "@id": SYDRA_ORG_ID() },
  };
}

/** VideoObject for explainer videos with inline transcript. */
export function videoObjectJsonLd({
  path,
  name,
  description,
  uploadDate,
  transcript,
  contentUrl,
  embedUrl,
  durationSeconds,
}: {
  path: string;
  name: string;
  description: string;
  uploadDate: string;
  transcript: string;
  contentUrl?: string;
  embedUrl?: string;
  durationSeconds?: number;
}) {
  const pageUrl = `${siteUrl()}${path}`;
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "@id": `${pageUrl}/#video`,
    name,
    description,
    uploadDate,
    transcript,
    ...(durationSeconds
      ? { duration: `PT${Math.round(durationSeconds)}S` }
      : {}),
    ...(contentUrl ? { contentUrl } : {}),
    ...(embedUrl ? { embedUrl } : {}),
    reviewedBy: { "@id": DR_ABRAHAMS_PERSON_ID() },
    publisher: { "@id": SYDRA_ORG_ID() },
  };
}

type PersonInput = {
  name: string;
  jobTitle: string;
  description: string;
  url?: string;
  sameAs?: string[];
  image?: string;
  isPhysician?: boolean;
  medicalSpecialty?: string;
};

export function personJsonLd(person: PersonInput) {
  return {
    "@context": "https://schema.org",
    "@type": person.isPhysician ? "Physician" : "Person",
    name: person.name,
    jobTitle: person.jobTitle,
    description: person.description,
    worksFor: { "@id": SYDRA_ORG_ID() },
    ...(person.url ? { url: person.url } : {}),
    ...(person.sameAs?.length ? { sameAs: person.sameAs } : {}),
    ...(person.image ? { image: person.image } : {}),
    ...(person.isPhysician && person.medicalSpecialty
      ? { medicalSpecialty: person.medicalSpecialty }
      : {}),
  };
}

export const SYDRA_LOCALBUSINESS_ID = () => `${siteUrl()}/#localbusiness`;

/**
 * Contact-page LocalBusiness node. All fields mirror the NAP that already
 * renders on /contact and in the footer, linked to the organization.
 */
export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "@id": SYDRA_LOCALBUSINESS_ID(),
    name: "Sydra",
    url: siteUrl(),
    telephone: "+19147056830",
    address: {
      "@type": "PostalAddress",
      streetAddress: "244 Westchester Ave, Suite 209",
      addressLocality: "West Harrison",
      addressRegion: "NY",
      postalCode: "10604",
      addressCountry: "US",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "17:00",
    },
    parentOrganization: { "@id": SYDRA_ORG_ID() },
  };
}

export function organizationContactPoint() {
  const phone = getContactPhoneDisplay();
  return {
    "@type": "ContactPoint",
    contactType: "customer service",
    email: getContactEmail(),
    ...(phone ? { telephone: phone } : {}),
    availableLanguage: "English",
  };
}

export function sydraOrganizationJsonLd() {
  const sameAs = organizationSameAs();
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": SYDRA_ORG_ID(),
    name: "Sydra",
    legalName: "Sydra",
    url: siteUrl(),
    logo: SYDRA_LOGO_URL(),
    description:
      "AI software for federal IDR and NSA disputes. Built by surgeons for surgical billing teams.",
    email: getContactEmail(),
    telephone: "+19147056830",
    address: {
      "@type": "PostalAddress",
      streetAddress: "244 Westchester Ave, Suite 209",
      addressLocality: "West Harrison",
      addressRegion: "NY",
      postalCode: "10604",
      addressCountry: "US",
    },
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };
}

export function sydraWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": SYDRA_WEBSITE_ID(),
    url: siteUrl(),
    name: "Sydra",
    publisher: { "@id": SYDRA_ORG_ID() },
  };
}

/** Part 1C — homepage FAQ schema subset */
export const HOMEPAGE_FAQ_SCHEMA = [
  {
    q: "What's Sydra and who is it for?",
    a: "Sydra is AI software for federal IDR and NSA dispute resolution, built for surgical billing teams at orthopedic, neurosurgery, spine, and plastic surgery practices. Your billing team operates the software in house, reducing IDR claim preparation from 30 minutes to under 5 minutes per claim. Sydra runs on AWS Bedrock with HIPAA controls and BAA available.",
  },
  {
    q: "How does Sydra reduce IDR prep time?",
    a: "Sydra uses Claude Sonnet 4 on AWS Bedrock to generate a complete federal IDR submission packet from an uploaded EOB. The system drafts the executive summary, market rate justification citing prior IDR determinations, and clinical necessity narrative from your operative note. Your billing team reviews, approves, and exports a submission ready DOCX file with a guided checklist for the federal IDRE portal.",
  },
  {
    q: "How does Sydra compare to using an IDR attorney?",
    a: "Attorneys typically charge 20% of every IDR recovery as a contingency fee. Sydra is software your billing team operates, priced below typical attorney contingency fees with an exact quote on the demo call. You keep the recovery in house instead of losing 20% per award. Sydra defaults to one claim per CPT to protect win rate, while batching remains available under the 2026 CMS rule when your team chooses it per submission.",
  },
  {
    q: "Is Sydra HIPAA compliant?",
    a: "Yes. Sydra runs on AWS healthcare workloads with HIPAA eligible Claude Sonnet 4 on AWS Bedrock. A Business Associate Agreement is available for covered entities. Documents are encrypted in transit and at rest. Strict per practice tenant isolation is enforced at every database table. PHI never leaves the AWS HIPAA eligible service boundary during AI generation.",
  },
  {
    q: "What's the difference between Sydra Self Serve, Sydra plus Support, and Sydra Full Service?",
    a: "Sydra Self Serve is software your billing team operates independently. Sydra plus Support adds live specialist support, monthly account reviews, and escalation on edge cases. Sydra Full Service is fully outsourced: our team handles every claim end to end. Start with a free claim review at /case-review. The right fit depends on who operates the workflow, not claim volume alone.",
  },
];

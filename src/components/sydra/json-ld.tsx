import { pricingFaqAnswer, tierRoutingFaqAnswer } from "@/lib/content/tiers";
import {
  KRONOS_HEALTH_ID,
  kronosRevenueUrl,
} from "@/lib/kronos-revenue";
import {
  faqPageJsonLd,
  kronosHealthOrganizationJsonLd,
  softwareApplicationJsonLd,
  sydraOrganizationJsonLd,
  SYDRA_WEBSITE_ID,
} from "@/lib/seo/json-ld";
import { siteUrl } from "@/lib/site";

import { PageJsonLd } from "@/components/sydra/page-json-ld";

const ATTORNEY_COMPARISON_ANSWER =
  "Attorneys typically take 20% of every recovery. Sydra is software your billing team runs, quoted on a demo call and structured below typical contingency fees. You keep the workflow and more of the win. If you want zero ops, Kronos Full-Service eliminates headcount and is priced so you keep more of each win than typical attorney contingency.";

/** Top homepage objections only — full FAQPage lives on /faq to avoid duplicate rich results. */
const HOMEPAGE_FAQ = [
  {
    q: "What does Sydra cost?",
    a: pricingFaqAnswer(),
  },
  {
    q: "How long does setup take?",
    a: "Most practices are up and running in under a week. We provision your tenant, import your provider profiles, connect your clearinghouse and EMR, and walk one billing lead through their first submission.",
  },
  {
    q: "Is my data secure?",
    a: "Yes. Strict tenant isolation, encrypted at rest and in transit, AWS BAA in place, role based access for your staff. PHI is handled under HIPAA controls.",
  },
  {
    q: "How does Sydra compare to using an IDR attorney?",
    a: ATTORNEY_COMPARISON_ANSWER,
  },
  {
    q: "When should we choose Sydra vs Sydra + Support vs Kronos Full-Service?",
    a: tierRoutingFaqAnswer(),
  },
];

export function HomepageJsonLd() {
  const base = siteUrl();
  const kronosRevenueBase = kronosRevenueUrl();
  const kronosRevenueId = `${kronosRevenueBase}/#organization`;
  const softwareId = `${base}/#software`;
  const webpageId = `${base}/#webpage`;

  const kronosRevenueOrganization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": kronosRevenueId,
    name: "Kronos Revenue",
    url: kronosRevenueBase,
    description:
      "Full service revenue cycle management and No Surprises Act IDR for surgical practices.",
    parentOrganization: { "@id": KRONOS_HEALTH_ID },
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": SYDRA_WEBSITE_ID(),
    name: "Sydra",
    url: base,
    description:
      "NSA and federal IDR software for surgical billing teams. Eligibility, prior authorization, CPT assessment, and compliance tools included.",
    publisher: { "@id": KRONOS_HEALTH_ID },
  };

  const webpage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": webpageId,
    url: base,
    name: "NSA IDR Software for Surgical Groups | Sydra",
    isPartOf: { "@id": SYDRA_WEBSITE_ID() },
    about: { "@id": softwareId },
    description:
      "Sydra is AI software for NSA and federal IDR disputes. File in under 5 minutes with specialty trained CPT coding.",
  };

  const softwareApplication = {
    ...softwareApplicationJsonLd({
      name: "Sydra",
      description:
        "AI software for federal and state IDR and NSA disputes for surgical billing teams. Primary focus: IDR submission drafting in under 5 minutes.",
    }),
    "@id": softwareId,
  };

  const kronosHealth = {
    ...kronosHealthOrganizationJsonLd(),
    subOrganization: [{ "@id": softwareId }, { "@id": kronosRevenueId }],
  };

  return (
    <PageJsonLd
      data={[
        kronosHealth,
        sydraOrganizationJsonLd(),
        softwareApplication,
        kronosRevenueOrganization,
        website,
        webpage,
        faqPageJsonLd(HOMEPAGE_FAQ),
      ]}
    />
  );
}

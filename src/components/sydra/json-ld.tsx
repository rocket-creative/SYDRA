import { pricingFaqAnswer, tierRoutingFaqAnswer } from "@/lib/content/tiers";
import { KRONOS_HEALTH_ID, KRONOS_HEALTH_URL, kronosRevenueUrl } from "@/lib/kronos-revenue";
import { siteUrl } from "@/lib/site";

const ATTORNEY_COMPARISON_ANSWER =
  "Attorneys typically take 20% of every recovery. Sydra is software your billing team runs — quoted on a demo call, structured below typical contingency fees. You keep the workflow and more of the win. If you want zero ops, Kronos Full-Service eliminates headcount and is priced so you keep more of each win than typical attorney contingency.";

const BASE = () => siteUrl();

export function HomepageJsonLd() {
  const base = BASE();
  const kronosRevenueBase = kronosRevenueUrl();
  const kronosRevenueId = `${kronosRevenueBase}/#organization`;
  const softwareId = `${base}/#software`;
  const websiteId = `${base}/#website`;
  const webpageId = `${base}/#webpage`;

  const parentOrganization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": KRONOS_HEALTH_ID,
    name: "Kronos Health",
    url: KRONOS_HEALTH_URL,
    subOrganization: [{ "@id": softwareId }, { "@id": kronosRevenueId }],
  };

  const softwareApplication = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": softwareId,
    name: "Sydra",
    url: base,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description:
      "AI software for federal and state IDR / NSA disputes for surgical billing teams. Primary focus: IDR submission drafting in under 5 minutes. Also offers eligibility verification, prior authorization drafting, CPT assessment, and compliance checks.",
    provider: { "@id": KRONOS_HEALTH_ID },
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      seller: { "@id": KRONOS_HEALTH_ID },
    },
  };

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
    "@id": websiteId,
    name: "Sydra",
    url: base,
    description:
      "NSA / federal IDR software for surgical billing teams. Also includes eligibility, prior authorization, CPT assessment, and compliance tools.",
    publisher: { "@id": KRONOS_HEALTH_ID },
  };

  const webpage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": webpageId,
    url: base,
    name: "Sydra | NSA IDR software for surgical groups",
    isPartOf: { "@id": websiteId },
    about: { "@id": softwareId },
    description:
      "Sydra is AI software for NSA / federal IDR disputes. File in under 5 minutes with specialty trained CPT coding. Also includes eligibility, prior auth, CPT review, and compliance.",
  };

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What does Sydra cost?",
        acceptedAnswer: {
          "@type": "Answer",
          text: pricingFaqAnswer(),
        },
      },
      {
        "@type": "Question",
        name: "How long does setup take?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Most practices are up and running in under a week. We provision your tenant, import your provider profiles, connect your clearinghouse and EMR, and walk one of your billing leads through their first submission.",
        },
      },
      {
        "@type": "Question",
        name: "Is my data secure?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Strict tenant isolation, encrypted at rest and in transit, AWS BAA in place, role-based access for your staff. PHI is handled under HIPAA controls. We can walk through our security posture with your compliance team before signing.",
        },
      },
      {
        "@type": "Question",
        name: "How does Sydra compare to using an IDR attorney?",
        acceptedAnswer: {
          "@type": "Answer",
          text: ATTORNEY_COMPARISON_ANSWER,
        },
      },
      {
        "@type": "Question",
        name: "When should we choose Sydra vs Sydra + Support vs Kronos Full-Service?",
        acceptedAnswer: {
          "@type": "Answer",
          text: tierRoutingFaqAnswer(),
        },
      },
      {
        "@type": "Question",
        name: "What does Sydra do besides IDR?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "NSA IDR is the primary focus and the biggest dollar win for most practices. Sydra also includes eligibility verification (270/271), prior authorization drafting, CPT review from op notes, and compliance checks — supporting tools that strengthen the claim before and after IDR.",
        },
      },
      {
        "@type": "Question",
        name: "Does Sydra replace my biller?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. Your biller still handles charge capture, claim submission, and standard accounts receivable follow-up. Sydra leads with NSA IDR drafting. It also supports prior auth narratives, compliance audits, and CPT review from op notes when your team needs them. Practices keep their biller and add Sydra.",
        },
      },
    ],
  };

  const payload = [
    parentOrganization,
    softwareApplication,
    kronosRevenueOrganization,
    website,
    webpage,
    faq,
  ].map((o) => JSON.stringify(o));

  return (
    <>
      {payload.map((json, i) => (
        <script
          dangerouslySetInnerHTML={{ __html: json }}
          key={`ld-${String(i)}`}
          type="application/ld+json"
        />
      ))}
    </>
  );
}

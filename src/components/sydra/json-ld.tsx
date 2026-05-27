import { getContactEmail } from "@/lib/contact";
import { pricingFaqAnswer } from "@/lib/content/tiers";
import { siteUrl } from "@/lib/site";

const BASE = () => siteUrl();

export function HomepageJsonLd() {
  const base = BASE();
  const orgId = `${base}/#organization`;
  const websiteId = `${base}/#website`;
  const webpageId = `${base}/#webpage`;

  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": orgId,
    name: "Kronos Health",
    url: base,
    logo: `${base}/icon-sydra.svg`,
    brand: {
      "@type": "Brand",
      name: "Sydra",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        email: getContactEmail(),
        contactType: "customer support",
      },
    ],
    sameAs: [] as string[],
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": websiteId,
    name: "Sydra",
    url: base,
    description:
      "NSA / federal IDR software for surgical billing teams. Also includes eligibility, prior authorization, CPT assessment, and compliance tools.",
    publisher: { "@id": orgId },
  };

  const webpage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": webpageId,
    url: base,
    name: "Sydra | NSA IDR software for surgical groups",
    isPartOf: { "@id": websiteId },
    about: { "@id": orgId },
    description:
      "Sydra is AI software for NSA / federal IDR disputes. File in under 5 minutes with specialty trained CPT coding. Also includes eligibility, prior auth, CPT review, and compliance.",
  };

  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Sydra NSA IDR software",
    description:
      "AI software for federal and state IDR / NSA disputes for surgical billing teams. Primary focus: IDR submission drafting in under 5 minutes. Also offers eligibility verification, prior authorization drafting, CPT assessment, and compliance checks.",
    provider: { "@id": orgId },
    areaServed: "United States",
    serviceType: "No Surprises Act IDR submission software",
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
          text: "Attorneys typically take 20% of every recovery. Sydra is software your billing team runs — quoted on a demo call, structured below typical contingency fees. You keep the workflow and more of the win.",
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
    organization,
    website,
    webpage,
    service,
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

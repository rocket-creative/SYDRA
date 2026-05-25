import { getContactEmail } from "@/lib/contact";
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
      "The practice enhancement platform for surgical groups — IDR-led, with real-time eligibility, prior authorization, CPT assessment, and compliance built in.",
    publisher: { "@id": orgId },
  };

  const webpage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": webpageId,
    url: base,
    name: "Sydra | Practice enhancement platform for surgical groups",
    isPartOf: { "@id": websiteId },
    about: { "@id": orgId },
    description:
      "Sydra is the practice enhancement platform for surgical groups. IDR-led. End-to-end. One platform. Real-time eligibility, prior authorization, CPT assessment, compliance, and Federal & State IDR.",
  };

  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Sydra practice enhancement platform",
    description:
      "AI-driven practice enhancement platform for surgical groups: real-time eligibility verification, prior authorization drafting, CPT assessment, compliance checks, and Federal & State IDR submission drafting.",
    provider: { "@id": orgId },
    areaServed: "United States",
    serviceType: "Healthcare revenue cycle management and IDR",
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
          text: "Sydra is available in three tiers. Basic is per claim — you pay when a claim is filed, no monthly commitment. Plus is a monthly subscription where your team operates the software with our support. Pro is fully managed — Kronos handles every claim end to end. Most practices recover the cost on their first one or two cases. Request a demo and we will quote based on your specialty, state, and estimated monthly volume.",
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
        name: "What does Sydra do besides IDR?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sydra was built around IDR — that's still the biggest dollar win for most practices. But the same engine now drives real-time eligibility verification (270/271), prior authorization drafting with embedded payer policy, an AI compliance check against medical-necessity criteria, and a CPT assessor that reads your op notes directly. It's a practice-wide tool now, not just an IDR drafter.",
        },
      },
      {
        "@type": "Question",
        name: "Does Sydra replace my biller?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. Your biller still handles charge capture, claim submission, and standard accounts receivable follow-up. Sydra sits alongside them and handles the high-judgment work AI is uniquely good at: IDR submissions, prior auth narratives, peer-to-peer prep, compliance audits, and CPT review from op notes. Practices keep their biller and add Sydra.",
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

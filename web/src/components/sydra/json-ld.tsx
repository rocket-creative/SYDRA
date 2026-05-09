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
      "AI drafted No Surprises Act IDR submissions for surgical practices.",
    publisher: { "@id": orgId },
  };

  const webpage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": webpageId,
    url: base,
    name: "Sydra | AI drafted IDR submissions for surgical practices",
    isPartOf: { "@id": websiteId },
    about: { "@id": orgId },
    description:
      "Sydra drafts stronger No Surprises Act IDR submissions for surgical practices using AI trained on real determinations.",
  };

  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Sydra IDR submission drafting",
    description:
      "AI assisted drafting of Independent Dispute Resolution submissions for surgical providers.",
    provider: { "@id": orgId },
    areaServed: "United States",
    serviceType: "Healthcare revenue cycle and IDR",
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
          text: "Sydra is licensed per practice with annual pricing scaled to your submission volume. Most practices recover the license cost on their first 1 to 2 cases. Request a demo for a custom quote.",
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
          text: "Yes. Strict tenant isolation, encrypted at rest and in transit, AWS BAA in place, role based access for your staff. PHI is handled under HIPAA controls. We can walk through our security posture with your compliance team before signing.",
        },
      },
      {
        "@type": "Question",
        name: "Does Sydra replace my biller?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. Sydra is the IDR layer specifically. Your biller still handles charge capture, claim submission, and standard accounts receivable follow up. When a denial qualifies for IDR, Sydra is the tool that drafts the submission faster and stronger than a biller can on their own.",
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

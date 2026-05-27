import { KRONOS_HEALTH_ID } from "@/lib/kronos-revenue";
import { TIERS } from "@/lib/content/tiers";
import { siteUrl } from "@/lib/site";

export function PricingPageJsonLd() {
  const base = siteUrl();

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: base,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Plans",
        item: `${base}/plans`,
      },
    ],
  };

  const offers = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Sydra pricing tiers",
    itemListElement: TIERS.map((tier, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Offer",
        name: tier.name,
        description: `${tier.tagline} ${tier.bestFor}`,
        seller: {
          "@type": "Organization",
          "@id": KRONOS_HEALTH_ID,
          name: "Kronos Health",
        },
        availability: "https://schema.org/InStock",
      },
    })),
  };

  return (
    <>
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
        type="application/ld+json"
      />
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(offers) }}
        type="application/ld+json"
      />
    </>
  );
}

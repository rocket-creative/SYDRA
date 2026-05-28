import { BreadcrumbJsonLd } from "@/components/sydra/breadcrumb-json-ld";
import { PageJsonLd } from "@/components/sydra/page-json-ld";
import { TIERS } from "@/lib/content/tiers";
import { PRICING_FAQ } from "@/lib/content/service-faqs";
import { KRONOS_HEALTH_ID } from "@/lib/kronos-revenue";
import { faqPageJsonLd, serviceJsonLd, webPageJsonLd } from "@/lib/seo/json-ld";
import { PAGE_METADATA } from "@/lib/seo/metadata";

function pageTitle(): string {
  const meta = PAGE_METADATA.pricing;
  if (meta.title && typeof meta.title === "object" && "absolute" in meta.title) {
    return String(meta.title.absolute);
  }
  return "Sydra Pricing";
}

export function PricingPageJsonLd() {
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
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "" },
          { name: "Pricing", path: "/pricing" },
        ]}
      />
      <PageJsonLd
        data={[
          webPageJsonLd({
            path: "/pricing",
            name: pageTitle(),
            description: PAGE_METADATA.pricing.description ?? "",
          }),
          serviceJsonLd({
            name: "Sydra NSA IDR Software Pricing",
            description:
              "Self Serve, Kronos Support, and Full Service tiers for surgical billing teams filing federal IDR and NSA disputes.",
            serviceType: "Healthcare billing software",
          }),
          faqPageJsonLd(PRICING_FAQ),
          offers,
        ]}
      />
    </>
  );
}

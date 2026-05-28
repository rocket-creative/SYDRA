import {
  faqPageJsonLd,
  HOMEPAGE_FAQ_SCHEMA,
  kronosHealthOrganizationJsonLd,
  softwareApplicationJsonLd,
  sydraOrganizationJsonLd,
  sydraWebsiteJsonLd,
  SYDRA_SOFTWARE_ID,
  SYDRA_WEBSITE_ID,
} from "@/lib/seo/json-ld";
import { siteUrl } from "@/lib/site";

import { PageJsonLd } from "@/components/sydra/page-json-ld";

export function HomepageJsonLd() {
  const base = siteUrl();
  const webpageId = `${base}/#webpage`;

  const webpage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": webpageId,
    url: base,
    name: "NSA IDR Software for Surgical Billing Teams | Sydra",
    isPartOf: { "@id": SYDRA_WEBSITE_ID() },
    about: { "@id": SYDRA_SOFTWARE_ID() },
    description:
      "Sydra prepares federal IDR submissions in under 5 minutes per claim. Specialty trained for orthopedic, neurosurgery, spine, and plastics.",
  };

  return (
    <PageJsonLd
      data={[
        kronosHealthOrganizationJsonLd(),
        sydraOrganizationJsonLd(),
        softwareApplicationJsonLd(),
        sydraWebsiteJsonLd(),
        webpage,
        faqPageJsonLd(HOMEPAGE_FAQ_SCHEMA),
      ]}
    />
  );
}

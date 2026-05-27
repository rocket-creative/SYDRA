import { getContactEmail, getContactPhoneDisplay } from "@/lib/contact";
import { KRONOS_HEALTH_ID, KRONOS_HEALTH_URL } from "@/lib/kronos-revenue";
import { siteUrl } from "@/lib/site";

export const SYDRA_ORG_ID = () => `${siteUrl()}/#organization`;
export const SYDRA_WEBSITE_ID = () => `${siteUrl()}/#website`;
export const SYDRA_LOGO_URL = () => `${siteUrl()}/icon-sydra.svg`;

/** Comma separated social profile URLs from NEXT_PUBLIC_ORG_SAME_AS when confirmed. */
export function organizationSameAs(): string[] {
  const raw = process.env.NEXT_PUBLIC_ORG_SAME_AS?.trim();
  if (!raw) return [];
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

export function webPageJsonLd({
  path,
  name,
  description,
}: {
  path: string;
  name: string;
  description: string;
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
  };
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

export function softwareApplicationJsonLd({
  name,
  description,
}: {
  name: string;
  description: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    url: siteUrl(),
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description,
    provider: { "@id": KRONOS_HEALTH_ID },
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      seller: { "@id": KRONOS_HEALTH_ID },
    },
  };
}

type PersonInput = {
  name: string;
  jobTitle: string;
  description: string;
  url?: string;
  sameAs?: string[];
  image?: string;
  /** When true, emits Physician type with medicalSpecialty */
  isPhysician?: boolean;
  medicalSpecialty?: string;
};

export function personJsonLd(person: PersonInput) {
  const base = {
    "@context": "https://schema.org",
    "@type": person.isPhysician ? "Physician" : "Person",
    name: person.name,
    jobTitle: person.jobTitle,
    description: person.description,
    worksFor: { "@id": KRONOS_HEALTH_ID },
    ...(person.url ? { url: person.url } : {}),
    ...(person.sameAs?.length ? { sameAs: person.sameAs } : {}),
    ...(person.image ? { image: person.image } : {}),
    ...(person.isPhysician && person.medicalSpecialty
      ? { medicalSpecialty: person.medicalSpecialty }
      : {}),
  };
  return base;
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
    url: siteUrl(),
    logo: {
      "@type": "ImageObject",
      url: SYDRA_LOGO_URL(),
    },
    parentOrganization: { "@id": KRONOS_HEALTH_ID },
    contactPoint: organizationContactPoint(),
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };
}

export function kronosHealthOrganizationJsonLd() {
  const sameAs = organizationSameAs();
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": KRONOS_HEALTH_ID,
    name: "Kronos Health",
    url: KRONOS_HEALTH_URL,
    logo: {
      "@type": "ImageObject",
      url: SYDRA_LOGO_URL(),
    },
    contactPoint: organizationContactPoint(),
    subOrganization: [{ "@id": SYDRA_ORG_ID() }],
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };
}

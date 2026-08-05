import { BreadcrumbJsonLd } from "@/components/sydra/breadcrumb-json-ld";
import { PageJsonLd } from "@/components/sydra/page-json-ld";
import { BREADCRUMBS } from "@/components/sydra/page-shell";
import { personJsonLd, SYDRA_ORG_ID, webPageJsonLd } from "@/lib/seo/json-ld";
import { PAGE_METADATA } from "@/lib/seo/metadata";
import { siteUrl } from "@/lib/site";

type TeamMember = {
  name: string;
  role: string;
  bio: string;
  credentials?: string;
  isPhysician?: boolean;
  medicalSpecialty?: string;
  url?: string;
};

type AboutPageJsonLdProps = {
  team: readonly TeamMember[];
};

function pageTitle(): string {
  const meta = PAGE_METADATA.about;
  if (meta.title && typeof meta.title === "object" && "absolute" in meta.title) {
    return String(meta.title.absolute);
  }
  return "About Sydra";
}

export function AboutPageJsonLd({ team }: AboutPageJsonLdProps) {
  const abrahams = team.find((m) => m.isPhysician);

  const physicianSchema = abrahams
    ? {
        "@context": "https://schema.org",
        "@type": "Physician",
        name: abrahams.name,
        jobTitle: abrahams.role,
        description: abrahams.bio,
        medicalSpecialty: abrahams.medicalSpecialty ?? "Neurosurgery",
        worksFor: { "@id": SYDRA_ORG_ID() },
        memberOf: {
          "@type": "MedicalOrganization",
          name: "American Association of Neurological Surgeons",
        },
        url: abrahams.url ?? `${siteUrl()}/about`,
      }
    : null;

  return (
    <>
      <BreadcrumbJsonLd items={[...BREADCRUMBS.about]} />
      <PageJsonLd
        data={[
          webPageJsonLd({
            path: "/about",
            name: pageTitle(),
            description: PAGE_METADATA.about.description ?? "",
          }),
          ...(physicianSchema ? [physicianSchema] : []),
          ...team
            .filter((m) => !m.isPhysician)
            .map((member) =>
              personJsonLd({
                name: member.name,
                jobTitle: member.role,
                description: member.bio,
              }),
            ),
        ]}
      />
    </>
  );
}

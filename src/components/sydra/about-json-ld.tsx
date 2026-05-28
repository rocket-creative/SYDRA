import { BreadcrumbJsonLd } from "@/components/sydra/breadcrumb-json-ld";
import { PageJsonLd } from "@/components/sydra/page-json-ld";
import { BREADCRUMBS } from "@/components/sydra/page-shell";
import { personJsonLd, webPageJsonLd } from "@/lib/seo/json-ld";
import { PAGE_METADATA } from "@/lib/seo/metadata";

type TeamMember = {
  name: string;
  role: string;
  bio: string;
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
        jobTitle: "Founder, Board Certified Neurosurgeon",
        medicalSpecialty: abrahams.medicalSpecialty ?? "Neurosurgery",
        worksFor: {
          "@type": "MedicalOrganization",
          name: "Kronos Health",
          url: "https://www.sydrahealth.com",
        },
        url: abrahams.url ?? "https://www.kronosrevenue.health/team#person-john-abrahams",
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

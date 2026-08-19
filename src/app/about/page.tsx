import Link from "next/link";

import { Button } from "@/components/ui/button";
import { EditorialImage } from "@/components/ui/editorial-image";
import { CtaTrustSignals } from "@/components/sydra/cta-trust-signals";
import { AboutPageJsonLd } from "@/components/sydra/about-json-ld";
import { BREADCRUMBS, SydraPageShell } from "@/components/sydra/page-shell";
import { ServiceCrossLinks } from "@/components/sydra/service-cross-links";
import { Section } from "@/components/ui/section";
import { caseReviewUrl } from "@/lib/case-review";
import { EDITORIAL } from "@/lib/images";
import { PAGE_METADATA } from "@/lib/seo/metadata";
import { siteUrl } from "@/lib/site";
import { textStyles } from "@/lib/typography";

export const metadata = PAGE_METADATA.about;

const team = [
  {
    name: "Dr. John Abrahams, MD",
    role: "Founder, Board Certified Neurosurgeon",
    credentials:
      "Fellow, American Association of Neurological Surgeons · Past President, Brain and Spine Surgeons of New York · Founder, Sydra",
    bio: "Dr. John Abrahams, MD is a practicing neurosurgeon in New York. He built the original federal IDR submission process for his own neurosurgical practice after the No Surprises Act took effect in 2022, and it produced consistently better outcomes than the contingency model the practice had used before.\n\nThe clinical coding framework, the determination library curation criteria, and the clinical necessity narrative structure in Sydra are all built from that work. He reviews every piece of medical content Sydra publishes.",
    isPhysician: true,
    medicalSpecialty: "Neurosurgery",
    url: `${siteUrl()}/about`,
  },
  {
    name: "Heisha Rivera",
    role: "Director of Revenue Cycle Operations · Sydra",
    credentials: "",
    bio: "Heisha leads the RCM operation at Sydra Full Service and the Sydra + Support team. She manages the specialists who handle Tier 2 Sydra escalations, monthly account reviews, and the Sydra Full Service client relationships.",
  },
  {
    name: "Chelsea",
    role: "Software and Integrations Lead",
    credentials: "",
    bio: "Chelsea leads Sydra's software development and integration architecture. She handles ModMed, Stedi, and EMR integration questions on demo calls and manages the product roadmap. EMR integration questions go to Chelsea.",
  },
] as const;

export default function AboutPage() {
  return (
    <>
      <AboutPageJsonLd team={team} />
      <SydraPageShell
        banded
        breadcrumb={[...BREADCRUMBS.about]}
        stickyCtaHref={caseReviewUrl("about-sticky")}
      >
        <Section ariaLabelledby="heading-about" tone="white">
        <header className="prose-measure">
          <h1 className={textStyles.pageTitle} id="heading-about">
            Built by a surgeon who ran the workflow.
            <span className={textStyles.pageSubtitle}>
              Not a technology company that discovered healthcare.
            </span>
          </h1>
          <div className={`${textStyles.bodyStack} mt-6`}>
            <p>
              Sydra is federal IDR software built out of a working revenue cycle operation, founded
              by Dr. John Abrahams, MD, a board certified practicing neurosurgeon in New York.
            </p>
          </div>
        </header>

          <EditorialImage
            aspect="3/2"
            asset={EDITORIAL.colleaguesDocument}
            className="mt-10"
            eager
            sizes="(max-width: 1024px) 100vw, 1200px"
          />
        </Section>

        <Section sidebarLabel="Team" tone="neutral">
          <div className="space-y-12 prose-measure">
            {team.map((person) => (
              <section
                key={person.name}
                aria-labelledby={`team-${person.name.replace(/\s/g, "-")}`}
              >
                <h2
                  className={textStyles.subsectionTitle}
                  id={`team-${person.name.replace(/\s/g, "-")}`}
                >
                  {person.name}
                </h2>
                <p className={`${textStyles.meta} mt-1 font-medium text-[var(--color-accent)]`}>
                  {person.role}
                </p>
                {person.credentials ? (
                  <p className={`${textStyles.meta} mt-1`}>{person.credentials}</p>
                ) : null}
                {person.bio.split("\n\n").map((paragraph) => (
                  <p className={`${textStyles.body} mt-3`} key={paragraph.slice(0, 40)}>
                    {paragraph}
                  </p>
                ))}
              </section>
            ))}
          </div>
        </Section>

        <Section sidebarLabel="Why us" tone="white">
          <section aria-labelledby="heading-why-origin" className="prose-measure">
            <h2 className={textStyles.sectionTitle} id="heading-why-origin">
              Why this origin matters for your practice.
            </h2>
            <div className={`${textStyles.bodyStack} mt-4`}>
              <p>
                Most software in this category is built by people who read the regulation. This was
                built by someone who missed deadlines, argued market rate, and watched a contingency
                take 20 percent of recoveries he had already done the clinical work for.
              </p>
              <p>
                That is why Sydra defaults to one claim per CPT, why the eligibility check runs
                before drafting, and why nothing files without a human approving it. Those are not
                product decisions made in a planning session. They are scar tissue.
              </p>
            </div>
            <p className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
              <Link className={textStyles.textLink} href="/how-it-works">
                How Sydra works
              </Link>
              <Link className={textStyles.textLink} href={caseReviewUrl()}>
                Prefer full service? Get a free claim review
              </Link>
            </p>
          </section>
        </Section>

        <Section tone="neutral">
          <div className="prose-measure">
            <Button href="/demo" showArrow>
              Set up a 15-minute call
            </Button>
            <CtaTrustSignals className="mt-4" />
          </div>
          <ServiceCrossLinks current="/about" />
        </Section>
      </SydraPageShell>
    </>
  );
}

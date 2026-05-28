import Link from "next/link";

import { Button } from "@/components/ui/button";
import { CtaTrustSignals } from "@/components/sydra/cta-trust-signals";
import { AboutPageJsonLd } from "@/components/sydra/about-json-ld";
import { BREADCRUMBS, SydraPageShell } from "@/components/sydra/page-shell";
import { ServiceCrossLinks } from "@/components/sydra/service-cross-links";
import { SourcesReferences } from "@/components/sydra/sources-references";
import { kronosTeamUrl } from "@/lib/kronos-revenue";
import { PAGE_METADATA } from "@/lib/seo/metadata";
import { textStyles } from "@/lib/typography";

export const metadata = PAGE_METADATA.about;

const team = [
  {
    name: "Dr. John M. Abrahams, MD",
    role: "Founder, Board Certified Neurosurgeon",
    credentials:
      "Fellow, American Association of Neurological Surgeons (FAANS) · Past President, Brain and Spine Surgeons of New York · Founder, Kronos Health",
    bio: "Dr. John M. Abrahams, MD is a practicing neurosurgeon in New York. He built the original NSA IDR submission process for his own neurosurgical practice after the No Surprises Act took effect in 2022. The process produced consistently better outcomes than the contingency attorney model the practice had used previously. His role in Sydra: the clinical coding framework, the determination library curation criteria, and the clinical necessity narrative structure are all built from his experience as a practicing surgeon. He reviews all medical content published by Kronos Health.",
    isPhysician: true,
    medicalSpecialty: "Neurosurgery",
    url: "https://www.kronosrevenue.health/team#person-john-abrahams",
  },
  {
    name: "Heisha Rivera",
    role: "Director of Revenue Cycle Operations · Kronos Health",
    credentials: "",
    bio: "Heisha leads the RCM operation at Kronos Revenue and the Sydra + Kronos Support team. She manages the specialists who handle Tier 2 Sydra escalations, monthly account reviews, and the Kronos Full Service client relationships.",
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
      <SydraPageShell breadcrumb={[...BREADCRUMBS.about]}>
        <header>
          <h1 className={textStyles.pageTitle}>
            Built by a surgeon who ran the workflow.
            <span className={textStyles.pageSubtitle}>
              Not a technology startup that discovered healthcare.
            </span>
          </h1>
          <div className={`${textStyles.bodyStack} mt-6`}>
            <p>
              Sydra is the software arm of Kronos Health. Kronos Health is a working revenue cycle
              management operation founded by Dr. John M. Abrahams, MD, a board certified practicing
              neurosurgeon in New York.
            </p>
            <p>
              The software wasn&apos;t built first. The billing operation was built first. Dr.
              Abrahams built the IDR process for his own neurosurgical practice, trained an RCM team
              on it, and then built Sydra to make the documentation step faster for billing teams who
              wanted to run the same workflow in house.
            </p>
            <p>
              First: the determination library that powers Sydra&apos;s market rate citations was
              built from a working IDR practice, not scraped generically from CMS data.
            </p>
            <p>
              Second: the clinical narrative framework that drives Sydra&apos;s AI generation was
              built by a surgeon who writes operative notes, not by a prompt engineer who read about
              them.
            </p>
          </div>
        </header>

        <div className="mt-12 space-y-12 prose-measure">
          {team.map((person) => (
            <section
              key={person.name}
              aria-labelledby={`team-${person.name.replace(/\s/g, "-")}`}
            >
              <h2 className={textStyles.subsectionTitle} id={`team-${person.name.replace(/\s/g, "-")}`}>
                {person.name}
              </h2>
              <p className={`${textStyles.meta} mt-1 font-medium text-[var(--color-accent)]`}>
                {person.role}
              </p>
              {person.credentials ? (
                <p className={`${textStyles.meta} mt-1`}>{person.credentials}</p>
              ) : null}
              <p className={`${textStyles.body} mt-3`}>{person.bio}</p>
            </section>
          ))}
        </div>

        <section aria-labelledby="heading-why-origin" className="mt-14 prose-measure">
          <h2 className={textStyles.sectionTitle} id="heading-why-origin">
            Why this origin matters for your practice.
          </h2>
          <p className={`${textStyles.body} mt-4`}>
            Sydra isn&apos;t the first software platform to claim it can prepare IDR submissions.
            It&apos;s the first one built by a practicing neurosurgeon whose team files IDR claims
            every day on the same platform. That&apos;s the reason we ask you to run the demo on a
            real denied claim, not a sample claim.
          </p>
          <p className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
            <Link className={textStyles.textLink} href="/how-it-works">
              How Sydra works
            </Link>
            <a
              className={textStyles.textLink}
              href={kronosTeamUrl()}
              rel="noopener noreferrer"
              target="_blank"
            >
              Full team story at Kronos Revenue
            </a>
          </p>
        </section>

        <div className="prose-measure mt-12">
          <Button href="/demo" showArrow>
            Schedule a demo
          </Button>
          <CtaTrustSignals className="mt-4" />
        </div>

        <ServiceCrossLinks current="/about" />
        <SourcesReferences className="mt-12" />
      </SydraPageShell>
    </>
  );
}

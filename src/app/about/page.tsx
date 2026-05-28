import Link from "next/link";

import { CtaTrustSignals } from "@/components/sydra/cta-trust-signals";
import { AboutPageJsonLd } from "@/components/sydra/about-json-ld";
import { BREADCRUMBS, SydraPageShell } from "@/components/sydra/page-shell";
import { ServiceCrossLinks } from "@/components/sydra/service-cross-links";
import { SourcesReferences } from "@/components/sydra/sources-references";
import { kronosTeamUrl } from "@/lib/kronos-revenue";
import { PAGE_METADATA } from "@/lib/seo/metadata";

export const metadata = PAGE_METADATA.about;

const team = [
  {
    name: "Dr. John M. Abrahams, MD",
    role: "Founder, Board Certified Neurosurgeon",
    credentials: "Fellow, American Association of Neurological Surgeons (FAANS) · Past President, Brain and Spine Surgeons of New York · Founder, Kronos Health",
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
        <div className="mx-auto max-w-3xl">
          <h1 className="text-[1.75rem] font-semibold tracking-tight text-[#1A2B48] sm:text-3xl md:text-[2.25rem]">
            Built by a surgeon who ran the workflow.
            <span className="mt-2 block text-xl font-medium text-[#4A5568] md:text-2xl">
              Not a technology startup that discovered healthcare.
            </span>
          </h1>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-[#4A5568] md:text-[17px]">
            <p>
              Sydra is the software arm of Kronos Health. Kronos Health is a working revenue
              cycle management operation founded by Dr. John M. Abrahams, MD, a board certified
              practicing neurosurgeon in New York.
            </p>
            <p>
              The software was not built first. The billing operation was built first. Dr.
              Abrahams built the IDR process for his own neurosurgical practice, trained an RCM
              team on it, and then built Sydra to make the documentation step faster for billing
              teams who wanted to run the same workflow in house.
            </p>
            <p>
              First: the determination library that powers Sydra&apos;s market rate citations was
              built from a working IDR practice, not scraped generically from CMS data.
            </p>
            <p>
              Second: the clinical narrative framework that drives Sydra&apos;s AI generation was
              built by a surgeon who writes operative notes, not by a prompt engineer who read
              about them.
            </p>
          </div>

          <div className="mt-12 space-y-12">
            {team.map((person) => (
              <section
                key={person.name}
                aria-labelledby={`team-${person.name.replace(/\s/g, "-")}`}
              >
                <h2
                  className="text-lg font-semibold text-[#1A2B48]"
                  id={`team-${person.name.replace(/\s/g, "-")}`}
                >
                  {person.name}
                </h2>
                <p className="mt-1 text-sm font-medium text-[rgb(0,40,184)]">{person.role}</p>
                {person.credentials ? (
                  <p className="mt-1 text-sm text-slate-500">{person.credentials}</p>
                ) : null}
                <p className="mt-3 text-[15px] leading-relaxed text-[#4A5568]">{person.bio}</p>
              </section>
            ))}
          </div>

          <section aria-labelledby="heading-why-origin" className="mt-14">
            <h2 className="text-lg font-semibold text-[#1A2B48]" id="heading-why-origin">
              Why this origin matters for your practice.
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-[#4A5568]">
              Sydra is not the first software platform to claim it can prepare IDR submissions.
              It is the first one built by a practicing neurosurgeon whose team files IDR claims
              every day on the same platform. That is the reason we ask you to run the demo on a
              real denied claim, not a sample claim.
            </p>
            <p className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm">
              <Link
                className="font-medium text-[rgb(0,40,184)] underline decoration-blue-200 underline-offset-4"
                href="/how-it-works"
              >
                How Sydra works
              </Link>
              <a
                className="font-medium text-[rgb(0,40,184)] underline decoration-blue-200 underline-offset-4"
                href={kronosTeamUrl()}
                rel="noopener noreferrer"
                target="_blank"
              >
                Full team story at Kronos Revenue
              </a>
            </p>
          </section>

          <div className="mt-12 text-center">
            <Link
              className="inline-flex min-h-12 items-center justify-center rounded-md bg-[#1A2B48] px-8 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-90"
              href="/demo"
            >
              Schedule a demo
            </Link>
            <CtaTrustSignals className="mt-4" />
          </div>

          <ServiceCrossLinks current="/about" />
          <SourcesReferences className="mt-12" />
        </div>
      </SydraPageShell>
    </>
  );
}

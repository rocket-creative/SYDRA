import Link from "next/link";

import { CtaTrustSignals } from "@/components/sydra/cta-trust-signals";
import { AboutPageJsonLd } from "@/components/sydra/about-json-ld";
import { BREADCRUMBS, SydraPageShell } from "@/components/sydra/page-shell";
import { ReviewHighlight } from "@/components/sydra/review-highlight";
import { ServiceCrossLinks } from "@/components/sydra/service-cross-links";
import {
  KRONOS_FULL_SERVICE_CTA,
  kronosCaseReviewUrl,
} from "@/lib/kronos-revenue";
import { PAGE_METADATA } from "@/lib/seo/metadata";

export const metadata = PAGE_METADATA.about;

const team = [
  {
    name: "Dr. John Abrahams",
    role: "Founder",
    credentials: "MD, FAANS",
    bio: "Practicing neurosurgeon and founder of Kronos Health. Built Sydra after watching billing teams lose hours per claim on IDR and insurers underpay out of network surgical cases.",
    isPhysician: true,
    medicalSpecialty: "Neurosurgery",
  },
  {
    name: "Heisha Rivera",
    role: "Director of Revenue Cycle",
    credentials: "20+ years healthcare billing and dispute experience",
    bio: "Director of Revenue Cycle with 20+ years of healthcare billing and dispute experience. She runs the day to day IDR operation and supports Tier 2 customers on disputed claims and account reviews.",
  },
  {
    name: "Chelsea",
    role: "Software lead",
    credentials: "Platform development and EMR integrations",
    bio: "Owns platform development, EMR integrations, and the technical walkthrough on software focused demos.",
  },
] as const;

export default function AboutPage() {
  return (
    <>
      <AboutPageJsonLd team={team} />
      <SydraPageShell breadcrumb={[...BREADCRUMBS.about]}>
        <div className="mx-auto max-w-3xl">
          <h1 className="text-[1.75rem] font-semibold tracking-tight text-[#1A2B48] sm:text-3xl">
            <ReviewHighlight>Who built Sydra?</ReviewHighlight>
          </h1>
          <p className="mt-6 text-base leading-relaxed text-[#4A5568] md:text-[17px]">
            Kronos Health is a real RCM operation. Sydra is its software arm,
            built by surgeons and billing operators who file NSA disputes every
            week, not a generic software shop.
          </p>

          <div className="mt-12 space-y-10">
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
                <p className="mt-1 text-sm text-slate-500">
                  <ReviewHighlight>{person.credentials}</ReviewHighlight>
                </p>
                <p className="mt-3 text-[15px] leading-relaxed text-[#4A5568]">
                  <ReviewHighlight>{person.bio}</ReviewHighlight>
                </p>
              </section>
            ))}
          </div>

          <aside className="mt-14 rounded-xl border border-slate-200 bg-slate-50 p-6 md:p-8">
            <h2 className="text-lg font-semibold text-[#1A2B48]">
              <ReviewHighlight>When should you choose Kronos Full Service?</ReviewHighlight>
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-[#4A5568]">
              Need every claim handled end to end? Kronos Full Service runs every file
              for practices that do not want to operate software themselves.
            </p>
            <a
              className="mt-4 inline-flex min-h-11 items-center justify-center rounded-md border border-slate-200 bg-white px-6 py-2.5 text-sm font-semibold text-[#1A2B48] transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              href={kronosCaseReviewUrl()}
              rel="noopener noreferrer"
              target="_blank"
            >
              {KRONOS_FULL_SERVICE_CTA} →
            </a>
          </aside>

          <div className="mt-12 text-center">
            <Link
              className="inline-flex min-h-12 items-center justify-center rounded-md bg-[#1A2B48] px-8 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              href="/demo"
            >
              Schedule a demo
            </Link>
            <CtaTrustSignals className="mt-4" />
          </div>

          <ServiceCrossLinks current="/about" />
        </div>
      </SydraPageShell>
    </>
  );
}

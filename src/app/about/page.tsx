import type { Metadata } from "next";
import Link from "next/link";

import { SydraFooter } from "@/components/sydra/footer";
import { SydraHeader } from "@/components/sydra/header";
import { KronosRevenueBanner } from "@/components/sydra/kronos-revenue-banner";
import { kronosRevenueUrl } from "@/lib/kronos-revenue";
import { siteUrl } from "@/lib/site";

const description =
  "Kronos Health built Sydra for surgical billing teams. Meet Dr. John Abrahams and the RCM operators behind the platform.";

export const metadata: Metadata = {
  title: "About",
  description,
  alternates: { canonical: `${siteUrl()}/about` },
  openGraph: {
    title: "About · Sydra",
    description,
    url: `${siteUrl()}/about`,
    type: "website",
  },
};

const team = [
  {
    name: "Dr. John Abrahams",
    role: "Founder",
    bio: "Practicing neurosurgeon. Built Sydra after watching billing teams lose hours per claim on IDR and insurers underpay out of network surgical cases.",
  },
  {
    name: "Hayes",
    role: "Director of Revenue Cycle",
    bio: "Leads the operators who trained Sydra on real determinations and supports Tier 2 customers on disputed claims and account reviews.",
  },
  {
    name: "Chelsea",
    role: "Software lead",
    bio: "Owns platform development, EMR integrations, and the technical walkthrough on software focused demos.",
  },
] as const;

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-stone-100 font-sans text-slate-900">
      <div className="mx-auto min-h-screen max-w-6xl bg-white shadow-sm xl:max-w-[1200px]">
        <SydraHeader />
        <main className="px-4 py-14 sm:px-6 md:py-20 xl:px-8">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-[1.75rem] font-semibold tracking-tight text-[#1A2B48] sm:text-3xl">
              Built by people who run claims
            </h1>
            <p className="mt-6 text-base leading-relaxed text-[#4A5568] md:text-[17px]">
              Kronos Health is a real RCM operation. Sydra is its software arm,
              built by surgeons and billing operators who file NSA disputes every
              week, not a generic software shop.
            </p>

            <div className="mt-12 space-y-10">
              {team.map((person) => (
                <section key={person.name}>
                  <h2 className="text-lg font-semibold text-[#1A2B48]">{person.name}</h2>
                  <p className="mt-1 text-sm font-medium text-[rgb(0,40,184)]">{person.role}</p>
                  <p className="mt-3 text-[15px] leading-relaxed text-[#4A5568]">{person.bio}</p>
                </section>
              ))}
            </div>

            <aside className="mt-14 rounded-xl border border-slate-200 bg-slate-50 p-6 md:p-8">
              <h2 className="text-lg font-semibold text-[#1A2B48]">Sister offering</h2>
              <p className="mt-3 text-[15px] leading-relaxed text-[#4A5568]">
                Need every claim handled end to end? Kronos Revenue runs every file
                for high volume practices that do not want to operate software
                themselves.
              </p>
              <a
                className="mt-4 inline-flex min-h-11 items-center justify-center rounded-md border border-slate-200 bg-white px-6 py-2.5 text-sm font-semibold text-[#1A2B48] transition hover:bg-slate-100"
                href={kronosRevenueUrl()}
                rel="noopener noreferrer"
                target="_blank"
              >
                See Kronos Revenue →
              </a>
            </aside>

            <div className="mt-12 text-center">
              <Link
                className="inline-flex min-h-12 items-center justify-center rounded-md bg-[#1A2B48] px-8 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-90"
                href="/demo"
              >
                Schedule a demo
              </Link>
            </div>
          </div>
        </main>
        <KronosRevenueBanner />
        <SydraFooter />
      </div>
    </div>
  );
}

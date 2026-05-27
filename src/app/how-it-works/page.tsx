import type { Metadata } from "next";
import Link from "next/link";

import { SydraFooter } from "@/components/sydra/footer";
import { SydraHeader } from "@/components/sydra/header";
import { KronosRevenueBanner } from "@/components/sydra/kronos-revenue-banner";
import { siteUrl } from "@/lib/site";

const description =
  "See Sydra on a real claim end to end. Upload an EOB, draft an IDR in under 5 minutes, and submit with your team in control.";

export const metadata: Metadata = {
  title: "How it works",
  description,
  alternates: { canonical: `${siteUrl()}/how-it-works` },
  openGraph: {
    title: "How it works · Sydra",
    description,
    url: `${siteUrl()}/how-it-works`,
    type: "website",
  },
};

const manualSteps = [
  "Pull the EOB and parse the denial reason",
  "Identify each eligible CPT code individually",
  "Look up qualified payment amounts for the geography",
  "Build the IDR submission and attach documentation",
  "File and track status manually",
] as const;

const sydraSteps = [
  {
    title: "Upload EOB",
    body: "Drag and drop, or copy from your EMR. ModMed supported today with more integrations on the roadmap.",
  },
  {
    title: "Sydra parses and flags",
    body: "AI identifies every eligible CPT, calculates qualified payment amounts by geography, and flags specialty specific exceptions.",
  },
  {
    title: "Draft generated",
    body: "Specialty coded IDR submission, one claim per CPT. Never batched codes that should be filed individually.",
  },
  {
    title: "Operator reviews",
    body: "Your billing team edits, approves, and owns the submission before it leaves your practice.",
  },
  {
    title: "Submit and track",
    body: "Export to the IDRE portal and monitor status in the Sydra dashboard.",
  },
] as const;

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-stone-100 font-sans text-slate-900">
      <div className="mx-auto min-h-screen max-w-6xl bg-white shadow-sm xl:max-w-[1200px]">
        <SydraHeader />
        <main className="px-4 py-14 sm:px-6 md:py-20 xl:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[rgb(0,40,184)]">
              How it works
            </p>
            <h1 className="mt-4 text-[1.75rem] font-semibold tracking-tight text-[#1A2B48] sm:text-3xl md:text-[2.25rem]">
              See Sydra on a real claim, end to end
            </h1>
            <p className="mt-5 text-base leading-relaxed text-[#4A5568] md:text-[17px]">
              A 90 second walkthrough of the 30 minute IDR process collapsed to under 5.
            </p>
            <Link
              className="mt-8 inline-flex min-h-12 items-center justify-center rounded-md bg-[#1A2B48] px-8 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-90"
              href="/demo"
            >
              Schedule a demo
            </Link>
          </div>

          <section aria-labelledby="heading-manual" className="mx-auto mt-16 max-w-3xl">
            <h2 className="text-xl font-semibold text-[#1A2B48]" id="heading-manual">
              The manual process today
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-[#4A5568]">
              A billing operator handles each step by hand. 25 to 40 minutes per claim.
              Cuts get missed. Codes get batched.
            </p>
            <ol className="mt-6 list-decimal space-y-2 pl-5 text-[15px] text-[#4A5568]">
              {manualSteps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </section>

          <section aria-labelledby="heading-sydra" className="mx-auto mt-16 max-w-3xl">
            <h2 className="text-xl font-semibold text-[#1A2B48]" id="heading-sydra">
              The Sydra process
            </h2>
            <ol className="mt-8 space-y-8">
              {sydraSteps.map((step, index) => (
                <li key={step.title} className="border-l-2 border-blue-200 pl-6">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-blue-700">
                    Step {index + 1}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold text-[#1A2B48]">{step.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-[#4A5568]">{step.body}</p>
                </li>
              ))}
            </ol>
          </section>

          <aside className="mx-auto mt-16 max-w-3xl rounded-xl border border-blue-200 bg-blue-50/40 p-6 md:p-8">
            <h2 className="text-lg font-semibold text-[#1A2B48]">
              Where Kronos Support plugs in
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-[#4A5568]">
              On Sydra + Kronos Support, a specialist is one click away on disputed
              claims, edge case CPTs, and your monthly account review. Your team still
              owns the workflow.
            </p>
          </aside>

          <section aria-labelledby="heading-integrations" className="mx-auto mt-16 max-w-3xl">
            <h2 className="text-xl font-semibold text-[#1A2B48]" id="heading-integrations">
              EMR and integration
            </h2>
            <ul className="mt-6 space-y-3 text-[15px] leading-relaxed text-[#4A5568]">
              <li>ModMed supported today. More EMRs on the roadmap.</li>
              <li>Works with whatever your team copy pastes EOBs from today.</li>
              <li>API and SFTP options for high volume practices.</li>
              <li>Single sign on, BAA backed data flows, HIPAA compliant infrastructure.</li>
            </ul>
          </section>

          <div className="mx-auto mt-16 max-w-3xl text-center">
            <Link
              className="inline-flex min-h-12 items-center justify-center rounded-md bg-[#1A2B48] px-8 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-90"
              href="/demo"
            >
              Schedule a demo
            </Link>
          </div>
        </main>
        <KronosRevenueBanner />
        <SydraFooter />
      </div>
    </div>
  );
}

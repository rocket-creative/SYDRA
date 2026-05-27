import Link from "next/link";

import { BreadcrumbJsonLd } from "@/components/sydra/breadcrumb-json-ld";
import { ClinicalReferences, MedicalReviewBlock } from "@/components/sydra/clinical-trust";
import { CtaTrustSignals } from "@/components/sydra/cta-trust-signals";
import { KronosRevenueBanner } from "@/components/sydra/kronos-revenue-banner";
import { PageJsonLd } from "@/components/sydra/page-json-ld";
import { BREADCRUMBS, SydraPageShell } from "@/components/sydra/page-shell";
import { ReviewHighlight } from "@/components/sydra/review-highlight";
import { ServiceCrossLinks } from "@/components/sydra/service-cross-links";
import { ServiceFaqSection } from "@/components/sydra/service-faq-section";
import { HOW_IT_WORKS_FAQ } from "@/lib/content/service-faqs";
import { faqPageJsonLd, serviceJsonLd, webPageJsonLd } from "@/lib/seo/json-ld";
import { PAGE_METADATA } from "@/lib/seo/metadata";

export const metadata = PAGE_METADATA.howItWorks;

function pageTitle(): string {
  const meta = PAGE_METADATA.howItWorks;
  if (meta.title && typeof meta.title === "object" && "absolute" in meta.title) {
    return String(meta.title.absolute);
  }
  return "How Sydra Works";
}

function HowItWorksJsonLd() {
  return (
    <>
      <BreadcrumbJsonLd items={[...BREADCRUMBS.howItWorks]} />
      <PageJsonLd
        data={[
          webPageJsonLd({
            path: "/how-it-works",
            name: pageTitle(),
            description: PAGE_METADATA.howItWorks.description ?? "",
          }),
          serviceJsonLd({
            name: "Sydra NSA IDR Workflow",
            description:
              "Upload an EOB, draft a specialty coded IDR in under 5 minutes, and submit with your billing team in control.",
            serviceType: "Healthcare billing software",
          }),
          faqPageJsonLd(HOW_IT_WORKS_FAQ),
        ]}
      />
    </>
  );
}

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
    <>
      <HowItWorksJsonLd />
      <SydraPageShell
        breadcrumb={[...BREADCRUMBS.howItWorks]}
        footerExtra={<KronosRevenueBanner />}
      >
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[rgb(0,40,184)]">
            How it works
          </p>
          <h1 className="mt-4 text-[1.75rem] font-semibold tracking-tight text-[#1A2B48] sm:text-3xl md:text-[2.25rem]">
            <ReviewHighlight>How does Sydra handle a real claim end to end?</ReviewHighlight>
          </h1>
          <p className="mt-5 text-base leading-relaxed text-[#4A5568] md:text-[17px]">
            A 90 second walkthrough of the 30 minute IDR process collapsed to under 5.
          </p>
          <Link
            className="mt-8 inline-flex min-h-12 items-center justify-center rounded-md bg-[#1A2B48] px-8 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            href="/demo"
          >
            Schedule a demo
          </Link>
          <CtaTrustSignals className="mt-4" />
        </div>

        <MedicalReviewBlock />

        <section aria-labelledby="heading-manual" className="mx-auto mt-16 max-w-3xl">
          <h2 className="text-xl font-semibold text-[#1A2B48]" id="heading-manual">
            <ReviewHighlight>What does the manual IDR process look like today?</ReviewHighlight>
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
            <ReviewHighlight>How does the Sydra process work?</ReviewHighlight>
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
            Where does Kronos Support plug in?
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-[#4A5568]">
            On Sydra plus Kronos Support, a specialist is one click away on disputed
            claims, edge case CPTs, and your monthly account review. Your team still
            owns the workflow.
          </p>
        </aside>

        <section aria-labelledby="heading-integrations" className="mx-auto mt-16 max-w-3xl">
          <h2 className="text-xl font-semibold text-[#1A2B48]" id="heading-integrations">
            <ReviewHighlight>Which EMR and integration options does Sydra support?</ReviewHighlight>
          </h2>
          <ul className="mt-6 space-y-3 text-[15px] leading-relaxed text-[#4A5568]">
            <li>ModMed supported today. More EMRs on the roadmap.</li>
            <li>Works with whatever your team copy pastes EOBs from today.</li>
            <li>API and SFTP options for high volume practices.</li>
            <li>Single sign on, BAA backed data flows, HIPAA compliant infrastructure.</li>
          </ul>
        </section>

        <ServiceFaqSection
          heading="What do billing teams ask about the Sydra workflow?"
          id="heading-how-faq"
          items={HOW_IT_WORKS_FAQ}
        />

        <ClinicalReferences />

        <div className="mx-auto mt-16 max-w-3xl text-center">
          <Link
            className="inline-flex min-h-12 items-center justify-center rounded-md bg-[#1A2B48] px-8 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            href="/demo"
          >
            Schedule a demo
          </Link>
          <CtaTrustSignals className="mt-4" />
        </div>

        <ServiceCrossLinks current="/how-it-works" />
      </SydraPageShell>
    </>
  );
}

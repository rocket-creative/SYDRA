import { Suspense } from "react";

import { BreadcrumbJsonLd } from "@/components/sydra/breadcrumb-json-ld";
import { CtaTrustSignals } from "@/components/sydra/cta-trust-signals";
import { DemoFunnelForm } from "@/components/sydra/demo-funnel-form";
import { PageJsonLd } from "@/components/sydra/page-json-ld";
import { BREADCRUMBS, SydraPageShell } from "@/components/sydra/page-shell";
import { SourcesReferences } from "@/components/sydra/sources-references";
import { getSalesEmail } from "@/lib/contact";
import { kronosCaseReviewUrl } from "@/lib/kronos-revenue";
import { webPageJsonLd } from "@/lib/seo/json-ld";
import { PAGE_METADATA } from "@/lib/seo/metadata";

export const metadata = PAGE_METADATA.demo;

function pageTitle(): string {
  const meta = PAGE_METADATA.demo;
  if (meta.title && typeof meta.title === "object" && "absolute" in meta.title) {
    return String(meta.title.absolute);
  }
  return "Schedule a Sydra Demo";
}

function DemoPageJsonLd() {
  return (
    <>
      <BreadcrumbJsonLd items={[...BREADCRUMBS.demo]} />
      <PageJsonLd
        data={[
          webPageJsonLd({
            path: "/demo",
            name: pageTitle(),
            description: PAGE_METADATA.demo.description ?? "",
          }),
        ]}
      />
    </>
  );
}

const callSteps = [
  "EOB uploaded to Sydra. Eligibility check runs.",
  "Sydra generates the IDR draft: executive summary, market rate justification from prior determinations, clinical narrative from the operative note, provider credentials.",
  "Draft reviewed. We walk through each section: what Sydra wrote, where each element came from, what a billing team would verify or edit.",
  "DOCX export. You see the final submission ready document and the guided IDRE portal checklist.",
] as const;

const preBookingFaq = [
  {
    q: "Do I have to buy anything to get the demo?",
    a: "No. Free with no commitment.",
  },
  {
    q: "Should my billing team attend?",
    a: "Yes, ideally. The demo is most useful when the billing lead who would operate the software is on the call. We can accommodate up to three attendees.",
  },
  {
    q: "Can I see Sydra on a claim type my practice actually files?",
    a: "Yes. Send us an EOB before the call. We run the demo on your actual CPT code in your state.",
  },
  {
    q: "What if I just want pricing without a demo?",
    a: `Email ${getSalesEmail()} with your specialty and estimated monthly OON volume. We will send a pricing range.`,
  },
  {
    q: "How long does setup take after we decide to proceed?",
    a: "Most practices are operational within one week of signing the BAA. See the full onboarding timeline at /faq.",
  },
] as const;

export default function DemoPage() {
  return (
    <>
      <DemoPageJsonLd />
      <SydraPageShell
        breadcrumb={[...BREADCRUMBS.demo]}
        headerVariant="funnel"
        mainClassName="px-4 py-10 sm:px-6 md:py-14 xl:px-8"
      >
        <div className="mx-auto max-w-6xl">
          <div className="lg:grid lg:grid-cols-12 lg:items-start lg:gap-12">
            <div className="lg:col-span-6">
              <h1 className="text-[1.75rem] font-semibold leading-snug tracking-tight text-[#1A2B48] sm:text-3xl md:text-[2.25rem]">
                See Sydra prepare a real NSA IDR submission.
                <span className="mt-2 block text-xl font-medium text-[#4A5568] md:text-2xl">
                  15 minutes. Your specialty. Your actual CPT codes if you send one.
                </span>
              </h1>

              <section aria-labelledby="heading-call" className="mt-10">
                <h2 className="text-lg font-semibold text-[#1A2B48]" id="heading-call">
                  What happens on the call
                </h2>
                <p className="mt-3 text-[15px] leading-relaxed text-[#4A5568]">
                  This is not a slide deck. A Kronos specialist opens Sydra in a shared screen and
                  runs a real denied claim from your specialty through the full workflow.
                </p>
                <ol className="mt-6 list-decimal space-y-3 pl-5 text-[15px] leading-relaxed text-[#4A5568]">
                  {callSteps.map((step) => (
                    <li key={step.slice(0, 40)}>{step}</li>
                  ))}
                </ol>
                <p className="mt-6 text-[15px] leading-relaxed text-[#4A5568]">
                  Total: under 5 minutes for the claim, 10 minutes for the walkthrough and
                  questions. You leave with the actual Sydra output, a pricing quote, and a
                  sandbox account if you want one. No pressure to sign anything on the call.
                </p>
              </section>

              <section aria-labelledby="heading-preview" className="mt-10">
                <h2 className="text-lg font-semibold text-[#1A2B48]" id="heading-preview">
                  Product preview
                </h2>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  {[1, 2, 3, 4].map((n) => (
                    <div
                      key={n}
                      className="flex aspect-video items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-xs text-slate-500"
                    >
                      Screenshot {n}
                    </div>
                  ))}
                </div>
                <p className="mt-3 text-xs text-slate-500">
                  Actual Sydra screenshots from a spine surgery claim. Not a mockup.
                </p>
              </section>

              <section aria-labelledby="heading-pre-faq" className="mt-10">
                <h2 className="text-lg font-semibold text-[#1A2B48]" id="heading-pre-faq">
                  Before you book
                </h2>
                <div className="mt-4 space-y-3">
                  {preBookingFaq.map((item) => (
                    <details
                      key={item.q}
                      className="rounded-lg border border-slate-200 bg-white px-4 py-1"
                    >
                      <summary className="cursor-pointer py-3 text-sm font-semibold text-[#1A2B48]">
                        {item.q}
                      </summary>
                      <p className="border-t border-slate-100 pb-3 pt-2 text-sm text-[#4A5568]">
                        {item.a}
                      </p>
                    </details>
                  ))}
                </div>
              </section>

              <CtaTrustSignals className="mt-8" />
            </div>

            <div className="mt-10 lg:col-span-6 lg:mt-0">
              <h2 className="text-lg font-semibold text-[#1A2B48]">
                Schedule your 15 minute demo.
              </h2>
              <p className="mt-2 text-sm text-[#4A5568]">
                Send us an EOB before the call and we will run the demo on your actual claim.
              </p>
              <div className="mt-6">
                <Suspense fallback={<div className="h-96 animate-pulse rounded-xl bg-slate-100" />}>
                  <DemoFunnelForm />
                </Suspense>
              </div>
              <p className="mt-4 text-center text-sm">
                <a
                  className="font-medium text-[rgb(0,40,184)] underline"
                  href={kronosCaseReviewUrl()}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Not ready for software? Get a free IDR review →
                </a>
              </p>
            </div>
          </div>

          <SourcesReferences className="mt-16" />
        </div>
      </SydraPageShell>
    </>
  );
}

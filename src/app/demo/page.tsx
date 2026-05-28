import { Suspense } from "react";

import { BreadcrumbJsonLd } from "@/components/sydra/breadcrumb-json-ld";
import { CtaTrustSignals } from "@/components/sydra/cta-trust-signals";
import { DemoFunnelForm } from "@/components/sydra/demo-funnel-form";
import { PageJsonLd } from "@/components/sydra/page-json-ld";
import { BREADCRUMBS, SydraPageShell } from "@/components/sydra/page-shell";
import { SourcesReferences } from "@/components/sydra/sources-references";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { CtaLink } from "@/components/ui/cta-link";
import { getSalesEmail } from "@/lib/contact";
import { kronosCaseReviewUrl } from "@/lib/kronos-revenue";
import { webPageJsonLd } from "@/lib/seo/json-ld";
import { PAGE_METADATA } from "@/lib/seo/metadata";
import { textStyles } from "@/lib/typography";

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
    a: `Email ${getSalesEmail()} with your specialty and estimated monthly OON volume. We'll send a pricing range.`,
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
        headerVariant="default"
        mainClassName="px-6 py-10 md:px-10 md:py-14"
      >
        <div className="lg:grid lg:grid-cols-12 lg:items-start lg:gap-12">
          <div className="lg:col-span-6">
            <header>
              <h1 className={textStyles.pageTitle}>
                See Sydra prepare a real NSA IDR submission.
                <span className={textStyles.pageSubtitle}>
                  15 minutes. Your specialty. Your actual CPT codes if you send one.
                </span>
              </h1>
            </header>

            <section aria-labelledby="heading-call" className="mt-10 prose-measure">
              <h2 className={textStyles.subsectionTitle} id="heading-call">
                What happens on the call
              </h2>
              <p className={`${textStyles.body} mt-3`}>
                This isn&apos;t a slide deck. A Kronos specialist opens Sydra in a shared screen
                and runs a real denied claim from your specialty through the full workflow.
              </p>
              <ol className={textStyles.list}>
                {callSteps.map((step) => (
                  <li key={step.slice(0, 40)}>{step}</li>
                ))}
              </ol>
              <p className={`${textStyles.body} mt-6`}>
                Total: under 5 minutes for the claim, 10 minutes for the walkthrough and questions.
                You leave with the actual Sydra output, a pricing quote, and a sandbox account if
                you want one. No pressure to sign anything on the call.
              </p>
            </section>

            <section aria-labelledby="heading-preview" className="mt-10 prose-measure">
              <h2 className={textStyles.subsectionTitle} id="heading-preview">
                Product preview
              </h2>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {[1, 2, 3, 4].map((n) => (
                  <ImagePlaceholder key={n} aspect="16/9" />
                ))}
              </div>
              <p className={`${textStyles.meta} mt-3`}>
                Product screenshots placeholder. Live demo uses your claim data.
              </p>
            </section>

            <section aria-labelledby="heading-pre-faq" className="mt-10 prose-measure">
              <h2 className={textStyles.subsectionTitle} id="heading-pre-faq">
                Before you book
              </h2>
              <div className="mt-4 divide-y divide-[var(--color-rule)] border-y border-rule">
                {preBookingFaq.map((item) => (
                  <details key={item.q} className="group py-0">
                    <summary className="cursor-pointer list-none py-4 text-sm font-normal text-brand [&::-webkit-details-marker]:hidden">
                      {item.q}
                    </summary>
                    <p className={`${textStyles.body} border-t border-rule pb-4 pt-2 text-sm`}>
                      {item.a}
                    </p>
                  </details>
                ))}
              </div>
            </section>

            <CtaTrustSignals className="mt-8" />
          </div>

          <div className="mt-10 lg:col-span-6 lg:mt-0">
            <h2 className={textStyles.subsectionTitle}>Schedule your 15 minute demo.</h2>
            <p className={`${textStyles.body} mt-2`}>
              Send us an EOB before the call and we&apos;ll run the demo on your actual claim.
            </p>
            <div className="mt-6">
              <Suspense fallback={<div className="h-96 animate-pulse bg-surface-muted" />}>
                <DemoFunnelForm />
              </Suspense>
            </div>
            <p className="prose-measure mt-4">
              <CtaLink href={kronosCaseReviewUrl()} rel="noopener noreferrer" target="_blank">
                Not ready for software? Get a free IDR review
              </CtaLink>
            </p>
          </div>
        </div>

        <SourcesReferences className="mt-16" />
      </SydraPageShell>
    </>
  );
}

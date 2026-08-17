import { Suspense } from "react";

import { DemoPageLeadForm } from "@/components/landing/demo-page-lead-form";
import { BreadcrumbJsonLd } from "@/components/sydra/breadcrumb-json-ld";
import { CtaTrustSignals } from "@/components/sydra/cta-trust-signals";
import { PageJsonLd } from "@/components/sydra/page-json-ld";
import { BREADCRUMBS, SydraPageShell } from "@/components/sydra/page-shell";
import { SourcesReferences } from "@/components/sydra/sources-references";
import { StickyConversionBar } from "@/components/sydra/sticky-conversion-bar";
import { PRODUCT_SCREENS } from "@/components/sydra/product-screens";
import { Section } from "@/components/ui/section";
import { CtaLink } from "@/components/ui/cta-link";
import { getSalesEmail } from "@/lib/contact";
import { caseReviewUrl } from "@/lib/case-review";
import { faqPageJsonLd, webPageJsonLd } from "@/lib/seo/json-ld";
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
          faqPageJsonLd(preBookingFaq.map(({ q, a }) => ({ q, a }))),
        ]}
      />
    </>
  );
}

const callSteps = [
  "We enter your denied claim live and run the eligibility check while you watch.",
  "Sydra drafts the complete IDR submission packet in real time, in front of you: executive summary, market rate justification from prior determinations, clinical narrative from the operative note, provider credentials.",
  "We read through each section together: what Sydra wrote, where every element came from, what a billing team would verify or edit.",
  "DOCX export. You see the finished submission ready packet and the guided IDRE portal checklist, generated start to finish on the call.",
] as const;

const preBookingFaq = [
  {
    q: "What does the demo cost and what am I committing to?",
    a: "Nothing and nothing. The demo is free, there is no contract, no setup fee, and nothing installs in your EMR. We walk one real claim from your specialty and tell you whether IDR fits your practice. If it does not, we say so on the call.",
  },
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
        banded
        breadcrumb={[...BREADCRUMBS.demo]}
        hasMobileCtaBar
        headerVariant="default"
      >
        <Section tone="white">
          <header className="prose-measure">
            <h1 className={textStyles.pageTitle} id="heading-demo">
              See Sydra prepare a real NSA IDR submission.
              <span className={textStyles.pageSubtitle}>
                15 minutes. Your specialty. Your actual CPT codes if you send one.
              </span>
            </h1>
          </header>

          <div className="mt-10 flex flex-col lg:grid lg:grid-cols-12 lg:items-start lg:gap-12">
            <div className="order-2 lg:order-1 lg:col-span-6">
              <section aria-labelledby="heading-call" className="prose-measure">
                <h2 className={textStyles.subsectionTitle} id="heading-call">
                  What happens on the call
                </h2>
                <p className={`${textStyles.body} mt-3`}>
                  This isn&apos;t a slide deck. On a live call, a Sydra specialist enters a real
                  denied claim from your specialty and Sydra builds the complete IDR submission
                  packet in real time while you watch, start to finish.
                </p>
                <ol className={textStyles.list}>
                  {callSteps.map((step) => (
                    <li key={step.slice(0, 40)}>{step}</li>
                  ))}
                </ol>
                <p className={`${textStyles.body} mt-6`}>
                  Under 5 minutes on your claim, 10 minutes on the walkthrough — 15 minutes
                  total. You watch the packet get built before any pricing comes up. You leave
                  with the actual Sydra output, a pricing quote, and a sandbox account if you want
                  one. No pressure to sign anything on the call.
                </p>
              </section>

              <section aria-labelledby="heading-preview" className="mt-10 prose-measure">
                <h2 className={textStyles.subsectionTitle} id="heading-preview">
                  Product preview
                </h2>
                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {PRODUCT_SCREENS.map((Screen) => (
                    <Screen key={Screen.name} />
                  ))}
                </div>
                <p className={`${textStyles.meta} mt-3`}>
                  Representative product UI. Live demo runs on your actual claim data.
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

            <div className="order-1 lg:order-2 lg:col-span-6">
              <Suspense fallback={<div className="h-96 animate-pulse bg-surface-muted" />}>
                <DemoPageLeadForm />
              </Suspense>
              <p className="prose-measure mt-4">
                <CtaLink href={caseReviewUrl()}>
                  Not ready for software? Get a free claim review
                </CtaLink>
              </p>
            </div>
          </div>
        </Section>

        <Section tone="neutral">
          <SourcesReferences />
        </Section>
      </SydraPageShell>
      <StickyConversionBar primaryLabel="Schedule demo" scrollTargetId="demo-form" />
    </>
  );
}

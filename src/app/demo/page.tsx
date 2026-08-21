import { Suspense } from "react";

import { SharedLeadForm } from "@/components/landing/shared-lead-form";
import { BreadcrumbJsonLd } from "@/components/sydra/breadcrumb-json-ld";
import { CtaTrustSignals } from "@/components/sydra/cta-trust-signals";
import { PageJsonLd } from "@/components/sydra/page-json-ld";
import { BREADCRUMBS, SydraPageShell } from "@/components/sydra/page-shell";
import { SourcesReferences } from "@/components/sydra/sources-references";
import { StickyConversionBar } from "@/components/sydra/sticky-conversion-bar";
import { PRODUCT_SCREENS } from "@/components/sydra/product-screens";
import { Section } from "@/components/ui/section";
import { CtaLink } from "@/components/ui/cta-link";
import { EditorialImage } from "@/components/ui/editorial-image";
import { getSalesEmail } from "@/lib/contact";
import { caseReviewUrl } from "@/lib/case-review";
import { DEMO_RISK_REVERSAL } from "@/lib/content/founder-lines";
import { EDITORIAL } from "@/lib/images";
import { faqPageJsonLd, webPageJsonLd } from "@/lib/seo/json-ld";
import { PAGE_METADATA } from "@/lib/seo/metadata";
import { textStyles } from "@/lib/typography";

export const metadata = PAGE_METADATA.demo;

function pageTitle(): string {
  const meta = PAGE_METADATA.demo;
  if (meta.title && typeof meta.title === "object" && "absolute" in meta.title) {
    return String(meta.title.absolute);
  }
  return "Set Up a 15-minute Call with Sydra";
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
    q: "What does the call cost and what am I committing to?",
    a: "Nothing and nothing. The call is free, there is no contract, no setup fee, and nothing installs in your EMR. We walk one real claim from your specialty and tell you whether IDR fits your practice. If it does not, we say so on the call.",
  },
  {
    q: "Do I have to buy anything to get the call?",
    a: "No. Free with no commitment.",
  },
  {
    q: "Do I have to run software after this?",
    a: "No. Two arrangements come out of the call. Your team can run Sydra and file in house, or we can identify the qualifying claims, assemble the submissions, and hold every deadline for you. We recommend one based on what your team has bandwidth for, and neither changes how you practice or bill.",
  },
  {
    q: "Who should be on the call?",
    a: "Whoever decides. If your billing lead would run the filings, they get the most out of it. If you would rather hand the work over entirely, you alone is enough. We can accommodate up to three attendees.",
  },
  {
    q: "Can I see Sydra on a claim type my practice actually files?",
    a: "Yes. Send us an EOB before the call and we run it on your actual CPT code in your state.",
  },
  {
    q: "What if I just want pricing without a call?",
    a: `Email ${getSalesEmail()} with your specialty and estimated monthly OON volume. We'll send a pricing range. Pricing is per claim or subscription, never a percentage of your recovery.`,
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
              Book a demo
              <span className={textStyles.pageSubtitle}>
                Bring one denied claim. We&apos;ll tell you what federal IDR would do with it.
              </span>
            </h1>
            <p className={textStyles.pageLead}>
              A payer&apos;s out of network payment is an opening offer, not the amount owed. Fifteen
              minutes is enough to find out whether one of your claims is worth contesting, who
              should file it, and what that costs.
            </p>
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

              <EditorialImage
                aspect="1/1"
                asset={EDITORIAL.surgeonLaptopReview}
                className="mt-10"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />

              {/* Decorative UI mocks render 8-10px labels; illegible on a phone, so md and up only. */}
              <section aria-labelledby="heading-preview" className="mt-10 hidden prose-measure md:block">
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
                      <summary className="cursor-pointer list-none py-6 text-base font-normal text-brand [&::-webkit-details-marker]:hidden">
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
              <p className="prose-measure mb-6 type-body text-body">{DEMO_RISK_REVERSAL}</p>
              <Suspense fallback={<div className="h-96 animate-pulse bg-surface-muted" />}>
                <SharedLeadForm anchorId="demo-form" intent="demo" landingPage="demo" />
              </Suspense>
              <p className="prose-measure mt-4">
                <CtaLink href={caseReviewUrl()}>
                  Not ready to talk? Send one denied claim for a free review
                </CtaLink>
              </p>
            </div>
          </div>
        </Section>

        <Section tone="neutral">
          <SourcesReferences />
        </Section>
      </SydraPageShell>
      <StickyConversionBar scrollTargetId="demo-form" />
    </>
  );
}

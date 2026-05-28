import Link from "next/link";

import { PricingTiers } from "@/components/sydra/pricing-tiers";
import { PricingPageJsonLd } from "@/components/sydra/pricing-json-ld";
import { CtaTrustSignals } from "@/components/sydra/cta-trust-signals";
import { ServiceCrossLinks } from "@/components/sydra/service-cross-links";
import { ServiceFaqSection } from "@/components/sydra/service-faq-section";
import { SourcesReferences } from "@/components/sydra/sources-references";
import { BREADCRUMBS, SydraPageShell } from "@/components/sydra/page-shell";
import { PRICING_FAQ } from "@/lib/content/service-faqs";
import { kronosCaseReviewUrl } from "@/lib/kronos-revenue";
import { PAGE_METADATA } from "@/lib/seo/metadata";

export const metadata = PAGE_METADATA.pricing;

export default function PricingPage() {
  return (
    <>
      <PricingPageJsonLd />
      <SydraPageShell breadcrumb={[...BREADCRUMBS.pricing]}>
        <header className="mx-auto max-w-3xl text-center">
          <h1 className="text-3xl font-semibold tracking-tight text-[#1A2B48] md:text-4xl">
            Sydra pricing.
            <span className="mt-2 block text-2xl font-medium text-[#4A5568] md:text-3xl">
              Quoted to your volume. Not a percentage of every recovery.
            </span>
          </h1>
          <p className="mt-6 text-base leading-relaxed text-[#4A5568] md:text-lg">
            We don&apos;t publish a list price because the right number depends on your specialty,
            state, and monthly out of network claim volume. Every tier is structured below the
            typical 20% attorney contingency fee. You keep more of every recovery.
          </p>
          <p className="mt-4 text-base leading-relaxed text-[#4A5568]">
            Schedule a 15 minute demo and we quote on the call. No commitment to proceed.
          </p>
        </header>

        <section aria-labelledby="heading-comparison" className="mx-auto mt-14 max-w-3xl">
          <h2
            className="text-xl font-semibold text-[#1A2B48] md:text-2xl"
            id="heading-comparison"
          >
            The comparison that matters.
          </h2>
          <div className="mt-6 space-y-6 text-[15px] leading-relaxed text-[#4A5568] md:text-base">
            <div>
              <h3 className="font-semibold text-[#1A2B48]">If you use a contingency attorney</h3>
              <p className="mt-2">
                20% of every IDR recovery, indefinitely. On $300,000 in annual IDR recoveries:
                $60,000 in attorney fees annually. Plus: disputes lost from batched CPT filings
                never appear in the recovery total. A practice winning 60% of disputes at 20%
                contingency recovers 60% x 80% = 48% of its IDR potential.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-[#1A2B48]">If you&apos;re not filing IDR</h3>
              <p className="mt-2">
                Zero attorney fees. Zero IDR recovery. The gap between the insurer&apos;s initial
                payment and what IDR would award stays with the insurer.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-[#1A2B48]">What Sydra changes</h3>
              <p className="mt-2">
                Your billing team runs IDR in house. Platform fee quoted to your volume.
                Structured below typical 20% contingency. You keep more per dollar won.
              </p>
            </div>
          </div>
        </section>

        <PricingTiers variant="full" />

        <section aria-labelledby="heading-demo-process" className="mx-auto mt-16 max-w-3xl">
          <h2
            className="text-xl font-semibold text-[#1A2B48] md:text-2xl"
            id="heading-demo-process"
          >
            What happens on the demo.
          </h2>
          <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-[#4A5568] md:text-base">
            <p>
              15 minutes on a real denied claim from your specialty. We walk through Sydra live:
              EOB upload, eligibility check, draft generation, DOCX export. You see the output
              before we discuss any numbers.
            </p>
            <p>
              Then: we ask about your specialty, monthly OON volume, and current IDR arrangement.
              We quote a fee for your specific situation. You leave with the quote, a sandbox
              account if you want one, and no obligation.
            </p>
            <p>
              If your practice volume is low enough that the platform economics don&apos;t work, we
              tell you and direct you to Kronos Revenue Full Service as a better fit.
            </p>
          </div>
        </section>

        <ServiceFaqSection
          heading="Pricing FAQ"
          id="heading-pricing-faq"
          items={PRICING_FAQ}
        />

        <div className="mx-auto mt-12 max-w-3xl text-center">
          <Link
            className="inline-flex min-h-12 items-center justify-center rounded-md bg-[#1A2B48] px-8 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            href="/demo"
          >
            Schedule my demo
          </Link>
          <p className="mt-4">
            <a
              className="text-sm font-medium text-[rgb(0,40,184)] underline decoration-blue-200 underline-offset-4 hover:decoration-[rgb(0,40,184)]"
              href={kronosCaseReviewUrl()}
              rel="noopener noreferrer"
              target="_blank"
            >
              Not ready to run software? Get a free IDR review at Kronos Revenue
            </a>
          </p>
          <CtaTrustSignals className="mt-4" />
        </div>

        <ServiceCrossLinks current="/pricing" />
        <SourcesReferences className="mt-12" />
      </SydraPageShell>
    </>
  );
}

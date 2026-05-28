import { Button } from "@/components/ui/button";
import { CtaLink } from "@/components/ui/cta-link";
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
        <header className="max-w-2xl">
          <h1 className="type-h1 text-brand">
            Sydra pricing.
            <span className="mt-4 block type-h2 text-body">
              Quoted to your volume. Not a percentage of every recovery.
            </span>
          </h1>
          <p className="mt-6 type-body text-body">
            We don&apos;t publish a list price because the right number depends on your specialty,
            state, and monthly out of network claim volume. Every tier is structured below the
            typical 20% attorney contingency fee. You keep more of every recovery.
          </p>
          <p className="mt-4 type-body text-body">
            Schedule a 15 minute demo and we quote on the call. No commitment to proceed.
          </p>
        </header>

        <section aria-labelledby="heading-comparison" className="mt-14 max-w-2xl">
          <h2 className="type-h2 text-brand" id="heading-comparison">
            The comparison that matters.
          </h2>
          <div className="mt-6 space-y-6 type-body text-body">
            <div>
              <h3 className="font-medium text-brand">If you use a contingency attorney</h3>
              <p className="mt-2">
                20% of every IDR recovery, indefinitely. On $300,000 in annual IDR recoveries:
                $60,000 in attorney fees annually. Plus: disputes lost from batched CPT filings
                never appear in the recovery total. A practice winning 60% of disputes at 20%
                contingency recovers 60% x 80% = 48% of its IDR potential.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-brand">If you&apos;re not filing IDR</h3>
              <p className="mt-2">
                Zero attorney fees. Zero IDR recovery. The gap between the insurer&apos;s initial
                payment and what IDR would award stays with the insurer.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-brand">What Sydra changes</h3>
              <p className="mt-2">
                Your billing team runs IDR in house. Platform fee quoted to your volume.
                Structured below typical 20% contingency. You keep more per dollar won.
              </p>
            </div>
          </div>
        </section>

        <PricingTiers variant="full" />

        <section aria-labelledby="heading-demo-process" className="mt-16 max-w-2xl">
          <h2 className="type-h2 text-brand" id="heading-demo-process">
            What happens on the demo.
          </h2>
          <div className="mt-6 space-y-4 type-body text-body">
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

        <ServiceFaqSection heading="Pricing FAQ" id="heading-pricing-faq" items={PRICING_FAQ} />

        <div className="mt-12 max-w-xl">
          <Button href="/demo" showArrow>
            Schedule my demo
          </Button>
          <p className="mt-6">
            <CtaLink href={kronosCaseReviewUrl()} rel="noopener noreferrer" target="_blank">
              Not ready to run software? Get a free IDR review at Kronos Revenue
            </CtaLink>
          </p>
          <CtaTrustSignals className="mt-6" />
        </div>

        <ServiceCrossLinks current="/pricing" />
        <SourcesReferences className="mt-12" />
      </SydraPageShell>
    </>
  );
}

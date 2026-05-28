import { Button } from "@/components/ui/button";
import { PricingTiers } from "@/components/sydra/pricing-tiers";
import { PricingPageJsonLd } from "@/components/sydra/pricing-json-ld";
import { CtaTrustSignals } from "@/components/sydra/cta-trust-signals";
import { ServiceCrossLinks } from "@/components/sydra/service-cross-links";
import { ServiceFaqSection } from "@/components/sydra/service-faq-section";
import { BREADCRUMBS, SydraPageShell } from "@/components/sydra/page-shell";
import { PLANS_FAQ } from "@/lib/content/service-faqs";
import { PAGE_METADATA } from "@/lib/seo/metadata";

export const metadata = PAGE_METADATA.pricing;

export default function PlansPage() {
  return (
    <>
      <PricingPageJsonLd />
      <SydraPageShell breadcrumb={[...BREADCRUMBS.pricing]}>
        <PricingTiers variant="full" />
        <ServiceFaqSection
          heading="What do practices ask about Sydra plans?"
          id="heading-plans-faq"
          items={PLANS_FAQ}
        />
        <div className="prose-measure mt-12">
          <Button href="/demo" showArrow>
            Schedule a demo
          </Button>
          <CtaTrustSignals className="mt-4" />
        </div>
        <ServiceCrossLinks current="/pricing" />
      </SydraPageShell>
    </>
  );
}

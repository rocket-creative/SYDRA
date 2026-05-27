import Link from "next/link";

import { PricingTiers } from "@/components/sydra/pricing-tiers";
import { PricingPageJsonLd } from "@/components/sydra/pricing-json-ld";
import { CtaTrustSignals } from "@/components/sydra/cta-trust-signals";
import { ServiceCrossLinks } from "@/components/sydra/service-cross-links";
import { ServiceFaqSection } from "@/components/sydra/service-faq-section";
import { BREADCRUMBS, SydraPageShell } from "@/components/sydra/page-shell";
import { PLANS_FAQ } from "@/lib/content/service-faqs";
import { PAGE_METADATA } from "@/lib/seo/metadata";

export const metadata = PAGE_METADATA.plans;

export default function PlansPage() {
  return (
    <>
      <PricingPageJsonLd />
      <SydraPageShell breadcrumb={[...BREADCRUMBS.plans]}>
        <PricingTiers variant="full" />
        <ServiceFaqSection
          heading="What do practices ask about Sydra plans?"
          id="heading-plans-faq"
          items={PLANS_FAQ}
        />
        <div className="mx-auto mt-12 max-w-3xl text-center">
          <Link
            className="inline-flex min-h-12 items-center justify-center rounded-md bg-[#1A2B48] px-8 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            href="/demo"
          >
            Schedule a demo
          </Link>
          <CtaTrustSignals className="mt-4" />
        </div>
        <ServiceCrossLinks current="/plans" />
      </SydraPageShell>
    </>
  );
}

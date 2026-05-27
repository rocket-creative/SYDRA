import type { Metadata } from "next";

import { PricingTiers } from "@/components/sydra/pricing-tiers";
import { PricingPageJsonLd } from "@/components/sydra/pricing-json-ld";
import { SydraFooter } from "@/components/sydra/footer";
import { SydraHeader } from "@/components/sydra/header";
import { siteUrl } from "@/lib/site";

const description =
  "Sydra Self-Serve, Sydra + Kronos Support, and Kronos Full-Service compared. No published pricing. Schedule a demo to find your fit.";

export const metadata: Metadata = {
  title: "Plans",
  description,
  alternates: { canonical: `${siteUrl()}/plans` },
  openGraph: {
    title: "Plans · Sydra",
    description,
    url: `${siteUrl()}/plans`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Plans · Sydra",
    description,
  },
};

export default function PlansPage() {
  return (
    <div className="min-h-screen bg-stone-100 font-sans text-slate-900">
      <PricingPageJsonLd />
      <div className="mx-auto min-h-screen max-w-6xl bg-white shadow-sm xl:max-w-[1200px]">
        <SydraHeader />
        <main className="px-4 py-14 sm:px-6 md:py-20 xl:px-8">
          <PricingTiers variant="full" />
        </main>
        <SydraFooter />
      </div>
    </div>
  );
}

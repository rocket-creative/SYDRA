import { Suspense } from "react";

import { Cursor } from "@/components/motion/cursor";
import { SplitHeadline } from "@/components/motion/split-headline";
import { LeadForm } from "@/components/landing/lead-form";
import { MobileCtaBar } from "@/components/landing/mobile-cta-bar";
import { TrackingProvider } from "@/components/landing/tracking-provider";
import { MagazineShell } from "@/components/ui/magazine-shell";
import { PageJsonLd } from "@/components/sydra/page-json-ld";
import type { CampaignTracking } from "@/lib/landing/tracking";
import {
  breadcrumbJsonLd,
  softwareApplicationJsonLd,
  sydraOrganizationJsonLd,
  webPageJsonLd,
} from "@/lib/seo/json-ld";

type AdLandingProps = {
  tracking: CampaignTracking;
  stateCode: string;
  path?: string;
};

/**
 * Single-purpose paid-traffic landing: one promise, one form, one CTA.
 * No Sydra vs Kronos fork, calculator, or audience path grid.
 */
export function AdLanding({ tracking, stateCode, path = "/recover" }: AdLandingProps) {
  const jsonLd = [
    breadcrumbJsonLd([
      { name: "Home", path: "" },
      { name: "Recover out of network claims", path: "/recover" },
    ]),
    sydraOrganizationJsonLd(),
    softwareApplicationJsonLd(),
    webPageJsonLd({
      path: "/recover",
      name: "Recover underpaid out of network claims",
      description:
        "Book a free five minute Sydra demo. See whether your denied out of network claims qualify for federal IDR recovery.",
    }),
  ];

  return (
    <MagazineShell
      hasMobileCtaBar
      headerBorderless
      headerVariant="funnel"
      mainClassName="landing-compact"
    >
      <PageJsonLd data={jsonLd} />
      <Cursor />
      <TrackingProvider path={path} tracking={tracking} />

      <section
        aria-labelledby="ad-landing-hero-heading"
        className="border-b border-rule bg-white px-5 py-12 md:px-10 md:py-16"
      >
        <div className="mx-auto w-full max-w-[1280px]">
          <div aria-hidden className="rule-draw mb-5 h-px w-16 bg-[var(--color-accent)]" />
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-body/70">
            Out of network claim recovery
          </p>
          <h1 className="type-display mt-4 max-w-3xl text-brand" id="ad-landing-hero-heading">
            <SplitHeadline text="Recover underpaid out of network claims." />
          </h1>
          <p className="mt-5 max-w-xl type-body text-body">
            Book a free five minute demo. Bring one denied EOB and we will tell you if it qualifies
            for federal IDR, and what that claim is worth.
          </p>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-body/80">
            Built by Dr. John M. Abrahams, MD, a board certified neurosurgeon. No attorney cut. You
            keep the recovery.
          </p>
        </div>
      </section>

      <div className="mx-auto w-full max-w-[1280px] px-5 py-10 md:px-10 md:py-14">
        <Suspense fallback={<div className="h-64 animate-pulse rounded-[2px] bg-surface-muted" />}>
          <LeadForm
            anchorId="lead-form"
            defaultState={stateCode}
            tracking={tracking}
            variant="card"
          />
        </Suspense>
      </div>

      <MobileCtaBar tracking={tracking} />
    </MagazineShell>
  );
}

import Image from "next/image";

import { Cursor } from "@/components/motion/cursor";
import { SplitHeadline } from "@/components/motion/split-headline";
import { ClaimReviewForm } from "@/components/landing/claim-review-form";
import { ConversionCtaPair } from "@/components/landing/conversion-cta-pair";
import { HeroProofStack } from "@/components/landing/hero-proof-stack";
import { MobileCtaBar } from "@/components/landing/mobile-cta-bar";
import { TrackingProvider } from "@/components/landing/tracking-provider";
import { CtaTrustSignals } from "@/components/sydra/cta-trust-signals";
import { MagazineShell } from "@/components/ui/magazine-shell";
import { PageJsonLd } from "@/components/sydra/page-json-ld";
import { Section } from "@/components/ui/section";
import { CLAIM_REVIEW_OFFER } from "@/lib/case-review";
import { FOUNDER_MARKETING_BYLINE } from "@/lib/content/founder-lines";
import type { CampaignTracking } from "@/lib/landing/tracking";
import {
  breadcrumbJsonLd,
  softwareApplicationJsonLd,
  sydraOrganizationJsonLd,
  webPageJsonLd,
} from "@/lib/seo/json-ld";

type AdLandingProps = {
  tracking: CampaignTracking;
  path?: string;
};

/**
 * Single-purpose paid-traffic landing: one promise, one form, one CTA.
 * No Sydra vs full-service fork, calculator, or audience path grid.
 */
export function AdLanding({ tracking, path = "/recover" }: AdLandingProps) {
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
      description: CLAIM_REVIEW_OFFER,
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
        className="relative flex flex-col overflow-hidden border-b border-rule bg-white text-brand md:min-h-[clamp(34rem,70dvh,52rem)] md:bg-transparent"
      >
        <div className="relative h-[clamp(8rem,24dvh,12rem)] w-full shrink-0 md:absolute md:inset-0 md:h-auto md:min-h-full">
          <Image
            alt="Billing specialist reviewing claim paperwork at a laptop in a modern office"
            className="object-cover object-[center_30%] md:object-right"
            fill
            priority
            sizes="100vw"
            src="/images/editorial/recover-hero-billing.png"
          />
        </div>

        <div className="relative z-10 flex w-full flex-1 md:mt-auto md:items-end">
          <div className="mx-auto flex w-full max-w-[1280px] px-5 pb-8 pt-6 md:px-10 md:pb-14 md:pt-10">
            <div className="hero-frost-panel w-full rounded-[2px] border border-rule/40 p-6 md:max-w-xl md:border-white/60 md:p-8 lg:max-w-2xl lg:p-10">
              <div aria-hidden className="rule-draw mb-5 h-px w-16 bg-[var(--color-accent)]" />
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-body/70">
                Out of network claim recovery
              </p>
              <h1 className="type-display mt-4 text-brand" id="ad-landing-hero-heading">
                <SplitHeadline text="Recover underpaid out of network claims." />
              </h1>
              <p className="mt-5 type-body text-body">{CLAIM_REVIEW_OFFER}</p>
              <div className="mt-6">
                <ConversionCtaPair placement="recover-hero" />
              </div>
              <p className="mt-6 text-sm leading-relaxed text-body/80">
                Built by {FOUNDER_MARKETING_BYLINE}. No attorney cut.
                You keep the recovery.
              </p>
              <HeroProofStack className="mt-8 border-t border-rule pt-8" />
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto w-full max-w-[1280px] px-5 py-10 md:px-10 md:py-14">
        <div
          className="rounded-[2px] border border-rule bg-white p-6 text-left md:p-8"
          id="lead-form"
        >
          <ClaimReviewForm source="recover" />
        </div>
        <CtaTrustSignals className="mt-8 max-w-3xl" />
      </div>

      <Section id="recover-closing" tone="white">
        <ConversionCtaPair
          placement="recover-closing"
          secondaryAs="link"
          showSupportingLine={false}
        />
      </Section>

      <MobileCtaBar tracking={tracking} />
    </MagazineShell>
  );
}

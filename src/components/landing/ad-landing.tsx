import Image from "next/image";

import { Cursor } from "@/components/motion/cursor";
import { SplitHeadline } from "@/components/motion/split-headline";
import { HeroProofStack } from "@/components/landing/hero-proof-stack";
import { LeadForm } from "@/components/landing/lead-form";
import { MobileCtaBar } from "@/components/landing/mobile-cta-bar";
import { TrackingProvider } from "@/components/landing/tracking-provider";
import { CtaTrustSignals } from "@/components/sydra/cta-trust-signals";
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
  urlCode?: string;
  urlState?: string;
};

/**
 * Single-purpose paid-traffic landing: one promise, one form, one CTA.
 * No Sydra vs full-service fork, calculator, or audience path grid.
 */
export function AdLanding({
  tracking,
  stateCode,
  path = "/recover",
  urlCode = "",
  urlState = "",
}: AdLandingProps) {
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
        "Book a free 15 minute Sydra demo. See whether your denied out of network claims qualify for federal IDR recovery.",
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
              <p className="mt-5 type-body text-body">
                Book a free 15 minute demo. Bring one denied EOB and we will tell you if it
                qualifies for federal IDR, and what that claim is worth.
              </p>
              <p className="mt-6 text-sm leading-relaxed text-body/80">
                Built by Dr. John M. Abrahams, MD, a board certified neurosurgeon. No attorney cut.
                You keep the recovery.
              </p>
              <HeroProofStack className="mt-8 border-t border-rule pt-8" />
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto w-full max-w-[1280px] px-5 py-10 md:px-10 md:py-14">
        <LeadForm
          anchorId="lead-form"
          defaultState={stateCode}
          landingPage="recover"
          readSearchParams={false}
          thankYouPath="/recover/thank-you"
          tracking={tracking}
          urlCode={urlCode}
          urlState={urlState}
          variant="card"
        />
        <CtaTrustSignals className="mt-8 max-w-3xl" />
      </div>

      <MobileCtaBar tracking={tracking} />
    </MagazineShell>
  );
}

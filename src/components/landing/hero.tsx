"use client";

import Image from "next/image";

import { SplitHeadline } from "@/components/motion/split-headline";
import { Arrow } from "@/components/ui/arrow";
import { Button } from "@/components/ui/button";
import { trackCtaClick } from "@/lib/landing/analytics-client";
import type { CampaignTracking } from "@/lib/landing/tracking";

type HeroProps = {
  stateDisplay: string | null;
  tracking: CampaignTracking;
};

export function Hero({ stateDisplay, tracking }: HeroProps) {
  const eyebrow = stateDisplay
    ? `OUT OF NETWORK RECOVERY FOR SURGICAL PRACTICES · ${stateDisplay}`
    : "OUT OF NETWORK RECOVERY FOR SURGICAL PRACTICES";

  const handleDemoClick = () => {
    trackCtaClick("sydra", tracking);
    document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleKronosClick = () => {
    trackCtaClick("kronos", tracking);
    document.getElementById("kronos-path")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      aria-labelledby="landing-hero-heading"
      className="relative isolate flex min-h-[clamp(34rem,86dvh,52rem)] flex-col overflow-hidden bg-white text-brand"
    >
      <div className="absolute inset-0 z-0">
        <Image
          alt="Surgical practice billing team preparing out-of-network claims for federal IDR"
          className="object-cover object-right"
          fetchPriority="high"
          fill
          loading="eager"
          sizes="100vw"
          src="/images/editorial/postcard-hero-billing.png"
        />
      </div>

      {/* Lower-third: a frosted translucent caption band pinned to the bottom. The
          photo stays visible above it and reads through the band itself (the right
          side carries no text), while the blur keeps the dark copy legible. */}
      <div className="relative z-10 mt-auto w-full md:bg-white/50 md:backdrop-blur-md lg:bg-transparent lg:backdrop-blur-none">
        <div className="mx-auto w-full max-w-[1280px] px-5 pb-12 pt-6 md:px-10 md:pb-16 md:pt-8">
          <div className="max-w-3xl">
            <div aria-hidden className="rule-draw mb-5 h-px w-16 bg-[var(--color-accent)]" />
            <p className="hero-eyebrow font-mono text-[11px] uppercase tracking-[0.14em] text-body/70">
              {eyebrow}
            </p>
            <h1 className="type-display mt-4 text-brand" id="landing-hero-heading">
              <SplitHeadline text="Stop writing off out of network claims." />
            </h1>
            <p className="hero-sub prose-measure mt-5 type-body text-body">
              The No Surprises Act gets them paid through federal independent dispute resolution
              (IDR). Surgeon built NSA IDR software your billing team runs in five minutes per
              claim, turning written off out-of-network claims into recovered revenue.
            </p>
            <p className="hero-bold prose-measure mt-3 text-[15px] font-medium leading-relaxed text-brand md:text-[17px]">
              Your team reviews. Your team submits. You keep the recovery.
            </p>
            <div className="hero-cta mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
              <Button showArrow type="button" variant="solid" onClick={handleDemoClick}>
                Book a 5 minute demo
              </Button>
              <button
                className="cta-link inline-flex min-h-[44px] select-none items-center gap-2 text-left text-[13px] font-normal uppercase tracking-[0.08em] text-body transition-colors hover:text-[var(--color-hero)]"
                type="button"
                onClick={handleKronosClick}
              >
                <span>Prefer it handled for you? Talk to Kronos Revenue</span>
                <Arrow className="shrink-0" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

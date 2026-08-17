import Image from "next/image";

import { HeroCtas } from "@/components/landing/hero-ctas";
import { FOUNDER_ORIGIN_LINE } from "@/lib/content/founder-lines";
import type { CampaignTracking } from "@/lib/landing/tracking";

type HeroProps = {
  stateDisplay: string | null;
  tracking: CampaignTracking;
};

function HeroContent({
  eyebrow,
}: {
  eyebrow: string;
}) {
  return (
    <div className="w-full">
      <div aria-hidden className="mb-5 h-px w-16 bg-[var(--color-accent)]" />
      <p className="home-eyebrow text-body">{eyebrow}</p>
      <h1 className="home-h1 mt-4 text-brand" id="landing-hero-heading">
        That payment is an opening offer.
      </h1>
      <p className="home-lead mt-5 text-body">
        When a health plan pays an out of network claim, most practices treat the amount that arrives
        as the amount owed. Under the No Surprises Act, it isn&apos;t. Federal Independent Dispute
        Resolution exists specifically to contest it.
      </p>
      <HeroCtas />
      <figure className="mt-6 max-w-[720px]">
        <blockquote className="home-body text-body">{FOUNDER_ORIGIN_LINE}</blockquote>
        <figcaption className="home-caption mt-3 text-body">
          Dr. John Abrahams, MD, board certified neurosurgeon and founder
        </figcaption>
      </figure>
    </div>
  );
}

export function Hero({ stateDisplay }: HeroProps) {
  const eyebrow = stateDisplay
    ? `OUT OF NETWORK RECOVERY FOR SURGICAL PRACTICES · ${stateDisplay}`
    : "OUT OF NETWORK RECOVERY FOR SURGICAL PRACTICES";

  return (
    <section
      aria-labelledby="landing-hero-heading"
      className="relative flex flex-col overflow-hidden bg-white text-brand md:min-h-[clamp(34rem,70dvh,52rem)] md:bg-transparent"
    >
      <div className="relative h-[clamp(8rem,24dvh,12rem)] w-full shrink-0 md:absolute md:inset-0 md:h-auto md:min-h-full">
        <Image
          alt="Surgical practice billing team preparing out of network claims for federal IDR"
          className="object-cover object-[center_20%] md:object-right"
          fill
          priority
          sizes="100vw"
          src="/images/editorial/postcard-hero-billing.png"
        />
      </div>

      <div className="relative z-10 flex w-full flex-1 md:mt-auto md:items-end">
        <div className="mx-auto flex w-full max-w-[1200px] px-4 pb-8 pt-6 md:px-6 md:pb-14 md:pt-10 lg:px-8">
          <div className="hero-frost-panel w-full rounded-[2px] border border-rule/40 p-6 md:max-w-xl md:border-white/60 md:p-8 lg:max-w-2xl lg:p-10">
            <HeroContent eyebrow={eyebrow} />
          </div>
        </div>
      </div>
    </section>
  );
}

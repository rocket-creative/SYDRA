import { Button } from "@/components/ui/button";
import { CtaLink } from "@/components/ui/cta-link";
import { SydraHeroMock } from "@/components/sydra/hero-mock";
import { SplitHeadline } from "@/components/motion/split-headline";

const trustItems = [
  "HIPAA controls in place · BAA on request",
  "AWS Bedrock · Claude Sonnet 4 · PHI stays inside AWS HIPAA eligible boundary",
  "ModMed integration today · Stedi clearinghouse",
  "Built by Kronos Health · Dr. John M. Abrahams, MD, neurosurgeon founder",
] as const;

export function SydraHero() {
  return (
    <section
      aria-labelledby="heading-hero"
      className="relative border-b border-rule bg-white"
    >
      <div className="grid lg:min-h-[min(100dvh,56rem)] lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <div className="flex min-w-0 flex-col justify-center px-6 py-14 md:px-10 md:py-16 lg:py-20 lg:pr-12">
          <p className="hero-eyebrow type-caption text-body/70">Federal IDR / NSA</p>
          <h1
            className="type-display prose-measure mt-4 text-brand"
            id="heading-hero"
          >
            <SplitHeadline
              delay={180}
              stagger={55}
              text="Your billing team spends 30 minutes per NSA IDR claim."
            />
          </h1>
          <p className="hero-sub type-body prose-measure mt-6 text-body">
            Sydra prepares a complete federal IDR submission packet in under 5 minutes per claim.
            Clinical narrative drafted from your operative note. Market rate comparisons from 213+
            ingested prior determinations. One claim per CPT, never batched.
          </p>
          <p className="hero-bold prose-measure mt-4 text-[15px] font-medium leading-relaxed text-brand md:text-[17px]">
            Your team reviews. Your team submits. You keep the recovery.
          </p>
          <div className="hero-cta mt-10 flex flex-wrap items-center gap-4">
            <Button href="/demo" showArrow variant="solid">
              See Sydra on a real denied claim
            </Button>
            <CtaLink href="/how-it-works">How it works</CtaLink>
          </div>
          <p className="hero-note mt-6 text-sm text-body/80">
            15 minutes on a live call. Watch Sydra build a complete IDR packet on a real claim in
            real time. No commitment.
          </p>
        </div>

        <div className="hero-image-in flex items-center justify-center border-t border-rule px-6 py-12 lg:min-h-[min(100dvh,56rem)] lg:border-t-0 lg:border-l lg:px-10 lg:py-16">
          <SydraHeroMock />
        </div>
      </div>

      <div className="border-t border-rule bg-neutral-section px-6 py-8 md:px-10">
        <ul className="mx-auto grid max-w-[1280px] items-center gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {trustItems.map((item, i) => (
            <li
              key={item}
              className="flex items-center border-l border-rule pl-4 text-sm leading-relaxed text-body sm:text-[15px]"
              style={{
                animation: `fade-up 500ms cubic-bezier(0.16,1,0.3,1) ${1000 + i * 80}ms both`,
              }}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

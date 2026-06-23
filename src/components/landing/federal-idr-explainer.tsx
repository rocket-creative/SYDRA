import Link from "next/link";

import { Arrow } from "@/components/ui/arrow";
import { Section } from "@/components/ui/section";

export function FederalIdrExplainer() {
  return (
    <Section
      ariaLabelledby="heading-what-is-federal-idr"
      id="what-is-federal-idr"
      sidebarLabel="The basics"
      tone="neutral"
    >
      <h2 className="type-h2 prose-measure text-brand" id="heading-what-is-federal-idr">
        What is Federal IDR?
      </h2>
      <div className="prose-measure mt-6 space-y-5 type-body text-body">
        <p>
          Federal independent dispute resolution (IDR) is the No Surprises Act process for disputing
          a low out-of-network payment. The No Surprises Act, or NSA, is a federal law in effect
          since 2022 that protects patients from surprise bills for out-of-network care they could
          not reasonably avoid, such as emergency treatment or care from an out-of-network surgeon
          at an in-network facility. The patient pays only their in-network cost share, and the
          health plan and the provider settle the rest between themselves. That is where most
          disputes begin, because the plan&apos;s first payment is often far below the value of the
          work.
        </p>
        <p>
          When the provider and the health plan cannot agree on a fair payment, either side can take
          the claim to independent dispute resolution. IDR is a federal arbitration process run by
          certified neutral entities. Both sides submit a single proposed payment amount with
          supporting evidence, and the arbiter picks one of the two offers. There is no splitting
          the difference, so the offer best supported by the evidence wins. The arbiter weighs the
          qualified payment amount, or QPA, against the provider&apos;s evidence on case complexity,
          surgeon training, and prior determinations for the same code and region, which is why
          out-of-network claim recovery depends so heavily on how the submission is built.
        </p>
        <p>
          Federal IDR is most relevant to surgical specialties with high value procedures, including
          out-of-network care delivered at an in-network facility. It runs on strict clocks: you
          complete a 30 business day open negotiation period first, then have 4 business days to
          initiate IDR. Miss a window and the claim is closed for that cycle. As of 2026 a federal
          rule cut the administrative filing fees, opening No Surprises Act billing disputes to
          smaller practices that could not justify the cost before. CMS data shows 88 percent of
          properly filed federal IDR disputes result in a provider win (Source: Georgetown
          University CHIR, March 2026).
        </p>
      </div>
      <p className="mt-8">
        <Link
          className="inline-flex min-h-[44px] items-center gap-2 type-caption text-brand transition-colors hover:text-[var(--color-hero)]"
          href="/what-is-idr"
        >
          <span>Read the full Federal IDR guide</span>
          <Arrow className="shrink-0" />
        </Link>
      </p>
    </Section>
  );
}

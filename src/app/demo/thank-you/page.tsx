import { Suspense } from "react";

import { DemoBookedOnMount } from "@/components/analytics/demo-booked-on-mount";
import { LeadConversionOnMount } from "@/components/analytics/lead-conversion-on-mount";
import { Button } from "@/components/ui/button";
import { CalendlyEmbed } from "@/components/sydra/calendly-embed";
import { BREADCRUMBS, SydraPageShell } from "@/components/sydra/page-shell";
import { SALES_PHONE_DISPLAY, SALES_PHONE_TEL } from "@/lib/contact";
import { PAGE_METADATA } from "@/lib/seo/metadata";

export const metadata = PAGE_METADATA.thankYou;

export default function DemoThankYouPage() {
  return (
    <SydraPageShell
      breadcrumb={[...BREADCRUMBS.demo, { name: "Thank you", path: "/demo/thank-you" }]}
      headerVariant="funnel"
      mainClassName="px-4 py-16 md:px-10 md:py-24"
    >
      <LeadConversionOnMount action="free_demo" />
      <Suspense fallback={null}>
        <DemoBookedOnMount />
      </Suspense>
      <div className="mx-auto max-w-3xl">
        <div className="max-w-xl">
          <p className="type-caption text-[var(--color-accent)]">Confirmed</p>
          <h1 className="type-h2 mt-4 text-brand">Request received</h1>
          <p className="mt-6 type-body text-body">
            Pick a time below for your demo. Bring one denied or underpaid out of network EOB and we
            will run it live.
          </p>
          <p className="mt-4 type-body text-body">
            Or set up a call:{" "}
            <a className="underline underline-offset-2" href={SALES_PHONE_TEL}>
              {SALES_PHONE_DISPLAY}
            </a>
          </p>
        </div>
        <CalendlyEmbed className="mt-10" />
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Button href="/" showArrow>
            Back to homepage
          </Button>
          <Button href="https://sydra.health/" rel="noopener noreferrer" target="_blank" variant="ghost">
            Sign in
          </Button>
        </div>
      </div>
    </SydraPageShell>
  );
}

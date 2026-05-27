import Link from "next/link";

import { BREADCRUMBS, SydraPageShell } from "@/components/sydra/page-shell";
import { PAGE_METADATA } from "@/lib/seo/metadata";

export const metadata = PAGE_METADATA.thankYou;

export default function DemoThankYouPage() {
  return (
    <SydraPageShell
      breadcrumb={[...BREADCRUMBS.demo, { name: "Thank you", path: "/demo/thank-you" }]}
      headerVariant="funnel"
      mainClassName="flex flex-col items-center px-4 py-16 text-center sm:px-6 md:py-24 xl:px-8"
    >
      <div
        className="flex size-14 items-center justify-center rounded-full bg-emerald-100 text-2xl text-emerald-700"
        aria-hidden
      >
        ✓
      </div>
      <h1 className="mt-8 max-w-lg text-[1.75rem] font-semibold tracking-tight text-[#1A2B48] sm:text-3xl">
        Request received
      </h1>
      <p className="mt-5 max-w-md text-base leading-relaxed text-[#4A5568] md:text-[17px]">
        Our team reviews every request. If your practice is a fit, we will
        follow up within one business day at the time you selected to
        schedule your denied claim walkthrough.
      </p>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <Link
          className="inline-flex min-h-12 items-center justify-center rounded-md bg-[#1A2B48] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          href="/"
        >
          Back to homepage
        </Link>
        <a
          className="inline-flex min-h-12 items-center justify-center rounded-md border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-[#1A2B48] transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          href="https://sydra.health/"
          rel="noopener noreferrer"
          target="_blank"
        >
          Sign in
        </a>
      </div>
    </SydraPageShell>
  );
}

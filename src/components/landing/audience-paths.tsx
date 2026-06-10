import Link from "next/link";

import { Section } from "@/components/ui/section";

const paths = [
  {
    label: "Never heard of this",
    title: "What is federal IDR?",
    body: "The No Surprises Act gives out of network providers a federal path to dispute low payments. Most practices do not know it exists. Start here.",
    href: "/what-is-idr",
    cta: "Learn the basics",
  },
  {
    label: "A lawyer takes a cut",
    title: "Already paying an attorney?",
    body: "IDR attorneys typically keep 20 percent of every recovery. See the fee math against running it on software you own.",
    href: "/sydra-vs-idr-attorney",
    cta: "Compare the fees",
  },
  {
    label: "We do it in house",
    title: "Filing it yourself?",
    body: "Building one submission by hand takes 25 to 40 minutes. See what that labor costs at your volume, and how to scale without adding headcount.",
    href: "/in-house-idr",
    cta: "Run the numbers",
  },
] as const;

export function AudiencePaths() {
  return (
    <Section ariaLabelledby="heading-audience-paths" id="audience-paths" sidebarLabel="Where you start" tone="neutral">
      <h2 className="type-h2 prose-measure text-brand" id="heading-audience-paths">
        Three ways in. Pick the one that sounds like you.
      </h2>
      <p className="prose-measure mt-6 type-body text-body">
        The process used to be too expensive for smaller practices. As of 2026 the federal rule cut
        filing fees, and the path opened up.
      </p>
      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {paths.map((path) => (
          <Link
            key={path.href}
            className="editorial-card group flex flex-col bg-white p-6 sm:p-8"
            href={path.href}
          >
            <p className="type-caption text-[var(--color-accent)]">{path.label}</p>
            <h3 className="mt-3 text-lg font-medium text-brand">{path.title}</h3>
            <p className="mt-4 type-body text-body">{path.body}</p>
            <span className="mt-6 type-caption text-brand">
              {path.cta}
              <span aria-hidden className="ml-1 inline-block transition-transform group-hover:translate-x-1">
                &rarr;
              </span>
            </span>
          </Link>
        ))}
      </div>
    </Section>
  );
}

import type { Metadata } from "next";

import { AdLanding } from "@/components/landing/ad-landing";
import { getLandingPageData } from "@/lib/landing/page-data";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Recover Out of Network Claims | Sydra",
  description:
    "Send us one denied out-of-network EOB. We'll tell you whether it qualifies for federal IDR and what it's worth — in writing, within one business day. No call, no software to install.",
  path: "/recover",
  // Paid landing: keep crawlable for ads preview, avoid competing with homepage SEO.
  robots: { index: false, follow: true },
});

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function RecoverAdLandingPage({ searchParams }: PageProps) {
  const query = await searchParams;
  const data = await getLandingPageData(undefined, query);

  return (
    <AdLanding path="/recover" tracking={data.tracking} />
  );
}

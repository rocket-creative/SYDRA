import type { Metadata } from "next";

import { AdLanding } from "@/components/landing/ad-landing";
import { getLandingPageData } from "@/lib/landing/page-data";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Recover Out of Network Claims | Sydra",
  description:
    "Book a free five minute Sydra demo. See if your denied out of network claims qualify for federal IDR recovery. Surgeon built. No attorney cut.",
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
    <AdLanding path="/recover" stateCode={data.stateCode} tracking={data.tracking} />
  );
}

import { Homepage } from "@/components/homepage/homepage";
import { getLandingPageData } from "@/lib/landing/page-data";

/*
 * No generateMetadata here on purpose. The root layout already spreads
 * HOME_METADATA, which canonicalises to / and is indexable. This route
 * previously called buildPostcardMetadata(), the builder for the /r postcard
 * landers, which left the homepage noindex with its canonical pointing at /r.
 */

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function HomePage({ searchParams }: PageProps) {
  const query = await searchParams;
  const data = await getLandingPageData(undefined, query);

  return <Homepage path="/" tracking={data.tracking} />;
}

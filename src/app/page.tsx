import type { Metadata } from "next";

import { PostcardLanding } from "@/components/landing/postcard-landing";
import { getLandingPageData } from "@/lib/landing/page-data";
import { buildPostcardMetadata } from "@/lib/landing/metadata";

export function generateMetadata(): Metadata {
  return buildPostcardMetadata();
}

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function HomePage({ searchParams }: PageProps) {
  const query = await searchParams;
  const data = await getLandingPageData(undefined, query);

  return (
    <PostcardLanding
      path="/"
      stateCode={data.stateCode}
      stateDisplay={data.stateDisplay}
      tracking={data.tracking}
    />
  );
}

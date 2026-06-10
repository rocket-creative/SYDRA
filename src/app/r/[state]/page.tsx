import type { Metadata } from "next";

import { PostcardLanding } from "@/components/landing/postcard-landing";
import { getLandingPageData } from "@/lib/landing/page-data";
import { buildPostcardMetadata } from "@/lib/landing/metadata";

type PageProps = {
  params: Promise<{ state: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { state } = await params;
  return buildPostcardMetadata(state);
}

export default async function StateLandingPage({ params, searchParams }: PageProps) {
  const { state } = await params;
  const query = await searchParams;
  const data = await getLandingPageData(state, query);

  return (
    <PostcardLanding
      path={`/r/${state}`}
      stateCode={data.stateCode}
      stateDisplay={data.stateDisplay}
      tracking={data.tracking}
    />
  );
}

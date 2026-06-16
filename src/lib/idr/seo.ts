import type { Metadata } from "next";

import { buildPageMetadata } from "@/lib/seo/metadata";
import { stateSlug } from "@/lib/idr/taxonomy";
import type { DataSource } from "@/lib/idr/types";

/**
 * Entity-page SEO: URL builders, index-gating, and per-page-type metadata.
 *
 * Index-gating is the single safeguard that lets Sydra mint tens of thousands of
 * URLs without a scaled-content penalty: a page is indexable only when it is
 * backed by real MRF/IDR data. Seed data is always noindex,follow — the page
 * still exists for internal linking and AI crawlers, it just does not compete.
 */

const INDEXABLE_ROBOTS = { index: true, follow: true } as const;
const NOINDEX_ROBOTS = { index: false, follow: true } as const;

export function isIndexable(dataSource: DataSource): boolean {
  return dataSource !== "seed";
}

export function robotsFor(dataSource: DataSource): Metadata["robots"] {
  return isIndexable(dataSource) ? INDEXABLE_ROBOTS : NOINDEX_ROBOTS;
}

// --- URL builders (single source of truth for the entity URL architecture) ---

export function idrCodePath(code: string): string {
  return `/idr/cpt/${code}`;
}

export function idrCodeStatePath(code: string, state: string): string {
  return `/idr/cpt/${code}/${stateSlug(state)}`;
}

export function idrCodeStatePayerPath(
  code: string,
  state: string,
  payerSlug: string,
): string {
  return `/idr/cpt/${code}/${stateSlug(state)}/${payerSlug}`;
}

export function idrPayerPath(payerSlug: string): string {
  return `/idr/payer/${payerSlug}`;
}

export function idrStatePath(state: string): string {
  return `/idr/state/${stateSlug(state)}`;
}

export function idrSpecialtyPath(slug: string): string {
  return `/idr/specialty/${slug}`;
}

// --- Metadata factories ---

export function codeStateMetadata(input: {
  code: string;
  state: string;
  codeLabel: string;
  stateName: string;
  dataSource: DataSource;
}): Metadata {
  const { code, state, codeLabel, stateName, dataSource } = input;
  return buildPageMetadata({
    title: `Federal IDR for ${codeLabel} (CPT ${code}) in ${stateName} | Sydra`,
    description: `Payer benchmarks, federal IDR eligibility, and dispute win rates for ${codeLabel} (CPT ${code}) in ${stateName}. See the spread between out of network allowed amounts and what IDR awards.`,
    path: idrCodeStatePath(code, state),
    ogImageAlt: `Federal IDR benchmarks for ${codeLabel} in ${stateName}.`,
    robots: robotsFor(dataSource),
  });
}

export function codeStatePayerMetadata(input: {
  code: string;
  state: string;
  payerSlug: string;
  payerName: string;
  codeLabel: string;
  stateName: string;
  dataSource: DataSource;
}): Metadata {
  const { code, state, payerSlug, payerName, codeLabel, stateName, dataSource } =
    input;
  return buildPageMetadata({
    title: `${payerName} IDR for ${codeLabel} (CPT ${code}) in ${stateName} | Sydra`,
    description: `How ${payerName} pays ${codeLabel} (CPT ${code}) out of network in ${stateName}, the Medicare benchmark, and federal IDR win rates for disputes against ${payerName}.`,
    path: idrCodeStatePayerPath(code, state, payerSlug),
    ogImageAlt: `${payerName} IDR benchmarks for ${codeLabel} in ${stateName}.`,
    robots: robotsFor(dataSource),
  });
}

export function codeHubMetadata(input: {
  code: string;
  codeLabel: string;
  hasData: boolean;
}): Metadata {
  const { code, codeLabel, hasData } = input;
  return buildPageMetadata({
    title: `Federal IDR for ${codeLabel} (CPT ${code}) | Sydra`,
    description: `Federal IDR overview for ${codeLabel} (CPT ${code}): eligibility, payment benchmarks, and dispute outcomes by state. Built for surgical billing teams.`,
    path: idrCodePath(code),
    ogImageAlt: `Federal IDR overview for ${codeLabel}.`,
    // Hubs are indexable only once at least one state under them has real data.
    robots: hasData ? INDEXABLE_ROBOTS : NOINDEX_ROBOTS,
  });
}

export function stateHubMetadata(input: {
  state: string;
  stateName: string;
  dataSource: DataSource | null;
}): Metadata {
  const { state, stateName } = input;
  return buildPageMetadata({
    title: `Federal IDR in ${stateName} | NSA Surprise Billing Disputes | Sydra`,
    description: `How the No Surprises Act and federal IDR work for out of network surgical claims in ${stateName}: eligibility, the state pathway, and dispute win rates.`,
    path: idrStatePath(state),
    ogImageAlt: `Federal IDR and surprise billing disputes in ${stateName}.`,
    // State hubs carry reviewed eligibility content (pathway + state law), so
    // they are always indexable, independent of benchmark data tier.
    robots: INDEXABLE_ROBOTS,
  });
}

export function payerHubMetadata(input: {
  payerSlug: string;
  payerName: string;
  hasData: boolean;
}): Metadata {
  const { payerSlug, payerName, hasData } = input;
  return buildPageMetadata({
    title: `${payerName} IDR Disputes | Out of Network Surgical Claims | Sydra`,
    description: `Disputing underpaid out of network surgical claims with ${payerName} through federal IDR: benchmarks, eligibility, and how Sydra prepares the submission.`,
    path: idrPayerPath(payerSlug),
    ogImageAlt: `Federal IDR disputes with ${payerName}.`,
    robots: hasData ? INDEXABLE_ROBOTS : NOINDEX_ROBOTS,
  });
}

export function specialtyHubMetadata(input: {
  slug: string;
  name: string;
}): Metadata {
  const { slug, name } = input;
  return buildPageMetadata({
    title: `Federal IDR for ${name} | Codes and Benchmarks | Sydra`,
    description: `The ${name} CPT codes surgical billing teams dispute most under the No Surprises Act, with federal IDR benchmarks and outcomes by state.`,
    path: idrSpecialtyPath(slug),
    ogImageAlt: `Federal IDR codes and benchmarks for ${name}.`,
    // Hub pages over the relevant code list are always indexable.
    robots: INDEXABLE_ROBOTS,
  });
}

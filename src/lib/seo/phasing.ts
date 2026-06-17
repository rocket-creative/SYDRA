import { LAUNCH_STATE_CODES } from "@/lib/idr/taxonomy";

/**
 * Manual wave allowlist for the CPT entity surface.
 *
 * Indexable CPT pages already pass the non-seed data gate (real MRF/IDR data).
 * This allowlist sits on top of that gate as a second, manually controlled
 * dimension: even when a state has indexable data, its CPT pages only enter the
 * sitemap once that state's wave has been explicitly released here. The two
 * controls intersect — a CPT page ships only when it is both data-backed AND in
 * a released wave — so SEO can roll geos out deliberately rather than the moment
 * data lands.
 *
 * Driven by the `SEO_CPT_WAVE_STATES` env var (comma-separated 2-letter state
 * codes, case-insensitive, whitespace-trimmed). When unset or empty, defaults to
 * the launch geo spine (LAUNCH_STATE_CODES).
 */

function parseWaveStates(): string[] {
  const raw = process.env.SEO_CPT_WAVE_STATES;
  const parsed = (raw ?? "")
    .split(",")
    .map((code) => code.trim().toUpperCase())
    .filter((code) => code.length > 0);
  return parsed.length > 0 ? parsed : [...LAUNCH_STATE_CODES];
}

/** UPPERCASE 2-letter state codes whose CPT pages are allowed into the sitemap. */
export const RELEASED_CPT_WAVES: ReadonlySet<string> = new Set(parseWaveStates());

/** Case-insensitive membership check against the released CPT wave allowlist. */
export function isReleasedCptWave(stateCode: string): boolean {
  return RELEASED_CPT_WAVES.has(stateCode.trim().toUpperCase());
}

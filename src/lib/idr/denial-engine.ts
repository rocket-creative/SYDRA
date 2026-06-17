import {
  DENIAL_REASONS,
  codeReasonKeys,
  payerEmphasis,
  reasonAppliesToSpecialty,
  type DenialReasonKey,
} from "@/lib/idr/denial-reasons";
import { getCodeMeta, getSpecialtyMeta } from "@/lib/idr/taxonomy";

/**
 * The composition engine (build spec section 3.3).
 *
 * Composition rule: take up to two payer emphasis reasons first, then fill to
 * four or five from the code's specialty reason set, dropping duplicates.
 * Interpolate the procedure and state into each sentence so no two pages read
 * identically. The result is true, specific to this code, state, and payer, and
 * never a name swap.
 */

/** Reasons shown on the plain CPT by state page (no payer). */
const PLAIN_REASON_COUNT = 4;
/** Target reason count on a payer page. */
const PAYER_REASON_COUNT = 5;

export type ComposedReason = {
  key: DenialReasonKey;
  headline: string;
  body: string;
};

export type ComposedDenial = {
  intro: string;
  reasons: ComposedReason[];
};

type ComposeInput = {
  code: string;
  stateName: string;
  /** Named payer slug, omitted for the plain CPT by state composition. */
  payerSlug?: string;
};

function interpolate(
  template: string,
  proc: string,
  stateName: string,
  specialtyName: string,
): string {
  return template
    .replaceAll("{proc}", proc)
    .replaceAll("{state}", stateName)
    .replaceAll("{specialty}", specialtyName.toLowerCase());
}

function dedupe(keys: DenialReasonKey[]): DenialReasonKey[] {
  return Array.from(new Set(keys));
}

/**
 * The ordered reason keys for a page, before interpolation. Exposed so the
 * indexability gate can count reasons and compare payer vs plain compositions
 * without rebuilding sentences.
 */
export function denialReasonKeysFor(input: ComposeInput): DenialReasonKey[] {
  const meta = getCodeMeta(input.code);
  if (!meta) return [];
  const specialty = meta.specialty;
  const applicable = (k: DenialReasonKey) =>
    reasonAppliesToSpecialty(k, specialty);

  const plain = dedupe(codeReasonKeys(input.code).filter(applicable));

  if (!input.payerSlug) {
    return plain.slice(0, PLAIN_REASON_COUNT);
  }

  const emphasis = dedupe(payerEmphasis(input.payerSlug).filter(applicable)).slice(
    0,
    2,
  );
  const fill = plain.filter((k) => !emphasis.includes(k));
  return dedupe([...emphasis, ...fill]).slice(0, PAYER_REASON_COUNT);
}

export function composeDenialReasons(input: ComposeInput): ComposedDenial {
  const meta = getCodeMeta(input.code);
  const proc = meta?.shortLabel ?? `CPT ${input.code}`;
  const specialtyName = meta ? getSpecialtyMeta(meta.specialty)?.name ?? "" : "";

  const reasons = denialReasonKeysFor(input).map((key) => {
    const reason = DENIAL_REASONS[key];
    return {
      key,
      headline: reason.headline,
      body: interpolate(reason.body, proc, input.stateName, specialtyName),
    };
  });

  return {
    intro: `Out of network ${proc} claims in ${input.stateName} are commonly underpaid or denied for reasons like these.`,
    reasons,
  };
}

/**
 * Payer angle gate (build spec section 5.3). True only when the payer brings at
 * least one emphasis reason that the plain CPT by state page does not already
 * lead with. A payer that adds nothing distinct for a code returns false, and
 * that page stays noindex and lives for paid traffic only.
 */
export function payerAngleIsDistinct(code: string, payerSlug: string): boolean {
  const meta = getCodeMeta(code);
  if (!meta) return false;
  const specialty = meta.specialty;
  const applicable = (k: DenialReasonKey) =>
    reasonAppliesToSpecialty(k, specialty);

  const plainTop = dedupe(codeReasonKeys(code).filter(applicable)).slice(
    0,
    PLAIN_REASON_COUNT,
  );
  const emphasis = payerEmphasis(payerSlug).filter(applicable);
  return emphasis.some((key) => !plainTop.includes(key));
}

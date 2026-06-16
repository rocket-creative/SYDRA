// Central config for the Sydra data pipeline.
// Everything source-specific or file-specific lives here so the scripts stay
// generic. code_system is normalized to lowercase to match the app's enum
// values ('cpt' | 'hcpcs' | 'icd10').

export const TARGET_CODE_SYSTEMS = ['cpt', 'hcpcs', 'icd10'];

// MRF extraction: which negotiated_type values count as a usable rate, and which
// billing_class we want (professional = the clinician claim Sydra disputes).
export const MRF = {
  acceptNegotiatedTypes: ['negotiated', 'fee schedule', 'derived'],
  billingClass: 'professional',
};

// ---------------------------------------------------------------------------
// CMS Federal IDR Public Use File — column mapping.
// IMPORTANT: column headers change between quarterly PUF releases. Open the file
// + its data dictionary and map the real headers here. Each value is the column
// name as it appears in the CSV; leave '' if the field is absent in your file.
// ---------------------------------------------------------------------------
export const IDR_PUF_COLUMNS = {
  serviceCode:      'Service Code',            // CPT/HCPCS billed code
  serviceCodeType:  'Type of Service Code',    // 'CPT' | 'HCPCS' (optional)
  state:            'Location of Service',      // state of service (normalize below)
  payerName:        'Health Plan/Issuer Name',
  qpa:              'QPA',
  prevailingParty:  'Prevailing Party',         // 'Provider' | 'Health Plan/Issuer'
  prevailingOffer:  'Prevailing Offer',
  pctOfQpa:         '',                         // if the file already gives % of QPA, map it; else derived
};

// Normalize a raw billing-code-type to a lowercase code_system the app accepts.
export function normalizeCodeSystem(raw) {
  const v = String(raw ?? 'cpt').trim().toLowerCase();
  if (v.includes('hcpcs')) return 'hcpcs';
  if (v.includes('icd')) return 'icd10';
  return 'cpt';
}

// Normalize a raw "Prevailing Party" value to 'provider' | 'plan' | null
export function normalizePrevailingParty(raw) {
  if (!raw) return null;
  const v = String(raw).toLowerCase();
  if (v.includes('provider')) return 'provider';
  if (v.includes('plan') || v.includes('issuer') || v.includes('payer')) return 'plan';
  return null;
}

// Full state-name -> 2-letter code map (50 states + DC) so PUFs that spell the
// state out are normalized. Two-letter inputs pass through uppercased.
const STATE_NAME_TO_CODE = {
  alabama: 'AL', alaska: 'AK', arizona: 'AZ', arkansas: 'AR', california: 'CA',
  colorado: 'CO', connecticut: 'CT', delaware: 'DE',
  'district of columbia': 'DC', florida: 'FL', georgia: 'GA', hawaii: 'HI',
  idaho: 'ID', illinois: 'IL', indiana: 'IN', iowa: 'IA', kansas: 'KS',
  kentucky: 'KY', louisiana: 'LA', maine: 'ME', maryland: 'MD',
  massachusetts: 'MA', michigan: 'MI', minnesota: 'MN', mississippi: 'MS',
  missouri: 'MO', montana: 'MT', nebraska: 'NE', nevada: 'NV',
  'new hampshire': 'NH', 'new jersey': 'NJ', 'new mexico': 'NM',
  'new york': 'NY', 'north carolina': 'NC', 'north dakota': 'ND', ohio: 'OH',
  oklahoma: 'OK', oregon: 'OR', pennsylvania: 'PA', 'rhode island': 'RI',
  'south carolina': 'SC', 'south dakota': 'SD', tennessee: 'TN', texas: 'TX',
  utah: 'UT', vermont: 'VT', virginia: 'VA', washington: 'WA',
  'west virginia': 'WV', wisconsin: 'WI', wyoming: 'WY',
};
export function normalizeState(raw) {
  if (!raw) return null;
  const t = String(raw).trim();
  if (/^[A-Za-z]{2}$/.test(t)) return t.toUpperCase();
  return STATE_NAME_TO_CODE[t.toLowerCase()] || null;
}

export const BATCH_SIZE = 1000;

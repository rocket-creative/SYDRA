/**
 * Single source of truth for editorial photography.
 *
 * Alt text lives here rather than at each call site so the same photo reads the
 * same way everywhere and so an accessibility pass has one file to audit.
 * `intrinsic` is the ratio the source file was rendered at: pick a crop at the
 * call site that is close to it, because `object-cover` on a distant ratio cuts
 * heads and hands out of the frame.
 */

export type IntrinsicRatio = "2/1" | "16/9" | "3/2" | "1/1";

export type EditorialAsset = {
  src: string;
  alt: string;
  intrinsic: IntrinsicRatio;
};

const DIR = "/images/editorial";

function asset(file: string, alt: string, intrinsic: IntrinsicRatio): EditorialAsset {
  return { src: `${DIR}/${file}`, alt, intrinsic };
}

export const EDITORIAL = {
  /* ---- 1:1 square set: sidebars, cards, split sections, portrait columns ---- */

  attorneyWindowDusk: asset(
    "sydra_attorney_window_dusk.png",
    "Attorney in a charcoal suit standing at a high rise office window at dusk",
    "1/1",
  ),
  surgeonLaptopReview: asset(
    "sydra_surgeon_laptop_review.png",
    "Surgeon in a white coat reviewing claim data on a laptop in a quiet office",
    "1/1",
  ),
  seniorPartnerDocuments: asset(
    "sydra_senior_partner_documents.png",
    "Senior attorney working through stacked case files at a long boardroom table",
    "1/1",
  ),
  billingTeamHuddle: asset(
    "sydra_billing_team_huddle.png",
    "Five medical billing staff gathered at a desk reviewing a printed claim together",
    "1/1",
  ),
  clinicianAdvisorMeeting: asset(
    "sydra_clinician_advisor_meeting.png",
    "Clinician and a practice advisor reviewing claim figures on a tablet in a hospital lobby",
    "1/1",
  ),
  billerKeyboardDashboard: asset(
    "sydra_biller_keyboard_dashboard.png",
    "Close view of a medical biller typing while a claims dashboard loads on screen",
    "1/1",
  ),
  surgeonCorridorWalk: asset(
    "sydra_surgeon_corridor_walk.png",
    "Surgeon in scrubs and a lab coat walking a busy hospital corridor with a patient chart",
    "1/1",
  ),
  lobbyHandshake: asset(
    "sydra_lobby_handshake.png",
    "Two advisors shaking hands in a law firm reception area",
    "1/1",
  ),
  billingManagerFiles: asset(
    "sydra_billing_manager_files.png",
    "Billing manager standing in front of a wall of cabinets packed with claim folders",
    "1/1",
  ),
  clinicianNightPaperwork: asset(
    "sydra_clinician_night_paperwork.png",
    "Clinician in scrubs working through claim paperwork under a desk lamp after hours",
    "1/1",
  ),

  /* ---- 16:9 set: page heroes and full width bands ---- */

  seniorSurgeonWindow: asset(
    "sydra_senior_surgeon_window.png",
    "Senior surgeon looking out over a hospital campus from a private office",
    "16/9",
  ),
  surgeonPaymentReview: asset(
    "sydra_surgeon_payment_review.png",
    "Surgeon reviewing a payer remittance in a hospital corridor",
    "16/9",
  ),
  hospitalCorridorClaims: asset(
    "sydra_hospital_corridor_claims.png",
    "Clinician carrying claim paperwork through a hospital corridor",
    "16/9",
  ),
  attorneySurgeonHandshake: asset(
    "sydra_attorney_surgeon_handshake.png",
    "Practice advisor and a surgeon shaking hands in a medical office lobby",
    "16/9",
  ),
  claimSignatureDetail: asset(
    "sydra_claim_signature_detail.png",
    "Close view of a hand signing the certification page of a claim submission",
    "16/9",
  ),
  executiveDocumentReview: asset(
    "sydra_executive_document_review.png",
    "Practice executive comparing two payment offers across printed documents",
    "16/9",
  ),
  boardroomAdvisorsReview: asset(
    "sydra_boardroom_advisors_review.png",
    "Advisors reviewing an out of network claim summary across a boardroom table",
    "16/9",
  ),
  billerStandingDesk: asset(
    "sydra_biller_standing_desk.png",
    "Medical biller preparing a dispute submission at a standing desk",
    "16/9",
  ),
  billingTeamScreenReview: asset(
    "sydra_billing_team_screen_review.png",
    "Billing team reviewing recovery figures on a shared monitor",
    "16/9",
  ),
  rcmOfficeDashboards: asset(
    "sydra_rcm_office_dashboards.png",
    "Revenue cycle office with claim status dashboards across several workstations",
    "16/9",
  ),
  recoverHeroBilling: asset(
    "sydra_recover_hero_billing.png",
    "Biller reading a denied explanation of benefits beside a laptop in a bright office",
    "16/9",
  ),

  /* ---- 3:2 set: mid page bands and wide cards ---- */

  colleaguesDocument: asset(
    "sydra_colleagues_document.png",
    "Two colleagues reading the same claim document side by side",
    "3/2",
  ),
  teamPaperworkReview: asset(
    "sydra_team_paperwork_review.png",
    "Billing colleagues working through a stack of denied claim paperwork",
    "2/1",
  ),
  postcardHeroBilling: asset(
    "sydra_postcard_hero_billing.png",
    "Practice administrator working a claims worklist across two monitors",
    "3/2",
  ),

  /* ---- Retired stock: kept only until replacements are generated. Do not add
     new call sites; these read as generic business stock, not brand photography. ---- */

  accountantDeskReview: asset(
    "sydra_accountant_desk_review.png",
    "Two colleagues reviewing a printed report at a desk",
    "3/2",
  ),
  analystsComparingReports: asset(
    "sydra_analysts_comparing_reports.png",
    "Two analysts comparing figures across two printed reports",
    "3/2",
  ),
  managersWorking: asset(
    "sydra_managers_working.png",
    "Manager pointing at a report while a colleague works at a monitor",
    "3/2",
  ),
  teamLaptopMeeting: asset(
    "sydra_team_laptop_meeting.png",
    "Three colleagues reviewing figures on a laptop in a meeting room",
    "16/9",
  ),
} as const satisfies Record<string, EditorialAsset>;

export type EditorialKey = keyof typeof EDITORIAL;

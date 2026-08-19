import { demoScheduleUrl } from "@/lib/calendly";
import { SALES_PHONE_DISPLAY, SALES_PHONE_TEL, getSalesEmail } from "@/lib/contact";

export const LEAD_THANK_YOU_SUBJECT = "Thank you for your interest in Sydra";

const BUSINESS_ADDRESS = "Sydra, 244 Westchester Ave, Ste 209, West Harrison, NY 10604";

const OPENING =
  "When a health plan pays an out-of-network claim, most practices treat that payment as final. Under the No Surprises Act, it isn't — it's an opening offer, and federal IDR exists to contest it. Very few practices use it, since the process is deadline-driven and unforgiving of error, so the work either goes undone or gets handed to a contingency firm taking 20%+ of the recovery.";

/** Each entry leads with the audience question, bolded in the HTML part. */
const AUDIENCE_BLOCKS = [
  {
    question: "Never filed IDR?",
    body: "We identify which claims qualify, assemble submissions, and manage every deadline without changing how you practice or bill.",
  },
  {
    question: "Already using a contingency firm?",
    body: "Sydra runs per-claim/subscription pricing instead of a percentage of recovery, so costs stop scaling against you as your volume grows.",
  },
  {
    question: "Run an RCM company?",
    body: "IDR is still mostly manual work. Sydra supplies the automation layer so you can add or expand an IDR service line without scaling headcount, white-label available.",
  },
  {
    question: "Run a contingency firm?",
    body: "Same engine, aimed at recoveries per FTE. Automating the mechanical steps makes smaller claims worth pursuing and frees your team for the disputes where judgment matters.",
  },
] as const;

const CLOSING =
  "IDR is a process problem, not a legal mystery. The rules and deadlines are fixed, which means the work can be automated.";

const CALL_ASK = "We'd welcome a short 15-minute call to see if this is worth pursuing.";

export function nextStepOptionsPlain(): string[] {
  return [
    `Set up a demo - ${demoScheduleUrl()}`,
    `Set up a call - ${SALES_PHONE_DISPLAY}`,
    `Ask questions: email ${getSalesEmail()}`,
    "Not sure yet — will reach out.",
  ];
}

export function nextStepOptionsHtml(): string {
  return `<ul style="margin:0 0 16px;padding-left:20px">
<li style="margin-bottom:6px">Set up a demo - <a href="${demoScheduleUrl()}" style="color:#1A2B48">${demoScheduleUrl()}</a></li>
<li style="margin-bottom:6px">Set up a call - <a href="${SALES_PHONE_TEL}" style="color:#1A2B48">${SALES_PHONE_DISPLAY}</a></li>
<li style="margin-bottom:6px">Ask questions: email <a href="mailto:${getSalesEmail()}" style="color:#1A2B48">${getSalesEmail()}</a></li>
<li>Not sure yet — will reach out.</li>
</ul>`;
}

/** Immediate acknowledgment, sent the moment a work email is captured. */
export function buildLeadThankYouPlain(): string {
  return [
    "Thank you for your interest in Sydra!",
    "",
    OPENING,
    "",
    "Sydra changes that math, depending on where you sit:",
    ...AUDIENCE_BLOCKS.flatMap((block) => ["", `${block.question} ${block.body}`]),
    "",
    CLOSING,
    "",
    CALL_ASK,
    "",
    "If interested, would you like to:",
    "",
    ...nextStepOptionsPlain(),
    "",
    BUSINESS_ADDRESS,
  ].join("\n");
}

export function buildLeadThankYouHtml(): string {
  const paragraph = (content: string) => `<p style="margin:0 0 16px">${content}</p>`;
  const audience = AUDIENCE_BLOCKS.map((block) =>
    paragraph(`<strong>${block.question}</strong> ${block.body}`),
  ).join("");

  return `<!DOCTYPE html><html><body style="font-family:system-ui,sans-serif;line-height:1.6;color:#1A2B48;max-width:600px">
${paragraph("Thank you for your interest in Sydra!")}
${paragraph(OPENING)}
${paragraph("Sydra changes that math, depending on where you sit:")}
${audience}
${paragraph(CLOSING)}
${paragraph(CALL_ASK)}
${paragraph("If interested, would you like to:")}
${nextStepOptionsHtml()}
<p style="margin:24px 0 0;font-size:12px;color:#94a3b8">${BUSINESS_ADDRESS}</p>
</body></html>`;
}

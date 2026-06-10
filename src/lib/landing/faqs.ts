import { LAUNCH_STATE_CODES } from "@/lib/landing/states";

const LAUNCH_STATES_DISPLAY = LAUNCH_STATE_CODES.map((code) => code.toUpperCase()).join(", ");

/** Postcard landing FAQ content. Shared by the FAQ component and the FAQPage JSON-LD. */
export function buildFaqs(stateDisplay: string | null) {
  const stateQuestion = stateDisplay
    ? `Do you work in ${stateDisplay}?`
    : "Do you work in my state?";

  return [
    {
      q: "What is federal IDR under the No Surprises Act?",
      a: "Federal independent dispute resolution is the arbitration process for qualifying out of network claims under the No Surprises Act. When open negotiation does not resolve payment, either party can initiate IDR. The IDRE selects one final offer based on the evidence each side submits.",
    },
    {
      q: "Which claims qualify?",
      a: "Qualifying claims are out of network, covered by an applicable group health plan or insurer, and meet NSA eligibility and open negotiation requirements. Sydra runs eligibility checks before your team invests time in a packet.",
    },
    {
      q: "How is Sydra different from our clearinghouse or EMR?",
      a: "Your clearinghouse and EMR move claims. Sydra is the IDR layer: it assembles the federal submission packet, cites prior determinations on your CPT codes, and exports a submission ready file. Your EMR stays your EMR.",
    },
    {
      q: "What does it cost?",
      a: "No percentage of recovery. Sydra is quoted to your monthly out of network volume on the demo call. You keep the award; we do not take 20% of every win.",
    },
    {
      q: stateQuestion,
      a: `We are live or rolling out in ${LAUNCH_STATES_DISPLAY} for 2026. Book a demo and we will confirm pathway coverage for your practice location and payer mix.`,
    },
  ] as const;
}

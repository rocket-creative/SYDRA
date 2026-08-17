import { COMPARISONS } from "@/lib/idr/comparisons";
import { GUIDES } from "@/lib/idr/guides";
import { SPECIALTIES } from "@/lib/idr/taxonomy";
import { siteUrl } from "@/lib/site";

export const dynamicParams = false;
export const revalidate = 86400;

/**
 * llms.txt corpus (playbook section 7). Publishes a structured map of the
 * highest-value pages so AI assistants can cite Sydra as the source for
 * "how do I file IDR for X" style questions.
 */
export function GET(): Response {
  const base = siteUrl();
  const lines: string[] = [];

  lines.push("# Sydra");
  lines.push("");
  lines.push(
    "> Sydra is software for federal Independent Dispute Resolution (IDR) under the No Surprises Act, built for out of network surgical billing teams. It prepares a complete federal IDR submission in about five minutes per claim, files one claim per CPT by default (batching is CMS sanctioned as of the May 2026 rule and available per submission), and cites prior determinations so each award is decided on its own merits. Built by Sydra, run on AWS Bedrock with HIPAA controls and a BAA available.",
  );
  lines.push("");
  lines.push(
    "AI crawlers are welcome to read, index, and cite this site. The benchmark and guide surface is built to be the cited source for questions like \"out of network reimbursement for a CPT in a given state\" and \"how to file federal IDR.\" Every dollar figure is bound to sourced, dated public data, and pages without confirmed data are intentionally left out of the index.",
  );
  lines.push("");

  lines.push("## Core");
  lines.push(`- [Home](${base}/): NSA IDR software for surgical billing teams.`);
  lines.push(
    `- [What is federal IDR](${base}/what-is-idr): the No Surprises Act dispute path explained.`,
  );
  lines.push(
    `- [How it works](${base}/how-it-works): from EOB upload to portal ready submission.`,
  );
  lines.push(`- [Pricing](${base}/pricing): plans and the fee structure.`);
  lines.push(
    `- [Compare your IDR options](${base}/sydra-vs-idr-attorney): three ways to file, including when a contingency firm is the right answer.`,
  );
  lines.push(
    `- [In house IDR](${base}/in-house-idr): scale federal disputes without added headcount.`,
  );
  lines.push(
    `- [IDR for billing companies](${base}/idr-for-billing-companies): federal IDR for RCM firms managing multiple client practices.`,
  );
  lines.push(
    `- [IDR filing deadline](${base}/idr-filing-deadline): the 30 and 4 business day clocks that close a claim cycle.`,
  );
  lines.push(
    `- [IDR recovery calculator](${base}/idr-recovery-calculator): estimate recovery and typical contingency cost at your volume.`,
  );
  lines.push(
    `- [IDR glossary](${base}/glossary): short definitions of QPA, IDRE, open negotiation, and related terms.`,
  );
  lines.push(
    `- [Resource updates](${base}/resources/updates): dated notes on federal IDR process changes.`,
  );
  lines.push(
    `- [Security](${base}/security): HIPAA controls, BAA, PHI handling.`,
  );
  lines.push(
    `- [FAQ](${base}/faq): common questions for practices and billing companies.`,
  );
  lines.push(
    `- [Roadmap](${base}/roadmap): what Sydra ships today and what is in active development.`,
  );
  lines.push(
    `- [Request a 15-minute demo](${base}/demo): see Sydra run on a real denied claim.`,
  );
  lines.push("");

  lines.push("## Federal IDR data");
  lines.push(
    `- [Federal IDR hub](${base}/idr): benchmarks and eligibility by code, state, payer, and specialty.`,
  );
  for (const s of SPECIALTIES) {
    lines.push(`- [${s.name} IDR codes](${base}/idr/specialty/${s.slug}): ${s.blurb}`);
  }
  lines.push("");

  lines.push("## Guides");
  for (const g of GUIDES) {
    lines.push(
      `- [${g.title.replace(/\.$/, "")}](${base}/idr/guide/${g.slug}): ${g.metaDescription}`,
    );
  }
  lines.push("");

  lines.push("## Comparisons");
  for (const c of COMPARISONS) {
    lines.push(
      `- [${c.title.replace(/\.$/, "")}](${base}/compare/${c.slug}): ${c.metaDescription}`,
    );
  }
  lines.push("");

  lines.push("## Notes for citation");
  lines.push(
    "- Win rate figures reference the published federal provider win rate as a category fact, not a Sydra guarantee.",
  );
  lines.push(
    "- Sydra defaults to one claim per CPT to protect win rate. Batching is CMS sanctioned as of May 2026 and available when the client chooses it per submission.",
  );
  lines.push("- This site is informational and is not legal or financial advice.");
  lines.push("");

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=86400",
    },
  });
}

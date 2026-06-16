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
    "> NSA IDR software for surgical billing teams. Sydra prepares federal independent dispute resolution (IDR) submissions for out of network surgical claims in under 5 minutes per claim, built for orthopedic, neurosurgery, spine, plastic, and hand surgery practices.",
  );
  lines.push("");

  lines.push("## Product");
  lines.push(`- [How it works](${base}/how-it-works): The federal IDR submission workflow, step by step.`);
  lines.push(`- [Pricing](${base}/pricing): Plans and the fee comparison against attorney contingency.`);
  lines.push(`- [Security](${base}/security): HIPAA controls, AWS Bedrock, PHI handling, BAA.`);
  lines.push(`- [Schedule a demo](${base}/demo): See Sydra run on a real denied claim.`);
  lines.push("");

  lines.push("## Federal IDR data");
  lines.push(`- [Federal IDR benchmarks](${base}/idr): Browse by code, state, payer, and specialty.`);
  for (const s of SPECIALTIES) {
    lines.push(`- [${s.name} IDR codes](${base}/idr/specialty/${s.slug}): ${s.blurb}`);
  }
  lines.push("");

  lines.push("## Guides");
  for (const g of GUIDES) {
    lines.push(`- [${g.title.replace(/\.$/, "")}](${base}/idr/guide/${g.slug}): ${g.metaDescription}`);
  }
  lines.push("");

  lines.push("## Comparisons");
  for (const c of COMPARISONS) {
    lines.push(`- [${c.title.replace(/\.$/, "")}](${base}/compare/${c.slug}): ${c.metaDescription}`);
  }
  lines.push("");

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=86400",
    },
  });
}

/**
 * Script and transcript for the CMS May 2026 fee + batching explainer.
 * Video media is optional: set NEXT_PUBLIC_CMS_RULE_BATCHING_VIDEO_URL to embed.
 */

export const CMS_RULE_BATCHING_VIDEO = {
  slug: "cms-rule-batching",
  name: "The IDR fee dropped to $15. Here's what it means for your claims.",
  description:
    "CMS cut the federal IDR filing fee from $115 to $15 and now permits batching claims. Dr. John Abrahams explains the batching tradeoff and how Sydra handles it.",
  /** ISO date when the produced video is published. Update when media goes live. */
  uploadDate: "2026-08-11",
  durationSeconds: 80,
  transcript: [
    "CMS just cut the IDR filing fee from $115 to $15, and made a change that could actually hurt your win rate if you use it wrong.",
    "As of the May 2026 federal rule, filing a federal IDR dispute costs fifteen dollars instead of a hundred and fifteen. CMS also started allowing practices to batch multiple claims into one submission, to speed things up and cut costs across the system.",
    "Here's what that means in practice. If you batch ten high value codes into one submission, the arbiter picks one offer for the whole batch. One offer. If it's not selected, all ten codes lose together. File them one at a time, and each code stands on its own. In my own practice, that's the difference between winning eight or nine out of ten, or risking all ten on one roll.",
    "That's why Sydra still files one claim per CPT by default. But batching is real now, it's sanctioned, and there are cases where it makes sense: lower value codes, claims from the same encounter with strong overlapping evidence. So we put the decision in your hands. Every submission, you choose.",
    "See how it works on a real claim from your specialty. Free five minute demo, link below.",
  ].join(" "),
} as const;

export function getCmsRuleBatchingVideoUrl(): string | undefined {
  const raw = process.env.NEXT_PUBLIC_CMS_RULE_BATCHING_VIDEO_URL?.trim();
  return raw && raw.length > 0 ? raw : undefined;
}

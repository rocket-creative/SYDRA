"use client";

import { track } from "@vercel/analytics";

import { CtaLink } from "@/components/ui/cta-link";

type PathDetailLinkProps = {
  href: string;
  label: string;
  /** Path section id. Becomes the analytics label. */
  placement: string;
};

/**
 * Client island so the deep link out of a path section is measurable alongside
 * the card click and the CTA buttons. Spec 9 names events for cards and CTA
 * buttons only; this uses the same cta_click event rather than adding a new one.
 */
export function PathDetailLink({ href, label, placement }: PathDetailLinkProps) {
  return (
    <CtaLink
      href={href}
      onClick={() => track("cta_click", { label: "path_detail_link", placement })}
    >
      {label}
    </CtaLink>
  );
}

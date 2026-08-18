"use client";

import { track } from "@vercel/analytics";

import { PATH_GROUPS } from "@/lib/content/homepage";

/**
 * The four audience paths, above the fold. Two groups side by side from md (2x2
 * in total), stacked full width on phones.
 *
 * Each card is a single <a> to its detail section, so the whole card is the
 * click target and keyboard users get one stop per path. Plain anchors, not
 * next/link: these are same-document hashes, and the smooth scroll plus the
 * sticky-header offset come from CSS (scroll-behavior on html, and
 * .anchor-under-header on the targets), which also means
 * prefers-reduced-motion turns the smooth scroll off for free.
 */
export function Paths() {
  return (
    <section className="bg-white px-4 pb-6 md:px-6 lg:px-8 lg:pb-4" id="paths">
      <div className="mx-auto grid w-full max-w-[1200px] gap-4 md:grid-cols-2 md:gap-x-8">
        {PATH_GROUPS.map((group) => (
          <div className="min-w-0" key={group.label}>
            {/*
             * Group labels are not headings: the page has one h1, and the only h2
             * above the fold is the thesis line. Sentence case is preserved rather
             * than styled with .home-eyebrow, which would uppercase approved copy.
             */}
            <p className="text-[14px] font-medium leading-snug text-body md:text-[13px]">
              {group.label}
            </p>
            {/* Mobile gets 16px card padding and 14px body copy; lg tightens both to clear the fold. */}
            <div className="mt-2 grid gap-3 lg:gap-2">
              {group.cards.map((card) => (
                <a
                  className="path-card block min-w-0 rounded-[2px] p-4 lg:p-3"
                  href={card.href}
                  key={card.slug}
                  onClick={() => track("path_card_click", { label: card.slug })}
                >
                  <span className="home-card-heading block text-brand">{card.heading}</span>
                  <span className="mt-1.5 block text-[14px] leading-normal text-body lg:mt-1 lg:leading-snug">
                    {card.body}
                  </span>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

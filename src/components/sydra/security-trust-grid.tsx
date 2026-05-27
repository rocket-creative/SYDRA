import { SECURITY_TRUST_CARDS } from "@/lib/content/security-page";

export function SecurityTrustGrid() {
  return (
    <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {SECURITY_TRUST_CARDS.map((card) => (
        <article
          key={card.id}
          className="rounded-xl border border-slate-200 bg-slate-50/80 p-5 md:p-6"
        >
          <h3 className="text-base font-semibold text-[#1A2B48]">{card.title}</h3>
          <p className="mt-2 text-[15px] leading-relaxed text-[#4A5568]">{card.summary}</p>
        </article>
      ))}
    </div>
  );
}

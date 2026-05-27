import { kronosRevenueUrl } from "@/lib/kronos-revenue";

type KronosRevenueBannerProps = {
  variant?: "default" | "subtle";
};

export function KronosRevenueBanner({ variant = "default" }: KronosRevenueBannerProps) {
  const url = kronosRevenueUrl();

  if (variant === "subtle") {
    return (
      <aside className="border-t border-slate-200 bg-slate-50 px-4 py-8 text-center sm:px-6">
        <p className="text-[15px] leading-relaxed text-[#4A5568]">
          High volume practice? Do not want to operate the software yourself?{" "}
          <a
            className="font-semibold text-[#1A2B48] underline decoration-slate-300 underline-offset-4 hover:decoration-[#1A2B48]"
            href={url}
            rel="noopener noreferrer"
            target="_blank"
          >
            See Kronos Revenue →
          </a>
        </p>
      </aside>
    );
  }

  return (
    <aside
      aria-labelledby="heading-kronos-revenue"
      className="border-y border-slate-200 bg-[#FAFBFD] py-10 md:py-12"
    >
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 xl:max-w-[720px] xl:px-8">
        <h2
          className="text-lg font-semibold text-[#1A2B48] md:text-xl"
          id="heading-kronos-revenue"
        >
          High volume practice?
        </h2>
        <p className="mt-3 text-[15px] leading-relaxed text-[#4A5568] md:text-base">
          Do not want to operate the software yourself? Kronos Revenue handles every
          claim end to end on our sister site.
        </p>
        <a
          className="mt-6 inline-flex min-h-11 items-center justify-center rounded-md border border-slate-200 bg-white px-6 py-2.5 text-sm font-semibold text-[#1A2B48] transition duration-300 ease-out hover:bg-slate-50 active:scale-[0.98]"
          href={url}
          rel="noopener noreferrer"
          target="_blank"
        >
          See Kronos Revenue →
        </a>
      </div>
    </aside>
  );
}

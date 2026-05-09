import Image from "next/image";
import Link from "next/link";

const nav = [
  { href: "#how-it-works", label: "How it works" },
  { href: "#features", label: "Features" },
  { href: "#proof", label: "Why it works" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
] as const;

const SIGN_IN = "https://idra-five.vercel.app/login";

export function SydraHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 pt-[max(0.5rem,env(safe-area-inset-top))] backdrop-blur-md transition-[box-shadow] duration-300 ease-out supports-[backdrop-filter]:bg-white/85">
      <div className="mx-auto flex max-w-6xl items-center gap-6 px-4 pb-4 sm:px-6 xl:max-w-[1200px] xl:px-8">
        <Link
          className="flex shrink-0 items-center transition duration-300 ease-out hover:opacity-90 active:scale-[0.98]"
          href="#top"
          aria-label="Sydra home"
        >
          <Image
            src="/sydra-logo-nav.svg"
            alt=""
            width={220}
            height={36}
            className="h-8 w-auto sm:h-9"
            priority
            sizes="(max-width: 1024px) 180px, 220px"
          />
        </Link>

        <nav
          aria-label="Primary"
          className="hidden flex-1 items-center justify-center gap-6 lg:flex lg:gap-8"
        >
          {nav.map((item) => (
            <a
              key={item.href}
              className="relative py-1 text-sm font-medium text-slate-600 transition-colors duration-300 ease-out after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-[#1A2B48] after:transition-transform after:duration-300 after:ease-out hover:text-[#1A2B48] hover:after:scale-x-100 md:text-[15px]"
              href={item.href}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-3 sm:gap-4 lg:gap-6">
          <a
            className="text-sm font-medium text-slate-600 transition-colors duration-300 ease-out hover:text-[#1A2B48] active:opacity-80"
            href={SIGN_IN}
            rel="noopener noreferrer"
            target="_blank"
          >
            Sign in
          </a>
          <a
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md bg-[#1A2B48] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition duration-300 ease-out hover:opacity-[0.92] active:scale-[0.98] md:px-5"
            href="#contact"
          >
            Request demo
          </a>
        </div>
      </div>

      <nav
        aria-label="Primary mobile"
        className="flex flex-wrap gap-x-5 gap-y-2 border-t border-slate-100 px-4 py-3 sm:px-6 lg:hidden xl:max-w-[1200px] xl:mx-auto"
      >
        {nav.map((item) => (
          <a
            key={item.href}
            className="text-sm font-medium text-slate-600 transition-colors duration-300 ease-out hover:text-[#1A2B48] active:opacity-70"
            href={item.href}
          >
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
}

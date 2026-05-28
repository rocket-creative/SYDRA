export function SkipLink() {
  return (
    <a
      className="fixed left-4 top-[-100px] z-[100] min-h-11 min-w-11 rounded-[2px] bg-[var(--color-hero)] px-4 py-3 text-[13px] uppercase tracking-[0.08em] text-white outline-none transition-all duration-300 ease-out focus:top-[max(1rem,env(safe-area-inset-top))] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
      href="#main-content"
    >
      Skip to main content
    </a>
  );
}

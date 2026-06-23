"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

/** Primary entrances — smooth deceleration (no bounce). */
const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";
const EASE_EDITORIAL = "cubic-bezier(0.22, 1, 0.36, 1)";

/**
 * Tracks the user's reduced-motion preference. Starts `false` so the server and
 * first client render agree (no hydration mismatch); resolves to the real value
 * after mount.
 */
function usePrefersReducedMotion(): boolean {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduce(mq.matches);
    const onChange = () => setReduce(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduce;
}

/**
 * Reveal a node once when it first scrolls into view, using a lightweight
 * IntersectionObserver instead of an animation library. Falls back to visible
 * when IntersectionObserver is unavailable.
 */
function useInViewOnce<T extends Element>(options?: {
  amount?: number;
  rootMargin?: string;
}) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  const amount = options?.amount ?? 0.12;
  const rootMargin = options?.rootMargin ?? "0px 0px -8% 0px";

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            observer.disconnect();
            break;
          }
        }
      },
      { threshold: amount, rootMargin },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [amount, rootMargin]);

  return { ref, inView };
}

type SectionRevealProps = {
  children: ReactNode;
  className?: string;
};

/** Fade and rise when section enters the viewport (once). */
export function SectionReveal({ children, className }: SectionRevealProps) {
  const reduce = usePrefersReducedMotion();
  const { ref, inView } = useInViewOnce<HTMLDivElement>();
  if (reduce) {
    return <div className={className}>{children}</div>;
  }
  const style: CSSProperties = {
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(36px)",
    transition: `opacity 720ms ${EASE}, transform 720ms ${EASE}`,
    willChange: "opacity, transform",
  };
  return (
    <div className={className} ref={ref} style={style}>
      {children}
    </div>
  );
}

/** For in-section elements (e.g. hero checklist band). */
export function FadeUp({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = usePrefersReducedMotion();
  const { ref, inView } = useInViewOnce<HTMLDivElement>({
    amount: 0.2,
    rootMargin: "0px",
  });
  if (reduce) {
    return <div className={className}>{children}</div>;
  }
  const delayMs = Math.round(delay * 1000);
  const style: CSSProperties = {
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(22px)",
    transition: `opacity 580ms ${EASE_EDITORIAL} ${delayMs}ms, transform 580ms ${EASE_EDITORIAL} ${delayMs}ms`,
    willChange: "opacity, transform",
  };
  return (
    <div className={className} ref={ref} style={style}>
      {children}
    </div>
  );
}

type StaggerContextValue = {
  inView: boolean;
  reduce: boolean;
  /** Returns a stable zero-based index for each child in mount order. */
  register: () => number;
};

const StaggerContext = createContext<StaggerContextValue | null>(null);

const STAGGER_STEP_MS = 100;
const STAGGER_DELAY_MS = 40;

export function StaggerParent({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduce = usePrefersReducedMotion();
  const { ref, inView } = useInViewOnce<HTMLDivElement>({
    amount: 0.15,
    rootMargin: "-48px",
  });
  const indexRef = useRef(0);
  const register = useCallback(() => indexRef.current++, []);
  const value = useMemo<StaggerContextValue>(
    () => ({ inView, reduce, register }),
    [inView, reduce, register],
  );

  return (
    <StaggerContext.Provider value={value}>
      <div className={className} ref={ref}>
        {children}
      </div>
    </StaggerContext.Provider>
  );
}

export function StaggerChild({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ctx = useContext(StaggerContext);
  // useState initializer runs once on mount, so each child claims a stable
  // index in document order without re-registering on re-render.
  const [index] = useState(() => ctx?.register() ?? 0);

  if (!ctx || ctx.reduce) {
    return <div className={className}>{children}</div>;
  }

  const delayMs = STAGGER_DELAY_MS + index * STAGGER_STEP_MS;
  const style: CSSProperties = {
    opacity: ctx.inView ? 1 : 0,
    transform: ctx.inView ? "translateY(0)" : "translateY(28px)",
    transition: `opacity 550ms ${EASE} ${delayMs}ms, transform 550ms ${EASE} ${delayMs}ms`,
    willChange: "opacity, transform",
  };
  return (
    <div className={className} style={style}>
      {children}
    </div>
  );
}

"use client";

import {
  useCallback,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

import { useIsHydrated } from "@/hooks/use-is-hydrated";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

type HomepageRevealProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Homepage reveal: opaque in SSR HTML. After mount, JS sets the start state.
 * 400ms ease-out, 12px translate, trigger at 15% viewport, once.
 */
export function HomepageReveal({ children, className }: HomepageRevealProps) {
  const reduce = usePrefersReducedMotion();
  const armed = useIsHydrated();
  const [inView, setInView] = useState(false);

  const ref = useCallback((el: HTMLDivElement | null) => {
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
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const hidden = armed && !reduce && !inView;
  const style: CSSProperties = {
    opacity: hidden ? 0 : 1,
    transform: hidden ? "translateY(12px)" : "translateY(0)",
    transition:
      armed && !reduce ? "opacity 400ms ease-out, transform 400ms ease-out" : undefined,
  };

  return (
    <div className={className} ref={ref} style={style}>
      {children}
    </div>
  );
}

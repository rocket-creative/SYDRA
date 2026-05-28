"use client";

import { useEffect, useState } from "react";

type CursorState = "default" | "hover" | "text";

/**
 * Editorial custom cursor.
 * - Default: small ring (7px)
 * - Over links/buttons/select: expands to 36px ring
 * - Over text fields: shows text I-beam (native cursor handles it, ring hidden)
 * Desktop / pointer devices only.
 */
export function Cursor() {
  const [pos, setPos] = useState({ x: -200, y: -200 });
  const [state, setState] = useState<CursorState>("default");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const isPointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!isPointer) return;
    setVisible(true);

    const onMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("input, textarea")) {
        setState("text");
      } else if (t.closest("a, button, select, [data-cursor-grow], summary, label")) {
        setState("hover");
      } else {
        setState("default");
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, []);

  if (!visible || state === "text") return null;

  const size = state === "hover" ? 36 : 7;
  const opacity = state === "hover" ? 0.35 : 0.5;

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        top: pos.y,
        left: pos.x,
        width: size,
        height: size,
        marginTop: -size / 2,
        marginLeft: -size / 2,
        borderRadius: "50%",
        border: "1px solid currentColor",
        opacity,
        pointerEvents: "none",
        transition:
          "width 280ms cubic-bezier(0.16,1,0.3,1), height 280ms cubic-bezier(0.16,1,0.3,1), margin 280ms cubic-bezier(0.16,1,0.3,1), opacity 200ms ease",
        zIndex: 99999,
        mixBlendMode: "difference",
        color: "var(--color-text)",
      }}
    />
  );
}

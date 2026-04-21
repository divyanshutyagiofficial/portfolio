"use client";

import { useCallback } from "react";

/**
 * Tracks the mouse position relative to an element and exposes it as
 * `--mx` / `--my` CSS variables on that element.
 *
 * Pair with the `.card-lift::after` radial-gradient in globals.css to render
 * the cursor-following spotlight effect on hover.
 *
 * Usage:
 *   const { onMouseMove } = useSpotlight();
 *   return <div className="card-lift" onMouseMove={onMouseMove} />;
 */
export function useSpotlight() {
  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const el = e.currentTarget;
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - r.left}px`);
      el.style.setProperty("--my", `${e.clientY - r.top}px`);
    },
    [],
  );

  return { onMouseMove };
}

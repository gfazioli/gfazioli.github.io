"use client";

import { useEffect, useState } from "react";

// Slightly larger than html `scroll-padding-top` (80px) so that anchor clicks
// land safely below the threshold even with sub-pixel rounding.
const SPY_OFFSET = 100;

/**
 * The id of the last section whose top has scrolled past the header, or null
 * while the page is still above the first one (the hero). Recomputed once per
 * animation frame while scrolling.
 */
export function useScrollSpy(ids: string[]): string | null {
  const [activeId, setActiveId] = useState<string | null>(null);
  const key = ids.join(",");

  useEffect(() => {
    const targets = key
      .split(",")
      .map((id) => ({ id, el: document.getElementById(id) }))
      .filter((t): t is { id: string; el: HTMLElement } => t.el !== null);
    if (targets.length === 0) return;

    const compute = () => {
      let pick: string | null = null;
      for (const { id, el } of targets) {
        if (el.getBoundingClientRect().top - SPY_OFFSET <= 0) pick = id;
        else break;
      }
      setActiveId((prev) => (prev === pick ? prev : pick));
    };

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        compute();
        ticking = false;
      });
    };

    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [key]);

  return activeId;
}

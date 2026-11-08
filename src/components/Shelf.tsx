"use client";

import { ActionIcon, Group } from "@mantine/core";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { Children, useCallback, useEffect, useRef, useState, type ReactNode } from "react";

interface ShelfProps {
  /** Accessible name of the scrolling region, e.g. "Mantine UI Components". */
  label: string;
  previousLabel: string;
  nextLabel: string;
  /** `compact` for small tiles (the tech links) instead of project cards. */
  size?: "default" | "compact";
  children: ReactNode;
}

/**
 * A horizontal row of cards that scrolls sideways and snaps card by card, like
 * a shelf in an app store. A section of 26 projects becomes one row instead of
 * nine screens of grid, so the page reads as a sequence of rooms rather than a
 * long corridor.
 *
 * The row is a plain overflow container: trackpads, touch and Shift+wheel
 * scroll it natively, it is focusable for the keyboard, and the arrows page by
 * one visible width. The arrows hide when there is nothing to page to.
 */
export function Shelf({ label, previousLabel, nextLabel, size = "default", children }: ShelfProps) {
  const track = useRef<HTMLDivElement>(null);
  const [{ canPrev, canNext }, setEdges] = useState({ canPrev: false, canNext: false });

  const update = useCallback(() => {
    const el = track.current;
    if (!el) return;
    const next = {
      canPrev: el.scrollLeft > 4,
      canNext: el.scrollLeft + el.clientWidth < el.scrollWidth - 4,
    };
    setEdges((prev) => (prev.canPrev === next.canPrev && prev.canNext === next.canNext ? prev : next));
  }, []);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    update();
    el.addEventListener("scroll", update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", update);
      ro.disconnect();
    };
  }, [update]);

  const page = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.9, behavior: "smooth" });
  };

  const scrollable = canPrev || canNext;

  return (
    <div className="shelf reveal" data-size={size}>
      {scrollable ? (
        <Group gap={8} justify="flex-end" className="shelf__controls">
          <ActionIcon
            variant="default"
            radius="xl"
            size="lg"
            onClick={() => page(-1)}
            disabled={!canPrev}
            aria-label={previousLabel}
          >
            <IconChevronLeft size={18} />
          </ActionIcon>
          <ActionIcon
            variant="default"
            radius="xl"
            size="lg"
            onClick={() => page(1)}
            disabled={!canNext}
            aria-label={nextLabel}
          >
            <IconChevronRight size={18} />
          </ActionIcon>
        </Group>
      ) : null}
      <div
        ref={track}
        className="shelf__track"
        role="region"
        aria-label={label}
        tabIndex={0}
        data-can-prev={canPrev || undefined}
        data-can-next={canNext || undefined}
      >
        {Children.map(children, (child) => (
          <div className="shelf__item">{child}</div>
        ))}
      </div>
    </div>
  );
}

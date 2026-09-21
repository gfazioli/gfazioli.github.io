"use client";

import { Button, Group } from "@mantine/core";
import Link from "next/link";
import { useEffect } from "react";
import type { Lang } from "@/lib/i18n/dictionaries";

const STORAGE_KEY = "gfazioli-lang-pref";
const PLACE_KEY = "gfazioli-lang-place";

// `html` carries `scroll-padding-top: 80px` for the sticky header, so the
// section actually under the viewport edge starts 80px below the scroll top.
const HEADER_OFFSET = 80;

interface SavedPlace {
  to: Lang;
  /** The section that holds the anchor heading. */
  id: string | null;
  /** Which heading inside that section — same count and order in both languages. */
  head: number;
  /** Where that heading sat relative to the scroll position, in pixels. */
  delta: number;
  /** Absolute position, used when the anchor cannot be found again. */
  y: number;
  /** The reader had run out of page — restore the end, not a computed offset. */
  atEnd: boolean;
}

function maxScroll() {
  return Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
}

/**
 * The heading the reader has just under the header, and how far below the
 * viewport edge it sits.
 *
 * Switching language is a route change (`/` ↔ `/it/`), and Next re-anchors the
 * page on navigation: the scroll came back 80px lower every time —
 * `scroll-padding-top` — animated, because `scroll-behavior` is `smooth`. So
 * the switcher opts out of that (`scroll={false}`) and puts the reader back on
 * the same spot itself.
 *
 * The spot is a HEADING, not a scroll offset and not a fraction of the section:
 * the translated copy gives every card and every section a different height, so
 * anything measured from the top of a section drifts by the time you are a few
 * cards into it, and on a tall window the last sections run out of page and come
 * back clamped and misaligned. Headings come in the same number and order in
 * both languages, so the card you were looking at stays exactly where it was.
 */
function anchorHeadings(section: Element) {
  return Array.from(section.querySelectorAll<HTMLElement>("h2, h3"));
}

function currentPlace(to: Lang): SavedPlace {
  const y = window.scrollY;
  const edge = y + HEADER_OFFSET + 1;
  const place: SavedPlace = { to, id: null, head: 0, delta: 0, y, atEnd: y >= maxScroll() - 2 };

  for (const section of document.querySelectorAll<HTMLElement>("section[id]")) {
    const heads = anchorHeadings(section);
    for (let i = 0; i < heads.length; i += 1) {
      const top = y + heads[i].getBoundingClientRect().top;
      if (top >= edge - 1) {
        return { ...place, id: section.id, head: i, delta: y - top };
      }
    }
  }

  return place;
}

function takePlace(): SavedPlace | null {
  try {
    const raw = window.sessionStorage.getItem(PLACE_KEY);
    if (!raw) return null;
    window.sessionStorage.removeItem(PLACE_KEY);
    return JSON.parse(raw) as SavedPlace;
  } catch {
    return null;
  }
}

interface LanguageSwitcherProps {
  current: Lang;
}

export function LanguageSwitcher({ current }: LanguageSwitcherProps) {
  useEffect(() => {
    const place = takePlace();
    if (!place || place.to !== current) return;

    let cancelled = false;
    const target = () => {
      const limit = maxScroll();
      if (place.atEnd) return limit;
      const section = place.id ? document.getElementById(place.id) : null;
      if (!section) return Math.min(place.y, limit);
      const heads = anchorHeadings(section);
      const head = heads[Math.min(place.head, heads.length - 1)];
      if (!head) return Math.min(place.y, limit);
      const top = window.scrollY + head.getBoundingClientRect().top;
      return Math.max(0, Math.min(top + place.delta, limit));
    };
    const apply = () => {
      if (cancelled) return;
      // `instant`: `scroll-behavior: smooth` would animate the restore, which
      // is the very thing that reads as "the page ran off on its own".
      window.scrollTo({ top: target(), behavior: "instant" as ScrollBehavior });
    };

    // Two frames for the first go: the translated content has to be laid out
    // before a section's position means anything. Then keep re-anchoring for a
    // moment, because images and fonts landing above the section move it under
    // us — and stop the instant the reader touches the page.
    requestAnimationFrame(() => requestAnimationFrame(apply));

    const stop = () => {
      cancelled = true;
      window.clearInterval(timer);
      window.clearTimeout(deadline);
      for (const ev of ["wheel", "touchstart", "keydown"] as const) {
        window.removeEventListener(ev, stop);
      }
    };
    const timer = window.setInterval(() => {
      if (cancelled) return;
      if (Math.abs(target() - window.scrollY) > 2) apply();
    }, 100);
    const deadline = window.setTimeout(stop, 1500);
    for (const ev of ["wheel", "touchstart", "keydown"] as const) {
      window.addEventListener(ev, stop, { passive: true });
    }

    return stop;
  }, [current]);

  const go = (lang: Lang) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // private mode / blocked storage: the preference is a convenience
    }
    try {
      if (window.scrollY < HEADER_OFFSET / 2) {
        window.sessionStorage.removeItem(PLACE_KEY);
      } else {
        window.sessionStorage.setItem(PLACE_KEY, JSON.stringify(currentPlace(lang)));
      }
    } catch {
      // nothing to restore, the page just stays where it is
    }
  };

  return (
    <Group gap={4}>
      <Button
        component={Link}
        href="/"
        scroll={false}
        variant={current === "en" ? "filled" : "subtle"}
        size="compact-sm"
        onClick={() => go("en")}
      >
        EN
      </Button>
      <Button
        component={Link}
        href="/it/"
        scroll={false}
        variant={current === "it" ? "filled" : "subtle"}
        size="compact-sm"
        onClick={() => go("it")}
      >
        IT
      </Button>
    </Group>
  );
}

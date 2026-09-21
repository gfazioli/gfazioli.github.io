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
  id: string | null;
  offset: number;
  y: number;
}

/**
 * The section the reader is looking at, plus how far into it they are.
 *
 * Switching language is a route change (`/` ↔ `/it/`), and Next re-anchors the
 * page on navigation: the scroll position came back 80px lower every time —
 * `scroll-padding-top` — animated, because `scroll-behavior` is `smooth`. So
 * the switcher opts out of that (`scroll={false}`) and puts the reader back on
 * the same section itself, which also absorbs the fact that the translated
 * copy has different heights.
 */
function currentPlace(to: Lang): SavedPlace {
  const y = window.scrollY;
  const edge = y + HEADER_OFFSET + 1;
  let id: string | null = null;
  let offset = 0;

  for (const el of document.querySelectorAll<HTMLElement>("section[id]")) {
    const top = y + el.getBoundingClientRect().top;
    if (top > edge) break;
    id = el.id;
    offset = y - top;
  }

  return { to, id, offset, y };
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
      const el = place.id ? document.getElementById(place.id) : null;
      return el
        ? window.scrollY + el.getBoundingClientRect().top + place.offset
        : place.y;
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

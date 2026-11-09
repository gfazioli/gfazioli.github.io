"use client";

import { IconArrowUp, IconBookmark, IconHeartFilled, IconSearch } from "@tabler/icons-react";
import { Fragment, type CSSProperties, type ReactNode } from "react";
import { LINKS_ACCENT, SPONSOR_ACCENT } from "@/lib/sections";
import { useScrollSpy } from "@/lib/useScrollSpy";
import { SectionIcon } from "./SectionIcon";
import type { SectionId } from "@/lib/projects";
import { OPEN_SPOTLIGHT_EVENT } from "./ProjectSpotlight";

export interface DockSection {
  id: SectionId;
  label: string;
  accent: string;
  count: number;
}

interface StudioDockProps {
  sections: DockSection[];
  labels: {
    dock: string;
    links: string;
    sponsor: string;
    search: string;
    top: string;
  };
}

interface DockEntry {
  /** The section id it jumps to (scroll-spied), or "search". */
  id: string;
  icon: ReactNode;
  label: string;
  accent: string;
  badge?: number;
  /** A divider before this entry */
  separated?: boolean;
}

type AccentStyle = CSSProperties & { "--accent"?: string };
type NeonStyle = CSSProperties & { "--dock-neon"?: string };

/**
 * The dock's neon tube: the accents of its own icons, left to right, each
 * colour sitting roughly under the icon it belongs to (on a phone, where the
 * row scrolls, it is only an ambient band), so the outline is a legend of the
 * sections before any of them is hovered. The back-to-top key adds no stop:
 * its cream would read as a white end, not as neon, and a gradient holds its
 * first colour out to the edge anyway.
 */
const neonGradient = (entries: DockEntry[]) =>
  `linear-gradient(90deg, ${entries
    .flatMap((e, i) => (e.id === "top" ? [] : [`${e.accent} ${((i + 0.5) * 100) / entries.length}%`]))
    .join(", ")})`;

const openSpotlight = () => window.dispatchEvent(new Event(OPEN_SPOTLIGHT_EVENT));

/**
 * The page's navigation, as a Mac dock pinned to the bottom of the window: one
 * icon per section, a dot under the one you are in, the icons swelling under
 * the pointer the way the real Dock magnifies. It replaces the row of text
 * links in the header, which ran out of room and said nothing about where you
 * were. The search key at the end opens the ⌘K spotlight.
 *
 * Magnification is CSS only (`:hover`, `:has()` and sibling selectors scaling
 * `transform`), so it costs nothing while the pointer is still.
 */
export function StudioDock({ sections, labels }: StudioDockProps) {
  const entries: DockEntry[] = [
    { id: "top", icon: <IconArrowUp size={20} stroke={1.8} />, label: labels.top, accent: "#f2e8df" },
    ...sections.map((s, i) => ({
      id: s.id,
      icon: <SectionIcon id={s.id} size={22} />,
      label: s.label,
      accent: s.accent,
      badge: s.count,
      separated: i === 0,
    })),
    {
      id: "links",
      icon: <IconBookmark size={21} stroke={1.6} />,
      label: labels.links,
      accent: LINKS_ACCENT,
      separated: true,
    },
    { id: "sponsor", icon: <IconHeartFilled size={20} />, label: labels.sponsor, accent: SPONSOR_ACCENT },
    { id: "search", icon: <IconSearch size={20} stroke={1.8} />, label: labels.search, accent: "#ff9f1c" },
  ];
  const active = useScrollSpy(entries.filter((e) => e.id !== "top" && e.id !== "search").map((e) => e.id));

  return (
    <>
      {/* The dock floats over the page; on a phone it is a full-width bar,
          so it keeps the end of the page clear of itself */}
      <div aria-hidden className="dock-clearance" />
      <nav aria-label={labels.dock} className="dock" style={{ "--dock-neon": neonGradient(entries) } as NeonStyle}>
        <ul className="dock__list">
          {entries.map((e) => {
            const isActive = active === e.id;
            const inner = (
              <>
                {e.icon}
                <span className="dock__label" aria-hidden>
                  {e.label}
                  {e.badge ? <span className="dock__count">{e.badge}</span> : null}
                </span>
              </>
            );
            return (
              <Fragment key={e.id}>
                {e.separated ? <li className="dock__sep" aria-hidden /> : null}
                <li
                  className="dock__item"
                  data-active={isActive || undefined}
                  style={{ "--accent": e.accent } as AccentStyle}
                >
                  {e.id === "search" ? (
                    <button type="button" className="dock__button" aria-label={e.label} onClick={openSpotlight}>
                      {inner}
                    </button>
                  ) : (
                    <a
                      href={`#${e.id}`}
                      className="dock__button"
                      aria-label={e.label}
                      aria-current={isActive ? "location" : undefined}
                    >
                      {inner}
                    </a>
                  )}
                </li>
              </Fragment>
            );
          })}
        </ul>
      </nav>
    </>
  );
}

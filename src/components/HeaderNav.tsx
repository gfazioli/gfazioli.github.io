"use client";

import { Anchor, Group } from "@mantine/core";
import { useEffect, useState } from "react";

export interface HeaderNavLink {
  id: string;
  label: string;
}

interface HeaderNavProps {
  links: HeaderNavLink[];
}

// Slightly larger than html `scroll-padding-top` (80px) so that anchor clicks
// land safely below the threshold even with sub-pixel rounding.
const SPY_OFFSET = 100;

export function HeaderNav({ links }: HeaderNavProps) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const targets = links
      .map((l) => ({ id: l.id, el: document.getElementById(l.id) }))
      .filter((t): t is { id: string; el: HTMLElement } => t.el !== null);

    if (targets.length === 0) return;

    const compute = () => {
      let pick: string | null = null;
      for (const { id, el } of targets) {
        const top = el.getBoundingClientRect().top;
        if (top - SPY_OFFSET <= 0) {
          pick = id;
        } else {
          break;
        }
      }
      if (!pick) pick = targets[0].id;
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
  }, [links]);

  return (
    <Group gap="lg" visibleFrom="md">
      {links.map((l) => {
        const active = activeId === l.id;
        return (
          <Anchor
            key={l.id}
            href={`#${l.id}`}
            underline="never"
            size="sm"
            data-active={active || undefined}
            className={"nav-spy-link" + (active ? " is-active" : "")}
          >
            {l.label}
          </Anchor>
        );
      })}
    </Group>
  );
}

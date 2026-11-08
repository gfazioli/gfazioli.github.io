"use client";

import { Badge, Group, Kbd, Modal, Text, TextInput, UnstyledButton } from "@mantine/core";
import { IconArrowUpRight, IconSearch } from "@tabler/icons-react";
import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";

/** Fired on `window` by anything that wants the spotlight open (header, dock). */
export const OPEN_SPOTLIGHT_EVENT = "undolog:spotlight";

export interface SpotlightItem {
  name: string;
  url: string;
  description: string;
  section: string;
  accent: string;
  icon?: string;
  /** Searchable words that are not shown: topics, language, section id. */
  keywords: string;
}

interface ProjectSpotlightProps {
  items: SpotlightItem[];
  labels: { title: string; placeholder: string; empty: string };
}

const normalize = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");

type AccentStyle = CSSProperties & { "--accent"?: string };

/**
 * ⌘K (or Ctrl+K, or "/") opens a Spotlight-style search over every project on
 * the page: type a name, a technology or a category, move with the arrows,
 * Enter opens the project. With 58 projects in nine sections this is the
 * fastest way to anything, and it is how the people this studio builds for
 * already move around their Macs.
 */
export function ProjectSpotlight({ items, labels }: ProjectSpotlightProps) {
  const [opened, setOpened] = useState(false);
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);

  // Hand-rolled rather than Mantine's useHotkeys: "/" is Shift+7 on an Italian
  // keyboard, and useHotkeys only matches a key with exactly its modifiers.
  useEffect(() => {
    const open = () => setOpened(true);
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const typing =
        target?.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target?.tagName ?? "");
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpened((o) => !o);
      } else if (e.key === "/" && !typing) {
        e.preventDefault();
        open();
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_SPOTLIGHT_EVENT, open);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_SPOTLIGHT_EVENT, open);
    };
  }, []);

  const indexed = useMemo(
    () =>
      items.map((it) => ({
        it,
        name: normalize(it.name),
        hay: normalize(`${it.name} ${it.section} ${it.description} ${it.keywords}`),
      })),
    [items]
  );

  const results = useMemo(() => {
    const tokens = normalize(query).split(/\s+/).filter(Boolean);
    if (tokens.length === 0) return items;
    const q = tokens.join(" ");
    return indexed
      .filter((x) => tokens.every((t) => x.hay.includes(t)))
      .sort((a, b) => {
        const rank = (x: typeof a) => (x.name.startsWith(q) ? 0 : x.name.includes(q) ? 1 : 2);
        return rank(a) - rank(b);
      })
      .map((x) => x.it);
  }, [query, items, indexed]);

  const active = Math.min(index, Math.max(results.length - 1, 0));

  useEffect(() => {
    listRef.current
      ?.querySelector<HTMLElement>(`[data-index="${active}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const onInputKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && results[active]) {
      e.preventDefault();
      listRef.current?.querySelector<HTMLAnchorElement>(`[data-index="${active}"]`)?.click();
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      // A fresh search next time, cleared once the closing fade has ended
      onExitTransitionEnd={() => {
        setQuery("");
        setIndex(0);
      }}
      withCloseButton={false}
      size={640}
      radius="lg"
      padding={0}
      yOffset="12vh"
      title={labels.title}
      // The title stays in the DOM to name the dialog, but its header is
      // visually hidden (globals.css): the search field is the heading.
      classNames={{ header: "spotlight__header", content: "spotlight", body: "spotlight__body" }}
      overlayProps={{ backgroundOpacity: 0.45, blur: 6 }}
    >
      <TextInput
        data-autofocus
        size="lg"
        variant="unstyled"
        value={query}
        onChange={(e) => {
          setQuery(e.currentTarget.value);
          setIndex(0);
        }}
        onKeyDown={onInputKey}
        placeholder={labels.placeholder}
        leftSection={<IconSearch size={20} />}
        rightSection={<Kbd size="xs">esc</Kbd>}
        rightSectionWidth={52}
        aria-label={labels.title}
        className="spotlight__input"
      />
      {/* A plain vertical scroller: a ScrollArea lets long descriptions widen
          the list sideways instead of truncating them. */}
      <div ref={listRef} className="spotlight__list" role="listbox" aria-label={labels.title}>
        {results.length === 0 ? (
          <Text c="dimmed" size="sm" p="lg">
            {labels.empty}
          </Text>
        ) : (
          results.map((r, i) => {
            const style: AccentStyle = { "--accent": r.accent };
            return (
              <UnstyledButton
                key={r.url}
                component="a"
                href={r.url}
                target="_blank"
                rel="noreferrer"
                role="option"
                aria-selected={i === active}
                data-index={i}
                data-active={i === active || undefined}
                onMouseMove={() => setIndex(i)}
                className="spotlight__item"
                style={style}
              >
                <Group gap="md" wrap="nowrap" align="center">
                  {r.icon ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={r.icon}
                      alt=""
                      width={36}
                      height={36}
                      loading="lazy"
                      decoding="async"
                      className="spotlight__icon"
                    />
                  ) : (
                    <span className="spotlight__icon spotlight__icon--blank" aria-hidden>
                      {r.name.slice(0, 1)}
                    </span>
                  )}
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <Group gap={8} wrap="nowrap">
                      <Text fw={600} truncate>
                        {r.name}
                      </Text>
                      <Badge size="xs" variant="light" className="spotlight__section">
                        {r.section}
                      </Badge>
                    </Group>
                    <Text size="sm" c="dimmed" truncate>
                      {r.description}
                    </Text>
                  </div>
                  <IconArrowUpRight size={18} className="spotlight__go" />
                </Group>
              </UnstyledButton>
            );
          })
        )}
      </div>
    </Modal>
  );
}

/** The header's search pill: a fake field that opens the spotlight. */
export function SpotlightTrigger({ label }: { label: string }) {
  return (
    <UnstyledButton
      className="spotlight-trigger"
      onClick={() => window.dispatchEvent(new Event(OPEN_SPOTLIGHT_EVENT))}
      aria-label={label}
    >
      <IconSearch size={16} stroke={1.8} />
      <span className="spotlight-trigger__label">{label}</span>
      <Kbd size="xs" className="spotlight-trigger__kbd">
        ⌘K
      </Kbd>
    </UnstyledButton>
  );
}

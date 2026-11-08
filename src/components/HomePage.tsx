import { Badge, Container, Group, SimpleGrid, Stack, Text, Title } from "@mantine/core";
import { IconBookmark } from "@tabler/icons-react";
import type { CSSProperties, ReactNode } from "react";
import { Hero } from "./Hero";
import { ProjectCard } from "./ProjectCard";
import { ProjectSpotlight, type SpotlightItem } from "./ProjectSpotlight";
import { SectionIcon } from "./SectionIcon";
import { Shelf } from "./Shelf";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";
import { SponsorSection } from "./SponsorSection";
import { StudioDock, type DockSection } from "./StudioDock";
import { StudioLight } from "./StudioLight";
import { TechLinkCard } from "./TechLinkCard";
import type { Dictionary, Lang } from "@/lib/i18n/dictionaries";
import { projects, type ProjectSection } from "@/lib/projects";
import { LINKS_ACCENT, SECTION_ACCENTS, SECTION_LABELS } from "@/lib/sections";
import { PROJECT_ICONS } from "@/data/project-icons";

interface HomePageProps {
  lang: Lang;
  dict: Dictionary;
}

type Localized = { en: string; it: string };
type AccentStyle = CSSProperties & { "--accent"?: string };

/** Kicker (small label) and lead (one line under the title) per section. */
const SECTION_META: Record<ProjectSection["id"], { kicker: Localized; lead: Localized }> = {
  core: {
    kicker: { en: "Flagship", it: "Principali" },
    lead: { en: "The projects I'd show first.", it: "I progetti che mostrerei per primi." },
  },
  macos: {
    kicker: { en: "macOS", it: "macOS" },
    lead: { en: "Native apps for the Mac.", it: "App native per il Mac." },
  },
  cli: {
    kicker: { en: "CLI", it: "CLI" },
    lead: { en: "Tools that live in the terminal.", it: "Strumenti che vivono nel terminale." },
  },
  mantine: {
    kicker: { en: "Mantine", it: "Mantine" },
    lead: {
      en: "Drop-in extensions for the Mantine UI library, each with its own live demo.",
      it: "Estensioni pronte all'uso per Mantine UI, ognuna con la sua demo live.",
    },
  },
  react: {
    kicker: { en: "React", it: "React" },
    lead: {
      en: "Standalone React components with zero runtime dependencies.",
      it: "Componenti React standalone, zero dipendenze a runtime.",
    },
  },
  templates: {
    kicker: { en: "Templates", it: "Template" },
    lead: {
      en: "Starters for documentation sites with Next.js and Mantine.",
      it: "Starter per siti di documentazione con Next.js e Mantine.",
    },
  },
  wordpress: {
    kicker: { en: "WordPress", it: "WordPress" },
    lead: { en: "Plugins for WordPress sites.", it: "Plugin per siti WordPress." },
  },
  raycast: {
    kicker: { en: "Raycast", it: "Raycast" },
    lead: {
      en: "Extensions I maintain or contribute to on the Raycast Store.",
      it: "Estensioni che mantengo o a cui contribuisco sullo Store di Raycast.",
    },
  },
  glaze: {
    kicker: { en: "Glaze", it: "Glaze" },
    lead: {
      en: "Desktop apps and arcade classics on Glaze, Raycast's mini-app platform.",
      it: "App desktop e classici arcade su Glaze, la piattaforma di mini app di Raycast.",
    },
  },
};

/** Sections shown as a grid; every other section is a sideways shelf. */
const GRID_SECTIONS = new Set<ProjectSection["id"]>(["core"]);

function countLabel(n: number, lang: Lang) {
  if (lang === "it") return `${n} ${n === 1 ? "progetto" : "progetti"}`;
  return `${n} ${n === 1 ? "project" : "projects"}`;
}

interface SectionHeaderProps {
  index?: number;
  kicker: string;
  title: string;
  lead?: string;
  count?: string;
  icon: ReactNode;
}

function SectionHeader({ index, kicker, title, lead, count, icon }: SectionHeaderProps) {
  return (
    <Stack gap="sm" mb={36} className="reveal studio-section__header">
      <Group gap={10} align="center">
        {index !== undefined ? (
          <Text component="span" className="studio-section__index">
            {String(index).padStart(2, "0")}
          </Text>
        ) : null}
        <span className="studio-section__rule" aria-hidden />
        <Text component="span" className="studio-section__kicker">
          {kicker}
        </Text>
      </Group>
      <Group gap="md" align="center" wrap="wrap">
        <Group gap="md" align="center" wrap="nowrap" style={{ minWidth: 0 }}>
          <span className="studio-section__icon">{icon}</span>
          <Title order={2} fz={{ base: 30, sm: 48 }} fw={750} lh={1.02} className="studio-section__title">
            {title}
          </Title>
        </Group>
        {count ? (
          <Badge variant="outline" size="lg" radius="xl" className="studio-section__count shrink-0">
            {count}
          </Badge>
        ) : null}
      </Group>
      {lead ? (
        <Text size="lg" maw={640} className="studio-section__lead">
          {lead}
        </Text>
      ) : null}
    </Stack>
  );
}

interface StudioSectionProps {
  id: string;
  /** Tints the section's glow, kicker, icon and count, and (inherited) its cards' hover glow */
  accent: string;
  header: SectionHeaderProps;
  /** Cards in a grid under the header, or a sideways shelf of cards or of small tiles */
  layout: "grid" | "shelf" | "compact-shelf";
  dict: Dictionary;
  children: ReactNode;
}

function StudioSection({ id, accent, header, layout, dict, children }: StudioSectionProps) {
  const style: AccentStyle = { "--accent": accent };
  return (
    <section id={id} className="studio-section relative py-14 sm:py-20" style={style}>
      <Container size="lg">
        <SectionHeader {...header} />
        {layout === "grid" ? (
          <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
            {children}
          </SimpleGrid>
        ) : null}
      </Container>
      {layout === "grid" ? null : (
        <Shelf
          label={header.title}
          previousLabel={dict.nav.previous}
          nextLabel={dict.nav.next}
          size={layout === "compact-shelf" ? "compact" : "default"}
        >
          {children}
        </Shelf>
      )}
    </section>
  );
}

export function HomePage({ lang, dict }: HomePageProps) {
  const dockSections: DockSection[] = projects.sections.map((s) => ({
    id: s.id,
    label: SECTION_LABELS[s.id][lang],
    accent: SECTION_ACCENTS[s.id],
    count: s.projects.length,
  }));

  const spotlightItems: SpotlightItem[] = projects.sections.flatMap((s) =>
    s.projects.map((p) => ({
      name: p.displayName,
      url: p.url,
      description: p.description,
      section: SECTION_LABELS[s.id][lang],
      accent: SECTION_ACCENTS[s.id],
      // The app icon where there is one, else the card's own cover as a thumbnail
      icon: PROJECT_ICONS[p.url] ?? p.githubRepo?.ogImage ?? p.ogImage ?? undefined,
      keywords: [
        s.id,
        s.title,
        s.titleIt,
        ...(p.githubRepo?.topics ?? p.topics ?? []),
        p.githubRepo?.language ?? "",
        p.price ? "paid" : "",
      ].join(" "),
    }))
  );

  const searchLabel = dict.nav.search.replace("{n}", String(spotlightItems.length));

  return (
    <>
      <StudioLight />
      <SiteHeader lang={lang} dict={dict} />
      <main id="top" className="flex-1">
        <Hero lang={lang} dict={dict} />

        {projects.sections.map((section, index) => {
          // If at least one card in the section has a cover image, give the
          // cover-less ones a branded fallback so the row stays aligned.
          const sectionHasCover = section.projects.some(
            (p) => p.githubRepo?.ogImage || p.ogImage
          );
          return (
            <StudioSection
              key={section.id}
              id={section.id}
              accent={SECTION_ACCENTS[section.id]}
              layout={GRID_SECTIONS.has(section.id) ? "grid" : "shelf"}
              dict={dict}
              header={{
                index: index + 1,
                kicker: SECTION_META[section.id].kicker[lang],
                title: lang === "it" ? section.titleIt : section.title,
                lead: SECTION_META[section.id].lead[lang],
                count: countLabel(section.projects.length, lang),
                icon: <SectionIcon id={section.id} size={40} className="shrink-0" />,
              }}
            >
              {section.projects.map((p) => (
                <ProjectCard
                  key={p.url}
                  project={p}
                  icon={PROJECT_ICONS[p.url]}
                  coverFallback={sectionHasCover}
                />
              ))}
            </StudioSection>
          );
        })}

        {projects.techLinks.length > 0 ? (
          <StudioSection
            id="links"
            accent={LINKS_ACCENT}
            layout="compact-shelf"
            dict={dict}
            header={{
              kicker: dict.techLinks.kicker,
              title: dict.techLinks.title,
              lead: dict.techLinks.lead,
              icon: <IconBookmark size={40} stroke={1.5} className="shrink-0" />,
            }}
          >
            {projects.techLinks.map((l) => (
              <TechLinkCard key={l.url} link={l} />
            ))}
          </StudioSection>
        ) : null}

        <SponsorSection dict={dict} />
      </main>
      {/* The footer ends on its wordmark, which the dock may cover: no spacer */}
      <SiteFooter lang={lang} dict={dict} />
      <StudioDock
        sections={dockSections}
        labels={{
          dock: dict.nav.dock,
          links: dict.nav.links,
          sponsor: dict.sponsor.nav,
          search: searchLabel,
          top: dict.nav.top,
        }}
      />
      <ProjectSpotlight
        items={spotlightItems}
        labels={{
          title: searchLabel,
          placeholder: dict.nav.searchPlaceholder,
          empty: dict.nav.searchEmpty,
        }}
      />
    </>
  );
}

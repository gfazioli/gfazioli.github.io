import { Badge, Container, Group, SimpleGrid, Stack, Text, Title } from "@mantine/core";
import { IconBookmark } from "@tabler/icons-react";
import type { ReactNode } from "react";
import { Hero } from "./Hero";
import { ProjectCard } from "./ProjectCard";
import { SectionIcon } from "./SectionIcon";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";
import { SponsorSection } from "./SponsorSection";
import { TechLinkCard } from "./TechLinkCard";
import type { Dictionary, Lang } from "@/lib/i18n/dictionaries";
import { projects, type ProjectSection } from "@/lib/projects";
import { PROJECT_ICONS } from "@/data/project-icons";

interface HomePageProps {
  lang: Lang;
  dict: Dictionary;
}

type Localized = { en: string; it: string };

/** Kicker (small orange label) and lead (one line under the title) per section. */
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

const SECTION_BACKGROUNDS: Partial<Record<ProjectSection["id"], string>> = {
  macos: "/backgrounds/macos.jpg",
  raycast: "/backgrounds/raycast.jpg",
};

/** Two-tone radial glow (top-left, bottom-right) for the sections that have
 *  neither a photo background nor a bespoke CSS block below. */
const SECTION_GLOWS: Partial<Record<ProjectSection["id"], [string, string]>> = {
  core: ["rgba(255,140,0,0.42)", "rgba(112,72,232,0.30)"],
  mantine: ["rgba(51,154,240,0.40)", "rgba(34,139,230,0.24)"],
  templates: ["rgba(32,201,151,0.34)", "rgba(51,154,240,0.22)"],
  wordpress: ["rgba(33,117,155,0.50)", "rgba(0,160,210,0.26)"],
};

function countLabel(n: number, lang: Lang) {
  if (lang === "it") return `${n} ${n === 1 ? "progetto" : "progetti"}`;
  return `${n} ${n === 1 ? "project" : "projects"}`;
}

interface SectionHeaderProps {
  kicker: string;
  title: string;
  lead?: string;
  count?: string;
  icon: ReactNode;
}

function SectionHeader({ kicker, title, lead, count, icon }: SectionHeaderProps) {
  return (
    <Stack gap="sm" mb="xl" className="reveal">
      <Text size="sm" c="orange" fw={600} tt="uppercase" lts={2}>
        {kicker}
      </Text>
      <Group gap="md" align="center" wrap="wrap">
        <Group gap="md" align="center" wrap="nowrap" style={{ minWidth: 0 }}>
          {icon}
          <Title order={2} fz={{ base: 28, sm: 44 }} fw={700} lh={1}>
            {title}
          </Title>
        </Group>
        {count ? (
          <Badge variant="light" color="orange" size="lg" radius="xl" className="shrink-0">
            {count}
          </Badge>
        ) : null}
      </Group>
      {lead ? (
        <Text size="lg" c="dimmed" maw={640}>
          {lead}
        </Text>
      ) : null}
    </Stack>
  );
}

export function HomePage({ lang, dict }: HomePageProps) {
  return (
    <>
      <SiteHeader lang={lang} dict={dict} />
      <main className="flex-1">
        <Hero lang={lang} dict={dict} />

        {projects.sections.map((section, index) => {
          const bg = SECTION_BACKGROUNDS[section.id];
          const glow = SECTION_GLOWS[section.id];
          // If at least one card in the section has a cover image, give the
          // cover-less ones a branded fallback so the row stays aligned.
          const sectionHasCover = section.projects.some(
            (p) => p.githubRepo?.ogImage || p.ogImage
          );
          return (
            <section
              key={section.id}
              id={section.id}
              className={
                (index === 0
                  ? "py-24"
                  : "py-24 border-t border-[var(--mantine-color-default-border)]") +
                " relative isolate overflow-clip"
              }
            >
              {glow ? (
                <>
                  <div
                    aria-hidden
                    className="absolute inset-0 -z-20"
                    style={{
                      opacity: 0.45,
                      backgroundImage: [
                        `radial-gradient(ellipse 55% 40% at 8% 0%, ${glow[0]}, transparent 70%)`,
                        `radial-gradient(ellipse 50% 40% at 95% 100%, ${glow[1]}, transparent 70%)`,
                      ].join(", "),
                    }}
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 -z-10"
                    style={{
                      background:
                        "linear-gradient(to bottom, var(--mantine-color-body) 0%, transparent 15%, transparent 85%, var(--mantine-color-body) 100%)",
                    }}
                  />
                </>
              ) : null}
              {bg ? (
                <>
                  <div
                    aria-hidden
                    className="absolute inset-0 -z-20 bg-cover bg-center"
                    style={{ backgroundImage: `url(${bg})`, opacity: 0.35 }}
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 -z-10"
                    style={{
                      background:
                        "linear-gradient(to bottom, var(--mantine-color-body) 0%, transparent 18%, transparent 82%, var(--mantine-color-body) 100%)",
                    }}
                  />
                </>
              ) : null}
              {section.id === "cli" ? (
                <div
                  aria-hidden
                  className="absolute inset-0 -z-10"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(to bottom, rgba(120,255,160,0.12) 0px, rgba(120,255,160,0.12) 1px, transparent 1px, transparent 3px)",
                    maskImage:
                      "linear-gradient(to bottom, transparent 0%, black 100%)",
                    WebkitMaskImage:
                      "linear-gradient(to bottom, transparent 0%, black 100%)",
                  }}
                />
              ) : null}
              {section.id === "react" ? (
                <>
                  <div
                    aria-hidden
                    className="absolute inset-0 -z-20"
                    style={{
                      opacity: 0.45,
                      backgroundImage: [
                        "radial-gradient(ellipse 70% 28% at 25% 8%, rgba(97,218,251,0.85), transparent 70%)",
                        "radial-gradient(ellipse 65% 30% at 80% 32%, rgba(168,85,247,0.75), transparent 70%)",
                        "radial-gradient(ellipse 70% 28% at 20% 60%, rgba(236,72,153,0.7), transparent 70%)",
                        "radial-gradient(ellipse 75% 30% at 75% 88%, rgba(59,130,246,0.8), transparent 70%)",
                      ].join(", "),
                    }}
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 -z-10"
                    style={{
                      background:
                        "linear-gradient(to bottom, var(--mantine-color-body) 0%, transparent 15%, transparent 85%, var(--mantine-color-body) 100%)",
                    }}
                  />
                </>
              ) : null}
              {section.id === "glaze" ? (
                <>
                  <div
                    aria-hidden
                    className="absolute inset-0 -z-20"
                    style={{
                      opacity: 0.5,
                      backgroundImage: [
                        "radial-gradient(ellipse 60% 30% at 15% 12%, rgba(240,140,0,0.55), transparent 70%)",
                        "radial-gradient(ellipse 55% 28% at 85% 22%, rgba(255,180,90,0.42), transparent 70%)",
                        "radial-gradient(ellipse 60% 30% at 22% 72%, rgba(255,99,99,0.38), transparent 70%)",
                        "radial-gradient(ellipse 65% 32% at 82% 90%, rgba(150,110,255,0.30), transparent 70%)",
                      ].join(", "),
                    }}
                  />
                  {/* Glossy "glaze" sheen — a soft diagonal highlight sweeping the section */}
                  <div
                    aria-hidden
                    className="absolute inset-0 -z-20"
                    style={{
                      opacity: 0.5,
                      backgroundImage:
                        "linear-gradient(115deg, transparent 34%, rgba(255,255,255,0.05) 47%, rgba(255,255,255,0.13) 50%, rgba(255,255,255,0.05) 53%, transparent 66%)",
                    }}
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 -z-10"
                    style={{
                      background:
                        "linear-gradient(to bottom, var(--mantine-color-body) 0%, transparent 15%, transparent 85%, var(--mantine-color-body) 100%)",
                    }}
                  />
                </>
              ) : null}
              <Container size="lg">
                <SectionHeader
                  kicker={SECTION_META[section.id].kicker[lang]}
                  title={lang === "it" ? section.titleIt : section.title}
                  lead={SECTION_META[section.id].lead[lang]}
                  count={countLabel(section.projects.length, lang)}
                  icon={
                    <SectionIcon
                      id={section.id}
                      size={40}
                      className="text-[var(--mantine-color-orange-4)] shrink-0"
                    />
                  }
                />
                <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
                  {section.projects.map((p) => (
                    <ProjectCard
                      key={p.url}
                      project={p}
                      icon={PROJECT_ICONS[p.url]}
                      coverFallback={sectionHasCover}
                    />
                  ))}
                </SimpleGrid>
              </Container>
            </section>
          );
        })}

        {projects.techLinks.length > 0 ? (
          <section
            id="links"
            className="py-24 border-t border-[var(--mantine-color-default-border)]"
          >
            <Container size="lg">
              <SectionHeader
                kicker={lang === "it" ? "Pubblicazioni" : "Read & subscribe"}
                title={lang === "it" ? "Link tech" : "Tech Links"}
                lead={lang === "it" ? "Dove scrivo e pubblico." : "Where I write and publish."}
                icon={
                  <IconBookmark
                    size={40}
                    stroke={1.5}
                    className="text-[var(--mantine-color-orange-4)] shrink-0"
                  />
                }
              />
              <SimpleGrid cols={{ base: 2, sm: 3, md: 4, lg: 5 }} spacing="md">
                {projects.techLinks.map((l) => (
                  <TechLinkCard key={l.url} link={l} />
                ))}
              </SimpleGrid>
            </Container>
          </section>
        ) : null}

        <SponsorSection dict={dict} />
      </main>
      <SiteFooter dict={dict} />
    </>
  );
}

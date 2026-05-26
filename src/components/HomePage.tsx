import { Container, Group, SimpleGrid, Stack, Text, Title } from "@mantine/core";
import { IconBookmark } from "@tabler/icons-react";
import { Hero } from "./Hero";
import { ProjectCard } from "./ProjectCard";
import { SectionIcon } from "./SectionIcon";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";
import { TechLinkCard } from "./TechLinkCard";
import type { Dictionary, Lang } from "@/lib/i18n/dictionaries";
import { projects, type ProjectSection } from "@/lib/projects";
import { PROJECT_ICONS } from "@/data/project-icons";

interface HomePageProps {
  lang: Lang;
  dict: Dictionary;
}

const SECTION_KICKERS: Record<ProjectSection["id"], { en: string; it: string }> = {
  core: { en: "Flagship", it: "Principali" },
  macos: { en: "macOS", it: "macOS" },
  cli: { en: "CLI", it: "CLI" },
  mantine: { en: "Mantine", it: "Mantine" },
  react: { en: "React", it: "React" },
  templates: { en: "Templates", it: "Template" },
  wordpress: { en: "WordPress", it: "WordPress" },
  raycast: { en: "Raycast", it: "Raycast" },
};

const SECTION_BACKGROUNDS: Partial<Record<ProjectSection["id"], string>> = {
  macos: "/backgrounds/macos.jpg",
  raycast: "/backgrounds/raycast.jpg",
};

export function HomePage({ lang, dict }: HomePageProps) {
  return (
    <>
      <SiteHeader lang={lang} dict={dict} />
      <main className="flex-1">
        <Hero dict={dict} />

        {projects.sections.map((section, index) => {
          const bg = SECTION_BACKGROUNDS[section.id];
          return (
            <section
              key={section.id}
              id={section.id}
              className={
                (index === 0
                  ? "py-24"
                  : "py-24 border-t border-[var(--mantine-color-default-border)]") +
                " relative isolate overflow-hidden"
              }
            >
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
              <Container size="lg">
                <Stack gap="xs" mb="xl">
                  <Text size="sm" c="orange" fw={600} tt="uppercase" lts={2}>
                    {SECTION_KICKERS[section.id][lang]}
                  </Text>
                  <Group gap="md" align="center" wrap="nowrap">
                    <SectionIcon id={section.id} size={40} className="text-[var(--mantine-color-orange-4)] shrink-0" />
                    <Title order={2} fz={{ base: 28, sm: 44 }} fw={700} lh={1}>
                      {lang === "it" ? section.titleIt : section.title}
                    </Title>
                  </Group>
                </Stack>
                <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
                  {section.projects.map((p) => (
                    <ProjectCard key={p.url} project={p} icon={PROJECT_ICONS[p.url]} />
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
              <Stack gap="xs" mb="xl">
                <Text size="sm" c="orange" fw={600} tt="uppercase" lts={2}>
                  {lang === "it" ? "Pubblicazioni" : "Read & subscribe"}
                </Text>
                <Group gap="md" align="center" wrap="nowrap">
                  <IconBookmark
                    size={40}
                    stroke={1.5}
                    className="text-[var(--mantine-color-orange-4)] shrink-0"
                  />
                  <Title order={2} fz={{ base: 28, sm: 44 }} fw={700} lh={1}>
                    {lang === "it" ? "Link tech" : "Tech Links"}
                  </Title>
                </Group>
              </Stack>
              <SimpleGrid cols={{ base: 2, sm: 3, md: 4, lg: 5 }} spacing="md">
                {projects.techLinks.map((l) => (
                  <TechLinkCard key={l.url} link={l} />
                ))}
              </SimpleGrid>
            </Container>
          </section>
        ) : null}
      </main>
      <SiteFooter dict={dict} />
    </>
  );
}

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

export function HomePage({ lang, dict }: HomePageProps) {
  return (
    <>
      <SiteHeader lang={lang} dict={dict} />
      <main className="flex-1">
        <Hero dict={dict} />

        {projects.sections.map((section, index) => (
          <section
            key={section.id}
            id={section.id}
            className={
              index === 0
                ? "py-24"
                : "py-24 border-t border-[var(--mantine-color-default-border)]"
            }
          >
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
        ))}

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

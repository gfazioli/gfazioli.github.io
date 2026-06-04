import { Anchor, Container, Group, Text } from "@mantine/core";
import Image from "next/image";
import type { Dictionary, Lang } from "@/lib/i18n/dictionaries";
import { projects, type ProjectSection } from "@/lib/projects";
import { HeaderNav, type HeaderNavLink } from "./HeaderNav";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { SponsorButton } from "./SponsorButton";

interface SiteHeaderProps {
  lang: Lang;
  dict: Dictionary;
}

const SECTION_LABELS: Record<ProjectSection["id"], { en: string; it: string }> = {
  core: { en: "Flagship", it: "Principali" },
  macos: { en: "macOS", it: "macOS" },
  cli: { en: "CLI", it: "CLI" },
  mantine: { en: "Mantine", it: "Mantine" },
  react: { en: "React", it: "React" },
  templates: { en: "Templates", it: "Template" },
  wordpress: { en: "WordPress", it: "WordPress" },
  raycast: { en: "Raycast", it: "Raycast" },
};

export function SiteHeader({ lang, dict }: SiteHeaderProps) {
  const home = lang === "it" ? "/it/" : "/";

  const navLinks: HeaderNavLink[] = projects.sections.map((s) => ({
    id: s.id,
    label: SECTION_LABELS[s.id][lang],
  }));

  navLinks.push({ id: "links", label: lang === "it" ? "Link" : "Links" });

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-[var(--mantine-color-body)]/70 border-b border-[var(--mantine-color-default-border)]">
      <Container size="lg" py="sm">
        <Group justify="space-between">
          <Anchor href={home} c="bright" underline="never">
            <Group gap="sm" align="center" wrap="nowrap">
              <Image
                src="/logo.png"
                alt="Undolog"
                width={32}
                height={32}
                priority
                className="rounded-md"
              />
              <Text component="span" fw={700} fz="lg">
                Undolog<span className="text-orange-400">.</span>
              </Text>
            </Group>
          </Anchor>
          <HeaderNav links={navLinks} />
          <Group gap="sm" wrap="nowrap">
            <SponsorButton label={dict.sponsor.nav} size="xs" radius="xl" href="#sponsor" />
            <LanguageSwitcher current={lang} />
          </Group>
        </Group>
      </Container>
    </header>
  );
}

import { Anchor, Container, Group, Text } from "@mantine/core";
import Image from "next/image";
import type { Dictionary, Lang } from "@/lib/i18n/dictionaries";
import { projects } from "@/lib/projects";
import { LanguageSwitcher } from "./LanguageSwitcher";

interface SiteHeaderProps {
  lang: Lang;
  dict: Dictionary;
}

export function SiteHeader({ lang, dict: _dict }: SiteHeaderProps) {
  const home = lang === "it" ? "/it/" : "/";
  const navSections = projects.sections.filter((s) =>
    ["core", "mantine", "macos", "wordpress"].includes(s.id)
  );

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
          <Group gap="lg" visibleFrom="sm">
            {navSections.map((s) => (
              <Anchor
                key={s.id}
                href={`#${s.id}`}
                c="dimmed"
                underline="never"
                size="sm"
              >
                {lang === "it" ? s.titleIt : s.title}
              </Anchor>
            ))}
            <Anchor href="#links" c="dimmed" underline="never" size="sm">
              {lang === "it" ? "Link" : "Links"}
            </Anchor>
          </Group>
          <LanguageSwitcher current={lang} />
        </Group>
      </Container>
    </header>
  );
}

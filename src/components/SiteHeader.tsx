import { Anchor, Container, Group, Text } from "@mantine/core";
import Image from "next/image";
import type { Dictionary, Lang } from "@/lib/i18n/dictionaries";
import { projects } from "@/lib/projects";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { DiscordButton } from "./DiscordButton";
import { SpotlightTrigger } from "./ProjectSpotlight";
import { SponsorButton } from "./SponsorButton";

interface SiteHeaderProps {
  lang: Lang;
  dict: Dictionary;
}

/**
 * Logo, search, community and language. The section links moved to the dock
 * at the bottom of the window (StudioDock), so the header stays calm and the
 * search field gets the room the links used to fill.
 */
export function SiteHeader({ lang, dict }: SiteHeaderProps) {
  const home = lang === "it" ? "/it/" : "/";
  const total = projects.sections.reduce((n, s) => n + s.projects.length, 0);

  return (
    <header className="studio-header sticky top-0 z-40">
      <Container size="lg" py="sm">
        <Group justify="space-between" wrap="nowrap" gap="md">
          <Anchor href={home} c="bright" underline="never" className="shrink-0">
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
          <SpotlightTrigger label={dict.nav.search.replace("{n}", String(total))} />
          <Group gap="sm" wrap="nowrap" className="shrink-0">
            {/* Not on a phone: one more button wraps the header onto a second
                line below ~430px (57px to 103px tall). The hero carries it there. */}
            <DiscordButton
              label={dict.community.discord}
              size={30}
              radius="xl"
              iconSize={17}
              visibleFrom="xs"
            />
            <SponsorButton label={dict.sponsor.nav} size="xs" radius="xl" href="#sponsor" />
            <LanguageSwitcher current={lang} />
          </Group>
        </Group>
      </Container>
    </header>
  );
}

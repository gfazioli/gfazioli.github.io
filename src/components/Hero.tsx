import { Button, Container, Group, Stack, Text, Title } from "@mantine/core";
import { IconBrandGithub, IconRocket } from "@tabler/icons-react";
import Image from "next/image";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { SponsorButton } from "./SponsorButton";

interface HeroProps {
  dict: Dictionary;
}

export function Hero({ dict }: HeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-[var(--mantine-color-default-border)]">
      <div className="absolute inset-0 -z-10 opacity-40">
        <Image
          src="/header-placeholder.svg"
          alt=""
          fill
          priority
          className="object-cover"
        />
      </div>
      <Container size="lg" py={96}>
        <Stack gap="xl" maw={760}>
          <Group gap="xl" wrap="nowrap" align="center">
            <Image
              src="/logo.png"
              alt="Undolog logo"
              width={120}
              height={120}
              priority
              className="rounded-2xl shadow-2xl"
            />
            <Stack gap={4}>
              <Text size="sm" c="orange" fw={600} tt="uppercase" lts={2}>
                {dict.hero.kicker}
              </Text>
              <Title order={1} fz={{ base: 48, sm: 80 }} lh={1} fw={800}>
                Undolog<span className="text-orange-400">.</span>
              </Title>
            </Stack>
          </Group>
          <Text size="xl" c="dimmed" maw={620}>
            {dict.hero.subtitle}
          </Text>
          <Group>
            <Button
              size="lg"
              component="a"
              href="#core"
              leftSection={<IconRocket size={18} />}
            >
              {dict.hero.ctaProjects}
            </Button>
            <Button
              size="lg"
              variant="default"
              component="a"
              href="https://github.com/gfazioli"
              target="_blank"
              rel="noreferrer"
              leftSection={<IconBrandGithub size={18} />}
            >
              {dict.hero.ctaGithub}
            </Button>
            <SponsorButton label={dict.sponsor.nav} size="lg" />
          </Group>
        </Stack>
      </Container>
    </section>
  );
}

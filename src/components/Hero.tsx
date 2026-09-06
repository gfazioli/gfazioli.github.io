import {
  ActionIcon,
  Button,
  Container,
  Group,
  Stack,
  Text,
  Title,
  Tooltip,
} from "@mantine/core";
import { IconBrandGithub, IconCoffee, IconRocket } from "@tabler/icons-react";
import Image from "next/image";
import type { Dictionary, Lang } from "@/lib/i18n/dictionaries";
import { DONATE_URL } from "./CoffeeButton";
import { HeroStats } from "./HeroStats";
import { SponsorButton } from "./SponsorButton";

interface HeroProps {
  lang: Lang;
  dict: Dictionary;
}

export function Hero({ lang, dict }: HeroProps) {
  return (
    <section className="relative isolate overflow-clip border-b border-[var(--mantine-color-default-border)]">
      {/* Background layers: dotted base → faint grid → two drifting colour orbs → fade to body */}
      <div aria-hidden className="absolute inset-0 -z-30 opacity-40">
        <Image
          src="/header-placeholder.svg"
          alt=""
          fill
          priority
          className="object-cover"
        />
      </div>
      <div aria-hidden className="hero-grid absolute inset-0 -z-20" />
      <div
        aria-hidden
        className="hero-orb -z-20"
        style={{
          width: 560,
          height: 560,
          left: "-6%",
          top: "-30%",
          background: "rgba(255, 140, 0, 0.30)",
        }}
      />
      <div
        aria-hidden
        className="hero-orb hero-orb--violet -z-20"
        style={{
          width: 680,
          height: 680,
          right: "-10%",
          bottom: "-50%",
          background: "rgba(112, 72, 232, 0.28)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 -z-10 h-40"
        style={{
          background: "linear-gradient(to bottom, transparent, var(--mantine-color-body))",
        }}
      />

      <Container size="lg" py={96}>
        <div className="grid items-center gap-12 md:grid-cols-[minmax(0,1fr)_auto]">
          <Stack gap="xl" maw={760}>
            <Group gap="xl" wrap="nowrap" align="center">
              <div className="hero-logo shrink-0">
                <Image
                  src="/logo.png"
                  alt="Undolog logo"
                  width={120}
                  height={120}
                  priority
                  className="rounded-2xl shadow-2xl"
                />
              </div>
              <Stack gap={4}>
                <Text size="sm" c="orange" fw={600} tt="uppercase" lts={2}>
                  {dict.hero.kicker}
                </Text>
                <Title order={1} fz={{ base: 48, sm: 80 }} lh={1} fw={800}>
                  <span className="hero-title-gradient">Undolog</span>
                  <span className="text-orange-400">.</span>
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
              <SponsorButton label={dict.sponsor.nav} size="lg" href="#sponsor" />
              <Tooltip label={dict.sponsor.coffeeCta}>
                <ActionIcon
                  component="a"
                  href={DONATE_URL}
                  target="_blank"
                  rel="noreferrer"
                  size={50}
                  variant="gradient"
                  gradient={{ from: "yellow.7", to: "orange.7", deg: 45 }}
                  aria-label={dict.sponsor.coffeeCta}
                >
                  <IconCoffee size={24} />
                </ActionIcon>
              </Tooltip>
            </Group>
          </Stack>

          <HeroStats lang={lang} dict={dict} />
        </div>
      </Container>
    </section>
  );
}

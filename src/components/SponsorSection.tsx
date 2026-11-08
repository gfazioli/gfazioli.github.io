import { Anchor, Avatar, Container, Group, Stack, Text, Title } from "@mantine/core";
import { IconHeartFilled, IconPlus } from "@tabler/icons-react";
import { sponsors } from "@/data/sponsors";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { CoffeeButton } from "./CoffeeButton";
import { SponsorButton } from "./SponsorButton";

interface SponsorSectionProps {
  dict: Dictionary;
}

export function SponsorSection({ dict }: SponsorSectionProps) {
  return (
    <section
      id="sponsor"
      className="relative overflow-x-clip py-24"
    >
      <div aria-hidden className="sponsor-glow" />
      <Container size="sm">
        <Stack gap="lg" align="center" ta="center">
          <IconHeartFilled
            size={48}
            className="sponsor-heart text-[var(--mantine-color-pink-4)]"
          />
          <Text size="sm" c="pink" fw={600} tt="uppercase" lts={2}>
            {dict.sponsor.kicker}
          </Text>
          <Title order={2} fz={{ base: 24, sm: 36 }} fw={700} lh={1.1}>
            {dict.sponsor.title}
          </Title>
          <Text size="md" c="dimmed" maw={560}>
            {dict.sponsor.body}
          </Text>
          <Group justify="center" gap="xl" mt="xs">
            {sponsors.map((sponsor) => (
              <Anchor
                key={sponsor.key}
                href={sponsor.href ?? `https://github.com/${sponsor.github}`}
                target="_blank"
                rel="noopener noreferrer"
                underline="never"
              >
                <Stack gap={6} align="center">
                  <Avatar
                    src={`https://github.com/${sponsor.github}.png`}
                    alt={sponsor.name}
                    size="xl"
                    radius="50%"
                  />
                  <Text fz={13} c="dimmed">
                    {sponsor.name}
                  </Text>
                </Stack>
              </Anchor>
            ))}
            <Anchor
              href="https://github.com/sponsors/gfazioli"
              target="_blank"
              rel="noopener noreferrer"
              underline="never"
            >
              <Stack gap={6} align="center">
                <Avatar
                  size="xl"
                  radius="50%"
                  className="border border-dashed border-[var(--mantine-color-default-border)] bg-transparent text-[var(--mantine-color-dimmed)]"
                >
                  <IconPlus size={28} />
                </Avatar>
                <Text fz={13} c="dimmed">
                  {dict.sponsor.logoHere}
                </Text>
              </Stack>
            </Anchor>
          </Group>
          <Group justify="center" gap="sm" mt="xs">
            <SponsorButton label={dict.sponsor.cta} size="lg" />
            <CoffeeButton label={dict.sponsor.coffeeCta} size="lg" />
          </Group>
        </Stack>
      </Container>
    </section>
  );
}

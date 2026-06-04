import { Anchor, Avatar, Container, Group, Stack, Text, Title } from "@mantine/core";
import { IconHeartFilled, IconPlus } from "@tabler/icons-react";
import { sponsors } from "@/data/sponsors";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { SponsorButton } from "./SponsorButton";

interface SponsorSectionProps {
  dict: Dictionary;
}

export function SponsorSection({ dict }: SponsorSectionProps) {
  return (
    <section
      id="sponsor"
      className="relative isolate overflow-hidden py-24 border-t border-[var(--mantine-color-default-border)]"
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-20"
        style={{
          opacity: 0.4,
          backgroundImage: [
            "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(219,97,162,0.55), transparent 70%)",
            "radial-gradient(ellipse 70% 60% at 50% 100%, rgba(190,57,137,0.35), transparent 70%)",
          ].join(", "),
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(to bottom, var(--mantine-color-body) 0%, transparent 25%, transparent 75%, var(--mantine-color-body) 100%)",
        }}
      />
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
          <SponsorButton label={dict.sponsor.cta} size="lg" mt="xs" />
        </Stack>
      </Container>
    </section>
  );
}

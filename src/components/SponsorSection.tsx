import { Container, Stack, Text, Title } from "@mantine/core";
import { IconHeartFilled } from "@tabler/icons-react";
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
          <Title order={2} fz={{ base: 28, sm: 44 }} fw={700} lh={1.1}>
            {dict.sponsor.title}
          </Title>
          <Text size="lg" c="dimmed" maw={560}>
            {dict.sponsor.body}
          </Text>
          <SponsorButton label={dict.sponsor.cta} size="lg" mt="xs" />
        </Stack>
      </Container>
    </section>
  );
}

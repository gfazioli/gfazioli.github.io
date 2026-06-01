import { Anchor, Container, Group, Text } from "@mantine/core";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandNpm,
  IconBrandX,
  IconHeartFilled,
} from "@tabler/icons-react";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { SPONSOR_URL } from "./SponsorButton";

interface SiteFooterProps {
  dict: Dictionary;
}

export function SiteFooter({ dict }: SiteFooterProps) {
  return (
    <footer className="mt-24 border-t border-[var(--mantine-color-default-border)]">
      <Container size="lg" py="xl">
        <Group justify="space-between" wrap="wrap" gap="md">
          <Text size="sm" c="dimmed">
            © {new Date().getFullYear()} Undolog — {dict.footer.built}
          </Text>
          <Group gap="md">
            <Anchor
              href={SPONSOR_URL}
              target="_blank"
              rel="noreferrer"
              c="pink"
              aria-label={dict.sponsor.ariaLabel}
            >
              <IconHeartFilled size={20} className="sponsor-heart" />
            </Anchor>
            <Anchor
              href="https://github.com/gfazioli"
              target="_blank"
              rel="noreferrer"
              c="dimmed"
              aria-label="GitHub"
            >
              <IconBrandGithub size={20} />
            </Anchor>
            <Anchor
              href="https://www.npmjs.com/~gfazioli"
              target="_blank"
              rel="noreferrer"
              c="dimmed"
              aria-label="npm"
            >
              <IconBrandNpm size={20} />
            </Anchor>
            <Anchor
              href="https://it.linkedin.com/in/giovambattistafazioli"
              target="_blank"
              rel="noreferrer"
              c="dimmed"
              aria-label="LinkedIn"
            >
              <IconBrandLinkedin size={20} />
            </Anchor>
            <Anchor
              href="https://twitter.com/gfazioli"
              target="_blank"
              rel="noreferrer"
              c="dimmed"
              aria-label="X / Twitter"
            >
              <IconBrandX size={20} />
            </Anchor>
          </Group>
        </Group>
      </Container>
    </footer>
  );
}

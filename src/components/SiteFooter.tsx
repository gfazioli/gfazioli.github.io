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

/** Dotted underline at rest so the tech links read as clickable; solid + brighter on hover */
const techLinkClass =
  "decoration-dotted underline-offset-4 transition-colors hover:decoration-solid hover:text-[var(--mantine-color-bright)]";

export function SiteFooter({ dict }: SiteFooterProps) {
  return (
    <footer className="border-t border-[var(--mantine-color-default-border)]">
      <Container size="lg" py="xl">
        <Group justify="space-between" wrap="wrap" gap="md">
          <Text size="sm" c="dimmed">
            © {new Date().getFullYear()} Undolog — {dict.footer.builtWith}{" "}
            <Anchor
              href="https://nextjs.org"
              target="_blank"
              rel="noreferrer"
              inherit
              c="dimmed"
              underline="always"
              className={techLinkClass}
            >
              Next.js
            </Anchor>{" "}
            &{" "}
            <Anchor
              href="https://mantine.dev"
              target="_blank"
              rel="noreferrer"
              inherit
              c="dimmed"
              underline="always"
              className={techLinkClass}
            >
              Mantine
            </Anchor>{" "}
            — {dict.footer.hostedOn}{" "}
            <Anchor
              href="https://pages.github.com"
              target="_blank"
              rel="noreferrer"
              inherit
              c="dimmed"
              underline="always"
              className={techLinkClass}
            >
              GitHub Pages
            </Anchor>
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

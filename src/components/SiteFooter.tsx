import { Anchor, Container, Text } from "@mantine/core";
import {
  IconBrandDiscordFilled,
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandNpm,
  IconBrandX,
  IconCoffee,
  IconHeartFilled,
  IconNews,
} from "@tabler/icons-react";
import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import type { Dictionary, Lang } from "@/lib/i18n/dictionaries";
import { LEGAL, legalPath } from "@/lib/legal";
import { projects } from "@/lib/projects";
import { SECTION_ACCENTS, SECTION_LABELS } from "@/lib/sections";
import { PROFILE } from "@/lib/seo";
import { DONATE_URL } from "./CoffeeButton";
import { DISCORD_BLURPLE, DISCORD_URL } from "./DiscordButton";
import { SPONSOR_URL } from "./SponsorButton";

interface SiteFooterProps {
  lang: Lang;
  dict: Dictionary;
}

type TintStyle = CSSProperties & { "--accent"?: string; "--brand"?: string };

/** Dotted underline at rest so the small-print links read as clickable; solid + brighter on hover */
const SMALL_PRINT_LINK = {
  inherit: true,
  c: "dimmed",
  underline: "always",
  className:
    "decoration-dotted underline-offset-4 transition-colors hover:decoration-solid hover:text-[var(--mantine-color-bright)]",
} as const;

/** Profiles, each lit in its own brand colour on hover. */
const SOCIAL: { label: string; href: string; brand: string; icon: ReactNode }[] = [
  { label: "GitHub", href: PROFILE.github, brand: "#f0e6dc", icon: <IconBrandGithub size={20} /> },
  { label: "npm", href: PROFILE.npm, brand: "#cb3837", icon: <IconBrandNpm size={20} /> },
  { label: "LinkedIn", href: PROFILE.linkedin, brand: "#0a66c2", icon: <IconBrandLinkedin size={20} /> },
  { label: "X / Twitter", href: PROFILE.x, brand: "#f0e6dc", icon: <IconBrandX size={20} /> },
];

/**
 * The studio's sign-off: the brand with its profiles, every section of the
 * page with its accent, the ways to join or support, and the legal line.
 * A large wordmark closes the page under the dock. Also rendered by the legal
 * pages, so section links carry the home path, not a bare fragment.
 */
export function SiteFooter({ lang, dict }: SiteFooterProps) {
  const home = lang === "it" ? "/it/" : "/";
  const community: { label: string; href: string; icon: ReactNode }[] = [
    { label: "Discord", href: DISCORD_URL, icon: <IconBrandDiscordFilled size={18} color={DISCORD_BLURPLE} /> },
    { label: "Undolog.com", href: PROFILE.undolog, icon: <IconNews size={18} className="text-orange-400" /> },
    {
      label: dict.sponsor.ariaLabel,
      href: SPONSOR_URL,
      icon: <IconHeartFilled size={18} className="sponsor-heart text-[var(--mantine-color-pink-4)]" />,
    },
    { label: dict.sponsor.coffeeCta, href: DONATE_URL, icon: <IconCoffee size={18} className="text-amber-400" /> },
  ];

  return (
    <footer className="studio-footer">
      <Container size="lg">
        <div className="studio-footer__grid">
          <div className="studio-footer__brand">
            <a href={home} className="studio-footer__logo">
              <Image src="/logo.png" alt="" width={44} height={44} className="rounded-xl" />
              <span>
                Undolog<span className="text-orange-400">.</span>
              </span>
            </a>
            <Text className="studio-footer__kicker">{dict.hero.kicker}</Text>
            <ul className="studio-footer__social">
              {SOCIAL.map((s) => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    style={{ "--brand": s.brand } as TintStyle}
                  >
                    {s.icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label={dict.nav.projects}>
            <p className="studio-footer__heading">{dict.nav.projects}</p>
            <ul className="studio-footer__list studio-footer__list--two">
              {projects.sections.map((s) => (
                <li key={s.id}>
                  <a
                    href={`${home}#${s.id}`}
                    className="studio-footer__link"
                    style={{ "--accent": SECTION_ACCENTS[s.id] } as TintStyle}
                  >
                    <span aria-hidden className="studio-footer__dot" />
                    {SECTION_LABELS[s.id][lang]}
                    <span className="studio-footer__count">{s.projects.length}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={dict.footer.community}>
            <p className="studio-footer__heading">{dict.footer.community}</p>
            <ul className="studio-footer__list">
              {community.map((c) => (
                <li key={c.href}>
                  <a href={c.href} target="_blank" rel="noreferrer" className="studio-footer__link">
                    {c.icon}
                    {c.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/*
          Who publishes the site, on every page: brand, owner and VAT number,
          with the legal notice and the privacy policy one click away (see
          LEGAL in src/lib/legal.ts). Text pieces sit in template literals so
          no JSX whitespace rule can drop a space between them.
        */}
        <div className="studio-footer__bar">
          <Text size="xs" c="dimmed">
            {`© ${new Date().getFullYear()} ${LEGAL.brand} — ${LEGAL.owner} · P.IVA ${LEGAL.vatNumber} · `}
            <Anchor href={legalPath("legal", lang)} {...SMALL_PRINT_LINK}>
              {dict.footer.legal}
            </Anchor>
            {" · "}
            <Anchor href={legalPath("privacy", lang)} {...SMALL_PRINT_LINK}>
              {dict.footer.privacy}
            </Anchor>
          </Text>
          <Text size="xs" c="dimmed">
            {dict.footer.builtWith}{" "}
            <Anchor href="https://nextjs.org" target="_blank" rel="noreferrer" {...SMALL_PRINT_LINK}>
              Next.js
            </Anchor>{" "}
            &{" "}
            <Anchor href="https://mantine.dev" target="_blank" rel="noreferrer" {...SMALL_PRINT_LINK}>
              Mantine
            </Anchor>{" "}
            — {dict.footer.hostedOn}{" "}
            <Anchor href="https://pages.github.com" target="_blank" rel="noreferrer" {...SMALL_PRINT_LINK}>
              GitHub Pages
            </Anchor>
          </Text>
        </div>
      </Container>

      <div aria-hidden className="studio-footer__mark">
        <span className="studio-footer__wordmark">
          <span className="studio-footer__name">Undolog</span>
          <span className="studio-footer__period">.</span>
        </span>
      </div>
    </footer>
  );
}

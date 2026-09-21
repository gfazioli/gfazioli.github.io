import type { Lang } from "@/lib/i18n/dictionaries";
import { projects, type ProjectEntry, type SectionId } from "@/lib/projects";

export const SITE_URL = "https://gfazioli.github.io";

/** Where the same person is, elsewhere: the footer links plus the writing homes. */
export const PROFILES = [
  "https://github.com/gfazioli",
  "https://www.npmjs.com/~gfazioli",
  "https://it.linkedin.com/in/giovambattistafazioli",
  "https://twitter.com/gfazioli",
  "https://undolog.com",
  "https://dev.to/undolog",
  "https://medium.com/@giovambattista.fazioli",
  "https://packagist.org/users/gfazioli/packages/",
];

export const SITE_TITLE: Record<Lang, string> = {
  en: "Undolog — open source studio",
  it: "Undolog — studio open source",
};

export const SITE_DESCRIPTION: Record<Lang, string> = {
  en: "Undolog: React components, Mantine extensions, WordPress plugins, macOS apps and CLI tools — mostly open source.",
  it: "Undolog: componenti React, estensioni Mantine, plugin WordPress, app macOS e tool CLI — quasi tutto open source.",
};

export const PATH_BY_LANG: Record<Lang, string> = { en: "/", it: "/it/" };

/** Sections whose entries are applications someone installs and runs. */
const APP_SECTIONS: SectionId[] = ["macos", "cli", "raycast", "glaze"];

function projectNode(entry: ProjectEntry, section: SectionId) {
  const repo = entry.githubRepo;
  const common = {
    name: entry.displayName,
    url: entry.url,
    description: entry.description,
    ...(repo?.release ? { softwareVersion: repo.release.tag.replace(/^v/, "") } : {}),
  };

  if (APP_SECTIONS.includes(section)) {
    return {
      "@type": "SoftwareApplication",
      ...common,
      applicationCategory: "DeveloperApplication",
      // Only where it is certain: the macOS section is native Mac apps.
      ...(section === "macos" ? { operatingSystem: "macOS" } : {}),
      ...(repo ? { codeRepository: repo.url } : {}),
    };
  }

  return {
    "@type": "SoftwareSourceCode",
    ...common,
    ...(repo ? { codeRepository: repo.url } : {}),
    ...(repo?.language ? { programmingLanguage: repo.language } : {}),
  };
}

/**
 * One `@graph` per page: who publishes this, what the site is, and the
 * projects it lists. Everything here is read from `projects.json` or from
 * links that exist on the page — nothing is asserted that the site does not
 * already say.
 */
export function buildJsonLd(lang: Lang) {
  const url = `${SITE_URL}${PATH_BY_LANG[lang]}`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        name: "Giovambattista Fazioli",
        alternateName: "Undolog",
        url: SITE_URL,
        sameAs: PROFILES,
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: "Undolog",
        description: SITE_DESCRIPTION[lang],
        inLanguage: lang === "it" ? "it-IT" : "en-US",
        publisher: { "@id": `${SITE_URL}/#person` },
      },
      {
        "@type": "CollectionPage",
        "@id": `${url}#page`,
        url,
        name: SITE_TITLE[lang],
        description: SITE_DESCRIPTION[lang],
        inLanguage: lang === "it" ? "it-IT" : "en-US",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#person` },
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: projects.projectCount,
          itemListElement: projects.sections.flatMap((section, sectionIndex) =>
            section.projects.map((entry, entryIndex) => ({
              "@type": "ListItem",
              position: sectionIndex * 100 + entryIndex + 1,
              item: projectNode(entry, section.id),
            }))
          ),
        },
      },
    ],
  };
}

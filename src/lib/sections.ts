import type { Lang } from "@/lib/i18n/dictionaries";
import type { SectionId } from "@/lib/projects";

type Localized = Record<Lang, string>;

/** Short names for the dock and the search results. */
export const SECTION_LABELS: Record<SectionId, Localized> = {
  core: { en: "Flagship", it: "Principali" },
  macos: { en: "macOS", it: "macOS" },
  cli: { en: "CLI", it: "CLI" },
  mantine: { en: "Mantine", it: "Mantine" },
  react: { en: "React", it: "React" },
  templates: { en: "Templates", it: "Template" },
  wordpress: { en: "WordPress", it: "WordPress" },
  raycast: { en: "Raycast", it: "Raycast" },
  glaze: { en: "Glaze", it: "Glaze" },
};

/**
 * One accent per section, taken from the logo's own palette (amber, coral,
 * teal, sky, cream) plus the brand colour of the platform where it has one.
 * The page light stays warm; the accent only tints a section's kicker, icon,
 * count, dock dot and card hover, so each section is recognisable without
 * switching the whole background to another mood.
 */
export const SECTION_ACCENTS: Record<SectionId, string> = {
  core: "#ff9f1c",
  macos: "#ff7a59",
  cli: "#3ddc97",
  mantine: "#4dabf7",
  react: "#61dafb",
  templates: "#ffc145",
  wordpress: "#6cc4f0",
  raycast: "#ff6363",
  glaze: "#f783ac",
};

/** Accents of the page parts that are not project sections. */
export const LINKS_ACCENT = "#ffc145";
export const SPONSOR_ACCENT = "#f06595";

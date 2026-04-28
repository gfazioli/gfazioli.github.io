export type Lang = "en" | "it";

export interface Dictionary {
  nav: {
    projects: string;
    mantine: string;
    timeline: string;
    links: string;
  };
  hero: {
    kicker: string;
    title: string;
    subtitle: string;
    ctaProjects: string;
    ctaGithub: string;
  };
  projects: {
    sectionTitle: string;
    sectionSubtitle: string;
    filter: { all: string };
    empty: string;
    stars: string;
    live: string;
    repo: string;
  };
  timeline: {
    title: string;
    subtitle: string;
  };
  footer: {
    built: string;
  };
}

const dictionaries: Record<Lang, Dictionary> = {
  en: {
    nav: {
      projects: "Projects",
      mantine: "Mantine Extensions",
      timeline: "Since 1983",
      links: "Links",
    },
    hero: {
      kicker: "Open source studio · Since 1983",
      title: "Undolog.",
      subtitle:
        "React components, Mantine extensions, WordPress plugins, macOS apps and CLI tools — mostly open source.",
      ctaProjects: "Explore projects",
      ctaGithub: "View on GitHub",
    },
    projects: {
      sectionTitle: "Projects",
      sectionSubtitle: "A live feed from my GitHub — refreshed daily.",
      filter: { all: "All" },
      empty: "Nothing to show yet.",
      stars: "stars",
      live: "Live",
      repo: "Repo",
    },
    timeline: {
      title: "Since 1983",
      subtitle: "A short history of the machines and languages I grew up with.",
    },
    footer: {
      built: "Built with Next.js & Mantine — hosted on GitHub Pages",
    },
  },
  it: {
    nav: {
      projects: "Progetti",
      mantine: "Estensioni Mantine",
      timeline: "Dal 1983",
      links: "Link",
    },
    hero: {
      kicker: "Studio open source · Dal 1983",
      title: "Undolog.",
      subtitle:
        "Componenti React, estensioni Mantine, plugin WordPress, app macOS e tool CLI — quasi tutto open source.",
      ctaProjects: "Vai ai progetti",
      ctaGithub: "Vai su GitHub",
    },
    projects: {
      sectionTitle: "Progetti",
      sectionSubtitle: "Un feed live dal mio GitHub — aggiornato ogni giorno.",
      filter: { all: "Tutti" },
      empty: "Ancora nulla da mostrare.",
      stars: "stelle",
      live: "Live",
      repo: "Repo",
    },
    timeline: {
      title: "Dal 1983",
      subtitle:
        "Una breve storia delle macchine e dei linguaggi con cui sono cresciuto.",
    },
    footer: {
      built: "Costruito con Next.js & Mantine — ospitato su GitHub Pages",
    },
  },
};

export function getDictionary(lang: Lang): Dictionary {
  return dictionaries[lang];
}

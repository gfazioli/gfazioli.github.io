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
    stats: {
      projects: string;
      stars: string;
      categories: string;
      since: string;
      latestRelease: string;
    };
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
  sponsor: {
    nav: string;
    kicker: string;
    title: string;
    body: string;
    cta: string;
    coffeeCta: string;
    ariaLabel: string;
    logoHere: string;
  };
  footer: {
    builtWith: string;
    hostedOn: string;
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
      stats: {
        projects: "Projects",
        stars: "GitHub stars",
        categories: "Categories",
        since: "Coding since",
        latestRelease: "Latest release",
      },
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
    sponsor: {
      nav: "Sponsor",
      kicker: "Support",
      title: "Support my open source work",
      body: "I build and maintain these tools in my spare time — free and open source. If they save you time or you find them useful, sponsoring helps me keep developing and maintaining them.",
      cta: "Sponsor me on GitHub",
      coffeeCta: "Buy me a coffee",
      ariaLabel: "Sponsor on GitHub",
      logoHere: "Your logo here",
    },
    footer: {
      builtWith: "Built with",
      hostedOn: "hosted on",
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
      stats: {
        projects: "Progetti",
        stars: "Stelle GitHub",
        categories: "Categorie",
        since: "Programmo dal",
        latestRelease: "Ultima release",
      },
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
    sponsor: {
      nav: "Sponsor",
      kicker: "Sostieni",
      title: "Sostieni il mio lavoro open source",
      body: "Costruisco e mantengo questi strumenti nel tempo libero, gratis e open source. Se ti fanno risparmiare tempo o ti tornano utili, una sponsorizzazione mi aiuta a continuare a svilupparli e mantenerli.",
      cta: "Sponsorizzami su GitHub",
      coffeeCta: "Offrimi un caffè",
      ariaLabel: "Sponsorizza su GitHub",
      logoHere: "Il tuo logo qui",
    },
    footer: {
      builtWith: "Costruito con",
      hostedOn: "ospitato su",
    },
  },
};

export function getDictionary(lang: Lang): Dictionary {
  return dictionaries[lang];
}

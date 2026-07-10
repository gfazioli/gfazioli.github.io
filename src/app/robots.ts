import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: [
      "https://gfazioli.github.io/sitemap.xml",
      "https://gfazioli.github.io/react-tilt/sitemap.xml",
      "https://gfazioli.github.io/react-flip/sitemap.xml",
      "https://gfazioli.github.io/react-toggle/sitemap.xml",
      "https://gfazioli.github.io/react-amiga-guru-meditation/sitemap.xml",
    ],
  };
}

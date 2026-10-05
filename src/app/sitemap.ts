import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://gfazioli.github.io";
  const now = new Date();
  return [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${base}/it/`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/legal/`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/it/legal/`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/privacy/`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/it/privacy/`, changeFrequency: "yearly", priority: 0.2 },
  ];
}

import type { Metadata } from "next";
import { HomePage } from "@/components/HomePage";
import { JsonLd } from "@/components/JsonLd";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { SITE_DESCRIPTION, SITE_TITLE } from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: SITE_TITLE.it },
  description: SITE_DESCRIPTION.it,
  alternates: {
    canonical: "/it/",
    languages: { en: "/", it: "/it/", "x-default": "/" },
  },
  openGraph: {
    url: "/it/",
    title: SITE_TITLE.it,
    description: SITE_DESCRIPTION.it,
    locale: "it_IT",
    alternateLocale: ["en_US"],
    // The generated `opengraph-image` belongs to the root route and is NOT
    // inherited once a page declares its own `openGraph`, so /it/ shipped
    // without any og:image until this was named explicitly. `.png` is the
    // name `postbuild-og.mjs` renames the export to.
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: SITE_TITLE.it,
      },
    ],
  },
};

export default function Page() {
  const dict = getDictionary("it");
  return (
    <>
      <JsonLd lang="it" />
      <HomePage lang="it" dict={dict} />
    </>
  );
}

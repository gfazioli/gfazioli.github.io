import type { Metadata } from "next";
import { HomePage } from "@/components/HomePage";
import { JsonLd } from "@/components/JsonLd";
import { LanguageDetector } from "@/components/LanguageDetector";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { SITE_DESCRIPTION, SITE_TITLE } from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: SITE_TITLE.en },
  description: SITE_DESCRIPTION.en,
  alternates: {
    canonical: "/",
    languages: { en: "/", it: "/it/", "x-default": "/" },
  },
  openGraph: {
    url: "/",
    title: SITE_TITLE.en,
    description: SITE_DESCRIPTION.en,
    locale: "en_US",
    alternateLocale: ["it_IT"],
  },
};

export default function Page() {
  const dict = getDictionary("en");
  return (
    <>
      <JsonLd lang="en" />
      <LanguageDetector />
      <HomePage lang="en" dict={dict} />
    </>
  );
}

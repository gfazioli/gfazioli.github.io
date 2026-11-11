import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { LEGAL_CONTENT, legalPath } from "@/lib/legal";

const content = LEGAL_CONTENT.goodies.en;

export const metadata: Metadata = {
  title: content.title,
  description: content.description,
  alternates: {
    canonical: legalPath("goodies", "en"),
    languages: { en: legalPath("goodies", "en"), it: legalPath("goodies", "it") },
  },
};

export default function Page() {
  return <LegalPage doc="goodies" lang="en" dict={getDictionary("en")} />;
}

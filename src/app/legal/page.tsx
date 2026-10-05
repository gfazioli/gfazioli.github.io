import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { LEGAL_CONTENT, legalPath } from "@/lib/legal";

const content = LEGAL_CONTENT.legal.en;

export const metadata: Metadata = {
  title: content.title,
  description: content.description,
  alternates: {
    canonical: legalPath("legal", "en"),
    languages: { en: legalPath("legal", "en"), it: legalPath("legal", "it") },
  },
};

export default function Page() {
  return <LegalPage doc="legal" lang="en" dict={getDictionary("en")} />;
}

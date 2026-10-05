import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { LEGAL_CONTENT, legalPath } from "@/lib/legal";

const content = LEGAL_CONTENT.privacy.en;

export const metadata: Metadata = {
  title: content.title,
  description: content.description,
  alternates: {
    canonical: legalPath("privacy", "en"),
    languages: { en: legalPath("privacy", "en"), it: legalPath("privacy", "it") },
  },
};

export default function Page() {
  return <LegalPage doc="privacy" lang="en" dict={getDictionary("en")} />;
}

import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { LEGAL_CONTENT, legalPath } from "@/lib/legal";

const content = LEGAL_CONTENT.privacy.it;

export const metadata: Metadata = {
  title: content.title,
  description: content.description,
  alternates: {
    canonical: legalPath("privacy", "it"),
    languages: { en: legalPath("privacy", "en"), it: legalPath("privacy", "it") },
  },
};

export default function Page() {
  return <LegalPage doc="privacy" lang="it" dict={getDictionary("it")} />;
}

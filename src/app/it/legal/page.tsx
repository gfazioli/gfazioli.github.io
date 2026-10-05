import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { LEGAL_CONTENT, legalPath } from "@/lib/legal";

const content = LEGAL_CONTENT.legal.it;

export const metadata: Metadata = {
  title: content.title,
  description: content.description,
  alternates: {
    canonical: legalPath("legal", "it"),
    languages: { en: legalPath("legal", "en"), it: legalPath("legal", "it") },
  },
};

export default function Page() {
  return <LegalPage doc="legal" lang="it" dict={getDictionary("it")} />;
}

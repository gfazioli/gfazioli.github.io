import { HomePage } from "@/components/HomePage";
import { LanguageDetector } from "@/components/LanguageDetector";
import { getDictionary } from "@/lib/i18n/dictionaries";

export default function Page() {
  const dict = getDictionary("en");
  return (
    <>
      <LanguageDetector />
      <HomePage lang="en" dict={dict} />
    </>
  );
}

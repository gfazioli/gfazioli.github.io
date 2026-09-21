import type { Lang } from "@/lib/i18n/dictionaries";
import { buildJsonLd } from "@/lib/seo";

/**
 * Structured data for the page. Rendered server-side into the static HTML, so
 * a crawler sees it without running anything.
 */
export function JsonLd({ lang }: { lang: Lang }) {
  return (
    <script
      type="application/ld+json"
      // The payload is built from our own data file, never from user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd(lang)) }}
    />
  );
}

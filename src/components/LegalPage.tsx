import { Anchor, Container, List, ListItem, Stack, Text, Title } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { Fragment, type ReactNode } from "react";
import { SiteFooter } from "./SiteFooter";
import type { Dictionary, Lang } from "@/lib/i18n/dictionaries";
import { LEGAL, LEGAL_CONTENT, legalPath, type LegalDoc } from "@/lib/legal";

interface LegalPageProps {
  doc: LegalDoc;
  lang: Lang;
  dict: Dictionary;
}

/** The contact address, wherever it appears in the copy, as a mailto link. */
function withEmailLinks(text: string): ReactNode {
  const parts = text.split(LEGAL.email);
  return parts.map((part, i) => (
    <Fragment key={i}>
      {part}
      {i < parts.length - 1 ? (
        <Anchor href={`mailto:${LEGAL.email}`} inherit>
          {LEGAL.email}
        </Anchor>
      ) : null}
    </Fragment>
  ));
}

/** A list item's lead, up to its first ':' or '.', set in bold. */
function withLead(text: string): ReactNode {
  const match = /^([^:.]{1,40}[:.])\s/.exec(text);
  if (!match) return withEmailLinks(text);
  return (
    <>
      <Text span fw={600} inherit>
        {match[1]}
      </Text>{" "}
      {withEmailLinks(text.slice(match[0].length))}
    </>
  );
}

/**
 * The legal notice and the privacy policy, in either language: a page of its
 * own, so the footer links to it from every page and a crawler finds it at a
 * stable URL. `ListItem`, not `List.Item`: this is a server component, and a
 * compound member read across the client boundary is undefined at prerender
 * ("Element type is invalid").
 */
export function LegalPage({ doc, lang, dict }: LegalPageProps) {
  const content = LEGAL_CONTENT[doc][lang];
  const other: LegalDoc = doc === "legal" ? "privacy" : "legal";
  const home = lang === "it" ? "/it/" : "/";

  return (
    <>
      <main className="flex-1">
        <Container size="sm" py={48}>
          <Stack gap="lg">
            <Anchor
              href={home}
              c="dimmed"
              size="sm"
              style={{ display: "inline-flex", alignItems: "center", gap: 4, alignSelf: "flex-start" }}
            >
              <IconArrowLeft size={14} />
              {LEGAL.brand}
            </Anchor>
            <Title order={1}>{content.title}</Title>
            {content.updated ? (
              <Text size="sm" c="dimmed" fs="italic">
                {content.updated}
              </Text>
            ) : null}
            {content.sections.map((section, i) => (
              <Stack key={i} gap="xs">
                {section.heading ? <Title order={2} size="h3">{section.heading}</Title> : null}
                {section.paragraphs?.map((p, j) => <Text key={j}>{withEmailLinks(p)}</Text>)}
                {section.items ? (
                  <List spacing="xs" listStyleType="disc" withPadding>
                    {section.items.map((item, j) => (
                      <ListItem key={j}>{withLead(item)}</ListItem>
                    ))}
                  </List>
                ) : null}
              </Stack>
            ))}
            <Text size="sm">
              <Anchor href={legalPath(other, lang)}>{LEGAL_CONTENT[other][lang].title}</Anchor>
            </Text>
          </Stack>
        </Container>
      </main>
      <SiteFooter lang={lang} dict={dict} />
    </>
  );
}

import { Anchor, Badge, Group, Text } from "@mantine/core";
import type { Dictionary, Lang } from "@/lib/i18n/dictionaries";
import { projects } from "@/lib/projects";

interface HeroStatsProps {
  lang: Lang;
  dict: Dictionary;
}

interface Release {
  name: string;
  tag: string;
  publishedAt: string;
  url: string;
}

/** How many releases the panel lists; the rest is summarised as a count. */
const SHOWN = 3;
const RECENT_DAYS = 30;

/** Totals computed at build time from the generated projects.json. */
function collect() {
  let stars = 0;
  const releases: Release[] = [];
  for (const section of projects.sections) {
    for (const p of section.projects) {
      const repo = p.githubRepo;
      if (!repo) continue;
      stars += repo.stars;
      if (repo.release) {
        releases.push({ name: p.displayName, ...repo.release });
      }
    }
  }
  // ISO-8601 with a fixed "Z" suffix, so a string comparison orders correctly.
  releases.sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
  return { stars, releases };
}

export function HeroStats({ lang, dict }: HeroStatsProps) {
  const { stars, releases } = collect();
  const locale = lang === "it" ? "it-IT" : "en-US";
  const fmt = (n: number) => n.toLocaleString(locale);
  const shortDate = new Intl.DateTimeFormat(locale, { day: "numeric", month: "short" });

  const stats = [
    { value: fmt(projects.projectCount), label: dict.hero.stats.projects },
    { value: fmt(stars), label: dict.hero.stats.stars },
    { value: fmt(projects.sectionCount), label: dict.hero.stats.categories },
    { value: "1983", label: dict.hero.stats.since },
  ];

  const shown = releases.slice(0, SHOWN);
  // "Recent" is measured from the data snapshot, not from the visitor's clock,
  // so the static page never drifts between builds.
  const since = new Date(projects.fetchedAt).getTime() - RECENT_DAYS * 86_400_000;
  const more = releases
    .slice(SHOWN)
    .filter((r) => new Date(r.publishedAt).getTime() >= since).length;

  return (
    <div className="hero-stats w-full rounded-2xl p-6 md:w-[320px]">
      <div className="grid grid-cols-2 gap-x-6 gap-y-5">
        {stats.map((s) => (
          <div key={s.label}>
            <Text fz={34} fw={800} lh={1} ff="monospace" className="tabular-nums">
              {s.value}
            </Text>
            <Text fz="xs" c="dimmed" tt="uppercase" lts={1} mt={6}>
              {s.label}
            </Text>
          </div>
        ))}
      </div>

      {shown.length > 0 ? (
        <div className="mt-6 border-t border-white/10 pt-5">
          <Text fz="xs" c="dimmed" tt="uppercase" lts={1} mb={8}>
            {dict.hero.stats.latestReleases}
          </Text>
          <ul className="m-0 flex list-none flex-col gap-2 p-0">
            {shown.map((r) => (
              <li key={r.url} className="flex items-center justify-between gap-3">
                <Group gap="xs" wrap="nowrap" style={{ minWidth: 0 }}>
                  <Anchor
                    href={r.url}
                    target="_blank"
                    rel="noreferrer"
                    c="bright"
                    fw={600}
                    fz="sm"
                    underline="never"
                    className="truncate"
                  >
                    {r.name}
                  </Anchor>
                  <Badge variant="light" color="teal" size="sm" className="shrink-0">
                    {r.tag}
                  </Badge>
                </Group>
                <Text fz="xs" c="dimmed" className="shrink-0 tabular-nums">
                  {shortDate.format(new Date(r.publishedAt))}
                </Text>
              </li>
            ))}
          </ul>
          {more > 0 ? (
            <Text fz="xs" c="dimmed" mt={8}>
              {dict.hero.stats.moreReleases.replace("{n}", fmt(more))}
            </Text>
          ) : null}
        </div>
      ) : null}

      <Group gap={8} mt="md" wrap="nowrap" align="center">
        <span className="live-dot" aria-hidden />
        <Text fz="xs" c="dimmed">
          {dict.projects.sectionSubtitle}
        </Text>
      </Group>
    </div>
  );
}

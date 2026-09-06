import { Anchor, Badge, Group, Text } from "@mantine/core";
import type { Dictionary, Lang } from "@/lib/i18n/dictionaries";
import { projects } from "@/lib/projects";

interface HeroStatsProps {
  lang: Lang;
  dict: Dictionary;
}

interface LatestRelease {
  name: string;
  tag: string;
  publishedAt: string;
  url: string;
}

/** Totals computed at build time from the generated projects.json. */
function collect() {
  let stars = 0;
  let latest: LatestRelease | null = null;
  for (const section of projects.sections) {
    for (const p of section.projects) {
      const repo = p.githubRepo;
      if (!repo) continue;
      stars += repo.stars;
      const rel = repo.release;
      // ISO-8601 with a fixed "Z" suffix, so a string comparison orders correctly.
      if (rel && (!latest || rel.publishedAt > latest.publishedAt)) {
        latest = { name: p.displayName, tag: rel.tag, publishedAt: rel.publishedAt, url: rel.url };
      }
    }
  }
  return { stars, latest };
}

export function HeroStats({ lang, dict }: HeroStatsProps) {
  const { stars, latest } = collect();
  const locale = lang === "it" ? "it-IT" : "en-US";
  const fmt = (n: number) => n.toLocaleString(locale);

  const stats = [
    { value: fmt(projects.projectCount), label: dict.hero.stats.projects },
    { value: fmt(stars), label: dict.hero.stats.stars },
    { value: fmt(projects.sectionCount), label: dict.hero.stats.categories },
    { value: "1983", label: dict.hero.stats.since },
  ];

  const releaseDate = latest
    ? new Intl.DateTimeFormat(locale, { day: "numeric", month: "short", year: "numeric" }).format(
        new Date(latest.publishedAt)
      )
    : null;

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

      {latest ? (
        <div className="mt-6 border-t border-white/10 pt-5">
          <Text fz="xs" c="dimmed" tt="uppercase" lts={1}>
            {dict.hero.stats.latestRelease}
          </Text>
          <Group gap="xs" mt={6} wrap="nowrap">
            <Anchor
              href={latest.url}
              target="_blank"
              rel="noreferrer"
              c="bright"
              fw={600}
              underline="never"
              className="truncate"
            >
              {latest.name}
            </Anchor>
            <Badge variant="light" color="teal" size="sm" className="shrink-0">
              {latest.tag}
            </Badge>
          </Group>
          <Text fz="xs" c="dimmed" mt={4}>
            {releaseDate}
          </Text>
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

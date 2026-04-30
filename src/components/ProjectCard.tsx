import {
  Anchor,
  Badge,
  Card,
  CardSection,
  Group,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import {
  IconBrandGithub,
  IconExternalLink,
  IconStar,
} from "@tabler/icons-react";
import type { ProjectEntry } from "@/lib/projects";

interface ProjectCardProps {
  project: ProjectEntry;
  icon?: string;
}

export function ProjectCard({ project, icon }: ProjectCardProps) {
  const repo = project.githubRepo;
  const ogImage = repo?.ogImage;

  return (
    <Card
      withBorder
      radius="lg"
      padding={0}
      className="group relative overflow-hidden transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg"
    >
      {ogImage ? (
        <CardSection>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={ogImage}
            alt=""
            loading="lazy"
            className="block aspect-[2/1] w-full object-cover bg-[var(--mantine-color-default-hover)]"
          />
        </CardSection>
      ) : null}

      <Stack gap="sm" h="100%" p="lg">
        <Group justify="space-between" wrap="nowrap" align="flex-start">
          <Group gap="sm" wrap="nowrap" align="center" style={{ minWidth: 0 }}>
            {icon ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={icon}
                alt=""
                width={40}
                height={40}
                loading="lazy"
                className="block shrink-0 rounded-md"
              />
            ) : null}
            <Title order={3} fz="lg" lineClamp={1} title={project.displayName}>
              {project.displayName}
            </Title>
          </Group>
          {repo ? (
            <Group gap={4} c="dimmed">
              <IconStar size={14} />
              <Text size="sm" fw={600}>
                {repo.stars}
              </Text>
            </Group>
          ) : null}
        </Group>

        <Text size="sm" c="dimmed" lineClamp={4} flex={1}>
          {project.description}
        </Text>

        {repo && repo.topics.length > 0 ? (
          <Group gap={4} mt="xs">
            {repo.topics.slice(0, 4).map((t) => (
              <Badge
                key={t}
                variant="light"
                color="gray"
                size="xs"
                radius="sm"
                tt="lowercase"
              >
                {t}
              </Badge>
            ))}
          </Group>
        ) : null}

        <Group justify="space-between" mt="auto" pt="sm">
          <Group gap="xs">
            {repo?.language ? (
              <Badge variant="dot" color="orange" size="sm">
                {repo.language}
              </Badge>
            ) : null}
            {repo?.release ? (
              <Badge variant="light" color="teal" size="sm">
                {repo.release.tag}
              </Badge>
            ) : null}
            {project.external && !repo ? (
              <Badge variant="outline" color="gray" size="sm">
                external
              </Badge>
            ) : null}
          </Group>
          <Group gap="xs">
            <Anchor
              href={project.url}
              target="_blank"
              rel="noreferrer"
              c="orange"
              aria-label={project.displayName}
            >
              <IconExternalLink size={18} />
            </Anchor>
            {repo ? (
              <Anchor
                href={repo.url}
                target="_blank"
                rel="noreferrer"
                c="dimmed"
                aria-label={`GitHub: ${repo.name}`}
              >
                <IconBrandGithub size={18} />
              </Anchor>
            ) : null}
          </Group>
        </Group>
      </Stack>
    </Card>
  );
}

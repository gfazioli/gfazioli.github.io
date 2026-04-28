import { Card, Stack, Text } from "@mantine/core";
import {
  IconBrandMedium,
  IconBrandNpm,
  IconLink,
  type IconProps,
} from "@tabler/icons-react";
import Image from "next/image";
import { SiDevdotto, SiPackagist, SiSubstack } from "react-icons/si";
import type { ComponentType } from "react";
import type { TechLink } from "@/lib/projects";

interface TechLinkCardProps {
  link: TechLink;
}

interface ResolvedIcon {
  type: "image" | "tabler" | "si";
  src?: string;
  Icon?: ComponentType<IconProps> | ComponentType<{ size?: number; className?: string }>;
}

function resolveIcon(url: string): ResolvedIcon {
  let host = "";
  try {
    host = new URL(url).hostname.toLowerCase();
  } catch {
    /* noop */
  }

  if (host.endsWith("undolog.com")) {
    return { type: "image", src: "/logo.png" };
  }
  if (host.endsWith("dev.to")) {
    return { type: "si", Icon: SiDevdotto };
  }
  if (host.endsWith("medium.com")) {
    return { type: "tabler", Icon: IconBrandMedium as ComponentType<IconProps> };
  }
  if (host.endsWith("npmjs.com")) {
    return { type: "tabler", Icon: IconBrandNpm as ComponentType<IconProps> };
  }
  if (host.endsWith("substack.com")) {
    return { type: "si", Icon: SiSubstack };
  }
  if (host.endsWith("packagist.org")) {
    return { type: "si", Icon: SiPackagist };
  }
  return { type: "tabler", Icon: IconLink as ComponentType<IconProps> };
}

export function TechLinkCard({ link }: TechLinkCardProps) {
  const icon = resolveIcon(link.url);

  return (
    <Card
      withBorder
      radius="lg"
      padding="lg"
      component="a"
      href={link.url}
      target="_blank"
      rel="noreferrer"
      className="group block transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-orange-500"
    >
      <Stack gap="xs" align="center" h="100%">
        <div className="flex h-12 w-12 items-center justify-center text-orange-400">
          {icon.type === "image" && icon.src ? (
            <Image
              src={icon.src}
              alt=""
              width={44}
              height={44}
              className="rounded-md"
            />
          ) : null}
          {icon.type === "tabler" && icon.Icon ? (
            <icon.Icon size={40} stroke={1.5} />
          ) : null}
          {icon.type === "si" && icon.Icon ? <icon.Icon size={36} /> : null}
        </div>
        <Text fw={700} ta="center">
          {link.displayName}
        </Text>
        <Text size="xs" c="dimmed" ta="center" lineClamp={2}>
          {link.description}
        </Text>
      </Stack>
    </Card>
  );
}

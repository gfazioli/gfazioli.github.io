import { ActionIcon, Tooltip, type ActionIconProps } from "@mantine/core";
import { IconBrandDiscordFilled } from "@tabler/icons-react";

/**
 * The Undolog Discord server, opened 2026-10-08: the home of FinderGit,
 * Netfox, Lancetta and octoscope. It replaces the Undolog Slack, which is
 * being retired. The invite never expires.
 */
export const DISCORD_URL = "https://discord.gg/rdWu5yFCR6";

/** Discord's own blurple. White on it is 4.6:1. */
export const DISCORD_BLURPLE = "#5865F2";

interface DiscordButtonProps extends ActionIconProps {
  label: string;
  iconSize?: number;
}

export function DiscordButton({ label, iconSize = 18, ...props }: DiscordButtonProps) {
  return (
    <Tooltip label={label}>
      <ActionIcon
        component="a"
        href={DISCORD_URL}
        target="_blank"
        rel="noreferrer"
        variant="filled"
        color={DISCORD_BLURPLE}
        aria-label={label}
        {...props}
      >
        <IconBrandDiscordFilled size={iconSize} />
      </ActionIcon>
    </Tooltip>
  );
}

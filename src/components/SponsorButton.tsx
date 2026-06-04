import { Button, type ButtonProps } from "@mantine/core";
import { IconHeartFilled } from "@tabler/icons-react";

export const SPONSOR_URL = "https://github.com/sponsors/gfazioli";

interface SponsorButtonProps extends ButtonProps {
  label: string;
  /** Defaults to the GitHub Sponsors page; pass an anchor (e.g. "#sponsor") to scroll in-page instead */
  href?: string;
}

export function SponsorButton({ label, href = SPONSOR_URL, ...props }: SponsorButtonProps) {
  const isAnchor = href.startsWith("#");
  return (
    <Button
      component="a"
      href={href}
      target={isAnchor ? undefined : "_blank"}
      rel={isAnchor ? undefined : "noreferrer"}
      variant="gradient"
      gradient={{ from: "pink", to: "violet", deg: 45 }}
      leftSection={
        <IconHeartFilled size={18} className="sponsor-heart" />
      }
      {...props}
    >
      {label}
    </Button>
  );
}

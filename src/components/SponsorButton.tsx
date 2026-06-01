import { Button, type ButtonProps } from "@mantine/core";
import { IconHeartFilled } from "@tabler/icons-react";

export const SPONSOR_URL = "https://github.com/sponsors/gfazioli";

interface SponsorButtonProps extends ButtonProps {
  label: string;
}

export function SponsorButton({ label, ...props }: SponsorButtonProps) {
  return (
    <Button
      component="a"
      href={SPONSOR_URL}
      target="_blank"
      rel="noreferrer"
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

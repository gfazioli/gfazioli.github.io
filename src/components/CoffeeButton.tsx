import { Button, type ButtonProps } from "@mantine/core";
import { IconCoffee } from "@tabler/icons-react";

export const DONATE_URL = "https://donate.stripe.com/fZu4gy4Tn3b1dgudGx0co00";

interface CoffeeButtonProps extends ButtonProps {
  label: string;
}

export function CoffeeButton({ label, ...props }: CoffeeButtonProps) {
  return (
    <Button
      component="a"
      href={DONATE_URL}
      target="_blank"
      rel="noreferrer"
      variant="gradient"
      gradient={{ from: "yellow.7", to: "orange.7", deg: 45 }}
      leftSection={<IconCoffee size={18} />}
      {...props}
    >
      {label}
    </Button>
  );
}

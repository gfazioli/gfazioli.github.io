import {
  IconBrandApple,
  IconBrandReact,
  IconBrandWordpress,
  IconRocket,
  IconTemplate,
  IconTerminal2,
  type IconProps,
} from "@tabler/icons-react";
import { SiMantine, SiRaycast } from "react-icons/si";
import type { SectionId } from "@/lib/projects";

interface SectionIconProps {
  id: SectionId;
  size?: number;
  className?: string;
}

export function SectionIcon({ id, size = 32, className }: SectionIconProps) {
  const tablerProps: IconProps = { size, stroke: 1.5, className };
  switch (id) {
    case "core":
      return <IconRocket {...tablerProps} />;
    case "macos":
      return <IconBrandApple {...tablerProps} />;
    case "cli":
      return <IconTerminal2 {...tablerProps} />;
    case "mantine":
      return <SiMantine size={size} className={className} />;
    case "react":
      return <IconBrandReact {...tablerProps} />;
    case "templates":
      return <IconTemplate {...tablerProps} />;
    case "wordpress":
      return <IconBrandWordpress {...tablerProps} />;
    case "raycast":
      return <SiRaycast size={size} className={className} />;
    default:
      return null;
  }
}

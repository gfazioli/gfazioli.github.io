export interface Sponsor {
  key: string;
  name: string;
  /** GitHub username — the avatar is resolved as https://github.com/<github>.png */
  github: string;
  /** Optional website to link instead of the GitHub profile */
  href?: string;
}

/**
 * Current GitHub sponsors, shown in the Support section.
 * Keep in sync with the sponsors.ts used by the Mantine component docs footers.
 */
export const sponsors: Sponsor[] = [{ key: "kastov", name: "kastov", github: "kastov" }];

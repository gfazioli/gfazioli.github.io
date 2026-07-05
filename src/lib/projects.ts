import projectsData from "@/data/projects.json";

export interface ProjectEntry {
  displayName: string;
  url: string;
  description: string;
  external: boolean;
  /** og:image of the external site (external entries only). */
  ogImage?: string | null;
  githubRepo?: {
    name: string;
    fullName: string;
    url: string;
    stars: number;
    forks: number;
    topics: string[];
    language: string | null;
    pushedAt: string;
    release: { tag: string; publishedAt: string; url: string } | null;
    ogImage: string | null;
    defaultBranch: string;
  };
}

export type SectionId =
  | "core"
  | "macos"
  | "cli"
  | "mantine"
  | "react"
  | "templates"
  | "wordpress"
  | "raycast"
  | "glaze";

export interface ProjectSection {
  id: SectionId;
  title: string;
  titleIt: string;
  projects: ProjectEntry[];
}

export interface TechLink {
  displayName: string;
  url: string;
  description: string;
}

export interface ProjectsPayload {
  user: string;
  fetchedAt: string;
  sectionCount: number;
  projectCount: number;
  sections: ProjectSection[];
  techLinks: TechLink[];
}

export const projects: ProjectsPayload = projectsData as ProjectsPayload;

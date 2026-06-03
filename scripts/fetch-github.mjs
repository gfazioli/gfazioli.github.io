#!/usr/bin/env node
/**
 * Builds `src/data/projects.json` from the canonical project list in
 * https://github.com/gfazioli/gfazioli README.md.
 *
 * The README is the source of truth (categories, descriptions, ordering).
 * For every entry that maps to a `gfazioli/<repo>` GitHub project, the script
 * enriches the entry with live API data (stars, topics, latest release, etc.).
 * Entries that point to external sites stay as-is.
 */

import { writeFile, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { Octokit } from "@octokit/rest";

const USER = "gfazioli";
const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT = resolve(__dirname, "..", "src", "data", "projects.json");

const auth = process.env.GITHUB_TOKEN;
const octokit = new Octokit(auth ? { auth } : {});

/**
 * Mapping from README headings to internal category ids.
 * The first "core" section has no subheading — items between
 * `⭐ Projects` and the first `####` belong there.
 */
const SECTION_MAP = {
  __core__: { id: "core", title: "Flagship", titleIt: "Progetti principali" },
  "MacOS": { id: "macos", title: "macOS apps", titleIt: "App macOS" },
  "CLI / Terminal": { id: "cli", title: "CLI & Terminal", titleIt: "CLI & Terminale" },
  "Mantine UI Components": {
    id: "mantine",
    title: "Mantine UI Components",
    titleIt: "Componenti Mantine UI",
  },
  "React Components": {
    id: "react",
    title: "React Components",
    titleIt: "Componenti React",
  },
  "Templates": { id: "templates", title: "Templates", titleIt: "Template" },
  "WordPress Plugins": {
    id: "wordpress",
    title: "WordPress Plugins",
    titleIt: "Plugin WordPress",
  },
  "Raycast Extensions I maintain or contribute to": {
    id: "raycast",
    title: "Raycast — maintain or contribute to",
    titleIt: "Raycast — manutenzione e contributi",
  },
};

const BULLET_RE = /^>\s*-\s*\[([^\]]+)\]\(([^)]+)\)\s*-\s*_([^_]+)_\s*$/;
const SUBHEAD_RE = /^>\s*####\s*(.+?)\s*$/;
const PROJECTS_HEAD_RE = /<h3>⭐\s*Projects<\/h3>/i;
const TECHLINKS_HEAD_RE = /<h3>⭐\s*Tech Links<\/h3>/i;
const NEXT_BLOCK_RE = /^>\s*\[!/;

function parseReadme(md) {
  const lines = md.split("\n");
  let inProjects = false;
  let currentSection = "__core__";
  const sections = {};

  for (const rawLine of lines) {
    const line = rawLine.replace(/\r$/, "");

    if (!inProjects) {
      if (PROJECTS_HEAD_RE.test(line)) {
        inProjects = true;
      }
      continue;
    }

    if (NEXT_BLOCK_RE.test(line)) break; // out of the Projects callout
    if (/^---/.test(line)) break;

    const headMatch = SUBHEAD_RE.exec(line);
    if (headMatch) {
      // Strip leading symbols / emoji (e.g. Apple logo U+F8FF before "MacOS")
      currentSection = headMatch[1].replace(/^[^\p{L}\p{N}]+/u, "").trim();
      continue;
    }

    const bulletMatch = BULLET_RE.exec(line);
    if (!bulletMatch) continue;
    const [, displayName, url, description] = bulletMatch;
    const meta = SECTION_MAP[currentSection];
    if (!meta) continue;

    if (!sections[meta.id]) {
      sections[meta.id] = { ...meta, projects: [] };
    }
    sections[meta.id].projects.push({
      displayName: displayName.trim(),
      url: url.trim(),
      description: description.trim(),
    });
  }

  return Object.values(sections);
}

function parseTechLinks(md) {
  const lines = md.split("\n");
  let inSection = false;
  const links = [];

  for (const rawLine of lines) {
    const line = rawLine.replace(/\r$/, "");

    if (!inSection) {
      if (TECHLINKS_HEAD_RE.test(line)) inSection = true;
      continue;
    }

    if (NEXT_BLOCK_RE.test(line)) break;
    if (/^---/.test(line)) break;

    const m = BULLET_RE.exec(line);
    if (!m) continue;
    const [, displayName, url, description] = m;
    links.push({
      displayName: displayName.trim(),
      url: url.trim(),
      description: description.trim(),
    });
  }

  return links;
}

function deriveRepoSlug(url) {
  try {
    const u = new URL(url);
    if (u.hostname === "github.com") {
      const parts = u.pathname.split("/").filter(Boolean);
      if (parts[0] === USER && parts[1]) return parts[1];
    }
    if (u.hostname === `${USER}.github.io`) {
      const parts = u.pathname.split("/").filter(Boolean);
      if (parts[0]) return parts[0];
    }
    // Vercel deployments usually live at <repo>.vercel.app — try the
    // subdomain as a repo slug; getRepo() verifies it actually exists
    // (404 → the entry falls back to external).
    if (u.hostname.endsWith(".vercel.app")) {
      const sub = u.hostname.slice(0, -".vercel.app".length);
      if (sub && !sub.includes(".")) return sub;
    }
    return null;
  } catch {
    return null;
  }
}

async function getRepo(slug) {
  try {
    const { data } = await octokit.rest.repos.get({ owner: USER, repo: slug });
    return data;
  } catch (err) {
    if (err.status === 404) return null;
    throw err;
  }
}

async function getLatestRelease(slug) {
  try {
    const { data } = await octokit.rest.repos.getLatestRelease({
      owner: USER,
      repo: slug,
    });
    return {
      tag: data.tag_name,
      publishedAt: data.published_at,
      url: data.html_url,
    };
  } catch (err) {
    if (err.status === 404) return null;
    throw err;
  }
}

async function getOpenGraph(slug) {
  try {
    const result = await octokit.graphql(
      `query($owner: String!, $name: String!) {
        repository(owner: $owner, name: $name) {
          openGraphImageUrl
          usesCustomOpenGraphImage
        }
      }`,
      { owner: USER, name: slug }
    );
    const r = result?.repository;
    if (!r || !r.usesCustomOpenGraphImage) return null;
    return r.openGraphImageUrl;
  } catch {
    return null;
  }
}

/**
 * Try to extract `og:image` from the demo site's HTML <head>.
 * Used as the preferred source for project cards because it tends to
 * be more brand-matched than the repo's GitHub social preview.
 */
async function getHomepageOgImage(homepage) {
  if (!homepage) return null;
  try {
    const res = await fetch(homepage, {
      headers: { "User-Agent": "gfazioli-portfolio-fetcher/1.0" },
      signal: AbortSignal.timeout(10000),
      redirect: "follow",
    });
    if (!res.ok) return null;
    const html = await res.text();
    const match =
      html.match(/<meta[^>]+property=["']og:image["'][^>]*content=["']([^"']+)["']/i) ||
      html.match(/<meta[^>]+content=["']([^"']+)["'][^>]*property=["']og:image["']/i);
    if (!match) return null;
    // Attribute values are HTML-escaped (e.g. `&amp;` in query strings) —
    // decode the common entities or the resulting URL 404s.
    const decoded = match[1]
      .replace(/&amp;/g, "&")
      .replace(/&#0?38;/g, "&")
      .replace(/&quot;/g, '"')
      .replace(/&#0?39;/g, "'")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">");
    return new URL(decoded, homepage).href;
  } catch {
    return null;
  }
}

async function enrichEntry(entry) {
  const slug = deriveRepoSlug(entry.url);
  if (!slug) {
    // External link: still try to grab the site's og:image so the card
    // gets a cover like GitHub-backed projects.
    const ogImage = await getHomepageOgImage(entry.url);
    process.stdout.write(
      `  · ${entry.displayName} → external${ogImage ? " 🌐" : ""}\n`
    );
    return { ...entry, external: true, ogImage };
  }
  process.stdout.write(`  · ${entry.displayName} → ${slug} `);
  const repo = await getRepo(slug);
  if (!repo) {
    const ogImage = await getHomepageOgImage(entry.url);
    process.stdout.write(`(no repo)${ogImage ? " 🌐" : ""}\n`);
    return { ...entry, external: true, ogImage };
  }
  const release = await getLatestRelease(slug);
  const homepage = repo.homepage || entry.url;
  const homepageOg = await getHomepageOgImage(homepage);
  const repoOg = homepageOg ? null : await getOpenGraph(slug);
  const ogImage = homepageOg ?? repoOg;
  const ogSource = homepageOg ? "🌐" : repoOg ? "🖼" : "";
  process.stdout.write(
    `${release ? `(${release.tag})` : ""}${ogSource ? ` ${ogSource}` : ""}\n`
  );
  return {
    ...entry,
    external: false,
    githubRepo: {
      name: repo.name,
      fullName: repo.full_name,
      url: repo.html_url,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      topics: repo.topics || [],
      language: repo.language,
      pushedAt: repo.pushed_at,
      release,
      ogImage,
      defaultBranch: repo.default_branch,
    },
  };
}

async function fetchReadme() {
  const { data } = await octokit.rest.repos.getReadme({
    owner: USER,
    repo: USER,
    mediaType: { format: "raw" },
  });
  return typeof data === "string" ? data : Buffer.from(data).toString("utf8");
}

async function main() {
  console.log("Fetching profile README…");
  const md = await fetchReadme();
  const sections = parseReadme(md);
  const techLinks = parseTechLinks(md);
  const total = sections.reduce((acc, s) => acc + s.projects.length, 0);
  console.log(
    `Parsed ${sections.length} sections, ${total} projects, ${techLinks.length} tech links.\n`
  );

  for (const section of sections) {
    console.log(`[${section.title}]`);
    const enriched = [];
    for (const entry of section.projects) {
      enriched.push(await enrichEntry(entry));
    }
    section.projects = enriched;
  }

  console.log(`[Tech Links]`);
  techLinks.forEach((l) => console.log(`  · ${l.displayName} → ${l.url}`));

  const payload = {
    user: USER,
    fetchedAt: new Date().toISOString(),
    sectionCount: sections.length,
    projectCount: total,
    sections,
    techLinks,
  };

  await mkdir(dirname(OUTPUT), { recursive: true });
  await writeFile(OUTPUT, JSON.stringify(payload, null, 2) + "\n", "utf8");
  console.log(`\n✅ Wrote ${total} projects across ${sections.length} sections → ${OUTPUT}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

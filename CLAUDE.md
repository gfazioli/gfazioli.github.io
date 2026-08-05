# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

`gfazioli-portfolio` — the **Undolog** portfolio site at https://gfazioli.github.io/, a Next.js 16
App Router app that showcases every project (Mantine extensions, macOS apps, CLI tools, Raycast
extensions, WordPress plugins, templates). Deployed to **GitHub Pages** on push to `master`.

Stack: Next.js 16 + React 19 + **Mantine 9 and Tailwind 4 together** (unusual for this author's other
repos, which are Mantine-only — don't "fix" it), TypeScript 5, ESLint.

## Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Next.js dev server |
| `npm run build` | Production build; `postbuild` then runs `scripts/postbuild-og.mjs` |
| `npm run fetch:github` | Regenerate `src/data/projects.json` + download covers into `public/og/` |
| `npm run lint` | ESLint |

## The data pipeline — read this before editing any project card

**`src/data/projects.json` is GENERATED. Never hand-edit it.**

It is written by `scripts/fetch-github.mjs` from a canonical project list, enriched from the GitHub
API. The `refresh-data.yml` workflow runs `npm run fetch:github` on a **daily cron (06:00 UTC)**,
commits `src/data/projects.json` + `public/og`, and redeploys. Any manual edit to the JSON is
silently reverted the next morning — the change belongs in the script instead.

Consumers: `src/lib/projects.ts`, then `ProjectCard`, `TechLinkCard`, `SectionIcon`, `SiteHeader`.

### Card covers: never store a remote og:image URL

⚠️ **Every card cover must resolve to a local `/og/<slug>.<ext>` path under `public/og/`.** A remote
URL in `ogImage` is a bug, even when it responds 200 in your terminal.

The reason, learned from a real outage (2026-08-05): GitHub serves repo social previews from
`repository-images.githubusercontent.com`, and that host **redirects to a pre-signed S3 URL valid for
300 seconds** (`X-Amz-Expires=300` plus a JWT with a 5-minute `exp`). A `curl -L` looks fine because
the redirect mints a fresh signature on demand — but a card built from the stored URL shows a broken
image minutes later, and the host 503s on hotlinks regardless. Three cards
(`mantine-lens-select`, `next-app-nextra-template`, `next-app-fumadocs-template`) were broken in
production this way while the other 16, all self-hosted, were fine. Fixed in `7feb541` (covers
self-hosted) and `e53385c` (`getOpenGraph` now caches instead of storing the signed URL).

`scripts/fetch-github.mjs` resolves `ogImage` with this precedence:

1. `OVERRIDES[url].ogImage` — a hand-pinned local path (📌)
2. `getHomepageOgImage(homepage)` — `og:image` scraped from the project's own site (🌐)
3. `getOpenGraph(slug)` — the repo's custom GitHub social preview (🖼)

Paths (1) and (3) yield local paths. **(2) does not, and it takes precedence over (3)** — this is the
gap that remains after the fix above. `getHomepageOgImage` ends in
`return new URL(decoded, homepage).href`, i.e. the raw remote URL, and the repo-backed branch stores
that value as-is. Only the `external` branch launders it (`externalOgImage` wraps the call in
`cacheOgImage`). So a repo-backed project whose own site points `og:image` at a host with expiring
URLs will leak it into the JSON exactly as before, and nothing will warn you.

**Rules when touching this code:**

- Any new code path that produces an `ogImage` must return `cacheOgImage(url, slug)`, never a raw
  remote URL. `cacheOgImage` already skips the download when the file exists, so daily refreshes
  don't churn binary diffs. The open item is the repo-backed use of `getHomepageOgImage` at the
  `homepageOg` assignment: routing it through `cacheOgImage` closes the last hole.
- Treat `grep -c 'repository-images.githubusercontent.com' src/data/projects.json` returning
  anything but **0** as a regression. The same goes for any other absolute `http(s)://` host in
  `ogImage` that isn't under `public/og/`.
- To pin a cover by hand, add an `OVERRIDES` entry with a local path (see the
  `https://wpbones.com` entry), and commit the file into `public/og/`. Don't edit the JSON.
- A green build proves nothing here: covers are `<img>` requests made in the browser. Verify a
  changed card by actually looking at the rendered page.

## Private repos

`mantine-extensions` is a **private** repo. The workflow's `GITHUB_TOKEN` gets a 404 for it, so the
entry falls back to `external` and loses its topics — which is why `OVERRIDES` mirrors them by hand.
A local run with a personal token *can* see the repo and therefore produces a different card than
CI: don't chase that difference as a bug, and don't commit a locally-generated `projects.json` that
contains data CI can't reproduce.

The same privacy caveat applies to anything public that links to it: a `mantine-extensions` release
URL 404s for anonymous visitors.

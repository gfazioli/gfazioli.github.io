<div align="center">
  <img src="public/logo.png" alt="Undolog" width="120" height="120" />

  <h1>Undolog</h1>

  <p><strong>Open source studio · Since 1983</strong></p>

  <p>
    React components, Mantine extensions, WordPress plugins,<br/>
    macOS apps and CLI tools — mostly open source.
  </p>

  <p>
    <a href="https://gfazioli.github.io"><strong>→ Visit the site</strong></a>
  </p>
</div>

---

## About

This repo is the source of [**gfazioli.github.io**](https://gfazioli.github.io) — a single-page portfolio that auto-updates from my [GitHub profile README](https://github.com/gfazioli) and the public GitHub API.

The project list, descriptions, and section grouping are parsed from the README. Stars, releases, social previews, and topics are pulled from the GitHub API on each build, with a daily cron refresh.

## Stack

- [Next.js 16](https://nextjs.org) (App Router, static export)
- [Mantine 9](https://mantine.dev) + [Tailwind CSS 4](https://tailwindcss.com)
- [Tabler](https://tabler.io/icons) + [Simple Icons](https://simpleicons.org) for iconography
- Deployed via GitHub Actions to GitHub Pages

## Local development

```bash
npm install
npm run fetch:github   # populate src/data/projects.json (needs GITHUB_TOKEN)
npm run dev            # http://localhost:3000
```

## How it auto-updates

| Workflow              | Trigger                | What it does                                                              |
|-----------------------|------------------------|---------------------------------------------------------------------------|
| `deploy.yml`          | push to `master`       | builds and deploys the site                                               |
| `refresh-data.yml`    | every day at 06:00 UTC | re-runs the fetcher; if `projects.json` changed, commits + builds + deploys |

To add or remove a project from the site, edit the bullets in [my profile README](https://github.com/gfazioli) — the next refresh picks them up.

---

<div align="center">
  <sub>© Undolog — built with care</sub>
</div>

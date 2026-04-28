#!/usr/bin/env node
/**
 * GitHub Pages serves files without extension as `application/octet-stream`,
 * which strict OG validators (X.com, Bluesky, …) reject. Next.js generates
 * the OG image at `out/opengraph-image` (no extension), so we rename to
 * `.png` and patch every emitted HTML file to reference the new URL.
 */

import { readdir, readFile, rename, stat, writeFile } from "node:fs/promises";
import { join } from "node:path";

const OUT = "out";
const SRC_NAME = "opengraph-image";
const DST_NAME = "opengraph-image.png";

async function walkHtml(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const full = join(dir, e.name);
    if (e.isDirectory()) files.push(...(await walkHtml(full)));
    else if (e.name.endsWith(".html")) files.push(full);
  }
  return files;
}

async function exists(path) {
  try {
    await stat(path);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  const src = join(OUT, SRC_NAME);
  const dst = join(OUT, DST_NAME);

  if (!(await exists(src))) {
    console.log(`[postbuild-og] ${src} not found — skipping.`);
    return;
  }

  if (await exists(dst)) {
    console.log(`[postbuild-og] ${dst} already exists — overwriting.`);
  }

  await rename(src, dst);
  console.log(`[postbuild-og] Renamed ${src} → ${dst}`);

  const htmlFiles = await walkHtml(OUT);
  let patched = 0;
  for (const file of htmlFiles) {
    const content = await readFile(file, "utf8");
    const updated = content
      .replaceAll(`/${SRC_NAME}?`, `/${DST_NAME}?`)
      .replaceAll(`/${SRC_NAME}"`, `/${DST_NAME}"`);
    if (updated !== content) {
      await writeFile(file, updated, "utf8");
      patched += 1;
    }
  }
  console.log(`[postbuild-og] Patched ${patched} HTML file(s).`);
}

main().catch((err) => {
  console.error("[postbuild-og] Failed:", err);
  process.exit(1);
});

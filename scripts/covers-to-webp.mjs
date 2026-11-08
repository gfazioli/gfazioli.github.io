#!/usr/bin/env node
/**
 * Re-encode every PNG/JPEG cover in `public/og/` as a WebP twin
 * (`<slug>.webp`, see cover-encode.mjs), skipping covers that already have one:
 *
 *   node scripts/covers-to-webp.mjs
 *
 * fetch-github.mjs looks for `<slug>.webp` before any other extension, so the
 * next refresh points the card at the twin and deletes the original. For a
 * cover pinned in OVERRIDES, run this and change the pin to `.webp`.
 */
import { readdir, readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, extname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { RASTER_SOURCE_EXTS, encodeCover } from "./cover-encode.mjs";

const OG_DIR = resolve(dirname(fileURLToPath(import.meta.url)), "..", "public", "og");

let before = 0;
let after = 0;
for (const name of (await readdir(OG_DIR)).sort()) {
  const ext = extname(name).toLowerCase();
  const twin = resolve(OG_DIR, `${name.slice(0, -ext.length)}.webp`);
  if (!RASTER_SOURCE_EXTS.includes(ext) || existsSync(twin)) continue;
  const original = await readFile(resolve(OG_DIR, name));
  const encoded = await encodeCover(original);
  await writeFile(twin, encoded);
  before += original.length;
  after += encoded.length;
  console.log(`${name.padEnd(40)} ${String(Math.round(original.length / 1024)).padStart(5)} KB → ${Math.round(encoded.length / 1024)} KB`);
}
console.log(`\n${(before / 1048576).toFixed(1)} MB → ${(after / 1048576).toFixed(1)} MB`);

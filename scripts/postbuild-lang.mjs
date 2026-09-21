/**
 * Set `<html lang="it">` on the Italian page.
 *
 * The root layout renders the single `<html>` element for every route, and an
 * App Router layout cannot vary that attribute per page without moving the
 * whole site under a `[lang]` segment. Until then this is one exact string
 * swap on one file, after the export — and it fails loudly if the markup it
 * expects is not there, because a silently skipped swap leaves the Italian
 * page declaring itself English, which is the bug it exists to fix.
 */
import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const TARGETS = [{ file: "out/it/index.html", from: '<html lang="en"', to: '<html lang="it"' }];

async function main() {
  for (const { file, from, to } of TARGETS) {
    const path = resolve(process.cwd(), file);
    const html = await readFile(path, "utf8");
    const hits = html.split(from).length - 1;
    if (hits !== 1) {
      throw new Error(`expected exactly one \`${from}\` in ${file}, found ${hits}`);
    }
    await writeFile(path, html.replace(from, to), "utf8");
    console.log(`[postbuild-lang] ${file} → ${to}"`);
  }
}

main().catch((err) => {
  console.error("[postbuild-lang] Failed:", err.message);
  process.exit(1);
});

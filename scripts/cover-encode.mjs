/**
 * How a card cover is stored in `public/og/`: WebP, at most 960 px wide.
 *
 * The sources are og:images made for social cards: 1200×630 PNGs and JPEGs of
 * 130–870 KB. A card shows one at 356 CSS px (712 device px on a 2× screen),
 * so 960 px keeps it sharp, and WebP at quality 82 brings them to 12–70 KB:
 * Lancetta's went from 850 KB to 22 KB with no visible difference. Covers are
 * plain <img> requests (the static export cannot optimise them at request
 * time), so this is the only place their weight is decided.
 *
 * Shared by fetch-github.mjs (every cover it downloads) and covers-to-webp.mjs
 * (covers already in the folder, and covers pinned by hand).
 */
import sharp from "sharp";

export const COVER_WIDTH = 960;
export const COVER_QUALITY = 82;

/** The formats worth re-encoding, by type and by file extension; GIF and SVG
 *  are kept as they come. */
export const RASTER_TYPES = new Set(["image/png", "image/jpeg", "image/webp"]);
export const RASTER_SOURCE_EXTS = [".png", ".jpg", ".jpeg"];

/** Re-encode a cover image to WebP. Throws when sharp cannot read it. */
export function encodeCover(input) {
  return sharp(input)
    .resize({ width: COVER_WIDTH, withoutEnlargement: true })
    .webp({ quality: COVER_QUALITY, effort: 6 })
    .toBuffer();
}

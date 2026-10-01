/**
 * The site has one palette: dark. There is no light mode and no toggle.
 *
 * Every GitHub Pages project site shares the gfazioli.github.io origin, so the
 * Mantine extension docs under /mantine-* write the same localStorage key
 * (`mantine-color-scheme-value`) with their light/dark toggle. The scheme is
 * therefore forced, and storage is never read or written: otherwise a "light"
 * picked on an extension's docs turns this site light.
 */
export const COLOR_SCHEME = "dark";

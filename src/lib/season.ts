/**
 * The time of year the site dresses up for: Christmas, from 18 November to
 * 6 January inclusive, by the visitor's own local date. Netfox does the same
 * from 1 December (Netfox#505); the site started on the day it was asked for.
 *
 * The decorations are in every build and the calendar switches them, in the
 * browser. A static export decided at build time would need a deploy to start
 * the season and another to end it, and only the daily data refresh would be
 * keeping either on time; and a visitor's midnight is not the build's.
 *
 * `?season=christmas` puts the decorations on whatever the date, and
 * `?season=none` takes them off: for screenshots, the way Netfox's
 * `netfox.seasonOverride` works. They replace the calendar for that one load.
 */

/** Whether a local month (1–12) and day fall in the Christmas season. */
export function isChristmas(month: number, day: number): boolean {
  return (month === 11 && day >= 18) || month === 12 || (month === 1 && day <= 6);
}

/**
 * Sets `data-season="christmas"` on `<html>` while the season is on; the CSS
 * hangs every decoration on that attribute. It runs as an inline script in
 * `<head>`, before the first paint, so it is serialised with `toString()` and
 * must not reach for anything outside its own body and its argument.
 */
function applySeason(inSeason: (month: number, day: number) => boolean) {
  try {
    const override = new URLSearchParams(window.location.search).get("season");
    const now = new Date();
    const on =
      override === "christmas" ||
      (override !== "none" && inSeason(now.getMonth() + 1, now.getDate()));
    if (on) document.documentElement.setAttribute("data-season", "christmas");
  } catch {
    // No season is the safe answer: the page is complete without it.
  }
}

export const SEASON_SCRIPT = `(${applySeason.toString()})(${isChristmas.toString()})`;

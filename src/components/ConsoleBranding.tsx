"use client";

import { useEffect } from "react";

const ART = `
  _   _           _       _
 | | | |_ __  __| | ___ | | ___   __ _
 | | | | '_ \\ / _\` |/ _ \\| |/ _ \\ / _\` |
 | |_| | | | | (_| | (_) | | (_) | (_| |
  \\___/|_| |_|\\__,_|\\___/|_|\\___/ \\__, |
                                  |___/

  > Ciao 👋  — welcome to the source.
  > Curious? https://github.com/gfazioli
  > Press ↑ ↑ ↓ ↓ ← → ← → B A for a surprise.
`;

export function ConsoleBranding() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if ((window as { __undologBrandingShown?: boolean }).__undologBrandingShown) return;
    (window as { __undologBrandingShown?: boolean }).__undologBrandingShown = true;

    console.log(
      `%c${ART}`,
      "color:#FF8C00; font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 12px; line-height: 1.2;"
    );
  }, []);

  return null;
}

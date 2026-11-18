import type { CSSProperties, ReactNode } from "react";
import { SEASON_SCRIPT } from "@/lib/season";

/*
 * The Christmas decorations. Every piece is in the static HTML all year and
 * `display: none` until `SeasonScript` puts `data-season="christmas"` on
 * <html> (src/lib/season.ts says when). Out of season they cost their markup
 * and nothing else: the hat is a CSS background, which a hidden element
 * never downloads, and nothing hidden animates.
 */

/** Runs before the first paint, so the page never flashes plain. */
export function SeasonScript() {
  return <script dangerouslySetInnerHTML={{ __html: SEASON_SCRIPT }} />;
}

/** Wraps the logo's image, which wears a Santa hat in season. */
export function SeasonLogo({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={className ? `season-logo ${className}` : "season-logo"}>
      {children}
      <span aria-hidden className="season-hat" />
    </span>
  );
}

/** A string of lights hanging from the bottom edge of the header. */
export function SeasonLights() {
  return <span aria-hidden className="season-lights" />;
}

type FlakeStyle = CSSProperties & Record<`--${string}`, string>;

// Fixed, not random: the export is static and the server and the browser must
// render the same markup. A small LCG spreads them evenly enough.
const FLAKES: FlakeStyle[] = (() => {
  let seed = 7;
  const next = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  return Array.from({ length: 22 }, (_, i) => {
    const size = 3 + next() * 4;
    return {
      "--x": `${((i + next() * 0.8) / 22) * 100}%`,
      "--size": `${size.toFixed(1)}px`,
      "--drift": `${Math.round((next() - 0.5) * 60)}px`,
      "--alpha": (0.35 + (size / 7) * 0.5).toFixed(2),
      "--fall": `${(11 + next() * 8).toFixed(1)}s`,
      "--delay": `${(-next() * 14).toFixed(1)}s`,
    };
  });
})();

/** Soft snow over the hero, falling for about a minute after the page opens. */
export function SeasonSnow() {
  return (
    <div aria-hidden className="season-snow">
      {FLAKES.map((style, i) => (
        <span key={i} style={style} />
      ))}
    </div>
  );
}

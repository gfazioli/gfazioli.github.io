/**
 * Prove that the season switch shipped in the export works.
 *
 * The inline script in src/lib/season.ts is serialised with `toString()`, so
 * what reaches the browser is whatever the compiler and the minifier made of
 * it. If they ever leave it reaching for a name outside its own body, its
 * `try` swallows the ReferenceError and the decorations silently never come
 * on. This runs the script found in out/index.html against a stub page, on
 * both sides of each edge of the season and with both overrides, and fails
 * the build on any wrong answer.
 */
import { readFile } from "node:fs/promises";
import { runInNewContext } from "node:vm";

const FILE = "out/index.html";

// [local date and time, query string, whether the season is on]
const CASES = [
  ["2026-11-17T23:59:59", "", false],
  ["2026-11-18T00:00:00", "", true],
  ["2026-12-25T12:00:00", "", true],
  ["2027-01-06T23:59:59", "", true],
  ["2027-01-07T00:00:00", "", false],
  ["2026-07-01T12:00:00", "?season=christmas", true],
  ["2026-12-25T12:00:00", "?season=none", false],
  ["2026-12-25T12:00:00", "?season=typo", true],
];

async function main() {
  const html = await readFile(FILE, "utf8");
  // The RSC payload carries the same text with its quotes escaped, so the
  // unescaped call picks the one script the browser runs
  const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)]
    .map((m) => m[1])
    .filter((s) => s.includes('setAttribute("data-season"'));
  if (scripts.length !== 1) {
    throw new Error(`expected exactly one season script in ${FILE}, found ${scripts.length}`);
  }

  const wrong = CASES.filter(([iso, search, want]) => {
    let season = null;
    class StubDate extends Date {
      constructor(...args) {
        super(...(args.length ? args : [iso]));
      }
    }
    runInNewContext(scripts[0], {
      window: { location: { search } },
      document: {
        documentElement: {
          setAttribute: (name, value) => {
            if (name === "data-season") season = value;
          },
        },
      },
      URLSearchParams,
      Date: StubDate,
    });
    return (season === "christmas") !== want;
  });

  if (wrong.length) {
    throw new Error(`the season script answers wrongly for ${wrong.map(([iso, q]) => iso + q).join(", ")}`);
  }
  console.log(`[postbuild-season] ${FILE}: ${CASES.length} dates and overrides answer as expected`);
}

main().catch((err) => {
  console.error("[postbuild-season] Failed:", err.message);
  process.exit(1);
});

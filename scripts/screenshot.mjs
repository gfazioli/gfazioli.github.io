// Viewport screenshots of the site with headless Chrome — the "eye" for
// changes that only show up rendered (hover states, scroll-reveal, glows).
//
//   npm i puppeteer-core --no-save          # not a devDependency on purpose
//   node scripts/screenshot.mjs http://localhost:3100/ /tmp/shot [1440]
//
// Writes <out>-top.png, <out>-y<N>.png for each offset, <out>-hover.png
// (first .project-card hovered) and <out>-mobile.png (390px).
//
// Traps, learned the slow way:
// - Do NOT trust a fullPage screenshot for the card grids: Chrome captures
//   beyond the viewport without resizing it, so every `.reveal` card below the
//   fold is still at its scroll-driven start state (opacity 0) and the grid
//   looks empty. That is the capture, not the page — use viewport shots.
// - The Turbopack dev server has served a stale globals.css after an edit
//   (2026-09-06: appended rules never reached the served chunk, `touch` did
//   not help). Screenshot `npm run build` + a static server of `out/`, or
//   restart `next dev`, and grep the served CSS for a new class name first.
import puppeteer from "puppeteer-core";

const [url, out = "shot", widthArg = "1440"] = process.argv.slice(2);
if (!url) {
  console.error("usage: node scripts/screenshot.mjs <url> [outPrefix] [width]");
  process.exit(1);
}
const width = Number(widthArg);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await puppeteer.launch({
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: true,
  args: ["--no-sandbox", "--hide-scrollbars"],
});
const page = await browser.newPage();
await page.setViewport({ width, height: 900, deviceScaleFactor: 1 });
await page.goto(url, { waitUntil: "networkidle2", timeout: 60000 });

await page.screenshot({ path: `${out}-top.png` });
for (const y of [1500, 4200, 9000]) {
  await page.evaluate((y) => window.scrollTo(0, y), y);
  await sleep(700);
  await page.screenshot({ path: `${out}-y${y}.png` });
}

await page.evaluate(() => window.scrollTo(0, 1500));
await sleep(400);
const card = await page.$(".project-card");
if (card) {
  await card.hover();
  await sleep(800);
  await page.screenshot({ path: `${out}-hover.png` });
}

await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
await page.evaluate(() => window.scrollTo(0, 0));
await sleep(600);
await page.screenshot({ path: `${out}-mobile.png` });

await browser.close();
console.log(`wrote ${out}-*.png`);

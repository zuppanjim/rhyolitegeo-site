#!/usr/bin/env node
// Rebuild the Claude Design canvas from site/index.html.
//
// Every `.page` route in the site becomes its own artboard, so the canvas
// always shows the WHOLE site as it currently stands. Re-run this after any
// edit to index.html, then republish the seeded file to the same artifact URL.
//
//   node site/build-canvas.mjs [--out <dir>]
//
// Writes <dir>/<Name>.dc.html per route plus canvas.json, then seeds the
// canvas payload if the design skill is reachable.

import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";

const here = path.dirname(fileURLToPath(import.meta.url));
const repo = path.resolve(here, "..");
const SRC = path.join(here, "index.html");

const argv = process.argv.slice(2);
const outArg = argv.indexOf("--out");
const OUT = outArg === -1
  ? path.join(repo, ".canvas")
  : path.resolve(argv[outArg + 1]);

const src = fs.readFileSync(SRC, "utf8");

// --- pull the shared chrome out of the document -------------------------
const head = src.slice(src.indexOf("<head>"), src.indexOf("</head>"));
const fontLinks = [...head.matchAll(/<link rel="(?:preconnect|stylesheet)"[^>]*>/g)]
  .map((m) => m[0]).join("\n  ");
const css = src.slice(src.indexOf("<style>"), src.indexOf("</style>") + 8);

const mastStart = src.indexOf('<header class="mast">');
const mast = mastStart === -1
  ? ""
  : src.slice(mastStart, src.indexOf("</header>", mastStart) + 9);

// --- one artboard per route ---------------------------------------------
// Routes are `<div class="page..." id="/slug" data-title="...">` blocks,
// closed by the `</div>` that sits alone in column 0.
// Each artboard renders in its own sandboxed iframe with no origin, so a
// relative assets/ path never resolves. Inline what the page references.
const MIME = { ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png",
               ".svg": "image/svg+xml", ".webp": "image/webp", ".gif": "image/gif" };
// An artboard's images are inlined, and the seeded canvas carries every
// artboard at once against a 16 MB ceiling — so inline a thumbnail, not the
// shipping asset. The site itself still serves the full-size file.
const THUMB_PX = 1100, THUMB_Q = 52;
const thumbDir = path.join(OUT, ".thumbs");
const dataURI = name => {
  const file = path.join(repo, "site", "assets", name);
  if (!fs.existsSync(file)) return null;
  const ext = path.extname(name).toLowerCase();
  const mime = MIME[ext];
  if (!mime) return null;
  if (ext === ".svg") return `data:${mime};base64,${fs.readFileSync(file).toString("base64")}`;
  fs.mkdirSync(thumbDir, { recursive: true });
  const thumb = path.join(thumbDir, name.replace(/[\\/]/g, "_") + ".jpg");
  const fresh = fs.existsSync(thumb) &&
    fs.statSync(thumb).mtimeMs >= fs.statSync(file).mtimeMs;
  if (!fresh) {
    const r = spawnSync("sips", ["-Z", String(THUMB_PX), "-s", "format", "jpeg",
      "-s", "formatOptions", String(THUMB_Q), file, "--out", thumb],
      { stdio: "ignore" });
    // no sips (or it failed): fall back to the original rather than a broken image
    if (r.status !== 0 || !fs.existsSync(thumb))
      return `data:${mime};base64,${fs.readFileSync(file).toString("base64")}`;
  }
  return `data:image/jpeg;base64,${fs.readFileSync(thumb).toString("base64")}`;
};
const inlineAssets = html => html
  .replace(/(src|href)="assets\/([^"]+)"/g, (whole, attr, name) => {
    const uri = dataURI(name);
    return uri ? `${attr}="${uri}"` : whole;
  })
  .replace(/url\((["']?)assets\/([^"')]+)\1\)/g, (whole, q, name) => {
    const uri = dataURI(name);
    return uri ? `url("${uri}")` : whole;
  });

const pageRe = /^<div class="page[^"]*" id="(\/[a-z-]*)" data-title="([^"]*)">$/gm;
const marks = [...src.matchAll(pageRe)];

const NAME = (route) =>
  route === "/" ? "Main"
    : route.slice(1).split("-").map((w) => w[0].toUpperCase() + w.slice(1)).join("");

const artboards = [];
marks.forEach((m, i) => {
  const start = m.index;
  const end = i + 1 < marks.length ? marks[i + 1].index : src.indexOf("<script", start);
  let block = src.slice(start, end);
  // trim back to the route's own closing tag
  const close = block.lastIndexOf("\n</div>");
  block = block.slice(0, close + 7);
  // the router adds `.on`; a static artboard needs it baked in
  block = block.replace(/^<div class="page([^"]*)"/, '<div class="page$1 on"');

  const route = m[1];
  const title = m[2];
  const name = NAME(route);

  const doc = `<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <script src="./support.js"><\/script>
</head>
<body>
<x-dc>
<helmet>
  ${fontLinks}
  ${css}
</helmet>

${mast}

<main>
${block}
</main>
</x-dc>
</body>
</html>
`;

  fs.mkdirSync(OUT, { recursive: true });
  fs.writeFileSync(path.join(OUT, `${name}.dc.html`), inlineAssets(doc));

  // rough height from the text the page carries, clamped to something sane
  const text = block.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
  // no upper clamp: a frame shorter than its page clips, and a clipped
  // artboard cannot be scrolled back into view
  const h = Math.max(1500, Math.round(text.length * 1.25) + 1400);

  artboards.push({ name, route, title, h });
});

// --- lay them out: home first, the rest in rows of four ------------------
const W = 1440, GAP_X = 140, GAP_Y = 200;
const placed = [];
let x = 0, y = 0, rowH = 0, col = 0;
for (const a of artboards) {
  if (col === 4) { x = 0; y += rowH + GAP_Y; rowH = 0; col = 0; }
  placed.push({
    file: `${a.name}.dc.html`,
    x, y, w: W, h: a.h,
    title: `${a.route}  —  ${a.title.replace(/ — Rhyolite Geo$/, "")}`,
    expand: "fill",
  });
  x += W + GAP_X; rowH = Math.max(rowH, a.h); col += 1;
}

const canvas = {
  artboards: placed,
  annotations: [{
    id: "whole-site",
    x: 0, y: -260, w: 900,
    text: "THE WHOLE SITE, one artboard per route.\n\n"
      + "Generated from site/index.html by site/build-canvas.mjs — edit the site, "
      + "re-run the script, republish. The home artboard is the investor landing page: "
      + "\"We build where the power already is.\"",
  }],
  launch: { view: "focused", file: "Main.dc.html" },
};
fs.writeFileSync(path.join(OUT, "canvas.json"), JSON.stringify(canvas, null, 2) + "\n");

console.log(`${artboards.length} artboards -> ${OUT}`);
for (const a of artboards) console.log(`  ${a.route.padEnd(12)} ${a.name}.dc.html  h=${a.h}`);

// --- seed the canvas payload, when the design skill is on this machine ---
const skill = process.env.DESIGN_SKILL_DIR
  || [...fs.globSync?.("/private/tmp/claude-*/bundled-skills/*/*/design", { }) ?? []].pop();
if (!skill) {
  console.log("\nno design skill dir found — set DESIGN_SKILL_DIR to seed automatically");
  process.exit(0);
}
const seeder = path.join(skill, "seed-canvas.mjs");
const template = path.join(skill, "payload.template.html");
if (!fs.existsSync(seeder)) {
  console.log(`\nno seed-canvas.mjs under ${skill} — seed by hand`);
  process.exit(0);
}
const args = [
  seeder, "--template", template,
  "--out", "rhyolite-site.html",
  "--title", "Rhyolite Geo — whole site",
  ...artboards.flatMap((a) => ["--artboard", `${a.name}.dc.html`]),
  "--canvas", "canvas.json",
];
console.log("\n" + execFileSync("node", args, { cwd: OUT, encoding: "utf8" }));
console.log(`seeded ${path.join(OUT, "rhyolite-site.html")}`);

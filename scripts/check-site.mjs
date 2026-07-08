import { readFile, readdir, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const root = process.cwd();
const dist = path.join(root, "dist");
const failures = [];
const warnings = [];

function fail(message) {
  failures.push(message);
}

function warn(message) {
  warnings.push(message);
}

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(full)));
    else files.push(full);
  }
  return files;
}

function routeFromHtml(file) {
  const relative = path.relative(dist, file);
  if (relative === "index.html") return "/";
  return `/${relative.replace(/index\.html$/, "").replace(/\\/g, "/")}`;
}

function normalizeInternalHref(href) {
  if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return null;
  if (/^https?:\/\//.test(href)) return null;
  const clean = href.split("#")[0].split("?")[0];
  if (clean === "") return null;
  return clean.endsWith("/") || path.extname(clean) ? clean : `${clean}/`;
}

const htmlFiles = existsSync(dist)
  ? (await walk(dist)).filter((file) => file.endsWith(".html") && !/^google[a-z0-9]+\.html$/.test(path.basename(file)))
  : [];
if (htmlFiles.length === 0) fail("No built HTML files found. Run the Astro build first.");

const routes = new Set(htmlFiles.map(routeFromHtml));
const sitemapPath = path.join(dist, "sitemap.xml");
const sitemap = existsSync(sitemapPath) ? await readFile(sitemapPath, "utf8") : "";
if (!sitemap) fail("Missing sitemap.xml.");

for (const file of htmlFiles) {
  const html = await readFile(file, "utf8");
  const route = routeFromHtml(file);
  const title = html.match(/<title>(.*?)<\/title>/s)?.[1]?.trim();
  const description = html.match(/<meta name="description" content="([^"]+)"/)?.[1]?.trim();
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1]?.trim();

  if (!title) fail(`${route} is missing a title.`);
  if (!description || description.length < 50) fail(`${route} is missing a useful meta description.`);
  if (!canonical) fail(`${route} is missing a canonical URL.`);
  if (/noindex/i.test(html)) fail(`${route} contains noindex.`);
  if (!sitemap.includes(route === "/" ? "<loc>" : route)) fail(`${route} appears to be missing from sitemap.xml.`);

  const imageTags = html.match(/<img\b[^>]*>/g) || [];
  for (const tag of imageTags) {
    if (!/\balt=/.test(tag)) fail(`${route} has an image without alt text: ${tag}`);
  }

  const hrefs = [...html.matchAll(/\bhref="([^"]+)"/g)].map((match) => match[1]);
  for (const href of hrefs) {
    const internal = normalizeInternalHref(href);
    if (!internal) continue;
    if (internal.startsWith("/")) {
      const target =
        internal.endsWith(".xml") || internal.endsWith(".txt") || internal.endsWith(".svg")
          ? path.join(dist, internal)
          : null;
      if (target && !existsSync(target)) fail(`${route} links to missing asset ${internal}.`);
      if (!target && !routes.has(internal)) fail(`${route} links to missing internal page ${internal}.`);
    }
  }
}

const sourceFiles = await walk(root);
const contentFiles = sourceFiles.filter((file) =>
  [".astro", ".md", ".mdx"].includes(path.extname(file)) &&
  !file.includes(`${path.sep}node_modules${path.sep}`) &&
  !file.includes(`${path.sep}.git${path.sep}`)
);
const normalizedBodies = new Map();
for (const file of contentFiles) {
  const body = (await readFile(file, "utf8"))
    .toLowerCase()
    .replace(/---[\s\S]*?---/g, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
  if (body.length < 250) continue;
  const fingerprint = body.slice(0, 1200);
  if (normalizedBodies.has(fingerprint)) {
    fail(`Possible duplicate content: ${path.relative(root, file)} and ${path.relative(root, normalizedBodies.get(fingerprint))}`);
  }
  normalizedBodies.set(fingerprint, file);
}

const publicFiles = existsSync(path.join(root, "public")) ? await walk(path.join(root, "public")) : [];
for (const file of publicFiles) {
  const size = (await stat(file)).size;
  if (size > 500_000) fail(`Oversized public asset: ${path.relative(root, file)} is ${size} bytes.`);
}

const redirectsFile = path.join(root, "public", "_redirects");
if (existsSync(redirectsFile)) {
  const redirects = await readFile(redirectsFile, "utf8");
  for (const [index, line] of redirects.split("\n").entries()) {
    if (!line.trim() || line.trim().startsWith("#")) continue;
    if (line.trim().split(/\s+/).length < 2) fail(`Invalid redirect on line ${index + 1}.`);
  }
}

try {
  const changed = execFileSync("git", ["diff", "--name-only"], { encoding: "utf8" })
    .split("\n")
    .filter(Boolean);
  for (const file of changed) {
    if (["dist/", "node_modules/", ".env"].some((prefix) => file.startsWith(prefix))) {
      fail(`Changed prohibited file or directory: ${file}`);
    }
  }
} catch {
  warn("Could not inspect git diff for prohibited files.");
}

for (const warning of warnings) console.warn(`Warning: ${warning}`);
if (failures.length > 0) {
  console.error("Site checks failed:");
  for (const message of failures) console.error(`- ${message}`);
  process.exit(1);
}

console.log(`Site checks passed for ${htmlFiles.length} HTML pages.`);

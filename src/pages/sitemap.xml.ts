import type { APIRoute } from "astro";
import { site } from "../site";

const pages = [
  "/",
  "/light-meter/",
  "/plant-distance-calculator/",
  "/north-facing-window-plants/",
  "/low-light-plant-placement-checklist/",
  "/about/",
  "/editorial-policy/",
  "/privacy/"
];

export const GET: APIRoute = () =>
  new Response(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map((path) => `  <url><loc>${new URL(path, site.url)}</loc></url>`).join("\n")}
</urlset>`, {
    headers: { "Content-Type": "application/xml; charset=utf-8" }
  });

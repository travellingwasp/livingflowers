import type { APIRoute } from "astro";
import { site } from "../site";

const items = [
  {
    title: "Houseplant Window Light Estimator",
    path: "/light-meter/",
    description: "Estimate apartment plant light by direction, distance, and obstruction."
  },
  {
    title: "North-Facing Window Plants for Apartments",
    path: "/north-facing-window-plants/",
    description: "Choose plants and placements for north-facing apartment windows."
  }
];

export const GET: APIRoute = () =>
  new Response(`<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${site.name}</title>
    <link>${site.url}</link>
    <description>${site.description}</description>
${items
  .map(
    (item) => `    <item>
      <title>${item.title}</title>
      <link>${new URL(item.path, site.url)}</link>
      <guid>${new URL(item.path, site.url)}</guid>
      <description>${item.description}</description>
    </item>`
  )
  .join("\n")}
  </channel>
</rss>`, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" }
  });

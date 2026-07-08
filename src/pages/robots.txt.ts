import type { APIRoute } from "astro";
import { site } from "../site";

export const GET: APIRoute = () =>
  new Response(`User-agent: *
Allow: /

Sitemap: ${new URL("/sitemap.xml", site.url)}
`, {
    headers: { "Content-Type": "text/plain; charset=utf-8" }
  });

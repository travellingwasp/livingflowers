export const site = {
  name: "WindowPlant Lab",
  description:
    "Renter-friendly houseplant light placement tools, checklists, and practical guides.",
  url: import.meta.env.SITE || "https://example.com",
  author: "WindowPlant Lab editorial team",
  analyticsToken: import.meta.env.PUBLIC_CLOUDFLARE_WEB_ANALYTICS_TOKEN || ""
};

export function canonicalUrl(pathname: string) {
  return new URL(pathname, site.url).toString();
}

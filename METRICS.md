# Metrics

## Primary Evidence Sources

Google Search Console:

- Indexed pages.
- Impressions.
- Organic clicks.
- Query and page pairs.
- Click-through rate.

Cloudflare Web Analytics:

- Verified visits.
- Top pages.
- Referrers.
- Country and device patterns only when useful for debugging.

## Daily Metric Capture

Record unavailable metrics as `not available yet`; do not invent values.

| Date | Indexed pages | Impressions | Clicks | Verified visits | Legitimate referrers | Notes |
|---|---:|---:|---:|---:|---:|---|
| 2026-07-08 | not available yet | not available yet | not available yet | not available yet | not available yet | Bootstrap before deployment |
| 2026-07-09 | not available yet | not available yet | not available yet | not available yet | not available yet | Production site, Cloudflare Web Analytics, Search Console verification, and sitemap submission are configured; API metric ingestion remains technical debt |

## Bot and Owner Visit Handling

- Exclude known owner testing where Cloudflare allows filtering.
- Treat suspicious direct spikes as unverified until referrer, geography, user agent pattern, or page behavior is plausible.
- Do not count build previews, local visits, or automation checks as success.

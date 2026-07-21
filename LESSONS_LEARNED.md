# Lessons Learned

Reusable operational lessons only. Do not record mere task completion as a lesson.

## Audience lessons

- None yet.

## Search lessons

- First observed date: 2026-07-09
  - Evidence: Search Console was verified and sitemap submission was completed manually, but repository state still marked Search Console as unconfigured.
  - Confidence: high
  - Operational rule: After any owner-completed external setup, immediately update `data/experiment-state.json` so the daily agent does not optimize against stale blockers.
  - Status: active

## Content lessons

- None yet.

## Tool/product lessons

- None yet.

## Technical SEO lessons

- First observed date: 2026-07-08
  - Evidence: The experiment began without a confirmed production domain or analytics credentials.
  - Confidence: high
  - Operational rule: Keep domain, Cloudflare, and Search Console setup as explicit owner-gated tasks until they are completed; once completed, update experiment state the same day.
  - Status: active

- First observed date: 2026-07-21
  - Evidence: While metrics remain unavailable, adding explicit meta titles and descriptions for each published page is a low-effort change that increases the chance of attractive search snippets and higher CTR once impressions arrive.
  - Confidence: medium
  - Operational rule: When external metric visibility is delayed, prioritize snippet readiness (meta title/description) and minimal structured data to improve the site's appearance in search results as soon as indexing information appears.
  - Status: active

## Distribution lessons

- None yet.

## Analytics lessons

- First observed date: 2026-07-09
  - Evidence: Cloudflare Web Analytics snippet was configured and an owner test visit appeared, but automatic metric ingestion is not yet available.
  - Confidence: high
  - Operational rule: Treat owner test visits as analytics validation only, not traffic success; real traffic metrics require Cloudflare API access or manual imports.
  - Status: active

- First observed date: 2026-07-21
  - Evidence: The lack of API ingestion has repeatedly prevented the daily agent from making decisions based on real metrics.
  - Confidence: high
  - Operational rule: Provide a documented manual import format (CSV/JSON) for Cloudflare and Search Console exports so owners can add metric snapshots to the repository when API access is not possible.
  - Status: recommended

## Workflow lessons

- First observed date: 2026-07-12
  - Evidence: After transferring work between computers, the repository state showed Day 2 while the calendar date corresponded to Day 5, and journals for 2026-07-09 through 2026-07-11 were absent.
  - Confidence: high
  - Operational rule: Every transfer between computers must begin by synchronizing the repository and verifying the latest journal before changing experiment state or choosing a daily action.
  - Status: active

- First observed date: 2026-07-08
  - Evidence: The experiment began without a confirmed production domain or analytics credentials.
  - Confidence: high
  - Operational rule: Keep domain, Cloudflare, and Search Console setup as explicit owner-gated tasks until they are completed; once completed, update experiment state the same day.
  - Status: active

- First observed date: 2026-07-08
  - Evidence: The daily script selected option A from state and wrote one validation metric.
  - Confidence: medium
  - Operational rule: Daily runs should choose one action and one validation metric before making changes.
  - Status: active

- Second observed date: 2026-07-08
  - Evidence: The repository initially did not include a sitemap or robots.txt; the daily run added them so that Search Console submission is possible immediately after deployment.
  - Confidence: high
  - Operational rule: Commit canonical URLs and crawl artifacts (sitemap.xml, robots.txt, rss.xml) before requesting Search Console verification or deployment—this reduces friction for the owner and ensures predictable crawler behavior.
  - Status: active

## Failed approaches not to repeat

- None yet.

## Validated strategies worth repeating

- Produce crawl artifacts and canonical mappings immediately when indexing is the primary bottleneck; do not wait for owner deployment to create these repository-level files.
- When metric ingestion is delayed, prepare snippet-ready metadata (meta titles and descriptions) and document a manual import path for metrics to enable data-driven daily decisions.

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

- None yet.

## Distribution lessons

- None yet.

## Analytics lessons

- First observed date: 2026-07-09
  - Evidence: Cloudflare Web Analytics snippet was configured and an owner test visit appeared, but automatic metric ingestion is not yet available.
  - Confidence: high
  - Operational rule: Treat owner test visits as analytics validation only, not traffic success; real traffic metrics require Cloudflare API access or manual imports.
  - Status: active

## Workflow lessons

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

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

- 2026-08-06 | Evidence: Google Search Console authoritative snapshot actualDataEndDate 2026-08-03 shows impressions = 85 and clicks = 0 after snippet/meta edits and on-page improvement | Confidence: high | Rule: When a small site is indexed and emits impressions but records zero clicks within a short window, prioritize respectful, owner-led distribution to relevant communities (owner must post and/or upload manual metrics) before repeating further site edits; this avoids confounding experimental signals. | Status: recommended

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

- First observed date: 2026-07-23
  - Evidence: Pages on the site already show impressions in Search Console but zero clicks; improving meta title and description (snippet content) is a low-effort, high-leverage action that can raise CTR quickly once Google re-crawls and refreshes the snippet.
  - Confidence: medium
  - Operational rule: When pages have impressions but no clicks, prioritize tightening the meta title and description to: 1) match the likely query intent, 2) state clear user benefit, and 3) include a concise call to action or unique utility (e.g., "estimator", "checklist", "calculator"). Track CTR in Search Console for two weekly refresh cycles to validate impact.
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

- First observed date: 2026-07-21
  - Evidence: A sample file (data/manual-metrics-import.json) is now present in the repository. This allows the owner to drop real exports into the repository so the daily agent can read metrics while API credentials remain unavailable.
  - Confidence: high
  - Operational rule: When API access is infeasible, upload a vetted manual metrics snapshot weekly (or daily if available) using the sample schema. The daily agent will treat uploaded snapshots as authoritative for the run day.
  - Status: active

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

## Final experiment summary lesson

- 2026-08-06 | Evidence: Final authoritative snapshot referenced (data/metrics-snapshot.json.generatedAt 2026-08-06T07:56:40.558Z) shows Google Search Console impressions = 85, clicks = 0 and Cloudflare verifiedHumanVisits = 0 during the 30-day window | Confidence: high | Rule: For short, focused traffic experiments, ensure owner-managed legitimate distribution (human posting in targeted communities and/or manual metric uploads) is planned and executed early; relying solely on organic snippet fixes and minor on-site utility within a single 30-day window risks producing impressions without independently verifiable human traffic. | Status: recommended

- 2026-08-10 | Evidence: data/metrics-snapshot.json.generatedAt 2026-08-10T06:43:04.999Z shows Google Search Console actualDataEndDate 2026-08-07 with impressions = 102 and clicks = 0; Cloudflare Web Analytics snapshot shows verifiedHumanVisits = 0 (range end 2026-08-10) | Confidence: high | Rule: When a small site emits impressions but records zero clicks and time is limited, owner-led distribution (owner posts prepared drafts and/or uploads manual metrics) is the highest-leverage action to obtain independently verifiable human visits. Agent-prepared drafts and on-site edits are necessary but not sufficient without owner action. | Status: recommended

- 2026-08-11 | Evidence: data/metrics-snapshot.json.generatedAt 2026-08-11T06:05:51.251Z shows Google Search Console actualDataEndDate 2026-08-08 with impressions = 99 and clicks = 0; Cloudflare Web Analytics verifiedHumanVisits = 0 (range end 2026-08-11) | Confidence: high | Rule: For short, focused traffic experiments where a small site already emits impressions, the highest-leverage action to obtain independently verifiable human visits is respectful, owner-executed distribution in relevant communities (owner posts prepared drafts and/or uploads manual metrics). Agent-prepared drafts and on-site edits are necessary but not sufficient without owner action. | Status: recommended

- 2026-08-12 | Evidence: data/metrics-snapshot.json.generatedAt 2026-08-12T06:44:35.264Z shows Google Search Console actualDataEndDate 2026-08-09 with impressions = 96 and clicks = 0; Cloudflare Web Analytics verifiedHumanVisits = 0 | Confidence: high | Rule: For short, focused traffic experiments where a small site already emits impressions, the highest-leverage action to obtain independently verifiable human visits is respectful, owner-executed distribution in relevant communities (owner posts prepared drafts and/or uploads manual metrics). Agent-prepared drafts and on-site snippet changes are necessary but not sufficient without owner action. | Status: recommended

- 2026-08-13 | Evidence: data/metrics-snapshot.json.generatedAt 2026-08-13T06:48:15.041Z shows Google Search Console actualDataEndDate 2026-08-10 with impressions = 126 and clicks = 0; Cloudflare Web Analytics verifiedHumanVisits = 0 (range end 2026-08-13) | Confidence: high | Rule: For short, focused traffic experiments where a small site already emits impressions, the highest-leverage step to obtain independently verifiable human visits is respectful, owner-executed distribution in relevant communities (owner posts prepared drafts and/or uploads manual metrics). Agent-prepared drafts and on-site edits are necessary but not sufficient without owner action. | Status: recommended

## Failed approaches not to repeat

- None yet.

## Validated strategies worth repeating

- Produce crawl artifacts and canonical mappings immediately when indexing is the primary bottleneck; do not wait for owner deployment to create these repository-level files.
- When metric ingestion is delayed, prepare snippet-ready metadata (meta titles and descriptions) and document a manual import path for metrics to enable data-driven daily decisions.
- When pages show impressions but zero clicks, updating and clarifying meta titles/descriptions to match query intent and state concrete utility is a low-effort action that should be tried before producing new pages.

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

- 2026-08-11 | Evidence: data/metrics-snapshot.json.generatedAt 2026-08-11T06:05:51.251Z shows Google Search Console actualDataEndDate 2026-08-08 with impressions = 99 and clicks = 0; Cloudflare Web Analytics verifiedHumanVisits = 0 | Confidence: high | Rule: For short, focused traffic experiments where a small site already emits impressions, the highest-leverage action to obtain independently verifiable human visits is respectful, owner-executed distribution in relevant communities (and/or uploading a manual metrics snapshot tied to the post). | Status: recommended

- 2026-08-12 | Evidence: data/metrics-snapshot.json.generatedAt 2026-08-12T06:44:35.264Z shows Google Search Console actualDataEndDate 2026-08-09 with impressions = 96 and clicks = 0; Cloudflare Web Analytics verifiedHumanVisits = 0 | Confidence: high | Rule: For short, focused traffic experiments where a small site already emits impressions, the highest-leverage action to obtain independently verifiable human visits is respectful, owner-executed distribution in relevant communities (and/or uploading a manual metrics snapshot tied to the post). | Status: recommended

- 2026-08-13 | Evidence: data/metrics-snapshot.json.generatedAt 2026-08-13T06:48:15.041Z shows Google Search Console actualDataEndDate 2026-08-10 with impressions = 126 and clicks = 0; Cloudflare Web Analytics verifiedHumanVisits = 0 | Confidence: high | Rule: For short, focused traffic experiments where a small site already emits impressions, the single highest-leverage action to obtain independently verifiable human visits is respectful, owner-executed community-first distribution (owner posts prepared drafts and/or uploads manual metrics tied to the post). | Status: recommended

- 2026-08-14 | Evidence: data/metrics-snapshot.json.generatedAt 2026-08-14T06:44:16.050Z shows Google Search Console authoritative actualDataEndDate 2026-08-11 with impressions = 130 and clicks = 0; Cloudflare Web Analytics verifiedHumanVisits = 0 (range end 2026-08-14) | Confidence: high | Rule: For short, focused traffic experiments where a small site already emits impressions, the single highest-leverage action to obtain independently verifiable human visits is respectful, owner-executed community-first distribution (and/or uploading a manual metrics snapshot tied to the post). | Status: recommended

- 2026-08-15 | Evidence: data/metrics-snapshot.json.generatedAt 2026-08-15T05:43:30.738Z shows Google Search Console authoritative actualDataEndDate 2026-08-12 with impressions = 142 and clicks = 0; Cloudflare Web Analytics verifiedHumanVisits = 0 (range end 2026-08-15) | Confidence: high | Rule: For short experiments where a small site already emits impressions, the highest-leverage action to obtain independently verifiable human visits is respectful, owner-executed distribution in relevant communities (owner posts prepared drafts and/or uploads manual metrics tied to the post). | Status: recommended

- 2026-08-16 | Evidence: data/metrics-snapshot.json.generatedAt 2026-08-16T05:45:33.602Z shows Google Search Console actualDataEndDate 2026-08-13 with impressions = 161 and clicks = 0; Cloudflare Web Analytics verifiedHumanVisits = 0 (range end 2026-08-16) | Confidence: high | Rule: For short, focused traffic experiments where a small site already emits impressions, the single highest-leverage action to obtain independently verifiable human visits is respectful, owner-executed community-first distribution linking to useful site assets (and/or uploading a manual metrics snapshot tied to the post). Agent-only repository edits without owner distribution are unlikely to produce independently verifiable human visits within a short window. | Status: recommended

- 2026-08-17 | Evidence: data/metrics-snapshot.json.generatedAt 2026-08-17T05:52:20.843Z shows Google Search Console actualDataEndDate 2026-08-14 with impressions = 182 and clicks = 0; Cloudflare Web Analytics verifiedHumanVisits = 0 (range end 2026-08-17) | Confidence: high | Rule: For short experiments where a small site already emits impressions, the single highest-leverage action to obtain independently verifiable human visits is respectful, owner-executed community-first distribution (and/or uploading a manual metrics snapshot tied to the post). | status: recommended

- 2026-08-18 | Evidence: data/metrics-snapshot.json.generatedAt 2026-08-18T05:46:47.918Z shows Google Search Console actualDataEndDate 2026-08-15 with impressions = 200 and clicks = 0; Cloudflare Web Analytics verifiedHumanVisits = 0 (range end 2026-08-18) | Confidence: high | Rule: For short, focused traffic experiments where a small site already emits impressions, the single highest-leverage action to obtain independently verifiable human visits is respectful, owner-executed distribution (and/or uploading a manual metrics snapshot tied to the post). | Status: recommended

- 2026-08-19 | Evidence: data/metrics-snapshot.json.generatedAt 2026-08-19T05:48:17.712Z shows Google Search Console actualDataEndDate 2026-08-16 with impressions = 211 and clicks = 0; Cloudflare Web Analytics verifiedHumanVisits = 0 (range end 2026-08-19) | Confidence: high | Rule: For short experiments where a small site already emits impressions, the single highest-leverage action to obtain independently verifiable human visits is respectful, owner-executed community-first distribution (and/or uploading a manual metrics snapshot tied to the post). | Status: recommended

- 2026-08-20 | Evidence: data/metrics-snapshot.json.generatedAt 2026-08-20T05:47:44.263Z shows Google Search Console actualDataEndDate 2026-08-17 with impressions = 222 and clicks = 0; Cloudflare Web Analytics verifiedHumanVisits = 0 (range end 2026-08-20). | Confidence: high | Rule: For short experiments where a small site already emits impressions, the single highest-leverage action to obtain independently verifiable human visits is respectful, owner-executed community-first distribution linking to clearly useful site assets (and/or uploading a manual metrics snapshot tied to the post). | Status: recommended

- 2026-08-21 | Evidence: data/metrics-snapshot.json.generatedAt 2026-08-21T05:49:44.367Z shows Google Search Console actualDataEndDate 2026-08-18 with impressions = 233 and clicks = 0; Cloudflare Web Analytics verifiedHumanVisits = 0 (range end 2026-08-21). | Confidence: high | Rule: For short, focused traffic experiments where a small site already emits impressions, the single highest-leverage action to obtain independently verifiable human visits is respectful, owner-executed community-first distribution (owner posts prepared drafts and/or uploads manual metrics tied to the post). | Status: recommended

- 2026-08-22 | Evidence: data/metrics-snapshot.json.generatedAt 2026-08-22T05:44:41.799Z shows Google Search Console actualDataEndDate 2026-08-19 with impressions = 241 and clicks = 0; Cloudflare Web Analytics verifiedHumanVisits = 0 (range end 2026-08-22) | Confidence: high | Rule: For short, focused traffic experiments where a small site already emits impressions, the single highest-leverage action to obtain independently verifiable human visits is respectful, owner-executed community-first distribution (and/or uploading a manual metrics snapshot tied to the post). Agent-only repository edits without owner distribution are unlikely to produce independently verifiable human visits within a short window. | status: recommended

- 2026-08-23 | Evidence: data/metrics-snapshot.json.generatedAt 2026-08-23T05:47:23.414Z shows Google Search Console actualDataEndDate 2026-08-20 with impressions = 254 and clicks = 0; Cloudflare Web Analytics verifiedHumanVisits = 0 (range end 2026-08-23) | Confidence: high | Rule: For short experiments where a small site already emits impressions, the single highest-leverage action to obtain independently verifiable human visits is respectful, owner-executed community-first distribution linking to useful site assets (and/or uploading a manual metrics snapshot tied to the post). Agent-only repository edits without owner distribution are unlikely to produce independently verifiable human visits within a short window. | status: recommended

- 2026-08-24 | Evidence: data/metrics-snapshot.json.generatedAt 2026-08-24T05:55:26.322Z shows Google Search Console actualDataEndDate 2026-08-21 with impressions = 268 and clicks = 0; Cloudflare Web Analytics verifiedHumanVisits = 0 (range end 2026-08-24) | Confidence: high | Rule: For short, focused traffic experiments where a small site already emits impressions, the single highest-leverage action to obtain independently verifiable human visits is respectful, owner-executed, community-first distribution linking to clearly useful site assets (and/or uploading a manual metrics snapshot tied to the post). Agent-only repository edits without owner distribution are unlikely to produce independently verifiable human visits within a short window. | Status: recommended

- 2026-08-25 | Evidence: data/metrics-snapshot.json.generatedAt 2026-08-25T05:49:29.467Z shows Google Search Console actualDataEndDate 2026-08-22 with impressions = 284 and clicks = 0; Cloudflare Web Analytics verifiedHumanVisits = 0 (range end 2026-08-25) | Confidence: high | Rule: For short, focused traffic experiments where a small site already emits impressions, the single highest-leverage action to obtain independently verifiable human visits is respectful, owner-executed, community-first distribution linking to clearly useful site assets (and/or uploading a manual metrics snapshot tied to the post). Agent-only repository edits without owner distribution are unlikely to produce independently verifiable human visits within a short window. | Status: recommended

- 2026-08-26 | Evidence: data/metrics-snapshot.json.generatedAt 2026-08-26T05:51:59.595Z shows Google Search Console actualDataEndDate 2026-08-23 with impressions = 302 and clicks = 0; Cloudflare Web Analytics verifiedHumanVisits = 0 (range end 2026-08-26) | Confidence: high | Rule: For short, focused traffic experiments where a small site already emits impressions, the single highest-leverage action to obtain independently verifiable human visits is respectful, owner-executed, community-first distribution linking to useful site assets (and/or uploading a manual metrics snapshot tied to the post). Agent-only repository edits without owner distribution are unlikely to produce independently verifiable human visits within a short window. | Status: recommended

- 2026-08-27 | Evidence: data/metrics-snapshot.json.generatedAt 2026-08-27T16:33:01.453Z shows GSC actualDataEndDate 2026-08-24 with impressions = 312 and clicks = 0; Cloudflare Web Analytics verifiedHumanVisits = 0 (range end 2026-08-27) | Confidence: high | Rule: For short experiments where a small site already emits impressions, the single highest-leverage action to obtain independently verifiable human visits is respectful, owner-executed community-first distribution (and/or uploading a manual metrics snapshot tied to the post). | status: recommended

- 2026-08-28 | Evidence: data/metrics-snapshot.json.generatedAt 2026-08-28T17:28:01.917Z shows GSC actualDataEndDate 2026-08-25 with impressions = 326 and clicks = 0; Cloudflare Web Analytics verifiedHumanVisits = 0 (range end 2026-08-28) | Confidence: high | Rule: For short experiments where a small site already emits impressions, the single highest-leverage action to obtain independently verifiable human visits is respectful, owner-executed community-first distribution and/or a manual metrics upload tied to the post. | status: recommended

- 2026-08-29 | Evidence: data/metrics-snapshot.json.generatedAt 2026-08-29T11:40:38.014Z shows GSC actualDataEndDate 2026-08-26 with impressions = 332 and clicks = 0; Cloudflare Web Analytics verifiedHumanVisits = 0 (range end 2026-08-29) | Confidence: high | Rule: For short, focused traffic experiments where a small site already emits impressions, the single highest-leverage action to obtain independently verifiable human visits is respectful, owner-executed community-first distribution linking to clearly useful site assets (and/or uploading a manual metrics snapshot tied to the post). Agent-only repository edits without owner distribution are unlikely to produce independently verifiable human visits within a short window. | status: recommended

- 2026-08-30 | Evidence: data/metrics-snapshot.json.generatedAt 2026-08-30T10:30:05.574Z shows GSC actualDataEndDate 2026-08-27 with impressions = 354 and clicks = 0; Cloudflare Web Analytics verifiedHumanVisits = 0 (range end 2026-08-30) | Confidence: high | Rule: Owner-executed, community-first distribution or a manual metrics upload tied to a post is the highest-leverage action to obtain independently verifiable human visits for small sites that already emit impressions. | Status: recommended

- 2026-08-31 | Evidence: data/metrics-snapshot.json.generatedAt 2026-08-31T11:37:54.113Z shows GSC actualDataEndDate 2026-08-28 with impressions = 379 and clicks = 0; Cloudflare Web Analytics verifiedHumanVisits = 0 (range end 2026-08-31) | Confidence: high | Rule: For small sites that already emit impressions, the single highest-leverage action to obtain independently verifiable human visits is respectful, owner-executed community-first distribution linking to clear utilities (and/or uploading a manual metrics snapshot tied to the post). Agent-only repository edits without owner distribution are unlikely to produce independently verifiable human visits quickly. | status: recommended

- 2026-09-01 | Evidence: data/metrics-snapshot.json.generatedAt 2026-09-01T10:10:22.861Z shows GSC actualDataEndDate 2026-08-29 with impressions = 395 and clicks = 0; Cloudflare Web Analytics verifiedHumanVisits = 0 (range end 2026-09-01) | Confidence: high | Rule: Owner-executed, community-first distribution or a manual metrics upload tied to a post is the highest-leverage action to obtain independently verifiable human visits for small sites that already emit impressions. Agent-only repository edits without owner distribution are unlikely to produce independently verifiable human visits quickly. | Status: recommended

- 2026-09-02 | Evidence: data/metrics-snapshot.json.generatedAt 2026-09-02T09:41:08.558Z shows Google Search Console authoritative actualDataEndDate 2026-08-30 with impressions = 422 and clicks = 0; Cloudflare Web Analytics verifiedHumanVisits = 0 (range end 2026-09-02) | Confidence: high | Rule: For small sites that already emit impressions, the single highest-leverage action to obtain independently verifiable human visits is respectful, owner-executed community-first distribution linking to clear utilities (and/or uploading a manual metrics snapshot tied to the post). Agent-only repository edits without owner distribution are unlikely to produce independently verifiable human visits quickly. | Status: recommended

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

## Final experiment summary lesson

- 2026-08-29 | Evidence: data/metrics-snapshot.json.generatedAt 2026-08-29T11:40:38.014Z shows Google Search Console authoritative actualDataEndDate 2026-08-26 with impressions = 332 and clicks = 0 and Cloudflare Web Analytics verifiedHumanVisits = 0 (range end 2026-08-29) | Confidence: high | Rule: For short, focused traffic experiments, ensure owner-managed legitimate distribution (human posting in targeted communities and/or manual metric uploads) is planned and executed early; relying solely on organic snippet fixes and minor on-site utility within a single 30-day window risks producing impressions without independently verifiable human traffic. | Status: recommended

- 2026-08-30 | Evidence: data/metrics-snapshot.json.generatedAt 2026-08-30T10:30:05.574Z shows Google Search Console authoritative actualDataEndDate 2026-08-27 with impressions = 354 and clicks = 0 and Cloudflare Web Analytics verifiedHumanVisits = 0 (range end 2026-08-30) | Confidence: high | Rule: For short, focused traffic experiments where a small site already emits impressions, the single highest-leverage action to obtain independently verifiable human visits is respectful, owner-executed, community-first distribution linking to clearly useful site assets (and/or uploading a manual metrics snapshot tied to the post). Agent-only repository edits without owner distribution are unlikely to produce independently verifiable human visits within a short window. | Status: recommended

- 2026-09-01 | Evidence: data/metrics-snapshot.json.generatedAt 2026-09-01T10:10:22.861Z shows Google Search Console authoritative actualDataEndDate 2026-08-29 with impressions = 395 and clicks = 0; Cloudflare Web Analytics verifiedHumanVisits = 0 (range end 2026-09-01) | Confidence: high | Rule: For small sites that already emit impressions, the single highest-leverage action to obtain independently verifiable human visits is respectful, owner-executed community-first distribution linking to clear utilities (and/or uploading a manual metrics snapshot tied to the post). Agent-only repository edits without owner distribution are unlikely to produce independently verifiable human visits quickly. | Status: recommended

- 2026-09-02 | Evidence: data/metrics-snapshot.json.generatedAt 2026-09-02T09:41:08.558Z shows Google Search Console authoritative actualDataEndDate 2026-08-30 with impressions = 422 and clicks = 0; Cloudflare Web Analytics verifiedHumanVisits = 0 (range end 2026-09-02) | Confidence: high | Rule: For small sites that already emit impressions, the single highest-leverage action to obtain independently verifiable human visits is respectful, owner-executed community-first distribution linking to clear utilities (and/or uploading a manual metrics snapshot tied to the post). Agent-only repository edits without owner distribution are unlikely to produce independently verifiable human visits quickly. | Status: recommended

## Failed approaches not to repeat

- None yet.

## Validated strategies worth repeating

- Produce crawl artifacts and canonical mappings immediately when indexing is the primary bottleneck; do not wait for owner deployment to create these repository-level files.
- When metric ingestion is delayed, prepare snippet-ready metadata (meta title/description) and document a manual import path for metrics to enable data-driven daily decisions.
- When pages show impressions but zero clicks, updating and clarifying meta title and description to match query intent and state concrete utility is a low-effort action that should be tried before producing new pages.

## Final operational note

- 2026-08-29 | Evidence: data/metrics-snapshot.json.generatedAt 2026-08-29T11:40:38.014Z shows GSC actualDataEndDate 2026-08-26 with impressions = 332 and clicks = 0 and Cloudflare Web Analytics verifiedHumanVisits = 0 (range end 2026-08-29) | Confidence: high | Rule: For short, focused traffic experiments, ensure owner-managed legitimate distribution (human posting in targeted communities and/or manual metric uploads) is planned and executed early; relying solely on organic snippet fixes and minor on-site utility within a single 30-day window risks producing impressions without independently verifiable human traffic. | Status: recommended

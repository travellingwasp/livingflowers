# Final report — 2026-09-18

Objective

- Run-up and reporting for the WindowPlant Lab 30-day traffic experiment. The repository's operational objective was to obtain real, independently verifiable human traffic during the 30-day experiment window.

Facts and measurements reviewed (true data cutoff)

- Experiment status: data/experiment-state.json.experiment.status = "ended"; currentDay = 30; startDate = "2026-07-08"; endDate = "2026-08-06".
- Latest authoritative metrics snapshot: data/metrics-snapshot.json.generatedAt = 2026-09-18T09:49:36.654Z (true data end date for GSC = 2026-09-15).
- Google Search Console (authoritative through 2026-09-15): impressions = 297; clicks = 0; ctr = 0; average position ≈ 66.61; indexedPages = 6. Inspections show six URLs with coverageState "Submitted and indexed".
- Cloudflare Web Analytics (snapshot range end ≈ 2026-09-18): verifiedHumanVisits = 0; verifiedHumanPageviews = 0; topPages = [] (no independently verified visits recorded).
- Content inventory: data/content-inventory.json (updated 2026-08-01) lists /north-facing-window-plants/ as empirically highest-impression page and /light-meter/ as a primary utility.
- Live site checks: published pages return HTTP 200 and include metadata and structured data (data/metrics-snapshot.json.liveSiteChecks checkedAt 2026-09-18T09:49:45.220Z).

Interpretations and hypotheses (separated)

- Interpretations:
  - Indexing/discovery is functioning: pages are submitted and indexed; site is crawlable.
  - Search visibility exists: the site receives hundreds of impressions across multiple days and pages.
  - No independently verifiable human visits were observed in Cloudflare and no organic clicks were recorded in authoritative GSC snapshots during the observed windows; therefore the experiment did not achieve its primary objective of independently verifiable human traffic.
  - Repeated repository-only snippet/meta edits and on-page improvements produced impressions but did not generate clicks or verified visits; further autonomous edits alone are unlikely to produce verifiable human traffic quickly.

- Hypotheses:
  - H1: Owner-executed, respectful community-first distribution linking to focal utilities (/light-meter/ and /north-facing-window-plants/) will produce Cloudflare verifiedHumanVisits > 0 and at least one GSC click for those pages within 48–72 hours.
  - H2: If the owner uploads a manual metrics snapshot to data/manual-metrics-import.json referencing the distribution post URL/referrer and timestamps, the agent can validate distribution effectiveness immediately on upload (or in the next authoritative snapshot if automated ingestion is used).

What worked

- Deployment and crawl artifacts: site serves pages with metadata and structured data and Google has indexed multiple pages.
- On-site utility assets exist and meet the editorial policy (Plant Light Estimator, Plant Distance Calculator, Low-light checklist), providing legitimate focal pages for distribution.
- Prioritizing pages with measurable impressions concentrated traffic signals onto a small set of pages (notably /north-facing-window-plants/), which simplifies distribution targeting.

What did not work

- Repository-only edits (meta/snippet and on-page improvements) repeatedly produced impressions without yielding organic clicks or independently verifiable human visits during authoritative snapshot windows.
- Owner-led distribution and/or manual metrics uploads — the single highest-leverage actions identified early in the experiment — were not executed during or after the experiment window, leaving the distribution hypothesis untested.

Lessons from yesterday

- Reusable lesson (previous): For small sites emitting impressions but no verified human visits, owner-executed, community-first distribution (and/or uploading a manual metrics snapshot tied to the post) is the highest-leverage action to obtain independently verifiable human visits. Agent-only repository edits are unlikely to produce verifiable visits quickly.

New lessons today

- 2026-09-18 | Evidence: data/metrics-snapshot.json.generatedAt 2026-09-18T09:49:36.654Z shows Google Search Console authoritative actualDataEndDate 2026-09-15 with impressions = 297 and clicks = 0; Cloudflare Web Analytics verifiedHumanVisits = 0 (range end 2026-09-18) | Confidence: high | Rule: For small sites that already emit measurable search impressions, the single highest-leverage action to obtain independently verifiable human visits is respectful, owner-executed, community-first distribution linking to clear utilities (and/or uploading a manual metrics snapshot tied to the post). Agent-only repository edits without owner distribution are unlikely to produce independently verifiable human visits quickly. | Status: recommended

Assumptions confirmed/weakened/disproven

- CONFIRMED: "Indexing/discovery works" — evidence: GSC inspections show pages "Submitted and indexed" and live site checks return HTTP 200 with metadata and structured data.
- DISPROVEN: "Metadata/snippet edits alone will reliably produce independently verifiable organic clicks in a short experiment window" — evidence: repeated authoritative snapshots (latest actualDataEndDate 2026-09-15) show impressions > 0 and clicks = 0.
- WEAKENED: "Automated ingestion alone is sufficient to validate owner distribution without owner cooperation" — evidence: no manual metric uploads present and Cloudflare verifiedHumanVisits remains 0 across snapshots.

Improvements needed

- Owner action is required: publish the prepared community-first distribution post (follow community rules) linking to focal utilities and either upload a manual metrics snapshot referencing the post (data/manual-metrics-import.json) or allow automated ingestion to capture resulting visits.
- Keep the content ready for distribution (short post text and focal URLs, suggested audiences). The agent must not publish on the owner's behalf.

Tomorrow's recommended action

- No repository edits recommended. Human owner should publish a respectful, community-first distribution post linking to /light-meter/ and /north-facing-window-plants/ (save post URL and screenshot) and either (A) upload a manual metrics snapshot to data/manual-metrics-import.json including the post URL/referrer and timestamps so the agent can validate immediately, or (B) allow automated ingestion to capture resulting visits; agent will re-evaluate 48–72 hours after the post or immediately on manual upload.

Daily scorecard

DAY 30/30
METRICS:
- Google Search Console authoritative snapshot generatedAt 2026-09-18T09:49:36.654Z (actualDataEndDate 2026-09-15): impressions = 297; clicks = 0; indexedPages = 6.
- Cloudflare Web Analytics (snapshot range end ≈ 2026-09-18): verifiedHumanVisits = 0; verifiedHumanPageviews = 0.
BOTTLENECK:
- No independently verifiable human visits recorded despite indexed pages and recurring impressions. Primary bottleneck: absence of owner-executed, legitimate distribution and/or an owner-uploaded manual metrics snapshot tied to a post.
ACTION:
- J. Final report published. Recommend owner-executed distribution or manual metrics upload for validation.
FILES CHANGED:
- content/final-report-2026-09-18.md
- LESSONS_LEARNED.md (appended one reusable lesson)
TESTS:
- CI/build will run per repository workflows on the daily branch/PR; no runtime tests beyond static file creation were executed by the agent.
PR:
- The runner will create a branch and PR for these edits per repository policy; a human reviewer/owner must merge. Owner action is required to perform distribution and/or upload manual metrics for post-experiment validation.
LESSON LEARNED:
- 2026-09-18 | Evidence: data/metrics-snapshot.json.generatedAt 2026-09-18T09:49:36.654Z shows Google Search Console authoritative actualDataEndDate 2026-09-15 with impressions = 297 and clicks = 0; Cloudflare Web Analytics verifiedHumanVisits = 0 (range end 2026-09-18) | Confidence: high | Rule: For small sites that already emit measurable search impressions, the single highest-leverage action to obtain independently verifiable human visits is respectful, owner-executed, community-first distribution linking to clear utilities (and/or uploading a manual metrics snapshot tied to the post). Agent-only repository edits without owner distribution are unlikely to produce independently verifiable human visits quickly. | Status: recommended
NEXT SIGNAL TO WATCH:
- Cloudflare verifiedHumanVisits > 0 for owner-post-linked pages AND Google Search Console clicks > 0 for the same pages in an authoritative snapshot whose actualDataEndDate >= the post date OR equivalent evidence in an uploaded manual metrics snapshot referencing the post URL/referrer. Earliest practical evaluation: 48–72 hours after an owner post (earliest date: 2026-09-20).
BLOCKER:
- A human owner must publish the prepared distribution draft from a legitimate account (and save the post URL/screenshot) and/or upload a manual metrics snapshot to data/manual-metrics-import.json referencing the post URL/referrer so the agent can validate resulting traffic; without owner cooperation the agent cannot create legitimate, verifiable external visits.

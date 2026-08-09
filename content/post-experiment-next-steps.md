# Post-experiment next steps — how to validate distribution and run a follow-up

This file is a concise checklist for the site owner after the 30-day experiment ended. The autonomous agent prepared distribution drafts during the experiment but the agent cannot post on your behalf. If you want to validate distribution and produce independently verifiable human traffic (Cloudflare + GSC), follow these steps.

1) Quick verification before posting
- Open these pages in a browser and confirm they load over HTTPS from the production domain:
  - https://windowplantlab.com/light-meter/
  - https://windowplantlab.com/north-facing-window-plants/
- Confirm the estimator link is functional and pages render a title and meta description.

2) Post a community-first distribution message (only from accounts where you are an established participant)
- Recommended communities (pick one where you are an active, trusted member): r/houseplants, r/plantclinic, a local/regional plant Facebook/Discord group, Mastodon/X micro-post.
- Use the agent-prepared draft (stored in journal entries). Example (Reddit):
  Title: "Free quick plant-light estimator + checklist for renters (no meter needed)"
  Body: "Hi — I built a tiny web tool to help renters estimate usable light from a window (direction, distance, obstructions). Try the estimator: https://windowplantlab.com/light-meter/ and the north-facing guide: https://windowplantlab.com/north-facing-window-plants/. If you try it, I’d appreciate one-line feedback on usefulness or missing features. (I rent and built this because I kept guessing where to place my plants.)"
- Follow community rules: include a one-line personal stake when required, add [OC] if customary, and avoid reposting the same message across communities.

3) After you post: collect evidence
- Save the post URL and (optionally) a screenshot.
- Either:
  A) Wait for automated ingestion (the repository collector will pick up Cloudflare/GSC data if API access is configured), or
  B) Upload a manual metrics snapshot to the repository using the sample schema at data/manual-metrics-import.json (include the post URL and the date/time of posting). The agent will treat the manual snapshot as authoritative and evaluate results faster.

4) Manual metrics upload guidance (if you choose B)
- Use the existing sample format (data/manual-metrics-import.json). Include these fields at minimum: generatedAt, siteUrl, cloudflare.verifiedHumanVisits, cloudflare.pageViews (page-level optionally), and googleSearchConsole clicks/impressions for the date range that includes the post date. Add a short note with the post URL and the posting account.

5) What to expect after posting
- If the post generates real human clicks:
  - Cloudflare verifiedHumanVisits for the linked pages should increase above 0 within 48–72 hours of posting.
  - Google Search Console should register clicks for the linked pages in the next authoritative snapshot whose actualDataEndDate >= the post date, or you can include the GSC export in a manual snapshot.

6) If you want a follow-up experiment
- Consider a second experiment with an explicit distribution window built in (e.g., 30 days + mandatory owner-post during days 5–12).
- Grant API access for automated ingestion (Google Search Console and Cloudflare Web Analytics) or plan to upload manual metrics snapshots after any owner posts so the agent can evaluate results promptly.

7) If you need help
- Create an issue in this repository describing where you plan to post and attach the post URL after you publish. If you upload a manual metrics snapshot, include the post URL and the timestamp to help the agent correlate visits with the post.

Thank you — this short, owner-driven distribution step is the most direct way to generate independently verifiable human traffic for the current site content.
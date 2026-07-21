# Runbook

## Local Commands

```bash
npm install
npm run dev
npm run check
```

## Configure Production URL

Set `SITE_URL` to the canonical production origin, for example:

```bash
SITE_URL=https://example.com
```

Do not deploy with the default `https://example.com` value.

## Cloudflare Pages Deployment

1. Create a Cloudflare Pages project from the GitHub repository.
2. Build command: `npm run build`.
3. Output directory: `dist`.
4. Environment variables:
   - `SITE_URL=https://YOUR_DOMAIN`
   - `PUBLIC_CLOUDFLARE_WEB_ANALYTICS_TOKEN=YOUR_TOKEN`
5. Attach the custom domain.
6. Confirm `/sitemap.xml`, `/robots.txt`, and `/rss.xml` load on production.

Current status for `windowplantlab.com`: configured and live as of 2026-07-08.

## Google Search Console Setup

1. Add a Domain property if DNS access is available, otherwise add a URL-prefix property for the exact production URL.
2. Complete verification through DNS or the Cloudflare-supported method.
3. Submit `https://YOUR_DOMAIN/sitemap.xml`.
4. Record the setup date in `journal/YYYY-MM-DD.md`.
5. Check Coverage, Pages, Queries, and Performance daily once data appears.

Current status for `https://windowplantlab.com/`: URL-prefix property verified and `sitemap.xml` submitted as of 2026-07-08.

## Daily Operation

Local deterministic fallback:

```bash
npm run daily
npm run check
```

GitHub Actions daily operation:

- Workflow: `.github/workflows/daily-codex.yml`
- Prompt: `.github/daily-codex-prompt.md`
- Runner: `scripts/autonomous-openai-run.mjs`
- Required repository secret: `OPENAI_API_KEY`
- Optional repository variable: `OPENAI_MODEL` defaults to `gpt-5-mini`
- Required repository variable: `SITE_URL`

The workflow calls the OpenAI Responses API, applies structured file edits, runs checks, and opens a pull request when files changed.

Current status: daily workflow, OpenAI API secret, PR creation, branch protection, and auto-merge are configured. Cloudflare and Search Console API metric ingestion remain technical debt.

## Automated Metric Ingestion

The daily workflow runs `npm run metrics` before the autonomous decision. It writes a sanitized snapshot to `data/metrics-snapshot.json` and updates the metric fields in `data/experiment-state.json`.

Configure these GitHub Actions values:

- Secret `GOOGLE_SERVICE_ACCOUNT_JSON`: complete Google service-account JSON. Enable the Search Console API and add `client_email` as a user with read access to the exact Search Console property.
- Variable `SEARCH_CONSOLE_SITE_URL`: exact property identifier, including trailing slash for a URL-prefix property, for example `https://windowplantlab.com/`.
- Secret `CLOUDFLARE_API_TOKEN`: token with Account Analytics read permission.
- Variable `CLOUDFLARE_ACCOUNT_ID`: Cloudflare account ID.
- Variable `CLOUDFLARE_WEB_ANALYTICS_SITE_TAG`: Web Analytics site tag shown in the beacon configuration.

The collector excludes Cloudflare rows classified as bots. Missing credentials produce an explicit `not_configured` state; invalid credentials fail the workflow rather than allowing the agent to act on stale data.

Daily decision options:

- A. Fix indexing or discovery.
- B. Fix technical SEO.
- C. Improve an existing page with impressions.
- D. Improve CTR for a page with impressions but no clicks.
- E. Improve engagement for a page receiving visits.
- F. Build or improve a useful tool/template/dataset.
- G. Publish one substantial new page.
- H. Perform a legitimate distribution action.
- I. Consolidate or remove weak content.
- J. Produce final report.

Choose exactly one highest-value action.

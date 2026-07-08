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

## Google Search Console Setup

1. Add a Domain property if DNS access is available, otherwise add a URL-prefix property for the exact production URL.
2. Complete verification through DNS or the Cloudflare-supported method.
3. Submit `https://YOUR_DOMAIN/sitemap.xml`.
4. Record the setup date in `journal/YYYY-MM-DD.md`.
5. Check Coverage, Pages, Queries, and Performance daily once data appears.

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

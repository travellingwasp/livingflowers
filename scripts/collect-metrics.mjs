import { createSign } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const outputPath = path.join(root, "data", "metrics-snapshot.json");
const statePath = path.join(root, "data", "experiment-state.json");
const inventoryPath = path.join(root, "data", "content-inventory.json");
const siteUrl = process.env.SEARCH_CONSOLE_SITE_URL || process.env.SITE_URL || "https://windowplantlab.com";
const normalizedSiteUrl = siteUrl.endsWith("/") ? siteUrl : `${siteUrl}/`;

function isoDate(date) {
  return date.toISOString().slice(0, 10);
}

function daysAgo(days) {
  const date = new Date();
  date.setUTCDate(date.getUTCDate() - days);
  return date;
}

function base64url(value) {
  return Buffer.from(value).toString("base64url");
}

function parseServiceAccount() {
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (!raw) return null;
  const parsed = JSON.parse(raw);
  if (!parsed.client_email || !parsed.private_key) {
    throw new Error("GOOGLE_SERVICE_ACCOUNT_JSON must contain client_email and private_key.");
  }
  return parsed;
}

async function googleAccessToken(serviceAccount) {
  const now = Math.floor(Date.now() / 1000);
  const header = base64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claim = base64url(JSON.stringify({
    iss: serviceAccount.client_email,
    scope: "https://www.googleapis.com/auth/webmasters.readonly",
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600
  }));
  const unsigned = `${header}.${claim}`;
  const signer = createSign("RSA-SHA256");
  signer.update(unsigned);
  signer.end();
  const assertion = `${unsigned}.${signer.sign(serviceAccount.private_key, "base64url")}`;
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion
    })
  });
  if (!response.ok) throw new Error(`Google OAuth failed: ${response.status} ${await response.text()}`);
  return (await response.json()).access_token;
}

async function googleJson(url, token, body) {
  const response = await fetch(url, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  if (!response.ok) throw new Error(`Google API failed: ${response.status} ${await response.text()}`);
  return response.json();
}

async function collectSearchConsole() {
  const serviceAccount = parseServiceAccount();
  if (!serviceAccount) return { status: "not_configured" };
  const token = await googleAccessToken(serviceAccount);
  const endDate = isoDate(daysAgo(3));
  const startDate = isoDate(daysAgo(30));
  const endpoint = `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(normalizedSiteUrl)}/searchAnalytics/query`;
  const [totals, details] = await Promise.all([
    googleJson(endpoint, token, { startDate, endDate, type: "web", dataState: "final" }),
    googleJson(endpoint, token, {
      startDate,
      endDate,
      dimensions: ["page", "query"],
      type: "web",
      dataState: "final",
      rowLimit: 250
    })
  ]);

  const inventory = JSON.parse(await readFile(inventoryPath, "utf8"));
  const inspections = await Promise.all(inventory.pages.map(async (page) => {
    try {
      const result = await googleJson(
        "https://searchconsole.googleapis.com/v1/urlInspection/index:inspect",
        token,
        { inspectionUrl: new URL(page.path, normalizedSiteUrl).href, siteUrl: normalizedSiteUrl }
      );
      const index = result.inspectionResult?.indexStatusResult || {};
      return { url: new URL(page.path, normalizedSiteUrl).href, verdict: index.verdict || "UNKNOWN", coverageState: index.coverageState || null };
    } catch (error) {
      return { url: new URL(page.path, normalizedSiteUrl).href, verdict: "ERROR", error: error.message };
    }
  }));

  const total = totals.rows?.[0] || {};
  return {
    status: "ok",
    range: { startDate, endDate },
    clicks: total.clicks || 0,
    impressions: total.impressions || 0,
    ctr: total.ctr || 0,
    position: total.position ?? null,
    indexedPages: inspections.filter((row) => row.verdict === "PASS").length,
    inspections,
    topPageQueries: (details.rows || []).map((row) => ({
      page: row.keys?.[0], query: row.keys?.[1], clicks: row.clicks, impressions: row.impressions, ctr: row.ctr, position: row.position
    }))
  };
}

async function cloudflareGraphql(query, variables) {
  const response = await fetch("https://api.cloudflare.com/client/v4/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ query, variables })
  });
  if (!response.ok) throw new Error(`Cloudflare API failed: ${response.status} ${await response.text()}`);
  const payload = await response.json();
  if (payload.errors?.length) throw new Error(`Cloudflare GraphQL failed: ${JSON.stringify(payload.errors)}`);
  return payload.data;
}

async function collectCloudflare() {
  const accountTag = process.env.CLOUDFLARE_ACCOUNT_ID;
  const siteTag = process.env.CLOUDFLARE_WEB_ANALYTICS_SITE_TAG;
  if (!process.env.CLOUDFLARE_API_TOKEN || !accountTag || !siteTag) return { status: "not_configured" };
  const start = daysAgo(30).toISOString();
  const end = new Date().toISOString();
  const query = `
    query WebAnalytics($accountTag: string, $filter: AccountRumPageloadEventsAdaptiveGroupsFilter_InputObject) {
      viewer { accounts(filter: { accountTag: $accountTag }) {
        total: rumPageloadEventsAdaptiveGroups(filter: $filter, limit: 1) { count avg { sampleInterval } sum { visits } }
        topPaths: rumPageloadEventsAdaptiveGroups(filter: $filter, limit: 20, orderBy: [count_DESC]) { count avg { sampleInterval } sum { visits } dimensions { requestPath } }
        topReferers: rumPageloadEventsAdaptiveGroups(filter: $filter, limit: 20, orderBy: [count_DESC]) { count avg { sampleInterval } sum { visits } dimensions { refererHost } }
      } }
    }`;
  const data = await cloudflareGraphql(query, {
    accountTag,
    filter: { AND: [{ datetime_geq: start, datetime_leq: end }, { siteTag }, { bot: 0 }] }
  });
  const account = data.viewer?.accounts?.[0];
  if (!account) throw new Error("Cloudflare returned no account data.");
  const estimate = (row) => Math.round((row?.count || 0) * (row?.avg?.sampleInterval || 1));
  return {
    status: "ok",
    range: { start, end },
    verifiedHumanPageviews: estimate(account.total?.[0]),
    verifiedHumanVisits: account.total?.[0]?.sum?.visits || 0,
    topPages: account.topPaths.map((row) => ({ path: row.dimensions.requestPath, pageviews: estimate(row), visits: row.sum.visits || 0 })),
    referrers: account.topReferers.filter((row) => row.dimensions.refererHost).map((row) => ({ host: row.dimensions.refererHost, pageviews: estimate(row), visits: row.sum.visits || 0 }))
  };
}

async function safeCollect(name, fn) {
  try { return await fn(); }
  catch (error) { return { status: "error", error: `${name}: ${error.message}` }; }
}

const snapshot = {
  generatedAt: new Date().toISOString(),
  siteUrl: normalizedSiteUrl,
  googleSearchConsole: await safeCollect("Google Search Console", collectSearchConsole),
  cloudflareWebAnalytics: await safeCollect("Cloudflare Web Analytics", collectCloudflare)
};
await writeFile(outputPath, `${JSON.stringify(snapshot, null, 2)}\n`);

const state = JSON.parse(await readFile(statePath, "utf8"));
const gsc = snapshot.googleSearchConsole;
const cf = snapshot.cloudflareWebAnalytics;
state.metrics.googleSearchConsole = {
  ...state.metrics.googleSearchConsole,
  apiConfigured: gsc.status === "ok",
  impressions: gsc.status === "ok" ? gsc.impressions : state.metrics.googleSearchConsole.impressions,
  clicks: gsc.status === "ok" ? gsc.clicks : state.metrics.googleSearchConsole.clicks,
  indexedPages: gsc.status === "ok" ? gsc.indexedPages : state.metrics.googleSearchConsole.indexedPages,
  queries: gsc.status === "ok" ? gsc.topPageQueries.slice(0, 50) : state.metrics.googleSearchConsole.queries,
  lastApiCheck: snapshot.generatedAt,
  ingestionStatus: gsc.status
};
state.metrics.cloudflareWebAnalytics = {
  ...state.metrics.cloudflareWebAnalytics,
  apiConfigured: cf.status === "ok",
  verifiedHumanVisits: cf.status === "ok" ? cf.verifiedHumanVisits : state.metrics.cloudflareWebAnalytics.verifiedHumanVisits,
  topPages: cf.status === "ok" ? cf.topPages : state.metrics.cloudflareWebAnalytics.topPages,
  referrers: cf.status === "ok" ? cf.referrers : state.metrics.cloudflareWebAnalytics.referrers,
  lastApiCheck: snapshot.generatedAt,
  ingestionStatus: cf.status
};
await writeFile(statePath, `${JSON.stringify(state, null, 2)}\n`);

console.log(`Metrics snapshot written: GSC=${gsc.status}, Cloudflare=${cf.status}`);
if ([gsc, cf].some((source) => source.status === "error")) process.exitCode = 1;

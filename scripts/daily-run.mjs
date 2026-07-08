import { readFile, writeFile, readdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const statePath = path.join(root, "data", "experiment-state.json");
const inventoryPath = path.join(root, "data", "content-inventory.json");
const lessonsPath = path.join(root, "LESSONS_LEARNED.md");
const journalDir = path.join(root, "journal");

const now = new Date();
const date = now.toISOString().slice(0, 10);

function daysBetween(start, end) {
  const ms = Date.parse(`${end}T00:00:00Z`) - Date.parse(`${start}T00:00:00Z`);
  return Math.floor(ms / 86_400_000) + 1;
}

async function readJson(file) {
  return JSON.parse(await readFile(file, "utf8"));
}

async function previousJournals() {
  const files = (await readdir(journalDir))
    .filter((file) => /^\d{4}-\d{2}-\d{2}\.md$/.test(file))
    .sort();
  return files.slice(-7);
}

const state = await readJson(statePath);
const inventory = await readJson(inventoryPath);
const lessons = await readFile(lessonsPath, "utf8");
const recent = await previousJournals();

const hasMetrics =
  state.metrics.googleSearchConsole.configured ||
  state.metrics.cloudflareWebAnalytics.configured;
const ownerGated = state.ownerGated?.length > 0;
const option = ownerGated && !hasMetrics ? "A" : "C";
const objective =
  option === "A"
    ? "Fix indexing and measurement setup blockers before optimizing content."
    : "Improve the strongest existing page based on available performance evidence.";

state.experiment.currentDay = daysBetween(state.experiment.startDate, date);
state.lastAction = {
  date,
  option,
  summary: objective,
  validationMetric:
    option === "A"
      ? "Production sitemap submitted and analytics verified."
      : "Search Console page-query pair improves impressions, CTR, or clicks."
};

inventory.updated = date;

const journalPath = path.join(journalDir, `${date}.md`);
if (!existsSync(journalPath)) {
  const journal = `# Day ${state.experiment.currentDay}/30 - ${date}

## Objective

${objective}

## Evidence reviewed

- Experiment state from \`data/experiment-state.json\`.
- Content inventory from \`data/content-inventory.json\`.
- Previous seven journals: ${recent.length ? recent.join(", ") : "none available"}.
- Active lessons from \`LESSONS_LEARNED.md\`.
- Metrics availability: ${hasMetrics ? "configured" : "not available yet"}.

## What worked

- No traffic success recorded without independent metrics.

## What did not work

- Expected result: Daily automation can inspect real Search Console and Cloudflare data.
- Actual result: Metrics are ${hasMetrics ? "available for review" : "not configured in experiment state"}.
- Likely cause: ${hasMetrics ? "Manual metric import is still needed unless API access is added." : "Owner-gated deployment and verification are still incomplete."}
- Classification: measurement-related.

## Lessons from yesterday

- Follow active lessons in \`LESSONS_LEARNED.md\`.

## New lessons learned today

- Observation: The current bottleneck is ${option === "A" ? "indexing and measurement setup" : "content improvement from available evidence"}.
- Evidence: State option selected was ${option}.
- Interpretation: Work should stay focused on one bottleneck.
- Lesson: Daily runs should choose one action and leave a validation metric.
- Future rule: Do not combine publishing, distribution, and technical changes in one daily action unless required to fix the selected bottleneck.

## Assumptions

- Analytics setup is required before traffic progress can be evaluated: ${hasMetrics ? "confirmed" : "still untested"}.
- Existing utility pages are enough for initial indexing: still untested.

## Improvements needed

- Strategy: Reassess after first Search Console impressions.
- Content: Add measured examples when real observations exist.
- Technical SEO: Confirm production canonical URL.
- UX: Review forms on mobile after deployment.
- Analytics: Complete Cloudflare and Search Console setup.
- Distribution: Post only where the tool answers a real user question.
- Workflow: Connect the daily workflow to repository branch and PR policy.

## Tomorrow's recommended action

Next bottleneck: ${option === "A" ? "external setup" : "query-page improvement"}.
Next action: ${option === "A" ? "verify production URL, submit sitemap, and confirm analytics script fires" : "edit the page with the clearest impression or visit signal"}.
Validation metric: ${state.lastAction.validationMetric}

## Daily scorecard

- Useful output produced: 2/5
- Traffic progress: 0/5
- Learning produced: 3/5
- Technical reliability: 3/5
- Strategic focus: 4/5
- Avoidance of low-value work: 5/5

Useful output and traffic progress remain below 3 until owner-gated setup or metric-backed changes are complete.
`;
  await writeFile(journalPath, journal);
}

if (!lessons.includes("Daily runs should choose one action")) {
  const newLesson = `
- First observed date: ${date}
  - Evidence: The daily script selected option ${option} from state and wrote one validation metric.
  - Confidence: medium
  - Operational rule: Daily runs should choose one action and one validation metric before making changes.
  - Status: active
`;
  const insertionPoint = "## Failed approaches not to repeat";
  const updatedLessons = lessons.includes(insertionPoint)
    ? lessons.replace(insertionPoint, `${newLesson}\n${insertionPoint}`)
    : `${lessons.trim()}\n\n## Workflow lessons\n${newLesson}`;
  await writeFile(
    lessonsPath,
    updatedLessons
  );
}

await writeFile(statePath, `${JSON.stringify(state, null, 2)}\n`);
await writeFile(inventoryPath, `${JSON.stringify(inventory, null, 2)}\n`);

console.log(`Daily run complete for ${date}. Selected option ${option}.`);

import { readFile, writeFile, readdir, mkdir, rm } from "node:fs/promises";
import { existsSync } from "node:fs";
import { spawn } from "node:child_process";
import path from "node:path";

const root = process.cwd();
const model = process.env.OPENAI_MODEL || "gpt-5-mini";
const apiKey = process.env.OPENAI_API_KEY;
const promptPath = path.join(root, ".github", "daily-codex-prompt.md");
const reportPath = path.join(root, "data", "daily-openai-report.md");

const requiredReads = [
  "EXPERIMENT.md",
  "STRATEGY.md",
  "RUNBOOK.md",
  "METRICS.md",
  "EDITORIAL_POLICY.md",
  "LESSONS_LEARNED.md",
  "data/experiment-state.json",
  "data/content-inventory.json",
  "data/metrics-snapshot.json"
];

const editablePrefixes = ["src/", "content/", "public/", "data/"];

const editableRootFiles = new Set([
  "LESSONS_LEARNED.md",
  "STRATEGY.md",
  "METRICS.md",
  "EDITORIAL_POLICY.md"
]);

const protectedPaths = new Set([
  "package-lock.json",
  "data/metrics-snapshot.json",
  "data/daily-openai-report.md",
  "node_modules",
  "dist",
  ".git",
  ".env"
]);

function formatDateBucharest(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Bucharest",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).formatToParts(date);
  const value = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${value.year}-${value.month}-${value.day}`;
}

function assertSafePath(relativePath) {
  if (!relativePath || path.isAbsolute(relativePath)) {
    throw new Error(`Unsafe path: ${relativePath}`);
  }
  const normalized = relativePath.replaceAll("\\", "/");
  if (normalized.includes("..")) {
    throw new Error(`Unsafe path traversal: ${relativePath}`);
  }
  for (const protectedPath of protectedPaths) {
    if (normalized === protectedPath || normalized.startsWith(`${protectedPath}/`)) {
      throw new Error(`Protected path cannot be edited: ${relativePath}`);
    }
  }
  if (
    !editableRootFiles.has(normalized) &&
    !editablePrefixes.some((prefix) => normalized.startsWith(prefix))
  ) {
    throw new Error(`Path is outside editable areas: ${relativePath}`);
  }
  return normalized;
}

async function readIfExists(relativePath) {
  const full = path.join(root, relativePath);
  if (!existsSync(full)) return null;
  return await readFile(full, "utf8");
}

async function journalContext(today) {
  const journalDir = path.join(root, "journal");
  if (!existsSync(journalDir)) return [];
  const files = (await readdir(journalDir))
    .filter((file) => /^\d{4}-\d{2}-\d{2}\.md$/.test(file) && file !== `${today}.md`)
    .sort()
    .slice(-8);
  return Promise.all(
    files.map(async (file) => ({
      path: `journal/${file}`,
      content: await readFile(path.join(journalDir, file), "utf8")
    }))
  );
}

async function fileSnapshot(relativePath) {
  const content = await readIfExists(relativePath);
  return content === null ? "" : `\n--- FILE: ${relativePath} ---\n${content}\n`;
}

function extractJson(text) {
  const fenced = text.match(/```json\s*([\s\S]*?)\s*```/i);
  const raw = fenced ? fenced[1] : text;
  const start = raw.indexOf("{");
  const end = raw.lastIndexOf("}");
  if (start === -1 || end === -1 || end <= start) {
    throw new Error("OpenAI response did not contain a JSON object.");
  }
  return JSON.parse(raw.slice(start, end + 1));
}

function validatePlan(plan) {
  if (!plan || typeof plan !== "object") throw new Error("Response JSON must be an object.");
  if (!Array.isArray(plan.edits)) throw new Error("Response JSON must include an edits array.");
  if (typeof plan.terminal_report !== "string") throw new Error("Response JSON must include terminal_report.");
  const modes = new Set(["implement", "wait", "draft_distribution", "propose_protected"]);
  const decisions = new Set(["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"]);
  if (!decisions.has(plan.decision)) throw new Error("Response JSON has an invalid decision.");
  if (!modes.has(plan.action_mode)) throw new Error("Response JSON has an invalid action_mode.");
  if (plan.decision === "K" && plan.action_mode !== "wait") {
    throw new Error("Decision K must use wait mode.");
  }
  if (plan.decision === "H" && plan.action_mode !== "draft_distribution") {
    throw new Error("Decision H must use draft_distribution mode.");
  }
  if (plan.action_mode === "draft_distribution" && !plan.distribution_draft?.trim()) {
    throw new Error("Distribution mode requires a distribution draft.");
  }
  if (plan.action_mode === "propose_protected" && !plan.protected_proposal?.trim()) {
    throw new Error("Protected mode requires a human-review proposal.");
  }
  if (plan.action_mode === "implement" && plan.edits.length === 0) {
    throw new Error("An implement plan must contain at least one edit.");
  }
  if (plan.action_mode !== "implement" && plan.edits.length > 0) {
    throw new Error(`${plan.action_mode} must not edit site files.`);
  }
  if (!plan.evidence || !Array.isArray(plan.evidence.facts) || !Array.isArray(plan.evidence.measurements) ||
      !Array.isArray(plan.evidence.interpretations) || !Array.isArray(plan.evidence.hypotheses)) {
    throw new Error("Evidence must separate facts, measurements, interpretations, and hypotheses.");
  }
  const evidenceItems = Object.values(plan.evidence).flat();
  if (!evidenceItems.every((item) => typeof item === "string")) {
    throw new Error("Every evidence entry must be a string.");
  }
  if (!plan.learning || !Array.isArray(plan.learning.worked) || !Array.isArray(plan.learning.failed) ||
      !Array.isArray(plan.learning.assumption_updates) || typeof plan.learning.lesson !== "string" ||
      typeof plan.learning.tomorrow !== "string") {
    throw new Error("Response JSON must include the structured learning loop.");
  }
  const evidenceStatuses = new Set(["WAITING_FOR_EVIDENCE", "READY_TO_EVALUATE", "NOT_APPLICABLE"]);
  if (!evidenceStatuses.has(plan.waiting_for_evidence?.status)) {
    throw new Error("waiting_for_evidence has an invalid status.");
  }
  if (plan.edits.length > 12) throw new Error("The daily plan exceeds the 12-file safety limit.");
  const seenPaths = new Set();
  let totalBytes = 0;
  for (const edit of plan.edits) {
    if (!edit || typeof edit.path !== "string" || typeof edit.content !== "string") {
      throw new Error("Each edit must have string path and content.");
    }
    const normalized = assertSafePath(edit.path);
    if (seenPaths.has(normalized)) throw new Error(`Duplicate edit path: ${normalized}`);
    seenPaths.add(normalized);
    totalBytes += Buffer.byteLength(edit.content, "utf8");
  }
  if (totalBytes > 500_000) throw new Error("The daily plan exceeds the 500 KB safety limit.");
}

function bullets(values) {
  return values.length ? values.map((value) => `- ${value}`).join("\n") : "- None recorded.";
}

async function writeDailyJournal(today, plan) {
  const waiting = plan.waiting_for_evidence || {};
  const content = `# Daily operation - ${today}

## Decision

- Category: ${plan.decision}
- Mode: ${plan.action_mode}
- Summary: ${plan.summary || "No summary provided."}

## Facts

${bullets(plan.evidence.facts)}

## Measurements

${bullets(plan.evidence.measurements)}

## Interpretations

${bullets(plan.evidence.interpretations)}

## Hypotheses

${bullets(plan.evidence.hypotheses)}

## Learning loop

### What worked

${bullets(plan.learning.worked)}

### What failed

${bullets(plan.learning.failed)}

### Assumption updates

${bullets(plan.learning.assumption_updates)}

- Reusable lesson: ${plan.learning.lesson}
- Tomorrow: ${plan.learning.tomorrow}

## Evidence status

- Status: ${waiting.status || "NOT_APPLICABLE"}
- Signal: ${waiting.signal || "None"}
- Evaluate after: ${waiting.available_after || "Not specified"}

## Protected proposal

${plan.protected_proposal || "None."}

## Distribution draft

${plan.distribution_draft || "None."}

## Terminal report

\`\`\`text
${plan.terminal_report}
\`\`\`
`;
  const journalPath = path.join(root, "journal", `${today}.md`);
  await mkdir(path.dirname(journalPath), { recursive: true });
  await writeFile(journalPath, content);
}

async function callOpenAI(input) {
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is missing. Add it as a GitHub Actions repository secret.");
  }

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model,
      input,
      text: {
        format: {
          type: "json_object"
        }
      }
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`OpenAI API request failed: ${response.status} ${errorText}`);
  }

  const payload = await response.json();
  const text =
    payload.output_text ||
    payload.output
      ?.flatMap((item) => item.content || [])
      .map((content) => content.text || "")
      .join("\n");
  if (!text) throw new Error("OpenAI response did not include output text.");
  return extractJson(text);
}

async function applyEdits(edits) {
  for (const edit of edits) {
    const relativePath = assertSafePath(edit.path);
    const full = path.join(root, relativePath);
    await mkdir(path.dirname(full), { recursive: true });
    await writeFile(full, edit.content);
  }
}

function runChecks() {
  return new Promise((resolve, reject) => {
    const child = spawn("npm", ["run", "check"], {
      cwd: root,
      env: { ...process.env, SITE_URL: process.env.SITE_URL || "https://example.com" },
      stdio: "inherit"
    });
    child.on("error", reject);
    child.on("exit", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`Generated changes failed validation (exit code ${code}).`));
    });
  });
}

async function snapshotEdits(edits) {
  return Promise.all(
    edits.map(async ({ path: relativePath }) => ({
      path: assertSafePath(relativePath),
      existed: existsSync(path.join(root, relativePath)),
      content: await readIfExists(relativePath)
    }))
  );
}

async function rollbackEdits(snapshot) {
  for (const entry of snapshot) {
    const full = path.join(root, entry.path);
    if (entry.existed) await writeFile(full, entry.content);
    else await rm(full, { force: true });
  }
}

async function writeFailureRecord(today, error) {
  const message = error instanceof Error ? error.message : String(error);
  const normalJournalPath = path.join(root, "journal", `${today}.md`);
  const journalPath = existsSync(normalJournalPath)
    ? path.join(root, "journal", `${today}-rejected.md`)
    : normalJournalPath;
  await mkdir(path.dirname(journalPath), { recursive: true });
  await writeFile(
    journalPath,
    `# Daily operation - ${today}\n\n## Status\n\nNo site change was published. The generated proposal was rejected by the safety checks.\n\n## Blocker\n\n${message}\n\n## Next action\n\nRetry on the next scheduled run using the verified metrics snapshot.\n`
  );
  await writeFile(
    reportPath,
    `# Daily OpenAI Report - ${today}\n\nModel: ${model}\n\nSTATUS: REJECTED SAFELY\nBLOCKER: ${message}\nACTION: No generated site change was published.\n`
  );
}

async function main() {
  const today = formatDateBucharest();
  const basePrompt = await readFile(promptPath, "utf8");
  const journals = await journalContext(today);
  const sourceContext = (await Promise.all(requiredReads.map(fileSnapshot))).join("\n");
  const journalText = journals
    .map((entry) => `\n--- FILE: ${entry.path} ---\n${entry.content}\n`)
    .join("\n");

  const instruction = `${basePrompt}

You are running inside GitHub Actions. Return only valid JSON. Do not wrap it in markdown.

Google Search Console and Cloudflare metrics are collected before this step into data/metrics-snapshot.json. Use only sources whose status is "ok"; treat not_configured or error sources as unavailable.

Return this JSON shape:
{
  "decision": "A|B|C|D|E|F|G|H|I|J|K",
  "action_mode": "implement|wait|draft_distribution|propose_protected",
  "summary": "short explanation",
  "evidence": {
    "facts": ["directly observable facts only"],
    "measurements": ["sourced numbers with range and true data end date"],
    "interpretations": ["what the measurements likely mean"],
    "hypotheses": ["claims still requiring evidence"]
  },
  "learning": {
    "worked": ["outcomes supported by evidence"],
    "failed": ["failed or inconclusive attempts"],
    "assumption_updates": ["CONFIRMED|WEAKENED|DISPROVEN|UNTESTED: claim and evidence"],
    "lesson": "date | evidence | confidence | rule | status",
    "tomorrow": "recommended next action"
  },
  "waiting_for_evidence": {
    "status": "WAITING_FOR_EVIDENCE|READY_TO_EVALUATE|NOT_APPLICABLE",
    "signal": "exact metric that resolves the question",
    "available_after": "YYYY-MM-DD or condition"
  },
  "protected_proposal": "human-review proposal, or empty string",
  "distribution_draft": "owner-posted draft, or empty string",
  "edits": [
    {
      "path": "relative/path/from/repo/root",
      "content": "complete replacement file content"
    }
  ],
  "terminal_report": "DAY X/30\\nMETRICS:\\nBOTTLENECK:\\nACTION:\\nFILES CHANGED:\\nTESTS:\\nPR:\\nLESSON LEARNED:\\nNEXT SIGNAL TO WATCH:\\nBLOCKER:"
}

Use complete file contents in edits, not patches. Keep edits scoped and safe.
Allowed edit areas: src/, content/, public/, data/, and selected root strategy markdown docs. The runner writes today's journal itself.
Never edit scripts, workflows, dependencies, or configuration. Put those ideas in protected_proposal.
For distribution, return action_mode=draft_distribution, no edits, and a draft for the owner; never claim it was posted.
K means measure and wait. No site edit is required or allowed for K.

Today's date in Europe/Bucharest is ${today}.

Repository context:
${sourceContext}
${journalText}
`;

  const plan = await callOpenAI(instruction);
  validatePlan(plan);
  const snapshot = await snapshotEdits(plan.edits);
  try {
    await applyEdits(plan.edits);
    if (plan.edits.length) await runChecks();
  } catch (error) {
    await rollbackEdits(snapshot);
    throw error;
  }
  await writeDailyJournal(today, plan);
  await writeFile(
    reportPath,
    `# Daily OpenAI Report - ${today}

Model: ${model}

${plan.terminal_report}

## Summary

${plan.summary || "No summary provided."}
`
  );
  console.log(plan.terminal_report);
}

main().catch(async (error) => {
  console.error(error);
  try {
    await writeFailureRecord(formatDateBucharest(), error);
    console.log("Invalid daily proposal was rolled back and recorded for review.");
  } catch (recordError) {
    console.error(recordError);
    process.exitCode = 1;
  }
});

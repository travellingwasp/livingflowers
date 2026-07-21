import { readFile, writeFile, readdir } from "node:fs/promises";
import { existsSync } from "node:fs";
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

const editablePrefixes = [
  "src/",
  "content/",
  "public/",
  "data/",
  "journal/",
  "scripts/",
  ".github/",
  ""
];

const protectedPaths = new Set([
  "package-lock.json",
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
  if (!editablePrefixes.some((prefix) => normalized.startsWith(prefix))) {
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
  for (const edit of plan.edits) {
    if (!edit || typeof edit.path !== "string" || typeof edit.content !== "string") {
      throw new Error("Each edit must have string path and content.");
    }
    assertSafePath(edit.path);
  }
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
    await writeFile(full, edit.content);
  }
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
  "decision": "A|B|C|D|E|F|G|H|I|J",
  "summary": "short explanation",
  "edits": [
    {
      "path": "relative/path/from/repo/root",
      "content": "complete replacement file content"
    }
  ],
  "terminal_report": "DAY X/30\\nMETRICS:\\nBOTTLENECK:\\nACTION:\\nFILES CHANGED:\\nTESTS:\\nPR:\\nLESSON LEARNED:\\nNEXT SIGNAL TO WATCH:\\nBLOCKER:"
}

Use complete file contents in edits, not patches. Keep edits scoped and safe.
Allowed edit areas: src/, content/, public/, data/, journal/, scripts/, .github/, root markdown docs.
Do not edit package-lock.json unless package.json dependency changes are absolutely required.

Today's date in Europe/Bucharest is ${today}.

Repository context:
${sourceContext}
${journalText}
`;

  const plan = await callOpenAI(instruction);
  validatePlan(plan);
  await applyEdits(plan.edits);
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

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

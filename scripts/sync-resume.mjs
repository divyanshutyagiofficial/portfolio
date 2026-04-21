#!/usr/bin/env node
/**
 * sync-resume — copies the canonical resume JSON from the sister
 * resume-builder app into this portfolio's /public/resumes/ folder.
 *
 *   Source (resolved in this order):
 *     1. $RESUME_SOURCE              — explicit absolute path to a JSON file.
 *     2. $RESUME_BUILDER_PATH/resumes/<most-recently-modified .json>
 *     3. <project>/../Resume-builder/resume-builder-app/resumes/<latest>
 *     4. <user-default> hard-coded fallback (Windows + WSL/macOS friendly).
 *
 *   Destination:
 *     <project>/public/resumes/divyanshu-tyagi-resume.json
 *
 * Flags:
 *   --soft   exit 0 (with a warning) if the source can't be found, so it
 *            can be safely chained into prebuild on CI environments that
 *            don't have the builder repo on disk (e.g. Netlify).
 *
 * Usage:
 *   npm run sync-resume
 *   RESUME_SOURCE="D:\\path\\to\\my-resume.json" npm run sync-resume
 */

import { existsSync, readdirSync, statSync, copyFileSync, mkdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = resolve(__dirname, "..");
const destDir = join(projectRoot, "public", "resumes");
const destFile = join(destDir, "divyanshu-tyagi-resume.json");

const SOFT = process.argv.includes("--soft");

function log(msg) {
  process.stdout.write(`[sync-resume] ${msg}\n`);
}
function warn(msg) {
  process.stderr.write(`[sync-resume] ${msg}\n`);
}

function pickLatestJson(dir) {
  if (!existsSync(dir)) return null;
  const files = readdirSync(dir)
    .filter((n) => n.toLowerCase().endsWith(".json"))
    .map((n) => {
      const p = join(dir, n);
      return { path: p, mtime: statSync(p).mtimeMs };
    })
    .sort((a, b) => b.mtime - a.mtime);
  return files[0]?.path ?? null;
}

function resolveSource() {
  if (process.env.RESUME_SOURCE) {
    const p = resolve(process.env.RESUME_SOURCE);
    return existsSync(p) ? p : null;
  }

  const candidates = [
    process.env.RESUME_BUILDER_PATH
      ? join(process.env.RESUME_BUILDER_PATH, "resumes")
      : null,
    resolve(projectRoot, "..", "Resume-builder", "resume-builder-app", "resumes"),
    "D:\\Personal_Stuff\\development\\Resume-builder\\resume-builder-app\\resumes",
  ].filter(Boolean);

  for (const dir of candidates) {
    const latest = pickLatestJson(dir);
    if (latest) return latest;
  }
  return null;
}

const src = resolveSource();
if (!src) {
  const msg =
    "Could not find a resume JSON source. Set RESUME_SOURCE or RESUME_BUILDER_PATH " +
    "to point at the sister resume-builder app.";
  if (SOFT) {
    warn(`${msg} (skipping, --soft)`);
    process.exit(0);
  }
  warn(msg);
  process.exit(1);
}

if (!existsSync(destDir)) mkdirSync(destDir, { recursive: true });
copyFileSync(src, destFile);

const stats = statSync(src);
const ageMin = Math.round((Date.now() - stats.mtimeMs) / 60000);
log(`from: ${src}`);
log(`  to: ${destFile}`);
log(
  `  size: ${(stats.size / 1024).toFixed(1)} KB · last edited ${ageMin} min ago`,
);

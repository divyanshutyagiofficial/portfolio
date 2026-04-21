import type { Resume } from "@/types";

/**
 * The portfolio ships a single polyglot resume covering the entire
 * stack the owner ships in production: Node.js, .NET, React/Next/Angular
 * and Web3. The JSON file lives in /public/resumes and is regenerated
 * from the resume-builder app (sister project).
 *
 * `pdf` is optional — when present, the static export ships a PDF
 * for direct download. When absent, the visitor can still print-to-PDF
 * from the in-app viewer (`/resume?variant=...`).
 */
export const resumes: Resume[] = [
  {
    id: "polyglot",
    name: "Full-Stack — Polyglot",
    variant: "polyglot",
    description:
      "Node.js · .NET 8 · React · Next.js · Angular · TypeScript · Web3 · AWS / Azure.",
    highlight:
      "Best fit for: any Tech Lead / Architect role across JS, .NET, React/Next/Angular and headless / Web3 stacks.",
    json: "/resumes/divyanshu-tyagi-polyglot.json",
  },
];

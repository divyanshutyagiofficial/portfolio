import type { Resume } from "@/types";

/**
 * The portfolio ships a single resume covering the entire stack the owner
 * ships in production: Node.js, .NET, React/Next/Angular, TypeScript and Web3.
 *
 * The JSON file lives in /public/resumes and is pulled from the sister
 * resume-builder app via `npm run sync-resume` — so the resume on this
 * site is always the latest version saved in the builder.
 *
 * `pdf` is intentionally absent — PDF and DOCX are generated client-side
 * on demand from the JSON (jsPDF + docx), so a single JSON is the
 * canonical source of truth.
 */
export const resumes: Resume[] = [
  {
    id: "resume",
    name: "Resume",
    variant: "resume",
    description:
      "Node.js · .NET 8 · React · Next.js · Angular · TypeScript · Web3 · AWS / Azure.",
    highlight:
      "Best fit for: Tech Lead / Architect roles across JS, .NET, React/Next/Angular and headless / Web3 stacks.",
    json: "/resumes/divyanshu-tyagi-resume.json",
  },
];

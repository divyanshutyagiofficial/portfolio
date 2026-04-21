/**
 * Shared types + JSON shape for the resume the portfolio downloads.
 *
 * The JSON file lives at /public/resumes/divyanshu-tyagi-resume.json and is
 * synced from the sister resume-builder app via `npm run sync-resume`. The
 * shape mirrors that app's `SavedResume`, but every theme/template field is
 * optional here — we always fall back to portfolio defaults so a hand-rolled
 * JSON without a `theme` block still renders + exports cleanly.
 */

export interface ResumeJson {
  /** Optional display name from the builder app (e.g. "Divyanshu's Full Stack JS"). */
  name?: string;
  /** Builder template id — currently unused on the portfolio side, kept for round-tripping. */
  templateId?: string;
  theme?: Partial<{
    primaryColor: string;
    backgroundColor: string;
    textColor: string;
    accentColor: string;
    fontFamily: string;
    baseFontSize: number;
    headingScale: number;
    layout: string;
    pagePadding: number;
    sectionSpacing: number;
    lineHeight: number;
    paperSize: "letter" | "a4";
  }>;
  personal: {
    fullName: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    website?: string;
    linkedIn?: string;
    github?: string;
    summary: string;
    objective?: string;
  };
  experience: Array<{
    company: string;
    role: string;
    startDate: string;
    endDate: string;
    location?: string;
    bullets: string[];
    highlights?: string[];
  }>;
  education: Array<{
    institution: string;
    degree: string;
    fieldOfStudy?: string;
    startDate?: string;
    endDate?: string;
    location?: string;
  }>;
  projects: Array<{
    name: string;
    description?: string;
    tech?: string[];
    link?: string;
    bullets?: string[];
  }>;
  skills: string[];
  certifications?: Array<{ name: string; issuer?: string; date?: string }>;
  languages?: string[];
}

/** Defaults used whenever the JSON omits a theme field. */
export const RESUME_DEFAULTS = {
  primaryColor: "#0f172a",
  backgroundColor: "#ffffff",
  textColor: "#0f172a",
  accentColor: "#2563eb",
  baseFontSize: 14,
  pagePadding: 48,
  lineHeight: 1.45,
  sectionSpacing: 1,
  paperSize: "letter" as const,
};

/** Hash-color sanitizer used by docx-export. */
export function hexColor(input: string | undefined, fallback = "0F172A"): string {
  if (!input) return fallback;
  let v = input.replace(/^#/, "");
  if (v.length === 3) v = v.split("").map((c) => c + c).join("");
  return /^[0-9a-fA-F]{6}$/.test(v) ? v.toUpperCase() : fallback;
}

/** Default file-stem from the resume's full name. */
export function fileStem(data: ResumeJson): string {
  return (data.personal?.fullName || "resume").replace(/\s+/g, "_");
}

/** Fetch the canonical resume JSON shipped at /public/resumes/. */
export async function fetchResumeJson(url: string): Promise<ResumeJson> {
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to load resume JSON (HTTP ${res.status})`);
  return (await res.json()) as ResumeJson;
}

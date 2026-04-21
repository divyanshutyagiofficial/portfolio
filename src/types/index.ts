export type ProjectSource = "linkedin" | "github" | "personal";

export type ProjectDomain =
  | "Web3"
  | "FinTech"
  | "Healthcare"
  | "E-commerce"
  | "Enterprise"
  | "DevTool"
  | "Other";

export interface Project {
  id: string;
  title: string;
  source: ProjectSource;
  description: string;
  /** Stack chips (max ~6 displayed) */
  stack: string[];
  domains: ProjectDomain[];
  /** Live URL */
  url?: string;
  /** GitHub repo URL (when applicable) */
  repo?: string;
  /** Year shipped (display only) */
  year?: number | string;
  /** Stars / forks for GitHub-sourced projects */
  stars?: number;
  forks?: number;
  /** Whether this project is open source */
  openSource?: boolean;
}

export interface SkillCategory {
  name: string;
  skills: string[];
}

export interface Resume {
  id: string;
  name: string;
  variant: "polyglot" | "javascript" | "java" | "dotnet";
  description: string;
  highlight: string;
  json: string;
  pdf?: string;
}

/** GitHub contributions API response shape */
export interface ContributionsResponse {
  total: Record<string, number>;
  contributions: Array<{
    date: string;
    count: number;
    level: 0 | 1 | 2 | 3 | 4;
  }>;
}

export interface GithubRepo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  fork: boolean;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
  pushed_at: string;
  homepage: string | null;
}

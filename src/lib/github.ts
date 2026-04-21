import type { GithubRepo, ContributionsResponse, Project } from "@/types";

/**
 * Public GitHub REST API. No auth required, but unauthenticated calls
 * are rate-limited to 60/hr per IP. We cache aggressively in
 * sessionStorage to stay well under that.
 */
const GH_BASE = "https://api.github.com";

/**
 * Third-party serverless endpoint that returns the same contributions
 * data the github.com profile graph uses. No GitHub auth required.
 *
 * Provided by https://github-contributions-api.jogruber.de
 * (open-source: https://github.com/grubersjoe/github-contributions-api)
 */
const CONTRIB_API = "https://github-contributions-api.jogruber.de/v4";

const CACHE_TTL_MS = 1000 * 60 * 60 * 6; // 6 hours

interface CacheEntry<T> {
  ts: number;
  data: T;
}

function readCache<T>(key: string): T | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(key);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CacheEntry<T>;
    if (Date.now() - parsed.ts > CACHE_TTL_MS) return null;
    return parsed.data;
  } catch {
    return null;
  }
}

function writeCache<T>(key: string, data: T) {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(
      key,
      JSON.stringify({ ts: Date.now(), data } satisfies CacheEntry<T>),
    );
  } catch {
    // session storage full / disabled — silently skip caching.
  }
}

function explainGithubStatus(status: number, username: string): string {
  if (status === 404) {
    return `GitHub user "${username}" not found. Update profile.githubUsername.`;
  }
  if (status === 403) {
    return "GitHub API rate-limit hit (60 req/hr per IP, unauthenticated). Try again in a bit.";
  }
  return `GitHub request failed (HTTP ${status}).`;
}

export async function fetchRepos(username: string): Promise<GithubRepo[]> {
  const key = `gh:repos:${username}`;
  const cached = readCache<GithubRepo[]>(key);
  if (cached) return cached;

  const res = await fetch(
    `${GH_BASE}/users/${username}/repos?per_page=100&sort=pushed`,
    { headers: { Accept: "application/vnd.github+json" } },
  );
  if (!res.ok) throw new Error(explainGithubStatus(res.status, username));
  const data = (await res.json()) as GithubRepo[];
  writeCache(key, data);
  return data;
}

export async function fetchContributions(
  username: string,
): Promise<ContributionsResponse> {
  const key = `gh:contributions:${username}`;
  const cached = readCache<ContributionsResponse>(key);
  if (cached) return cached;

  const res = await fetch(`${CONTRIB_API}/${username}?y=last`);
  if (!res.ok) {
    throw new Error(
      res.status === 404
        ? `Contributions for "${username}" not found.`
        : `Contributions fetch failed (HTTP ${res.status}).`,
    );
  }
  const data = (await res.json()) as ContributionsResponse;
  writeCache(key, data);
  return data;
}

/** Clear all cached GitHub data — call when the user hits "Retry". */
export function clearGithubCache() {
  if (typeof window === "undefined") return;
  try {
    const keys: string[] = [];
    for (let i = 0; i < window.sessionStorage.length; i += 1) {
      const k = window.sessionStorage.key(i);
      if (k && k.startsWith("gh:")) keys.push(k);
    }
    keys.forEach((k) => window.sessionStorage.removeItem(k));
  } catch {
    // ignore
  }
}

const STACK_HINTS: Record<string, string[]> = {
  TypeScript: ["TypeScript"],
  JavaScript: ["JavaScript"],
  Python: ["Python"],
  Java: ["Java"],
  "C#": ["C#"],
  Go: ["Go"],
  Rust: ["Rust"],
  Solidity: ["Solidity"],
  HTML: ["HTML"],
  CSS: ["CSS"],
};

/** Convert a GitHub repo into our Project shape for the unified projects grid. */
export function repoToProject(repo: GithubRepo): Project {
  const langStack = repo.language ? STACK_HINTS[repo.language] ?? [repo.language] : [];
  const topicStack = (repo.topics ?? []).slice(0, 5);
  const stack = Array.from(new Set([...langStack, ...topicStack]));

  return {
    id: `gh-${repo.id}`,
    title: repo.name,
    source: "github",
    description:
      repo.description?.trim() ||
      "Open-source repository. Click through for the README + commits.",
    stack: stack.length ? stack : ["Code"],
    domains: ["DevTool"],
    url: repo.homepage || undefined,
    repo: repo.html_url,
    year: new Date(repo.pushed_at).getFullYear(),
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    openSource: true,
  };
}

/** Sort: most recently pushed first, then by stars. */
export function sortRepos(repos: GithubRepo[]): GithubRepo[] {
  return [...repos]
    .filter((r) => !r.fork)
    .sort((a, b) => {
      const t = +new Date(b.pushed_at) - +new Date(a.pushed_at);
      if (t !== 0) return t;
      return b.stargazers_count - a.stargazers_count;
    });
}

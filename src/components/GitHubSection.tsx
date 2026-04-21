"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ExternalLink,
  Github,
  Loader2,
  Star,
  GitFork,
  Flame,
  RefreshCw,
} from "lucide-react";
import { TerminalWindow } from "./TerminalWindow";
import { SectionHeader } from "./SectionHeader";
import { profile } from "@/data/profile";
import {
  clearGithubCache,
  fetchContributions,
  fetchRepos,
  sortRepos,
} from "@/lib/github";
import type { ContributionsResponse, GithubRepo } from "@/types";

const LEVEL_COLORS = [
  "bg-(--color-surface-3)",
  "bg-emerald-900",
  "bg-emerald-700",
  "bg-emerald-500",
  "bg-emerald-300",
];

export function GitHubSection() {
  const [contribs, setContribs] = useState<ContributionsResponse | null>(null);
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [c, r] = await Promise.all([
        fetchContributions(profile.githubUsername),
        fetchRepos(profile.githubUsername),
      ]);
      setContribs(c);
      setRepos(sortRepos(r).slice(0, 6));
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  const retry = useCallback(() => {
    clearGithubCache();
    load();
  }, [load]);

  useEffect(() => {
    load();
  }, [load]);

  const stats = useMemo(() => {
    if (!contribs) {
      return {
        total: 0,
        currentStreak: 0,
        longestStreak: 0,
        bestDay: { date: "", count: 0 },
        languages: [] as { name: string; count: number }[],
      };
    }
    const days = contribs.contributions;
    const total = days.reduce((sum, d) => sum + d.count, 0);

    let cur = 0;
    let longest = 0;
    let active = 0;
    for (let i = days.length - 1; i >= 0; i -= 1) {
      if (days[i].count > 0) {
        active += 1;
        if (i === days.length - 1 || days[i + 1].count > 0) {
          cur = active;
        }
        longest = Math.max(longest, active);
      } else {
        active = 0;
      }
    }

    const bestDay = days.reduce(
      (best, d) => (d.count > best.count ? d : best),
      { date: "", count: 0 },
    );

    const langs = new Map<string, number>();
    for (const r of repos) {
      if (!r.language || r.fork) continue;
      langs.set(r.language, (langs.get(r.language) ?? 0) + 1);
    }
    const languages = Array.from(langs.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 6);

    return { total, currentStreak: cur, longestStreak: longest, bestDay, languages };
  }, [contribs, repos]);

  const weeks = useMemo(() => groupByWeek(contribs?.contributions ?? []), [contribs]);

  return (
    <section className="mt-20">
      <SectionHeader
        id="github"
        title="GitHub activity"
        command={`gh api /users/${profile.githubUsername} | jq .contributions`}
        comment="Live contributions graph, streaks and top languages — pulled fresh from GitHub when this page loads."
      />

      <TerminalWindow
        path={`github/${profile.githubUsername}.log`}
        hint="last 12 months"
      >
        {loading && (
          <div className="flex items-center gap-2 text-(--color-fg-muted) text-xs font-mono">
            <Loader2 size={14} className="animate-spin" />
            fetching contribution data…
          </div>
        )}

        {error && !loading && (
          <div className="p-3 rounded-md border border-(--color-string)/30 bg-(--color-string)/10">
            <div className="flex items-start gap-2">
              <span className="text-(--color-string) font-mono text-xs shrink-0">
                !
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-(--color-string) text-xs font-mono break-words">
                  {error}
                </p>
                <p className="mt-1 text-(--color-fg-muted) text-xs font-sans">
                  GitHub&apos;s public API is unauthenticated and rate-limited.
                  This usually clears up in a minute.
                </p>
              </div>
              <button
                onClick={retry}
                className="shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 rounded border border-(--color-border-2) text-xs font-sans text-(--color-fg-dim) hover:text-(--color-link) hover:border-(--color-link) transition-colors"
                aria-label="Retry GitHub fetch"
              >
                <RefreshCw size={12} />
                Retry
              </button>
            </div>
            <a
              href={`https://github.com/${profile.githubUsername}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-1.5 text-xs font-sans text-(--color-link) hover:underline"
            >
              <Github size={12} />
              View profile on github.com instead
              <ExternalLink size={10} />
            </a>
          </div>
        )}

        {!loading && !error && contribs && (
          <div className="space-y-7">
            {/* Stat tiles */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <StatTile
                label="contributions"
                value={stats.total.toLocaleString()}
                hint="last 12 mo"
                accent="text-(--color-prompt)"
              />
              <StatTile
                label="current_streak"
                value={`${stats.currentStreak}d`}
                hint={stats.currentStreak > 0 ? "active" : "—"}
                accent="text-(--color-warn)"
                icon={<Flame size={12} />}
              />
              <StatTile
                label="longest_streak"
                value={`${stats.longestStreak}d`}
                hint="best run"
                accent="text-(--color-link)"
              />
              <StatTile
                label="best_day"
                value={`${stats.bestDay.count}`}
                hint={stats.bestDay.date ? formatDate(stats.bestDay.date) : "—"}
                accent="text-(--color-keyword)"
              />
            </div>

            {/* Heatmap */}
            <div>
              <div className="overflow-x-auto pb-2">
                <div className="inline-flex flex-col gap-1 min-w-max">
                  <DayHeader />
                  <div className="flex gap-1">
                    {weeks.map((week, wi) => (
                      <div key={wi} className="flex flex-col gap-1">
                        {week.map((day, di) => (
                          <motion.div
                            key={`${wi}-${di}`}
                            initial={{ opacity: 0, scale: 0.7 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{
                              duration: 0.18,
                              delay: Math.min(wi * 0.005, 0.25),
                            }}
                            className={`w-2.5 h-2.5 rounded-[2px] ${day ? LEVEL_COLORS[day.level] : "bg-transparent"} hover:ring-1 hover:ring-(--color-link) cursor-pointer`}
                            title={
                              day
                                ? `${day.count} contributions on ${formatDate(day.date)}`
                                : ""
                            }
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between gap-2 mt-3 text-[10px] font-mono text-(--color-fg-muted)">
                <span className="hidden sm:inline">
                  {weeks.length} weeks · {contribs.contributions.length} days
                </span>
                <div className="flex items-center gap-1.5 ml-auto">
                  <span>less</span>
                  {LEVEL_COLORS.map((c, i) => (
                    <span key={i} className={`w-2.5 h-2.5 rounded-[2px] ${c}`} />
                  ))}
                  <span>more</span>
                </div>
              </div>
            </div>

            {/* Top languages */}
            {stats.languages.length > 0 && (
              <div>
                <h4 className="text-xs font-mono text-(--color-fg-muted) mb-2">
                  # top_languages.json
                </h4>
                <div className="space-y-1.5">
                  {stats.languages.map((lang) => {
                    const max = stats.languages[0].count;
                    const pct = (lang.count / max) * 100;
                    return (
                      <div key={lang.name} className="flex items-center gap-3 text-xs font-mono">
                        <span className="w-24 truncate text-(--color-fg-dim) shrink-0">
                          {lang.name}
                        </span>
                        <div className="flex-1 h-1.5 rounded-full bg-(--color-surface-3) overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${pct}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, ease: "easeOut" }}
                            className="h-full bg-gradient-to-r from-(--color-link) to-(--color-keyword)"
                          />
                        </div>
                        <span className="text-(--color-fg-muted) w-10 text-right">
                          {lang.count}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Pinned-ish repos */}
            {repos.length > 0 && (
              <div>
                <h4 className="text-xs font-mono text-(--color-fg-muted) mb-2">
                  # recent_repos/
                </h4>
                <div className="grid sm:grid-cols-2 gap-2">
                  {repos.map((r) => (
                    <a
                      key={r.id}
                      href={r.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-3 rounded-md border border-(--color-border-2) bg-(--color-surface-2) hover:border-(--color-link)/50 transition-colors group"
                    >
                      <div className="flex items-center gap-2">
                        <Github
                          size={12}
                          className="text-(--color-fg-muted) group-hover:text-(--color-link)"
                        />
                        <span className="font-mono text-sm text-(--color-fg) group-hover:text-(--color-link) truncate">
                          {r.name}
                        </span>
                        <ExternalLink
                          size={10}
                          className="ml-auto text-(--color-fg-muted) opacity-0 group-hover:opacity-100"
                        />
                      </div>
                      {r.description && (
                        <p className="mt-1 text-xs text-(--color-fg-dim) line-clamp-2">
                          {r.description}
                        </p>
                      )}
                      <div className="mt-2 flex items-center gap-3 text-[10px] font-mono text-(--color-fg-muted)">
                        {r.language && (
                          <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-(--color-link)" />
                            {r.language}
                          </span>
                        )}
                        {r.stargazers_count > 0 && (
                          <span className="flex items-center gap-1">
                            <Star size={10} />
                            {r.stargazers_count}
                          </span>
                        )}
                        {r.forks_count > 0 && (
                          <span className="flex items-center gap-1">
                            <GitFork size={10} />
                            {r.forks_count}
                          </span>
                        )}
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}

            <a
              href={`https://github.com/${profile.githubUsername}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-mono text-(--color-link) hover:underline"
            >
              <Github size={12} />
              View full profile on github.com
              <ExternalLink size={10} />
            </a>
          </div>
        )}
      </TerminalWindow>
    </section>
  );
}

function DayHeader() {
  return (
    <div className="flex gap-1 mb-1 text-[9px] font-mono text-(--color-fg-muted)">
      {/* Just empty padding so the heatmap aligns; we keep this minimal. */}
    </div>
  );
}

function StatTile({
  label,
  value,
  hint,
  accent,
  icon,
}: {
  label: string;
  value: string;
  hint?: string;
  accent: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="rounded-md border border-(--color-border-2) bg-(--color-surface-2) p-3">
      <div className="text-[10px] font-mono text-(--color-fg-muted) flex items-center gap-1">
        {icon}
        {label}
      </div>
      <div className={`text-xl font-mono font-bold ${accent}`}>{value}</div>
      {hint && (
        <div className="text-[10px] font-mono text-(--color-fg-muted) mt-0.5">
          {hint}
        </div>
      )}
    </div>
  );
}

function groupByWeek(
  days: ContributionsResponse["contributions"],
): Array<Array<ContributionsResponse["contributions"][number] | null>> {
  if (!days.length) return [];
  // The contributions API returns days in chronological order. Each week
  // column on github.com starts on Sunday. We'll align by JS getDay().
  const weeks: Array<Array<ContributionsResponse["contributions"][number] | null>> =
    [];
  let week: Array<ContributionsResponse["contributions"][number] | null> =
    new Array(7).fill(null);

  for (const day of days) {
    const dow = new Date(day.date).getDay();
    week[dow] = day;
    if (dow === 6) {
      weeks.push(week);
      week = new Array(7).fill(null);
    }
  }
  if (week.some((d) => d !== null)) weeks.push(week);
  return weeks;
}

function formatDate(iso: string) {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

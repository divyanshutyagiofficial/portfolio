"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  Github,
  Linkedin,
  Lock,
  Search,
  Star,
  GitFork,
  Loader2,
  RefreshCw,
} from "lucide-react";
import { TerminalWindow } from "./TerminalWindow";
import { SectionHeader } from "./SectionHeader";
import { personalProjects } from "@/data/projects-personal";
import { linkedinProjects } from "@/data/projects-linkedin";
import { profile } from "@/data/profile";
import {
  fetchRepos,
  repoToProject,
  sortRepos,
} from "@/lib/github";
import { shortHash } from "@/lib/format";
import type { Project, ProjectSource } from "@/types";

type SourceFilter = "all" | ProjectSource;

const SOURCE_META: Record<
  ProjectSource,
  { label: string; icon: React.ElementType; tone: string }
> = {
  personal: { label: "personal", icon: Lock, tone: "text-(--color-warn)" },
  linkedin: { label: "linkedin", icon: Linkedin, tone: "text-(--color-link)" },
  github: { label: "github", icon: Github, tone: "text-(--color-prompt)" },
};

const FILTER_LABELS: Record<SourceFilter, string> = {
  all: "All",
  personal: "Client work",
  linkedin: "LinkedIn",
  github: "GitHub",
};

export function ProjectsSection() {
  const [source, setSource] = useState<SourceFilter>("all");
  const [query, setQuery] = useState("");
  const [ghProjects, setGhProjects] = useState<Project[]>([]);
  const [ghLoading, setGhLoading] = useState(true);
  const [ghError, setGhError] = useState<string | null>(null);

  const loadGithub = async () => {
    setGhLoading(true);
    setGhError(null);
    try {
      const repos = await fetchRepos(profile.githubUsername);
      const projects = sortRepos(repos).slice(0, 12).map(repoToProject);
      setGhProjects(projects);
    } catch (err) {
      setGhError(
        (err as Error).message ||
          "Couldn't reach GitHub right now. Try again in a minute.",
      );
    } finally {
      setGhLoading(false);
    }
  };

  useEffect(() => {
    loadGithub();
  }, []);

  const all: Project[] = useMemo(
    () => [...linkedinProjects, ...personalProjects, ...ghProjects],
    [ghProjects],
  );

  const filtered = useMemo(() => {
    let list = all;
    if (source !== "all") list = list.filter((p) => p.source === source);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.stack.some((s) => s.toLowerCase().includes(q)) ||
          p.domains.some((d) => d.toLowerCase().includes(q)),
      );
    }
    return list;
  }, [all, source, query]);

  const counts = useMemo(
    () => ({
      all: all.length,
      personal: personalProjects.length,
      linkedin: linkedinProjects.length,
      github: ghProjects.length,
    }),
    [all.length, ghProjects.length],
  );

  return (
    <section className="mt-20">
      <SectionHeader
        id="projects"
        title="Projects I've built"
        command={`git log --all --oneline ~/projects/`}
        comment={`Live merge: ${counts.personal} hardcoded · ${counts.linkedin} from LinkedIn · ${ghLoading ? "loading…" : `${counts.github} live from GitHub`}. Use the filters or search to drill in.`}
      />

      <TerminalWindow
        path="projects/"
        hint={`${filtered.length}/${counts.all} matches`}
      >
        <div className="space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="flex flex-wrap gap-1.5">
              {(["all", "personal", "linkedin", "github"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setSource(s)}
                  className={`px-2.5 py-1 rounded-md text-xs border transition-colors flex items-center gap-1.5 ${
                    source === s
                      ? "border-(--color-link) bg-(--color-link)/10 text-(--color-link)"
                      : "border-(--color-border-2) text-(--color-fg-dim) hover:text-(--color-fg) hover:border-(--color-fg-muted)"
                  }`}
                  title={`--source=${s}`}
                >
                  <span className="font-sans">{FILTER_LABELS[s]}</span>
                  <span className="text-(--color-fg-muted) font-mono">
                    ({s === "all" ? counts.all : counts[s]})
                  </span>
                </button>
              ))}
              {source === "github" && (
                <button
                  onClick={loadGithub}
                  disabled={ghLoading}
                  className="px-2 py-1 rounded-md text-xs font-mono border border-(--color-border-2) text-(--color-fg-dim) hover:text-(--color-link) disabled:opacity-50 flex items-center gap-1"
                  aria-label="Refresh GitHub repos"
                >
                  <RefreshCw size={12} className={ghLoading ? "animate-spin" : ""} />
                </button>
              )}
            </div>
            <div className="sm:ml-auto relative w-full sm:w-72">
              <Search
                size={14}
                className="absolute left-2.5 top-1/2 -translate-y-1/2 text-(--color-fg-muted)"
              />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name, tech or industry…"
                className="w-full pl-8 pr-3 py-1.5 bg-(--color-surface-2) border border-(--color-border-2) rounded-md text-xs outline-none focus:border-(--color-link) placeholder:text-(--color-fg-muted)"
              />
            </div>
          </div>

          {source === "github" && ghError && (
            <div className="p-3 rounded-md border border-(--color-string)/30 bg-(--color-string)/10 text-(--color-string) text-xs font-mono">
              ! {ghError}
            </div>
          )}

          {source === "github" && ghLoading && (
            <div className="flex items-center gap-2 text-(--color-fg-muted) text-xs font-mono">
              <Loader2 size={12} className="animate-spin" />
              fetching repos from github.com/{profile.githubUsername}…
            </div>
          )}

          <div className="overflow-x-auto -mx-2">
            <ul className="min-w-full font-mono text-xs sm:text-sm divide-y divide-(--color-border)/60">
              <AnimatePresence initial={false} mode="popLayout">
                {filtered.map((p, i) => (
                  <ProjectRow key={p.id} project={p} index={i} />
                ))}
              </AnimatePresence>
              {filtered.length === 0 && !ghLoading && (
                <li className="py-6 px-2 text-center text-(--color-fg-muted) font-sans">
                  No projects matched. Try clearing the filters or the search box.
                </li>
              )}
            </ul>
          </div>
        </div>
      </TerminalWindow>
    </section>
  );
}

function ProjectRow({ project, index }: { project: Project; index: number }) {
  const meta = SOURCE_META[project.source];
  const Icon = meta.icon;
  const hash = shortHash(project.id);
  const link = project.url || project.repo;

  return (
    <motion.li
      layout
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 8 }}
      transition={{ duration: 0.22, delay: Math.min(index * 0.015, 0.2) }}
      className="px-2 py-3 hover:bg-(--color-surface-2) rounded-md transition-colors group"
    >
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className="text-(--color-warn) shrink-0">{hash}</span>
        <span className={`shrink-0 inline-flex items-center gap-1 ${meta.tone}`}>
          <Icon size={11} />
          {meta.label}
        </span>
        {project.year && (
          <span className="text-(--color-fg-muted) shrink-0">
            ({project.year})
          </span>
        )}
        <span className="text-(--color-fg) font-bold flex-1 min-w-0">
          {link ? (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-(--color-link) inline-flex items-center gap-1.5 group-hover:underline underline-offset-4"
            >
              {project.title}
              <ExternalLink
                size={11}
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              />
            </a>
          ) : (
            project.title
          )}
        </span>
        {project.source === "github" && (
          <span className="flex items-center gap-3 text-(--color-fg-muted) shrink-0">
            {typeof project.stars === "number" && (
              <span className="flex items-center gap-1">
                <Star size={11} />
                {project.stars}
              </span>
            )}
            {typeof project.forks === "number" && project.forks > 0 && (
              <span className="flex items-center gap-1">
                <GitFork size={11} />
                {project.forks}
              </span>
            )}
          </span>
        )}
      </div>
      <p className="mt-1 pl-[5.5rem] text-(--color-fg-dim) leading-relaxed font-sans">
        {project.description}
      </p>
      <div className="mt-1.5 pl-[5.5rem] flex flex-wrap gap-1.5">
        {project.stack.slice(0, 6).map((s) => (
          <span
            key={s}
            className="px-1.5 py-0.5 text-[10px] rounded bg-(--color-surface) border border-(--color-border) text-(--color-fg-dim)"
          >
            {s}
          </span>
        ))}
        {project.repo && project.url && (
          <a
            href={project.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="px-1.5 py-0.5 text-[10px] rounded border border-(--color-border-2) text-(--color-fg-muted) hover:text-(--color-link) hover:border-(--color-link) inline-flex items-center gap-1"
          >
            <Github size={10} />
            repo
          </a>
        )}
      </div>
    </motion.li>
  );
}

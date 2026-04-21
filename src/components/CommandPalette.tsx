"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Briefcase,
  Code2,
  Download,
  Github,
  Home,
  Linkedin,
  Mail,
  Search,
  User,
  FileText,
  Building2,
} from "lucide-react";
import { profile } from "@/data/profile";

interface Command {
  id: string;
  label: string;
  hint?: string;
  icon: React.ElementType;
  group: "Navigate" | "External" | "Action";
  perform: () => void;
}

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CommandPalette({ open, onOpenChange }: Props) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const commands: Command[] = useMemo(() => {
    const scrollTo = (id: string) => () => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      onOpenChange(false);
    };
    const open = (url: string) => () => {
      window.open(url, "_blank", "noopener,noreferrer");
      onOpenChange(false);
    };
    const goto = (url: string) => () => {
      window.location.href = url;
      onOpenChange(false);
    };
    return [
      { id: "home", label: "Go to home", group: "Navigate", icon: Home, perform: scrollTo("hero") },
      { id: "about", label: "Go to about", group: "Navigate", icon: User, perform: scrollTo("about") },
      { id: "skills", label: "Go to skills", group: "Navigate", icon: Code2, perform: scrollTo("skills") },
      { id: "domains", label: "Go to industries", hint: "Fintech, Healthcare, Web3, …", group: "Navigate", icon: Building2, perform: scrollTo("domains") },
      { id: "projects", label: "Go to projects", group: "Navigate", icon: Briefcase, perform: scrollTo("projects") },
      { id: "github", label: "Go to GitHub activity", group: "Navigate", icon: Github, perform: scrollTo("github") },
      { id: "resume", label: "Go to resume downloads", group: "Navigate", icon: FileText, perform: scrollTo("resume") },
      { id: "contact", label: "Go to contact", group: "Navigate", icon: Mail, perform: scrollTo("contact") },
      { id: "resume-page", label: "Open resume viewer", hint: "/resume", group: "Action", icon: FileText, perform: goto("/resume/") },
      { id: "dl-resume-pdf", label: "Download resume (PDF)", hint: "Direct download — no print dialog", group: "Action", icon: Download, perform: goto("/resume/?download=pdf") },
      { id: "dl-resume-docx", label: "Download resume (Word .docx)", hint: "Editable in MS Word / Google Docs", group: "Action", icon: FileText, perform: goto("/resume/?download=docx") },
      { id: "dl-resume-json", label: "Download resume (JSON)", hint: "Raw source data", group: "Action", icon: Download, perform: open("/resumes/divyanshu-tyagi-resume.json") },
      { id: "gh", label: "Open GitHub profile", hint: profile.links.github, group: "External", icon: Github, perform: open(profile.links.github) },
      { id: "li", label: "Open LinkedIn profile", hint: profile.links.linkedin, group: "External", icon: Linkedin, perform: open(profile.links.linkedin) },
      { id: "email", label: `Email ${profile.email}`, group: "External", icon: Mail, perform: open(`mailto:${profile.email}`) },
    ];
  }, [onOpenChange]);

  const filtered = useMemo(() => {
    if (!query.trim()) return commands;
    const q = query.toLowerCase();
    return commands.filter(
      (c) =>
        c.label.toLowerCase().includes(q) ||
        c.hint?.toLowerCase().includes(q) ||
        c.group.toLowerCase().includes(q),
    );
  }, [commands, query]);

  useEffect(() => {
    setActive(0);
  }, [query, open]);

  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(t);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onOpenChange(false);
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setActive((a) => Math.min(filtered.length - 1, a + 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActive((a) => Math.max(0, a - 1));
      } else if (e.key === "Enter") {
        e.preventDefault();
        filtered[active]?.perform();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, filtered, active, onOpenChange]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-50 flex items-start justify-center pt-[12vh] px-4 bg-black/60 backdrop-blur-sm"
          onClick={() => onOpenChange(false)}
        >
          <motion.div
            initial={{ scale: 0.96, y: -8, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.96, y: -8, opacity: 0 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl term-window"
            role="dialog"
            aria-label="Command palette"
          >
            <div className="flex items-center gap-3 px-4 py-3 border-b border-(--color-border)">
              <Search size={16} className="text-(--color-fg-muted)" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search sections, download a resume, jump anywhere…"
                className="flex-1 bg-transparent text-sm font-mono outline-none placeholder:text-(--color-fg-muted)"
              />
              <kbd className="hidden sm:inline text-[10px] px-1.5 py-0.5 rounded border border-(--color-border-2) text-(--color-fg-muted)">
                ESC
              </kbd>
            </div>
            <ul
              role="listbox"
              className="max-h-[55vh] overflow-y-auto py-1 font-mono text-sm"
            >
              {filtered.length === 0 && (
                <li className="px-4 py-6 text-center text-(--color-fg-muted)">
                  No commands match "{query}"
                </li>
              )}
              {filtered.map((c, i) => (
                <li
                  key={c.id}
                  role="option"
                  aria-selected={i === active}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => c.perform()}
                  className={`px-4 py-2 flex items-center gap-3 cursor-pointer transition-colors ${
                    i === active
                      ? "bg-(--color-surface-3) text-(--color-fg)"
                      : "text-(--color-fg-dim) hover:bg-(--color-surface-2)"
                  }`}
                >
                  <c.icon
                    size={14}
                    className={
                      i === active
                        ? "text-(--color-link)"
                        : "text-(--color-fg-muted)"
                    }
                  />
                  <span className="flex-1 truncate">{c.label}</span>
                  {c.hint && (
                    <span className="hidden sm:inline text-xs text-(--color-fg-muted) truncate max-w-[40%]">
                      {c.hint}
                    </span>
                  )}
                  <span className="text-[10px] uppercase tracking-wider text-(--color-fg-muted)">
                    {c.group}
                  </span>
                </li>
              ))}
            </ul>
            <div className="flex items-center justify-between px-4 py-2 border-t border-(--color-border) text-[11px] text-(--color-fg-muted)">
              <span>
                <kbd className="px-1 border border-(--color-border-2) rounded">↑</kbd>{" "}
                <kbd className="px-1 border border-(--color-border-2) rounded">↓</kbd>{" "}
                navigate
              </span>
              <span>
                <kbd className="px-1 border border-(--color-border-2) rounded">↵</kbd>{" "}
                select
              </span>
              <span>{filtered.length} commands</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Download, Command } from "lucide-react";
import { profile } from "@/data/profile";
import { TerminalWindow } from "./TerminalWindow";
import { Prompt } from "./Prompt";

const TYPED = [
  `whoami`,
  `cat ~/about.md`,
  `ls -la ~/skills/`,
  `git log --oneline ~/projects/ | head -5`,
  `gh repo list dvynshu95 --limit 10`,
];

interface Props {
  onOpenPalette: () => void;
}

export function HeroTerminal({ onOpenPalette }: Props) {
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [typed, setTyped] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const phrase = TYPED[phraseIdx];
    let timer: ReturnType<typeof setTimeout>;

    if (!deleting && typed === phrase) {
      timer = setTimeout(() => setDeleting(true), 1600);
    } else if (deleting && typed === "") {
      setDeleting(false);
      setPhraseIdx((i) => (i + 1) % TYPED.length);
    } else {
      timer = setTimeout(
        () => {
          setTyped((t) =>
            deleting ? t.slice(0, -1) : phrase.slice(0, t.length + 1),
          );
        },
        deleting ? 28 : 60,
      );
    }
    return () => clearTimeout(timer);
  }, [typed, deleting, phraseIdx]);

  const years = new Date().getFullYear() - profile.yearsStartedAt;

  return (
    <section id="hero" className="pt-12 sm:pt-16 lg:pt-20">
      <TerminalWindow path="portfolio/whoami.tsx" hint="branch: main · live">
        <div className="space-y-6">
          <Prompt command={typed} caret />

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-4"
          >
            <p className="text-(--color-fg-muted) font-mono text-sm">
              # output
            </p>

            <div className="space-y-1">
              <p className="text-(--color-fg-muted) font-mono text-xs">
                <span className="text-(--color-keyword)">const</span>{" "}
                <span className="text-(--color-link)">me</span>{" "}
                <span className="text-(--color-fg-muted)">=</span>{" "}
                <span className="text-(--color-string)">"…"</span>
              </p>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-sans font-bold tracking-tight text-(--color-fg)">
                Hi, I&apos;m{" "}
                <span className="text-(--color-link)">{profile.name}</span>
                <span className="text-(--color-prompt) animate-caret-blink">
                  .
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-(--color-fg) font-sans max-w-3xl leading-snug pt-1">
                {profile.title}
              </p>
            </div>

            <p className="text-base sm:text-lg text-(--color-fg-dim) font-sans max-w-3xl leading-relaxed">
              {profile.tagline}
            </p>

            <div className="flex flex-wrap gap-2 pt-1">
              <Stat label="Years shipping" value={`${years}+`} />
              <Stat label="Projects delivered" value="20+" />
              <Stat label="Industries" value="FinTech · Healthcare · Web3" />
              <Stat label="Based in" value={profile.location} />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="flex flex-wrap items-center gap-3 pt-2"
          >
            <a
              href="#resume"
              className="btn-press inline-flex items-center gap-2 px-4 py-2 rounded-md bg-(--color-prompt) text-(--color-bg) font-sans text-sm font-bold hover:brightness-110 hover:-translate-y-0.5"
              title="./download_resume.sh"
            >
              <Download size={14} />
              Download resume
            </a>
            <a
              href="#projects"
              className="btn-press inline-flex items-center gap-2 px-4 py-2 rounded-md border border-(--color-border-2) hover:border-(--color-link) text-(--color-fg) font-sans text-sm hover:text-(--color-link)"
              title="cd ~/projects"
            >
              See my work
            </a>
            <a
              href="#domains"
              className="btn-press inline-flex items-center gap-2 px-4 py-2 rounded-md border border-(--color-border-2) hover:border-(--color-warn) text-(--color-fg-dim) font-sans text-sm hover:text-(--color-warn)"
              title="ls ~/industries/"
            >
              Industries I cover
            </a>
            <button
              onClick={onOpenPalette}
              className="btn-press inline-flex items-center gap-2 px-3 py-2 rounded-md border border-(--color-border-2) hover:border-(--color-fg) text-(--color-fg-dim) font-sans text-sm hover:text-(--color-fg)"
              title="Open command palette (⌘K)"
            >
              <Command size={14} />
              <span className="hidden sm:inline">Search</span>
              <kbd className="text-[10px] px-1 border border-(--color-border-2) rounded font-mono">
                ⌘K
              </kbd>
            </button>

            <div className="ml-auto flex items-center gap-1">
              <SocialIcon
                href={profile.links.github}
                label="GitHub"
                icon={Github}
              />
              <SocialIcon
                href={profile.links.linkedin}
                label="LinkedIn"
                icon={Linkedin}
              />
              <SocialIcon
                href={`mailto:${profile.email}`}
                label="Email"
                icon={Mail}
              />
            </div>
          </motion.div>
        </div>
      </TerminalWindow>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded border border-(--color-border-2) bg-(--color-surface-2) text-xs">
      <span className="text-(--color-fg-muted) font-sans">{label}:</span>
      <span className="text-(--color-warn) font-mono">{value}</span>
    </span>
  );
}

function SocialIcon({
  href,
  label,
  icon: Icon,
}: {
  href: string;
  label: string;
  icon: React.ElementType;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      target={href.startsWith("mailto:") ? undefined : "_blank"}
      rel="noopener noreferrer"
      className="p-2 rounded-md text-(--color-fg-muted) hover:text-(--color-link) hover:bg-(--color-surface-2) transition-colors"
    >
      <Icon size={18} />
    </a>
  );
}

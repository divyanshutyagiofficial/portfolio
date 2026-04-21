"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Command,
  Github,
  Linkedin,
  Mail,
  Terminal,
  Menu,
  X,
} from "lucide-react";
import { profile } from "@/data/profile";

interface NavItem {
  id: string;
  label: string;
  ext: string;
}

const NAV: NavItem[] = [
  { id: "about", label: "About", ext: ".md" },
  { id: "skills", label: "Skills", ext: "/" },
  { id: "domains", label: "Industries", ext: "/" },
  { id: "projects", label: "Projects", ext: ".tsx" },
  { id: "github", label: "GitHub", ext: ".log" },
  { id: "resume", label: "Resume", ext: ".pdf" },
  { id: "contact", label: "Contact", ext: ".json" },
];

interface Props {
  onOpenPalette: () => void;
}

export function TopNav({ onOpenPalette }: Props) {
  const [active, setActive] = useState("hero");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      let current = "hero";
      for (const n of NAV) {
        const el = document.getElementById(n.id);
        if (el && el.getBoundingClientRect().top < 120) {
          current = n.id;
        }
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-30 transition-colors ${
        scrolled
          ? "bg-(--color-surface)/85 backdrop-blur border-b border-(--color-border)"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto max-w-6xl px-3 sm:px-6 h-12 flex items-center gap-3">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm text-(--color-fg) hover:text-(--color-link) shrink-0"
          aria-label="Home"
        >
          <Terminal size={16} className="text-(--color-prompt)" />
          <span className="hidden sm:inline font-mono">
            <span className="text-(--color-prompt)">~</span>
            <span className="text-(--color-fg-muted)">/</span>
            <span>{profile.handle}</span>
          </span>
        </Link>

        {/* Desktop nav: plain labels, subtle ext accents */}
        <div className="hidden md:flex items-center gap-0.5 ml-3">
          {NAV.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className={`px-2.5 py-1 rounded text-sm transition-colors ${
                active === n.id
                  ? "text-(--color-link) bg-(--color-link)/10"
                  : "text-(--color-fg-dim) hover:text-(--color-fg) hover:bg-(--color-surface-2)"
              }`}
            >
              <span>{n.label}</span>
              <span className="text-(--color-fg-muted) font-mono text-[10px] ml-0.5">
                {n.ext}
              </span>
            </a>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-1">
          {/* Visible search/palette CTA — discoverable, not just ⌘K */}
          <button
            onClick={onOpenPalette}
            className="hidden sm:inline-flex items-center gap-2 pl-2 pr-1.5 py-1 rounded border border-(--color-border-2) text-xs text-(--color-fg-dim) hover:text-(--color-fg) hover:border-(--color-fg-muted) transition-colors"
            aria-label="Search or jump to anywhere"
          >
            <Command size={12} />
            <span className="hidden lg:inline">Search</span>
            <kbd className="text-[10px] px-1 border border-(--color-border-2) rounded font-mono">
              ⌘K
            </kbd>
          </button>
          <a
            href={profile.links.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="p-1.5 rounded text-(--color-fg-muted) hover:text-(--color-fg) transition-colors"
          >
            <Github size={15} />
          </a>
          <a
            href={profile.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="p-1.5 rounded text-(--color-fg-muted) hover:text-(--color-fg) transition-colors"
          >
            <Linkedin size={15} />
          </a>
          <a
            href={`mailto:${profile.email}`}
            aria-label="Email"
            className="p-1.5 rounded text-(--color-fg-muted) hover:text-(--color-fg) transition-colors"
          >
            <Mail size={15} />
          </a>
          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileOpen((o) => !o)}
            className="md:hidden p-1.5 rounded text-(--color-fg-muted) hover:text-(--color-fg)"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden border-t border-(--color-border) bg-(--color-surface)/95 backdrop-blur">
          <div className="mx-auto max-w-6xl px-3 sm:px-6 py-2 grid grid-cols-2 gap-1">
            {NAV.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                onClick={() => setMobileOpen(false)}
                className={`px-3 py-2 rounded text-sm transition-colors ${
                  active === n.id
                    ? "text-(--color-link) bg-(--color-link)/10"
                    : "text-(--color-fg-dim) hover:text-(--color-fg) hover:bg-(--color-surface-2)"
                }`}
              >
                {n.label}
                <span className="text-(--color-fg-muted) font-mono text-[10px] ml-1">
                  {n.ext}
                </span>
              </a>
            ))}
            <button
              onClick={() => {
                setMobileOpen(false);
                onOpenPalette();
              }}
              className="col-span-2 mt-1 px-3 py-2 rounded border border-(--color-border-2) text-sm text-(--color-fg-dim) hover:text-(--color-fg) flex items-center justify-center gap-2"
            >
              <Command size={14} />
              Search · jump anywhere
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

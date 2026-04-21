"use client";

import { useEffect, useState } from "react";
import { BootSequence } from "./BootSequence";
import { TopNav } from "./TopNav";
import { StatusBar } from "./StatusBar";
import { CommandPalette } from "./CommandPalette";
import { HeroTerminal } from "./HeroTerminal";
import { AboutSection } from "./AboutSection";
import { SkillsTerminal } from "./SkillsTerminal";
import { DomainsSection } from "./DomainsSection";
import { ProjectsSection } from "./ProjectsSection";
import { GitHubSection } from "./GitHubSection";
import { ResumeSection } from "./ResumeSection";
import { ContactSection } from "./ContactSection";

export function HomeShell() {
  const [paletteOpen, setPaletteOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <BootSequence />
      <TopNav onOpenPalette={() => setPaletteOpen(true)} />
      <main className="relative z-10 mx-auto max-w-6xl px-3 sm:px-6 pb-32 pt-12">
        <HeroTerminal onOpenPalette={() => setPaletteOpen(true)} />
        <AboutSection />
        <SkillsTerminal />
        <DomainsSection />
        <ProjectsSection />
        <GitHubSection />
        <ResumeSection />
        <ContactSection />

        <footer className="mt-24 pt-6 border-t border-(--color-border) text-center text-[11px] font-mono text-(--color-fg-muted)">
          <p>
            <span className="text-(--color-comment)">{"// "}</span>
            built with{" "}
            <span className="text-(--color-link)">next@15</span>,{" "}
            <span className="text-(--color-keyword)">react@19</span>,{" "}
            <span className="text-(--color-prompt)">tailwind@4</span> &{" "}
            <span className="text-(--color-warn)">framer-motion</span>
          </p>
          <p className="mt-1">
            © {new Date().getFullYear()} divyanshutyagiofficial.com — deployed
            via GitHub Pages
          </p>
        </footer>
      </main>
      <StatusBar onOpenPalette={() => setPaletteOpen(true)} />
      <CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} />
    </>
  );
}

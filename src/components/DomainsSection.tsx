"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import {
  Banknote,
  HeartPulse,
  Blocks,
  Building2,
  ShoppingCart,
  Wrench,
  ArrowRight,
} from "lucide-react";
import { TerminalWindow } from "./TerminalWindow";
import { SectionHeader } from "./SectionHeader";
import { domains, type DomainEntry } from "@/data/domains";
import { personalProjects } from "@/data/projects-personal";
import { linkedinProjects } from "@/data/projects-linkedin";

const ICONS = {
  banknote: Banknote,
  "heart-pulse": HeartPulse,
  blocks: Blocks,
  building2: Building2,
  "shopping-cart": ShoppingCart,
  wrench: Wrench,
} as const;

export function DomainsSection() {
  const allKnownProjects = useMemo(
    () => [...personalProjects, ...linkedinProjects],
    [],
  );

  const counts = useMemo(() => {
    const map = new Map<string, number>();
    for (const d of domains) {
      const n = allKnownProjects.filter((p) =>
        p.domains.some((tag) => d.match.includes(tag)),
      ).length;
      map.set(d.id, n);
    }
    return map;
  }, [allKnownProjects]);

  return (
    <section className="mt-20">
      <SectionHeader
        id="domains"
        title="Industries I've shipped in"
        command="ls ~/industries/"
        comment="The real-world sectors my code has touched — pick the one that matches your project."
      />
      <TerminalWindow path="industries/" hint={`${domains.length} industries`}>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {domains.map((d, i) => (
            <DomainCard
              key={d.id}
              domain={d}
              count={counts.get(d.id) ?? 0}
              index={i}
            />
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-(--color-border) flex flex-wrap items-center gap-3 text-xs">
          <span className="text-(--color-fg-muted) font-mono">
            # see the actual work
          </span>
          <a
            href="#projects"
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded border border-(--color-border-2) text-(--color-fg-dim) hover:text-(--color-link) hover:border-(--color-link) font-mono transition-colors"
          >
            Browse all projects
            <ArrowRight size={12} />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded border border-(--color-border-2) text-(--color-fg-dim) hover:text-(--color-prompt) hover:border-(--color-prompt) font-mono transition-colors"
          >
            Discuss your industry
            <ArrowRight size={12} />
          </a>
        </div>
      </TerminalWindow>
    </section>
  );
}

function DomainCard({
  domain,
  count,
  index,
}: {
  domain: DomainEntry;
  count: number;
  index: number;
}) {
  const Icon = ICONS[domain.icon];

  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      className="group relative rounded-lg border border-(--color-border-2) bg-(--color-surface-2) p-4 hover:border-(--color-link)/50 hover:bg-(--color-surface-3) transition-all"
    >
      <header className="flex items-start gap-3">
        <div
          className={`shrink-0 w-10 h-10 rounded-md border border-(--color-border-2) bg-(--color-surface) flex items-center justify-center ${domain.accent} group-hover:scale-110 transition-transform`}
        >
          <Icon size={18} />
        </div>
        <div className="min-w-0 flex-1">
          <h3
            className={`font-bold text-base leading-tight ${domain.accent} font-sans`}
          >
            {domain.title}
          </h3>
          {count > 0 && (
            <p className="mt-0.5 text-[11px] font-mono text-(--color-fg-muted)">
              {count} project{count === 1 ? "" : "s"} shipped
            </p>
          )}
        </div>
      </header>

      <p className="mt-3 text-sm text-(--color-fg-dim) leading-relaxed font-sans">
        {domain.blurb}
      </p>

      {domain.clients.length > 0 && (
        <div className="mt-3">
          <p className="text-[10px] uppercase tracking-wider text-(--color-fg-muted) font-mono mb-1">
            Clients
          </p>
          <p className="text-xs text-(--color-fg) font-sans">
            {domain.clients.join(" · ")}
          </p>
        </div>
      )}

      {domain.highlights.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1">
          {domain.highlights.map((h) => (
            <span
              key={h}
              className="px-1.5 py-0.5 text-[10px] font-mono rounded border border-(--color-border) bg-(--color-surface) text-(--color-fg-dim)"
            >
              {h}
            </span>
          ))}
        </div>
      )}
    </motion.article>
  );
}

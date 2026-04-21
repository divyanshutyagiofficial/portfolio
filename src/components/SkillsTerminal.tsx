"use client";

import { motion } from "framer-motion";
import { skillCategories } from "@/data/skills";
import { TerminalWindow } from "./TerminalWindow";
import { SectionHeader } from "./SectionHeader";
import { useSpotlight } from "@/lib/use-spotlight";

const ACCENTS = [
  "text-(--color-link)",
  "text-(--color-keyword)",
  "text-(--color-warn)",
  "text-(--color-prompt)",
  "text-(--color-string)",
  "text-(--color-link)",
  "text-(--color-keyword)",
];

export function SkillsTerminal() {
  const { onMouseMove } = useSpotlight();

  return (
    <section className="mt-20">
      <SectionHeader
        id="skills"
        title="Skills & tech stack"
        command="ls -la ~/skills/"
        comment="The tech I've shipped production code with. Not a buzzword list — these are weapons of choice."
      />
      <TerminalWindow path="skills/" hint={`${skillCategories.length} categories`}>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {skillCategories.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.35, delay: i * 0.04 }}
              onMouseMove={onMouseMove}
              className="card-lift group rounded-lg border border-(--color-border-2) bg-(--color-surface-2) p-4 hover:border-(--color-link)/40"
            >
              <header className="flex items-center justify-between mb-3">
                <h3 className={`font-mono text-sm font-bold ${ACCENTS[i % ACCENTS.length]}`}>
                  ./{cat.name}/
                </h3>
                <span className="text-[10px] text-(--color-fg-muted) font-mono">
                  {cat.skills.length} files
                </span>
              </header>
              <ul className="flex flex-wrap gap-1.5">
                {cat.skills.map((skill) => (
                  <li
                    key={skill}
                    className="chip px-2 py-0.5 text-xs font-mono rounded border border-(--color-border) bg-(--color-surface) text-(--color-fg-dim) group-hover:text-(--color-fg)"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </TerminalWindow>
    </section>
  );
}

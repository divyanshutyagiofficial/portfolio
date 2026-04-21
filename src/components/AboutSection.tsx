"use client";

import { motion } from "framer-motion";
import { profile } from "@/data/profile";
import { TerminalWindow } from "./TerminalWindow";
import { SectionHeader } from "./SectionHeader";

export function AboutSection() {
  return (
    <section className="mt-20">
      <SectionHeader
        id="about"
        title="About me"
        command="cat ~/about.md"
        comment="The TL;DR — what I do, who I do it for, how I think."
      />
      <TerminalWindow path="about.md" hint="markdown · 4 lines">
        <article className="space-y-3 max-w-3xl">
          {profile.bio.map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.35, delay: i * 0.06 }}
              className="text-(--color-fg-dim) leading-relaxed font-sans text-base"
            >
              <span className="text-(--color-keyword) mr-2">›</span>
              {line}
            </motion.p>
          ))}
        </article>
      </TerminalWindow>
    </section>
  );
}

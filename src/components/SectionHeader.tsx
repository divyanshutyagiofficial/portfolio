"use client";

import { motion } from "framer-motion";
import { Prompt } from "./Prompt";

interface Props {
  id: string;
  /** Plain-language headline. Shown big & friendly above the prompt. */
  title?: string;
  /** Terminal command shown smaller, under the title (IDE flavour). */
  command: string;
  /** Optional one-liner shown under the command, in the comment colour. */
  comment?: string;
}

export function SectionHeader({ id, title, command, comment }: Props) {
  return (
    <motion.header
      id={id}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="mb-6 scroll-mt-20"
    >
      {title && (
        <h2 className="font-sans text-2xl sm:text-3xl font-bold tracking-tight text-(--color-fg) mb-2 flex items-baseline gap-2">
          <span className="text-(--color-prompt) font-mono text-xl select-none">
            #
          </span>
          {title}
        </h2>
      )}
      <div className={title ? "opacity-80" : ""}>
        <Prompt command={command} />
      </div>
      {comment && (
        <p className="mt-2 text-(--color-fg-dim) text-sm pl-2 border-l-2 border-(--color-border-2) font-sans">
          {comment}
        </p>
      )}
    </motion.header>
  );
}

"use client";

import { motion } from "framer-motion";
import { Download, Eye, FileText, FileCode2 } from "lucide-react";
import { resumes } from "@/data/resumes";
import type { Resume } from "@/types";
import { TerminalWindow } from "./TerminalWindow";
import { SectionHeader } from "./SectionHeader";

export function ResumeSection() {
  return (
    <section className="mt-20">
      <SectionHeader
        id="resume"
        title="Download my resume"
        command="cat ~/resumes/polyglot.json"
        comment="One polyglot resume covering Node.js, .NET, React, Next.js and Angular — view it inline, print to PDF, or grab the JSON."
      />
      <TerminalWindow
        path="resumes/"
        hint={`${resumes.length} variant · always in sync`}
      >
        <div className="grid md:grid-cols-1 gap-3 max-w-2xl mx-auto">
          {resumes.map((r, i) => (
            <ResumeCard key={r.id} resume={r} index={i} />
          ))}
        </div>
        <p className="mt-5 text-xs font-sans text-(--color-fg-muted) text-center">
          <span className="text-(--color-comment) font-mono">{"// "}</span>
          Generated from a single source-of-truth JSON via the sister
          resume-builder app. PDF uses the embedded file when present, otherwise
          falls back to print-to-PDF from the in-app viewer.
        </p>
      </TerminalWindow>
    </section>
  );
}

function ResumeCard({ resume, index }: { resume: Resume; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="rounded-lg border border-(--color-border-2) bg-(--color-surface-2) p-6 flex flex-col hover:border-(--color-prompt)/50 transition-colors"
    >
      <header className="flex items-start gap-4">
        <span className="inline-flex items-center justify-center w-12 h-12 rounded-md border border-(--color-prompt)/40 bg-(--color-prompt)/5 text-(--color-prompt)">
          <FileText size={20} />
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="font-sans text-lg font-bold text-(--color-fg)">
            {resume.name}
          </h3>
          <p className="text-[11px] font-mono text-(--color-fg-muted) mt-0.5 uppercase tracking-wider">
            polyglot · single source-of-truth
          </p>
        </div>
      </header>

      <p className="mt-4 text-sm text-(--color-fg-dim) leading-relaxed font-sans">
        {resume.description}
      </p>
      <p className="mt-2 text-xs font-sans text-(--color-fg-muted) leading-relaxed">
        <span className="text-(--color-comment) font-mono">#</span>{" "}
        {resume.highlight}
      </p>

      <div className="mt-5 grid grid-cols-3 gap-2">
        <a
          href={`/resume/?variant=${resume.id}`}
          className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded text-xs font-sans border border-(--color-border-2) text-(--color-fg-dim) hover:text-(--color-link) hover:border-(--color-link) transition-colors"
        >
          <Eye size={12} /> View
        </a>
        {resume.pdf ? (
          <a
            href={resume.pdf}
            download
            className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded text-xs font-sans font-bold border border-(--color-prompt) bg-(--color-prompt) text-(--color-bg) hover:brightness-110 transition-all"
          >
            <Download size={12} /> PDF
          </a>
        ) : (
          <a
            href={`/resume/?variant=${resume.id}&print=1`}
            className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded text-xs font-sans font-bold border border-(--color-prompt) bg-(--color-prompt) text-(--color-bg) hover:brightness-110 transition-all"
          >
            <Download size={12} /> PDF
          </a>
        )}
        <a
          href={resume.json}
          download
          className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded text-xs font-sans border border-(--color-border-2) text-(--color-fg-dim) hover:text-(--color-keyword) hover:border-(--color-keyword) transition-colors"
        >
          <FileCode2 size={12} /> JSON
        </a>
      </div>
    </motion.article>
  );
}

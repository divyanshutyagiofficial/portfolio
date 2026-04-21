"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Download,
  Eye,
  FileText,
  FileCode2,
  Loader2,
} from "lucide-react";
import { resumes } from "@/data/resumes";
import type { Resume } from "@/types";
import { TerminalWindow } from "./TerminalWindow";
import { SectionHeader } from "./SectionHeader";
import { fetchResumeJson } from "@/lib/resume-export";
import { useSpotlight } from "@/lib/use-spotlight";

type Busy = null | "pdf" | "docx";

export function ResumeSection() {
  return (
    <section className="mt-20">
      <SectionHeader
        id="resume"
        title="Download my resume"
        command="cat ~/resumes/resume.json"
        comment="One resume covering Node.js, .NET, React, Next.js and Angular. Always synced from my resume-builder app — view it inline, download as PDF or Word, or grab the raw JSON."
      />
      <TerminalWindow path="resumes/" hint="always in sync">
        <div className="grid md:grid-cols-1 gap-3 max-w-2xl mx-auto">
          {resumes.map((r, i) => (
            <ResumeCard key={r.id} resume={r} index={i} />
          ))}
        </div>
        <p className="mt-5 text-xs font-sans text-(--color-fg-muted) text-center">
          <span className="text-(--color-comment) font-mono">{"// "}</span>
          PDF and Word files are generated client-side from a single source-of-truth
          JSON, edited and exported from the sister resume-builder app.
        </p>
      </TerminalWindow>
    </section>
  );
}

function ResumeCard({ resume, index }: { resume: Resume; index: number }) {
  const [busy, setBusy] = useState<Busy>(null);
  const { onMouseMove } = useSpotlight();

  async function handlePdf() {
    setBusy("pdf");
    try {
      const data = await fetchResumeJson(resume.json);
      const { downloadResumePdf } = await import("@/lib/pdf-export");
      await downloadResumePdf(data);
    } catch (err) {
      console.error(err);
      alert("Couldn't download PDF. Please try again.");
    } finally {
      setBusy(null);
    }
  }

  async function handleDocx() {
    setBusy("docx");
    try {
      const data = await fetchResumeJson(resume.json);
      const { downloadResumeDocx } = await import("@/lib/docx-export");
      await downloadResumeDocx(data);
    } catch (err) {
      console.error(err);
      alert("Couldn't download Word file. Please try again.");
    } finally {
      setBusy(null);
    }
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      onMouseMove={onMouseMove}
      className="card-lift rounded-lg border border-(--color-border-2) bg-(--color-surface-2) p-6 flex flex-col hover:border-(--color-prompt)/50"
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
            single source of truth · auto-synced
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

      <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-2">
        <a
          href={`/resume/?variant=${resume.id}`}
          className="btn-press inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded text-xs font-sans border border-(--color-border-2) text-(--color-fg-dim) hover:text-(--color-link) hover:border-(--color-link)"
        >
          <Eye size={12} /> View
        </a>
        <button
          onClick={handlePdf}
          disabled={busy !== null}
          className="btn-press inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded text-xs font-sans font-bold border border-(--color-prompt) bg-(--color-prompt) text-(--color-bg) hover:brightness-110 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {busy === "pdf" ? (
            <Loader2 size={12} className="animate-spin" />
          ) : (
            <Download size={12} />
          )}{" "}
          PDF
        </button>
        <button
          onClick={handleDocx}
          disabled={busy !== null}
          className="btn-press inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded text-xs font-sans font-medium border border-(--color-link) text-(--color-link) hover:bg-(--color-link) hover:text-(--color-bg) disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {busy === "docx" ? (
            <Loader2 size={12} className="animate-spin" />
          ) : (
            <FileText size={12} />
          )}{" "}
          Word
        </button>
        <a
          href={resume.json}
          download
          className="btn-press inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded text-xs font-sans border border-(--color-border-2) text-(--color-fg-dim) hover:text-(--color-keyword) hover:border-(--color-keyword)"
        >
          <FileCode2 size={12} /> JSON
        </a>
      </div>
    </motion.article>
  );
}

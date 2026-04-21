"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Download,
  FileCode2,
  FileText,
  Loader2,
  Printer,
} from "lucide-react";
import { resumes } from "@/data/resumes";
import { ResumePrintable } from "@/components/ResumePrintable";
import { fetchResumeJson, type ResumeJson } from "@/lib/resume-export";

type Busy = null | "pdf" | "docx" | "print";

export function ResumeViewer() {
  const params = useSearchParams();
  const router = useRouter();
  const variant = params.get("variant") ?? resumes[0].id;
  const downloadParam = params.get("download");

  const meta = useMemo(
    () => resumes.find((r) => r.id === variant) ?? resumes[0],
    [variant],
  );

  const [data, setData] = useState<ResumeJson | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState<Busy>(null);

  useEffect(() => {
    let alive = true;
    setData(null);
    setError(null);
    fetchResumeJson(meta.json)
      .then((json) => {
        if (alive) setData(json);
      })
      .catch((err) => {
        if (alive) setError((err as Error).message);
      });
    return () => {
      alive = false;
    };
  }, [meta.json]);

  async function handlePdf() {
    if (!data) return;
    setBusy("pdf");
    try {
      const { downloadResumePdf } = await import("@/lib/pdf-export");
      await downloadResumePdf(data);
    } catch (err) {
      console.error(err);
      alert("Failed to export PDF. Please try again.");
    } finally {
      setBusy(null);
    }
  }

  async function handleDocx() {
    if (!data) return;
    setBusy("docx");
    try {
      const { downloadResumeDocx } = await import("@/lib/docx-export");
      await downloadResumeDocx(data);
    } catch (err) {
      console.error(err);
      alert("Failed to export DOCX. Please try again.");
    } finally {
      setBusy(null);
    }
  }

  function handlePrint() {
    setBusy("print");
    setTimeout(() => {
      window.print();
      setBusy(null);
    }, 50);
  }

  // Auto-trigger downloads via URL params (?download=pdf|docx).
  useEffect(() => {
    if (!data || !downloadParam) return;
    if (downloadParam === "pdf") handlePdf();
    else if (downloadParam === "docx") handleDocx();
    else if (downloadParam === "print") handlePrint();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, downloadParam]);

  return (
    <div className="min-h-screen bg-(--color-bg) pb-20">
      <div className="no-print sticky top-0 z-30 backdrop-blur bg-(--color-surface)/85 border-b border-(--color-border)">
        <div className="mx-auto max-w-5xl px-4 h-14 flex flex-wrap items-center gap-2">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-(--color-fg-dim) hover:text-(--color-link)"
          >
            <ArrowLeft size={14} />
            home
          </Link>

          {resumes.length > 1 ? (
            <div className="flex items-center gap-1 ml-2">
              {resumes.map((r) => (
                <button
                  key={r.id}
                  onClick={() => router.replace(`/resume/?variant=${r.id}`)}
                  className={`px-2.5 py-1 text-xs font-mono rounded border transition-colors ${
                    meta.id === r.id
                      ? "border-(--color-link) text-(--color-link) bg-(--color-link)/10"
                      : "border-(--color-border-2) text-(--color-fg-dim) hover:text-(--color-fg)"
                  }`}
                >
                  {r.variant}
                </button>
              ))}
            </div>
          ) : (
            <span className="ml-2 px-2.5 py-1 text-xs font-mono rounded border border-(--color-border-2) text-(--color-fg-dim)">
              {meta.name}
            </span>
          )}

          <div className="ml-auto flex items-center gap-1.5">
            <button
              onClick={handlePdf}
              disabled={!data || busy !== null}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-sans font-bold rounded bg-(--color-prompt) text-(--color-bg) hover:brightness-110 disabled:opacity-60 disabled:cursor-not-allowed"
              title="Download a real PDF (no print dialog)"
            >
              {busy === "pdf" ? (
                <Loader2 size={12} className="animate-spin" />
              ) : (
                <Download size={12} />
              )}
              PDF
            </button>
            <button
              onClick={handleDocx}
              disabled={!data || busy !== null}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-sans font-medium rounded border border-(--color-link) text-(--color-link) hover:bg-(--color-link) hover:text-(--color-bg) transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              title="Download an editable Word file (.docx)"
            >
              {busy === "docx" ? (
                <Loader2 size={12} className="animate-spin" />
              ) : (
                <FileText size={12} />
              )}
              Word
            </button>
            <a
              href={meta.json}
              download
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-sans rounded border border-(--color-border-2) text-(--color-fg-dim) hover:text-(--color-keyword) hover:border-(--color-keyword)"
              title="Raw JSON used to build this resume"
            >
              <FileCode2 size={12} />
              JSON
            </a>
            <button
              onClick={handlePrint}
              disabled={!data || busy !== null}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-mono rounded border border-(--color-border-2) text-(--color-fg-muted) hover:text-(--color-fg-dim) disabled:opacity-50"
              title="Open the browser print dialog (fallback)"
            >
              <Printer size={12} />
            </button>
          </div>
        </div>
      </div>

      <article className="mx-auto max-w-5xl px-4 sm:px-6 py-8 print:py-0 print:px-0">
        {error && (
          <div className="rounded-md border border-(--color-string)/30 bg-(--color-string)/10 p-4 text-sm font-mono text-(--color-string)">
            ! {error} — JSON file may not have been deployed yet. Check{" "}
            <code>{meta.json}</code>.
          </div>
        )}
        {!data && !error && (
          <div className="flex items-center gap-2 text-(--color-fg-muted) font-mono text-sm">
            <Loader2 size={14} className="animate-spin" />
            loading {meta.name}…
          </div>
        )}

        {data && (
          <div className="bg-white text-slate-900 rounded-lg shadow-2xl print:shadow-none print:rounded-none px-8 sm:px-12 py-10">
            <ResumePrintable data={data} />
          </div>
        )}
      </article>
    </div>
  );
}

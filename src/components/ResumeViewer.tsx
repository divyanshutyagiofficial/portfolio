"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Download,
  FileCode2,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Printer,
  Globe,
  Github,
  Linkedin,
} from "lucide-react";
import { resumes } from "@/data/resumes";

interface ResumeJson {
  personal: {
    fullName: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    website?: string;
    linkedIn?: string;
    github?: string;
    summary: string;
  };
  experience: Array<{
    company: string;
    role: string;
    startDate: string;
    endDate: string;
    location?: string;
    bullets: string[];
  }>;
  education: Array<{
    institution: string;
    degree: string;
    fieldOfStudy?: string;
    startDate?: string;
    endDate?: string;
    location?: string;
  }>;
  projects: Array<{
    name: string;
    description?: string;
    tech?: string[];
    link?: string;
    bullets?: string[];
  }>;
  skills: string[];
  certifications?: Array<{ name: string; issuer?: string; date?: string }>;
  languages?: string[];
}

export function ResumeViewer() {
  const params = useSearchParams();
  const router = useRouter();
  const variant = params.get("variant") ?? resumes[0].id;
  const wantsPrint = params.get("print") === "1";

  const meta = useMemo(
    () => resumes.find((r) => r.id === variant) ?? resumes[0],
    [variant],
  );

  const [data, setData] = useState<ResumeJson | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    setData(null);
    setError(null);
    fetch(meta.json)
      .then((r) => {
        if (!r.ok) throw new Error(`Failed (${r.status})`);
        return r.json();
      })
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

  useEffect(() => {
    if (wantsPrint && data) {
      const t = setTimeout(() => window.print(), 600);
      return () => clearTimeout(t);
    }
  }, [wantsPrint, data]);

  return (
    <div className="min-h-screen bg-(--color-bg) pb-20">
      {/* Toolbar (hidden in print) */}
      <div className="no-print sticky top-0 z-30 backdrop-blur bg-(--color-surface)/85 border-b border-(--color-border)">
        <div className="mx-auto max-w-5xl px-4 h-14 flex flex-wrap items-center gap-3">
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
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded border border-(--color-border-2) text-(--color-fg-dim) hover:text-(--color-link) hover:border-(--color-link)"
            >
              <Printer size={12} />
              print / save as PDF
            </button>
            {meta.pdf && (
              <a
                href={meta.pdf}
                download
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded bg-(--color-prompt) text-(--color-bg) font-bold hover:brightness-110"
              >
                <Download size={12} />
                .pdf
              </a>
            )}
            <a
              href={meta.json}
              download
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded border border-(--color-keyword) text-(--color-keyword) hover:bg-(--color-keyword) hover:text-(--color-bg)"
            >
              <FileCode2 size={12} />
              .json
            </a>
          </div>
        </div>
      </div>

      {/* Document */}
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
          <div className="bg-white text-slate-900 rounded-lg shadow-2xl print:shadow-none print:rounded-none px-8 sm:px-12 py-10 font-sans leading-relaxed">
            {/* Header */}
            <header className="border-b border-slate-200 pb-5">
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                {data.personal.fullName}
              </h1>
              <p className="mt-1 text-base text-slate-600">
                {data.personal.title}
              </p>
              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-600">
                <ContactRow icon={<Mail size={11} />}>
                  <a href={`mailto:${data.personal.email}`} className="hover:text-blue-700">
                    {data.personal.email}
                  </a>
                </ContactRow>
                <ContactRow icon={<Phone size={11} />}>{data.personal.phone}</ContactRow>
                <ContactRow icon={<MapPin size={11} />}>{data.personal.location}</ContactRow>
                {data.personal.website && (
                  <ContactRow icon={<Globe size={11} />}>
                    <a href={data.personal.website} className="hover:text-blue-700" target="_blank" rel="noreferrer">
                      {data.personal.website.replace(/^https?:\/\//, "")}
                    </a>
                  </ContactRow>
                )}
                {data.personal.linkedIn && (
                  <ContactRow icon={<Linkedin size={11} />}>
                    <a href={data.personal.linkedIn} className="hover:text-blue-700" target="_blank" rel="noreferrer">
                      {data.personal.linkedIn
                        .replace(/^https?:\/\//, "")
                        .replace(/\/$/, "")}
                    </a>
                  </ContactRow>
                )}
                {data.personal.github && (
                  <ContactRow icon={<Github size={11} />}>
                    <a href={data.personal.github} className="hover:text-blue-700" target="_blank" rel="noreferrer">
                      {data.personal.github
                        .replace(/^https?:\/\//, "")
                        .replace(/\/$/, "")}
                    </a>
                  </ContactRow>
                )}
              </div>
            </header>

            {/* Summary */}
            <Section title="Summary">
              <p className="text-sm text-slate-700">{data.personal.summary}</p>
            </Section>

            {/* Experience */}
            <Section title="Experience">
              <div className="space-y-4">
                {data.experience.map((e, i) => (
                  <div key={i}>
                    <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                      <h3 className="font-semibold text-slate-900">
                        {e.role}{" "}
                        <span className="font-normal text-slate-600">
                          · {e.company}
                        </span>
                      </h3>
                      <span className="text-xs text-slate-500 font-mono">
                        {e.startDate} — {e.endDate}
                      </span>
                    </div>
                    <ul className="mt-1.5 list-disc pl-5 text-sm text-slate-700 space-y-0.5">
                      {e.bullets.map((b, bi) => (
                        <li key={bi}>{b}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Section>

            {/* Projects */}
            {data.projects.length > 0 && (
              <Section title="Selected Projects">
                <div className="space-y-3">
                  {data.projects.slice(0, 8).map((p, i) => (
                    <div key={i}>
                      <h3 className="font-semibold text-slate-900 text-sm">
                        {p.name}
                      </h3>
                      {p.description && (
                        <p className="text-xs text-slate-500">{p.description}</p>
                      )}
                      {p.bullets && p.bullets.length > 0 && (
                        <ul className="mt-1 list-disc pl-5 text-sm text-slate-700 space-y-0.5">
                          {p.bullets.map((b, bi) => (
                            <li key={bi}>{b}</li>
                          ))}
                        </ul>
                      )}
                      {p.tech && p.tech.length > 0 && (
                        <p className="mt-1 text-[11px] text-slate-500">
                          <span className="font-medium">Tech:</span>{" "}
                          {p.tech.join(" · ")}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </Section>
            )}

            {/* Skills */}
            <Section title="Skills">
              <p className="text-sm text-slate-700">{data.skills.join(" · ")}</p>
            </Section>

            {/* Education */}
            <Section title="Education">
              <div className="space-y-2">
                {data.education.map((e, i) => (
                  <div key={i}>
                    <h3 className="font-semibold text-slate-900 text-sm">
                      {e.degree}
                      {e.fieldOfStudy ? `, ${e.fieldOfStudy}` : ""}
                    </h3>
                    <p className="text-sm text-slate-600">{e.institution}</p>
                  </div>
                ))}
              </div>
            </Section>

            {/* Certifications */}
            {data.certifications && data.certifications.length > 0 && (
              <Section title="Certifications">
                <ul className="text-sm text-slate-700 list-disc pl-5">
                  {data.certifications.map((c, i) => (
                    <li key={i}>{c.name}</li>
                  ))}
                </ul>
              </Section>
            )}

            {/* Languages */}
            {data.languages && data.languages.length > 0 && (
              <Section title="Languages">
                <p className="text-sm text-slate-700">{data.languages.join(" · ")}</p>
              </Section>
            )}
          </div>
        )}
      </article>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-5 pt-4 border-t border-slate-200">
      <h2 className="text-xs uppercase tracking-[0.18em] text-slate-500 font-semibold mb-2">
        {title}
      </h2>
      {children}
    </section>
  );
}

function ContactRow({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <span className="inline-flex items-center gap-1.5">
      {icon}
      {children}
    </span>
  );
}

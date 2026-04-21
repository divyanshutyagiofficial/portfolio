import {
  Mail,
  MapPin,
  Phone,
  Globe,
  Github,
  Linkedin,
} from "lucide-react";
import type { ResumeJson } from "@/lib/resume-export";

/**
 * The actual resume layout.
 *
 * Used in two places:
 *  1. <ResumeViewer/> for on-screen viewing
 *  2. The off-screen renderer in /lib/pdf-export.tsx — captured by
 *     html2canvas-pro to produce the downloadable PDF.
 *
 * Markup intentionally uses inline-friendly Tailwind utilities so the
 * styles are present whether mounted on a portfolio page or in a
 * disposable off-screen sheet.
 */
export function ResumePrintable({ data }: { data: ResumeJson }) {
  return (
    <div className="bg-white text-slate-900 font-sans leading-relaxed">
      <header className="border-b border-slate-200 pb-5">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
          {data.personal.fullName}
        </h1>
        <p className="mt-1 text-base text-slate-600">{data.personal.title}</p>
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-600">
          <ContactRow icon={<Mail size={11} />}>
            <a href={`mailto:${data.personal.email}`}>{data.personal.email}</a>
          </ContactRow>
          <ContactRow icon={<Phone size={11} />}>{data.personal.phone}</ContactRow>
          <ContactRow icon={<MapPin size={11} />}>{data.personal.location}</ContactRow>
          {data.personal.website && (
            <ContactRow icon={<Globe size={11} />}>
              <a href={data.personal.website} target="_blank" rel="noreferrer">
                {data.personal.website.replace(/^https?:\/\//, "")}
              </a>
            </ContactRow>
          )}
          {data.personal.linkedIn && (
            <ContactRow icon={<Linkedin size={11} />}>
              <a href={data.personal.linkedIn} target="_blank" rel="noreferrer">
                {data.personal.linkedIn
                  .replace(/^https?:\/\//, "")
                  .replace(/\/$/, "")}
              </a>
            </ContactRow>
          )}
          {data.personal.github && (
            <ContactRow icon={<Github size={11} />}>
              <a href={data.personal.github} target="_blank" rel="noreferrer">
                {data.personal.github
                  .replace(/^https?:\/\//, "")
                  .replace(/\/$/, "")}
              </a>
            </ContactRow>
          )}
        </div>
      </header>

      {data.personal.summary && (
        <Section title="Summary">
          <p className="text-sm text-slate-700">{data.personal.summary}</p>
        </Section>
      )}

      {data.experience.length > 0 && (
        <Section title="Experience">
          <div className="space-y-4">
            {data.experience.map((e, i) => (
              <div key={i}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                  <h3 className="font-semibold text-slate-900">
                    {e.role}{" "}
                    <span className="font-normal text-slate-600">· {e.company}</span>
                  </h3>
                  <span className="text-xs text-slate-500 font-mono">
                    {e.startDate} — {e.endDate}
                  </span>
                </div>
                {e.location && (
                  <p className="text-xs italic text-slate-500">{e.location}</p>
                )}
                {e.bullets?.length > 0 && (
                  <ul className="mt-1.5 list-disc pl-5 text-sm text-slate-700 space-y-0.5">
                    {e.bullets.map((b, bi) => (
                      <li key={bi}>{b}</li>
                    ))}
                  </ul>
                )}
                {e.highlights && e.highlights.length > 0 && (
                  <div className="mt-2 ml-1">
                    <p className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold">
                      Highlights
                    </p>
                    <ul className="list-[square] pl-5 text-sm text-slate-700">
                      {e.highlights.map((h, hi) => (
                        <li key={hi}>{h}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Section>
      )}

      {data.projects.length > 0 && (
        <Section title="Selected Projects">
          <div className="space-y-3">
            {data.projects.slice(0, 8).map((p, i) => (
              <div key={i}>
                <h3 className="font-semibold text-slate-900 text-sm">{p.name}</h3>
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
                    <span className="font-medium">Tech:</span> {p.tech.join(" · ")}
                  </p>
                )}
              </div>
            ))}
          </div>
        </Section>
      )}

      {data.skills.length > 0 && (
        <Section title="Skills">
          <p className="text-sm text-slate-700">{data.skills.join(" · ")}</p>
        </Section>
      )}

      {data.education.length > 0 && (
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
      )}

      {data.certifications && data.certifications.length > 0 && (
        <Section title="Certifications">
          <ul className="text-sm text-slate-700 list-disc pl-5">
            {data.certifications.map((c, i) => (
              <li key={i}>{c.name}</li>
            ))}
          </ul>
        </Section>
      )}

      {data.languages && data.languages.length > 0 && (
        <Section title="Languages">
          <p className="text-sm text-slate-700">{data.languages.join(" · ")}</p>
        </Section>
      )}
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
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

/**
 * Programmatic DOCX export — built directly from the resume JSON, no
 * print preview. Mirrors the shape used in the sister resume-builder app
 * but accepts the lighter `ResumeJson` (theme is fully optional, defaults
 * applied per `RESUME_DEFAULTS`).
 */

import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  AlignmentType,
  ExternalHyperlink,
  BorderStyle,
  TabStopType,
  TabStopPosition,
  Tab,
  ShadingType,
  PageOrientation,
  LevelFormat,
  convertInchesToTwip,
  convertMillimetersToTwip,
} from "docx";
import {
  RESUME_DEFAULTS,
  type ResumeJson,
  fileStem,
  hexColor,
} from "./resume-export";

const FONT_NAME = "Calibri";

function joinDate(start?: string, end?: string) {
  if (!start && !end) return "";
  if (!end) return `${start} – Present`;
  return `${start} – ${end}`;
}

function themeNum<K extends keyof typeof RESUME_DEFAULTS>(
  data: ResumeJson,
  key: K,
): (typeof RESUME_DEFAULTS)[K] {
  const v = data.theme?.[key as keyof NonNullable<ResumeJson["theme"]>];
  return (v as (typeof RESUME_DEFAULTS)[K]) ?? RESUME_DEFAULTS[key];
}

function sectionHeading(title: string, data: ResumeJson): Paragraph {
  const baseFontSize = themeNum(data, "baseFontSize") as number;
  const sectionSpacing = themeNum(data, "sectionSpacing") as number;
  return new Paragraph({
    spacing: { before: Math.round(180 * sectionSpacing), after: 80 },
    border: {
      bottom: {
        color: hexColor(data.theme?.primaryColor),
        space: 2,
        style: BorderStyle.SINGLE,
        size: 6,
      },
    },
    children: [
      new TextRun({
        text: title.toUpperCase(),
        bold: true,
        color: hexColor(data.theme?.primaryColor),
        font: FONT_NAME,
        size: Math.round((baseFontSize + 2) * 2),
      }),
    ],
  });
}

function bulletList(items: string[], data: ResumeJson): Paragraph[] {
  const lineHeight = themeNum(data, "lineHeight") as number;
  const baseFontSize = themeNum(data, "baseFontSize") as number;
  return items
    .filter(Boolean)
    .map(
      (text) =>
        new Paragraph({
          numbering: { reference: "resume-bullets", level: 0 },
          spacing: { after: 40, line: Math.round(lineHeight * 240) },
          children: [
            new TextRun({
              text,
              font: FONT_NAME,
              size: baseFontSize * 2,
              color: hexColor(data.theme?.textColor),
            }),
          ],
        }),
    );
}

function plain(
  text: string,
  data: ResumeJson,
  opts: { bold?: boolean; italic?: boolean; color?: string; size?: number } = {},
): TextRun {
  const baseFontSize = themeNum(data, "baseFontSize") as number;
  return new TextRun({
    text,
    font: FONT_NAME,
    bold: opts.bold,
    italics: opts.italic,
    color: opts.color ? hexColor(opts.color) : hexColor(data.theme?.textColor),
    size: (opts.size ?? baseFontSize) * 2,
  });
}

export async function buildResumeDocx(data: ResumeJson): Promise<Blob> {
  const baseFontSize = themeNum(data, "baseFontSize") as number;
  const lineHeight = themeNum(data, "lineHeight") as number;
  const padding = convertInchesToTwip(
    Math.max(0.3, (themeNum(data, "pagePadding") as number) / 96),
  );

  const children: Paragraph[] = [];

  children.push(
    new Paragraph({
      alignment: AlignmentType.LEFT,
      spacing: { after: 60 },
      shading:
        data.theme?.backgroundColor &&
        data.theme.backgroundColor.toLowerCase() !== "#ffffff"
          ? {
              type: ShadingType.CLEAR,
              fill: hexColor(data.theme.backgroundColor),
              color: "auto",
            }
          : undefined,
      children: [
        new TextRun({
          text: data.personal.fullName || "Your Name",
          bold: true,
          color: hexColor(data.theme?.primaryColor),
          font: FONT_NAME,
          size: Math.round(baseFontSize * 2.4 * 2),
        }),
      ],
    }),
  );

  if (data.personal.title) {
    children.push(
      new Paragraph({
        spacing: { after: 80 },
        children: [
          plain(data.personal.title, data, {
            italic: true,
            color: data.theme?.accentColor,
          }),
        ],
      }),
    );
  }

  const contactBits: TextRun[] = [];
  const sep = () =>
    new TextRun({
      text: "  •  ",
      font: FONT_NAME,
      color: "94A3B8",
      size: baseFontSize * 2,
    });
  function pushContact(label: string) {
    if (contactBits.length) contactBits.push(sep());
    contactBits.push(plain(label, data));
  }
  if (data.personal.email) pushContact(data.personal.email);
  if (data.personal.phone) pushContact(data.personal.phone);
  if (data.personal.location) pushContact(data.personal.location);
  if (data.personal.website) pushContact(data.personal.website);
  if (data.personal.linkedIn) pushContact(data.personal.linkedIn);
  if (data.personal.github) pushContact(data.personal.github);
  if (contactBits.length) {
    children.push(new Paragraph({ spacing: { after: 120 }, children: contactBits }));
  }

  if (data.personal.summary) {
    children.push(sectionHeading("Summary", data));
    children.push(
      new Paragraph({
        spacing: { after: 80, line: Math.round(lineHeight * 240) },
        children: [plain(data.personal.summary, data)],
      }),
    );
  }

  if (data.experience.length) {
    children.push(sectionHeading("Experience", data));
    for (const exp of data.experience) {
      children.push(
        new Paragraph({
          spacing: { before: 120, after: 0 },
          tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
          children: [
            plain(`${exp.role}`, data, { bold: true }),
            plain(exp.company ? ` — ${exp.company}` : "", data),
            new TextRun({ children: [new Tab()] }),
            plain(joinDate(exp.startDate, exp.endDate), data, { color: "64748B" }),
          ],
        }),
      );
      if (exp.location) {
        children.push(
          new Paragraph({
            spacing: { after: 40 },
            children: [
              plain(exp.location, data, { italic: true, color: "64748B" }),
            ],
          }),
        );
      }
      if (exp.bullets?.length) {
        children.push(...bulletList(exp.bullets, data));
      }
      if (exp.highlights?.length) {
        children.push(
          new Paragraph({
            spacing: { before: 80, after: 0 },
            children: [
              plain("Highlights", data, {
                bold: true,
                color: data.theme?.primaryColor,
              }),
            ],
          }),
        );
        children.push(...bulletList(exp.highlights, data));
      }
    }
  }

  if (data.projects.length) {
    children.push(sectionHeading("Selected Projects", data));
    for (const p of data.projects.slice(0, 8)) {
      const titleRuns: (TextRun | ExternalHyperlink)[] = [
        plain(p.name, data, { bold: true }),
      ];
      if (p.link) {
        titleRuns.push(plain(" — ", data, { color: "94A3B8" }));
        titleRuns.push(
          new ExternalHyperlink({
            link: p.link.startsWith("http") ? p.link : `https://${p.link}`,
            children: [
              plain(p.link, data, { color: data.theme?.accentColor }),
            ],
          }),
        );
      }
      children.push(new Paragraph({ spacing: { before: 120 }, children: titleRuns }));
      if (p.description) {
        children.push(
          new Paragraph({
            spacing: { after: 40 },
            children: [plain(p.description, data)],
          }),
        );
      }
      if (p.tech?.length) {
        children.push(
          new Paragraph({
            spacing: { after: 40 },
            children: [
              plain("Tech: ", data, { bold: true, color: "475569" }),
              plain(p.tech.join(", "), data),
            ],
          }),
        );
      }
      if (p.bullets?.length) {
        children.push(...bulletList(p.bullets, data));
      }
    }
  }

  if (data.education.length) {
    children.push(sectionHeading("Education", data));
    for (const ed of data.education) {
      children.push(
        new Paragraph({
          spacing: { before: 100 },
          tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
          children: [
            plain(ed.degree, data, { bold: true }),
            new TextRun({ children: [new Tab()] }),
            plain(joinDate(ed.startDate, ed.endDate), data, { color: "64748B" }),
          ],
        }),
      );
      const sub = [ed.institution, ed.fieldOfStudy].filter(Boolean).join(" · ");
      if (sub) {
        children.push(
          new Paragraph({
            spacing: { after: 40 },
            children: [
              plain(sub, data, { italic: true, color: "475569" }),
            ],
          }),
        );
      }
    }
  }

  if (data.skills.length) {
    children.push(sectionHeading("Skills", data));
    children.push(
      new Paragraph({
        spacing: { after: 60, line: Math.round(lineHeight * 240) },
        children: [plain(data.skills.join(" · "), data)],
      }),
    );
  }

  if (data.certifications?.length) {
    children.push(sectionHeading("Certifications", data));
    children.push(
      ...bulletList(
        data.certifications.map((c) =>
          [c.name, c.issuer, c.date].filter(Boolean).join(" · "),
        ),
        data,
      ),
    );
  }

  if (data.languages?.length) {
    children.push(sectionHeading("Languages", data));
    children.push(
      new Paragraph({
        children: [plain(data.languages.join(" · "), data)],
      }),
    );
  }

  const doc = new Document({
    creator: "Divyanshu Tyagi — Portfolio",
    title: data.personal.fullName || "Resume",
    styles: {
      default: {
        document: {
          run: {
            font: FONT_NAME,
            size: baseFontSize * 2,
            color: hexColor(data.theme?.textColor),
          },
          paragraph: { spacing: { line: Math.round(lineHeight * 240) } },
        },
        heading1: {
          run: {
            bold: true,
            font: FONT_NAME,
            color: hexColor(data.theme?.primaryColor),
          },
        },
      },
    },
    numbering: {
      config: [
        {
          reference: "resume-bullets",
          levels: [
            {
              level: 0,
              format: LevelFormat.BULLET,
              text: "•",
              alignment: AlignmentType.LEFT,
              style: {
                paragraph: { indent: { left: 360, hanging: 220 } },
                run: { color: hexColor(data.theme?.primaryColor) },
              },
            },
          ],
        },
      ],
    },
    sections: [
      {
        properties: {
          page: {
            size: {
              orientation: PageOrientation.PORTRAIT,
              ...((data.theme?.paperSize ?? RESUME_DEFAULTS.paperSize) === "a4"
                ? {
                    width: convertMillimetersToTwip(210),
                    height: convertMillimetersToTwip(297),
                  }
                : {
                    width: convertInchesToTwip(8.5),
                    height: convertInchesToTwip(11),
                  }),
            },
            margin: { top: padding, right: padding, bottom: padding, left: padding },
          },
        },
        children,
      },
    ],
  });

  return Packer.toBlob(doc);
}

export async function downloadResumeDocx(data: ResumeJson) {
  const blob = await buildResumeDocx(data);
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `${fileStem(data)}.docx`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(a.href), 0);
}

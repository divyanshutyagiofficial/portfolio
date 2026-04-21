"use client";

/**
 * Direct (no print-dialog) PDF export for the portfolio resume.
 *
 * Strategy:
 *  1. Render a self-contained, A4/Letter-sized "resume sheet" into an
 *     off-screen DOM node — so we capture exactly what we control, not
 *     whatever container the page happens to wrap the viewer in.
 *  2. Rasterise it with html2canvas-pro (the -pro fork supports modern
 *     CSS color functions like oklch that vanilla html2canvas chokes on).
 *  3. Slice the resulting canvas into one or more page-sized chunks and
 *     stitch them into a jsPDF document → save().
 *
 * No `window.print()`, no print preview, no browser chrome.
 */

import jsPDF from "jspdf";
import html2canvas from "html2canvas-pro";
import { createRoot } from "react-dom/client";
import React from "react";
import { ResumePrintable } from "@/components/ResumePrintable";
import { RESUME_DEFAULTS, type ResumeJson, fileStem } from "@/lib/resume-export";

// 96-dpi printable page dimensions (matches resume-builder).
const PAGE_DIMENSIONS = {
  letter: { width: 816, height: 1056 },
  a4: { width: 794, height: 1123 },
} as const;

export async function downloadResumePdf(
  data: ResumeJson,
  options: { fileName?: string; scale?: number } = {},
) {
  const paperSize = data.theme?.paperSize ?? RESUME_DEFAULTS.paperSize;
  const page = PAGE_DIMENSIONS[paperSize];
  const padding = Math.max(0, data.theme?.pagePadding ?? RESUME_DEFAULTS.pagePadding);

  // 1) Off-screen mount point. Stays in the DOM (so it inherits global CSS,
  //    Tailwind tokens etc.) but parked far off-screen so the user never sees it.
  const host = document.createElement("div");
  host.style.position = "fixed";
  host.style.left = "-100000px";
  host.style.top = "0";
  host.style.zIndex = "-1";
  host.style.pointerEvents = "none";
  host.style.width = `${page.width}px`;
  document.body.appendChild(host);

  const sheet = document.createElement("div");
  sheet.style.width = `${page.width}px`;
  sheet.style.minHeight = `${page.height}px`;
  sheet.style.padding = `${padding}px`;
  sheet.style.background = data.theme?.backgroundColor ?? RESUME_DEFAULTS.backgroundColor;
  sheet.style.color = data.theme?.textColor ?? RESUME_DEFAULTS.textColor;
  sheet.style.fontFamily =
    "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif";
  sheet.style.fontSize = `${data.theme?.baseFontSize ?? RESUME_DEFAULTS.baseFontSize}px`;
  sheet.style.lineHeight = String(data.theme?.lineHeight ?? RESUME_DEFAULTS.lineHeight);
  sheet.style.boxShadow = "none";
  sheet.style.borderRadius = "0";
  host.appendChild(sheet);

  const root = createRoot(sheet);
  root.render(<ResumePrintable data={data} />);

  // Wait for layout, fonts, and a couple of paint frames.
  await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
  await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
  try {
    const fontsReady = (
      document as unknown as { fonts?: { ready?: Promise<unknown> } }
    ).fonts?.ready;
    if (fontsReady) await fontsReady;
  } catch {
    /* ignore — Fonts API not critical */
  }

  try {
    // 2) Rasterise.
    const scale = options.scale ?? 2;
    const canvas = await html2canvas(sheet, {
      scale,
      useCORS: true,
      allowTaint: false,
      backgroundColor: data.theme?.backgroundColor ?? RESUME_DEFAULTS.backgroundColor,
      logging: false,
      windowWidth: page.width,
      windowHeight: Math.max(page.height, sheet.scrollHeight),
    });

    // 3) Compose multi-page PDF by slicing.
    const pdf = new jsPDF({
      unit: "px",
      orientation: "portrait",
      format: [page.width, page.height],
      hotfixes: ["px_scaling"],
      compress: true,
    });

    const pageWidthPx = page.width;
    const pageHeightPx = page.height;
    const totalHeightCanvasPx = canvas.height;
    const pageHeightCanvasPx = Math.floor(pageHeightPx * scale);

    let y = 0;
    let pageIdx = 0;
    while (y < totalHeightCanvasPx) {
      const sliceHeightCanvasPx = Math.min(pageHeightCanvasPx, totalHeightCanvasPx - y);

      const slice = document.createElement("canvas");
      slice.width = canvas.width;
      slice.height = sliceHeightCanvasPx;
      const ctx = slice.getContext("2d");
      if (!ctx) throw new Error("Could not get 2D canvas context");
      ctx.fillStyle = data.theme?.backgroundColor ?? RESUME_DEFAULTS.backgroundColor;
      ctx.fillRect(0, 0, slice.width, slice.height);
      ctx.drawImage(
        canvas,
        0,
        y,
        canvas.width,
        sliceHeightCanvasPx,
        0,
        0,
        canvas.width,
        sliceHeightCanvasPx,
      );

      const sliceImg = slice.toDataURL("image/jpeg", 0.95);
      const sliceHeightPdfPx = sliceHeightCanvasPx / scale;

      if (pageIdx > 0) pdf.addPage([pageWidthPx, pageHeightPx], "portrait");
      pdf.addImage(
        sliceImg,
        "JPEG",
        0,
        0,
        pageWidthPx,
        sliceHeightPdfPx,
        undefined,
        "FAST",
      );

      y += sliceHeightCanvasPx;
      pageIdx += 1;
    }

    pdf.save(options.fileName ?? `${fileStem(data)}.pdf`);
  } finally {
    root.unmount();
    host.remove();
  }
}

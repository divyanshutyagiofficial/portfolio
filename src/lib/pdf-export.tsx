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
  sheet.style.minHeight = `${page.height - padding * 2}px`;
  // Left/right padding is fine — no horizontal slicing happens.
  // Vertical padding is intentionally omitted here: we add it manually to
  // every page in the PDF loop below so each page gets equal top+bottom margins.
  sheet.style.paddingLeft = `${padding}px`;
  sheet.style.paddingRight = `${padding}px`;
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
    //
    // Each PDF page is full-size (pageWidthPx × pageHeightPx). We fill it with:
    //   - a top white strip  (padding px)
    //   - the content slice  (pageHeightPx − 2×padding px)
    //   - a bottom white strip (padding px)
    // This gives every page — not just the first — equal top and bottom margins.
    const pdf = new jsPDF({
      unit: "px",
      orientation: "portrait",
      format: [page.width, page.height],
      hotfixes: ["px_scaling"],
      compress: true,
    });

    const pageWidthPx = page.width;
    const pageHeightPx = page.height;
    const bg = data.theme?.backgroundColor ?? RESUME_DEFAULTS.backgroundColor;

    // How much of the content canvas each page can show (excluding top+bottom padding).
    const contentHeightPx = pageHeightPx - padding * 2;
    const contentHeightCanvasPx = Math.floor(contentHeightPx * scale);
    const paddingCanvasPx = Math.floor(padding * scale);
    const fullPageCanvasPx = Math.floor(pageHeightPx * scale);

    const totalContentCanvasPx = canvas.height; // content canvas has NO vertical padding

    let y = 0;
    let pageIdx = 0;
    while (y < totalContentCanvasPx) {
      // How much content fits on this page.
      const srcH = Math.min(contentHeightCanvasPx, totalContentCanvasPx - y);

      // Destination canvas = full page size.
      const dest = document.createElement("canvas");
      dest.width = canvas.width;
      dest.height = fullPageCanvasPx;
      const ctx = dest.getContext("2d");
      if (!ctx) throw new Error("Could not get 2D canvas context");

      // Fill entire page with the background colour (creates top+bottom padding zones).
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, dest.width, dest.height);

      // Draw the content slice starting at paddingCanvasPx from the top.
      ctx.drawImage(
        canvas,
        0, y,              // source x, y
        canvas.width, srcH, // source w, h
        0, paddingCanvasPx, // dest x, y  ← top padding gap
        canvas.width, srcH, // dest w, h
      );

      const pageImg = dest.toDataURL("image/jpeg", 0.95);
      if (pageIdx > 0) pdf.addPage([pageWidthPx, pageHeightPx], "portrait");
      pdf.addImage(pageImg, "JPEG", 0, 0, pageWidthPx, pageHeightPx, undefined, "FAST");

      y += srcH;
      pageIdx += 1;
    }

    pdf.save(options.fileName ?? `${fileStem(data)}.pdf`);
  } finally {
    root.unmount();
    host.remove();
  }
}

"use client";

/**
 * Direct (no print-dialog) PDF export for the portfolio resume.
 *
 * Strategy:
 *  1. Render a self-contained A4/Letter resume into an off-screen DOM node.
 *  2. Rasterise with html2canvas-pro (handles oklch/lab CSS that vanilla
 *     html2canvas chokes on).
 *  3. Slice the canvas into pages using SMART PAGE BREAKS (see below) and
 *     stitch into a jsPDF document → save().
 *
 * Smart page-break algorithm
 * ──────────────────────────
 * Naïve slicing cuts the canvas at exact pixel intervals, which can bisect
 * a line of text. Instead, for each non-final page we scan a small window
 * (±BREAK_SEARCH_PX display pixels) around the ideal cut point and look for
 * a horizontal row where every sampled pixel is (near-)background colour —
 * i.e. a gap between content lines. We break there. If no blank row is found
 * in the window we fall back to the exact cut so nothing is lost.
 *
 * Padding fix
 * ───────────
 * The sheet element carries only left/right padding; vertical padding is
 * omitted from the DOM element and added manually to every PDF page (a white
 * strip at the top and bottom of each destination canvas). This ensures every
 * page — not just the first — has equal margins.
 */

import jsPDF from "jspdf";
import html2canvas from "html2canvas-pro";
import { createRoot } from "react-dom/client";
import React from "react";
import { ResumePrintable } from "@/components/ResumePrintable";
import { RESUME_DEFAULTS, type ResumeJson, fileStem } from "@/lib/resume-export";

const PAGE_DIMENSIONS = {
  letter: { width: 816, height: 1056 },
  a4: { width: 794, height: 1123 },
} as const;

/** How many *display* pixels above the ideal cut to scan for a blank row. */
const BREAK_SEARCH_PX = 80;

// ─── helpers ─────────────────────────────────────────────────────────────────

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const m = hex.replace(/^#/, "").match(/^([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
  return m
    ? { r: parseInt(m[1], 16), g: parseInt(m[2], 16), b: parseInt(m[3], 16) }
    : { r: 255, g: 255, b: 255 };
}

/**
 * Returns true if every sampled pixel in a given row of `imgData` is within
 * `tolerance` of the background colour.
 * Samples every 4th pixel for performance (fine for typical resume widths).
 */
function isBlankRow(
  imgData: ImageData,
  relY: number,
  width: number,
  bg: { r: number; g: number; b: number },
  tolerance = 18,
): boolean {
  const base = relY * width * 4;
  for (let x = 0; x < width; x += 4) {
    const i = base + x * 4;
    if (
      Math.abs(imgData.data[i]     - bg.r) > tolerance ||
      Math.abs(imgData.data[i + 1] - bg.g) > tolerance ||
      Math.abs(imgData.data[i + 2] - bg.b) > tolerance
    ) return false;
  }
  return true;
}

/**
 * Given an ideal cut-point `idealY` (in canvas pixels), scan upward (then
 * downward as a fallback) within [searchFrom, searchTo] looking for a blank
 * row in the captured canvas. Returns the best break Y coordinate.
 *
 * Scanning upward is preferred: it means the page carries a little *less*
 * content rather than a little *more*, which is the safer side to err on.
 */
function findCleanBreak(
  canvas: HTMLCanvasElement,
  idealY: number,
  searchFrom: number,
  searchTo: number,
  bg: { r: number; g: number; b: number },
): number {
  const ctx = canvas.getContext("2d");
  if (!ctx || searchFrom >= searchTo) return idealY;

  const rowCount = searchTo - searchFrom + 1;
  const imgData = ctx.getImageData(0, searchFrom, canvas.width, rowCount);

  // Scan upward from idealY.
  for (let y = idealY; y >= searchFrom; y--) {
    if (isBlankRow(imgData, y - searchFrom, canvas.width, bg)) return y;
  }
  // Fallback: scan downward.
  for (let y = idealY + 1; y <= searchTo; y++) {
    if (isBlankRow(imgData, y - searchFrom, canvas.width, bg)) return y;
  }

  return idealY; // no blank row found — use exact cut
}

// ─── main export ─────────────────────────────────────────────────────────────

export async function downloadResumePdf(
  data: ResumeJson,
  options: { fileName?: string; scale?: number } = {},
) {
  const paperSize = data.theme?.paperSize ?? RESUME_DEFAULTS.paperSize;
  const page = PAGE_DIMENSIONS[paperSize];
  const padding = Math.max(0, data.theme?.pagePadding ?? RESUME_DEFAULTS.pagePadding);
  const bg = data.theme?.backgroundColor ?? RESUME_DEFAULTS.backgroundColor;

  // 1) Off-screen mount.
  const host = document.createElement("div");
  host.style.cssText =
    "position:fixed;left:-100000px;top:0;z-index:-1;pointer-events:none";
  host.style.width = `${page.width}px`;
  document.body.appendChild(host);

  const sheet = document.createElement("div");
  sheet.style.width = `${page.width}px`;
  sheet.style.minHeight = `${page.height - padding * 2}px`;
  // Only left/right padding on the element — vertical padding is added
  // manually to every PDF page so all pages have equal margins.
  sheet.style.paddingLeft = `${padding}px`;
  sheet.style.paddingRight = `${padding}px`;
  sheet.style.background = bg;
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

  await new Promise<void>((r) => requestAnimationFrame(() => r()));
  await new Promise<void>((r) => requestAnimationFrame(() => r()));
  try {
    const fontsReady = (document as unknown as { fonts?: { ready?: Promise<unknown> } }).fonts?.ready;
    if (fontsReady) await fontsReady;
  } catch { /* non-critical */ }

  try {
    // 2) Rasterise.
    const scale = options.scale ?? 2;
    const canvas = await html2canvas(sheet, {
      scale,
      useCORS: true,
      allowTaint: false,
      backgroundColor: bg,
      logging: false,
      windowWidth: page.width,
      windowHeight: Math.max(page.height, sheet.scrollHeight),
    });

    // 3) Compose PDF with smart page breaks + per-page padding.
    const pdf = new jsPDF({
      unit: "px",
      orientation: "portrait",
      format: [page.width, page.height],
      hotfixes: ["px_scaling"],
      compress: true,
    });

    const pageWidthPx  = page.width;
    const pageHeightPx = page.height;
    const bgRgb = hexToRgb(bg);

    // Available content height per page (inside top+bottom padding zones).
    const contentHeightPx       = pageHeightPx - padding * 2;
    const contentHeightCanvasPx = Math.floor(contentHeightPx * scale);
    const paddingCanvasPx       = Math.floor(padding * scale);
    const fullPageCanvasPx      = Math.floor(pageHeightPx * scale);
    const totalContentCanvasPx  = canvas.height;

    // Search window: up to BREAK_SEARCH_PX display-px above the ideal cut.
    const searchWindowCanvasPx = Math.min(
      Math.floor(BREAK_SEARCH_PX * scale),
      Math.floor(contentHeightCanvasPx / 2),
    );

    let y = 0;
    let pageIdx = 0;

    while (y < totalContentCanvasPx) {
      let srcH: number;

      const idealCutY = y + contentHeightCanvasPx;

      if (idealCutY >= totalContentCanvasPx) {
        // Last (or only) page — take all remaining content.
        srcH = totalContentCanvasPx - y;
      } else {
        // Find the nearest blank row above (preferred) or below idealCutY.
        const searchFrom = Math.max(y + 1, idealCutY - searchWindowCanvasPx);
        const searchTo   = Math.min(totalContentCanvasPx - 1, idealCutY + Math.floor(searchWindowCanvasPx / 2));
        const breakY = findCleanBreak(canvas, idealCutY, searchFrom, searchTo, bgRgb);
        srcH = Math.max(1, breakY - y);
      }

      // Compose the full-page destination canvas.
      const dest = document.createElement("canvas");
      dest.width  = canvas.width;
      dest.height = fullPageCanvasPx;
      const ctx = dest.getContext("2d");
      if (!ctx) throw new Error("Could not get 2D canvas context");

      // Background fill → creates the top+bottom padding margins.
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, dest.width, dest.height);

      // Content slice drawn at paddingCanvasPx from top.
      ctx.drawImage(
        canvas,
        0, y,               // source origin
        canvas.width, srcH, // source size
        0, paddingCanvasPx, // destination origin (top padding gap)
        canvas.width, srcH, // destination size
      );

      const pageImg = dest.toDataURL("image/jpeg", 0.95);
      if (pageIdx > 0) pdf.addPage([pageWidthPx, pageHeightPx], "portrait");
      pdf.addImage(pageImg, "JPEG", 0, 0, pageWidthPx, pageHeightPx, undefined, "FAST");

      y += srcH;
      pageIdx++;
    }

    pdf.save(options.fileName ?? `${fileStem(data)}.pdf`);
  } finally {
    root.unmount();
    host.remove();
  }
}

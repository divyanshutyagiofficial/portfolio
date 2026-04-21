"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const BOOT_LINES: { text: string; ms: number; tone?: "ok" | "info" | "warn" }[] =
  [
    { text: "[ 0.000000] portfolio.os v2.0.0 booting…", ms: 0 },
    { text: "[ 0.083421] Loading kernel modules", ms: 120, tone: "info" },
    { text: "[ 0.142090] Mounting /dev/identity → /me", ms: 240, tone: "info" },
    { text: "[ 0.310455] Initialising react@19 runtime", ms: 360 },
    { text: "[ 0.488912] tailwindcss@4 :: ok", ms: 480, tone: "ok" },
    { text: "[ 0.612377] framer-motion :: ok", ms: 580, tone: "ok" },
    { text: "[ 0.811093] Probing github.com/dvynshu95 :: ok", ms: 720, tone: "ok" },
    { text: "[ 1.052731] Resume modules ready :: js, .net, java", ms: 880, tone: "ok" },
    { text: "[ 1.234008] Boot complete. Welcome.", ms: 1000, tone: "ok" },
  ];

const TOTAL_MS = 1700;
const STORAGE_KEY = "portfolio.boot.shown.v1";

export function BootSequence() {
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState(0);

  const dismiss = () => {
    try {
      window.sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // ignore
    }
    setVisible(false);
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.sessionStorage.getItem(STORAGE_KEY)) return;
    setVisible(true);
    let cancelled = false;
    const timeouts: ReturnType<typeof setTimeout>[] = [];

    BOOT_LINES.forEach((line, idx) => {
      timeouts.push(
        setTimeout(() => {
          if (!cancelled) setStep(idx + 1);
        }, line.ms),
      );
    });

    timeouts.push(
      setTimeout(() => {
        if (cancelled) return;
        try {
          window.sessionStorage.setItem(STORAGE_KEY, "1");
        } catch {
          // ignore
        }
        setVisible(false);
      }, TOTAL_MS),
    );

    return () => {
      cancelled = true;
      timeouts.forEach((t) => clearTimeout(t));
    };
  }, []);

  // Allow Esc / Enter / Space to skip
  useEffect(() => {
    if (!visible) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        dismiss();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] bg-(--color-bg) flex items-center justify-center px-4"
        >
          <button
            onClick={dismiss}
            className="absolute top-4 right-4 px-3 py-1.5 rounded-md border border-(--color-border-2) text-xs text-(--color-fg-dim) hover:text-(--color-fg) hover:border-(--color-fg-muted) font-sans transition-colors"
            aria-label="Skip intro animation"
          >
            Skip intro →
          </button>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[11px] text-(--color-fg-muted) font-sans hidden sm:block">
            press Esc, Enter or Space to skip
          </div>
          <div className="w-full max-w-2xl font-mono text-xs sm:text-sm">
            {BOOT_LINES.slice(0, step).map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.18 }}
                className="flex gap-2"
              >
                <span
                  className={
                    line.tone === "ok"
                      ? "text-(--color-prompt)"
                      : line.tone === "warn"
                        ? "text-(--color-warn)"
                        : "text-(--color-fg-dim)"
                  }
                >
                  {line.tone === "ok" ? "[ ok ]" : "[ .. ]"}
                </span>
                <span className="text-(--color-fg-dim)">{line.text}</span>
              </motion.div>
            ))}
            <div className="mt-2 flex items-baseline gap-2 text-(--color-fg)">
              <span className="text-(--color-prompt)">$</span>
              <span
                aria-hidden
                className="inline-block w-2 h-4 bg-(--color-cursor) animate-caret-blink"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

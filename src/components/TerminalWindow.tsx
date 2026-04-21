"use client";

import { ReactNode } from "react";

interface Props {
  /** e.g. "~/portfolio/projects.tsx" */
  path?: string;
  /** Title shown in the title bar centre, defaults to a tilde path. */
  title?: string;
  /** Optional right-side hint text, e.g. "branch: main" */
  hint?: string;
  /** When false, hides the macOS-style traffic lights. */
  showDots?: boolean;
  className?: string;
  bodyClassName?: string;
  children: ReactNode;
}

export function TerminalWindow({
  path,
  title,
  hint,
  showDots = true,
  className = "",
  bodyClassName = "",
  children,
}: Props) {
  return (
    <div className={`term-window ${className}`}>
      <div className="term-titlebar">
        {showDots && (
          <div className="flex gap-1.5">
            <span className="dot dot-red" />
            <span className="dot dot-yellow" />
            <span className="dot dot-green" />
          </div>
        )}
        <div className="flex-1 text-center truncate">
          {title ?? (
            <span className="font-mono">
              <span className="text-(--color-fg-muted)">~/</span>
              <span className="text-(--color-fg-dim)">{path}</span>
            </span>
          )}
        </div>
        {hint && (
          <span className="text-xs text-(--color-fg-muted) hidden sm:inline">
            {hint}
          </span>
        )}
      </div>
      <div className={`p-5 sm:p-7 ${bodyClassName}`}>{children}</div>
    </div>
  );
}

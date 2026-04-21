"use client";

interface Props {
  /** What's after the `$` */
  command: string;
  /** Optional path between user and `$`, defaults to ~/portfolio */
  cwd?: string;
  /** When true, append a blinking caret after the command. */
  caret?: boolean;
  className?: string;
}

/**
 * Renders a fake bash prompt:  divyanshu@dev:~/portfolio $ <command>
 */
export function Prompt({
  command,
  cwd = "~/portfolio",
  caret = false,
  className = "",
}: Props) {
  return (
    <div
      className={`flex items-baseline gap-2 font-mono text-sm flex-wrap ${className}`}
    >
      <span className="text-(--color-prompt) text-glow shrink-0">
        divyanshu@dev
      </span>
      <span className="text-(--color-fg-muted) shrink-0">:</span>
      <span className="text-(--color-link) shrink-0">{cwd}</span>
      <span className="text-(--color-fg-muted) shrink-0">$</span>
      <span className="text-(--color-fg) break-all">
        {command}
        {caret && (
          <span
            aria-hidden
            className="inline-block w-2 h-4 align-middle bg-(--color-cursor) ml-1 animate-caret-blink"
          />
        )}
      </span>
    </div>
  );
}

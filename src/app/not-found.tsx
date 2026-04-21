import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="term-window max-w-lg w-full">
        <div className="term-titlebar">
          <div className="flex gap-1.5">
            <span className="dot dot-red" />
            <span className="dot dot-yellow" />
            <span className="dot dot-green" />
          </div>
          <span className="flex-1 text-center font-mono text-xs">~/error</span>
        </div>
        <div className="p-6 font-mono text-sm space-y-3">
          <p>
            <span className="text-(--color-prompt)">$</span>{" "}
            <span className="text-(--color-fg)">cd</span>{" "}
            <span className="text-(--color-string)">{"/<wherever you tried to go>"}</span>
          </p>
          <p className="text-(--color-string)">
            bash: cd: No such file or directory
          </p>
          <p className="text-(--color-fg-muted)">
            # exit code: 404
          </p>
          <p className="pt-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded border border-(--color-link) text-(--color-link) hover:bg-(--color-link) hover:text-(--color-bg)"
            >
              cd ~/
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}

"use client";

import { useEffect, useState } from "react";
import { GitBranch, Wifi, Command } from "lucide-react";

interface Props {
  onOpenPalette?: () => void;
}

export function StatusBar({ onOpenPalette }: Props) {
  const [time, setTime] = useState<string>("");
  const [online, setOnline] = useState<boolean>(true);

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setTime(
        d.toLocaleTimeString(undefined, {
          hour: "2-digit",
          minute: "2-digit",
        }),
      );
    };
    tick();
    const id = setInterval(tick, 30_000);

    const update = () => setOnline(navigator.onLine);
    update();
    window.addEventListener("online", update);
    window.addEventListener("offline", update);

    return () => {
      clearInterval(id);
      window.removeEventListener("online", update);
      window.removeEventListener("offline", update);
    };
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 h-7 border-t border-(--color-border) bg-(--color-surface)/95 backdrop-blur supports-[backdrop-filter]:bg-(--color-surface)/80">
      <div className="h-full flex items-center justify-between px-3 text-[11px] font-mono text-(--color-fg-dim)">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-(--color-prompt)">
            <GitBranch size={12} />
            main
          </span>
          <span className="hidden sm:flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-(--color-prompt) animate-pulse" />
            ready
          </span>
          <span className="hidden md:inline">UTF-8</span>
          <span className="hidden md:inline">LF</span>
          <span className="hidden lg:inline">TypeScript React</span>
        </div>
        <div className="flex items-center gap-4">
          {onOpenPalette && (
            <button
              onClick={onOpenPalette}
              className="hidden sm:flex items-center gap-1.5 hover:text-(--color-fg) transition-colors cursor-pointer"
            >
              <Command size={12} />
              <span>K</span>
              <span className="text-(--color-fg-muted)">to navigate</span>
            </button>
          )}
          <span className="hidden sm:flex items-center gap-1.5">
            <Wifi
              size={12}
              className={
                online ? "text-(--color-prompt)" : "text-(--color-string)"
              }
            />
            {online ? "online" : "offline"}
          </span>
          <span suppressHydrationWarning>{time}</span>
        </div>
      </div>
    </div>
  );
}

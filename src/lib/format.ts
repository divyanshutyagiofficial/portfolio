export function relativeTime(iso: string): string {
  const then = +new Date(iso);
  const now = Date.now();
  const diff = Math.max(0, now - then);
  const minute = 60_000;
  const hour = minute * 60;
  const day = hour * 24;
  const week = day * 7;
  const month = day * 30;
  const year = day * 365;

  if (diff < hour) return `${Math.max(1, Math.round(diff / minute))} min ago`;
  if (diff < day) return `${Math.round(diff / hour)} hr ago`;
  if (diff < week) return `${Math.round(diff / day)} d ago`;
  if (diff < month) return `${Math.round(diff / week)} wk ago`;
  if (diff < year) return `${Math.round(diff / month)} mo ago`;
  return `${Math.round(diff / year)} yr ago`;
}

export function shortHash(seed: string | number): string {
  const s = String(seed);
  let h = 5381;
  for (let i = 0; i < s.length; i += 1) {
    h = ((h << 5) + h) ^ s.charCodeAt(i);
  }
  return (h >>> 0).toString(16).padStart(7, "0").slice(0, 7);
}

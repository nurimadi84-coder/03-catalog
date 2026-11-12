import type { StatusBadgeProps } from "@/types";

export function StatusBadge({ label }: StatusBadgeProps) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-sm text-emerald-800 dark:text-emerald-300">
      <span className="relative flex h-2.5 w-2.5" aria-hidden>
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
      </span>
      <span className="font-medium tracking-tight">{label}</span>
    </div>
  );
}

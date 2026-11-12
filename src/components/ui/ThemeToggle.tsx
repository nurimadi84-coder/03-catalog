"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import type { ThemeToggleProps } from "@/types";

export function ThemeToggle({ className = "" }: ThemeToggleProps) {
  const { resolvedTheme, toggleTheme, mounted } = useTheme();

  if (!mounted) {
    return (
      <button
        type="button"
        aria-label="Переключить тему"
        className={`inline-flex h-10 w-10 items-center justify-center rounded-full border border-stone-200 bg-white/80 text-stone-700 shadow-sm backdrop-blur dark:border-zinc-700 dark:bg-zinc-900/80 dark:text-zinc-200 ${className}`}
      >
        <Sun className="h-4 w-4 opacity-0" aria-hidden />
      </button>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Включить светлую тему" : "Включить тёмную тему"}
      className={`inline-flex h-10 w-10 items-center justify-center rounded-full border border-stone-200 bg-white/80 text-stone-700 shadow-sm backdrop-blur transition-all duration-200 hover:scale-105 active:scale-[0.98] dark:border-zinc-700 dark:bg-zinc-900/80 dark:text-zinc-200 ${className}`}
    >
      {isDark ? (
        <Sun className="h-4 w-4" aria-hidden />
      ) : (
        <Moon className="h-4 w-4" aria-hidden />
      )}
    </button>
  );
}

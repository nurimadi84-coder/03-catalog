"use client";

import { useTheme as useNextTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import type { ThemeMode } from "@/types";

interface UseThemeReturn {
  theme: ThemeMode | undefined;
  resolvedTheme: "light" | "dark" | undefined;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
  mounted: boolean;
}

const emptySubscribe = (): (() => void) => () => undefined;
const getClientSnapshot = (): boolean => true;
const getServerSnapshot = (): boolean => false;

export function useTheme(): UseThemeReturn {
  const { theme, resolvedTheme, setTheme } = useNextTheme();
  const mounted = useSyncExternalStore(
    emptySubscribe,
    getClientSnapshot,
    getServerSnapshot
  );

  const toggleTheme = (): void => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return {
    theme: theme as ThemeMode | undefined,
    resolvedTheme: resolvedTheme as "light" | "dark" | undefined,
    setTheme: setTheme as (theme: ThemeMode) => void,
    toggleTheme,
    mounted,
  };
}

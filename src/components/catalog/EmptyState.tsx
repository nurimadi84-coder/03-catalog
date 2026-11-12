"use client";

import { SearchX } from "lucide-react";

interface EmptyStateProps {
  query: string;
  onReset: () => void;
}

export function EmptyState({ query, onReset }: EmptyStateProps) {
  const message = query
    ? `По запросу «${query}» ничего не найдено`
    : "В этой категории пока нет товаров";

  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-stone-300 bg-stone-50/80 px-6 py-14 text-center dark:border-zinc-700 dark:bg-zinc-900/50">
      <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-stone-200/80 text-stone-600 dark:bg-zinc-800 dark:text-zinc-300">
        <SearchX className="h-7 w-7" aria-hidden />
      </div>
      <p className="max-w-sm text-base font-medium text-stone-800 dark:text-zinc-100">
        {message}
      </p>
      <p className="mt-2 max-w-sm text-sm text-stone-500 dark:text-zinc-400">
        Попробуйте другой запрос или сбросьте фильтры.
      </p>
      <button
        type="button"
        onClick={onReset}
        className="mt-6 inline-flex items-center justify-center rounded-2xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-600/20 transition-colors hover:bg-emerald-500 active:scale-[0.98]"
      >
        Сбросить фильтры
      </button>
    </div>
  );
}

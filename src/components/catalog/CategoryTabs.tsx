"use client";

import { motion } from "framer-motion";
import { useSyncExternalStore } from "react";
import { CATEGORIES } from "@/constants/catalogData";
import type { ProductCategory } from "@/types/catalog";

interface CategoryTabsProps {
  selectedCategory: ProductCategory;
  onSelect: (category: ProductCategory) => void;
  counts: Record<ProductCategory, number>;
}

const emptySubscribe = (): (() => void) => () => undefined;
const getClientSnapshot = (): boolean => true;
const getServerSnapshot = (): boolean => false;

export function CategoryTabs({
  selectedCategory,
  onSelect,
  counts,
}: CategoryTabsProps) {
  const mounted = useSyncExternalStore(
    emptySubscribe,
    getClientSnapshot,
    getServerSnapshot
  );

  return (
    <div
      role="tablist"
      aria-label="Категории каталога"
      className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 pb-1"
    >
      {CATEGORIES.map((category) => {
        const isActive = selectedCategory === category.id;
        const count = counts[category.id] ?? 0;

        return (
          <button
            key={category.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onSelect(category.id)}
            className={`relative shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              isActive
                ? "text-white"
                : "border border-stone-200 bg-white text-stone-600 hover:bg-stone-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
            }`}
          >
            {isActive ? (
              mounted ? (
                <motion.span
                  layoutId="activeCategory"
                  className="absolute inset-0 rounded-full bg-emerald-600 shadow-md shadow-emerald-600/25 dark:bg-emerald-500"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              ) : (
                <span className="absolute inset-0 rounded-full bg-emerald-600 shadow-md shadow-emerald-600/25 dark:bg-emerald-500" />
              )
            ) : null}
            <span className="relative z-10 whitespace-nowrap">
              {category.label} ({count})
            </span>
          </button>
        );
      })}
    </div>
  );
}

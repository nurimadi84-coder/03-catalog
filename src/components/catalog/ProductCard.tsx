"use client";

import { Star } from "lucide-react";
import Image from "next/image";
import { CATEGORIES } from "@/constants/catalogData";
import type { Product, ProductStatus } from "@/types/catalog";
import { formatPriceFrom } from "@/utils/formatPrice";

interface ProductCardProps {
  product: Product;
  onOpen: (product: Product) => void;
}

const STATUS_BADGE_CLASS: Record<ProductStatus, string> = {
  hit: "bg-amber-500 text-white",
  new: "bg-emerald-500 text-white",
  pre_order: "bg-indigo-500 text-white",
  in_stock: "bg-stone-700 text-white dark:bg-zinc-600",
};

function categoryLabel(category: Product["category"]): string {
  return CATEGORIES.find((item) => item.id === category)?.label ?? category;
}

function materialBadge(material: string): string {
  const first = material.split(/[/,]/)[0]?.trim() ?? material;
  return first.length > 22 ? `${first.slice(0, 20)}…` : first;
}

export function ProductCard({ product, onOpen }: ProductCardProps) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-stone-200 bg-white transition-shadow hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-950 dark:hover:shadow-emerald-950/20">
      <div className="relative aspect-[4/3] overflow-hidden bg-stone-100 dark:bg-zinc-900">
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span
          className={`absolute top-3 left-3 rounded-full px-2.5 py-1 text-xs font-semibold shadow-sm ${STATUS_BADGE_CLASS[product.status]}`}
        >
          {product.statusLabel}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="space-y-1.5">
          <h3 className="font-display line-clamp-2 min-h-[2.75em] text-lg leading-snug font-semibold text-stone-900 dark:text-zinc-50">
            {product.title}
          </h3>
          <p className="line-clamp-2 min-h-[3.25em] text-sm leading-relaxed text-stone-500 dark:text-zinc-400">
            {product.shortDescription}
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5">
          <span className="rounded-full border border-stone-200 bg-stone-50 px-2.5 py-0.5 text-xs font-medium text-stone-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
            {categoryLabel(product.category)}
          </span>
          <span className="rounded-full border border-stone-200 bg-stone-50 px-2.5 py-0.5 text-xs font-medium text-stone-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
            {materialBadge(product.specs.material)}
          </span>
          <span className="rounded-full border border-stone-200 bg-stone-50 px-2.5 py-0.5 text-xs font-medium text-stone-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
            {product.specs.warranty}
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-sm text-stone-600 dark:text-zinc-300">
          <Star
            className="h-4 w-4 fill-amber-400 text-amber-400"
            aria-hidden
          />
          <span className="font-medium">{product.rating.toFixed(1)}</span>
          <span className="text-stone-400 dark:text-zinc-500">
            ({product.reviewsCount})
          </span>
        </div>

        <p className="text-base font-semibold text-stone-900 dark:text-zinc-50">
          {formatPriceFrom(product.priceFrom)}
        </p>

        <button
          type="button"
          onClick={() => onOpen(product)}
          className="mt-auto inline-flex w-full items-center justify-center rounded-2xl border border-emerald-600/20 bg-emerald-50 px-4 py-2.5 text-sm font-semibold text-emerald-800 transition-colors hover:bg-emerald-100 active:scale-[0.98] dark:border-emerald-400/20 dark:bg-emerald-950/40 dark:text-emerald-300 dark:hover:bg-emerald-950/70"
        >
          Подробнее / Заказать
        </button>
      </div>
    </article>
  );
}

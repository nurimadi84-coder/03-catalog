"use client";

import { useState } from "react";
import { CategoryTabs } from "@/components/catalog/CategoryTabs";
import { EmptyState } from "@/components/catalog/EmptyState";
import { ProductGrid } from "@/components/catalog/ProductGrid";
import { ProductModal } from "@/components/catalog/ProductModal";
import { SearchBar } from "@/components/catalog/SearchBar";
import { useCatalogFilter } from "@/hooks/useCatalogFilter";
import type { Product } from "@/types/catalog";

interface CatalogContainerProps {
  showBackLink?: boolean;
}

export function CatalogContainer({
  showBackLink = true,
}: CatalogContainerProps) {
  const {
    searchQuery,
    setSearchQuery,
    debouncedQuery,
    selectedCategory,
    setSelectedCategory,
    filteredProducts,
    categoryCounts,
    resetFilters,
  } = useCatalogFilter();

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="desktop-atmosphere min-h-screen">
      <main className="mx-auto min-h-screen w-full max-w-6xl px-4 py-6 sm:my-8 sm:min-h-[auto] sm:rounded-3xl sm:border sm:border-neutral-200 sm:bg-[var(--card)] sm:px-6 sm:py-8 sm:shadow-2xl dark:sm:border-neutral-800">
        <div className="mb-6 space-y-2">
          {showBackLink ? (
            <a
              href="http://localhost:3000"
              className="text-xs font-medium text-stone-500 transition-colors hover:text-emerald-700 dark:text-zinc-400 dark:hover:text-emerald-400"
            >
              ← На главную
            </a>
          ) : null}
          <h1 className="font-display text-3xl font-semibold tracking-tight text-stone-900 dark:text-zinc-50 sm:text-4xl">
            Каталог мягкой мебели
          </h1>
          <p className="max-w-2xl text-sm leading-relaxed text-stone-500 dark:text-zinc-400">
            Реальные фото шкафов и кроватей с Instagram{" "}
            <a
              href="https://www.instagram.com/mebel_almaty2016/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-emerald-700 underline-offset-2 hover:underline dark:text-emerald-400"
            >
              @mebel_almaty2016
            </a>
            . Выберите модель и оформите быстрый заказ в WhatsApp.
          </p>
        </div>

        <div className="space-y-5">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
          <CategoryTabs
            selectedCategory={selectedCategory}
            onSelect={setSelectedCategory}
            counts={categoryCounts}
          />

          <p className="text-sm text-stone-500 dark:text-zinc-400">
            Найдено:{" "}
            <span className="font-medium text-stone-800 dark:text-zinc-200">
              {filteredProducts.length}
            </span>
          </p>

          {filteredProducts.length === 0 ? (
            <EmptyState query={debouncedQuery || searchQuery} onReset={resetFilters} />
          ) : (
            <ProductGrid
              products={filteredProducts}
              onOpenProduct={openProduct}
            />
          )}
        </div>
      </main>

      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
}

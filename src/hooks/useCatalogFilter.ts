"use client";

import { useEffect, useMemo, useState } from "react";
import { PRODUCTS_DATA } from "@/constants/catalogData";
import type {
  CatalogFilterState,
  Product,
  ProductCategory,
} from "@/types/catalog";

const DEBOUNCE_MS = 300;

function matchesSearch(product: Product, query: string): boolean {
  if (!query) return true;

  const haystack = [
    product.title,
    product.shortDescription,
    product.specs.material,
  ]
    .join(" ")
    .toLowerCase();

  return haystack.includes(query);
}

export function useCatalogFilter() {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState<ProductCategory>("all");

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedQuery(searchQuery.trim().toLowerCase());
    }, DEBOUNCE_MS);

    return () => window.clearTimeout(timer);
  }, [searchQuery]);

  const filteredProducts = useMemo(() => {
    return PRODUCTS_DATA.filter((product) => {
      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;
      return matchesCategory && matchesSearch(product, debouncedQuery);
    });
  }, [debouncedQuery, selectedCategory]);

  const categoryCounts = useMemo(() => {
    const counts: Record<ProductCategory, number> = {
      all: PRODUCTS_DATA.length,
      beds: 0,
      wardrobes: 0,
      kids: 0,
    };

    for (const product of PRODUCTS_DATA) {
      counts[product.category] += 1;
    }

    return counts;
  }, []);

  const resetFilters = () => {
    setSearchQuery("");
    setDebouncedQuery("");
    setSelectedCategory("all");
  };

  const filterState: CatalogFilterState = {
    searchQuery,
    selectedCategory,
  };

  return {
    searchQuery,
    setSearchQuery,
    debouncedQuery,
    selectedCategory,
    setSelectedCategory,
    filteredProducts,
    categoryCounts,
    resetFilters,
    filterState,
    totalCount: PRODUCTS_DATA.length,
  };
}

"use client";

import type { Product } from "@/types/catalog";
import { ProductCard } from "@/components/catalog/ProductCard";

interface ProductGridProps {
  products: Product[];
  onOpenProduct: (product: Product) => void;
}

export function ProductGrid({ products, onOpenProduct }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onOpen={onOpenProduct}
        />
      ))}
    </div>
  );
}

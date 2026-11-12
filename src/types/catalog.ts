export type ProductCategory = "all" | "beds" | "wardrobes" | "kids";

export type ProductStatus = "in_stock" | "pre_order" | "hit" | "new";

export interface Product {
  id: string;
  title: string;
  category: Exclude<ProductCategory, "all">;
  priceFrom: number;
  image: string;
  gallery: string[];
  status: ProductStatus;
  statusLabel: string;
  rating: number;
  reviewsCount: number;
  shortDescription: string;
  fullDescription: string;
  specs: {
    material: string;
    dimensions: string;
    warranty: string;
    productionTime: string;
  };
}

export interface CatalogFilterState {
  searchQuery: string;
  selectedCategory: ProductCategory;
}

export interface CategoryItem {
  id: ProductCategory;
  label: string;
  count?: number;
}

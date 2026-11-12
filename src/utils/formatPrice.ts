/** Stable KZT price formatting (avoids ru-RU narrow-space hydration mismatches). */
export function formatPriceFrom(price: number): string {
  const grouped = String(Math.round(price)).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return `от ${grouped} тг`;
}

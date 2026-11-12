import type { Metadata } from "next";
import { CatalogContainer } from "@/components/catalog/CatalogContainer";

export const metadata: Metadata = {
  title: "Каталог мягкой мебели — кровати и шкафы",
  description:
    "Интерактивный каталог кроватей и шкафов на заказ: поиск, категории и быстрый заказ в WhatsApp.",
};

export default function CatalogPage() {
  return <CatalogContainer />;
}

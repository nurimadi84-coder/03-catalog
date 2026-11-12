"use client";

import { FormEvent, useState } from "react";
import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";
import { formatPhoneInput, isValidKzPhone, toE164 } from "@/lib/phone";
import type { Product } from "@/types/catalog";
import { formatPriceFrom } from "@/utils/formatPrice";

interface QuickOrderFormProps {
  product: Product;
}

function buildWhatsAppUrl(
  product: Product,
  name: string,
  phone: string
): string {
  const text = [
    "Здравствуйте! Хочу оформить быстрый заказ из каталога:",
    `Товар: ${product.title}`,
    `Артикул: ${product.id}`,
    `Ориентировочная цена: ${formatPriceFrom(product.priceFrom)}`,
    `Имя: ${name.trim()}`,
    `Телефон: ${toE164(phone)}`,
  ].join("\n");

  return `https://wa.me/77078274377?text=${encodeURIComponent(text)}`;
}

export function QuickOrderForm({ product }: QuickOrderFormProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors: { name?: string; phone?: string } = {};
    if (!name.trim() || name.trim().length < 2) {
      nextErrors.name = "Укажите имя (минимум 2 символа)";
    }
    if (!isValidKzPhone(phone)) {
      nextErrors.phone = "Введите номер в формате +7 (7XX) XXX-XX-XX";
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    window.open(buildWhatsAppUrl(product, name, phone), "_blank", "noopener,noreferrer");
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="space-y-3 rounded-2xl border border-emerald-600/15 bg-emerald-50/60 p-4 dark:border-emerald-400/15 dark:bg-emerald-950/30"
    >
      <div>
        <h3 className="text-sm font-semibold text-stone-900 dark:text-zinc-50">
          Быстрый заказ в 2 клика
        </h3>
        <p className="mt-1 text-xs text-stone-500 dark:text-zinc-400">
          Оставьте контакты — откроем WhatsApp с готовым текстом заказа.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1">
          <label
            htmlFor={`order-name-${product.id}`}
            className="text-xs font-medium text-stone-600 dark:text-zinc-300"
          >
            Ваше имя
          </label>
          <input
            id={`order-name-${product.id}`}
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Айгерим"
            autoComplete="name"
            className="w-full rounded-xl border border-stone-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
          />
          {errors.name ? (
            <p className="text-xs text-rose-600 dark:text-rose-400">{errors.name}</p>
          ) : null}
        </div>

        <div className="space-y-1">
          <label
            htmlFor={`order-phone-${product.id}`}
            className="text-xs font-medium text-stone-600 dark:text-zinc-300"
          >
            WhatsApp
          </label>
          <input
            id={`order-phone-${product.id}`}
            type="tel"
            value={phone}
            onChange={(event) => setPhone(formatPhoneInput(event.target.value))}
            placeholder="+7 (7XX) XXX-XX-XX"
            autoComplete="tel"
            className="w-full rounded-xl border border-stone-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
          />
          {errors.phone ? (
            <p className="text-xs text-rose-600 dark:text-rose-400">
              {errors.phone}
            </p>
          ) : null}
        </div>
      </div>

      <button
        type="submit"
        className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-600/25 transition-colors hover:bg-emerald-500 active:scale-[0.98]"
      >
        <MessageCircle className="h-4 w-4" aria-hidden />
        Отправить заказ в WhatsApp
      </button>

      <p className="text-center text-[11px] text-stone-500 dark:text-zinc-500">
        Продавец ответит в WhatsApp · {siteConfig.phone}
      </p>
    </form>
  );
}

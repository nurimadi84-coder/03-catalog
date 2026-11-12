"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import { QuickOrderForm } from "@/components/catalog/QuickOrderForm";
import { siteConfig } from "@/config/siteConfig";
import type { Product } from "@/types/catalog";
import { formatPriceFrom } from "@/utils/formatPrice";

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

function getFocusable(container: HTMLElement): HTMLElement[] {
  return Array.from(
    container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
  ).filter((element) => {
    if (element.getAttribute("aria-hidden") === "true") return false;
    if (element.getAttribute("aria-disabled") === "true") return false;
    return element.getClientRects().length > 0;
  });
}

function ProductGallery({ product }: { product: Product }) {
  const [activeImage, setActiveImage] = useState(0);
  const currentSrc = product.gallery[activeImage] ?? product.image;

  return (
    <div className="space-y-3">
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-stone-100 dark:bg-zinc-900">
        <Image
          src={currentSrc}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 100vw, 672px"
          className="object-cover"
          priority
        />
      </div>

      {product.gallery.length > 1 ? (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {product.gallery.map((src, index) => (
            <button
              key={src}
              type="button"
              onClick={() => setActiveImage(index)}
              aria-label={`Фото ${index + 1}`}
              aria-pressed={activeImage === index}
              className={`relative h-16 w-20 shrink-0 overflow-hidden rounded-xl border-2 transition-colors ${
                activeImage === index
                  ? "border-emerald-500"
                  : "border-transparent opacity-80 hover:opacity-100"
              }`}
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);
  const instagramUrl =
    siteConfig.socials.find((item) => item.name === "Instagram")?.url ??
    "https://instagram.com/mebel_almaty2016";

  useEffect(() => {
    if (!isOpen || !product) return;

    previouslyFocused.current = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";

    const focusTimer = window.setTimeout(() => {
      closeRef.current?.focus();
    }, 0);

    const onKeyDown = (event: KeyboardEvent): void => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) return;

      const focusable = getFocusable(panelRef.current);
      if (focusable.length === 0) {
        event.preventDefault();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      } else if (!panelRef.current.contains(active)) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      previouslyFocused.current?.focus?.();
    };
  }, [isOpen, product, onClose]);

  return (
    <AnimatePresence>
      {isOpen && product ? (
        <div className="fixed inset-0 z-50 flex items-end justify-center p-3 sm:items-center sm:p-6">
          <motion.button
            type="button"
            tabIndex={-1}
            aria-label="Закрыть"
            className="absolute inset-0 bg-stone-950/55 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className="relative z-10 max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-stone-200 bg-white shadow-2xl dark:border-zinc-800 dark:bg-zinc-950"
          >
            <div className="sticky top-0 z-10 flex items-start justify-between gap-3 border-b border-stone-200 bg-white/95 px-4 py-3 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/95 sm:px-5">
              <h2
                id={titleId}
                className="font-display pr-2 text-xl font-semibold tracking-tight text-stone-900 dark:text-zinc-50"
              >
                {product.title}
              </h2>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Закрыть"
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-stone-200 text-stone-600 transition-colors hover:bg-stone-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-900"
              >
                <X className="h-4 w-4" aria-hidden />
              </button>
            </div>

            <div className="space-y-5 p-4 sm:p-5">
              <ProductGallery key={product.id} product={product} />

              <p className="text-sm leading-relaxed text-stone-600 dark:text-zinc-400">
                {product.fullDescription}
              </p>

              <div>
                <h3 className="mb-2 text-sm font-semibold tracking-wide text-stone-800 uppercase dark:text-zinc-200">
                  Характеристики
                </h3>
                <dl className="overflow-hidden rounded-2xl border border-stone-200 dark:border-zinc-800">
                  {(
                    [
                      ["Материал", product.specs.material],
                      ["Габариты", product.specs.dimensions],
                      ["Гарантия", product.specs.warranty],
                      ["Срок изготовления", product.specs.productionTime],
                      ["Цена", formatPriceFrom(product.priceFrom)],
                    ] as const
                  ).map(([label, value], index) => (
                    <div
                      key={label}
                      className={`grid grid-cols-1 gap-1 px-4 py-3 text-sm sm:grid-cols-[140px_1fr] sm:gap-4 ${
                        index % 2 === 0
                          ? "bg-stone-50 dark:bg-zinc-900/60"
                          : "bg-white dark:bg-zinc-950"
                      }`}
                    >
                      <dt className="font-medium text-stone-500 dark:text-zinc-400">
                        {label}
                      </dt>
                      <dd className="text-stone-800 dark:text-zinc-200">
                        {value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="flex items-center gap-3 rounded-2xl border border-stone-200 bg-stone-50/80 p-3 dark:border-zinc-800 dark:bg-zinc-900/50">
                <Image
                  src={siteConfig.avatarUrl}
                  alt={siteConfig.title}
                  width={48}
                  height={48}
                  className="h-12 w-12 rounded-full border border-stone-200 object-cover dark:border-zinc-700"
                />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-stone-900 dark:text-zinc-50">
                    {siteConfig.title}
                  </p>
                  <p className="text-xs text-stone-500 dark:text-zinc-400">
                    Продавец · {siteConfig.statusShort}
                  </p>
                  <p className="mt-0.5 text-xs text-stone-500 dark:text-zinc-400">
                    {siteConfig.phone}
                  </p>
                </div>
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-stone-200 text-stone-600 transition-colors hover:bg-white dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-950"
                  aria-label="Instagram продавца"
                >
                  <ExternalLink className="h-4 w-4" aria-hidden />
                </a>
              </div>

              <QuickOrderForm key={product.id} product={product} />
            </div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}

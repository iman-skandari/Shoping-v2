"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { products, formatPrice, getPricing, specialOffer } from "@/data/mockData";

const pad = (n: number) =>
  new Intl.NumberFormat("fa-IR", { minimumIntegerDigits: 2 }).format(n);

function useCountdown(durationMs: number) {
  const [left, setLeft] = useState<number | null>(null);

  useEffect(() => {
    const end = Date.now() + durationMs;
    const tick = () => setLeft(Math.max(0, end - Date.now()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [durationMs]);

  return left;
}

export default function OfferBanner() {
  const product = products.find((p) => p.id === specialOffer.productId);
  const left = useCountdown(specialOffer.durationMs);

  if (!product) return null;

  const total = Math.floor((left ?? 0) / 1000);
  const units = [
    { label: "روز", value: Math.floor(total / 86400) },
    { label: "ساعت", value: Math.floor((total % 86400) / 3600) },
    { label: "دقیقه", value: Math.floor((total % 3600) / 60) },
    { label: "ثانیه", value: total % 60 },
  ];

  const { unitPrice, listPrice } = getPricing(product);

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative isolate overflow-hidden rounded-[2rem] bg-gray-950 text-white shadow-2xl shadow-indigo-950/30">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-32 start-1/4 -z-10 h-96 w-96 rounded-full bg-indigo-600/40 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-40 end-0 -z-10 h-96 w-96 rounded-full bg-amber-500/20 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:22px_22px]"
          />

          <div className="grid items-center gap-10 p-8 md:grid-cols-2 lg:p-14">
            <div className="space-y-6">
              <span className="inline-flex items-center gap-2 rounded-full bg-amber-400 px-4 py-1.5 text-sm font-bold text-amber-950">
                {new Intl.NumberFormat("fa-IR").format(specialOffer.discountPercent)}٪ تخفیف
              </span>

              <div>
                <h2 className="text-3xl font-bold leading-tight lg:text-4xl">{specialOffer.title}</h2>
                <p className="mt-3 text-gray-300">{product.name}</p>
                <p className="mt-1 text-sm text-gray-400">{specialOffer.description}</p>
              </div>

              <div className="flex flex-wrap items-end gap-3">
                <span className="text-3xl font-extrabold lg:text-4xl">{formatPrice(unitPrice)}</span>
                <span className="pb-1 text-gray-500 line-through">{formatPrice(listPrice)}</span>
              </div>

              <div className="flex gap-3" dir="rtl">
                {units.map((u) => (
                  <div
                    key={u.label}
                    className="w-16 rounded-2xl border border-white/10 bg-white/5 py-3 text-center backdrop-blur-sm sm:w-20"
                  >
                    <div className="text-2xl font-bold tabular-nums sm:text-3xl">{pad(u.value)}</div>
                    <div className="mt-1 text-xs text-gray-400">{u.label}</div>
                  </div>
                ))}
              </div>

              <Link
                href={`/products/${product.id}`}
                className="inline-block rounded-2xl bg-white px-8 py-4 font-semibold text-gray-900 shadow-xl shadow-black/20 transition hover:-translate-y-0.5 hover:bg-amber-50"
              >
                خرید با این تخفیف
              </Link>
            </div>

            <div className="relative mx-auto aspect-square w-full max-w-sm">
              <div aria-hidden className="absolute inset-4 rotate-6 rounded-[2rem] bg-gradient-to-br from-indigo-500/50 to-sky-400/30" />
              <div className="relative h-full w-full overflow-hidden rounded-[2rem] ring-1 ring-white/20">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(min-width: 768px) 24rem, 80vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

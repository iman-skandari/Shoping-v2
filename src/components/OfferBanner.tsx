"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { products, formatPrice, specialOffer } from "@/data/mockData";

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

  const salePrice =
    Math.round((product.price * (1 - specialOffer.discountPercent / 100)) / 1000) * 1000;

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-bl from-gray-900 via-indigo-950 to-gray-900 text-white">
          <div className="grid md:grid-cols-2 gap-8 items-center p-8 lg:p-12">
            <div className="space-y-6">
              <span className="inline-block bg-orange-500 text-sm font-medium px-4 py-1.5 rounded-full">
                {specialOffer.discountPercent}٪ تخفیف
              </span>

              <h2 className="text-3xl lg:text-4xl font-bold leading-tight">
                {specialOffer.title}
              </h2>
              <p className="text-gray-300">{product.name}</p>

              <div className="flex items-end gap-3">
                <span className="text-3xl font-bold">{formatPrice(salePrice)}</span>
                <span className="text-gray-400 line-through">
                  {formatPrice(product.price)}
                </span>
              </div>

              <div className="flex gap-3" dir="rtl">
                {units.map((u) => (
                  <div
                    key={u.label}
                    className="w-16 sm:w-20 rounded-xl bg-white/10 backdrop-blur-sm py-3 text-center"
                  >
                    <div className="text-2xl sm:text-3xl font-bold tabular-nums">
                      {pad(u.value)}
                    </div>
                    <div className="text-xs text-gray-300 mt-1">{u.label}</div>
                  </div>
                ))}
              </div>

              <Link
                href="#products"
                className="inline-block bg-white text-gray-900 hover:bg-gray-100 font-semibold px-8 py-3.5 rounded-xl transition"
              >
                خرید با این تخفیف
              </Link>
            </div>

            <div className="relative aspect-square max-w-sm w-full mx-auto rounded-2xl overflow-hidden">
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
    </section>
  );
}
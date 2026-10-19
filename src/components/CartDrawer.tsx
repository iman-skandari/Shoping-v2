"use client";

import Link from "next/link";
import { formatNumber, formatPrice, getPricing } from "@/data/mockData";
import Image from "next/image";
import { useEffect } from "react";
import { useCart } from "@/context/CartContext";
import QuantityStepper from "./QuantityStepper";

export default function CartDrawer() {
  const {
    items,
    totalCount,
    totalPrice,
    isOpen,
    closeCart,
    addItem,
    decrease,
    removeItem,
    clear,
  } = useCart();

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, closeCart]);

  return (
    <div
      className={`fixed inset-0 z-[60] ${isOpen ? "" : "pointer-events-none"}`}
      aria-hidden={!isOpen}
    >
      <div
        onClick={closeCart}
        className={`absolute inset-0 bg-gray-900/50 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"
          }`}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="سبد خرید"
        className={`absolute inset-y-0 end-0 flex w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 ease-out ${isOpen ? "translate-x-0" : "translate-x-full rtl:-translate-x-full"
          }`}
      >
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
          <div>
            <h2 className="text-lg font-bold text-gray-900">سبد خرید</h2>
            <p className="text-sm text-gray-500">
              {totalCount > 0 ? `${formatNumber(totalCount)} کالا` : "خالی"}
            </p>
          </div>
          <button
            type="button"
            onClick={closeCart}
            aria-label="بستن سبد خرید"
            className="p-2 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-50 text-5xl">
              🛍️
            </div>
            <p className="font-semibold text-gray-900">سبد خرید شما خالی است</p>
            <p className="text-sm text-gray-500">
              محصولات مورد علاقه‌ات رو به سبد اضافه کن.
            </p>
            <button
              type="button"
              onClick={closeCart}
              className="mt-2 rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition"
            >
              ادامه خرید
            </button>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-gray-100 overflow-y-auto px-5">
              {items.map(({ product, quantity }) => (
                <li key={product.id} className="flex gap-4 py-4">
                  <Link
                    href={`/products/${product.id}`}
                    onClick={closeCart}
                    className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-gray-100"
                  >
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </Link>

                  <div className="flex min-w-0 flex-1 flex-col justify-between gap-2">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-gray-900">
                        <Link
                          href={`/products/${product.id}`}
                          onClick={closeCart}
                          className="transition hover:text-blue-600"
                        >
                          {product.name}
                        </Link>
                      </h3>
                      <button
                        type="button"
                        onClick={() => removeItem(product.id)}
                        aria-label={`حذف ${product.name}`}
                        className="shrink-0 rounded-full p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-500 transition"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-1 12a2 2 0 01-2 2H8a2 2 0 01-2-2L5 7m5 4v6m4-6v6M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>

                    <div className="flex items-center justify-between gap-2">
                      <QuantityStepper
                        value={quantity}
                        onIncrease={() => addItem(product.id)}
                        onDecrease={() => decrease(product.id)}
                        compact
                      />
                      <span className="text-sm font-bold text-gray-900">
                        {formatPrice(product.price * quantity)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="space-y-4 border-t border-gray-100 bg-gray-50 px-5 py-5">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">مبلغ قابل پرداخت</span>
                <span className="text-xl font-bold text-gray-900">
                  {formatPrice(totalPrice)}
                </span>
              </div>
              <Link
                href="/checkout"
                onClick={closeCart}
                className="block w-full rounded-xl bg-blue-600 py-3.5 text-center font-semibold text-white shadow-lg shadow-blue-600/25 transition hover:bg-blue-700 active:scale-[0.99]"
              >
                ادامه فرایند خرید
              </Link>
              <button
                type="button"
                onClick={clear}
                className="w-full text-sm text-gray-500 hover:text-red-500 transition"
              >
                خالی کردن سبد خرید
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}

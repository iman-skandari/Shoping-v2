"use client";

import { useCart } from "@/context/CartContext";
import { formatNumber } from "@/data/mockData";

export default function CartButton() {
  const { totalCount, openCart } = useCart();

  return (
    <button
      type="button"
      onClick={openCart}
      aria-label="باز کردن سبد خرید"
      className="relative p-2.5 rounded-full text-gray-700 hover:bg-gray-100 hover:text-blue-600 active:scale-95 transition"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
      {totalCount > 0 && (
        <span className="absolute -top-0.5 -end-0.5 min-w-5 h-5 px-1 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center ring-2 ring-white">
          {formatNumber(totalCount)}
        </span>
      )}
    </button>
  );
}
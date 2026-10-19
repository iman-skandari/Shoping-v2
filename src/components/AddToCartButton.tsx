"use client";

import { useCart } from "@/context/CartContext";
import QuantityStepper from "./QuantityStepper";

export default function AddToCartButton({ productId }: { productId: number }) {
  const { getQuantity, addItem, decrease } = useCart();
  const quantity = getQuantity(productId);

  if (quantity === 0) {
    return (
      <button
        type="button"
        onClick={() => addItem(productId)}
        className="bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-sm font-medium px-5 py-2.5 rounded-xl shadow-sm shadow-blue-600/25 transition"
      >
        افزودن
      </button>
    );
  }

  return (
    <QuantityStepper
      value={quantity}
      onIncrease={() => addItem(productId)}
      onDecrease={() => decrease(productId)}
      compact
    />
  );
}
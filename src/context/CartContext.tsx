"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { products, type Product } from "@/data/mockData";

type CartEntry = { id: number; quantity: number };

export type CartItem = { product: Product; quantity: number };

type CartContextValue = {
  items: CartItem[];
  totalCount: number;
  totalPrice: number;
  isOpen: boolean;
  getQuantity: (id: number) => number;
  addItem: (id: number) => void;
  increase: (id: number) => void;
  decrease: (id: number) => void;
  removeItem: (id: number) => void;
  clear: () => void;
  openCart: () => void;
  closeCart: () => void;
};

const STORAGE_KEY = "techshop-cart";
const MAX_QUANTITY = 10;

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [entries, setEntries] = useState<CartEntry[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setEntries(JSON.parse(raw));
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    }
  }, [entries, hydrated]);

  const addItem = useCallback((id: number) => {
    setEntries((prev) =>
      prev.some((e) => e.id === id)
        ? prev.map((e) =>
            e.id === id
              ? { ...e, quantity: Math.min(e.quantity + 1, MAX_QUANTITY) }
              : e
          )
        : [...prev, { id, quantity: 1 }]
    );
  }, []);

  const decrease = useCallback((id: number) => {
    setEntries((prev) =>
      prev.flatMap((e) =>
        e.id !== id
          ? [e]
          : e.quantity > 1
          ? [{ ...e, quantity: e.quantity - 1 }]
          : []
      )
    );
  }, []);

  const removeItem = useCallback((id: number) => {
    setEntries((prev) => prev.filter((e) => e.id !== id));
  }, []);

  const clear = useCallback(() => setEntries([]), []);
  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const items = useMemo<CartItem[]>(
    () =>
      entries.flatMap((e) => {
        const product = products.find((p) => p.id === e.id);
        return product ? [{ product, quantity: e.quantity }] : [];
      }),
    [entries]
  );

  const totalCount = useMemo(
    () => items.reduce((sum, i) => sum + i.quantity, 0),
    [items]
  );

  const totalPrice = useMemo(
    () => items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
    [items]
  );

  const getQuantity = useCallback(
    (id: number) => entries.find((e) => e.id === id)?.quantity ?? 0,
    [entries]
  );

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      totalCount,
      totalPrice,
      isOpen,
      getQuantity,
      addItem,
      increase: addItem,
      decrease,
      removeItem,
      clear,
      openCart,
      closeCart,
    }),
    [items, totalCount, totalPrice, isOpen, getQuantity, addItem, decrease, removeItem, clear, openCart, closeCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}

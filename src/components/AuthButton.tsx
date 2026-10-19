"use client";

import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function AuthButton() {
  const { user, hydrated, openAuth, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setMenuOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  if (!hydrated) return <div className="hidden h-10 w-32 sm:block" />;

  if (!user) {
    return (
      <button
        type="button"
        onClick={openAuth}
        className="hidden items-center rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm shadow-blue-600/25 transition hover:bg-blue-700 active:scale-95 sm:flex"
      >
        ورود / ثبت‌نام
      </button>
    );
  }

  return (
    <div ref={ref} className="relative hidden sm:block">
      <button
        type="button"
        onClick={() => setMenuOpen((prev) => !prev)}
        aria-expanded={menuOpen}
        className="flex items-center gap-2 rounded-xl border border-gray-200 py-1.5 ps-1.5 pe-4 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 font-bold text-white">
          {user.name.charAt(0)}
        </span>
        <span className="max-w-28 truncate">{user.name}</span>
      </button>

      {menuOpen && (
        <div className="absolute end-0 top-full mt-2 w-56 rounded-2xl border border-gray-100 bg-white p-2 shadow-xl">
          <div className="px-3 py-2">
            <p className="truncate text-sm font-semibold text-gray-900">{user.name}</p>
            <p dir="ltr" className="text-start text-xs text-gray-500">
              {user.phone}
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setMenuOpen(false);
              logout();
            }}
            className="w-full rounded-xl px-3 py-2.5 text-start text-sm text-red-500 transition hover:bg-red-50"
          >
            خروج از حساب
          </button>
        </div>
      )}
    </div>
  );
}
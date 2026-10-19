"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { navLinks, storeInfo } from "@/data/mockData";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) close();
    };

    document.addEventListener("keydown", onKeyDown);
    mediaQuery.addEventListener("change", onChange);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      mediaQuery.removeEventListener("change", onChange);
      document.body.style.overflow = "";
    };
  }, [isOpen, close]);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="باز کردن منو"
        aria-expanded={isOpen}
        className="rounded-full p-2.5 text-gray-700 transition hover:bg-gray-100 active:scale-95 md:hidden"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {mounted &&
        createPortal(
          <div
            className={`fixed inset-0 z-[70] transition-[visibility] duration-300 md:hidden ${
              isOpen ? "visible" : "invisible"
            }`}
            aria-hidden={!isOpen}
          >
            <div
              onClick={close}
              className={`absolute inset-0 bg-gray-900/50 backdrop-blur-sm transition-opacity duration-300 ${
                isOpen ? "opacity-100" : "opacity-0"
              }`}
            />

            <aside
              role="dialog"
              aria-modal="true"
              aria-label="منوی اصلی"
              className={`absolute inset-y-0 start-0 flex w-[85%] max-w-sm flex-col rounded-e-3xl bg-white shadow-2xl transition-transform duration-300 ease-out ${
                isOpen ? "translate-x-0" : "ltr:-translate-x-full rtl:translate-x-full"
              }`}
            >
              <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-lg font-bold text-white shadow-md shadow-indigo-600/30">
                    ت
                  </div>
                  <span className="text-lg font-bold text-gray-900">{storeInfo.name}</span>
                </div>
                <button
                  type="button"
                  onClick={close}
                  aria-label="بستن منو"
                  className="rounded-full p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto px-3 py-4">
                <ul className="space-y-1">
                  {navLinks.map((link, index) => (
                    <li
                      key={link.href}
                      style={{ transitionDelay: isOpen ? `${120 + index * 50}ms` : "0ms" }}
                      className={`transition duration-300 ${
                        isOpen
                          ? "translate-x-0 opacity-100"
                          : "opacity-0 ltr:-translate-x-4 rtl:translate-x-4"
                      }`}
                    >
                      <Link
                        href={link.href}
                        onClick={close}
                        className="flex items-center justify-between rounded-xl px-4 py-3.5 text-base font-medium text-gray-700 transition hover:bg-blue-50 hover:text-blue-600"
                      >
                        {link.label}
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="space-y-4 border-t border-gray-100 bg-gray-50 px-5 py-5 rounded-ee-3xl">
                <button
                  type="button"
                  className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white shadow-lg shadow-blue-600/25 transition hover:bg-blue-700 active:scale-[0.99]"
                >
                  ورود / ثبت‌نام
                </button>
                <div className="space-y-1.5 text-center text-sm text-gray-500">
                  <p>📞 {storeInfo.phone}</p>
                  <p dir="ltr">✉️ {storeInfo.email}</p>
                </div>
              </div>
            </aside>
          </div>,
          document.body
        )}
    </>
  );
}
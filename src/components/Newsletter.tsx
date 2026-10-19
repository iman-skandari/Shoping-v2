"use client";

import { useState } from "react";

type Status = "idle" | "error" | "success";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    if (!valid) {
      setStatus("error");
      return;
    }
   
    setStatus("success");
    setEmail("");
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900">عضویت در خبرنامه</h2>
        <p className="mt-3 text-gray-600">
          از جدیدترین تخفیف‌ها و محصولات زودتر از همه باخبر شو.
        </p>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="mt-8 flex flex-col sm:flex-row gap-3"
        >
          <input
            type="email"
            dir="ltr"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (status !== "idle") setStatus("idle");
            }}
            placeholder="email@example.com"
            aria-label="ایمیل"
            className="flex-1 rounded-xl border border-gray-300 px-4 py-3 text-start focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-xl transition"
          >
            عضویت
          </button>
        </form>

        <p className="mt-3 h-5 text-sm" role="status">
          {status === "error" && (
            <span className="text-red-500">لطفاً یک ایمیل معتبر وارد کن.</span>
          )}
          {status === "success" && (
            <span className="text-green-600">عضویت شما با موفقیت ثبت شد 🎉</span>
          )}
        </p>
      </div>
    </section>
  );
}
"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { toEnglishDigits } from "@/data/mockData";

type Mode = "login" | "signup";

type Fields = { name: string; phone: string; password: string };

type Errors = Partial<Record<keyof Fields | "form", string>>;

const emptyFields: Fields = { name: "", phone: "", password: "" };

function validate(mode: Mode, fields: Fields): Errors {
  const errors: Errors = {};
  if (mode === "signup" && fields.name.trim().length < 3)
    errors.name = "نام و نام خانوادگی را کامل وارد کن.";
  if (!/^09\d{9}$/.test(toEnglishDigits(fields.phone).trim()))
    errors.phone = "شماره موبایل معتبر نیست (مثال: 09123456789).";
  if (fields.password.length < 6) errors.password = "رمز عبور باید حداقل ۶ کاراکتر باشد.";
  return errors;
}

const inputClass = (error?: string) =>
  `w-full rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
    error ? "border-red-400" : "border-gray-300"
  }`;

export default function AuthModal() {
  const { isModalOpen, closeAuth, login, signup } = useAuth();
  const [mode, setMode] = useState<Mode>("login");
  const [fields, setFields] = useState<Fields>(emptyFields);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!isModalOpen) return;
    setMode("login");
    setFields(emptyFields);
    setErrors({});

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeAuth();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [isModalOpen, closeAuth]);

  function switchMode(next: Mode) {
    setMode(next);
    setErrors({});
  }

  function update(key: keyof Fields, value: string) {
    setFields((prev) => ({ ...prev, [key]: value }));
    if (errors[key] || errors.form) setErrors((prev) => ({ ...prev, [key]: undefined, form: undefined }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;
    const found = validate(mode, fields);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 800));

    const phone = toEnglishDigits(fields.phone).trim();
    const result =
      mode === "login"
        ? login(phone, fields.password)
        : signup(fields.name, phone, fields.password);

    setSubmitting(false);
    if (!result.ok) setErrors({ form: result.error });
  }

  return (
    <div
      className={`fixed inset-0 z-[80] flex items-center justify-center p-4 transition-[opacity,visibility] duration-300 ${
        isModalOpen ? "visible opacity-100" : "invisible opacity-0"
      }`}
      aria-hidden={!isModalOpen}
    >
      <div onClick={closeAuth} className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm" />

      <div
        role="dialog"
        aria-modal="true"
        aria-label={mode === "login" ? "ورود" : "ثبت‌نام"}
        className={`relative w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl transition duration-300 sm:p-8 ${
          isModalOpen ? "scale-100" : "scale-95"
        }`}
      >
        <button
          type="button"
          onClick={closeAuth}
          aria-label="بستن"
          className="absolute end-4 top-4 rounded-full p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-xl font-bold text-white shadow-md shadow-indigo-600/30">
          ت
        </div>
        <h2 className="mt-4 text-xl font-bold text-gray-900">
          {mode === "login" ? "ورود به حساب کاربری" : "ساخت حساب کاربری"}
        </h2>

        <div className="mt-5 grid grid-cols-2 gap-1 rounded-xl bg-gray-100 p-1 text-sm font-medium">
          {(
            [
              { value: "login", label: "ورود" },
              { value: "signup", label: "ثبت‌نام" },
            ] as const
          ).map((tab) => (
            <button
              key={tab.value}
              type="button"
              onClick={() => switchMode(tab.value)}
              className={`rounded-lg py-2 transition ${
                mode === tab.value ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} noValidate className="mt-5 space-y-1">
          {mode === "signup" && (
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-gray-700">نام و نام خانوادگی</span>
              <input
                type="text"
                value={fields.name}
                onChange={(e) => update("name", e.target.value)}
                autoComplete="name"
                className={inputClass(errors.name)}
              />
              <span className="mt-1 block h-4 text-xs text-red-500" role="alert">
                {errors.name}
              </span>
            </label>
          )}

          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-gray-700">شماره موبایل</span>
            <input
              type="tel"
              dir="ltr"
              inputMode="numeric"
              value={fields.phone}
              onChange={(e) => update("phone", e.target.value)}
              placeholder="09123456789"
              autoComplete="tel"
              className={`${inputClass(errors.phone)} text-start`}
            />
            <span className="mt-1 block h-4 text-xs text-red-500" role="alert">
              {errors.phone}
            </span>
          </label>

          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-gray-700">رمز عبور</span>
            <input
              type="password"
              dir="ltr"
              value={fields.password}
              onChange={(e) => update("password", e.target.value)}
              autoComplete={mode === "login" ? "current-password" : "new-password"}
              className={`${inputClass(errors.password)} text-start`}
            />
            <span className="mt-1 block h-4 text-xs text-red-500" role="alert">
              {errors.password}
            </span>
          </label>

          <p className="h-5 text-center text-sm text-red-500" role="alert">
            {errors.form}
          </p>

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-xl bg-blue-600 py-3.5 font-semibold text-white shadow-lg shadow-blue-600/25 transition hover:bg-blue-700 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? "لطفاً صبر کن..." : mode === "login" ? "ورود" : "ساخت حساب"}
          </button>
        </form>
      </div>
    </div>
  );
}
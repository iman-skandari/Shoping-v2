"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatNumber, formatPrice, getPricing, toEnglishDigits } from "@/data/mockData";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";

type FormState = {
  fullName: string;
  phone: string;
  city: string;
  postalCode: string;
  address: string;
  payment: "online" | "cod";
};

type Errors = Partial<Record<keyof FormState, string>>;

type Order = { id: string; payable: number; count: number };

const initialForm: FormState = {
  fullName: "",
  phone: "",
  city: "",
  postalCode: "",
  address: "",
  payment: "online",
};



function validate(form: FormState): Errors {
  const errors: Errors = {};
  if (form.fullName.trim().length < 3) errors.fullName = "نام و نام خانوادگی را کامل وارد کن.";
  if (!/^09\d{9}$/.test(toEnglishDigits(form.phone).trim()))
    errors.phone = "شماره موبایل معتبر نیست (مثال: 09123456789).";
  if (form.city.trim().length < 2) errors.city = "نام شهر را وارد کن.";
  if (!/^\d{10}$/.test(toEnglishDigits(form.postalCode).trim()))
    errors.postalCode = "کد پستی باید ۱۰ رقم باشد.";
  if (form.address.trim().length < 10) errors.address = "آدرس را دقیق‌تر وارد کن.";
  return errors;
}

type FieldProps = {
  label: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
};

function Field({ label, error, children, className = "" }: FieldProps) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block text-sm font-medium text-gray-700">{label}</span>
      {children}
      <span className="mt-1 block h-4 text-xs text-red-500" role="alert">
        {error}
      </span>
    </label>
  );
}

const inputClass = (error?: string) =>
  `w-full rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${error ? "border-red-400" : "border-gray-300"
  }`;

export default function CheckoutView() {
  const { items, totalCount, totalPrice, listTotal, discount, shipping, payable, hydrated, clear } =
    useCart();
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [order, setOrder] = useState<Order | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;
    setForm((prev) => ({ ...prev, fullName: prev.fullName || user.name, phone: prev.phone || user.phone }));
  }, [user]);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));

    const id = String(Math.floor(100000 + Math.random() * 900000));
    setOrder({ id, payable, count: totalCount });
    clear();
    setSubmitting(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (order) {
    return (
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-lg rounded-3xl border border-gray-100 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-50 text-4xl">
            ✅
          </div>
          <h1 className="mt-6 text-2xl font-bold text-gray-900">سفارش شما ثبت شد</h1>
          <p className="mt-2 text-gray-600">از خرید شما سپاسگزاریم.</p>
          <dl className="mt-6 space-y-3 rounded-2xl bg-gray-50 p-5 text-sm">
            <div className="flex justify-between">
              <dt className="text-gray-500">کد پیگیری</dt>
              <dd className="font-bold text-gray-900">{formatNumber(Number(order.id))}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-500">تعداد کالا</dt>
              <dd className="font-bold text-gray-900">{formatNumber(order.count)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-500">مبلغ سفارش</dt>
              <dd className="font-bold text-gray-900">{formatPrice(order.payable)}</dd>
            </div>
          </dl>
          <Link
            href="/"
            className="mt-8 inline-block rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            بازگشت به فروشگاه
          </Link>
        </div>
      </section>
    );
  }

  if (!hydrated) {
    return (
      <section className="bg-gray-50 py-16">
        <div className="mx-auto h-96 max-w-7xl animate-pulse rounded-3xl bg-gray-200/60 px-4" />
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section className="bg-gray-50 py-24">
        <div className="mx-auto max-w-md px-4 text-center">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-blue-50 text-5xl">
            🛍️
          </div>
          <h1 className="mt-6 text-xl font-bold text-gray-900">سبد خرید شما خالی است</h1>
          <p className="mt-2 text-gray-500">برای ثبت سفارش ابتدا محصولی به سبد اضافه کن.</p>
          <Link
            href="/#products"
            className="mt-6 inline-block rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            مشاهده محصولات
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gray-50 py-10 lg:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="mb-8 text-2xl font-bold text-gray-900 lg:text-3xl">تکمیل سفارش</h1>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="grid gap-8 lg:grid-cols-[1fr_24rem] lg:items-start"
        >
          <div className="space-y-6">
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <h2 className="mb-5 text-lg font-bold text-gray-900">اطلاعات ارسال</h2>
              <div className="grid gap-x-5 sm:grid-cols-2">
                <Field label="نام و نام خانوادگی" error={errors.fullName}>
                  <input
                    type="text"
                    value={form.fullName}
                    onChange={(e) => update("fullName", e.target.value)}
                    autoComplete="name"
                    className={inputClass(errors.fullName)}
                  />
                </Field>
                <Field label="شماره موبایل" error={errors.phone}>
                  <input
                    type="tel"
                    dir="ltr"
                    inputMode="numeric"
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    placeholder="09123456789"
                    autoComplete="tel"
                    className={`${inputClass(errors.phone)} text-start`}
                  />
                </Field>
                <Field label="شهر" error={errors.city}>
                  <input
                    type="text"
                    value={form.city}
                    onChange={(e) => update("city", e.target.value)}
                    autoComplete="address-level2"
                    className={inputClass(errors.city)}
                  />
                </Field>
                <Field label="کد پستی" error={errors.postalCode}>
                  <input
                    type="text"
                    dir="ltr"
                    inputMode="numeric"
                    maxLength={10}
                    value={form.postalCode}
                    onChange={(e) => update("postalCode", e.target.value)}
                    autoComplete="postal-code"
                    className={`${inputClass(errors.postalCode)} text-start`}
                  />
                </Field>
                <Field label="آدرس کامل" error={errors.address} className="sm:col-span-2">
                  <textarea
                    rows={3}
                    value={form.address}
                    onChange={(e) => update("address", e.target.value)}
                    autoComplete="street-address"
                    className={`${inputClass(errors.address)} resize-none`}
                  />
                </Field>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <h2 className="mb-5 text-lg font-bold text-gray-900">روش پرداخت</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {(
                  [
                    { value: "online", title: "پرداخت آنلاین", desc: "پرداخت امن از طریق درگاه بانکی" },
                    { value: "cod", title: "پرداخت در محل", desc: "پرداخت هنگام تحویل کالا" },
                  ] as const
                ).map((option) => (
                  <label
                    key={option.value}
                    className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition ${form.payment === option.value
                        ? "border-blue-600 bg-blue-50/60 ring-1 ring-blue-600"
                        : "border-gray-200 hover:border-gray-300"
                      }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={option.value}
                      checked={form.payment === option.value}
                      onChange={() => update("payment", option.value)}
                      className="mt-1 accent-blue-600"
                    />
                    <span>
                      <span className="block font-semibold text-gray-900">{option.title}</span>
                      <span className="mt-0.5 block text-sm text-gray-500">{option.desc}</span>
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <aside className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm lg:sticky lg:top-24">
            <h2 className="mb-4 text-lg font-bold text-gray-900">خلاصه سفارش</h2>

            <ul className="max-h-64 divide-y divide-gray-100 overflow-y-auto">
              {items.map(({ product, quantity }) => (
                <li key={product.id} className="flex gap-3 py-3">
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-2 text-sm font-medium leading-snug text-gray-900">
                      {product.name}
                    </p>
                    <div className="mt-1 flex items-center justify-between text-sm">
                      <span className="text-gray-500">{formatNumber(quantity)} عدد</span>
                      <span className="font-bold text-gray-900">
                        {formatPrice(getPricing(product).unitPrice * quantity)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <dl className="mt-4 space-y-3 border-t border-gray-100 pt-4 text-sm">
              <div className="flex justify-between">
                <dt className="text-gray-600">قیمت کالاها ({formatNumber(totalCount)})</dt>
                <dd className="text-gray-900">{formatPrice(listTotal)}</dd>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-red-500">
                  <dt>سود شما از خرید</dt>
                  <dd>{formatPrice(discount)}</dd>
                </div>
              )}
              <div className="flex justify-between">
                <dt className="text-gray-600">هزینه ارسال</dt>
                <dd className={shipping === 0 ? "font-medium text-green-600" : "text-gray-900"}>
                  {shipping === 0 ? "رایگان" : formatPrice(shipping)}
                </dd>
              </div>
              <div className="flex justify-between border-t border-gray-100 pt-4 text-base">
                <dt className="font-semibold text-gray-900">مبلغ قابل پرداخت</dt>
                <dd className="font-bold text-gray-900">{formatPrice(payable)}</dd>
              </div>
            </dl>

            <button
              type="submit"
              disabled={submitting}
              className="mt-6 w-full rounded-xl bg-blue-600 py-3.5 font-semibold text-white shadow-lg shadow-blue-600/25 transition hover:bg-blue-700 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "در حال ثبت سفارش..." : "ثبت نهایی سفارش"}
            </button>
          </aside>
        </form>
      </div>
    </section>
  );
}
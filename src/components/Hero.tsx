import Link from "next/link";
import { storeInfo } from "@/data/mockData";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-bl from-blue-600 via-indigo-600 to-purple-700 text-white">
      <div className="pointer-events-none absolute -top-24 -end-24 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -start-24 h-96 w-96 rounded-full bg-pink-400/20 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-3xl space-y-6 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/15 px-4 py-1.5 text-sm font-medium backdrop-blur-sm">
            <span className="h-2 w-2 animate-pulse rounded-full bg-green-400" />
            فروش ویژه تا ۵۰٪ تخفیف
          </span>

          <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl lg:leading-[1.25]">
            {storeInfo.slogan}
          </h1>

          <p className="mx-auto max-w-2xl text-lg leading-8 text-blue-100">
            {storeInfo.description}
          </p>

          <div className="flex flex-col justify-center gap-4 pt-4 sm:flex-row">
            <Link
              href="#products"
              className="rounded-xl bg-white px-8 py-3.5 font-semibold text-blue-700 shadow-xl shadow-black/10 transition hover:-translate-y-0.5 hover:bg-blue-50"
            >
              مشاهده محصولات
            </Link>
            <Link
              href="#categories"
              className="rounded-xl border border-white/30 bg-white/10 px-8 py-3.5 font-semibold backdrop-blur-sm transition hover:-translate-y-0.5 hover:bg-white/20"
            >
              دسته‌بندی‌ها
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
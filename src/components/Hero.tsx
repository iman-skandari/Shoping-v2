import Image from "next/image";
import Link from "next/link";
import { benefits, formatPrice, products, storeInfo, type Product } from "@/data/mockData";

function HeroCard({ product, className }: { product: Product; className: string }) {
  return (
    <Link
      href={`/products/${product.id}`}
      className={`absolute overflow-hidden rounded-3xl bg-white shadow-2xl shadow-indigo-900/20 ring-1 ring-black/5 transition duration-500 hover:z-30 hover:rotate-0 hover:scale-[1.03] ${className}`}
    >
      <Image
        src={product.image}
        alt={product.name}
        fill
        sizes="(min-width: 1024px) 20rem, 60vw"
        className="object-cover"
        priority
      />
      <div className="absolute inset-x-2 bottom-2 rounded-2xl bg-white/90 px-3 py-2 backdrop-blur-md">
        <p className="line-clamp-1 text-xs font-semibold text-gray-900 sm:text-sm">{product.name}</p>
        <p className="mt-0.5 text-xs font-bold text-blue-600">{formatPrice(product.price)}</p>
      </div>
    </Link>
  );
}

export default function Hero() {
  const trust = benefits.filter((b) => [1, 2, 4].includes(b.id));

  return (
    <section className="relative overflow-hidden bg-[#f4f6ff]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(79,70,229,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(79,70,229,0.07)_1px,transparent_1px)] [background-size:44px_44px] [mask-image:radial-gradient(ellipse_at_center,black_25%,transparent_75%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 end-0 h-[28rem] w-[28rem] rounded-full bg-indigo-400/25 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 start-0 h-[26rem] w-[26rem] rounded-full bg-sky-300/30 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-8 lg:px-8 lg:py-24">
        <div className="text-center lg:text-start">
          <span className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-white px-4 py-1.5 text-sm font-medium text-indigo-700 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
            </span>
            سفارش‌های تهران همان روز ارسال می‌شود
          </span>

          <h1 className="mt-6 text-4xl font-extrabold leading-tight text-gray-900 sm:text-5xl lg:text-[3.5rem] lg:leading-[1.3]">
            {storeInfo.slogan}
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600 lg:mx-0">
            {storeInfo.description}
          </p>

          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
            <Link
              href="#products"
              className="rounded-2xl bg-gray-900 px-8 py-4 text-center font-semibold text-white shadow-xl shadow-gray-900/20 transition hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-blue-700/30"
            >
              مشاهده محصولات
            </Link>
            <Link
              href="#categories"
              className="rounded-2xl border border-gray-300 bg-white/70 px-8 py-4 text-center font-semibold text-gray-800 backdrop-blur-sm transition hover:-translate-y-0.5 hover:border-blue-400 hover:text-blue-700"
            >
              دسته‌بندی‌ها
            </Link>
          </div>

          <ul className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm text-gray-600 lg:justify-start">
            {trust.map((item) => (
              <li key={item.id} className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-base shadow-sm ring-1 ring-black/5">
                  {item.icon}
                </span>
                <span className="font-medium">{item.title}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto h-[26rem] w-full max-w-md sm:h-[30rem] lg:h-[34rem] lg:max-w-none">
          <HeroCard product={products[0]} className="end-0 top-0 aspect-[4/5] w-[56%] rotate-3" />
          <HeroCard product={products[1]} className="bottom-0 start-0 z-10 aspect-[4/5] w-[52%] -rotate-3" />
          <HeroCard product={products[7]} className="bottom-[6%] end-[4%] z-20 aspect-square w-[34%] rotate-6" />

          <div className="absolute start-[6%] top-[8%] z-20 flex items-center gap-2 rounded-2xl bg-white px-4 py-3 shadow-xl shadow-indigo-900/10 ring-1 ring-black/5">
            <span className="text-xl text-yellow-400">★</span>
            <div className="leading-tight">
              <p className="text-sm font-bold text-gray-900">امتیاز مشتریان</p>
              <p className="text-xs text-gray-500">میانگین بالای ۴٫۵</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

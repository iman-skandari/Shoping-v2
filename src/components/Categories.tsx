import Image from "next/image";
import Link from "next/link";
import { categories, formatNumber } from "@/data/mockData";

const spanClass = (index: number) =>
  index === 0 ? "col-span-2 lg:col-span-4" : "lg:col-span-2";

export default function Categories() {
  return (
    <section id="categories" className="scroll-mt-16 bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 lg:text-4xl">دسته‌بندی محصولات</h2>
            <p className="mt-3 max-w-md text-gray-600">
              محصول مورد نظرت را از میان دسته‌بندی‌ها پیدا کن.
            </p>
          </div>
          <Link
            href="/#products"
            className="text-sm font-semibold text-blue-600 transition hover:text-blue-800"
          >
            مشاهده همه محصولات
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-6 lg:gap-5">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              href={`/?category=${category.slug}#products`}
              className={`group relative isolate overflow-hidden rounded-3xl bg-gray-200 ${spanClass(index)} ${
                index === 0 ? "h-56 sm:h-64 lg:h-72" : "h-44 sm:h-52 lg:h-72"
              }`}
            >
              <Image
                src={category.image}
                alt={category.name}
                fill
                sizes="(min-width: 1024px) 33vw, 50vw"
                className="object-cover transition duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-gray-950/15 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5 text-white">
                <div>
                  <h3 className="text-base font-bold leading-tight sm:text-lg">{category.name}</h3>
                  <p className="mt-1 text-xs text-gray-200">{formatNumber(category.productCount)} محصول</p>
                </div>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/20 backdrop-blur-md transition duration-300 group-hover:bg-white group-hover:text-gray-900">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";
import { categories, featuredProducts, formatNumber } from "@/data/mockData";
import ProductCard from "./ProductCard";

const chipClass = (active: boolean) =>
  `shrink-0 rounded-full border px-5 py-2 text-sm font-medium transition ${
    active
      ? "border-gray-900 bg-gray-900 text-white shadow-md shadow-gray-900/20"
      : "border-gray-200 bg-white text-gray-600 hover:border-gray-400 hover:text-gray-900"
  }`;

export default function FeaturedProducts({ category }: { category?: string }) {
  const active = categories.find((c) => c.slug === category);
  const list = active
    ? featuredProducts.filter((p) => p.category === active.slug)
    : featuredProducts;

  return (
    <section id="products" className="scroll-mt-16 bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 lg:text-4xl">محصولات ویژه</h2>
            <p className="mt-3 text-gray-600">پرفروش‌ترین و جدیدترین محصولات فروشگاه</p>
          </div>
          <p className="text-sm text-gray-500">{formatNumber(list.length)} محصول</p>
        </div>

        <div className="-mx-4 mb-10 flex gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0">
          <Link href="/#products" scroll={false} className={chipClass(!active)}>
            همه
          </Link>
          {categories.map((c) => (
            <Link
              key={c.id}
              href={`/?category=${c.slug}#products`}
              scroll={false}
              className={chipClass(active?.slug === c.slug)}
            >
              {c.name}
            </Link>
          ))}
        </div>

        {list.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {list.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-gray-300 bg-white py-16 text-center">
            <p className="font-semibold text-gray-900">هنوز محصولی در این دسته ثبت نشده</p>
            <Link href="/#products" className="mt-3 inline-block text-sm font-medium text-blue-600 hover:text-blue-800">
              نمایش همه محصولات
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

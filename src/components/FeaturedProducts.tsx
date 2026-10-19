import Link from "next/link";
import { categories, featuredProducts } from "@/data/mockData";
import ProductCard from "./ProductCard";

const chipClass = (active: boolean) =>
  `rounded-full border px-5 py-2 text-sm font-medium transition ${
    active
      ? "border-blue-600 bg-blue-600 text-white shadow-sm shadow-blue-600/25"
      : "border-gray-200 bg-white text-gray-600 hover:border-blue-300 hover:text-blue-600"
  }`;

export default function FeaturedProducts({ category }: { category?: string }) {
  const active = categories.find((c) => c.slug === category);
  const list = active
    ? featuredProducts.filter((p) => p.category === active.slug)
    : featuredProducts;

  return (
    <section id="products" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">محصولات ویژه</h2>
          <p className="mt-3 text-gray-600">پرفروش‌ترین و جدیدترین محصولات فروشگاه</p>
        </div>

        <div className="mb-10 flex flex-wrap justify-center gap-3">
          <Link href="/#products" className={chipClass(!active)}>
            همه
          </Link>
          {categories.map((c) => (
            <Link
              key={c.id}
              href={`/?category=${c.slug}#products`}
              className={chipClass(active?.slug === c.slug)}
            >
              {c.name}
            </Link>
          ))}
        </div>

        {list.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {list.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="py-12 text-center text-gray-500">
            هنوز محصولی در این دسته‌بندی ثبت نشده.
          </p>
        )}
      </div>
    </section>
  );
}
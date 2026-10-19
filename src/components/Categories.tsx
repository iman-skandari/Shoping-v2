import Image from "next/image";
import Link from "next/link";
import { categories } from "@/data/mockData";

export default function Categories() {
  return (
    <section id="categories" className="py-16 bg-white scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">دسته‌بندی محصولات</h2>
          <p className="mt-3 text-gray-600">
            محصولات مورد علاقه‌ت رو از دسته‌بندی‌ها پیدا کن
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`#${category.slug}`}
              className="group relative overflow-hidden rounded-2xl aspect-square shadow-md bg-gray-200"
            >
              <Image
                src={category.image}
                alt={category.name}
                fill
                sizes="(min-width: 1024px) 16vw, (min-width: 768px) 33vw, 50vw"
                className="object-cover transition duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4 text-center text-white">
                <h3 className="font-semibold text-sm sm:text-base leading-tight">
                  {category.name}
                </h3>
                <p className="text-xs text-gray-200 mt-1">
                  {category.productCount} محصول
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
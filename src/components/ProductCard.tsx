import Image from "next/image";
import Link from "next/link";
import { Product, formatNumber, formatPrice, getPricing } from "@/data/mockData";
import AddToCartButton from "./AddToCartButton";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  const { unitPrice, listPrice } = getPricing(product);
  const discount = listPrice > unitPrice ? Math.round((1 - unitPrice / listPrice) * 100) : 0;

  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white p-2 shadow-sm transition duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-indigo-900/10">
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-gray-100">
        <Link href={`/products/${product.id}`} className="absolute inset-0 block" aria-label={product.name}>
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition duration-700 group-hover:scale-105"
          />
        </Link>

        <div className="pointer-events-none absolute inset-x-3 top-3 flex items-start justify-between">
          {product.isNew ? (
            <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-green-700 shadow-sm backdrop-blur-md">
              جدید
            </span>
          ) : (
            <span />
          )}
          {product.isBestSeller && (
            <span className="rounded-full bg-amber-400 px-3 py-1 text-xs font-bold text-amber-950 shadow-sm">
              پرفروش
            </span>
          )}
        </div>

        {discount > 0 && (
          <span className="pointer-events-none absolute bottom-3 start-3 rounded-xl bg-red-500 px-2.5 py-1 text-xs font-bold text-white shadow-md shadow-red-500/30">
            {formatNumber(discount)}٪ تخفیف
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-3 pt-4">
        <div className="flex items-center gap-1 text-sm">
          <span className="text-yellow-400">★</span>
          <span className="font-semibold text-gray-800">{formatNumber(product.rating)}</span>
          <span className="text-gray-400">({formatNumber(product.reviews)})</span>
        </div>

        <h3 className="line-clamp-2 min-h-[2.75rem] font-semibold leading-snug text-gray-900">
          <Link href={`/products/${product.id}`} className="transition hover:text-blue-600">
            {product.name}
          </Link>
        </h3>

        <p className="line-clamp-1 text-sm text-gray-500">{product.description}</p>

        <div className="mt-auto flex items-end justify-between gap-2 border-t border-gray-100 pt-4">
          <div className="min-w-0">
            {discount > 0 && (
              <span className="block text-xs text-gray-400 line-through">{formatPrice(listPrice)}</span>
            )}
            <span className="block text-base font-bold text-gray-900">{formatPrice(unitPrice)}</span>
          </div>
          <AddToCartButton productId={product.id} />
        </div>
      </div>
    </article>
  );
}

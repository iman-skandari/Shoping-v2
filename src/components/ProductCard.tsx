import Image from "next/image";
import Link from "next/link";
import { Product, formatNumber, formatPrice } from "@/data/mockData";
import AddToCartButton from "./AddToCartButton";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-gray-200/70">
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <Link href={`/products/${product.id}`} className="absolute inset-0 block" aria-label={product.name}>
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        </Link>
        <div className="absolute inset-x-3 top-3 flex items-start justify-between">
          {product.isNew ? (
            <span className="rounded-full bg-green-500 px-2.5 py-1 text-xs font-medium text-white shadow-sm">
              جدید
            </span>
          ) : (
            <span />
          )}
          {product.isBestSeller && (
            <span className="rounded-full bg-orange-500 px-2.5 py-1 text-xs font-medium text-white shadow-sm">
              پرفروش
            </span>
          )}
        </div>

        {discount > 0 && (
          <span className="absolute bottom-3 start-3 rounded-lg bg-red-500 px-2 py-1 text-xs font-bold text-white shadow-sm">
            {formatNumber(discount)}٪ تخفیف
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="line-clamp-2 min-h-[2.75rem] font-semibold leading-snug text-gray-900">
          <Link href={`/products/${product.id}`} className="transition hover:text-blue-600">
            {product.name}
          </Link>
        </h3>

        <p className="line-clamp-1 text-sm text-gray-500">{product.description}</p>

        <div className="flex items-center gap-1 text-sm">
          <span className="text-yellow-400">★</span>
          <span className="font-medium text-gray-700">{formatNumber(product.rating)}</span>
          <span className="text-gray-400">({formatNumber(product.reviews)})</span>
        </div>

        <div className="mt-auto flex items-end justify-between gap-2 pt-2">
          <div className="min-w-0">
            {product.originalPrice && (
              <span className="block text-xs text-gray-400 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
            <span className="block text-base font-bold text-gray-900">
              {formatPrice(product.price)}
            </span>
          </div>
          <AddToCartButton productId={product.id} />
        </div>
      </div>
    </article>
  );
}
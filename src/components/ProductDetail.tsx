import ProductGallery from "./ProductGallery";
import Link from "next/link";
import {
    Product,
    categories,
    formatNumber,
    formatPrice,
    getPricing,
    getProductDetails,
    products,
} from "@/data/mockData";
import AddToCartButton from "./AddToCartButton";
import ProductCard from "./ProductCard";

export default function ProductDetail({ product }: { product: Product }) {
    const details = getProductDetails(product.id);
    const { unitPrice, listPrice } = getPricing(product);
    const discount = listPrice > unitPrice ? Math.round((1 - unitPrice / listPrice) * 100) : 0;
    const categoryName = categories.find((c) => c.slug === product.category)?.name;
    const related = products
        .filter((p) => p.category === product.category && p.id !== product.id)
        .concat(products.filter((p) => p.category !== product.category && p.id !== product.id))
        .slice(0, 4);

    return (
        <section className="bg-gray-50 py-10 lg:py-14">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm text-gray-500">
                    <Link href="/" className="transition hover:text-blue-600">خانه</Link>
                    <span>/</span>
                    <Link href="/#products" className="transition hover:text-blue-600">محصولات</Link>
                    {categoryName && (
                        <>
                            <span>/</span>
                            <span>{categoryName}</span>
                        </>
                    )}
                </nav>

                <div className="grid gap-8 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm lg:grid-cols-2 lg:gap-12 lg:p-10">
                    <ProductGallery
                        images={[product.image, ...(details?.gallery ?? [])]}
                        alt={product.name}
                        isNew={product.isNew}
                        isBestSeller={product.isBestSeller}
                    />

                    <div className="flex flex-col">
                        {details && <p className="text-sm font-medium text-blue-600">{details.brand}</p>}
                        <h1 className="mt-2 text-2xl font-bold leading-snug text-gray-900 lg:text-3xl">
                            {product.name}
                        </h1>

                        <div className="mt-3 flex items-center gap-2 text-sm">
                            <span className="text-yellow-400">★</span>
                            <span className="font-medium text-gray-700">{formatNumber(product.rating)}</span>
                            <span className="text-gray-400">({formatNumber(product.reviews)} نظر)</span>
                        </div>

                        <p className="mt-5 leading-8 text-gray-600">{product.description}</p>

                        {details && (
                            <ul className="mt-5 space-y-2.5">
                                {details.features.map((feature) => (
                                    <li key={feature} className="flex items-start gap-2 text-sm text-gray-700">
                                        <span className="mt-0.5 text-green-600">✓</span>
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        )}

                        <div className="mt-auto pt-8">
                            <div className="flex items-end gap-3">
                                <span className="text-3xl font-bold text-gray-900">{formatPrice(unitPrice)}</span>
                                {discount > 0 && (
                                    <>
                                        <span className="pb-1 text-gray-400 line-through">{formatPrice(listPrice)}</span>
                                        <span className="mb-1 rounded-lg bg-red-500 px-2 py-1 text-xs font-bold text-white">
                                            {formatNumber(discount)}٪ تخفیف
                                        </span>
                                    </>
                                )}
                            </div>

                            <div className="mt-6 flex items-center gap-4">
                                <AddToCartButton productId={product.id} />
                                {details && <span className="text-sm text-gray-500">{details.warranty}</span>}
                            </div>
                        </div>
                    </div>
                </div>

                {details && (
                    <div className="mt-8 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm lg:p-10">
                        <h2 className="mb-6 text-xl font-bold text-gray-900">مشخصات فنی</h2>
                        <dl className="divide-y divide-gray-100">
                            {details.specs.map((spec) => (
                                <div key={spec.label} className="grid grid-cols-3 gap-4 py-4 text-sm">
                                    <dt className="text-gray-500">{spec.label}</dt>
                                    <dd className="col-span-2 font-medium text-gray-900">{spec.value}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                )}

                {related.length > 0 && (
                    <div className="mt-14">
                        <h2 className="mb-6 text-xl font-bold text-gray-900">محصولات مرتبط</h2>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            {related.map((item) => (
                                <ProductCard key={item.id} product={item} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ProductNotFound() {
  return (
    <main>
      <Header />
      <section className="bg-gray-50 py-24">
        <div className="mx-auto max-w-md px-4 text-center">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-blue-50 text-5xl">
            🔍
          </div>
          <h1 className="mt-6 text-xl font-bold text-gray-900">این محصول پیدا نشد</h1>
          <p className="mt-2 text-gray-500">ممکنه آدرس اشتباه باشه یا محصول حذف شده باشه.</p>
          <Link
            href="/#products"
            className="mt-6 inline-block rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            مشاهده محصولات
          </Link>
        </div>
      </section>
      <Footer />
    </main>
  );
}
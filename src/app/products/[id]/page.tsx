import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductDetail from "@/components/ProductDetail";
import { getProductById } from "@/data/mockData";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = getProductById(Number(id));
  return {
    title: product ? `${product.name} | تک‌شاپ` : "محصول پیدا نشد | تک‌شاپ",
    description: product?.description,
  };
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const product = getProductById(Number(id));
  if (!product) notFound();

  return (
    <main>
      <Header />
      <ProductDetail product={product} />
      <Footer />
    </main>
  );
}
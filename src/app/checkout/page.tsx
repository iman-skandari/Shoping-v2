import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CheckoutView from "@/components/CheckoutView";

export const metadata: Metadata = {
  title: "تکمیل سفارش | تک‌شاپ",
};

export default function CheckoutPage() {
  return (
    <main>
      <Header />
      <CheckoutView />
      <Footer />
    </main>
  );
}
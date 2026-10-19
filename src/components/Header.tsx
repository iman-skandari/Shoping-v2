import Link from "next/link";
import { navLinks, storeInfo } from "@/data/mockData";
import CartButton from "./CartButton";
import MobileMenu from "./MobileMenu";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200/70 bg-white/80 backdrop-blur-lg">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-1">
            <MobileMenu />
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-lg font-bold text-white shadow-md shadow-indigo-600/30">
                ت
              </div>
              <span className="text-xl font-bold text-gray-900">{storeInfo.name}</span>
            </Link>
          </div>

          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative font-medium text-gray-600 transition hover:text-blue-600 after:absolute after:-bottom-1.5 after:start-0 after:h-0.5 after:w-0 after:rounded-full after:bg-blue-600 after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <CartButton />
            <button
              type="button"
              className="hidden items-center rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm shadow-blue-600/25 transition hover:bg-blue-700 active:scale-95 sm:flex"
            >
              ورود / ثبت‌نام
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
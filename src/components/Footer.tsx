import Link from "next/link";
import { navLinks, storeInfo } from "@/data/mockData";

export default function Footer() {
    return (
        <footer id="about" className="bg-gray-900 text-gray-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                                ت
                            </div>
                            <span className="text-xl font-bold text-white">{storeInfo.name}</span>
                        </div>
                        <p className="text-sm leading-relaxed text-gray-400">
                            {storeInfo.description}
                        </p>
                    </div>

                    <div>
                        <h3 className="text-white font-semibold mb-4">دسترسی سریع</h3>
                        <ul className="space-y-2 text-sm">
                            {navLinks.map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className="transition hover:text-white">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-semibold mb-4">تماس با ما</h3>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-start gap-2">
                                <span>📞</span>
                                <span>{storeInfo.phone}</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span>✉️</span>
                                <span>{storeInfo.email}</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span>📍</span>
                                <span>{storeInfo.address}</span>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-semibold mb-4">شبکه‌های اجتماعی</h3>
                        <div className="flex gap-3">
                            <a href={storeInfo.socials.instagram} className="w-10 h-10 bg-gray-800 hover:bg-pink-600 rounded-xl flex items-center justify-center transition">
                                IG
                            </a>
                            <a href={storeInfo.socials.telegram} className="w-10 h-10 bg-gray-800 hover:bg-blue-500 rounded-xl flex items-center justify-center transition">
                                TG
                            </a>
                            <a href={storeInfo.socials.twitter} className="w-10 h-10 bg-gray-800 hover:bg-sky-500 rounded-xl flex items-center justify-center transition">
                                X
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-12 pt-6 text-center text-sm text-gray-500">
                    © {new Date().getFullYear()} {storeInfo.name}. تمامی حقوق محفوظ است.
                </div>
            </div>
        </footer>
    );
}
export type Product = {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  isNew?: boolean;
  isBestSeller?: boolean;
  description: string;
};
export const navLinks = [
  { href: "/", label: "خانه" },
  { href: "/#categories", label: "دسته‌بندی‌ها" },
  { href: "/#products", label: "محصولات" },
  { href: "/#testimonials", label: "نظرات مشتریان" },
  { href: "/#about", label: "درباره ما" },
];
export type Category = {
  id: number;
  name: string;
  slug: string;
  image: string;
  productCount: number;
};

export type StoreInfo = {
  name: string;
  slogan: string;
  description: string;
  phone: string;
  email: string;
  address: string;
  socials: {
    instagram: string;
    telegram: string;
    twitter: string;
  };
};

export const storeInfo: StoreInfo = {
  name: "تک‌شاپ",
  slogan: "لوازم جانبی هوشمند، زندگی راحت‌تر",
  description:
    "فروشگاه تخصصی لوازم جانبی دیجیتال و اکسسوری‌های باکیفیت. از هدفون و کیبورد تا شارژر و کیف، همه چیز برای سبک زندگی مدرن شما.",
  phone: "۰۲۱-۹۱۰۰-۱۲۳۴",
  email: "info@techshop.ir",
  address: "تهران، خیابان فاطمی، خیابان کاج، نبش کاج ۵",
  socials: {
    instagram: "https://instagram.com/techshop",
    telegram: "https://t.me/techshop",
    twitter: "https://twitter.com/techshop",
  },
};

export const categories: Category[] = [
  {
    id: 1,
    name: "هدفون و ایرپاد",
    slug: "headphones",
    image: "/images/categories/headphones.svg",
    productCount: 24,
  },
  {
    id: 2,
    name: "کیبورد و ماوس",
    slug: "keyboard-mouse",
    image: "/images/categories/keyboard-mouse.svg",
    productCount: 18,
  },
  {
    id: 3,
    name: "شارژر و پاوربانک",
    slug: "chargers",
    image: "/images/categories/chargers.svg",
    productCount: 31,
  },
  {
    id: 4,
    name: "کیف و کاور",
    slug: "cases",
    image: "/images/categories/cases.svg",
    productCount: 42,
  },
  {
    id: 5,
    name: "اسپیکر و صوتی",
    slug: "speakers",
    image: "/images/categories/speakers.svg",
    productCount: 15,
  },
  {
    id: 6,
    name: "لوازم گیمینگ",
    slug: "gaming",
    image: "/images/categories/gaming.svg",
    productCount: 27,
  },
];

export const products: Product[] = [
  {
    id: 1,
    name: "هدفون بی‌سیم Sony WH-1000XM5",
    price: 12_500_000,
    originalPrice: 14_900_000,
    image: "/images/products/1.svg",
    category: "headphones",
    rating: 4.8,
    reviews: 342,
    isBestSeller: true,
    description: "نویزکنسلینگ فوق‌العاده، باتری ۳۰ ساعته و صدای استودیویی",
  },
  {
    id: 2,
    name: "ایرپاد پرو نسل دوم",
    price: 8_900_000,
    image: "/images/products/2.svg",
    category: "headphones",
    rating: 4.9,
    reviews: 891,
    isNew: true,
    description: "حذف نویز فعال، صدای فضایی و مقاومت در برابر آب",
  },
  {
    id: 3,
    name: "کیبورد مکانیکی Keychron K8 Pro",
    price: 4_750_000,
    originalPrice: 5_200_000,
    image: "/images/products/3.svg",
    category: "keyboard-mouse",
    rating: 4.7,
    reviews: 156,
    isBestSeller: true,
    description: "سوییچ‌های hot-swappable، بلوتوث و RGB",
  },
  {
    id: 4,
    name: "ماوس گیمینگ Logitech G Pro X Superlight",
    price: 3_890_000,
    image: "/images/products/4.svg",
    category: "keyboard-mouse",
    rating: 4.9,
    reviews: 478,
    description: "وزن ۶۳ گرمی، سنسور HERO 25K و طراحی فوق سبک",
  },
  {
    id: 5,
    name: "پاوربانک Anker 20000mAh",
    price: 1_850_000,
    originalPrice: 2_200_000,
    image: "/images/products/5.svg",
    category: "chargers",
    rating: 4.6,
    reviews: 623,
    isBestSeller: true,
    description: "شارژ سریع PD 30W و پشتیبانی از دو دستگاه همزمان",
  },
  {
    id: 6,
    name: "شارژر دیواری ۶۵ وات GaN",
    price: 980_000,
    image: "/images/products/6.svg",
    category: "chargers",
    rating: 4.5,
    reviews: 214,
    isNew: true,
    description: "تکنولوژی GaN، سه پورت و سازگار با لپ‌تاپ و موبایل",
  },
  {
    id: 7,
    name: "کیف لپ‌تاپ چرمی ۱۵ اینچ",
    price: 1_450_000,
    image: "/images/products/7.svg",
    category: "cases",
    rating: 4.4,
    reviews: 89,
    description: "چرم مصنوعی باکیفیت، جیب لپ‌تاپ و فضای کافی برای لوازم",
  },
  {
    id: 8,
    name: "اسپیکر بلوتوث JBL Flip 6",
    price: 3_250_000,
    originalPrice: 3_800_000,
    image: "/images/products/8.svg",
    category: "speakers",
    rating: 4.7,
    reviews: 512,
    isBestSeller: true,
    description: "صدای قدرتمند، ضدآب IP67 و ۱۲ ساعت پخش مداوم",
  },
];

export const featuredProducts = products.slice(0, 8);

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("fa-IR").format(price) + " تومان";
}
export type Benefit = {
  id: number;
  title: string;
  description: string;
  icon: string;
};

export type Testimonial = {
  id: number;
  name: string;
  role: string;
  rating: number;
  text: string;
};

export const benefits: Benefit[] = [
  { id: 1, title: "ارسال سریع", description: "ارسال به سراسر کشور؛ سفارش‌های تهران در همان روز", icon: "🚚" },
  { id: 2, title: "ضمانت اصالت کالا", description: "همه محصولات اورجینال و دارای گارانتی معتبر", icon: "✅" },
  { id: 3, title: "پشتیبانی ۷ روز هفته", description: "پاسخگویی سریع از طریق تلفن و پیام‌رسان", icon: "💬" },
  { id: 4, title: "بازگشت ۷ روزه", description: "در صورت نارضایتی، کالا را بدون دردسر مرجوع کن", icon: "🔄" },
];

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "سارا محمدی",
    role: "طراح گرافیک",
    rating: 5,
    text: "هدفون رو دو روزه تحویل گرفتم و اصل بودنش کاملاً مشخص بود. بسته‌بندی هم عالی بود.",
  },
  {
    id: 2,
    name: "علی رضایی",
    role: "برنامه‌نویس",
    rating: 5,
    text: "کیبورد مکانیکی رو از اینجا خریدم. قیمت منصفانه و پشتیبانی واقعاً سریع جواب داد.",
  },
  {
    id: 3,
    name: "مریم احمدی",
    role: "دانشجو",
    rating: 4,
    text: "پاوربانک رو با تخفیف گرفتم و کیفیتش از انتظارم بهتر بود. حتماً دوباره خرید می‌کنم.",
  },
];

export const specialOffer = {
  title: "پیشنهاد ویژه هفته",
  description: "فقط تا پایان تایمر، با تخفیف ویژه بخر.",
  productId: 1,
  discountPercent: 20,
  durationMs: 2 * 24 * 60 * 60 * 1000 + 5 * 60 * 60 * 1000, // ۲ روز و ۵ ساعت
};
export function formatNumber(value: number): string {
  return new Intl.NumberFormat("fa-IR").format(value);
}
export const SHIPPING_COST = 150_000;
export const FREE_SHIPPING_THRESHOLD = 5_000_000;

export function getPricing(product: Product) {
  if (product.id === specialOffer.productId) {
    const unitPrice =
      Math.round((product.price * (1 - specialOffer.discountPercent / 100)) / 1000) * 1000;
    return { unitPrice, listPrice: product.price };
  }
  return { unitPrice: product.price, listPrice: product.originalPrice ?? product.price };
}
export type ProductDetails = {
  brand: string;
  warranty: string;
  gallery?: string[];
  features: string[];
  specs: { label: string; value: string }[];
};

export const productDetails: Record<number, ProductDetails> = {
  1: {
    brand: "Sony",
    warranty: "۱۸ ماه گارانتی",
    features: ["نویزکنسلینگ هوشمند با ۸ میکروفون", "۳۰ ساعت شارژدهی", "اتصال همزمان به دو دستگاه"],
    specs: [
      { label: "نوع اتصال", value: "بلوتوث ۵.۲" },
      { label: "مدت شارژ", value: "۳۰ ساعت" },
      { label: "وزن", value: "۲۵۰ گرم" },
      { label: "رنگ", value: "مشکی" },
    ],
  },
  2: {
    brand: "Apple",
    warranty: "۱۲ ماه گارانتی",
    features: ["حذف نویز فعال", "صدای فضایی با ردیابی حرکت سر", "کیس شارژ مجهز به بلندگو"],
    specs: [
      { label: "نوع اتصال", value: "بلوتوث ۵.۳" },
      { label: "مقاومت در برابر آب", value: "IPX4" },
      { label: "شارژدهی", value: "۶ ساعت (۳۰ ساعت با کیس)" },
      { label: "رنگ", value: "سفید" },
    ],
  },
  3: {
    brand: "Keychron",
    warranty: "۱۲ ماه گارانتی",
    features: ["سوییچ‌های hot-swappable", "اتصال بلوتوث و سیمی", "نورپردازی RGB"],
    specs: [
      { label: "چیدمان", value: "۷۵٪" },
      { label: "سوییچ", value: "Gateron G Pro" },
      { label: "اتصال", value: "بلوتوث ۵.۱ / USB-C" },
      { label: "سازگاری", value: "ویندوز و مک" },
    ],
  },
  4: {
    brand: "Logitech",
    warranty: "۲۴ ماه گارانتی",
    features: ["وزن فوق سبک ۶۳ گرم", "سنسور HERO 25K", "اتصال بی‌سیم Lightspeed"],
    specs: [
      { label: "حداکثر DPI", value: "۲۵۶۰۰" },
      { label: "باتری", value: "۷۰ ساعت" },
      { label: "وزن", value: "۶۳ گرم" },
      { label: "اتصال", value: "بی‌سیم ۲.۴ گیگاهرتز" },
    ],
  },
  5: {
    brand: "Anker",
    warranty: "۱۸ ماه گارانتی",
    features: ["شارژ سریع PD 30W", "دو خروجی همزمان", "ظرفیت ۲۰۰۰۰ میلی‌آمپرساعت"],
    specs: [
      { label: "ظرفیت", value: "۲۰۰۰۰ mAh" },
      { label: "خروجی", value: "USB-C و USB-A" },
      { label: "توان", value: "۳۰ وات" },
      { label: "وزن", value: "۳۵۰ گرم" },
    ],
  },
  6: {
    brand: "Baseus",
    warranty: "۱۲ ماه گارانتی",
    features: ["تکنولوژی GaN با حرارت کمتر", "سه پورت همزمان", "سازگار با لپ‌تاپ و موبایل"],
    specs: [
      { label: "توان خروجی", value: "۶۵ وات" },
      { label: "تعداد پورت", value: "۳ پورت" },
      { label: "ورودی", value: "۱۰۰ تا ۲۴۰ ولت" },
      { label: "پروتکل", value: "PD 3.0 / QC 4.0" },
    ],
  },
  7: {
    brand: "Hoopa",
    warranty: "۶ ماه گارانتی",
    features: ["چرم مصنوعی مقاوم", "جیب ضدضربه لپ‌تاپ", "جیب‌های جداگانه برای لوازم"],
    specs: [
      { label: "سایز", value: "تا ۱۵ اینچ" },
      { label: "جنس", value: "چرم مصنوعی" },
      { label: "رنگ", value: "قهوه‌ای" },
      { label: "وزن", value: "۸۰۰ گرم" },
    ],
  },
  8: {
    brand: "JBL",
    warranty: "۱۸ ماه گارانتی",
    features: ["ضدآب و ضدگرد و غبار IP67", "۱۲ ساعت پخش مداوم", "قابلیت PartyBoost"],
    specs: [
      { label: "توان", value: "۳۰ وات" },
      { label: "مقاومت", value: "IP67" },
      { label: "اتصال", value: "بلوتوث ۵.۱" },
      { label: "باتری", value: "۱۲ ساعت" },
    ],
  },
};

export function getProductById(id: number) {
  return products.find((p) => p.id === id);
}

export function getProductDetails(id: number) {
  return productDetails[id];
}
export const toEnglishDigits = (value: string) =>
  value
    .replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)))
    .replace(/[٠-٩]/g, (d) => String("٠١٢٣٤٥٦٧٨٩".indexOf(d)));
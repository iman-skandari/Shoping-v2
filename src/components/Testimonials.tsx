import { testimonials } from "@/data/mockData";

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-16 bg-gray-50 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">نظرات مشتریان</h2>
          <p className="mt-3 text-gray-600">تجربه کسانی که از ما خرید کرده‌اند</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <figure
              key={t.id}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col"
            >
              <div className="text-yellow-500 text-lg" aria-label={`${t.rating} از ۵ ستاره`}>
                {"★".repeat(t.rating)}
                <span className="text-gray-300">{"★".repeat(5 - t.rating)}</span>
              </div>

              <blockquote className="mt-4 text-gray-700 leading-relaxed flex-1">
                «{t.text}»
              </blockquote>

              <figcaption className="mt-6 flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-bold flex items-center justify-center">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{t.name}</div>
                  <div className="text-sm text-gray-500">{t.role}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
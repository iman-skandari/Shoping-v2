"use client";

import Image from "next/image";
import { useState } from "react";

type Props = {
  images: string[];
  alt: string;
  isNew?: boolean;
  isBestSeller?: boolean;
};

export default function ProductGallery({ images, alt, isNew, isBestSeller }: Props) {
  const [active, setActive] = useState(0);

  return (
    <div className="space-y-4">
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-gray-100">
        <Image
          key={images[active]}
          src={images[active]}
          alt={alt}
          fill
          priority={active === 0}
          sizes="(min-width: 1024px) 40vw, 100vw"
          className="object-cover"
        />
        <div className="absolute inset-x-4 top-4 flex items-start justify-between">
          {isNew ? (
            <span className="rounded-full bg-green-500 px-3 py-1 text-xs font-medium text-white shadow-sm">
              جدید
            </span>
          ) : (
            <span />
          )}
          {isBestSeller && (
            <span className="rounded-full bg-orange-500 px-3 py-1 text-xs font-medium text-white shadow-sm">
              پرفروش
            </span>
          )}
        </div>
      </div>

      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {images.map((src, index) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(index)}
              aria-label={`نمایش تصویر ${index + 1}`}
              aria-current={index === active}
              className={`relative aspect-square overflow-hidden rounded-xl bg-gray-100 ring-2 transition ${
                index === active ? "ring-blue-600" : "ring-transparent hover:ring-gray-300"
              }`}
            >
              <Image src={src} alt="" fill sizes="96px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
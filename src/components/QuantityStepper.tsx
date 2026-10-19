"use client";

import { formatNumber } from "@/data/mockData";

type Props = {
  value: number;
  onIncrease: () => void;
  onDecrease: () => void;
  compact?: boolean;
};

export default function QuantityStepper({ value, onIncrease, onDecrease, compact }: Props) {
  const size = compact ? "w-8 h-8 text-lg" : "w-9 h-9 text-xl";

  return (
    <div className="inline-flex items-center rounded-xl border border-gray-200 bg-gray-50 p-0.5">
      <button
        type="button"
        onClick={onIncrease}
        aria-label="افزایش تعداد"
        className={`${size} flex items-center justify-center rounded-lg text-blue-600 hover:bg-white hover:shadow-sm active:scale-95 transition`}
      >
        +
      </button>
      <span className="min-w-8 text-center text-sm font-semibold text-gray-900 tabular-nums">
        {formatNumber(value)}
      </span>
      <button
        type="button"
        onClick={onDecrease}
        aria-label="کاهش تعداد"
        className={`${size} flex items-center justify-center rounded-lg text-gray-600 hover:bg-white hover:shadow-sm active:scale-95 transition`}
      >
        −
      </button>
    </div>
  );
}
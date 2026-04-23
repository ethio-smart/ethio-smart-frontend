"use client";

import { Star } from "lucide-react";

export default function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-3.5 h-3.5 ${
              star <= Math.floor(rating)
                ? "text-amber-400"
                : "text-slate-200 dark:text-slate-700"
            }`}
            fill="currentColor"
          />
        ))}
      </div>
      <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
        {rating}
      </span>
    </div>
  );
}


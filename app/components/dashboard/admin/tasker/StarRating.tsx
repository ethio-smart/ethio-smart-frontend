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
                : "text-muted-foreground/30 dark:text-muted-foreground/40"
            }`}
            fill="currentColor"
          />
        ))}
      </div>
      <span className="text-xs font-semibold text-foreground">
        {rating}
      </span>
    </div>
  );
}


"use client"

import { useState } from "react"
import AppPagination from "../common/Pagnation"
import { ReviewCard } from "../cards/ReviewCard"
import { Review } from "@/app/types/types"

export default function Reviews({ review }: { review: Review[] }) {
  const REVIEWS_PER_PAGE = 3
  const [page, setPage] = useState(1)

  const reviews = review || []

  const totalPages = Math.ceil(reviews.length / REVIEWS_PER_PAGE)
  const start = (page - 1) * REVIEWS_PER_PAGE
  const currentReviews = reviews.slice(start, start + REVIEWS_PER_PAGE)

  const avgRating =
    reviews.length > 0
      ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
      : 0

  const distribution = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => r.rating === star).length,
  }))

  // no reviews state
  if (reviews.length === 0) {
    return (
      <div className="p-6 border rounded-xl text-center space-y-2">
        <h3 className="text-lg font-semibold">No reviews yet</h3>
        <p className="text-sm text-muted-foreground">
          This tasker hasn’t received any reviews yet.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto p-6">

      {/* HEADER */}
      <div className="space-y-1">
        <h2 className="text-2xl font-bold">
          Reviews ({reviews.length})
        </h2>
        <p className="text-muted-foreground">
          Average Rating:{" "}
          <span className="font-semibold text-primary">
            {avgRating.toFixed(1)} ★
          </span>
        </p>
      </div>

      {/*  */}
      <div className="space-y-3">
        {distribution.map((d) => {
          const percent =
            reviews.length > 0 ? (d.count / reviews.length) * 100 : 0

          return (
            <div key={d.star} className="flex items-center gap-3 text-sm">
              <span className="w-10 font-medium">{d.star}★</span>

              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all"
                  style={{ width: `${percent}%` }}
                />
              </div>

              <span className="w-6 text-right text-muted-foreground">
                {d.count}
              </span>
            </div>
          )
        })}
      </div>

      {/* REVIEWS */}
      <div className="space-y-4">
        {currentReviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <AppPagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}
    </div>
  )
}
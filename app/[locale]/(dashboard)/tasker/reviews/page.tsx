'use client'

import { ReviewCard } from "@/app/components/cards/ReviewCard";
import { RatingSummary } from "@/app/components/dashboard/tasker/reviews/RatingSummary";
import { ReviewFilters } from "@/app/components/dashboard/tasker/reviews/ReviewFilter";
import { useState, useMemo, useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import { getTaskerReviews } from "@/app/store/slices/reviewSlice";
import { fetchUser } from "@/app/store/slices/authSlice";

interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  service: string;
  initials: string;
  avatarColor: string;
}

export default function ReviewsPage() {
  const [ratingFilter, setRatingFilter] = useState<number | null>(null)
  const [sortBy, setSortBy] = useState<'newest' | 'highest'>('newest')
  
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state) => state.auth)
  const { reviews, rating, loading, error } = useAppSelector((state) => state.review)
  console.log('review',user)

  // Fetch tasker reviews on component mount
  useEffect(() => {
    if (user?.tasker?.id) {
      dispatch(getTaskerReviews(user.tasker.id))
    }
  }, [dispatch, user?.tasker?.id])

  // ✅ TOTAL
  const totalReviews = rating?.totalReviews || 0

  // ✅ AVERAGE RATING
  const avgRating = rating?.average || 0

  // ✅ DISTRIBUTION
  const distribution = [5, 4, 3, 2, 1].map((star) => {
    const count = reviews.filter((r) => r.rating === star).length
    return {
      star,
      count,
      pct: totalReviews === 0 ? 0 : (count / totalReviews) * 100,
    }
  })

  // ✅ FILTER + SORT
  const filtered = useMemo(() => {
    return reviews
      .filter((r) => (ratingFilter ? r.rating === ratingFilter : true))
      .sort((a, b) =>
        sortBy === 'newest'
          ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          : b.rating - a.rating
      )
  }, [reviews, ratingFilter, sortBy])

  if (loading) {
    return (
      <div className="p-6 text-center">
        <div className="text-muted-foreground">Loading reviews...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6 text-center">
        <div className="text-red-500">Error loading reviews: {error}</div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">

      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-foreground font-heading">Reviews</h1> 
        <p className="text-sm text-muted-foreground mt-0.5">See what clients say about your services</p>
      </div>

      {/* Summary */}
      <RatingSummary
        avgRating={avgRating}
        totalReviews={totalReviews}
        distribution={distribution}
        onSelectRating={(star) =>
          setRatingFilter(ratingFilter === star ? null : star)
        }
        activeRating={ratingFilter}
      />

      {/* Filters */}
      <ReviewFilters
        ratingFilter={ratingFilter}
        setRatingFilter={setRatingFilter}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      {/* Reviews */}
      {filtered.length === 0 ? (
        <div className="text-center text-muted-foreground py-10 border rounded-lg">
          No reviews found
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      )}

    </div>
  )
}


'use client'

import { ReviewCard } from "@/app/components/cards/ReviewCard";
import { RatingSummary } from "@/app/components/dashboard/tasker/reviews/RatingSummary";
import { ReviewFilters } from "@/app/components/dashboard/tasker/reviews/ReviewFilter";
import { useState, useMemo } from "react"

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

// ✅ MOCK DATA (TOP LEVEL)
const MOCK_REVIEWS: Review[] = [
  { id: 'RV-001', userName: 'Sarah Johnson', rating: 5, comment: 'Absolutely amazing service! The house was spotless after the cleaning. Very professional and thorough. Will definitely book again!', date: '2025-03-28', service: 'Deep House Cleaning', initials: 'SJ', avatarColor: 'bg-blue-100 text-blue-700' },
  { id: 'RV-002', userName: 'Michael Chen', rating: 4, comment: 'Fixed the leak quickly and efficiently. Arrived on time and was very professional. Minor issue with cleanup but overall great service.', date: '2025-03-22', service: 'Pipe Leak Repair', initials: 'MC', avatarColor: 'bg-purple-100 text-purple-700' },
  { id: 'RV-003', userName: 'Amara Bekele', rating: 5, comment: 'Excellent electrical work. Very knowledgeable and explained everything clearly. The new outlets work perfectly. Highly recommended!', date: '2025-03-15', service: 'Electrical Wiring', initials: 'AB', avatarColor: 'bg-emerald-100 text-emerald-700' },
  { id: 'RV-004', userName: 'Tigist Haile', rating: 3, comment: 'The garden looks better but took longer than expected. Communication could be improved. The final result was satisfactory.', date: '2025-03-10', service: 'Garden Landscaping', initials: 'TH', avatarColor: 'bg-amber-100 text-amber-700' },
  { id: 'RV-005', userName: 'Daniel Tesfaye', rating: 5, comment: 'Incredible painting job! The colors are exactly what we wanted and the finish is flawless. Very clean and tidy worker.', date: '2025-03-05', service: 'Interior Painting', initials: 'DT', avatarColor: 'bg-red-100 text-red-700' },
  { id: 'RV-006', userName: 'Hana Girma', rating: 4, comment: 'Good service overall. The furniture was moved carefully without any damage. Would use again for future moves.', date: '2025-02-28', service: 'Furniture Moving', initials: 'HG', avatarColor: 'bg-indigo-100 text-indigo-700' },
  { id: 'RV-007', userName: 'Yonas Alemu', rating: 2, comment: 'Service was okay but not up to the standard I expected. Some areas were missed during cleaning. Needs improvement.', date: '2025-02-20', service: 'Deep House Cleaning', initials: 'YA', avatarColor: 'bg-pink-100 text-pink-700' },
  { id: 'RV-008', userName: 'Meron Tadesse', rating: 5, comment: 'Best plumber I have ever hired! Fixed everything in one visit and even checked other pipes for potential issues. Very thorough!', date: '2025-02-15', service: 'Pipe Leak Repair', initials: 'MT', avatarColor: 'bg-teal-100 text-teal-700' },
];

export default function ReviewsPage() {
  const [ratingFilter, setRatingFilter] = useState<number | null>(null)
  const [sortBy, setSortBy] = useState<'newest' | 'highest'>('newest')

  const reviews = MOCK_REVIEWS

  // ✅ TOTAL
  const totalReviews = reviews.length

  // ✅ AVERAGE RATING
  const avgRating =
    totalReviews === 0
      ? 0
      : reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews

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
          ? new Date(b.date).getTime() - new Date(a.date).getTime()
          : b.rating - a.rating
      )
  }, [reviews, ratingFilter, sortBy])

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
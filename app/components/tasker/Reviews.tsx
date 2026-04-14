

"use client"

import { useState } from "react"

import AppPagination from "../common/Pagnation"
import { ReviewCard } from "../cards/ReviewCard"

//  Mock Data (directly here)
const MOCK_REVIEWS = [
  { id: 'RV-001', userName: 'Sarah Johnson', rating: 5, comment: 'Absolutely amazing service! The house was spotless after the cleaning. Very professional and thorough. Will definitely book again!', date: '2025-03-28', service: 'Deep House Cleaning', initials: 'SJ', avatarColor: 'bg-blue-100 text-blue-700' },
  { id: 'RV-002', userName: 'Michael Chen', rating: 4, comment: 'Fixed the leak quickly and efficiently. Arrived on time and was very professional. Minor issue with cleanup but overall great service.', date: '2025-03-22', service: 'Pipe Leak Repair', initials: 'MC', avatarColor: 'bg-purple-100 text-purple-700' },
  { id: 'RV-003', userName: 'Amara Bekele', rating: 5, comment: 'Excellent electrical work. Very knowledgeable and explained everything clearly. The new outlets work perfectly. Highly recommended!', date: '2025-03-15', service: 'Electrical Wiring', initials: 'AB', avatarColor: 'bg-emerald-100 text-emerald-700' },
  { id: 'RV-004', userName: 'Tigist Haile', rating: 3, comment: 'The garden looks better but took longer than expected. Communication could be improved. The final result was satisfactory.', date: '2025-03-10', service: 'Garden Landscaping', initials: 'TH', avatarColor: 'bg-amber-100 text-amber-700' },
  { id: 'RV-005', userName: 'Daniel Tesfaye', rating: 5, comment: 'Incredible painting job! The colors are exactly what we wanted and the finish is flawless. Very clean and tidy tasker.', date: '2025-03-05', service: 'Interior Painting', initials: 'DT', avatarColor: 'bg-red-100 text-red-700' },
  { id: 'RV-006', userName: 'Hana Girma', rating: 4, comment: 'Good service overall. The furniture was moved carefully without any damage. Would use again for future moves.', date: '2025-02-28', service: 'Furniture Moving', initials: 'HG', avatarColor: 'bg-indigo-100 text-indigo-700' },
  { id: 'RV-007', userName: 'Yonas Alemu', rating: 2, comment: 'Service was okay but not up to the standard I expected. Some areas were missed during cleaning. Needs improvement.', date: '2025-02-20', service: 'Deep House Cleaning', initials: 'YA', avatarColor: 'bg-pink-100 text-pink-700' },
  { id: 'RV-008', userName: 'Meron Tadesse', rating: 5, comment: 'Best plumber I have ever hired! Fixed everything in one visit and even checked other pipes for potential issues. Very thorough!', date: '2025-02-15', service: 'Pipe Leak Repair', initials: 'MT', avatarColor: 'bg-teal-100 text-teal-700' },
]

export default function Reviews() {
  const REVIEWS_PER_PAGE = 3
  const [page, setPage] = useState(1)

  const reviews = MOCK_REVIEWS

  //  Pagination
  const totalPages = Math.ceil(reviews.length / REVIEWS_PER_PAGE)
  const start = (page - 1) * REVIEWS_PER_PAGE
  const currentReviews = reviews.slice(start, start + REVIEWS_PER_PAGE)

  //  Average Rating
  const avgRating =
    reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length || 0

  //  Distribution
  const distribution = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => r.rating === star).length,
  }))

  return (
    <div className="space-y-6 max-w-4xl mx-auto p-6">

      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold">
          Reviews ({reviews.length})
        </h2>
        <p className="text-muted-foreground">
          Average Rating: {avgRating.toFixed(1)} ★
        </p>
      </div>

      {/* Rating Breakdown */}
      <div className="space-y-2">
        {distribution.map((d) => (
          <div key={d.star} className="flex items-center gap-3 text-sm">
            <span className="w-10">{d.star}★</span>

            <div className="flex-1 h-2 bg-muted rounded">
              <div
                className="h-2 bg-primary rounded"
                style={{
                  width: `${(d.count / reviews.length) * 100}%`,
                }}
              />
            </div>

            <span className="w-6 text-right">{d.count}</span>
          </div>
        ))}
      </div>

      {/* Review Cards */}
      <div className="space-y-4">
        {currentReviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>

      {/* Pagination */}
      <AppPagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  )
}
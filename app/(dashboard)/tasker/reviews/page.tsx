// 'use client';

// import { useState, useEffect } from 'react';

// import Icon from '@/components/ui/AppIcon';

// interface Review {
//   id: string;
//   userName: string;
//   rating: number;
//   comment: string;
//   date: string;
//   service: string;
//   initials: string;
//   avatarColor: string;
// }

// const MOCK_REVIEWS: Review[] = [
//   { id: 'RV-001', userName: 'Sarah Johnson', rating: 5, comment: 'Absolutely amazing service! The house was spotless after the cleaning. Very professional and thorough. Will definitely book again!', date: '2025-03-28', service: 'Deep House Cleaning', initials: 'SJ', avatarColor: 'bg-blue-100 text-blue-700' },
//   { id: 'RV-002', userName: 'Michael Chen', rating: 4, comment: 'Fixed the leak quickly and efficiently. Arrived on time and was very professional. Minor issue with cleanup but overall great service.', date: '2025-03-22', service: 'Pipe Leak Repair', initials: 'MC', avatarColor: 'bg-purple-100 text-purple-700' },
//   { id: 'RV-003', userName: 'Amara Bekele', rating: 5, comment: 'Excellent electrical work. Very knowledgeable and explained everything clearly. The new outlets work perfectly. Highly recommended!', date: '2025-03-15', service: 'Electrical Wiring', initials: 'AB', avatarColor: 'bg-emerald-100 text-emerald-700' },
//   { id: 'RV-004', userName: 'Tigist Haile', rating: 3, comment: 'The garden looks better but took longer than expected. Communication could be improved. The final result was satisfactory.', date: '2025-03-10', service: 'Garden Landscaping', initials: 'TH', avatarColor: 'bg-amber-100 text-amber-700' },
//   { id: 'RV-005', userName: 'Daniel Tesfaye', rating: 5, comment: 'Incredible painting job! The colors are exactly what we wanted and the finish is flawless. Very clean and tidy worker.', date: '2025-03-05', service: 'Interior Painting', initials: 'DT', avatarColor: 'bg-red-100 text-red-700' },
//   { id: 'RV-006', userName: 'Hana Girma', rating: 4, comment: 'Good service overall. The furniture was moved carefully without any damage. Would use again for future moves.', date: '2025-02-28', service: 'Furniture Moving', initials: 'HG', avatarColor: 'bg-indigo-100 text-indigo-700' },
//   { id: 'RV-007', userName: 'Yonas Alemu', rating: 2, comment: 'Service was okay but not up to the standard I expected. Some areas were missed during cleaning. Needs improvement.', date: '2025-02-20', service: 'Deep House Cleaning', initials: 'YA', avatarColor: 'bg-pink-100 text-pink-700' },
//   { id: 'RV-008', userName: 'Meron Tadesse', rating: 5, comment: 'Best plumber I have ever hired! Fixed everything in one visit and even checked other pipes for potential issues. Very thorough!', date: '2025-02-15', service: 'Pipe Leak Repair', initials: 'MT', avatarColor: 'bg-teal-100 text-teal-700' },
// ];

// const StarRating = ({ rating, size = 16 }: { rating: number; size?: number }) => (
//   <div className="flex items-center gap-0.5">
//     {[1, 2, 3, 4, 5].map(star => (
//       <svg key={star} width={size} height={size} viewBox="0 0 20 20" fill={star <= rating ? '#F59E0B' : '#E5E7EB'}>
//         <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//       </svg>
//     ))}
//   </div>
// );

// export default function ReviewsPage() {
//   const [isHydrated, setIsHydrated] = useState(false);
//   const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [ratingFilter, setRatingFilter] = useState<number | null>(null);
//   const [sortBy, setSortBy] = useState<'newest' | 'highest'>('newest');

//   useEffect(() => { setIsHydrated(true); }, []);

//   const totalReviews = MOCK_REVIEWS.length;
//   const avgRating = MOCK_REVIEWS.reduce((sum, r) => sum + r.rating, 0) / totalReviews;

//   const ratingDistribution = [5, 4, 3, 2, 1].map(star => ({
//     star,
//     count: MOCK_REVIEWS.filter(r => r.rating === star).length,
//     pct: (MOCK_REVIEWS.filter(r => r.rating === star).length / totalReviews) * 100,
//   }));

//   const filtered = MOCK_REVIEWS
//     .filter(r => ratingFilter === null || r.rating === ratingFilter)
//     .sort((a, b) => sortBy === 'newest' ? new Date(b.date).getTime() - new Date(a.date).getTime() : b.rating - a.rating);

//   const sidebarWidth = isSidebarCollapsed ? 'lg:pl-' : 'lg:pl-[0px]';

//   if (!isHydrated) {
//     return (
//       <div className="min-h-screen bg-background flex items-center justify-center">
//         <div className="w-10 h-10 rounded-full border-4 border-primary border-t-transparent animate-spin" />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen ">
      
//       <main id="main-content" className={`transition-all duration-[250ms] ease-out ${sidebarWidth}`}>
//         <div className="p-4 lg:p-6 space-y-5  mx-auto">

//           {/* Page Header */}
//           <div>
//             <h1 className="text-xl font-bold text-foreground font-heading">Reviews</h1>
//             <p className="text-sm text-muted-foreground mt-0.5">See what clients say about your services</p>
//           </div>

//           {/* Rating Summary Card */}
//           <div className="bg-card rounded-xl border border-border shadow-warm-sm p-6">
//             <div className="flex flex-col md:flex-row gap-8">
//               {/* Overall Rating */}
//               <div className="flex flex-col items-center justify-center md:w-48 shrink-0">
//                 <p className="text-6xl font-bold font-mono text-foreground">{avgRating.toFixed(1)}</p>
//                 <StarRating rating={Math.round(avgRating)} size={20} />
//                 <p className="text-sm text-muted-foreground mt-2">{totalReviews} reviews total</p>
//               </div>

//               {/* Divider */}
//               <div className="hidden md:block w-px bg-border" />

//               {/* Distribution */}
//               <div className="flex-1 space-y-2.5">
//                 {ratingDistribution.map(({ star, count, pct }) => (
//                   <button key={star} onClick={() => setRatingFilter(ratingFilter === star ? null : star)} className={`w-full flex items-center gap-3 group transition-standard ${ratingFilter === star ? 'opacity-100' : 'opacity-80 hover:opacity-100'}`}>
//                     <div className="flex items-center gap-1 w-16 shrink-0">
//                       <span className="text-sm text-muted-foreground">{star}</span>
//                       <svg width="14" height="14" viewBox="0 0 20 20" fill="#F59E0B"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
//                     </div>
//                     <div className="flex-1 h-2.5 rounded-full bg-muted overflow-hidden">
//                       <div className={`h-full rounded-full transition-all duration-500 ${ratingFilter === star ? 'bg-amber-500' : 'bg-amber-400'}`} style={{ width: `${pct}%` }} />
//                     </div>
//                     <span className="text-sm text-muted-foreground w-8 text-right font-mono">{count}</span>
//                   </button>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Filters */}
//           <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
//             <div className="flex items-center gap-2 flex-wrap">
//               <button onClick={() => setRatingFilter(null)} className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-standard ${ratingFilter === null ? 'bg-primary text-primary-foreground' : 'bg-card border border-border text-foreground hover:bg-muted'}`}>All</button>
//               {[5, 4, 3, 2, 1].map(star => (
//                 <button key={star} onClick={() => setRatingFilter(ratingFilter === star ? null : star)} className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-standard ${ratingFilter === star ? 'bg-amber-500 text-white' : 'bg-card border border-border text-foreground hover:bg-muted'}`}>
//                   {star} <svg width="12" height="12" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
//                 </button>
//               ))}
//             </div>
//             <select value={sortBy} onChange={e => setSortBy(e.target.value as 'newest' | 'highest')} className="px-3 py-2 rounded-lg border border-border bg-card text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-standard">
//               <option value="newest">Newest First</option>
//               <option value="highest">Highest Rating</option>
//             </select>
//           </div>

//           {/* Reviews List */}
//           {filtered.length === 0 ? (
//             <div className="bg-card rounded-xl border border-border shadow-warm-sm p-12 text-center">
//               <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mx-auto mb-3">
//                 <Icon name="StarIcon" size={24} variant="outline" className="text-muted-foreground" />
//               </div>
//               <p className="text-muted-foreground font-medium">No reviews found</p>
//             </div>
//           ) : (
//             <div className="space-y-4">
//               {filtered.map(review => (
//                 <div key={review.id} className="bg-card rounded-xl border border-border shadow-warm-sm p-5 hover:shadow-warm-md transition-standard">
//                   <div className="flex items-start gap-4">
//                     <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${review.avatarColor}`}>{review.initials}</div>
//                     <div className="flex-1 min-w-0">
//                       <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
//                         <div>
//                           <p className="font-semibold text-foreground">{review.userName}</p>
//                           <div className="flex items-center gap-2 mt-0.5">
//                             <StarRating rating={review.rating} size={14} />
//                             <span className="text-xs text-muted-foreground">{review.rating}/5</span>
//                           </div>
//                         </div>
//                         <div className="text-right">
//                           <p className="text-xs text-muted-foreground">{review.date}</p>
//                           <span className="inline-block mt-1 px-2 py-0.5 rounded-md bg-muted text-xs text-muted-foreground">{review.service}</span>
//                         </div>
//                       </div>
//                       <p className="text-sm text-muted-foreground leading-relaxed">{review.comment}</p>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// }

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
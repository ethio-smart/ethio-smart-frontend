import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Star, StarIcon } from "lucide-react"
import { FaStar } from "react-icons/fa"

interface DistributionItem {
  star: number
  count: number
  pct: number
}

interface RatingSummaryProps {
  avgRating: number
  totalReviews: number
  distribution: DistributionItem[]
  onSelectRating: (rating: number | null) => void
  activeRating: number | null
}

export const RatingSummary = ({
  avgRating,
  totalReviews,
  distribution,
  onSelectRating,
  activeRating,
}: RatingSummaryProps) => {

  // Render 5 stars, partially filled for average
  const renderAvgStars = () => {
    return [1,2,3,4,5].map((star) => {
      const fill = star <= avgRating ? "text-yellow-500" : star - 1 < avgRating ? "text-gray-300" : "text-gray-300"
      return <FaStar  key={star} className={`w-5 h-5 ${fill}`} />
    })
  }

  return (
    <Card>
      <CardContent className="p-6 flex flex-col md:flex-row gap-6">
        
        {/* Average Rating */}
        <div className="text-center md:w-40 flex flex-col items-center gap-2">
          <p className="text-5xl font-bold">{avgRating.toFixed(1)}</p>
          
          <div className="flex items-center gap-1">
            {renderAvgStars()}
          </div>
          
          <p className="text-sm text-muted-foreground mt-1">
            {totalReviews} reviews
          </p>
        </div>

        {/* Distribution Bars */}
        <div className="flex-1 space-y-2">
          {distribution.map((d) => (
            <button
              key={d.star}
              onClick={() =>
                onSelectRating(activeRating === d.star ? null : d.star)
              }
              className="flex items-center gap-3 w-full"
            >
              <span className="w-6 flex items-center gap-1">
                {d.star}
                <StarIcon className="w-4 h-4 text-yellow-500" />
              </span>

              {/* Progress with yellow fill and light gray background */}
              <Progress
                value={d.pct}
                className="flex-1 bg-gray-200 [&>div]:bg-yellow-500"
              />

              <span className="w-6 text-right text-sm">{d.count}</span>
            </button>
          ))}
        </div>

      </CardContent>
    </Card>
  )
}
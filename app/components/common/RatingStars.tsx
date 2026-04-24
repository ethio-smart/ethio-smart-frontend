import { Star } from "lucide-react"

type RatingStarsProps = {
  rating: number
  size?: number
  showValue?: boolean
}

export default function RatingStars({
  rating,
  size = 16,
  showValue = false,
}: RatingStarsProps) {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 >= 0.5

  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, index) => {
        if (index < fullStars) {
          return (
            <Star
              key={index}
              size={size}
              className="text-yellow-400 fill-yellow-400"
            />
          )
        }

        if (index === fullStars && hasHalfStar) {
          return (
            <div key={index} className="relative">
              <Star size={size} className="text-gray-300" />
              <Star
                size={size}
                className="absolute top-0 left-0 text-yellow-400 fill-yellow-400 overflow-hidden"
                style={{ clipPath: "inset(0 50% 0 0)" }}
              />
            </div>
          )
        }

        return (
          <Star
            key={index}
            size={size}
            className="text-gray-300"
          />
        )
      })}

      {showValue && (
        <span className="text-sm text-muted-foreground ml-1">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  )
}
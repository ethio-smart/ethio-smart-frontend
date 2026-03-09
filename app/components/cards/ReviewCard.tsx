

import { Card, CardContent } from "@/app/components/ui/card"
import { Avatar, AvatarFallback } from "@/app/components/ui/avatar"
import { ReviewType } from "@/app/types/types"
import RatingStars from "../common/RatingStars"


export default function ReviewCard({
  review,
}: {
  review: ReviewType
}) {
  return (
    <Card className="shadow-none">
      <CardContent className="p- space-y-2 ">

        {/* Header */}
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarFallback>
              {review.user.name.charAt(0)}
            </AvatarFallback>
          </Avatar>

          <div>
            <p className="font-medium text-sm">
              {review.user.name}
            </p>
            <p className="text-xs text-muted-foreground">
              {new Date(review.createdAt).toDateString()}
            </p>
          </div>
        </div>

        {/* Rating */}
        <RatingStars rating={review.rating} />

        {/* review */}
        <p className="text-sm text-muted-foreground leading-relaxed">
          {review.comment}
        </p>

      </CardContent>
    </Card>
  )
}
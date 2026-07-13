import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"
import type { Review } from "@/app/types/types"

interface ReviewCardProps {
  review: Review & {
    userName?: string
    avatarUrl?: string
    avatarColor?: string
    date?: string
    service?: string
  }
}

const getInitials = (userName?: string) => {
  if (!userName) return "U"
  return userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

export const ReviewCard = ({ review }: ReviewCardProps) => {
  const initials = getInitials(review.userName)

  return (
    <Card className="shadow-sm">
      <CardContent className="p-4 flex gap-4">

        <Avatar size="lg">
          <AvatarImage src={review.avatarUrl} alt={review.userName} />
          <AvatarFallback className={review.avatarColor}>
            {initials}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <div className="flex justify-between">

            <div>
              <p className="font-semibold">{review.userName || "User"}</p>
              <p className="text-sm flex items-center gap-1">
                {review.rating}
                <Star className="inline-block w-4 h-4 fill-yellow-400 text-yellow-400" />
              </p>
            </div>

            <div className="text-xs text-muted-foreground text-right">
              <p>{review.date}</p>
              {review.service && <Badge variant="secondary">{review.service}</Badge>}
            </div>

          </div>

          <p className="text-sm text-muted-foreground mt-2">
            {review.comment || "No comment provided"}
          </p>
        </div>

      </CardContent>
    </Card>
  )
}
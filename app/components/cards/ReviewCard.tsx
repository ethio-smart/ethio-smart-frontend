import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"

interface Review {
  userName: string
  avatarUrl?: string
  avatarColor?: string
  initials: string
  rating: number
  date: string
  service: string
  comment: string
}

interface ReviewCardProps {
  review: Review
}

export const ReviewCard = ({ review }: ReviewCardProps) => {
  return (
    <Card className="shadow-sm">
      <CardContent className="p-4 flex gap-4">
        
        <Avatar size="lg">
          <AvatarImage src={review.avatarUrl} alt={review.userName} />
          <AvatarFallback className={review.avatarColor}>
            {review.initials}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <div className="flex justify-between">
            
            <div>
              <p className="font-semibold">{review.userName}</p>
              <p className="text-sm flex items-center gap-1">
                {review.rating}
                <Star className="inline-block w-4 h-4 fill-yellow-400 text-yellow-400" />
              </p>
            </div>

            <div className="text-xs text-muted-foreground text-right">
              <p>{review.date}</p>
              <Badge variant="secondary">{review.service}</Badge>
            </div>

          </div>

          <p className="text-sm text-muted-foreground mt-2">
            {review.comment}
          </p>
        </div>

      </CardContent>
    </Card>
  )
}
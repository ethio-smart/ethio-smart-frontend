import { TaskerType } from "@/app/types/types"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { MapPin } from "lucide-react"
import RatingStars from "../common/RatingStars"

export default function TaskerProfileHeader({
  tasker,
}: {
  tasker: TaskerType
}) {
  return (
    <div className="space-y-4">

      <div className="flex items-center gap-5">
        <Avatar className="h-24 w-24">
          <AvatarImage src={tasker.user.image || ""} />
          <AvatarFallback>
            {tasker.user.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <h2 className="sm:text-2xl font-bold">
              {tasker.user.name}
            </h2>
           

            {tasker.isVerified && (
              <Badge className="bg-green-100 text-green-700">
                Verified Pro
              </Badge>
            )}
          </div>

          <p className="text-muted-foreground sm:text-base font-medium uppercase">
            {tasker.services[0]?.name}
          </p>

          <div className="sm:flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <RatingStars rating={tasker.rating} />
              <span>{tasker.rating.toFixed(1)}</span>
              <span>({tasker.totalReviews} reviews)</span>
            </div>

            {tasker.location && (
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {tasker.location}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Trust Metrics */}
      <div className="grid grid-cols-3 gap-4 text-sm">
        <div className="bg-gray-50 p-3 rounded-lg text-center shadow-2xs border border-gray-300">
          <p className="font-semibold">{tasker.bookings.length}+</p>
          <p className="text-muted-foreground text-xs">Completed Jobs</p>
        </div>

        <div className="bg-gray-50 p-3 rounded-lg text-center shadow-2xs border border-gray-30">
          <p className="font-semibold">
            12 Year&apos;s
            {/* {tasker.totalEarnings.toLocaleString()} ETB */}
          </p>
          <p className="text-muted-foreground text-xs">Exprience</p>
        </div>

        <div className="bg-gray-50 p-3 rounded-lg text-center shadow-2xs border border-gray-30">
          <p className="font-semibold">
            {tasker.languages.join(", ")}
          </p>
          <p className="text-muted-foreground text-xs">Languages</p>
        </div>
      </div>
    </div>
  )
}
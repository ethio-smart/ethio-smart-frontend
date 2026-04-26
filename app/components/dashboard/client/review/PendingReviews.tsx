"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"

const pendingReviews = [
  {
    id: 1,
    name: "Selamawit T.",
    avatar: "/profile.png",
    profession: "House Cleaning Specialist",
    serviceTitle: "Living Room Cleaning",
    completionDate: "June 24, 2024",
  },
  {
    id: 2,
    name: "Abebe B.",
    avatar: "/profile.png",
    profession: "Plumber",
    serviceTitle: "Kitchen Sink Leak Repair",
    completionDate: "June 20, 2024",
  },
  {
    id: 3,
    name: "Kaleb H.",
    avatar: "/profile.png",
    profession: "Electrician",
    serviceTitle: "Electrical Wiring Check",
    completionDate: "June 15, 2024",
  },
]

export default function PendingReviews() {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold">Pending Reviews</h2>
      <p className="text-sm text-muted-foreground">
        Manage your recently completed services that require your feedback.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {pendingReviews.map((review) => (
          <div
            key={review.id}
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-200"
          >
            <div className="flex items-center gap-4">
              <Image
                src={review.avatar}
                alt={review.name}
                width={64}
                height={64}
                className="rounded-full size-14 object-cover"
              />
              <div>
                <h3 className="text-lg font-semibold">{review.name}</h3>
                <p className="text-sm text-muted-foreground">{review.profession}</p>
              </div>
            </div>

            <div className="mt-3 text-sm text-muted-foreground">
              <p className="font-medium">{review.serviceTitle}</p>
              <p>Completed: {review.completionDate}</p>
            </div>

            {/* <div className="flex items-center gap-1 mt-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-5 h-5 text-gray-300" />
              ))}
            </div>

            <textarea
              placeholder="Write your feedback..."
              className="mt-3 w-full border rounded-md p-2 text-sm resize-none focus:outline-none focus:ring-1 focus:ring-green-500"
              rows={3}
              disabled
            /> */}

            <Button
              className=" w-full bg-primary text-white font-semibold py-2 rounded-lg "
             
            >
              Rate Now
            </Button>
          </div>
        ))}
      </div>
    </section>
  )
}
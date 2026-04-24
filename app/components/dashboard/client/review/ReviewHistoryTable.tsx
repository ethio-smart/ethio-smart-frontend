"use client"

import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Star } from "lucide-react"
import Image from "next/image"

const reviewHistory = [
  {
    id: 1,
    tasker: "Selamawit T.",
    taskerAvatar: "/profile.png",
    serviceCategory: "House Cleaning",
    rating: 5,
    feedback: "Excellent work, very thorough and punctual!",
    date: "June 24, 2024",
  },
  {
    id: 2,
    tasker: "Abebe B.",
    taskerAvatar: "/profile.png",
    serviceCategory: "Plumbing",
    rating: 4,
    feedback: "Fixed the sink quickly but arrived late.",
    date: "June 20, 2024",
  },
  {
    id: 3,
    tasker: "Kaleb H.",
    taskerAvatar: "/profile.png",
    serviceCategory: "Electrical Wiring",
    rating: 3,
    feedback: "Average service, some wires were loose.",
    date: "June 15, 2024",
  },
]

export default function ReviewHistoryTable() {
  return (
    <div className="border rounded-lg bg-white overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="font-semibold">
            <TableHead>tasker</TableHead>
            <TableHead>Service Category</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead>Feedback</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {reviewHistory.map((review) => (
            <TableRow key={review.id} className="hover:bg-gray-50">
              <TableCell className="flex items-center gap-2 px-4 py-2">
                <Image
                  src={review.taskerAvatar}
                  alt={review.tasker}
                  width={32}
                  height={32}
                  className="rounded-full object-cover size-9"
                />
                <span className="font-medium">{review.tasker}</span>
              </TableCell>

              <TableCell>{review.serviceCategory}</TableCell>

              <TableCell className="flex items-center gap-1">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-500" />
                ))}
              </TableCell>

              <TableCell className="text-sm text-muted-foreground truncate max-w-xs">
                {review.feedback}
              </TableCell>

              <TableCell>{review.date}</TableCell>

              <TableCell>
                <Button className="bg-secondary text-black hover:underline text-xs">
                  View Details
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
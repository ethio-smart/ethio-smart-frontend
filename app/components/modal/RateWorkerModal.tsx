"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog"


import Image from "next/image"

import { Star } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

interface Worker {
  name: string
  avgRating: number
  profileImg: string
}

interface Props {
  open: boolean
  onClose: () => void
  worker?: Worker
}


const dummyWorker: Worker = {
  name: "John Doe",
  avgRating: 4.7,
  profileImg: "/profile.png",
}

export default function RateWorkerModal({ open, onClose, worker }: Props) {
  const [rating, setRating] = useState(0)

  const displayWorker = worker || dummyWorker

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">

        {/* Worker Info */}
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-full overflow-hidden border border-gray-200">
            <Image
              src={displayWorker.profileImg}
              alt={displayWorker.name}
              width={64}
              height={64}
              className="object-cover"
            />
          </div>
          <div>
            <p className="font-semibold text-lg">{displayWorker.name}</p>
            
          </div>
        </div>

        <DialogHeader>
          <DialogTitle className="text-center">Rate the Worker</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <Label>How was your Experience?</Label>

          {/* Rating Stars */}
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={30}
                onClick={() => setRating(star)}
                className={`cursor-pointer transition ${
                  rating >= star
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>

          <Label>Write Your Review</Label>
          <Textarea
            placeholder="Share your experience (optional)"
            className="min-h-[120px]"
          />

          {/* Buttons */}
          <div className="flex justify-end gap-3">
            <DialogClose asChild>
              <Button variant="outline">Skip</Button>
            </DialogClose>
            <Button className="bg-primary text-white">Submit Review</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
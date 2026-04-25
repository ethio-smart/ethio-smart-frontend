

'use client'

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { MapPin, Star } from "lucide-react"
import Link from "next/link"
import { Tasker } from "@/app/types/types"
import { HiOutlineBadgeCheck } from "react-icons/hi"
import { useAppDispatch } from "@/app/hooks/hooks"
import { inviteTasker } from "@/app/store/slices/requestSlice"
import { useState } from "react"
import RequestSuccessModal from "../modal/RequestSuccessModal"

export default function TaskerCard({
  tasker,
  requestId,
}: {
  tasker: Tasker
  requestId: string
}) {
  const dispatch = useAppDispatch()

  const [loading, setLoading] = useState(false)
  const [successOpen, setSuccessOpen] = useState(false)

  const handleSendRequest = async (taskerId: string) => {
    try {
      setLoading(true)
      const res = await dispatch(
        inviteTasker({ requestId, taskerId })
      ).unwrap()

      if (res) {
        setSuccessOpen(true)
      }
    } catch (err) {
      console.log("Invite failed:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="bg-white rounded-xl shadow-xs flex flex-col h-full py-6">

        {/* MAIN CONTENT */}
        <div className="p-8 flex gap-10 flex-1">

          {/* LEFT SIDE */}
          <div className="flex gap-6 flex-1">
            <div className="space-y-3">
              <Avatar className="w-20 h-20">
                <AvatarImage src={tasker.user?.imageurl} />
                <AvatarFallback>
                  {tasker.user?.firstName?.charAt(0).toUpperCase()}
                  {tasker.user?.lastName?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-4">
                <h2 className="text-xl font-semibold">
                  {tasker.user?.firstName} {tasker.user?.lastName}
                </h2>

                <Badge variant="secondary" className="flex items-center gap-1">
                  <HiOutlineBadgeCheck />
                  {tasker.status}
                </Badge>
              </div>

              <div className="text-sm text-muted-foreground space-y-2">
                <span className="flex items-center gap-2">
                  <MapPin size={15} className="text-primary" />
                  {tasker.location}
                </span>

                <div className="flex items-center gap-2">
                  <Star size={16} className="text-yellow-500" />
                  <span>
                    {tasker.rating} ({tasker.totalReviews} reviews)
                  </span>
                </div>
              </div>

              <p className="text-sm text-muted-foreground max-w-md line-clamp-4">
                {tasker.bio}
              </p>
            </div>
          </div>


        </div>

        {/* ACTION BUTTONS (BOTTOM RIGHT FIX) */}
        <div className="px-8 mt-auto flex justify-end gap-3">
          <Button
            type="button"
            className={loading ? "animate-pulse" : ""}
            disabled={loading}
            onClick={() => handleSendRequest(tasker.id)}
          >
            {loading ? "Sending..." : "Send Request"}
          </Button>
          <Link href={`/en/tasker/${tasker.id}`}>
            <Button variant="outline">View Profile</Button>
          </Link>

          {/* <Link
            href={{
              pathname: `/en/tasker/${tasker.id}`,
              query: { tasker: JSON.stringify(tasker) },
            }}
          >
            <Button variant="outline">View Profile</Button>
          </Link> */}
        </div>
      </div>

      {/* MODAL */}
      <RequestSuccessModal
        fname={tasker.user?.firstName || ""}
        lname={tasker.user?.lastName || ""}
        open={successOpen}
        onClose={() => setSuccessOpen(false)}
      />
    </>
  )
}
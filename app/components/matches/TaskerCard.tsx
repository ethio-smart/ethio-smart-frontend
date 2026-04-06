'use client'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { MapPin, Star } from "lucide-react"
import Link from "next/link"
import { Tasker } from "@/app/types/types"
import { HiOutlineBadgeCheck } from "react-icons/hi";
import { useAppDispatch } from "@/app/hooks/hooks"

import { inviteTasker } from "@/app/store/slices/requestSlice"
import { useState } from "react"
import RequestSuccessModal from "../modal/RequestSuccessModal"

export default function TaskerCard({ tasker, requestId }: { tasker: Tasker, requestId: string }) {
  const dispatch = useAppDispatch()
  // const { , error, request } = useAppSelector((state => state.request))
  // console.log('request id from tasker card', requestId)
  // console.log('tasker id from tasker card', tasker.id)
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
      <div className="bg-white rounded-xl shadow-xs">
        <div className="p-8 flex justify-between gap-10">
          {/* right */}
          <div className="flex gap-6">
            {/* avatar */}
            <div className="space-y-3">
              <Avatar className="w-20 h-20">
                <AvatarImage src={tasker.user?.imageurl} />
                <AvatarFallback>
                  {tasker.user?.firstName.charAt(0)}
                  {tasker.user?.lastName.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <p className="text-primary uppercase font-bold text-xs text-center">Master Plumber</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-4">
                {/* name */}
                <h2 className="text-xl font-semibold">
                  {tasker.user?.firstName} {tasker.user?.lastName}
                </h2>
                {/* status badge */}
                <Badge className="" variant="secondary">
                  <HiOutlineBadgeCheck />
                  {tasker.status}
                </Badge>
              </div>

              <div className="text-sm text-muted-foreground flex gap-4">
                {/* location */}
                <span className="flex items-center gap-2"><MapPin size={15} className="text-primary " />{tasker.location}</span>
                {/* <span className="flex items-center gap-2"><Award className="text-primary " size={15}/>{tasker.experience}</span> */}

                {/* rating n reviews */}
                <div className="flex items-center gap-2 text-sm">
                  <Star size={16} className="text-yellow-500" />
                  <span>
                    {tasker.rating} ({tasker.totalReviews} reviews)
                  </span>
                </div>
              </div>
              {/* bio */}
              <p className="text-sm text-muted-foreground max-w-md line-clamp-4">
                {tasker.bio}
              </p>
            </div>
          </div>
          {/* left */}
          <div className=" space-y-8 bg-[#FCFCFC  min-w-62.5  shadow-s p-6  rounded-mss ">

            <div className="flex flex-col gap-3">
              <Button type="button" className={`${loading ? 'animate-pulse' : ''}`} disabled={loading} onClick={() => handleSendRequest(tasker.id)}>

                {loading ? "Sending..." : "Send Request"}
              </Button>
              <Link href={`/tasker/${tasker.id}`}>
                <Button variant="outline" className="w-full">
                  View Profile
                </Button>
              </Link>
            </div>
          </div>
        </div>

      </div>
      <RequestSuccessModal
      fname={tasker.user?.firstName}
      lname={tasker.user?.lastName}
        open={successOpen}
        onClose={() => setSuccessOpen(false)}

      />
    </>
  )
}
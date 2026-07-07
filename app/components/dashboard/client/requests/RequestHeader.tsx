"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import RescheduleRequestDialog from "./RescheduleRequestDialog"
import { Clock, Star } from "lucide-react"
import ConfirmCompletionModal from "@/app/components/modal/ConfimCompletionModal"
import RatetaskerModal from "@/app/components/modal/RateWorkerModal"
import { Invitation, RequestStatus } from "@/app/types/types"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


type RequestHeaderProps = {
  status: RequestStatus
  invitation: Invitation[]
}

export default function RequestHeader({ status, invitation }: RequestHeaderProps) {
  const [rateOpen, setRateOpen] = useState(false)
  console.log('invitation from request header', invitation)
  //handle client confirm task completiion
  const handleConfirm = () => {

    setRateOpen(true)
  }

  return (
    <>

      <div className="flex justify-between items-center p-4">

        < div className="space-y-4">
          <h2 className="text-xl font-bold">
            <Badge className="bg-orange-300">{status}</Badge>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {invitation.map((inv) => (
              <div
                key={inv.id}
                className="bg-white p-4 md:p-5 rounded-md shadow-xs border space-y-4"
              >
                {/* */}
                <Badge className="bg-secondary float-end text-primary text-[8px] mb-2 md:mb-4">
                  {inv.status}
                </Badge>

                <div className="flex items-center gap-4 md:gap-6">
                  <Avatar className="w-14 h-14 md:w-16 md:h-16 shrink-0">
                    <AvatarImage
                      src={inv.tasker?.user?.imageurl}
                      className="aspect-square object-cover border-2 border-primary"
                    />
                    <AvatarFallback>
                      {inv.tasker?.user?.firstName.charAt(0).toUpperCase()}
                      {inv.tasker?.user?.lastName.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>


                  <div className="space-y-1 min-w-0">
                    <h3 className="font-semibold text-base md:text-lg capitalize truncate">
                      {inv.tasker?.user?.firstName} {inv.tasker?.user?.lastName}
                    </h3>

                    <p className="text-xs md:text-sm flex items-center gap-1 text-yellow-500">
                      <Star size={14} /> {inv.tasker.rating} (
                      {inv.tasker.totalReviews} reviews)
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* buttons  */}
        <div className="space-x-2 flex items-center">
          {/* Reschedule button */}
          {invitation.length > 0 && (
            <RescheduleRequestDialog
              bookingId={invitation[0].id}
              currentSchedule={invitation[0].preferedDate || ''}
            >
              <Button
                size="lg"
                variant="outline"
                className="border-primary border text-primary"
              >
                <Clock /> Reschedule
              </Button>
            </RescheduleRequestDialog>
          )}
          {/* Confirm Completion  */}
          <ConfirmCompletionModal onConfirm={handleConfirm}>
            <Button size="lg" variant="default">
              Confirm Completion
            </Button>
          </ConfirmCompletionModal>
          {/* Rating modal opens  */}
          <RatetaskerModal
            
            open={rateOpen}
            onClose={() => setRateOpen(false)}
          />

        </div>
      </div>
    </>
  )
}
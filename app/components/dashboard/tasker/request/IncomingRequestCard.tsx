import {
  CalendarDays,
  CircleDollarSign,
  Clock,
  MapPin,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { Invitation, RequestStatus } from "@/app/types/types"
import StatusBadge from "../../client/requests/StatusBage"
import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks"
import { acceptRequest, cancelRequest } from "@/app/store/slices/requestSlice"
import { toast } from "sonner"


type Props = {
  invitation: Invitation

}

export default function IncomingRequestCard({
  invitation,
}: Props) {
  const request = invitation.serviceRequest
  const{incomingInvitations,loading}=useAppSelector(state=>state.request)
    // console.log('incoming invite from incoming request card ',incomingInvitations)
  const date = request.preferedDate
    ? new Date(request.preferedDate)
    : null
    const dispatch=useAppDispatch()
    
const handleRequestAccept = async (id: string) => {
  try {
    await dispatch(acceptRequest(id)).unwrap()

    toast.success("Request accepted successfully!")
  } catch (error) {
    toast.error("Failed to accept request")
  }
}

//reject request
const handleRequestReject = async (id: string) => {
  try {
    await dispatch(cancelRequest(id)).unwrap()

    toast.success("Request rejected successfully!")
  } catch (error) {
    toast.error("Failed to reject request")
  }
}
  return (
    <Card className="shadow-none border h-full flex flex-col justify-between">
      <CardContent className="px-8 flex flex-col gap-4 flex-1">

        {/* Header */}
        <div className="space-y-3 max-w-3xl">
          <div className="flex items-center gap-3">
            <span className="text-xs px-2 py-1 rounded bg-secondary">
              {request.category?.name}
            </span>

            <h3 className="font-bold text-xl">
              {request.description.slice(0, 40)}
            </h3>
             <StatusBadge status={invitation.status } />
          </div>

          <p className="text-sm text-muted-foreground">
            {request.description}
          </p>

          {/* Info */}
          <div className="flex gap-6 text-sm text-muted-foreground flex-wrap">
            <span className="flex items-center gap-2">
              <MapPin size={15} className="text-primary" />
              {request.location}
            </span>

            <span className="flex items-center gap-2">
              <CircleDollarSign size={15} className="text-primary" />
              {request.budget}
            </span>

            <span className="flex items-center gap-2">
              <CalendarDays size={15} className="text-primary" />
              {date?.toLocaleDateString()}
            </span>

            <span className="flex items-center gap-2">
              <Clock size={15} className="text-primary" />
              {date?.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-2 justify-between mt-4">

          {/* Left: status */}
          <p className="text-sm text-muted-foreground">
            {/* {invitation.serviceRequest.dynamicData} */}
            {/* Incoming request from <b>{request.serviceRequest.user.firstname} {request.serviceRequest.user.lastname}</b> */}
          </p>
          

          {/* Right: buttons */}
          <div className="flex gap-2">
            {invitation.status === RequestStatus.PENDING && (
              <>
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/80 text-white"
              onClick={() => handleRequestAccept(invitation.id)}
            >
              {loading.accept ? "Accepting..." : "Accept"}
              {/* Accept */}
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="text-red-500 border-red-500 hover:bg-red-500 hover:text-white"
              onClick={() => handleRequestReject(invitation.id)}
            >
              {loading.reject ? "Rejecting..." : "Reject"}
              {/* Reject */}
            </Button>
          
            </>)
     }
             <Link href={`/client/requests/${request.id}`}>
              <Button
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-white"
              >
               View Details
              </Button>
            </Link>
          </div>
        </div>

      </CardContent>
    </Card>
  )
}
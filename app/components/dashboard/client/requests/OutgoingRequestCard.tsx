
'use client'

import {
  CalendarDays,
  CircleDollarSign,
  Clock,
  Edit,
  MapPin,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import StatusBadge from "./StatusBage"
import CancelRequestDialog from "./CancelRequestDialog"
import RescheduleRequestDialog from "./RescheduleRequestDialog"
import EditRequestDialog from "./EditRequestDialog"
import Link from "next/link"

import { Request } from "@/app/types/types"
import { cancelRequest } from "@/app/store/slices/requestSlice"
import { useAppDispatch } from "@/app/hooks/hooks"
import { toast } from "sonner"

export default function OutgoingRequestCard({
  invitation,
}: {
  invitation: Request
}) {
  console.log('invitation ------',invitation)
  console.log('invitation ------',invitation.invitations)
  const date = invitation?.preferedDate
    ? new Date(invitation.preferedDate)
    : null
    const dispatch = useAppDispatch()

 const handleCancelRequest = (invitationId: string) => async () => {

    console.log('Cancel request with ID😭😭😭😭😭😭:', invitationId)
      try {
        await dispatch(cancelRequest(invitationId)).unwrap()
        toast.success("Request cancelled successfully!")
      } catch (error) {
         console.log(error)
        toast.error("Failed to cancel request")
      }
  }
  // Pending taskers 
  const pendingTaskers =
    invitation.invitations
      ?.filter((inv) => inv.status === "PENDING")
      .map((inv) => inv.tasker?.user)
      .filter(Boolean) || []

  const pendingNames = pendingTaskers
    .map((user) => `${user?.firstName || ''} ${user?.lastName || ''}`)
    .join(", ")

  // Accepted tasker 
  const acceptedTasker =
    invitation.invitations?.find((inv) => inv.status === "ACCEPTED")
      ?.tasker?.user

  // Rejected taskers 
  const rejectedTaskers =
    invitation.invitations
      ?.filter((inv) => inv.status === "REJECTED")
      .map((inv) => inv.tasker?.user)
      .filter(Boolean) || []

  const rejectedNames = rejectedTaskers
    .map((user) => `${user?.firstName || ''} ${user?.lastName || ''}`)
    .join(", ")

  return (
    <Card className="shadow-none border h-full flex flex-col justify-between">
      <CardContent className="px-8 flex flex-col gap-4 flex-1">

        {/* Top Content */}
        <div className="space-y-3 max-w-3xl">

          <div className="flex items-center gap-3">
            <span className="text-xs px-2 py-1 rounded bg-secondary">
              {invitation?.category?.name || "Category"}
            </span>

            <h3 className="font-bold text-xl">
              {invitation?.tittle || "No title"}
            </h3>

            <StatusBadge status={invitation.status || 'PENDING'} />
          </div>

          <p className="text-sm text-muted-foreground line-clamp-3">
            {invitation?.description || "No description"}
          </p>

          <div className="flex gap-6 text-sm text-muted-foreground">

            <span className="flex items-center gap-2">
              <MapPin size={15} className="text-primary" />
              {invitation?.location || "No location"}
            </span>

            <span className="flex items-center gap-2">
              <CircleDollarSign size={15} className="text-primary" />
              {invitation?.budget}
            </span>

            <span className="flex items-center gap-2">
              <CalendarDays size={15} className="text-primary" />
              {date?.toLocaleDateString()}

              <Clock size={15} className="text-primary" />
              {date?.toLocaleTimeString([], {
                hour: "numeric",
                minute: "2-digit",
              })}
            </span>

          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-wrap gap-2 justify-between mt-3 items-center">

          {/* Tasker Info */}
          <div>
            <p className="text-sm">

              {/* PENDING */}
              {invitation.status === "PENDING" && (
                <>
                  {pendingTaskers.length > 0 ? (
                    <>
                      Invitation sent to{" "}
                      <b className="text-xs">{pendingNames}</b>
                    </>
                  ) : (
                    <>Invitation sent (waiting for tasker)</>
                  )}
                </>
              )}

              {/* ACCEPTED  */}
              {invitation.status === "ACCEPTED" && acceptedTasker && (
                <>
                  Accepted by{" "}
                  <b className="text-xs">
                    {acceptedTasker.firstName} {acceptedTasker.lastName}
                  </b>
                </>
              )}

              {/* REJECTED*/}
              {invitation.status === "REJECTED" && (
                <>
                  {rejectedTaskers.length > 0 ? (
                    <>
                      Rejected by{" "}
                      <b className="text-xs">{rejectedNames}</b>
                    </>
                  ) : (
                    <>Request was rejected</>
                  )}
                </>
              )}

            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-2 justify-end">

            {invitation.status === "PENDING" && (
              <>
                <EditRequestDialog request={invitation}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border text-black px-10 hover:bg-primary hover:text-white"
                  >
                    <Edit /> Edit
                  </Button>
                </EditRequestDialog>

                <CancelRequestDialog onConfirm={handleCancelRequest(invitation.id)}>
                  <Button
                  // onClick={handleCancelRequest(invitation.id)}
                    size="lg"
                    variant="outline"
                    className="text-red-500 hover:bg-red-500 hover:text-white border"
                  >
                    Cancel
                  </Button>
                </CancelRequestDialog>
              </>
            )}

            {invitation.status === "ACCEPTED" && (
              <>
                {/* <Button size="lg" variant="outline">
                  Pay
                </Button> */}

                {/* <RescheduleRequestDialog>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-primary border text-primary"
                  >
                    <Clock /> Reschedule
                  </Button>
                </RescheduleRequestDialog> */}
              </>
            )}

            <Link href={{
              pathname: `/client/requests/${invitation?.id}`,
              query:{invitation: JSON.stringify(invitation)}
            }}>
              <Button
                size="lg"
                className="border-primary border bg-white text-primary px-10 hover:bg-primary hover:text-white"
              >
                Details
              </Button>
            </Link>

          </div>
        </div>
      </CardContent>
    </Card>
  )
}
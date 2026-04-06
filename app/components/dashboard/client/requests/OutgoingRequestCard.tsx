'use client"'
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

import { Invitation } from "@/app/types/types"

export default function OutgoingRequestCard({ invitation, }: { invitation: Invitation }) {
  const request = invitation.serviceRequest
  const date = request?.preferedDate
    ? new Date(request.preferedDate)
    : null


  return (
    <Card className="shadow-none border h-full flex flex-col justify-between">
      <CardContent className="px-8 flex flex-col gap-4 flex-1">

        {/* Top Content */}
        <div className="space-y-3 max-w-3xl">

          <div className="flex items-center gap-3">
            <span className="text-xs px-2 py-1 rounded bg-secondary">
              {request.category?.name}
            </span>

            <h3 className="font-bold text-xl">
              {request.description.slice(1, 41)}
            </h3>

            <StatusBadge status={invitation.status} />
          </div>

          <p className="text-sm text-muted-foreground">
            {request.description}
          </p>

          <div className="flex gap-6 text-sm text-muted-foreground">

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

              <Clock size={15} className="text-primary" />
              {date?.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>



          </div>

          {/* {tasker && (
            <p className="text-sm">
              Assigned to <b>{tasker.bio}</b>
            </p>
          )} */}
        </div>


        <div className="flex flex-wrap gap-2 justify-between mt-4">
          <div className="">
            <p className="text-sm">
              {invitation.status === "PENDING" && (
                <>Invitation sent to <b>Jung Kook</b></>
              )}

              {invitation.status === "ACCEPTED" && (
                <>Accepted by <b>Jung Kook</b></>
              )}

              {invitation.status === "REJECTED" && (
                <>Rejected by <b>Jung Kook</b></>
              )}
            </p>
          </div>
          {/* Bottom Buttons */}
          <div className="flex flex-wrap gap-2 ">
            {invitation.status === "PENDING" && (
              <>
                <EditRequestDialog request={request}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border text-black px-10 hover:bg-primary hover:text-white"
                  >
                    <Edit /> Edit
                  </Button>
                </EditRequestDialog>

                <CancelRequestDialog
                  onConfirm={() => {
                    console.log("Cancel request:", request.id)
                  }}
                >
                  <Button
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
                <Button size="lg" variant="outline">
                  Message tasker
                </Button>

                <RescheduleRequestDialog>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-primary border text-primary"
                  >
                    <Clock /> Reschedule
                  </Button>
                </RescheduleRequestDialog>
              </>
            )}

            <Link href={`/client/requests/${request.id}`}>
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
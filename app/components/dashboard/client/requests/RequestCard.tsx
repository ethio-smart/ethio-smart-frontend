/* eslint-disable @typescript-eslint/no-explicit-any */
import { CalendarDays, CircleDollarSign, Clock, Edit, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import StatusBadge from "./StatusBage";
import CancelRequestDialog from "./CancelRequestDialog";
import RescheduleRequestDialog from "./RescheduleRequestDialog";
import EditRequestDialog from "./EditRequestDialog";
import Link from "next/link";


export default function RequestCard({ request }: any) {
  return (
    <Card className="shadow-none border h-full flex flex-col justify-between">
      <CardContent className="px-8 flex flex-col gap-4 flex-1">

        {/* Top Content */}
        <div className="space-y-3 max-w-3xl">
          <div className="flex items-center gap-3">
            <span className="text-xs px-2 py-1 rounded bg-secondary">
              {request.category}
            </span>
            <h3 className="font-bold text-xl">{request.title}</h3>
            <StatusBadge status={request.status} />
          </div>

          <p className="text-sm text-muted-foreground">{request.description}</p>

          <div className="flex gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <MapPin size={15} className="text-primary" /> {request.location}
            </span>
            <span className="flex items-center gap-2">
              <CircleDollarSign size={15} className="text-primary" /> {request.price}
            </span>
            <span className="flex items-center gap-2">
              <CalendarDays size={15} className="text-primary" /> {request.time}
            </span>
          </div>

          {request.tasker && (
            <p className="text-sm">
              Assigned to <b>{request.tasker}</b>
            </p>
          )}
        </div>

        {/* Bottom Buttons */}
        <div className="flex flex-wrap gap-2 justify-end mt-4">


          {request.status === "PENDING" && (
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
                  console.log("Request cancelled:", request.id)
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

          {request.status === "ACCEPTED" && (
            <>
              <Button size="lg" variant="outline" className="border-black border ">Message tasker</Button>
              <RescheduleRequestDialog
                // onConfirm={(data) => console.log("Reschedule:", request.id, data)}
              >
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
          <Link href={'/client/requests/12'}>
          <Button size="lg" className="border-primary border bg-white text-primary px-10 hover:bg-primary hover:text-white">
            Details
          </Button>
          </Link>
        </div>

      </CardContent>
    </Card>
  )
}
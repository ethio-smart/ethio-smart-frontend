"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TaskCompletion } from "@/app/types/types"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import ConfirmCompletionModal from "@/app/components/modal/ConfimCompletionModal"
import DeclineCompletionModal from "@/app/components/modal/DeclineCompletionModal"

type Props = {
  data: TaskCompletion
}

export default function TaskCompletionCard({ data }: Props) {
  console.log('data from task completion',data)

  return (
    <Card className="p-4 space-y-1 shadow-none">

      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-lg capitalize">
          {data.booking?.serviceRequest.tittle}
        </h3>

        <Badge
          className={
            data.status === "ACCEPTED"
              ? "bg-blue-100 text-blue-700 "
              : data.status === "DECLINED"
                ? "bg-red-100 text-red-700"
                : "bg-yellow-100 text-yellow-700"
          }
        >
          {data.status}
        </Badge>
      </div>

      {/* Completion Note */}
      <div>
        <p className="text-sm">{data.completionNote}</p>
      </div>

      <div className="text-xs text-muted-foreground text-right flex gap-4">
        <p>{data.booking?.serviceRequest.location}</p>
        <p>{data.booking?.serviceRequest.budget}</p>

        {data.createdAt
          ? new Date(data.createdAt).toLocaleString()
          : "N/A"}
      </div>

      <div className="flex gap-2">
        {data.status === "PENDING" &&
          <>

            {/* <Button
          size="lg"
          className="bg-primary hover:bg-primary/80 text-white"
          onClick={() => handleTaskConfrim(data.id)}
        >
          {loading.update.confirm ? "Confirming..." : "Confirm"}
        </Button> */}
            {data.booking?.id && data.id && (
              <ConfirmCompletionModal bookingId={data.booking?.id} id={data.id}>
                <Button size="lg" className="bg-primary text-white">
                  Confirm
                </Button>
              </ConfirmCompletionModal>
            )}

            {data.id && (
              <DeclineCompletionModal id={data.id}>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-red-500 border-red-500 hover:bg-red-500 hover:text-white"
                >
                  Decline
                </Button>
              </DeclineCompletionModal>
            )}

            {/* <Button
          size="lg"
          variant="outline"
          className="text-red-500 border-red-500 hover:bg-red-500 hover:text-white"
          onClick={() => handleRequestDecline(data.id)}
        >
          {loading.update.decline ? "Declining..." : "Decline"}
        </Button> */}
          </>
        }

        <Link href={`/en/client/requests/`}>
          <Button
            size="lg"
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-white"
          >
            View Details
          </Button>
        </Link>
      </div>
    </Card>
  )
}
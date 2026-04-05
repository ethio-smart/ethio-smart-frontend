"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import RescheduleRequestDialog from "./RescheduleRequestDialog"
import { Clock } from "lucide-react"
import ConfirmCompletionModal from "@/app/components/modal/ConfimCompletionModal"
import RatetaskerModal from "@/app/components/modal/RateWorkerModal"
// import RatetaskerModal from "@/app/components/modal/RatetaskerModal"



export default function RequestHeader() {
  const [rateOpen, setRateOpen] = useState(false)

  // Called when user confirms completion
  const handleConfirm = () => {
  
    setRateOpen(true)
  }

  return (
    <div className="flex justify-between items-start p-4">
      {/* Left side: Status and service info */}
      <div>
        <h2 className="text-xl font-bold">
          <Badge className="bg-orange-300">IN PROGRESS</Badge>
        </h2>
        <p className="text-gray-500">
          Plumbing Repair · Home Maintenance Service
        </p>
      </div>

      {/* Right side: Action buttons */}
      <div className="space-x-2 flex items-center">

        {/* Reschedule button */}
        <RescheduleRequestDialog>
          <Button
            size="lg"
            variant="outline"
            className="border-primary border text-primary"
          >
            <Clock /> Reschedule
          </Button>
        </RescheduleRequestDialog>

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
  )
}
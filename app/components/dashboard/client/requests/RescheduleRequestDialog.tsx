"use client"

import { useState } from "react"

import {
  
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"

import { Calendar } from "@/components/ui/calendar"

import { Button } from "@/components/ui/button"

import { CalendarDays, Clock } from "lucide-react"
import { Dialog } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface Props {
  children: React.ReactNode
}

export default function RescheduleRequestDialog({ children }: Props) {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [selectedSlot, setSelectedSlot] = useState("")
  const [reason, setReason] = useState("")

  const slots = [
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
  ]

  const handleConfirm = () => {
    console.log({
      date,
      timeSlot: selectedSlot,
      reason,
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="max-w-2xl p-10 space-y-4">

        <DialogHeader>
          <DialogTitle>Reschedule Service</DialogTitle>
          <DialogDescription>
            Select a new date and available time for the service.
          </DialogDescription>
        </DialogHeader>

        {/* Current Schedule */}
        <div className="border border-primary bg-secondary rounded-lg p-4 flex items-center gap-3">

          <CalendarDays className="text-primary" size={20} />

          <div className="flex flex-col">
            <span className="text-sm font-medium">Current Schedule</span>
            <span className="text-sm text-muted-foreground">
              oct 23 monday • 9:00 AM
            </span>
          </div>

        </div>

        {/* Calendar + Time Slots */}
        <div className="flex gap-8 ">

          {/* Calendar */}
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            captionLayout="dropdown"
            className="rounded-lg border border-primary"
          />

          {/* Time Slots */}
          <div className="flex flex-col gap-3 min-w-50">

            <div className="flex items-center gap-2 font-medium text-sm">
              <Clock size={16} />
              Available Time Slots
            </div>

            <div className="grid grid-cols-2 gap-2">

              {slots.map((slot) => (
                <button
                  key={slot}
                  onClick={() => setSelectedSlot(slot)}
                  className={`px-4 py-2 rounded-md border text-sm transition 
                  ${
                    selectedSlot === slot
                      ? "bg-primary text-white border-primary"
                      : "border-primary bg-secondary"
                  }`}
                >
                  {slot}
                </button>
              ))}

            </div>

            <p className="text-xs text-muted-foreground bg-gray-100 rounded-md p-3">
              tasker is available during these weekday hours.
            </p>

          </div>

        </div>

        {/* Reason */}
        <div className="space-y-2">

          <Label className="text-sm font-medium">
            Reason for rescheduling
          </Label>

          <Textarea
            placeholder="Explain why you need to change the schedule..."
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />

        </div>

        <DialogFooter className="">
          <DialogClose asChild>
    <Button variant="outline" className="px-10">
      Cancel
    </Button>
  </DialogClose>
          <Button onClick={handleConfirm}>Confirm Reschedule</Button>
        </DialogFooter>

      </DialogContent>
    </Dialog>
  )
}
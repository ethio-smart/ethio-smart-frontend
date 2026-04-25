// "use client"

// import { useState } from "react"

// import {
  
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogDescription,
//   DialogFooter,
//   DialogTrigger,
//   DialogClose,
// } from "@/components/ui/dialog"

// import { Calendar } from "@/components/ui/calendar"
// import { Button } from "@/components/ui/button"
// import { CalendarDays, CalendarRange } from "lucide-react"
// import { Dialog } from "@/components/ui/dialog"
// import { Input } from "@/components/ui/input"
// interface Props {
//   children: React.ReactNode
// }

// export default function RescheduleRequestDialog({ children }: Props) {
//   const [date, setDate] = useState<Date | undefined>(new Date())
//   const [selectedSlot, setSelectedSlot] = useState("")
 

//   const handleConfirm = () => {
//     console.log({
//       date,
//       timeSlot: selectedSlot,
    
//     })
//   }

//   return (
//     <Dialog>
//       <DialogTrigger asChild>{children}</DialogTrigger>
//       <DialogContent className="max-w-2xl p-10 space-y-4">
//         <DialogHeader>
//           <DialogTitle>Reschedule Service</DialogTitle>
//           <DialogDescription>
//             Select a new date and available time for the service.
//           </DialogDescription>
//         </DialogHeader>

//         {/* Current Schedule */}
//         <div className="border border-primary bg-secondary rounded-lg p-4 flex items-center gap-3">

//           <CalendarDays className="text-primary" size={20} />

//           <div className="flex flex-col">
//             <span className="text-sm font-medium">Current Schedule</span>
//             <span className="text-sm text-muted-foreground">
//               oct 23 monday • 9:00 AM
//             </span>
//           </div>

//         </div>

//         {/* Calendar + Time Slots */}
//          <div className="flex items-center gap-2 font-medium text-sm">
//               < CalendarRange size={16} />
//              Prefered Date and Time
//             </div>
//         <div className="flex gap-8 ">
           
//           {/* Calendar */}
//           <Calendar
//             mode="single"
//             selected={date}
//             onSelect={setDate}
//             captionLayout="dropdown"
//             className="rounded-lg border border-primary"
//           />

//           {/* Time Slots */}
//           <div className="flex flex-col gap-3 min-w-50">

//             <Input type="time"/>

//           </div>

//         </div>
//         <DialogFooter className="">
//           <DialogClose asChild>
//     <Button variant="outline" className="px-10">
//       Cancel
//     </Button>
//   </DialogClose>
//           <Button onClick={handleConfirm}>Confirm Reschedule</Button>
//         </DialogFooter>

//       </DialogContent>
//     </Dialog>
//   )
// }

"use client"

import { useState } from "react"
import {
  Dialog,
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
import { CalendarDays, CalendarRange } from "lucide-react"
import { Input } from "@/components/ui/input"
import { rescheduleBooking } from "@/app/store/slices/bookingSlice"
import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks"
import { toast } from "sonner"

interface Props {
  children: React.ReactNode
  bookingId: string
  currentSchedule:string
}

export default function RescheduleRequestDialog({ children,currentSchedule, bookingId }: Props) {
  const [formData, setFormData] = useState<{
    preferedDate: string | null
  }>({
    preferedDate: null,
  })

  const [loading, setLoading] = useState(false)
  const dispatch=useAppDispatch()
  const{success}=useAppSelector(state=>state.booking)
  
  console.log('form data',formData)
  console.log('booking id',bookingId)

  const handleDateTimeChange = (value: string, type: "date" | "time") => {
  const current = formData.preferedDate
    ? new Date(formData.preferedDate)
    : new Date()

  let date = current.toISOString().split("T")[0]
  let time = current.toTimeString().slice(0, 5)

  if (type === "date") date = value
  if (type === "time") time = value

  const combined = new Date(`${date}T${time}`).toISOString()

  setFormData((prev) => ({
    ...prev,
    preferedDate: combined,
  }))
}

  const handleConfirm = async () => {
    if (!formData.preferedDate) {
      console.log("Missing date/time")
      return
    }
    if(success){

      toast.success("Booking rescheduled successfully")
    }

    try {
      setLoading(true)

      console.log({
        bookingId,
        preferedDate: formData.preferedDate,
      })

      // 🔥 plug your redux here
      await dispatch(rescheduleBooking({ bookingId, preferedDate: formData.preferedDate }))

    } catch (err) {
      console.log(err)
        toast.error("Failed to reschedule booking")
    } finally {
      setLoading(false)
    }
  }

  // extract values for inputs
  const currentDate = formData.preferedDate
    ? new Date(formData.preferedDate)
    : null

  const dateValue = currentDate
    ? currentDate.toISOString().split("T")[0]
    : ""

  const timeValue = currentDate
    ? currentDate.toTimeString().slice(0, 5)
    : ""
 const formatDateTime = (dateString: string) => {
  return new Date(dateString).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="max-w-2xl p-10 space-y-4">
        <DialogHeader>
          <DialogTitle>Reschedule Service</DialogTitle>
          <DialogDescription>
            Select a new date and available time.
          </DialogDescription>
        </DialogHeader>

        {/* Current Schedule */}
        <div className="border border-primary bg-secondary rounded-lg p-4 flex items-center gap-3">
          <CalendarDays className="text-primary" size={20} />
          <div className="flex flex-col">
            <span className="text-sm font-medium">Current Schedule</span>
            <span className="text-sm text-muted-foreground">
              {/* Oct 23 • 9:00 AM */}
              {formatDateTime(currentSchedule)}
            </span>
          </div>
        </div>

        {/* Date + Time */}
        <div className="flex items-center gap-2 font-medium text-sm">
          <CalendarRange size={16} />
          Preferred Date and Time
        </div>

        <div className="flex gap-8">
          {/* Calendar */}
          <Calendar
            mode="single"
            selected={currentDate || undefined}
            onSelect={(d) => {
              if (!d) return
              handleDateTimeChange(
                d.toISOString().split("T")[0],
                "date"
              )
            }}
            captionLayout="dropdown"
            className="rounded-lg border border-primary"
          />

          {/* Time Input */}
          <div className="flex flex-col gap-3 min-w-37.5">
            <Input
              type="time"
              value={timeValue}
              onChange={(e) =>
                handleDateTimeChange(e.target.value, "time")
              }
            />
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" className="px-10">
              Cancel
            </Button>
          </DialogClose>

          <Button
            onClick={handleConfirm}
            disabled={!formData.preferedDate || loading}
          >
            {loading ? "Updating..." : "Confirm Reschedule"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
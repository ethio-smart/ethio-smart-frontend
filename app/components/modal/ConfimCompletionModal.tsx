

"use client"

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks"
import { updateTaskCompletionStatus } from "@/app/store/slices/taskCompletion"
import { toast } from "sonner"
import RatetaskerModal from "./RateWorkerModal"

interface Props {
  children: React.ReactNode
  id: string,
  bookingId:string
}

export default function ConfirmCompletionModal({ children, id,bookingId }: Props) {
  const dispatch = useAppDispatch()
  const [openRating, setOpenRating] = useState(false)
  const { loading, success } = useAppSelector((state) => state.task)

  const [open, setOpen] = useState(false)

  const handleConfirm = () => {
    dispatch(
      updateTaskCompletionStatus({
        id,
        status: "ACCEPTED",
      })
    )
  }

  // close modal on success
  useEffect(() => {
    if (success.confirm) {
       toast.success("Task confirmed successfully")
      setOpen(false)
        setOpenRating(true)
    }
    
  }, [success.confirm])

  return (
    <>
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>

      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CheckCircle className="text-green-500" size={20} />
            Confirm Completion
          </DialogTitle>

          <DialogDescription>
            Once confirmed, payment will be released to the tasker.
            This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-end gap-3 pt-6">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={loading.update.confirm}
          >
            Cancel
          </Button>

          <Button
            onClick={handleConfirm}
            disabled={loading.update.confirm}
            className="bg-primary text-white"
          >
            {loading.update.confirm ? "Confirming..." : "Confirm"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>

<RatetaskerModal
  open={openRating}
  bookingId={bookingId}
  onClose={() => setOpenRating(false)}
/>
</>
  )
}
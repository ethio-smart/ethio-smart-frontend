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
import { AlertTriangle } from "lucide-react"
import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks"
import { updateTaskCompletionStatus } from "@/app/store/slices/taskCompletion"
import { toast } from "sonner"

interface Props {
  children: React.ReactNode
  id: string
}

export default function DeclineCompletionModal({ children, id }: Props) {
  const dispatch = useAppDispatch()

  const { loading, success } = useAppSelector((state) => state.task)

  const [open, setOpen] = useState(false)

  const handleDecline = () => {
    dispatch(
      updateTaskCompletionStatus({
        id,
        status: "DECLINED",
      })
    )
  }

  // close only on success
  useEffect(() => {
    if (success.decline) {
         toast.error("Request declined")
      setOpen(false)
    }
  }, [success.decline])
  

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>

      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-600">
            <AlertTriangle size={20} />
            Decline Request
          </DialogTitle>

          <DialogDescription>
            This will reject the completion request. The tasker will be notified
            and this action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-end gap-3 pt-6">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={loading.update.decline}
          >
            Cancel
          </Button>

          <Button
            onClick={handleDecline}
            disabled={loading.update.decline}
            className="bg-red-600 text-white hover:bg-red-700"
          >
            {loading.update.decline ? "Declining..." : "Decline"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
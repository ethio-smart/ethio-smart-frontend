"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useAppSelector } from "@/app/hooks/hooks"

interface CancelRequestDialogProps {
  children: React.ReactNode
  onConfirm?: () => void
}

export default function CancelRequestDialog({
  children,
  onConfirm,
}: CancelRequestDialogProps) {
  const{loading}=useAppSelector((state) => state.request)
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Cancel Service Request</DialogTitle>
          <DialogDescription>
            Are you sure you want to cancel this request? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex gap-2 justify-end">
          <DialogClose asChild>
    <Button variant="outline" className="px-10">
      Keep Request
    </Button>
  </DialogClose>

          <Button
            variant="destructive"
            onClick={onConfirm}
          >
            {loading.cancel ? "Cancelling..." :  "Yes, Cancel Request"}
           
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
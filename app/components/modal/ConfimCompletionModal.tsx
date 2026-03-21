"use client"

import {
Dialog,
DialogTrigger,
DialogContent,
DialogHeader,
DialogTitle,
DialogDescription,
DialogClose,
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

interface Props {
children: React.ReactNode
onConfirm: () => void
}

export default function ConfirmCompletionModal({
children,
onConfirm,
}: Props) {
return ( <Dialog>

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
        Once confirmed, the payment will be released to the worker
        and the service request will be marked as completed.
        This action cannot be undone.
      </DialogDescription>
    </DialogHeader>

    <div className="flex justify-end gap-3 pt-6">

      <DialogClose asChild>
        <Button variant="outline">
          Cancel
        </Button>
      </DialogClose>

      <DialogClose asChild>
        <Button
          onClick={onConfirm}
          className="bg-primary text-white"
        >
          Confirm
        </Button>
      </DialogClose>

    </div>

  </DialogContent>

</Dialog>


)
}

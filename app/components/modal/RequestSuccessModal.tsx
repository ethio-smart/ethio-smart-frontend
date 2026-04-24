"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { FcApproval } from "react-icons/fc";
import Link from "next/link";

type Props = {
  open: boolean
  onClose: () => void
  fname: string
  lname: string
}

export default function RequestSuccessModal({ open, onClose, fname, lname }: Props) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-primary flex items-center gap-2 text-center">
            <FcApproval size={30} />  Request Sent Successfully
          </DialogTitle>
          <DialogDescription className="">
            Your request has been sent to <strong>{fname} {lname}</strong>.
            They will be notified and can respond shortly.
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-end gap-2 pt-4">
          <DialogFooter>
            <DialogClose>

              <Button variant="secondary" >
                Close
              </Button>
            </DialogClose>

            <Link href={`/client/requests`}>
              <Button type="button">
                View Request
              </Button>
            </Link>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  )
}
"use client"

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { AlertTriangle } from "lucide-react"
import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks"
import { useEffect, useState } from "react"
import { clearDisputeState, createDispute } from "@/app/store/slices/disputeSlice"
import { toast } from "sonner"


interface RaiseDisputeModalProps {
    children: React.ReactNode
    bookingId: string
}

export default function RaiseDisputeModal({ children, bookingId }: RaiseDisputeModalProps) {
    const dispatch = useAppDispatch()
    const { creating, success, error } = useAppSelector(state => state.dispute)
      const [open, setOpen] = useState(false)
    const [form, setForm] = useState({
        bookingId,
        reason: '',
        description: ''
    })
    const handleDispute = () => {
        if (!form.reason || !form.description) {
      toast.error("All fields are required ")
      return
    }
        dispatch(createDispute(
            form
        ))
    }
    useEffect(() => {
    if (success) {
      toast.success("Dispute submitted successfully ")

      setOpen(false)

      setForm({
        bookingId,
        reason: "",
        description: "",
      })

      dispatch(clearDisputeState())
    }
  }, [success, dispatch, bookingId])
    console.log('dispute error', error)
    console.log('dispute form', form)
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>

            <DialogContent className="max-w-xl">

                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <AlertTriangle className="text-red-500" size={20} />
                        Raise a Dispute
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-5 mt-4">
                    <div className="space-y-2">
                        <Label>Reason</Label>
                        <Input
                            onChange={(e) =>
                                setForm((prev) => ({
                                    ...prev,
                                    reason: e.target.value,
                                }))
                            }
                            placeholder="what is your reason?" />
                    </div>
                    {/* Description */}
                    <div className="space-y-2">
                        <Label>Describe the Issue</Label>

                        <Textarea
                            placeholder="Explain what happened..."
                            className="min-h-30"
                        onChange={(e) =>
                            setForm((prev) => ({
                                ...prev,
                                description: e.target.value,
                            }))

                        }
                         />
                    </div>

                    {/* upload photo */}
                    {/* <div className="space-y-2">
                        <Label className="flex items-center gap-2">

                            Upload Evidence
                        </Label>

                        <Label
                            htmlFor="file"
                            className="flex items-center justify-center gap-2 border border-gray-500 bg-gray-50 rounded-lg py-6 cursor-pointer hover:bg-black/5 transition"
                        >
                            <LuImage size={18} className="text-gray-500" />
                            <span className="text-sm font-medium text-gray-500">
                                Upload Images
                            </span>
                        </Label>

                        <Input
                            id="file"
                            type="file"
                            multiple
                            className="hidden"
                        />
                    </div> */}



                    {/* Buttons */}
                    <div className="flex justify-end gap-3 pt-4">

                        <DialogClose asChild>
                            <Button variant="outline">
                                Cancel
                            </Button>
                        </DialogClose>

                        <Button onClick={handleDispute} className={`bg-primary ${creating ? 'animate-pulse' : ''}  text-white`}>
                            {creating ? 'Submitting' : 'Submit Dispute'}
                        </Button>

                    </div>

                </div>

            </DialogContent>

        </Dialog>
    )
}
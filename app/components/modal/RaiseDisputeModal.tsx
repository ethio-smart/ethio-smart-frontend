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

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { Label } from "@/components/ui/label"

import { AlertTriangle } from "lucide-react"
import { LuImage } from "react-icons/lu"

interface Props {
    children: React.ReactNode
}

export default function RaiseDisputeModal({ children }: Props) {
    return (
        <Dialog>

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

                    {/* Dispute Type */}
                    <div className="space-y-2">
                        <Label>Issue Type</Label>

                        <Select>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select dispute reason" />
                            </SelectTrigger>

                            <SelectContent >
                                <SelectItem value="no-show">tasker did not show up</SelectItem>
                                <SelectItem value="quality">Poor service quality</SelectItem>
                                <SelectItem value="price">Incorrect pricing</SelectItem>
                                <SelectItem value="incomplete">Work not completed</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <Label>Describe the Issue</Label>

                        <Textarea
                            placeholder="Explain what happened..."
                            className="min-h-30"

                        />
                    </div>

                    {/* upload photo */}
                    <div className="space-y-2">
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
                    </div>

                    {/* Resolution */}
                    <div className="space-y-2">
                        <Label>Preferred Resolution</Label>

                        <Select>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="What outcome do you want?" />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value="refund">Full Refund</SelectItem>
                                <SelectItem value="partial">Partial Refund</SelectItem>
                                <SelectItem value="redo">Redo the Service</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-3 pt-4">

                        <DialogClose asChild>
                            <Button variant="outline">
                                Cancel
                            </Button>
                        </DialogClose>

                        <Button className="bg-primary  text-white">
                            Submit Dispute
                        </Button>

                    </div>

                </div>

            </DialogContent>

        </Dialog>
    )
}
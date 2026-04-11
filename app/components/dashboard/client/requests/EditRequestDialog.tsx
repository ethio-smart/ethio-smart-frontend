/* eslint-disable @typescript-eslint/no-explicit-any */
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

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

import { MapPin, CircleDollarSign, CalendarDays, Clock } from "lucide-react"
import { Label } from "@/components/ui/label"

interface Props {
  children: React.ReactNode
  request: any
}

export default function EditRequestDialog({ children, request }: Props) {
  // console.log('EditRequestDialog received request:', request)
  // console.log('request.title:', request?.title)
  // console.log('request.description:', request?.description)
  // console.log('request.location:', request?.location)
  // console.log('request.budget:', request?.budget)
  // console.log('request.preferedDate:', request?.preferedDate)

  const [title, setTitle] = useState(request?.title || '')
  const [description, setDescription] = useState(request?.description)
  const [location, setLocation] = useState(request?.location)
  const [price, setPrice] = useState(request?.budget)
  const [date, setDate] = useState(request?.preferedDate ? request?.preferedDate.split("T")[0] : "")
  const [time, setTime] = useState(request?.preferedDate ? request?.preferedDate.split("T")[1] : "")

  const handleSave = () => {
    // console.log({
    //   // title,
    //   description,
    //   location,
    //   price,
    //   date,
    //   time,
    // })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>

      <DialogContent className="sm:max-w-3xl">

        <DialogHeader>
          <DialogTitle>Edit Service Request</DialogTitle>
          <DialogDescription>
            Update the details of your service request.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 mt-4">

          {/* Title */}
          {/* <div className="space-y-2">
            <Label className="text-sm font-medium">Service Title</Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div> */}

          {/* Description */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Description</Label>
            <Textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Location + Price */}
          <div className="grid grid-cols-2 gap-4">

            <div className="space-y-2">
              <Label className="text-sm font-medium flex items-center gap-2">
                <MapPin size={16} className="text-primary" />
                Location
              </Label>

              <Input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium flex items-center gap-2">
                <CircleDollarSign size={16} className="text-primary"  />
                Budget
              </Label>

              <Input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

          </div>

          {/* Date + Time */}
          <div className="grid grid-cols-2 gap-4">

            <div className="space-y-2">
              <Label className="text-sm font-medium flex items-center gap-2">
                <CalendarDays size={16} className="text-primary" />
                Date
              </Label>
              <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">
                <Clock size={16} className="text-primary" />
                Time
              </Label>

              <Input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>

          </div>

        </div>

        <DialogFooter className="mt-6">
          <DialogClose asChild>
    <Button variant="outline" className="px-10">
      Cancel
    </Button>
  </DialogClose>

          <Button onClick={handleSave}>
            Save Changes
          </Button>
        </DialogFooter>

      </DialogContent>
    </Dialog>
  )
}
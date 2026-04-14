"use client"

import { MapPin, Calendar, FileText, DollarSign } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { WiTime8 } from "react-icons/wi"
import { useMemo, useState } from "react"
import { locations } from "@/app/utils/constant"
import {
  Command,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command"
import { useParams } from "next/navigation"

export function RequestForm({ formData, setFormData }: any) {
  const [locationOpen, setLocationOpen] = useState(false)
  const [location, setLocation] = useState("")
  const params = useParams()

  console.log("request form data from dynamic fields", formData)

  const handleChange = (name: string, value: any) => {
    setFormData({ ...formData, [name]: value })
  }

  // ✅ ONLY preferredDate is stored
  const handleDateTimeChange = (value: string, type: "date" | "time") => {
    const current = formData.preferredDate
      ? new Date(formData.preferredDate)
      : new Date()

    let date = current.toISOString().split("T")[0]
    let time = current.toTimeString().slice(0, 5)

    if (type === "date") {
      date = value
    }

    if (type === "time") {
      time = value
    }

    const combined = new Date(`${date}T${time}`).toISOString()

    setFormData({
      ...formData,
      preferredDate: combined,
    })
  }

  const filteredLocations = useMemo(
    () =>
      locations.filter((loc) =>
        loc.toLowerCase().includes(location.toLowerCase())
      ),
    [location]
  )

  return (
    <div className="space-y-6">
      <form className="space-y-6">

        {/* Location */}
        <div className="space-y-2 relative">
          <Label className="flex items-center gap-2 font-medium">
            <MapPin size={18} className="text-primary" />
            Your Task Location
          </Label>

          <Input
            placeholder="Type your location..."
            value={location}
            onChange={(e) => {
              setLocation(e.target.value)
              handleChange("location", e.target.value)
              setLocationOpen(true)
            }}
            className="w-full py-5"
          />

          {locationOpen && (
            <div className="absolute w-full mt-1 border rounded-md bg-white shadow-md z-50">
              <Command>
                <CommandGroup className="max-h-60 overflow-auto">
                  {filteredLocations.map((loc) => (
                    <CommandItem
                      key={loc}
                      value={loc}
                      onSelect={() => {
                        setLocation(loc)
                        handleChange("location", loc)
                        setLocationOpen(false)
                      }}
                    >
                      {loc}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </div>
          )}
        </div>

        {/* Description */}
        <div className="space-y-4">
           <Label className="flex items-center gap-2 font-medium">
           <NotebookPen size={18} className="text-primary" />
            Title
          </Label>
          <Input
            placeholder="eg Deep cleaning for 2-bedroom apartment"
            className="w-full py-5"
            onChange={(e) => handleChange("title", e.target.value)}
          />
          <Label className="font-medium flex items-center gap-2">
            <FileText size={18} className="text-primary" />
            <span>Description</span>
          </Label>

          <Textarea
            placeholder="Provide details so the tasker knows what to do"
            className="w-full h-32"
            onChange={(e) =>
              handleChange("description", e.target.value)
            }
          />
        </div>

        {/* Budget */}
        <div className="space-y-4">
          <Label className="font-medium flex items-center gap-2">
            <DollarSign size={18} className="text-primary" />
            <span>Budget (ETB)</span>
          </Label>

          <Input
            type="number"
            placeholder="Enter your budget in ETB"
            className="w-full py-5"
            onChange={(e) =>
              handleChange("budget", Number(e.target.value))
            }
          />
        </div>

        {/* Date */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">

          <div className="space-y-4 w-full">
            <Label className="font-medium flex items-center gap-2">
              <Calendar size={18} className="text-primary" />
              <span>Preferred Date</span>
            </Label>

            <Input
              type="date"
              className="w-full py-5"
              onChange={(e) =>
                handleDateTimeChange(e.target.value, "date")
              }
            />
          </div>

          <div className="space-y-4 w-full">
            <Label className="font-medium flex items-center gap-2">
              <WiTime8 size={18} className="text-primary" />
              <span>Preferred Time</span>
            </Label>

            <Input
              type="time"
              defaultValue="10:00"
              className="bg-background w-full py-5"
              onChange={(e) =>
                handleDateTimeChange(e.target.value, "time")
              }
            />
          </div>

        </div>
      </form>
    </div>
  )
}
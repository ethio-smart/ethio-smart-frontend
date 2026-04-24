/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useEffect, useMemo, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks"
import { createRequestFromService } from "@/app/store/slices/requestSlice"
import { fetchCategoryById } from "@/app/store/slices/categorySlice"
import { DynamicFormFields } from "../form/DynamicFormFields"

import { locations } from "@/app/utils/constant"
import {
  Command,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command"
import { Calendar1 } from "lucide-react"
import { WiTime8 } from "react-icons/wi"

type FieldConfig = {
  name: string
  label: string
  type: "text" | "number" | "select" | "boolean" | "multiselect"
  placeholder?: string
  options?: string[]
}

type Props = {
  categoryId: string
  serviceId: string
  fields: Record<string, FieldConfig[]>
  children: React.ReactNode
}

function ReviewRequest({ formData }: { formData }) {
  return (
   <div className="space-y-4 text-sm">

 
  {/* LOCATION */}
  <div className="bg-gray-50 w-full p-3 rounded-md">
    <h3 className="font-semibold">Location</h3>
    <p>{formData.location || "-"}</p>
  </div>

  {/* PREFERRED DATE */}
  <div className="bg-gray-50 w-full p-3 rounded-md">
    <h3 className="font-semibold">Preferred Date and Time</h3>
    {formData.preferedDate ? (
      <>
        <p>
          {new Date(formData.preferedDate).toLocaleDateString()}
        </p>
        <p>
          {new Date(formData.preferedDate).toLocaleTimeString()}
        </p>
      </>
    ) : (
      <p className="text-gray-500">Not selected</p>
    )}
  </div>

  


  {/* DYNAMIC DETAILS */}
  <div className="bg-gray-50 p-3 rounded-md">
    <h3 className="font-semibold">Additional Details</h3>

    <div className="space-y-1 mt-2">
      {Object.keys(formData.dynamicData || {}).length === 0 ? (
        <p className="text-gray-500">No additional data</p>
      ) : (
        Object.entries(formData.dynamicData || {}).map(([key, value]) => (
          <div key={key} className="flex justify-between gap-4">
            <span className="capitalize text-gray-600">{key}</span>

            <span className="text-right font-medium">
              {typeof value === "boolean"
                ? value
                  ? "Yes"
                  : "No"
                : value === null || value === undefined || value === ""
                ? "-"
                : String(value)}
            </span>
          </div>
        ))
      )}
    </div>
  </div>

</div>
  )
}

export default function ServiceRequestFromModal({
  categoryId,
  serviceId,
  fields,
  children,
}: Props) {
  const dispatch = useAppDispatch()
  console.log('serviceid',serviceId)
  const { selectedCategory } = useAppSelector((state) => state.category)
  const { loading,error } = useAppSelector((state) => state.request)
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState(1)
   console.log('error',error)
  const [locationOpen, setLocationOpen] = useState(false)

  const [formData, setFormData] = useState({
    location: "",
    preferedDate: "",
    notes: "",
    dynamicData: {} as Record<string, any>,
  })


  // fetch category
  useEffect(() => {
    if (categoryId) {
      dispatch(fetchCategoryById(categoryId))
    }
  }, [dispatch, categoryId])

  // handle dynamic fields change
  const handleDynamicChange = (name: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      dynamicData: {
        ...prev.dynamicData,
        [name]: value,
      },
    }))
  }

  // autocomplete filter
  const filteredLocations = useMemo(() => {
    return locations.filter((loc) =>
      loc.toLowerCase().includes(formData.location.toLowerCase())
    )
  }, [formData.location])

  const categoryName = selectedCategory?.name?.toLowerCase() || ""
  const categoryFields = fields[categoryName] || []

  // submit
  const handleSubmit = async () => {
    await dispatch(
      createRequestFromService({
        serviceId,
        location: formData.location,
        preferedDate: formData.preferedDate,
        notes: formData.notes,
        dynamicData: formData.dynamicData,
      })
    )

    setOpen(false)
    setStep(1)

    setFormData({
      location: "",
      preferedDate: "",
      notes: "",
      dynamicData: {},
    })
  }
    const handleDateTimeChange = (value: string, type: "date" | "time") => {
    const current = formData.preferedDate
      ? new Date(formData.preferedDate)
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
      preferedDate: combined,
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Request Service</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">

          {/* STEP 1 */}
          {step === 1 && (
            <div className="space-y-4">

              {/* LOCATION */}
              <div className="space-y-2 relative">
                <Label>Location</Label>

                <Input
                  placeholder="Type your location..."
                  value={formData.location}
                  onChange={(e) => {
                    setFormData((p) => ({
                      ...p,
                      location: e.target.value,
                    }))
                    setLocationOpen(true)
                  }}
                  className="w-full py-5"
                />

                {locationOpen && formData.location && (
                  <div className="absolute w-full mt-1 border rounded-md bg-white shadow-md z-50">
                    <Command>
                      <CommandGroup className="max-h-60 overflow-auto">
                        {filteredLocations.map((loc) => (
                          <CommandItem
                            key={loc}
                            value={loc}
                            onSelect={() => {
                              setFormData((p) => ({
                                ...p,
                                location: loc,
                              }))
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

            
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
              
                        <div className="space-y-4 w-full">
                          <Label className="font-medium flex items-center gap-2">
                            <Calendar1 size={18} className="text-primary" />
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

              {/* NOTES */}
              <div className="space-y-2">
                <Label>Notes</Label>
                <Textarea
                  placeholder="Additional details..."
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData((p) => ({
                      ...p,
                      notes: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <DynamicFormFields
              fields={categoryFields}
              formData={formData}
              setFormData={setFormData}
              onChange={handleDynamicChange}
            />
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <ReviewRequest formData={formData}/>
          )}
        </div>

        {/* ACTIONS */}
        <div className="flex justify-between pt-4">

          {step > 1 ? (
            <Button variant="outline" onClick={() => setStep(step - 1)}>
              Back
            </Button>
          ) : (
            <div />
          )}

          {step < 3 ? (
            <Button onClick={() => setStep(step + 1)}>
              Next
            </Button>
          ) : (
            <Button className={`${loading.createFromService ?'animate-pulse':''}`} onClick={handleSubmit}>
              {loading.createFromService? 'Submitting' :'Submit'}
              
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
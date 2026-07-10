/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useEffect, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"


import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks"
import { createRequest, inviteTasker } from "@/app/store/slices/requestSlice"
import { fetchCategoryById } from "@/app/store/slices/categorySlice"
import { DynamicFormFields } from "../form/DynamicFormFields"

import { RequestForm } from "../form/RequestForm"
import { toast } from "sonner"
import type { FieldConfig } from "@/app/utils/constant"

type Props = {
  categoryId: string
  taskerId: string
  fields: Record<string, FieldConfig[]>
  children: React.ReactNode
}

function ReviewRequest({ formData }: { formData: any }) {
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
  taskerId,
  fields,
  children,
}: Props) {
  const dispatch = useAppDispatch()
  // console.log('serviceid',serviceId)
  const { selectedCategory } = useAppSelector((state) => state.category)
  const { loading,error } = useAppSelector((state) => state.request)
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState(1)
  // const [loading, setLoading] = useState(false)
    const [successOpen, setSuccessOpen] = useState(false)
   console.log('error',error)
   console.log('tasker id',taskerId)

  const [formData, setFormData] = useState({
    location: "",
    preferedDate: "",
    dynamicData: {} as Record<string, any>,
    categoryId: categoryId || "",
  })

  // fetch category when categoryId changes
  useEffect(() => {
    if (formData.categoryId) {
      dispatch(fetchCategoryById(formData.categoryId))
    }
  }, [dispatch, formData.categoryId])

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

  const categoryName = selectedCategory?.name?.toLowerCase() || ""
  const categoryFields = fields[categoryName] || []

  
   console.log('formdata',formData)
  
  const handleCreateAndInvite = async (taskerId: string) => {
  try {
    // setLoading(true)

    // 1. Create request
    const createdRequest = await dispatch(createRequest(formData)).unwrap()
    const requestId = createdRequest.id
    console.log('request id',requestId)

    // 2. Invite tasker immediately
    const res = await dispatch(
      inviteTasker({ requestId, taskerId })
    ).unwrap()

    console.log('res',res)

    // 3. Success state
    if (res) {
      setSuccessOpen(true)
      toast.success('invitation sent to tasker successfully')
    }
     setOpen(false)
   setFormData({
      // reset your original structure here
        dynamicData: {},
     
        categoryId: categoryId || "",
      location: "",
      preferedDate: "",
    })
  } catch (error) {
    console.error("Process failed:", error)
  } finally {
    // setLoading(false)
  }
}
  
   
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Request Service</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">

          {/* STEP 1 */}
          {step === 1 && (
            <RequestForm formData={formData} setFormData={setFormData}/>
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
           
              <Button
  className={`${loading.create || loading.invite ? "animate-pulse" : ""}`}
  onClick={() => handleCreateAndInvite(taskerId)}
  disabled={loading.create || loading.invite}
>

  {loading.create? 'Submitting' :'Send Invitation'}
</Button>
              
           
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
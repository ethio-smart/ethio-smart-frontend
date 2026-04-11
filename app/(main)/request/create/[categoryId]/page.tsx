
"use client"
import { Suspense, useEffect, useState } from "react"
import {
  useParams,
  useRouter,
  useSearchParams,
} from "next/navigation"
import { Button } from "@/components/ui/button"
import { Stepper } from "@/components/custom/Stepper"
import { RequestForm } from "@/app/components/form/RequestForm"
import { DynamicFormFields } from "@/app/components/form/DynamicFormFields"
import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks"
import { createRequest } from "@/app/store/slices/requestSlice"
import { categoryFields } from "@/app/utils/constant"


type FormDataType = {
  categoryId: string
  location: string
  preferedDate: string
  dynamicData: Record<string, string>
  description: string
  budget: string
}


function ReviewRequest({ formData }: { formData: FormDataType }) {
  return (
    <div className="space-y-4 text-sm">

      

      <div className="bg-gray-50 w-full p-3 rounded-md">
        <h3 className="font-semibold">Location</h3>
        <p>{formData.location}</p>
      </div>

      <div className="bg-gray-50 w-full p-3 rounded-md">
        <h3 className="font-semibold ">Preferred Date</h3>
        <p>{formData.preferedDate.split('T')[0]}</p>
        <p>{formData.preferedDate.split('T')[1]}</p>
      </div>

      <div className="bg-gray-50 w-full p-3 rounded-md">
        <h3 className="font-semibold">Budget</h3>
        <p>{formData.budget}</p>
      </div>

      <div className="bg-gray-50 w-full p-3 rounded-md">
        <h3 className="font-semibold">Description</h3>
        <p>{formData.description}</p>
      </div>

      <div className="bg-gray-50 p-3 rounded-md">
        <h3 className="font-semibold">Additional Details</h3>
        <div className="">
          {Object.entries(formData.dynamicData).length === 0 ? (
            <p className="text-gray-500">No additional data</p>
          ) : (
            Object.entries(formData.dynamicData).map(([key, value]) => (
              <div key={key} className="flex justify-between">
                <span className=" capitalize">{key}</span>
                <span>{value}</span>
              </div>
            ))
          )}
        </div>
      </div>

    </div>
  )
}


export default function Page() {
  const router = useRouter()
  const { categoryId } = useParams<{ categoryId: string }>()
  const searchParams = useSearchParams()
  const name = searchParams.get("name") || ""

  const dispatch = useAppDispatch()
  const { loading ,request} = useAppSelector((state) => state.request)
   console.log('request👉👉👉👉',request)
  const [step, setStep] = useState(0)
  const [formData, setFormData] = useState<FormDataType>({
    categoryId: categoryId || "",
    location: "",
    preferedDate: "",
    dynamicData: {},
    description: "",
    budget: "",
  })

  const fields = categoryFields[name] || []
  const steps = [
    { label: "Basic Info" },
    { label: "Additional Info" },
    { label: "Review" },
  ]

  /* Scroll to top on step change */
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [step])

  const nextStep = () => {
    setStep((prev) => Math.min(prev + 1, steps.length - 1))
  }

  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 0))
  }

  /* HANDLE SUBMIT  */
 const handleSubmit = async () => {
  try {
    const createdRequest = await dispatch(createRequest(formData)).unwrap()
    const requestId = createdRequest.id 
    router.push(`/request/${requestId}/matches/${categoryId}`)
  } catch (error) {
    console.error("Request failed:", error)
  }
}

  /*  LOADING   */
  if (loading.create && step === 2) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm text-gray-500">Finding best taskers...</p>
        </div>
      </div>
    )
  }

  return (
    <Suspense fallback={<div className="h-screen felx items-center justify-center animate-ping">Loading...</div>}>
      <div className="bg-gray-50 min-h-screen py-6 px-4 space-y-6">

        {/* Stepper */}
        <div className="flex justify-center">
          <div className="w-full max-w-3xl">
            <Stepper steps={steps} currentStep={step} />
          </div>
        </div>

        {/* Form  */}
        <div className="bg-white max-w-3xl mx-auto p-6 rounded-xl shadow space-y-6">

          {/* Step 1 */}
          {step === 0 && (
            <RequestForm
              formData={formData}
              setFormData={setFormData}
            />
          )}

          {/* Step 2 */}
          {step === 1 && (
            <DynamicFormFields
              fields={fields}
              formData={formData}
              setFormData={setFormData}
            />
          )}

          {/* Step 3  */}
          {step === 2 && (
            <ReviewRequest formData={formData} />
          )}

          {/* Buttons */}
          <div className="flex justify-between pt-4">

            {step === 0 ? (
              <Button variant="outline" onClick={() => router.back()}>
                Cancel
              </Button>
            ) : (
              <Button variant="outline" onClick={prevStep}>
                Back
              </Button>
            )}

            {step < steps.length - 1 ? (
              <Button onClick={nextStep}>
                Next
              </Button>
            ) : (
              <Button onClick={handleSubmit} disabled={loading.create}>
                {loading.create ? "Finding tasker..." : "Confirm & Find Tasker"}
              </Button>
            )}

          </div>

        </div>
      </div>
    </Suspense>
  )
}
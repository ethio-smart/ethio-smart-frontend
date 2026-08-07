
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
import { useLocale } from "next-intl"
import { AlertCircle } from "lucide-react"



type FormDataType = {
  categoryId: string
  location: string
  preferedDate: string
  dynamicData: Record<string, string>
  description: string
  budget: string, 
tittle:string
}


function ReviewRequest({ formData }: { formData: FormDataType }) {
  return (
   <div className="space-y-4 text-sm">

  {/* TITLE */}
  <div className="bg-gray-50 w-full p-3 rounded-md">
    <h3 className="font-semibold">Title</h3>
    <p>{formData.tittle|| "-"}</p>
  </div>
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

  {/* BUDGET */}
  <div className="bg-gray-50 w-full p-3 rounded-md">
    <h3 className="font-semibold">Budget</h3>
    <p>{formData.budget ?? "-"}</p>
  </div>

  {/* DESCRIPTION */}
  <div className="bg-gray-50 w-full p-3 rounded-md">
    <h3 className="font-semibold">Description</h3>
    <p>{formData.description || "-"}</p>
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


export default function Page() {
  const router = useRouter()
  const { categoryId } = useParams<{ categoryId: string }>()
  const searchParams = useSearchParams()
  const name = searchParams.get("name") || ""

  const dispatch = useAppDispatch()
  const { loading ,request} = useAppSelector((state) => state.request)
   console.log('request👉👉👉👉',request)
  const [step, setStep] = useState(0)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [stepErrors, setStepErrors] = useState<Record<string, string>>({})
    const locale=useLocale()
  const [formData, setFormData] = useState<FormDataType>({
    categoryId: categoryId || "",
    location: "",
    preferedDate: "",
    dynamicData: {},
    description: "",
    budget: "",
    tittle:""
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

  const validateStep0 = (): boolean => {
    const errs: Record<string, string> = {}

    if (!formData.categoryId) errs.categoryId = "Please select a category"
    if (!formData.tittle?.trim()) errs.tittle = "Title is required"
    if (!formData.location?.trim()) errs.location = "Location is required"
    if (!formData.description?.trim()) errs.description = "Description is required"
    if (!formData.budget || Number(formData.budget) <= 0) errs.budget = "Please enter a valid budget"
    if (!formData.preferedDate) errs.preferedDate = "Preferred date and time are required"

    setStepErrors(errs)
    return Object.keys(errs).length === 0
  }

  const nextStep = () => {
    if (step === 0 && !validateStep0()) return
    setSubmitError(null)
    setStepErrors({})
    setStep((prev) => Math.min(prev + 1, steps.length - 1))
  }

  const prevStep = () => {
    setSubmitError(null)
    setStepErrors({})
    setStep((prev) => Math.max(prev - 1, 0))
  }

  /* HANDLE SUBMIT  */
 const handleSubmit = async () => {
  setSubmitError(null)
  
  // Final validation
  if (!validateStep0()) {
    setSubmitError("Please complete all required fields")
    return
  }

  try {
    // Clean payload - remove empty strings, convert to proper types
    const payload: any = {
      categoryId: formData.categoryId,
      tittle: formData.tittle.trim(),
      location: formData.location.trim(),
      description: formData.description.trim(),
      budget: Number(formData.budget),
      preferedDate: formData.preferedDate,
      dynamicData: formData.dynamicData || {}
    }

    const createdRequest = await dispatch(createRequest(payload)).unwrap()
    const requestId = createdRequest.id 
    router.push(`/${locale}/request/${requestId}/matches/${categoryId}`)
  } catch (error: any) {
    console.error("Request creation failed")
    console.error("Status:", error?.status)
    console.error("Message:", error?.message)
    console.error("Full error:", JSON.stringify(error, null, 2))
    
    const status = error?.status || error?.response?.status
    const message = error?.message || error?.response?.data?.message

    if (status === 401 || status === 403) {
      setSubmitError("You need to be logged in to create a request")
    } else if (status === 400) {
      setSubmitError(message || "Some required fields are missing or invalid. Please review your request")
    } else if (status === 404) {
      setSubmitError("The selected category was not found. Please go back and try again")
    } else if (status === 500) {
      setSubmitError("Something went wrong on our end. Please try again in a moment")
    } else if (!status) {
      setSubmitError("Unable to connect to the server. Please check your internet connection")
    } else {
      setSubmitError(message || "Failed to create request. Please try again")
    }
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
              errors={stepErrors}
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
          <div className="flex flex-col gap-3 pt-4">

            {submitError && (
              <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600 dark:border-red-800 dark:bg-red-950 dark:text-red-400">
                <AlertCircle className="h-4 w-4 shrink-0" />
                {submitError}
              </div>
            )}

            <div className="flex justify-between">

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
      </div>
    </Suspense>
  )
}
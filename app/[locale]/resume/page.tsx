"use client"


import Summary from "@/app/components/resume/Summary"
import Services from "@/app/components/resume/Services"
import Experience from "@/app/components/resume/Experience"
import Certificate from "@/app/components/resume/Certificate"
import Language from "@/app/components/resume/Language"
import Profile from "@/app/components/resume/Profile"
import { useSearchParams } from "next/navigation"
import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks"
import { fetchResume } from "@/app/store/slices/resumeSlice"
import { useEffect } from "react"


export default function ResumePage() {
  const searchParams = useSearchParams()
  const taskerId = searchParams.get("taskerId")

  const dispatch = useAppDispatch()
  const { data, loading, error } = useAppSelector(
    (state) => state.resume
  )

  useEffect(() => {
    if (taskerId) {
      dispatch(fetchResume(taskerId))
    }
  }, [taskerId, dispatch])

  if (loading) return <p>Loading...</p>
  if (error) return <p>{error}</p>
  if (!data) return <p>No data</p>
  console.log("taskerId:", taskerId)

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}

        <Profile
          name={data.Name}
          phone={data.Phone}
          location={data.Location}
          rating={data.Rating}
        />
        {/*  Summary */}
        <Summary summary={data.Summary} />

        {/* Skills */}

        <Services services={data.Services} />
        {/* Experience */}
        <Experience experience={data.Experience} />


        {/* certificate */}
        <Certificate certifications={data.Certifications} />
        <Language languages={data.Languages} />

      </div>
    </div>
  )
}

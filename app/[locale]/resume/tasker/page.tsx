"use client"

import { useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks"

import Profile from "@/app/components/resume/Profile"
import Summary from "@/app/components/resume/Summary"
import Services from "@/app/components/resume/Services"
import Experience from "@/app/components/resume/Experience"
import Certificate from "@/app/components/resume/Certificate"
import Language from "@/app/components/resume/Language"
import { fetchResume } from "@/app/store/slices/resumeSlice"

export default function TaskerResumePage() {
  const dispatch = useAppDispatch()
  const searchParams = useSearchParams()
  const taskerId = searchParams.get("taskerId")

  const { data, loading, error } = useAppSelector(
    (state) => state.resume
  )

  useEffect(() => {
    if (taskerId) {
      dispatch(fetchResume(taskerId))
    }
  }, [dispatch, taskerId])

  if (!taskerId) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Tasker Profile Required</h1>
            <p className="text-gray-600">A valid tasker ID is required to generate a resume.</p>
          </div>
        </div>
      </div>
    )
  }

  if (loading) return <p>Loading resume...</p>
  if (error) return <p>Error: {error}</p>
  if (!data) return <p>No resume data found for this tasker.</p>

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 space-y-6">

        <Profile
          name={data.Name}
          phone={data.Phone}
          location={data.Location}
          rating={data.Rating}
        />

        <Summary summary={data.Summary} />
        <Services services={data.Services} />
        <Experience experience={data.Experience} />
        <Certificate certifications={data.Certifications} />
        <Language languages={data.Languages} />

      </div>
    </div>
  )
}
"use client"

import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks"


import Profile from "@/app/components/resume/Profile"
import Summary from "@/app/components/resume/Summary"
import Services from "@/app/components/resume/Services"
import Experience from "@/app/components/resume/Experience"
import Certificate from "@/app/components/resume/Certificate"
import Language from "@/app/components/resume/Language"
import { fetchResumeTasker } from "@/app/store/slices/resumeSlice"

export default function MyResumePage() {
  const dispatch = useAppDispatch()

  const { data, loading, error } = useAppSelector(
    (state) => state.resume
  )
  console.log('data',data)

  useEffect(() => {
    dispatch(fetchResumeTasker())
  }, [dispatch])

  if (loading) return <p>Loading...</p>
  if (error) return <p>{error}</p>
  if (!data) return <p>No resume found</p>

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
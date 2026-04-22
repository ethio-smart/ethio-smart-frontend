"use client"


import Summary from "@/app/components/resume/Summary"
import Services from "@/app/components/resume/Services"
import Experience from "@/app/components/resume/Experience"
import Certificate from "@/app/components/resume/Certificate"
import Language from "@/app/components/resume/Language"
import Profile from "@/app/components/resume/Profile"


export default function ResumePage() {
  // const t = useTranslations('resume')

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        
         <Profile/>
        {/*  Summary */}
        <Summary/>
      
        {/* Skills */}
    
       <Services/>
        {/* Experience */}
        <Experience/>
       

        {/* certificate */}
        <Certificate/>
        <Language/>
        
      </div>
    </div>
  )
}

// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// import { Briefcase, Calendar } from 'lucide-react'
// import React from 'react'

// function Experience() {
//   return (
//     <Card className="mb-8">
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2">
//               <Briefcase size={20} />
//               Work Experience
//             </CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-6">
//             <div className="border-l-2 border-gray-400 pl-6">
//               <div className="flex items-start justify-between mb-2">
//                 <div>
//                   <h3 className="font-bold text-gray-900">Senior Service Technician</h3>
//                   <p className="text-gray-600">Ethio Maintenance Services</p>
//                 </div>
//                 <div className="flex items-center text-sm text-gray-500">
//                   <Calendar size={14} className="mr-1" />
//                   2020 - Present
//                 </div>
//               </div>
//               <ul className=" list-inside text-gray-600 space-y-1">
//                 <li>Led a team of 5 junior technicians for large-scale projects</li>
//                 <li>Managed over 200 residential and commercial service requests annually</li>
//                 <li>Implemented quality control measures that reduced customer complaints by 40%</li>
            
//               </ul>
//             </div>

//             <div className="border-l-2 border-gray-400 pl-6">
//               <div className="flex items-start justify-between mb-2">
//                 <div>
//                   <h3 className="font-bold text-gray-900">Service Technician</h3>
//                   <p className="text-gray-600">Addis Home Solutions</p>
//                 </div>
//                 <div className="flex items-center text-sm text-gray-500">
//                   <Calendar size={14} className="mr-1" />
//                   2018 - 2020
//                 </div>
//               </div>
//               <ul className="list-disc list-inside text-gray-600 space-y-1">
//                 <li>Performed electrical installations and repairs for residential properties</li>
//                 <li>Handled plumbing maintenance and emergency repairs</li>
//                 <li>Maintained 95% customer satisfaction rate</li>
               
//               </ul>
//             </div>
//           </CardContent>
//         </Card>
//   )
// }

// export default Experience


import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Briefcase, Calendar } from "lucide-react"

type ExperienceItem = {
  title: string
  company: string
  date: string
  description: string
}

type ExperienceProps = {
  experience: ExperienceItem[]
}

function Experience({ experience }: ExperienceProps) {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Briefcase size={20} />
          Work Experience
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {experience?.length ? (
          experience.map((exp, index) => (
            <div
              key={index}
              className="border-l-2 border-gray-400 pl-6"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-bold text-gray-900">
                    {exp.title}
                  </h3>
                  <p className="text-gray-600">
                    {exp.company}
                  </p>
                </div>

                <div className="flex items-center text-sm text-gray-500">
                  <Calendar size={14} className="mr-1" />
                  {exp.date}
                </div>
              </div>

              <ul className="list-disc list-inside text-gray-600 space-y-1">
                {exp.description}
              </ul>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500">
            No experience added
          </p>
        )}
      </CardContent>
    </Card>
  )
}

export default Experience
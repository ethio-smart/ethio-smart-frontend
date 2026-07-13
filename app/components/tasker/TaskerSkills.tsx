'use client'

import { Service } from "@/app/types/types"
import { Button } from "@/components/ui/button"
import ServiceRequestFromModal from "../modal/ServiceRequestFromModal"
import { categoryFields } from "@/app/utils/constant"

export default function TaskerSkills({
  services,
}: {
  services: Service[]
}) {
  // console.log('service',services)
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold">Services & Skills</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {services.map(service => (
          <div
            key={service.id}
            className="border rounded-2xl p-5 bg-white hover:shadow-lg transition space-y-4"
          >
            {/*  Title*/}
            <div className="flex items-start justify-between gap-4">
              <h4 className="font-semibold text-lg leading-tight capitalize">
                {service.title}
              </h4>
                  <div>
              <span
                className={`text-xs px-3 py-1 rounded-full font-medium ${
                  service.isActive
                    ? "bg-green-100 text-green-600"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                {service.isActive ? "Active" : "inActive"}
              </span>
            </div>  
            </div>
            {/* DESCRIPTION */}
            <p className="text-sm text-muted-foreground line-clamp-3">
              {service.description}
            </p>

            <div className="flex justify-between items-center pt-2">
             
               <div className="flex items-center gap-4">
                <p className="text- font-bold text-primary">
                  {service.price} ETB
                </p>
                <p className="text-xs text-muted-foreground capitalize">
                  {service.priceType}
                </p>
              </div>
              <ServiceRequestFromModal fields={categoryFields} taskerId={service.taskerId} categoryId={service.categoryId}>

              <Button size="sm">Send Request</Button>
              </ServiceRequestFromModal>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
'use client'


import ActionButtons from "@/app/components/dashboard/client/requests/ActionButtons"
import PaymentSummary from "@/app/components/dashboard/client/requests/PaymentSummary"
import RecentActivity from "@/app/components/dashboard/client/requests/RecentActivity"
import RequestDetails from "@/app/components/dashboard/client/requests/RequestDetail"
import RequestHeader from "@/app/components/dashboard/client/requests/RequestHeader"
import ServiceRequestProgress from "@/app/components/dashboard/client/requests/ServiceRequestProgress"



export default function ServiceRequestDetail() {
  return (
    <div className="py-4">
        <RequestHeader />
    <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <RequestDetails />
        <ServiceRequestProgress/>
      </div>

      <div className="space-y-6">
        <PaymentSummary/>
        <RecentActivity />
        <ActionButtons/>
      </div>
    </div>
    </div>
  )
}
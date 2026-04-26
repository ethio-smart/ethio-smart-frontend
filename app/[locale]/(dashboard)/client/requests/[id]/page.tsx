'use client'
import ActionButtons from "@/app/components/dashboard/client/requests/ActionButtons"
import PaymentSummary from "@/app/components/dashboard/client/requests/PaymentSummary"
import RequestDetails from "@/app/components/dashboard/client/requests/RequestDetail"
import RequestHeader from "@/app/components/dashboard/client/requests/RequestHeader"
import ServiceRequestProgress from "@/app/components/dashboard/client/requests/ServiceRequestProgress"
import { ArrowLeft } from "lucide-react"
import { useLocale } from "next-intl"
import Link from "next/link"
import { useSearchParams } from "next/navigation"



export default function ServiceRequestDetail() {
  const searchParams=useSearchParams()
  const requestParam = searchParams.get("invitation")
  const invitation = requestParam ? JSON.parse(requestParam) : null
  const locale=useLocale()
  console.log('invitation in request detail page',invitation)
  return (
    <>
     <Link
        href={`/${locale}/client/requests`}
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </Link>
    <div className="py-4">
        <RequestHeader status={invitation?.status} invitation={invitation.TaskerRequestInvitation} />
    <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <RequestDetails 
          description={invitation?.description}
          preferedDate={invitation?.preferedDate}
          location={invitation?.location}
          title={invitation?.tittle}
          dyanamicData={invitation?.dynamicData}
        />
        <ServiceRequestProgress/>
      </div>

      <div className="space-y-6">
        <PaymentSummary/>
        {/* <RecentActivity /> */}
        <ActionButtons status={invitation?.status} />
      </div>
    </div>
    </div>
    </>
  )
}
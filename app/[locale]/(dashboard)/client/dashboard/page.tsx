

import StatsOverview from "@/app/components/dashboard/client/dashboard/page";
export default function ClientDashboard() {
  return (
    <div className="space-y-6">
      <div>
       
        <p className="text-sm text-gray-500">
          Monitor your service requests and active provider agreements.
        </p>
      </div>

      <StatsOverview />

    </div>
  )
}
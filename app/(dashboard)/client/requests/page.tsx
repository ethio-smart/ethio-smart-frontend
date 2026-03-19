"use client"

import { useState } from "react"


import {
  Tabs,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs"
import { requests } from "@/lib/dummy.data"
import RequestCard from "@/app/components/dashboard/client/requests/RequestCard"
import { Separator } from "@/components/ui/separator"


const statuses = [
  "ALL",
  "PENDING",
  "ACCEPTED",
  "REJECTED",
  "EXPIRED",
  "CANCELLED"
]

export default function RequestsPage() {

  const [activeTab, setActiveTab] = useState("ALL")

  const filteredRequests =
    activeTab === "ALL"
      ? requests
      : requests.filter((r) => r.status === activeTab)

  return (
    <div className="space-y-6 space-x-10">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Service Requests</h1>
        <p className="text-muted-foreground">
          Manage and track your ongoing service assignments.
        </p>
      </div>

      {/* Tabs */}
   <Tabs defaultValue="ALL Requests" onValueChange={setActiveTab} className="bg-white rounded-md h-20 py-3 px-5 sticky top-0 z-50">
  <TabsList
    variant="line"
    className="flex flex-wrap gap-12 items-center justify-center bg-white"
  >
    {statuses.map((status) => (
      <TabsTrigger
        key={status}
        value={status}
        className="data-[state=active]:text-primary data-[state=active]:outline-primary"
      >
        {status}
      </TabsTrigger>
    ))}
  </TabsList>
  <Separator />
</Tabs>

      {/* Requests */}
      <div className="space-y-4 space-x-10">

        {filteredRequests.length === 0 && (
          <p className="text-muted-foreground text-sm">
            No requests found.
          </p>
        )}

        {filteredRequests.map((req) => (
          <RequestCard
            key={req.id}
            request={req}
          />
        ))}

      </div>

    </div>
  )
}
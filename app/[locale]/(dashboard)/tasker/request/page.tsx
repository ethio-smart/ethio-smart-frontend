"use client"

import { useEffect, useState } from "react"
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent
} from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks"
import { fetchIncomingRequests } from "@/app/store/slices/requestSlice"
import IncomingRequestCard from "@/app/components/dashboard/tasker/request/IncomingRequestCard"

export default function IncomingRequestPage() {
  const dispatch = useAppDispatch()

  const { incomingInvitations, loading } = useAppSelector(
    (state) => state.request
  )
  const [activeTab, setActiveTab] = useState("PENDING")

// console.log('incoming request from page',incomingInvitations)
//dispatch outgoing requests
  useEffect(() => {
    dispatch(fetchIncomingRequests())
  }, [dispatch])

  // Show skeleton while loading
  if (loading.fetchIncoming) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Requests</h1>
          <p className="text-muted-foreground">
            Manage and track your incoming requests.
          </p>
        </div>
        
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="h-50 w-full rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    )
  }

// Function to filter invitations by status
const getInvitationsByStatus = (status: string) => {
    return incomingInvitations.filter(inv => inv.status === status)
  }

  // tab data with counts
  const tabData = [
    { value: 'PENDING', label: 'Pending', count: getInvitationsByStatus('PENDING').length },
    { value: 'ACCEPTED', label: 'Accepted', count: getInvitationsByStatus('ACCEPTED').length },
    { value: 'REJECTED', label: 'Rejected', count: getInvitationsByStatus('REJECTED').length },
    { value: 'EXPIRED', label: 'Expired', count: getInvitationsByStatus('EXPIRED').length },
    { value: 'CANCELLED', label: 'Cancelled', count: getInvitationsByStatus('CANCELLED').length },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Requests</h1>
        <p className="text-muted-foreground">
          Manage and track your incoming requests.
        </p>
      </div>
      

      {incomingInvitations.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-muted-foreground">No requests yet</h3>
          <p className="text-sm text-muted-foreground mt-2">
            When clients send requests, they will appear here.
          </p>
        </div>
      ) : (
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5">
            {tabData.map((tab) => (
              <TabsTrigger 
                key={tab.value} 
                value={tab.value}
                className="relative"
              >
                {tab.label}
                {tab.count > 0 && (
                  <span className="ml-1 rounded-full bg-primary text-primary-foreground text-xs px-1.5 py-0.5">
                    {tab.count}
                  </span>
                )}
              </TabsTrigger>
            ))}
          </TabsList>

          {tabData.map((tab) => (
            <TabsContent key={tab.value} value={tab.value} className="mt-6">
              <div className="space-y-4">
                {getInvitationsByStatus(tab.value).length === 0 ? (
                  <div className="text-center py-12 bg-white p-6 rounded-lg">
                    <h3 className="text-lg font-medium text-muted-foreground">No {tab.label.toLowerCase()} requests</h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      {tab.value === 'PENDING' && 'Pending requests will appear here.'}
                      {tab.value === 'ACCEPTED' && 'Accepted requests will appear here.'}
                      {tab.value === 'REJECTED' && 'Rejected requests will appear here.'}
                      {tab.value === 'EXPIRED' && 'Expired requests will appear here.'}
                      {tab.value === 'CANCELLED' && 'Cancelled requests will appear here.'}
                    </p>
                  </div>
                ) : (
                  <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
                    {getInvitationsByStatus(tab.value).map((invitation) => (
                      <IncomingRequestCard
                        key={invitation.id}
                        invitation={invitation}
                      />
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      )}
    </div>
  )
}
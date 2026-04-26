'use client'

import { useState, useEffect, useMemo } from "react"
import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks"
import { fetchDisputes } from "@/app/store/slices/disputeSlice"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import DisputeCard, { Dispute } from "@/app/components/cards/DisputeCard"
import { AlertCircle, CheckCircle, XCircle } from "lucide-react"

export default function ClientDisputesPage() {
  const dispatch = useAppDispatch()
  const { disputes, loading, error } = useAppSelector((state) => state.dispute)
  const { user } = useAppSelector((state) => state.auth)
  const [activeTab, setActiveTab] = useState('all')

  useEffect(() => {
    dispatch(fetchDisputes())
  }, [dispatch])

  // Filter disputes for current user (client perspective)
  const userDisputes = useMemo(() => {
    if (!user) return []
    return disputes.filter((dispute: Dispute) => 
      dispute.raisedById === user.id || dispute.againstUserId === user.id
    )
  }, [disputes, user])

  const filteredDisputes = useMemo(() => {
    if (activeTab === 'all') return userDisputes
    return userDisputes.filter((dispute: Dispute) => dispute.status === activeTab)
  }, [userDisputes, activeTab])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800'
      case 'RESOLVED':
        return 'bg-green-100 text-green-800'
      case 'REJECTED':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'PENDING':
        return <AlertCircle className="w-4 h-4" />
      case 'RESOLVED':
        return <CheckCircle className="w-4 h-4" />
      case 'REJECTED':
        return <XCircle className="w-4 h-4" />
      default:
        return <AlertCircle className="w-4 h-4" />
    }
  }

  if (loading) {
    return (
      <div className="p-6 text-center">
        <div className="text-muted-foreground">Loading disputes...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6 text-center">
        <div className="text-red-500">Error loading disputes: {error}</div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-foreground font-heading">My Disputes</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Manage disputes related to your bookings and services</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 font-semibold text-sm">
                {userDisputes.length}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium">Total Disputes</p>
              <p className="text-xs text-muted-foreground">All disputes</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
              <AlertCircle className="w-4 h-4 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm font-medium">Pending</p>
              <p className="text-xs text-muted-foreground">
                {userDisputes.filter((d: Dispute) => d.status === 'PENDING').length} disputes
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-4 h-4 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium">Resolved</p>
              <p className="text-xs text-muted-foreground">
                {userDisputes.filter((d: Dispute) => d.status === 'RESOLVED').length} disputes
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
              <XCircle className="w-4 h-4 text-red-600" />
            </div>
            <div>
              <p className="text-sm font-medium">Rejected</p>
              <p className="text-xs text-muted-foreground">
                {userDisputes.filter((d: Dispute) => d.status === 'REJECTED').length} disputes
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All ({userDisputes.length})</TabsTrigger>
          <TabsTrigger value="PENDING">
            Pending ({userDisputes.filter((d: Dispute) => d.status === 'PENDING').length})
          </TabsTrigger>
          <TabsTrigger value="RESOLVED">
            Resolved ({userDisputes.filter((d: Dispute) => d.status === 'RESOLVED').length})
          </TabsTrigger>
          <TabsTrigger value="REJECTED">
            Rejected ({userDisputes.filter((d: Dispute) => d.status === 'REJECTED').length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          {filteredDisputes.length === 0 ? (
            <div className="text-center text-muted-foreground py-10 border rounded-lg">
              {activeTab === 'all' ? (
                <div>
                  <AlertCircle className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-lg font-medium mb-2">No disputes found</p>
                  <p className="text-sm">You don't have any disputes yet. Disputes will appear here when there are issues with your bookings.</p>
                </div>
              ) : (
                <div>
                  <AlertCircle className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-lg font-medium mb-2">No {activeTab.toLowerCase()} disputes</p>
                  <p className="text-sm">You don't have any {activeTab.toLowerCase()} disputes at this time.</p>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredDisputes.map((dispute: Dispute) => (
                <DisputeCard 
                  key={dispute.id} 
                  dispute={dispute} 
                  currentUserId={user?.id}
                />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

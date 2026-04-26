'use client'

import { useState, useEffect, useMemo } from "react"
import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks"
import { fetchDisputes } from "@/app/store/slices/disputeSlice"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import DisputeCard, { Dispute } from "@/app/components/cards/DisputeCard"
import { AlertCircle, CheckCircle, XCircle } from "lucide-react"

export default function DisputesPage() {
  const dispatch = useAppDispatch()
  const { disputes, loading, error } = useAppSelector((state) => state.dispute)
  const [activeTab, setActiveTab] = useState('all')

  useEffect(() => {
    dispatch(fetchDisputes())
  }, [dispatch])

  const filteredDisputes = useMemo(() => {
    if (activeTab === 'all') return disputes
    return disputes.filter((dispute: Dispute) => dispute.status === activeTab)
  }, [disputes, activeTab])

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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
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
        <h1 className="text-xl font-bold text-foreground font-heading">Disputes</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Manage and track dispute resolutions</p>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All ({disputes.length})</TabsTrigger>
          <TabsTrigger value="PENDING">
            Pending ({disputes.filter((d: Dispute) => d.status === 'PENDING').length})
          </TabsTrigger>
          <TabsTrigger value="RESOLVED">
            Resolved ({disputes.filter((d: Dispute) => d.status === 'RESOLVED').length})
          </TabsTrigger>
          <TabsTrigger value="REJECTED">
            Rejected ({disputes.filter((d: Dispute) => d.status === 'REJECTED').length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          {filteredDisputes.length === 0 ? (
            <div className="text-center text-muted-foreground py-10 border rounded-lg">
              No disputes found
            </div>
          ) : (
            <div className="space-y-4">
              {filteredDisputes.map((dispute: Dispute) => (
                <DisputeCard key={dispute.id} dispute={dispute} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

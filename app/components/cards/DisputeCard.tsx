import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, DollarSign, User, AlertCircle, CheckCircle, XCircle } from "lucide-react"

export interface Dispute {
  id: string
  reason: string
  bookingId: string
  createdAt: string
  againstUserId: string
  description: string
  raisedById: string
  refundAmount: number | null
  resolutionNote: string | null
  status: 'PENDING' | 'RESOLVED' | 'REJECTED'
  updatedAt: string
  booking: {
    id: string
    status: string
    serviceRequestId: string
    userId: string
    taskerId: string
    createdAt: string
    updatedAt: string
    user: {
      id: string
      firstName: string
      lastName: string
      email: string
      phone: string
      role: string
    }
    tasker: {
      id: string
      userId: string
      status: string
      location: string
      bio: string
      rating: number
      totalReviews: number
      user: {
        id: string
        firstName: string
        lastName: string
        email: string
        phone: string
        role: string
      }
    }
    payment: {
      id: string
      amount: number
      status: string
      chapaRef: string
      bookingId: string
      createdAt: string
      updatedAt: string
    }
  }
  User_Dispute_raisedByIdToUser: {
    id: string
    firstName: string
    lastName: string
    email: string
    phone: string
    role: string
  }
  User_Dispute_againstUserIdToUser: {
    id: string
    firstName: string
    lastName: string
    email: string
    phone: string
    role: string
  }
}

interface DisputeCardProps {
  dispute: Dispute
  currentUserId?: string
}

export function DisputeCard({ dispute, currentUserId }: DisputeCardProps) {
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

 

  const isAgainstCurrentUser = currentUserId 
    ? dispute.againstUserId === currentUserId
    : dispute.againstUserId === dispute.booking.tasker.userId

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold">{dispute.reason}</CardTitle>
           
          </div>
          <Badge className={getStatusColor(dispute.status)}>
            <div className="flex items-center gap-1">
              {getStatusIcon(dispute.status)}
              {dispute.status}
            </div>
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Description */}
        <div>
          <h4 className="font-medium mb-2 text-sm">Description</h4>
          <p className="text-sm text-muted-foreground">{dispute.description}</p>
        </div>

        {/* Parties Involved */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <User className="w-4 h-4 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">Raised By</p>
              <p className="text-sm text-muted-foreground">
                {dispute.User_Dispute_raisedByIdToUser.firstName} {dispute.User_Dispute_raisedByIdToUser.lastName}
              </p>
              <p className="text-xs text-muted-foreground">{dispute.User_Dispute_raisedByIdToUser.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <User className="w-4 h-4 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">Against</p>
              <p className="text-sm text-muted-foreground">
                {dispute.User_Dispute_againstUserIdToUser.firstName} {dispute.User_Dispute_againstUserIdToUser.lastName}
              </p>
              <p className="text-xs text-muted-foreground">{dispute.User_Dispute_againstUserIdToUser.email}</p>
            </div>
          </div>
        </div>

        {/* Payment Details */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">Payment Amount</p>
              <p className="text-sm text-muted-foreground">${dispute.booking.payment.amount}</p>
            </div>
          </div>
          {dispute.refundAmount && (
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Refund Amount</p>
                <p className="text-sm text-muted-foreground">${dispute.refundAmount}</p>
              </div>
            </div>
          )}
        </div>

        

        {/* Resolution Note */}
        {dispute.resolutionNote && (
          <div>
            <h4 className="font-medium mb-2 text-sm">Resolution Note</h4>
            <p className="text-sm text-muted-foreground bg-gray-50 p-3 rounded-md">
              {dispute.resolutionNote}
            </p>
          </div>
        )}

        {/* Status indicator for current user */}
        <div className="pt-2 border-t">
          <p className="text-sm">
            {isAgainstCurrentUser ? (
              <span className="text-orange-600 font-medium">⚠️ This dispute is raised against you</span>
            ) : (
              ''
            )}
          </p>
        </div>

        
      </CardContent>
    </Card>
  )
}

export default DisputeCard

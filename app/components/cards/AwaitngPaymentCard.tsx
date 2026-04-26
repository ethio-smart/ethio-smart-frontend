"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, MapPin, Clock, DollarSign } from "lucide-react"
import { Booking } from "@/app/types/types"
import PaymentConfirmModal from "../dashboard/client/bookings/PaymentConfirmModal"
import RescheduleRequestDialog from "../dashboard/client/requests/RescheduleRequestDialog"

interface AwaitngPaymentCardProps {
  booking: Booking
  onPayNow?: (bookingId: string) => void
  onViewDetails?: (bookingId: string) => void
}

export default function AwaitngPaymentCard({ booking,onViewDetails }: AwaitngPaymentCardProps) {
  console.log('awaiting booking',booking)
  // Extract tasker name 
  // const taskerName = booking.tasker.user 
  //   ? `${booking.tasker.user.firstName} ${booking.tasker.user.lastName}`
  //   : ''
  const taskerName = booking.tasker.user 
  ? `${booking.tasker.user.firstName} ${booking.tasker.user.lastName}`
  : ''
    // Get tasker initials for avatar fallback
  const taskerInitials = booking.tasker.user
    ? `${booking.tasker.user.firstName[0]}${booking.tasker.user.lastName[0]}`
    : '??'
  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  return (
    <Card className="shadow-none hover:shadow-md transition-shadow">
      <CardContent className="">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            {/*  Tasker Avatar and Name */}
            <Avatar className="h-12 w-12">
              <AvatarImage 
                src={booking.tasker.user?.imageurl || ''} 
                alt={taskerName} 
              />
              <AvatarFallback className="bg-primary/10 text-primary">
                {taskerInitials}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-lg">{taskerName}</h3>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span>{booking.tasker.rating}</span>
                <span className="text-xs">({booking.tasker.totalReviews} reviews)</span>
              </div>
            </div>
          </div>
          {/*  Status Badge */}
          <Badge variant="secondary" className="bg-orange-100 text-orange-800 border-orange-200">
         {booking.status}
          </Badge>
        </div>
          {/*  Booking Details */}
          {/* location */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground">{booking.serviceRequest.location}</span>
          </div>
           {/* time and date */}
          <div className="flex items-center gap-2 text-sm">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground">
              {booking.serviceRequest.preferedDate 
                ? formatDate(booking.serviceRequest.preferedDate)
                : ''
              }
            </span>
          </div>
            {/* budget */}
          <div className="flex items-center gap-2 text-sm">
            <DollarSign className="w-4 h-4 text-muted-foreground" />
            <span className="font-medium text-primary">
              {booking.serviceRequest.budget?.toLocaleString() }
            </span>
          </div>
        </div>
        {/* description */}
        <div className="mb-4">
          <p className="text-sm text-muted-foreground line-clamp-2">
            {booking.serviceRequest.description}
          </p>
        </div>

        {/* <div className="flex gap-2">
          {booking.status !== 'CONFIRMED' && booking.status !== 'COMPLETED' && (
            <>
              <Button 
                variant="outline" 
                size="sm"
                
                onClick={() => onViewDetails?.(booking.id)}
                className="flex-1 py-5 border"
              >
                Details
              </Button>
              <PaymentConfirmModal
                bookingId={booking.id}
                amount={booking.serviceRequest?.budget || 0}
                // bookingTitle={``}
              >
                {booking.status === 'AWAITING_PAYMENT'?
                <Button 
                  size="sm"
                  className="flex-1 bg-primary py-5 text-primary-foreground hover:bg-primary/90"
                >
                  Pay Now
                </Button>
                :''}
              </PaymentConfirmModal>
            </>
          )}
          <div className="flex items-center gap-4">
          {(booking.status === 'CONFIRMED' || booking.status === 'COMPLETED') && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onViewDetails?.(booking.id)}
              className="w-full py-5 border"
            >
              View Details
            </Button>
          )}
                 {(booking.status === 'CONFIRMED') &&
                <Button
              size="lg"
              variant="outline"
              className="border-primary border py-5 text-primary"
            >
              <Clock /> Reschedule
            </Button>
                 }
        </div>
        </div> */}
        {/* Actions */}
<div className="flex gap-2 mt-2">
  {booking.status === "AWAITING_PAYMENT" && (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => onViewDetails?.(booking.id)}
        className="flex-1 py-5"
      >
        Details
      </Button>

      <PaymentConfirmModal
        bookingId={booking.id}
        amount={booking.serviceRequest?.budget || 0}
      >
        <Button
          size="sm"
          className="flex-1 py-5 bg-primary text-primary-foreground hover:bg-primary/90"
        >
          Pay Now
        </Button>
      </PaymentConfirmModal>
    </>
  )}

  {booking.status === "CONFIRMED" && (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => onViewDetails?.(booking.id)}
        className="flex-1 py-5"
      >
        View Details
      </Button>
<RescheduleRequestDialog currentSchedule={booking.serviceRequest.preferedDate} bookingId={booking.id}>
      <Button
        size="sm"
        variant="outline"
        className="flex-1 py-5 border-primary text-primary"
      >
        <Clock className="w-4 h-4 mr-2" />
        Reschedule
      </Button>
      </RescheduleRequestDialog>
    </>
  )}

  {booking.status === "COMPLETED" && (
    <Button
      variant="outline"
      size="sm"
      onClick={() => onViewDetails?.(booking.id)}
      className="w-full py-5"
    >
      View Details
    </Button>
  )}
</div>
      </CardContent>
    </Card>
  )
}

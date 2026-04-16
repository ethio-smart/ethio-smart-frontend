"use client"

import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch } from '@/app/store/store'
import { fetchClientBookings } from '@/app/store/slices/bookingSlice'
import { RootState } from '@/app/store/store'
import { BookingStatus } from '@/app/types/types'
// import AwaitngPaymentCard from '@/app/components/cards/AwaitngPaymentCard'
import { Skeleton } from '@/components/ui/skeleton'
import { AlertCircle } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import AwaitngPaymentCard from '@/app/[locale]/components/cards/AwaitngPaymentCard'

export default function ClientBookingsPage() {
  const dispatch: AppDispatch = useDispatch()
  const { bookings, loading, error } = useSelector((state: RootState) => state.booking)
  const [activeTab, setActiveTab] = useState<BookingStatus>('AWAITING_PAYMENT')

  useEffect(() => {
    dispatch(fetchClientBookings())
  }, [dispatch])

  const handlePayNow = (bookingId: string) => {
    console.log('Pay now for booking:', bookingId)
    // TODO: Implement payment logic
  }

  const handleViewDetails = (bookingId: string) => {
    console.log('View details for booking:', bookingId)
    // TODO: Implement navigation to booking details
  }

  const getBookingsByStatus = (status: BookingStatus) => {
    return bookings.filter(booking => booking.status === status)
  }

  const tabData = [
    { value: 'AWAITING_PAYMENT' as BookingStatus, label: 'Awaiting Payment', count: getBookingsByStatus('AWAITING_PAYMENT').length },
    { value: 'CONFIRMED' as BookingStatus, label: 'Confirmed', count: getBookingsByStatus('CONFIRMED').length },
    { value: 'IN_PROGRESS' as BookingStatus, label: 'In Progress', count: getBookingsByStatus('IN_PROGRESS').length },
    { value: 'COMPLETED' as BookingStatus, label: 'Completed', count: getBookingsByStatus('COMPLETED').length },
    { value: 'CANCELLED' as BookingStatus, label: 'Cancelled', count: getBookingsByStatus('CANCELLED').length },
    { value: 'DISPUTED' as BookingStatus, label: 'Disputed', count: getBookingsByStatus('DISPUTED').length },
  ]

  if (loading.fetch) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">My Bookings</h1>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="h-50 w-full rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">My Bookings</h1>
        <div className="flex items-center gap-2 p-4 border border-red-200 bg-red-50 rounded-lg">
          <AlertCircle className="h-4 w-4 text-red-500" />
          <p className="text-sm text-red-700">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">My Bookings</h1>
        <p className="text-muted-foreground">Manage and track your service bookings</p>
      </div>

      {bookings.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-muted-foreground">No bookings yet</h3>
          <p className="text-sm text-muted-foreground mt-2">
            When you make bookings, they will appear here.
          </p>
        </div>
      ) : (
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as BookingStatus)}>
          <TabsList className="grid w-full grid-cols-6">
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
                {getBookingsByStatus(tab.value).length === 0 ? (
                  <div className="text-center py-12 bg-white rounded-lg">
                    <h3 className="text-lg font-medium ">No {tab.label.toLowerCase()} bookings</h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      {tab.value === 'AWAITING_PAYMENT' && 'Bookings awaiting payment will appear here.'}
                      {tab.value === 'CONFIRMED' && 'Confirmed bookings will appear here.'}
                      {tab.value === 'IN_PROGRESS' && 'Bookings currently in progress will appear here.'}
                      {tab.value === 'COMPLETED' && 'Completed bookings will appear here.'}
                      {tab.value === 'CANCELLED' && 'Cancelled bookings will appear here.'}
                      {tab.value === 'DISPUTED' && 'Disputed bookings will appear here.'}
                    </p>
                  </div>
                ) : (
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {getBookingsByStatus(tab.value).map((booking) => (
                      <AwaitngPaymentCard
                        key={booking.id}
                        booking={booking}
                        onPayNow={handlePayNow}
                        onViewDetails={handleViewDetails}
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
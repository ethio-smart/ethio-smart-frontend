/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/app/hooks/hooks'
import { fetchTaskerBookings } from '@/app/store/slices/bookingSlice'
import { DataTable } from '@/components/ui/data-table/DataTable'
import { bookingStatusStyles, paymentStatusStyles } from '@/app/lib/constants/booking'
import { BookingStatus, PaymentStatus } from '@/app/types/types'
import BookingDetailsModal from '@/app/components/dashboard/tasker/bookings/BookingDetailsModal'


const columns = [
  {
    id: 'service',
    header: 'Service',
    cell: ({ row }: any) => {
      const booking = row.original
      const service = booking.serviceRequest?.tittle || 'No title'
      const date = new Date(booking.createdAt)

      return (
        <div>
          <p className="font-medium">{service}</p>
          <p className="text-xs text-muted-foreground">
            {date.toLocaleDateString()}
          </p>
        </div>
      )
    },
  },

  {
    id: 'client',
    header: 'Client',
    cell: ({ row }: any) => {
      const user = row.original.user

      return (
        <span>
          {user
            ? `${user.firstName} ${user.lastName}`
            : '—'}
        </span>
      )
    },
  },

  {
    id: 'location',
    header: 'Location',
    cell: ({ row }: any) => (
      <span>
        {row.original.serviceRequest?.location || '—'}
      </span>
    ),
  },

  {
    id: 'budget',
    header: 'Budget',
    cell: ({ row }: any) => (
      <span className="font-semibold">
        ETB {row.original.serviceRequest?.budget}
      </span>
    ),
  },

  {
    id: 'payment',
    header: 'Payment',
    cell: ({ row }: any) => {
      const status: PaymentStatus =
  row.original.payment?.status ?? 'PENDING';

 

      return (
        <span
      className={`px-2 py-1 rounded-md text-xs font-medium ${
        paymentStatusStyles[status]
      }`}
    >
      {status}
    </span>
      )
    },
  },

  {
    id: 'status',
    header: 'Booking Status',
    cell: ({ row }: any) => {
      const status:BookingStatus = row.original.status

  

      return (
        <span
          className={`px-2 py-1 rounded-md text-xs font-medium ${
            bookingStatusStyles[status] || 'bg-muted text-muted-foreground'
          }`}
        >
          {status}
        </span>
      )
    },
  },

  {
    id: 'actions',
    header: 'Action',
    cell: ({ row }: any) => {
      const booking = row.original

      return (
      <BookingDetailsModal
      booking={booking}
      onComplete={(id) => console.log('complete', id)}
      onDispute={(id) => console.log('dispute', id)}
    >
      <button className="text-primary text-sm hover:underline">
        Details
      </button>
    </BookingDetailsModal>
      )
    },
  },
]

export default function BookingsPage() {
  const dispatch = useAppDispatch()

  const { bookings, loading } = useAppSelector(
    (state) => state.booking
  )
console.log('bookinggss',bookings)
  useEffect(() => {
    dispatch(fetchTaskerBookings())
  }, [dispatch])


   if (loading.fetchTasker) {
    return <div className=" bg-white p-10 text-center rounded-lg border animate-pulse">Loading bookings...</div>
  }
    if (!bookings || bookings.length === 0) {
    return (
      <div className="p-6 text-center text-muted-foreground">
        No bookings found
      </div>
    )
  }
  return (
    <div className="border rounded-lg bg-white p-4">
      <DataTable columns={columns} data={bookings} />
    </div>
  )
}
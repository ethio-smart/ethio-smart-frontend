/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';
import { useAppDispatch, useAppSelector } from '@/app/hooks/hooks';
import { fetchTaskerBookings } from '@/app/store/slices/bookingSlice';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Image from 'next/image';
import { Booking, BookingStatus } from '@/app/types/types';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

// Selectors from booking slice
const selectBookings = (state: any) => state.booking.bookings;
const selectBookingLoading = (state: any) => state.booking.loading.fetchTasker;
const selectBookingError = (state: any) => state.booking.error;

const statusConfig: Record<BookingStatus, {label: string;color: string;bg: string;icon: string;}> = {
  AWAITING_PAYMENT: { label: 'Pending', color: 'text-amber-700', bg: 'bg-amber-50', icon: 'ClockIcon' },
  CONFIRMED: { label: 'Confirmed', color: 'text-blue-700', bg: 'bg-blue-50', icon: 'CheckIcon' },
  IN_PROGRESS: { label: 'In Progress', color: 'text-emerald-700', bg: 'bg-emerald-50', icon: 'PlayIcon' },
  COMPLETED: { label: 'Completed', color: 'text-gray-600', bg: 'bg-gray-100', icon: 'CheckCircleIcon' },
  PAYED_OUT: { label: 'Payed Out', color: 'text-emerald-700', bg: 'bg-emerald-50', icon: 'CheckCircleIcon' },
  CANCELLED: { label: 'Cancelled', color: 'text-red-600', bg: 'bg-red-50', icon: 'XCircleIcon' },
  DISPUTED: { label: 'Disputed', color: 'text-red-600', bg: 'bg-red-50', icon: 'XCircleIcon' }
};

// Default config for unknown statuses
const defaultStatusConfig = {
  label: 'Unknown',
  color: 'text-gray-600',
  bg: 'bg-gray-100',
  icon: 'ClockIcon'
};

export default function BookingPipeline() {
  const dispatch = useAppDispatch();
  const bookings = useAppSelector(selectBookings);
  const loading = useAppSelector(selectBookingLoading);
  const error = useAppSelector(selectBookingError);
  const [isHydrated, setIsHydrated] = useState(false);
  const [filter, setFilter] = useState<'all' | BookingStatus>('all');

  useEffect(() => {
    setIsHydrated(true);
    // Fetch tasker bookings when component mounts
    dispatch(fetchTaskerBookings());
  }, [dispatch]);

  const filtered = filter === 'all' ? bookings : bookings.filter((b: Booking) => b.status === filter);

  if (!isHydrated || loading) {
    return (
      <div className="bg-card rounded-xl border border-border p-5 animate-pulse">
        <div className="h-6 bg-muted rounded w-40 mb-4" />
        {[1, 2, 3, 4].map((i) =>
        <div key={i} className="h-16 bg-muted rounded mb-3" />
        )}
      </div>);
  }

  if (error) {
    return (
      <div className="bg-card rounded-xl border border-red-200 p-5">
        <h3 className="text-lg font-semibold text-red-800 mb-2">Error Loading Bookings</h3>
        <p className="text-red-600 text-sm">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-xl border border-border p-5 flex flex-col h-full w-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-base font-semibold text-foreground font-heading">Booking Pipeline</h2>
          <p className="text-xs text-muted-foreground mt-0.5">{bookings.length} total bookings</p>
        </div>
        <Select value={filter} onValueChange={(v) => setFilter(v as BookingStatus)}>
          <SelectTrigger
            className="h-8 text-xs border border-border rounded-md px-2 py-1.5 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            aria-label="Filter bookings by status"
          >
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="AWAITING_PAYMENT">Pending</SelectItem>
            <SelectItem value="CONFIRMED">Confirmed</SelectItem>
            <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
            <SelectItem value="COMPLETED">Completed</SelectItem>
            <SelectItem value="PAYED_OUT">Payed Out</SelectItem>
            <SelectItem value="CANCELLED">Cancelled</SelectItem>
            <SelectItem value="DISPUTED">Disputed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-3 flex-1 overflow-y-auto max-h-50 pr-1">
        {filtered.map((booking: Booking) => {
          const sc = statusConfig[booking.status] || defaultStatusConfig;
          const clientFName = booking.user?.firstName;
          const clientLName =  booking.user?.lastName 
          
          const serviceName = booking.serviceRequest?.tittle || 'Service';
          const bookingDate = booking.createdAt ? new Date(booking.createdAt).toLocaleDateString() : 'Unknown';
          const bookingAmount = booking.payment?.amount || 0;

          return (
            <div
              key={booking.id}
              className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-standard group">
              
              <div className="w-9 h-9 rounded-full overflow-hidden shrink-0 bg-muted">
               <Avatar>
                <AvatarFallback
                  className="w-full h-full object-cover"
                >
                  {clientFName?.charAt(0).toUpperCase()}{clientLName?.charAt(0).toUpperCase()}

                </AvatarFallback>
                  
               </Avatar>
              </div>
              <div className="flex-1 min-w-0 items-center ">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-medium text-foreground truncate">{clientFName}{clientLName}</p>
                  <span className="text-sm font-semibold text-emerald-600 shrink-0">
                    ETB {bookingAmount}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs text-muted-foreground truncate">{serviceName}</span>
                  <span className="text-muted-foreground">·</span>
                  <span className="text-xs text-muted-foreground shrink-0">{bookingDate}</span>
                </div>
              </div>
              <div className={`flex items-center gap-1 px-2 py-1 rounded-full ${sc.bg} shrink-0`}>
                <Icon name={sc.icon as any} size={12} variant="solid" className={sc.color} />
                <span className={`text-xs font-medium ${sc.color}`}>{sc.label}</span>
              </div>
            </div>);
        })}
      </div>

      <div className="mt-4 pt-4 border-t border-border grid grid-cols-2 gap-2">
        
        <button className="flex w-fit items-center justify-center gap-2 px-3 py-2 rounded-lg border border-border text-foreground text-xs font-medium hover:bg-muted transition-standard press-effect">
          <Icon name="ArrowRightIcon" size={14} variant="outline" />
          View All
        </button>
      </div>
    </div>);
}

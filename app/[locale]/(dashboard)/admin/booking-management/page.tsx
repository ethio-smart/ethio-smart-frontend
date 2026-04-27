'use client';

import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import type { Booking } from '@/app/types/types';


import BookingStatusFilters from '@/app/components/dashboard/admin/booking/BookingStatusFilters';
import BookingFiltersBar, { type SortBy } from '@/app/components/dashboard/admin/booking/BookingFiltersBar';
import BookingTable from '@/app/components/dashboard/admin/booking/BookingTable';
import BookingDetailsDialog from '@/app/components/dashboard/admin/booking/BookingDetailsDialog';
import { useAppDispatch, useAppSelector } from '@/app/hooks/hooks';
import {
  clearSelectedAdminBooking,
  fetchAdminBookingById,
  fetchAdminBookings,
} from '@/app/store/slices/bookingSlice';
import { Booking, mockBookings } from './data';

export default function BookingManagementPage() {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const bookingIdParam = searchParams.get('bookingId');
  const disputeIdParam = searchParams.get('disputeId');
  const { adminBookings, selectedAdminBooking, loading, error } = useAppSelector(
    (state) => state.booking,
  );

  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | Booking['status']>('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortBy, setSortBy] = useState<SortBy>('date-desc');
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchAdminBookings());
  }, [dispatch]);

  useEffect(() => {
    if (!bookingIdParam) return;

    setIsDetailsOpen(true);
    dispatch(fetchAdminBookingById(bookingIdParam));
  }, [bookingIdParam, dispatch]);

  const categories = useMemo(
    () => [
      'all',
      ...Array.from(
        new Set(adminBookings.map((b) => b.serviceRequest?.category?.name).filter(Boolean) as string[]),
      ),
    ],
    [adminBookings],
  );

  const filteredBookings = useMemo(() => {
    const searchTerm = search.trim().toLowerCase();

    let result = adminBookings.filter((b) => {
      const clientName = b.user ? `${b.user.firstName} ${b.user.lastName}`.toLowerCase() : '';
      const taskerName = b.tasker?.user
        ? `${b.tasker.user.firstName} ${b.tasker.user.lastName}`.toLowerCase()
        : '';
      const title = b.serviceRequest?.tittle?.toLowerCase() ?? '';

      const matchSearch =
        b.id.toLowerCase().includes(searchTerm) ||
        clientName.includes(searchTerm) ||
        taskerName.includes(searchTerm) ||
        title.includes(searchTerm);
      const matchStatus = filterStatus === 'all' || b.status === filterStatus;
      const matchCategory =
        filterCategory === 'all' || b.serviceRequest?.category?.name === filterCategory;
      return matchSearch && matchStatus && matchCategory;
    });

    result = [...result].sort((a, b) => {
      if (sortBy === 'date-desc') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      if (sortBy === 'date-asc') return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();

      const aAmount = a.payment?.amount ?? a.serviceRequest?.budget ?? 0;
      const bAmount = b.payment?.amount ?? b.serviceRequest?.budget ?? 0;
      if (sortBy === 'price-desc') return bAmount - aAmount;
      if (sortBy === 'price-asc') return aAmount - bAmount;
      return 0;
    });

    return result;
  }, [adminBookings, search, filterStatus, filterCategory, sortBy]);

  const statusCounts = useMemo(() => {
    const counts: Record<'all' | Booking['status'], number> = {
      all: adminBookings.length,
      AWAITING_PAYMENT: 0,
      CONFIRMED: 0,
      IN_PROGRESS: 0,
      COMPLETED: 0,
      CANCELLED: 0,
      DISPUTED: 0,
    };

    adminBookings.forEach((b) => {
      counts[b.status] += 1;
    });

    return counts;
  }, [adminBookings]);

  const handleViewDetails = (bookingId: string) => {
    setIsDetailsOpen(true);
    dispatch(fetchAdminBookingById(bookingId));
  };

  const handleCloseDetails = () => {
    setIsDetailsOpen(false);
    dispatch(clearSelectedAdminBooking());
  };

  return (
    <>
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-bold text-foreground">Booking Management</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Monitor and manage all platform bookings
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="font-semibold text-foreground">
              {adminBookings.length}
            </span>{" "}
            total bookings
          </div>
        </div>

        {error && (
          <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
            {error}
          </div>
        )}

        <BookingStatusFilters value={filterStatus} onChange={setFilterStatus} counts={statusCounts} />

        <Card className="overflow-hidden">
          <CardHeader className="space-y-3">
            <CardTitle className="text-base">Bookings</CardTitle>
            <BookingFiltersBar
              search={search}
              onSearchChange={setSearch}
              category={filterCategory}
              onCategoryChange={setFilterCategory}
              categories={categories}
              sortBy={sortBy}
              onSortByChange={setSortBy}
            />
          </CardHeader>
          <CardContent className="p-0">
            {loading.fetchAdminList ? (
              <div className="py-12 text-center text-muted-foreground text-sm">Loading bookings...</div>
            ) : filteredBookings.length === 0 ? (
              <div className="py-12 text-center text-muted-foreground text-sm">
                No bookings found matching your filters.
              </div>
            ) : (
              <BookingTable bookings={filteredBookings} onView={handleViewDetails} />
            )}
          </CardContent>
          <CardFooter className="justify-between">
            <p className="text-xs text-muted-foreground">
              Showing <span className="font-semibold text-foreground">{filteredBookings.length}</span>{" "}
              of <span className="font-semibold text-foreground">{adminBookings.length}</span>{" "}
              bookings
            </p>
          </CardFooter>
        </Card>
      </div>

      <BookingDetailsDialog
        open={isDetailsOpen}
        booking={selectedAdminBooking}
        isLoading={loading.fetchAdminDetails}
        referralDisputeId={disputeIdParam}
        onClose={handleCloseDetails}
      />
    </>
  );
}

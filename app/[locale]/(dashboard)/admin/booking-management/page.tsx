'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';


import BookingStatusFilters from '@/app/components/dashboard/admin/booking/BookingStatusFilters';
import BookingFiltersBar, { type SortBy } from '@/app/components/dashboard/admin/booking/BookingFiltersBar';
import BookingTable from '@/app/components/dashboard/admin/booking/BookingTable';
import BookingDetailsDialog from '@/app/components/dashboard/admin/booking/BookingDetailsDialog';
import { Booking, mockBookings } from './data';

export default function BookingManagementPage() {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | Booking['status']>('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortBy, setSortBy] = useState<SortBy>('date-desc');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const categories = useMemo(() => ['all', ...Array.from(new Set(mockBookings.map((b) => b.serviceCategory)))], []);

  const filteredBookings = useMemo(() => {
    let result = mockBookings.filter((b) => {
      const matchSearch = b.id.toLowerCase().includes(search.toLowerCase()) || b.client.toLowerCase().includes(search.toLowerCase()) || b.tasker.toLowerCase().includes(search.toLowerCase());
      const matchStatus = filterStatus === 'all' || b.status === filterStatus;
      const matchCategory = filterCategory === 'all' || b.serviceCategory === filterCategory;
      return matchSearch && matchStatus && matchCategory;
    });

    result = [...result].sort((a, b) => {
      if (sortBy === 'date-desc') return new Date(b.date).getTime() - new Date(a.date).getTime();
      if (sortBy === 'date-asc') return new Date(a.date).getTime() - new Date(b.date).getTime();
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'price-asc') return a.price - b.price;
      return 0;
    });

    return result;
  }, [search, filterStatus, filterCategory, sortBy]);

  const statusCounts = useMemo(() => {
    const counts: Record<'all' | Booking['status'], number> = { all: mockBookings.length } as any;
    mockBookings.forEach((b) => { counts[b.status] = (counts[b.status] || 0) + 1; });
    return counts;
  }, []);

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
              {mockBookings.length}
            </span>{" "}
            total bookings
          </div>
        </div>

        <BookingStatusFilters value={filterStatus} onChange={setFilterStatus} counts={statusCounts as any} />

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
            {filteredBookings.length === 0 ? (
              <div className="py-12 text-center text-muted-foreground text-sm">
                No bookings found matching your filters.
              </div>
            ) : (
              <BookingTable bookings={filteredBookings} onView={setSelectedBooking} />
            )}
          </CardContent>
          <CardFooter className="justify-between">
            <p className="text-xs text-muted-foreground">
              Showing <span className="font-semibold text-foreground">{filteredBookings.length}</span>{" "}
              of <span className="font-semibold text-foreground">{mockBookings.length}</span>{" "}
              bookings
            </p>
          </CardFooter>
        </Card>
      </div>

      <BookingDetailsDialog
        booking={selectedBooking}
        onClose={() => setSelectedBooking(null)}
      />
    </>
  );
}

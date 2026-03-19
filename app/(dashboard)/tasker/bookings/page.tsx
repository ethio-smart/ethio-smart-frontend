'use client';

import { useState, useEffect } from 'react';
import { CalendarDays } from 'lucide-react';
import { toast } from 'sonner';
import { BookingAction, BookingRow, BookingTable } from '@/app/components/dashboard/tasker/bookings/BookingTable';

import { BookingDetailsModal } from '@/app/components/dashboard/tasker/bookings/BookingDetailsModal';


type BookingStatus = 'Requests' | 'Accepted' | 'In Progress' | 'Completed' | 'Cancelled' | 'Expired';
type PaymentStatus = 'Pending' | 'Paid' | 'Refunded' | 'Failed';

interface Booking {
  id: string;
  service: string;
  clientName: string;
  location: string;
  scheduledDate: string;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  budget: number;
  clientEmail: string;
  clientPhone: string;
  notes: string;
}

const TABS: BookingStatus[] = ['Requests', 'Accepted', 'In Progress', 'Completed', 'Cancelled', 'Expired'];

const MOCK_BOOKINGS: Booking[] = [
  { id: 'BK-001', service: 'Deep House Cleaning', clientName: 'Sarah Johnson', location: 'Addis Ababa, Bole', scheduledDate: '2025-04-15', status: 'Requests', paymentStatus: 'Pending', budget: 180, clientEmail: 'sarah@example.com', clientPhone: '+251 91 234 5678', notes: 'Please bring your own cleaning supplies.' },
  { id: 'BK-002', service: 'Pipe Leak Repair', clientName: 'Michael Chen', location: 'Addis Ababa, Kazanchis', scheduledDate: '2025-04-16', status: 'Requests', paymentStatus: 'Pending', budget: 120, clientEmail: 'michael@example.com', clientPhone: '+251 92 345 6789', notes: 'Kitchen sink is leaking.' },
  { id: 'BK-003', service: 'Electrical Wiring', clientName: 'Amara Bekele', location: 'Addis Ababa, Piassa', scheduledDate: '2025-04-10', status: 'Accepted', paymentStatus: 'Paid', budget: 240, clientEmail: 'amara@example.com', clientPhone: '+251 93 456 7890', notes: 'New outlet installation needed.' },
  { id: 'BK-004', service: 'Garden Landscaping', clientName: 'Tigist Haile', location: 'Addis Ababa, CMC', scheduledDate: '2025-04-08', status: 'In Progress', paymentStatus: 'Paid', budget: 300, clientEmail: 'tigist@example.com', clientPhone: '+251 94 567 8901', notes: 'Front yard redesign.' },
  { id: 'BK-005', service: 'Interior Painting', clientName: 'Daniel Tesfaye', location: 'Addis Ababa, Sarbet', scheduledDate: '2025-03-28', status: 'Completed', paymentStatus: 'Paid', budget: 350, clientEmail: 'daniel@example.com', clientPhone: '+251 95 678 9012', notes: 'Living room and bedroom.' },
  { id: 'BK-006', service: 'Furniture Moving', clientName: 'Hana Girma', location: 'Addis Ababa, Megenagna', scheduledDate: '2025-03-20', status: 'Cancelled', paymentStatus: 'Refunded', budget: 200, clientEmail: 'hana@example.com', clientPhone: '+251 96 789 0123', notes: 'Client cancelled due to schedule conflict.' },
  { id: 'BK-007', service: 'Deep House Cleaning', clientName: 'Yonas Alemu', location: 'Addis Ababa, Gerji', scheduledDate: '2025-03-10', status: 'Expired', paymentStatus: 'Failed', budget: 90, clientEmail: 'yonas@example.com', clientPhone: '+251 97 890 1234', notes: 'No response from client.' },
  { id: 'BK-008', service: 'Pipe Leak Repair', clientName: 'Meron Tadesse', location: 'Addis Ababa, Lideta', scheduledDate: '2025-04-18', status: 'Accepted', paymentStatus: 'Paid', budget: 150, clientEmail: 'meron@example.com', clientPhone: '+251 98 901 2345', notes: 'Bathroom pipes.' },
];

const timelineSteps = ['Requested', 'Accepted', 'In Progress', 'Completed'];

export default function BookingsPage() {
  const [isHydrated, setIsHydrated] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<BookingStatus>('Requests');
  const [bookings, setBookings] = useState<Booking[]>(MOCK_BOOKINGS);
  const [viewingBooking, setViewingBooking] = useState<Booking | null>(null);
  const [isDisputeOpen, setIsDisputeOpen] = useState(false);
  const [disputeBookingId, setDisputeBookingId] = useState('');
  const [disputeReason, setDisputeReason] = useState('');
  const [disputeDesc, setDisputeDesc] = useState('');

  useEffect(() => { setIsHydrated(true); }, []);

  const filtered = bookings.filter(b => b.status === activeTab);

  const tabCount = (tab: BookingStatus) => bookings.filter(b => b.status === tab).length;

  const handleAction = (action: BookingAction, booking: BookingRow) => {
    if (action === 'accept') {
      setBookings(prev => prev.map(b => b.id === booking.id ? { ...b, status: 'Accepted' } : b));
      toast.success('Booking accepted successfully');
    } else if (action === 'reject') {
      setBookings(prev => prev.map(b => b.id === booking.id ? { ...b, status: 'Cancelled' } : b));
      toast.success('Booking cancelled');
    } else if (action === 'start') {
      setBookings(prev => prev.map(b => b.id === booking.id ? { ...b, status: 'In Progress' } : b));
      toast.success('Job started');
    } else if (action === 'complete') {
      setBookings(prev => prev.map(b => b.id === booking.id ? { ...b, status: 'Completed', paymentStatus: 'Paid' } : b));
      toast.success('Job marked as completed');
    } else if (action === 'dispute') {
      setDisputeBookingId(booking.id);
      setIsDisputeOpen(true);
    } else if (action === 'view') {
      const full = bookings.find((b) => b.id === booking.id) ?? null;
      setViewingBooking(full);
    }
  };

  const handleDisputeSubmit = () => {
    if (!disputeReason || !disputeDesc) return;
    toast.success('Dispute raised successfully');
    setIsDisputeOpen(false);
    setDisputeReason('');
    setDisputeDesc('');
  };

  const getTimelineStep = (status: BookingStatus) => {
    const map: Record<string, number> = { 'Requests': 0, 'Accepted': 1, 'In Progress': 2, 'Completed': 3 };
    return map[status] ?? -1;
  };

  const sidebarWidth = isSidebarCollapsed ? 'lg:pl-' : 'lg:pl-[0px]';

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-10 h-10 rounded-full border-4 border-primary border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen ">
    

      <main id="main-content" className={`pt- transition-all duration-250 ease-out ${sidebarWidth}`}>
        <div className="p-4 lg:p-4 space-y-5 mx-auto">

          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h1 className="text-xl font-bold text-foreground font-heading">Bookings</h1>
              <p className="text-sm text-muted-foreground mt-0.5">Manage your service bookings and client requests</p>
            </div>
          </div>

          {/* Tabs */}
          <BookingTable
            tabs={TABS}
            activeTab={activeTab}
            onTabChange={(tab) => setActiveTab(tab)}
            bookings={bookings as unknown as BookingRow[]}
            getTabCount={(tab) => tabCount(tab)}
            onAction={handleAction}
          />
        </div>
      </main>

      {/* Booking Details Modal */}
      <BookingDetailsModal
        booking={viewingBooking as any}
        open={Boolean(viewingBooking)}
        onOpenChange={(open) => {
          if (!open) setViewingBooking(null);
        }}
        timelineSteps={timelineSteps}
        getTimelineStep={getTimelineStep}
        onRaiseDispute={(id) => {
          setDisputeBookingId(id);
          setIsDisputeOpen(true);
          setViewingBooking(null);
        }}
      />
 
      {/* Dispute Modal */}
      {/* <DisputeModal
        open={isDisputeOpen}
        onOpenChange={setIsDisputeOpen}
        values={{ bookingId: disputeBookingId, reason: disputeReason, description: disputeDesc }}
        onChange={(next) => {
          setDisputeBookingId(next.bookingId);
          setDisputeReason(next.reason);
          setDisputeDesc(next.description);
        }}
        onSubmit={handleDisputeSubmit}
      /> */}
    </div>
  );
}

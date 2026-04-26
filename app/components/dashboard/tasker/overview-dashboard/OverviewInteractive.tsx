'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import EarningsChart from './EarningsChart';
import NotificationFeed from './NotificationFeed';
import BookingStatusChart from './BookingStatusChart';
import TransactionTable from './TransactionTable';
import KPICard from './KPICard';
import QuickStats from './QuickStats';



// ─── Types ───────────────────────────────────────────────────────────────────
interface Transaction {
  id: string;
  date: string;
  client: string;
  service: string;
  category: string;
  amount: number;
  fee: number;
  net: number;
  status: "completed" | "pending" | "processing" | "failed";
  region: string;
}
interface SparklinePoint { value: number; }

interface KPIData {
  title: string;
  value: string;
  change: number;
  changeLabel: string;
  iconName: string;
  sparklineData: SparklinePoint[];
  accentColor: string;
  prefix?: string;
  suffix?: string;
}

interface EarningsDataPoint {
  month: string;
  earnings: number;
  bookings: number;
  forecast: number;
}

interface BookingStatusData {
  name: string;
  value: number;
  color: string;
}

interface NotificationItem {
  id: string;
  type: 'booking' | 'payment' | 'review' | 'alert' | 'request';
  title: string;
  message: string;
  time: string;
  read: boolean;
  actionLabel?: string;
}

interface QuickStatItem {
  label: string;
  value: string;
  sub: string;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const mockTransactions: Transaction[] = [
  { id: "TXN-2026-0312", date: "03/05/2026", client: "Sarah Mitchell", service: "Bathroom Plumbing Repair", category: "Plumbing", amount: 320, fee: 32, net: 288, status: "completed", region: "New York, NY" },
  { id: "TXN-2026-0311", date: "03/04/2026", client: "James Kowalski", service: "Electrical Panel Upgrade", category: "Electrical", amount: 580, fee: 58, net: 522, status: "processing", region: "Brooklyn, NY" },
  { id: "TXN-2026-0310", date: "03/04/2026", client: "Maria Santos", service: "Deep House Cleaning", category: "Cleaning", amount: 180, fee: 18, net: 162, status: "pending", region: "Queens, NY" },
  { id: "TXN-2026-0309", date: "03/03/2026", client: "David Chen", service: "Math Tutoring Session", category: "Tutoring", amount: 95, fee: 9.5, net: 85.5, status: "completed", region: "Manhattan, NY" },
  { id: "TXN-2026-0308", date: "03/03/2026", client: "Emily Rodriguez", service: "Business Strategy Consulting", category: "Consulting", amount: 450, fee: 45, net: 405, status: "pending", region: "Bronx, NY" },
  { id: "TXN-2026-0307", date: "03/02/2026", client: "Robert Thompson", service: "Kitchen Pipe Fix", category: "Plumbing", amount: 240, fee: 24, net: 216, status: "completed", region: "Staten Island, NY" },
  { id: "TXN-2026-0306", date: "03/01/2026", client: "Lisa Park", service: "Office Cleaning", category: "Cleaning", amount: 220, fee: 22, net: 198, status: "failed", region: "Jersey City, NJ" },
  { id: "TXN-2026-0305", date: "02/28/2026", client: "Michael Brown", service: "Wiring Installation", category: "Electrical", amount: 390, fee: 39, net: 351, status: "completed", region: "Hoboken, NJ" },
  { id: "TXN-2026-0304", date: "02/27/2026", client: "Jennifer Lee", service: "Science Tutoring", category: "Tutoring", amount: 110, fee: 11, net: 99, status: "completed", region: "Newark, NJ" },
  { id: "TXN-2026-0303", date: "02/26/2026", client: "Carlos Mendez", service: "Startup Advisory", category: "Consulting", amount: 600, fee: 60, net: 540, status: "completed", region: "New York, NY" },
  { id: "TXN-2026-0302", date: "02/25/2026", client: "Amanda Foster", service: "Drain Unclogging", category: "Plumbing", amount: 150, fee: 15, net: 135, status: "completed", region: "Brooklyn, NY" },
  { id: "TXN-2026-0301", date: "02/24/2026", client: "Kevin Walsh", service: "Outlet Replacement", category: "Electrical", amount: 200, fee: 20, net: 180, status: "completed", region: "Queens, NY" },
  { id: "TXN-2026-0300", date: "02/23/2026", client: "Natalie Kim", service: "Move-out Cleaning", category: "Cleaning", amount: 280, fee: 28, net: 252, status: "completed", region: "Manhattan, NY" },
  { id: "TXN-2026-0299", date: "02/22/2026", client: "Brian Scott", service: "English Tutoring", category: "Tutoring", amount: 85, fee: 8.5, net: 76.5, status: "completed", region: "Bronx, NY" },
  { id: "TXN-2026-0298", date: "02/21/2026", client: "Diana Prince", service: "Financial Consulting", category: "Consulting", amount: 520, fee: 52, net: 468, status: "processing", region: "New York, NY" },
  { id: "TXN-2026-0297", date: "02/20/2026", client: "Tom Harris", service: "Water Heater Install", category: "Plumbing", amount: 480, fee: 48, net: 432, status: "completed", region: "Staten Island, NY" },
];

const kpiData: KPIData[] = [
  {
    title: 'Active Requests',
    value: '24',
    change: 12.5,
    changeLabel: 'vs last period',
    iconName: 'InboxArrowDownIcon',
    accentColor: '#0D7C66',
    sparklineData: [{ value: 14 }, { value: 18 }, { value: 15 }, { value: 20 }, { value: 19 }, { value: 22 }, { value: 24 }],
  },
  {
    title: 'Total Bookings',
    value: '187',
    change: 8.3,
    changeLabel: 'vs last period',
    iconName: 'CalendarDaysIcon',
    accentColor: '#41B3A2',
    sparklineData: [{ value: 140 }, { value: 155 }, { value: 148 }, { value: 162 }, { value: 170 }, { value: 180 }, { value: 187 }],
  },
  {
    title: 'Total Earnings',
    value: '12,840',
    change: 15.2,
    changeLabel: 'vs last period',
    iconName: 'CurrencyDollarIcon',
    accentColor: '#10B981',
    prefix: '$',
    sparklineData: [{ value: 8200 }, { value: 9100 }, { value: 8800 }, { value: 10200 }, { value: 11000 }, { value: 11900 }, { value: 12840 }],
  },
  {
    title: 'Avg. Rating',
    value: '4.87',
    change: 2.1,
    changeLabel: 'vs last period',
    iconName: 'StarIcon',
    accentColor: '#F59E0B',
    sparklineData: [{ value: 4.6 }, { value: 4.7 }, { value: 4.65 }, { value: 4.75 }, { value: 4.8 }, { value: 4.82 }, { value: 4.87 }],
  },
 
];

const earningsData: EarningsDataPoint[] = [
  { month: 'Aug', earnings: 7200, bookings: 112, forecast: 7500 },
  { month: 'Sep', earnings: 8400, bookings: 128, forecast: 8200 },
  { month: 'Oct', earnings: 9100, bookings: 140, forecast: 9000 },
  { month: 'Nov', earnings: 8600, bookings: 135, forecast: 9200 },
  { month: 'Dec', earnings: 10200, bookings: 158, forecast: 10000 },
  { month: 'Jan', earnings: 11000, bookings: 165, forecast: 10800 },
  { month: 'Feb', earnings: 11900, bookings: 178, forecast: 11500 },
  { month: 'Mar', earnings: 12840, bookings: 187, forecast: 12500 },
];

const bookingStatusData: BookingStatusData[] = [
  { name: 'Completed', value: 142, color: '#0D7C66' },
  { name: 'In Progress', value: 24, color: '#41B3A2' },
  { name: 'Pending', value: 14, color: '#F59E0B' },
  { name: 'Cancelled', value: 7, color: '#EF4444' },
];

const notificationsData: NotificationItem[] = [
  { id: '1', type: 'request', title: 'New Service Request', message: 'Emily R. requested home cleaning for Mar 10, 2026 at 10:00 AM', time: '2 min ago', read: false, actionLabel: 'View Request' },
  { id: '2', type: 'booking', title: 'Booking Confirmed', message: 'Your booking #BK-2847 with Marcus T. has been confirmed for Mar 8', time: '18 min ago', read: false, actionLabel: 'View Booking' },
  { id: '3', type: 'payment', title: 'Payment Received', message: '$480.00 payment processed for Project #PRJ-1192 — Plumbing Repair', time: '1 hr ago', read: false, actionLabel: 'View Receipt' },
  { id: '4', type: 'review', title: '5-Star Review Received', message: 'Jennifer L. left a glowing review: "Absolutely professional and thorough!"', time: '3 hr ago', read: true },
  { id: '5', type: 'alert', title: 'Response Rate Warning', message: 'Your response rate dropped to 94.2% — respond to pending requests to maintain your badge', time: '5 hr ago', read: true, actionLabel: 'View Requests' },
  { id: '6', type: 'payment', title: 'Withdrawal Processed', message: '$2,400.00 has been transferred to your bank account ending in 4821', time: '1 day ago', read: true },
  { id: '7', type: 'booking', title: 'Booking Rescheduled', message: 'David K. rescheduled booking #BK-2831 to Mar 12, 2026 at 2:00 PM', time: '1 day ago', read: true, actionLabel: 'Confirm' },
  { id: '8', type: 'alert', title: 'Profile Tip', message: 'Adding 3 more portfolio photos could increase your booking rate by up to 22%', time: '2 days ago', read: true },
];

const quickStats: QuickStatItem[] = [
  { label: 'Avg. Job Value', value: '$68.66', sub: '+$4.20 vs last month' },
  { label: 'Repeat Clients', value: '63%', sub: '118 of 187 bookings' },
  { label: 'Avg. Response Time', value: '14 min', sub: 'Top 5% of providers' },
  { label: 'Profile Views', value: '1,240', sub: '+18% this month' },
];

const dateRangeOptions = [
  { label: 'Last 7 days', value: '7d' },
  { label: 'Last 30 days', value: '30d' },
  { label: 'Last 3 months', value: '3m' },
  { label: 'Last 6 months', value: '6m' },
  { label: 'Last 12 months', value: '12m' },
];

const categoryOptions = [
  { label: 'All Services', value: 'all' },
  { label: 'Cleaning', value: 'cleaning' },
  { label: 'Plumbing', value: 'plumbing' },
  { label: 'Electrical', value: 'electrical' },
  { label: 'Tutoring', value: 'tutoring' },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function OverviewInteractive() {
  const [dateRange, setDateRange] = useState('30d');
  const [category, setCategory] = useState('all');
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => setIsExporting(false), 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Page content with top padding for fixed header */}
      <div className="pt-16 pb-20 md:pb-6">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-6 space-y-6">

          {/* ── Page Header & Controls ── */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-heading font-bold text-text-primary">Overview Dashboard</h1>
              <p className="text-sm font-caption text-text-secondary mt-0.5">
                Business intelligence summary &mdash; updated just now
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {/* Date Range */}
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="px-3 py-2 rounded-lg border border-border bg-card text-sm font-caption text-text-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:border-primary transition-all min-h-[40px]"
                aria-label="Select date range"
              >
                {dateRangeOptions.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>

              {/* Category Filter */}
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="px-3 py-2 rounded-lg border border-border bg-card text-sm font-caption text-text-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:border-primary transition-all min-h-[40px]"
                aria-label="Filter by service category"
              >
                {categoryOptions.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>

              {/* Auto Refresh Toggle */}
              <button
                onClick={() => setAutoRefresh((p) => !p)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-caption font-medium transition-all min-h-[40px] ${
                  autoRefresh
                    ? 'border-primary bg-primary/10 text-primary' :'border-border bg-card text-text-secondary hover:border-primary hover:text-primary'
                }`}
                aria-pressed={autoRefresh}
              >
                <span className={`w-2 h-2 rounded-full ${autoRefresh ? 'bg-success animate-pulse' : 'bg-muted-foreground'}`} />
                Auto-refresh
              </button>

              {/* Export */}
              <button
                onClick={handleExport}
                disabled={isExporting}
                className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-card text-sm font-caption text-text-secondary hover:border-primary hover:text-primary transition-all min-h-[40px] disabled:opacity-60"
              >
                <Icon name={isExporting ? 'ArrowPathIcon' : 'ArrowDownTrayIcon'} size={16} variant="outline" className={isExporting ? 'animate-spin' : ''} />
                {isExporting ? 'Exporting...' : 'Export'}
              </button>

              {/* Bookmark */}
              <button
                className="flex items-center justify-center w-10 h-10 rounded-lg border border-border bg-card text-text-secondary hover:border-primary hover:text-primary transition-all"
                aria-label="Bookmark this view"
              >
                <Icon name="BookmarkIcon" size={16} variant="outline" />
              </button>
            </div>
          </div>

          {/* ── KPI Cards ── */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {kpiData.map((kpi) => (
              <KPICard key={kpi.title} {...kpi} />
            ))}
          </div>

          {/* ── Quick Stats ── */}
          <QuickStats stats={quickStats} />

          {/* ── Main Content: Chart + Notifications ── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Earnings Chart — 8 cols */}
            <div className="lg:col-span-8 bg-card border border-border rounded-xl shadow-sm p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-base font-heading font-semibold text-text-primary">Earnings &amp; Booking Trends</h2>
                  <p className="text-xs font-caption text-text-secondary mt-0.5">Revenue vs booking volume with forecast overlay</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1 text-[11px] font-caption text-text-secondary">
                    <span className="w-3 h-3 rounded-sm bg-primary inline-block" /> Earnings
                  </span>
                  <span className="flex items-center gap-1 text-[11px] font-caption text-text-secondary">
                    <span className="w-3 h-3 rounded-sm bg-secondary inline-block opacity-60" /> Forecast
                  </span>
                  <span className="flex items-center gap-1 text-[11px] font-caption text-text-secondary">
                    <span className="w-3 h-3 rounded-full bg-accent inline-block" /> Bookings
                  </span>
                </div>
              </div>
              <EarningsChart data={earningsData} />
            </div>

            {/* Notification Feed — 4 cols */}
            <div className="lg:col-span-4 min-h-[400px]">
              <NotificationFeed notifications={notificationsData} />
            </div>
          </div>

          {/* ── Booking Status Chart ── */}
          <div className="bg-card border border-border rounded-xl shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-base font-heading font-semibold text-text-primary">Booking Status Distribution</h2>
                <p className="text-xs font-caption text-text-secondary mt-0.5">Current booking pipeline status</p>
              </div>
            </div>
            <BookingStatusChart data={bookingStatusData} />
          </div>

          {/* ── TRANSACTION HISTORY ── */}
          <TransactionTable transactions={mockTransactions} />

          {/* ── Footer ── */}
          <footer className="text-center py-4 border-t border-border">
            <p className="text-xs font-caption text-muted-foreground">
              &copy; {new Date().getFullYear()} ProMetrics &mdash; All rights reserved. Data refreshes every 5 minutes.
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
}


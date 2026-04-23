import type {
  AdminTaskerStatus,
  AdminVerificationStatus,
} from "@/app/types/types";

export type DashboardStatus =
  | 'pending'
  | 'active'
  | 'completed'
  | 'cancelled'
  | 'disputed';

export const statusVariant: Record<string, 'secondary' | 'default' | 'destructive' | 'outline'> = {
  pending: 'secondary',
  active: 'default',
  completed: 'outline',
  cancelled: 'secondary',
  disputed: 'destructive',
};

export const earningsData = [
  { month: 'Jan', revenue: 82000 },
  { month: 'Feb', revenue: 91000 },
  { month: 'Mar', revenue: 87500 },
  { month: 'Apr', revenue: 102000 },
  { month: 'May', revenue: 118000 },
  { month: 'Jun', revenue: 126500 },
  { month: 'Jul', revenue: 134000 },
  { month: 'Aug', revenue: 141000 },
  { month: 'Sep', revenue: 137500 },
  { month: 'Oct', revenue: 149000 },
  { month: 'Nov', revenue: 158500 },
  { month: 'Dec', revenue: 171000 },
];

export const bookingActivityData = [
  { month: 'Jan', bookings: 108 },
  { month: 'Feb', bookings: 124 },
  { month: 'Mar', bookings: 119 },
  { month: 'Apr', bookings: 138 },
  { month: 'May', bookings: 154 },
  { month: 'Jun', bookings: 161 },
  { month: 'Jul', bookings: 173 },
  { month: 'Aug', bookings: 181 },
  { month: 'Sep', bookings: 176 },
  { month: 'Oct', bookings: 189 },
  { month: 'Nov', bookings: 198 },
  { month: 'Dec', bookings: 214 },
];

export const recentBookings = [
  {
    id: 'BK-8931',
    client: 'Emma Wilson',
    tasker: 'Marcus Johnson',
    service: 'Plumbing',
    status: 'active',
    price: '$120',
    date: '2026-04-04',
  },
  {
    id: 'BK-8930',
    client: 'Liam Chen',
    tasker: 'Sarah Chen',
    service: 'Cleaning',
    status: 'completed',
    price: '$85',
    date: '2026-04-03',
  },
  {
    id: 'BK-8929',
    client: 'Olivia Brown',
    tasker: 'David Park',
    service: 'Moving',
    status: 'pending',
    price: '$250',
    date: '2026-04-03',
  },
  {
    id: 'BK-8928',
    client: 'Noah Davis',
    tasker: 'Amelia Torres',
    service: 'Painting',
    status: 'disputed',
    price: '$380',
    date: '2026-04-02',
  },
];

export const recentPayments = [
  {
    id: 'PM-5521',
    client: 'Emma Wilson',
    tasker: 'Marcus Johnson',
    amount: '$120',
    status: 'completed',
    date: '2026-04-04',
  },
  {
    id: 'PM-5520',
    client: 'Liam Chen',
    tasker: 'Sarah Chen',
    amount: '$85',
    status: 'completed',
    date: '2026-04-03',
  },
  {
    id: 'PM-5519',
    client: 'Olivia Brown',
    tasker: 'David Park',
    amount: '$250',
    status: 'pending',
    date: '2026-04-03',
  },
  {
    id: 'PM-5518',
    client: 'Noah Davis',
    tasker: 'Amelia Torres',
    amount: '$380',
    status: 'disputed',
    date: '2026-04-02',
  },
];

export const statusColors: Record<AdminTaskerStatus, string> = {
  active:
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  suspended:
    "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  pending:
    "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
};

export const verificationColors: Record<AdminVerificationStatus, string> = {
  verified:
    "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400",
  unverified:
    "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
  pending:
    "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  rejected:
    "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

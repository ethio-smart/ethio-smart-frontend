'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Image from 'next/image';


interface Booking {
  id: string;
  client: string;
  clientAvatar: string;
  clientAlt: string;
  service: string;
  date: string;
  amount: number;
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
}

const bookings: Booking[] = [
{
  id: 'BK-1042',
  client: 'Sarah Mitchell',
  clientAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1e3a1efe8-1772875264718.png",
  clientAlt: 'Professional woman with brown hair smiling in office setting',
  service: 'Deep Cleaning',
  date: 'Mar 12, 2:00 PM',
  amount: 185,
  status: 'in_progress'
},
{
  id: 'BK-1041',
  client: 'James Thornton',
  clientAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1342045fa-1772402900596.png",
  clientAlt: 'Middle-aged man with glasses in casual blue shirt outdoors',
  service: 'Furniture Assembly',
  date: 'Mar 12, 4:30 PM',
  amount: 120,
  status: 'confirmed'
},
{
  id: 'BK-1040',
  client: 'Priya Sharma',
  clientAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1bd20bd68-1772779057407.png",
  clientAlt: 'Young South Asian woman with dark hair in professional attire',
  service: 'Moving Help',
  date: 'Mar 13, 9:00 AM',
  amount: 340,
  status: 'confirmed'
},
{
  id: 'BK-1039',
  client: 'David Chen',
  clientAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1d8aed28d-1763294966598.png",
  clientAlt: 'Asian man in white shirt with friendly smile in bright room',
  service: 'Handyman Repairs',
  date: 'Mar 13, 1:00 PM',
  amount: 95,
  status: 'pending'
},
{
  id: 'BK-1038',
  client: 'Emma Rodriguez',
  clientAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1f32d47cd-1773029308569.png",
  clientAlt: 'Hispanic woman with curly hair smiling warmly outdoors',
  service: 'Deep Cleaning',
  date: 'Mar 14, 10:00 AM',
  amount: 210,
  status: 'pending'
},
{
  id: 'BK-1037',
  client: 'Michael Foster',
  clientAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_116ebc879-1763295731902.png",
  clientAlt: 'Caucasian man with short hair in navy blazer against white background',
  service: 'Lawn Care',
  date: 'Mar 11, 11:00 AM',
  amount: 75,
  status: 'completed'
}];


const statusConfig: Record<Booking['status'], {label: string;color: string;bg: string;icon: string;}> = {
  pending: { label: 'Pending', color: 'text-amber-700', bg: 'bg-amber-50', icon: 'ClockIcon' },
  confirmed: { label: 'Confirmed', color: 'text-blue-700', bg: 'bg-blue-50', icon: 'CheckIcon' },
  in_progress: { label: 'In Progress', color: 'text-emerald-700', bg: 'bg-emerald-50', icon: 'PlayIcon' },
  completed: { label: 'Completed', color: 'text-gray-600', bg: 'bg-gray-100', icon: 'CheckCircleIcon' },
  cancelled: { label: 'Cancelled', color: 'text-red-600', bg: 'bg-red-50', icon: 'XCircleIcon' }
};

export default function BookingPipeline() {
  const [isHydrated, setIsHydrated] = useState(false);
  const [filter, setFilter] = useState<'all' | Booking['status']>('all');

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const filtered = filter === 'all' ? bookings : bookings.filter((b) => b.status === filter);

  if (!isHydrated) {
    return (
      <div className="bg-card rounded-xl border border-border p-5 animate-pulse">
        <div className="h-6 bg-muted rounded w-40 mb-4" />
        {[1, 2, 3, 4].map((i) =>
        <div key={i} className="h-16 bg-muted rounded mb-3" />
        )}
      </div>);

  }

  return (
    <div className="bg-card rounded-xl border border-border p-5 flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-base font-semibold text-foreground font-heading">Booking Pipeline</h2>
          <p className="text-xs text-muted-foreground mt-0.5">{bookings.length} total bookings</p>
        </div>
        <Select value={filter} onValueChange={(v) => setFilter(v as any)}>
          <SelectTrigger
            className="h-8 text-xs border border-border rounded-md px-2 py-1.5 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            aria-label="Filter bookings by status"
          >
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="confirmed">Confirmed</SelectItem>
            <SelectItem value="in_progress">In Progress</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-3 flex-1 overflow-y-auto max-h-[200px] pr-1">
        {filtered.map((booking) => {
          const sc = statusConfig[booking.status];
          return (
            <div
              key={booking.id}
              className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-standard group">
              
              <div className="w-9 h-9 rounded-full overflow-hidden shrink-0 bg-muted">
                {/* <Image
                  src={booking.clientAvatar}
                  alt={booking.clientAlt}
                  width={36}
                  height={36}
                  className="w-full h-full object-cover" /> */}
                
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-medium text-foreground truncate">{booking.client}</p>
                  <span className="text-sm font-semibold text-emerald-600 shrink-0">
                    ${booking.amount}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs text-muted-foreground truncate">{booking.service}</span>
                  <span className="text-muted-foreground">·</span>
                  <span className="text-xs text-muted-foreground shrink-0">{booking.date}</span>
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
        <button className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-medium hover:bg-secondary transition-standard press-effect">
          <Icon name="PlusIcon" size={14} variant="outline" />
          New Booking
        </button>
        <button className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-border text-foreground text-xs font-medium hover:bg-muted transition-standard press-effect">
          <Icon name="ArrowRightIcon" size={14} variant="outline" />
          View All
        </button>
      </div>
    </div>);

}


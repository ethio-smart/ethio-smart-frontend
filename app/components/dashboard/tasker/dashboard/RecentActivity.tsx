'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

interface ActivityItem {
  id: string;
  type: 'booking' | 'payment' | 'review' | 'message' | 'cancellation';
  title: string;
  description: string;
  time: string;
  amount?: string;
  icon: string;
  iconBg: string;
  iconColor: string;
}

const activities: ActivityItem[] = [
  {
    id: '1',
    type: 'payment',
    title: 'Payment Received',
    description: 'Deep Cleaning - Sarah Mitchell',
    time: '2 min ago',
    amount: '+$185.00',
    icon: 'BanknotesIcon',
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
  },
  {
    id: '2',
    type: 'review',
    title: 'New 5-Star Review',
    description: '"Absolutely fantastic work!" — James T.',
    time: '18 min ago',
    icon: 'StarIcon',
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-600',
  },
  {
    id: '3',
    type: 'booking',
    title: 'New Booking Request',
    description: 'Moving Help - Priya Sharma · Mar 13',
    time: '45 min ago',
    amount: '$340.00',
    icon: 'CalendarDaysIcon',
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-600',
  },
  {
    id: '4',
    type: 'message',
    title: 'Client Message',
    description: 'David Chen sent a message about his booking',
    time: '1 hr ago',
    icon: 'ChatBubbleLeftIcon',
    iconBg: 'bg-purple-50',
    iconColor: 'text-purple-600',
  },
  {
    id: '5',
    type: 'payment',
    title: 'Payment Received',
    description: 'Lawn Care - Michael Foster',
    time: '3 hr ago',
    amount: '+$75.00',
    icon: 'BanknotesIcon',
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
  },
  {
    id: '6',
    type: 'booking',
    title: 'Booking Confirmed',
    description: 'Furniture Assembly - James Thornton',
    time: '5 hr ago',
    amount: '$120.00',
    icon: 'CheckCircleIcon',
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
  },
];

export default function RecentActivity() {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return (
      <div className="bg-card rounded-xl border border-border p-5 animate-pulse">
        <div className="h-6 bg-muted rounded w-36 mb-4" />
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-12 bg-muted rounded mb-3" />
        ))}
      </div>
    );
  }

  return (
    <div className="bg-card rounded-xl border border-border p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-base font-semibold text-foreground font-heading">Recent Activity</h2>
          <p className="text-xs text-muted-foreground mt-0.5">Live feed of your business events</p>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs text-muted-foreground">Live</span>
        </div>
      </div>

      <div className="space-y-1">
        {activities.map((activity, index) => (
          <div key={activity.id}>
            <div className="flex items-start gap-3 py-2.5 hover:bg-muted/50 rounded-lg px-2 -mx-2 transition-standard">
              <div className={`w-8 h-8 rounded-lg ${activity.iconBg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                <Icon name={activity.icon as any} size={15} variant="solid" className={activity.iconColor} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-medium text-foreground truncate">{activity.title}</p>
                  {activity.amount && (
                    <span className={`text-xs font-semibold flex-shrink-0 ${activity.amount.startsWith('+') ? 'text-emerald-600' : 'text-foreground'}`}>
                      {activity.amount}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <p className="text-xs text-muted-foreground truncate">{activity.description}</p>
                  <span className="text-xs text-muted-foreground flex-shrink-0">· {activity.time}</span>
                </div>
              </div>
            </div>
            {index < activities.length - 1 && <div className="h-px bg-border mx-2" />}
          </div>
        ))}
      </div>
    </div>
  );
}


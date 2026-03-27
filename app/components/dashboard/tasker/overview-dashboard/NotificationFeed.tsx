'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface NotificationItem {
  id: string;
  type: 'booking' | 'payment' | 'review' | 'alert' | 'request';
  title: string;
  message: string;
  time: string;
  read: boolean;
  actionLabel?: string;
}

interface NotificationFeedProps {
  notifications: NotificationItem[];
}

const typeConfig: Record<NotificationItem['type'], { icon: string; color: string; bg: string }> = {
  booking: { icon: 'CalendarIcon', color: 'text-primary', bg: 'bg-primary/10' },
  payment: { icon: 'BanknotesIcon', color: 'text-success', bg: 'bg-success/10' },
  review: { icon: 'StarIcon', color: 'text-accent', bg: 'bg-accent/10' },
  alert: { icon: 'ExclamationTriangleIcon', color: 'text-warning', bg: 'bg-warning/10' },
  request: { icon: 'InboxArrowDownIcon', color: 'text-secondary', bg: 'bg-secondary/10' },
};

export default function NotificationFeed({ notifications: initial }: NotificationFeedProps) {
  const [items, setItems] = useState<NotificationItem[]>(initial);
  const [filter, setFilter] = useState<'all' | NotificationItem['type']>('all');

  const filtered = filter === 'all' ? items : items.filter((n) => n.type === filter);
  const unread = items.filter((n) => !n.read).length;

  const markRead = (id: string) => {
    setItems((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllRead = () => {
    setItems((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <div className="bg-card border border-border rounded-xl shadow-sm flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <div className="flex items-center gap-2">
          <span className="font-heading font-semibold text-sm text-text-primary">Live Alerts</span>
          {unread > 0 && (
            <span className="w-5 h-5 rounded-full bg-error text-error-foreground text-[10px] font-caption font-bold flex items-center justify-center">
              {unread}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-success animate-pulse" title="Live connection" />
          {unread > 0 && (
            <button
              onClick={markAllRead}
              className="text-xs font-caption text-primary hover:text-primary/80 transition-colors"
            >
              Mark all read
            </button>
          )}
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex items-center gap-1 px-3 py-2 border-b border-border overflow-x-auto scrollbar-hide">
        {(['all', 'booking', 'payment', 'review', 'alert', 'request'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-2.5 py-1 rounded-md text-[11px] font-caption font-medium whitespace-nowrap transition-all duration-200 ${
              filter === f
                ? 'bg-primary text-primary-foreground'
                : 'text-text-secondary hover:bg-muted hover:text-text-primary'
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Feed */}
      <div className="flex-1 overflow-y-auto divide-y divide-border">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-text-secondary">
            <Icon name="BellSlashIcon" size={32} variant="outline" className="mb-2 opacity-40" />
            <p className="text-xs font-caption">No notifications</p>
          </div>
        ) : (
          filtered.map((notif) => {
            const cfg = typeConfig[notif.type];
            return (
              <div
                key={notif.id}
                className={`flex items-start gap-3 px-4 py-3 cursor-pointer hover:bg-muted transition-colors duration-200 ${
                  !notif.read ? 'bg-primary/5' : ''
                }`}
                onClick={() => markRead(notif.id)}
              >
                <span className={`mt-0.5 w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${cfg.bg}`}>
                  <Icon name={cfg.icon as any} size={14} variant="outline" className={cfg.color} />
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-1">
                    <p className={`text-xs font-caption font-semibold leading-tight ${!notif.read ? 'text-text-primary' : 'text-text-secondary'}`}>
                      {notif.title}
                    </p>
                    {!notif.read && <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-1" />}
                  </div>
                  <p className="text-[11px] font-caption text-text-secondary mt-0.5 line-clamp-2">{notif.message}</p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-[10px] font-caption text-muted-foreground">{notif.time}</span>
                    {notif.actionLabel && (
                      <button className="text-[10px] font-caption text-primary font-medium hover:underline">
                        {notif.actionLabel}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Footer */}
      <div className="px-4 py-2.5 border-t border-border">
        <button className="w-full text-center text-xs font-caption text-primary hover:text-primary/80 transition-colors">
          View all notifications
        </button>
      </div>
    </div>
  );
}


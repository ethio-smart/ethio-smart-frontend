"use client";

import { CalendarClock, ShieldCheck, Sparkles } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import type { AdminProfile } from '@/app/types/types';

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString(undefined, {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  });

export default function AdminProfileHighlights({ profile }: { profile: AdminProfile }) {
  const cards = [
    {
      title: 'Member Since',
      value: formatDate(profile.createdAt),
      helper: 'Administrator onboarding date',
      icon: CalendarClock,
      iconClass: 'bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300',
    },
    {
      title: 'Verification',
      value: profile.isVerified ? 'Verified' : 'Pending',
      helper: profile.isVerified ? 'Identity and account checks completed' : 'Complete verification soon',
      icon: ShieldCheck,
      iconClass: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300',
    },
    {
      title: 'Role Access',
      value: profile.role.replaceAll('_', ' '),
      helper: 'Controls your dashboard scope and actions',
      icon: Sparkles,
      iconClass: 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300',
    },
  ];

  return (
    <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      {cards.map((card) => (
        <Card key={card.title} className="overflow-hidden border-border">
          <CardContent className="flex items-start gap-3 p-5">
            <div className={`rounded-lg p-2 ${card.iconClass}`}>
              <card.icon className="size-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{card.title}</p>
              <p className="mt-1 text-base font-semibold text-foreground">{card.value}</p>
              <p className="mt-1 text-xs text-muted-foreground">{card.helper}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </section>
  );
}

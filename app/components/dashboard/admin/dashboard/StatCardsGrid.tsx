"use client";

import {
  CalendarCheck2,
  CircleDollarSign,
  Dot,
  Clock3,
  ListChecks,
  Users,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useAppSelector } from "@/app/hooks/hooks";

type StatCard = {
  label: string;
  value: string;
  description: string;
  icon: React.ReactNode;
};

export default function StatCardsGrid() {
  const { overview } = useAppSelector((state) => state.adminAnalytics);

  const totals = overview?.totals;
  const pendingApprovals = Math.max(
    (totals?.totalTaskers ?? 0) - (totals?.approvedTaskers ?? 0),
    0,
  );

  const statCards: StatCard[] = [
    {
      label: "Total Bookings",
      value: (totals?.totalBookings ?? 0).toLocaleString(),
      description: "All bookings in the platform",
      icon: <ListChecks className="size-5" />,
    },
    {
      label: "Active Bookings",
      value: (totals?.activeBookings ?? 0).toLocaleString(),
      description: "Bookings currently in progress",
      icon: <CalendarCheck2 className="size-5" />,
    },
    {
      label: "Total Earnings",
      value: `${(totals?.earnings ?? 0).toLocaleString()} ETB`,
      description: "Total platform earnings",
      icon: <CircleDollarSign className="size-5" />,
    },
    {
      label: "Total Requests",
      value: (totals?.totalRequests ?? 0).toLocaleString(),
      description: "Service requests created",
      icon: <Clock3 className="size-5" />,
    },
    {
      label: "Total Taskers",
      value: (totals?.totalTaskers ?? 0).toLocaleString(),
      description: "Taskers on the platform",
      icon: <Users className="size-5" />,
    },
    {
      label: "Pending Approvals",
      value: pendingApprovals.toLocaleString(),
      description: "Taskers awaiting admin approval",
      icon: <Clock3 className="size-5" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {statCards.map((c, index) => (
        <Card
          key={c.label}
          className="group relative overflow-hidden border-border/80 bg-card/95 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md"
        >
          <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-linear-to-r from-primary/20 via-primary/60 to-primary/20 opacity-70" />
          <CardContent className="p-5">
            <div className="mb-4 flex items-start justify-between">
              <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                {c.icon}
              </div>
              <span className="text-xs text-muted-foreground">#{index + 1}</span>
            </div>
            <p className="mb-1 text-2xl leading-none font-semibold text-foreground">
              {c.value}
            </p>
            <p className="text-sm font-medium text-foreground">{c.label}</p>
            <p className="mt-1 flex items-start gap-1 text-xs text-muted-foreground">
              <Dot className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              {c.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}


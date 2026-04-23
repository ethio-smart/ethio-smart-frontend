"use client";

import {
  CalendarCheck2,
  CircleDollarSign,
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
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
      {statCards.map((c) => (
        <Card key={c.label} className="hover:shadow-sm transition-shadow">
          <CardContent className="p-5">
            <div className="flex items-start justify-between mb-3">
              <div className="size-9 rounded-md bg-primary/10 text-primary flex items-center justify-center">
                {c.icon}
              </div>
            </div>
            <p className="text-2xl font-semibold text-foreground leading-none mb-1">
              {c.value}
            </p>
            <p className="text-sm font-medium text-foreground">{c.label}</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {c.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}


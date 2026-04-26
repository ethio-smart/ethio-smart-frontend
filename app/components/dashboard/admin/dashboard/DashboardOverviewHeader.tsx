"use client";

import { useMemo } from "react";
import { CalendarRange } from "lucide-react";
import { Badge } from "@/components/ui/badge";

import { useAppSelector } from "@/app/hooks/hooks";

export default function DashboardOverviewHeader() {
  const { weekly } = useAppSelector((state) => state.adminAnalytics);

  const periodText = useMemo(() => {
    if (!weekly?.periodStart || !weekly?.periodEnd) {
      return "Live platform performance";
    }

    const start = new Date(weekly.periodStart).toLocaleDateString(undefined, {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
    const end = new Date(weekly.periodEnd).toLocaleDateString(undefined, {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });

    return `Weekly period: ${start} - ${end}`;
  }, [weekly?.periodEnd, weekly?.periodStart]);

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center gap-2">
        <Badge className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-secondary hover:bg-primary/10">
          Admin Analytics
        </Badge>
      </div>
      <h1 className="font-heading text-2xl font-semibold tracking-tight text-foreground md:text-[30px]">
        Dashboard Overview
      </h1>
      <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
        <CalendarRange className="h-4 w-4" />
        {periodText}
      </p>
    </div>
  );
}

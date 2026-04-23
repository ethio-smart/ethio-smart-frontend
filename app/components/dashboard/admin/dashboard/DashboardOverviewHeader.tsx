"use client";

import { useMemo } from "react";

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
    <div className="mb-6">
      <h1 className="font-heading font-semibold text-[22px] text-foreground">
        Dashboard Overview
      </h1>
      <p className="mt-0.5 text-[14px] font-caption text-muted-foreground">
        {periodText}
      </p>
    </div>
  );
}

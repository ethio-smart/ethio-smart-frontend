"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { BookingStatus } from "@/app/(dashboard)/admin/booking-management/data";
import { statusMeta } from "@/app/(dashboard)/admin/booking-management/data";

type StatusKey = "all" | BookingStatus;

export default function BookingStatusFilters({
  value,
  onChange,
  counts,
}: {
  value: StatusKey;
  onChange: (v: StatusKey) => void;
  counts: Record<StatusKey, number>;
}) {
  const allStatuses: StatusKey[] = [
    "all",
    "pending",
    "active",
    "completed",
    "cancelled",
    "disputed",
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {allStatuses.map((s) => {
        const active = value === s;
        const label = s === "all" ? "All" : statusMeta[s].label;
        const count = counts[s] ?? 0;

        return (
          <Button
            key={s}
            type="button"
            variant={active ? "default" : "outline"}
            size="sm"
            onClick={() => onChange(s)}
            className="rounded-full"
          >
            <span className="mr-2">{label}</span>
            <Badge variant={active ? "secondary" : "outline"}>{count}</Badge>
          </Button>
        );
      })}
    </div>
  );
}


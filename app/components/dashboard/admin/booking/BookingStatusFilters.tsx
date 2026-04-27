"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Booking } from "@/app/types/types";

type StatusKey = "all" | Booking["status"];

const statusLabelMap: Record<Booking["status"], string> = {
  AWAITING_PAYMENT: "Awaiting Payment",
  CONFIRMED: "Confirmed",
  IN_PROGRESS: "In Progress",
  COMPLETED: "Completed",
  PAYED_OUT: "Payed Out",
  CANCELLED: "Cancelled",
  DISPUTED: "Disputed",
};

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
    "AWAITING_PAYMENT",
    "CONFIRMED",
    "IN_PROGRESS",
    "COMPLETED",
    "PAYED_OUT",
    "CANCELLED",
    "DISPUTED",
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {allStatuses.map((s) => {
        const active = value === s;
        const label = s === "all" ? "All" : statusLabelMap[s];
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


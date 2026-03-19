"use client";

import * as React from "react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type BookingStatus =
  | "Requests"
  | "Accepted"
  | "In Progress"
  | "Completed"
  | "Cancelled"
  | "Expired";

const statusBadgeConfig: Record<BookingStatus, string> = {
  Requests: "bg-amber-50 text-amber-700",
  Accepted: "bg-blue-50 text-blue-700",
  "In Progress": "bg-indigo-50 text-indigo-700",
  Completed: "bg-emerald-50 text-emerald-700",
  Cancelled: "bg-red-50 text-red-700",
  Expired: "bg-gray-100 text-gray-600",
};

export type StatusBadgeProps = {
  status: BookingStatus;
  className?: string;
};

export const StatusBadge = React.memo(({ status, className }: StatusBadgeProps) => {
  return (
    <Badge
      variant="secondary"
      className={cn("px-2.5 py-1 text-xs font-medium", statusBadgeConfig[status], className)}
    >
      {status}
    </Badge>
  );
});
StatusBadge.displayName = "StatusBadge";


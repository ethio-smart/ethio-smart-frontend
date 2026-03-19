"use client";

import * as React from "react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type PaymentStatus = "Pending" | "Paid" | "Refunded" | "Failed";

const paymentBadgeConfig: Record<PaymentStatus, string> = {
  Pending: "bg-amber-50 text-amber-700",
  Paid: "bg-emerald-50 text-emerald-700",
  Refunded: "bg-blue-50 text-blue-700",
  Failed: "bg-red-50 text-red-700",
};

export type PaymentBadgeProps = {
  status: PaymentStatus;
  className?: string;
};

export const PaymentBadge = React.memo(({ status, className }: PaymentBadgeProps) => {
  return (
    <Badge
      variant="secondary"
      className={cn("px-2.5 py-1 text-xs font-medium", paymentBadgeConfig[status], className)}
    >
      {status}
    </Badge>
  );
});
PaymentBadge.displayName = "PaymentBadge";


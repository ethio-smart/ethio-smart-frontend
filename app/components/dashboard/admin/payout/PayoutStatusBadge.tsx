"use client";

import { Badge } from "@/components/ui/badge";
import type { PayoutStatus } from "@/app/types/types";
import { statusConfig } from "../data";

export default function PayoutStatusBadge({
  status,
}: {
  status: PayoutStatus;
}) {
  const cfg = statusConfig[status];

  return (
    <Badge
      variant="default"
      className={`px-2.5 py-0.5 text-xs font-medium ${cfg.className}`}
    >
      {cfg.label}
    </Badge>
  );
}


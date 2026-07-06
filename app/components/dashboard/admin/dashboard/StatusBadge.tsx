"use client";

import { Badge } from "@/components/ui/badge";
import { statusVariant } from "@/app/components/dashboard/admin/data";

export default function StatusBadge({ status }: { status: string }) {
  const variant = statusVariant[status] ?? "secondary";
  return <Badge variant={variant}>{status}</Badge>;
}


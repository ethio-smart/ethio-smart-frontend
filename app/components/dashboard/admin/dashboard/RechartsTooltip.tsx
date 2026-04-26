"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function RechartsTooltip({
  active,
  payload,
  label,
  prefix = "",
}: {
  active?: boolean;
  payload?: unknown[];
  label?: string;
  prefix?: string;
}) {
  if (!active || !payload?.length) return null;
  const value = (payload[0] as { value?: unknown })?.value;

  return (
    <Card
      className={cn(
        "gap-0 rounded-md border px-3 py-2 shadow-sm",
        "text-card-foreground"
      )}
    >
      <p className="mb-1 text-xs text-muted-foreground">{label}</p>
      <p className="text-sm font-semibold text-foreground">
        {prefix}
        {typeof value === "number" && prefix === "$"
          ? value.toLocaleString()
          : String(value)}
      </p>
    </Card>
  );
}

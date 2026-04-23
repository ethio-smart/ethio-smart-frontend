"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Download, Users, Clock, RefreshCw } from "lucide-react";
import type { Payout } from "@/app/types/types";

export default function PayoutHeaderAndStats({
  pendingCount,
  totalPendingAmount,
  totalApprovedAmount,
  processingCount,
  payouts,
  onExport,
}: {
  pendingCount: number;
  totalPendingAmount: number;
  totalApprovedAmount: number;
  processingCount: number;
  payouts: Payout[];
  onExport?: () => void;
}) {
  const stats = [
    {
      label: "Pending Requests",
      value: pendingCount.toString(),
      sub: `$${totalPendingAmount.toLocaleString("en-US", {
        minimumFractionDigits: 2,
      })} total`,
      icon: Clock,
      color: "text-amber-600",
      bg: "bg-amber-100 dark:bg-amber-900/30",
    },
    {
      label: "Approved (This Month)",
      value: `$${totalApprovedAmount.toLocaleString("en-US", {
        minimumFractionDigits: 2,
      })}`,
      sub: `${payouts.filter((p) => p.status === "approved").length} payouts`,
      icon: Download,
      color: "text-emerald-600",
      bg: "bg-emerald-100 dark:bg-emerald-900/30",
    },
    {
      label: "Processing",
      value: processingCount.toString(),
      sub: "In transit",
      icon: RefreshCw,
      color: "text-blue-600",
      bg: "bg-blue-100 dark:bg-blue-900/30",
    },
    {
      label: "Total Taskers",
      value: payouts.length.toString(),
      sub: "With payout requests",
      icon: Users,
      color: "text-primary",
      bg: "bg-primary/10",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-heading font-semibold text-foreground">
            Payout Administration
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Review and process tasker payout requests
          </p>
        </div>
        <div className="flex items-center gap-2">
          {pendingCount > 0 && (
            <span className="inline-flex items-center gap-1.5 h-9 px-3 text-sm bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 rounded-lg font-medium">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              {pendingCount} pending review
            </span>
          )}
          <Button
            type="button"
            size="sm"
            onClick={onExport}
            className="h-9 px-4"
          >
            <Download className="mr-2 size-4" aria-hidden />
            Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Card key={s.label} className="shadow-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm text-muted-foreground">{s.label}</p>
                <div
                  className={`w-8 h-8 rounded-lg ${s.bg} flex items-center justify-center`}
                >
                  <s.icon className={`size-4 ${s.color}`} aria-hidden />
                </div>
              </div>
              <p className="text-xl font-semibold text-foreground font-data">
                {s.value}
              </p>
              <p className="text-xs text-muted-foreground mt-1">{s.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}


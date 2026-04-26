"use client";

import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, CheckCircle2, Scale, ShieldAlert, Wallet } from "lucide-react";

type DisputeStatsProps = {
  stats: {
    total: number;
    open: number;
    resolved: number;
    rejected: number;
    partialRefunds: number;
  };
};

export default function DisputeStats({ stats }: DisputeStatsProps) {
  const items = [
    { label: "Total disputes", value: stats.total, icon: Scale, accent: "bg-primary/10 text-primary" },
    { label: "Open", value: stats.open, icon: AlertCircle, accent: "bg-amber-50 text-amber-600" },
    { label: "Resolved", value: stats.resolved, icon: CheckCircle2, accent: "bg-emerald-50 text-emerald-600" },
    { label: "Rejected", value: stats.rejected, icon: ShieldAlert, accent: "bg-red-50 text-red-600" },
    { label: "Partial refunds", value: stats.partialRefunds, icon: Wallet, accent: "bg-sky-50 text-sky-600" },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
      {items.map((item) => (
        <Card key={item.label} className="shadow-sm">
          <CardContent className="flex items-center justify-between p-4">
            <div>
              <p className="text-sm text-muted-foreground">{item.label}</p>
              <p className="text-xl font-bold text-foreground">{item.value}</p>
            </div>
            <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${item.accent}`}>
              <item.icon className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
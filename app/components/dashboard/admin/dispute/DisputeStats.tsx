"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Scale, AlertCircle, CheckCircle } from "lucide-react";

export default function DisputeStats({ stats }: any) {
  const items = [
    { label: "Total", value: stats.total, icon: Scale },
    { label: "Open", value: stats.open, icon: AlertCircle },
    { label: "Resolved", value: stats.resolved, icon: CheckCircle },
  ];

  return (
    <div className="grid grid-cols-3 gap-4">
      {items.map((item) => (
        <Card key={item.label}>
          <CardContent className="p-4 flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">{item.label}</p>
              <p className="text-xl font-bold">{item.value}</p>
            </div>
            <item.icon className="w-5 h-5 text-muted-foreground" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
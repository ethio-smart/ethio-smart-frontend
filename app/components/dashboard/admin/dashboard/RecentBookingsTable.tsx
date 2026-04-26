"use client";

import { Activity, CalendarClock, RefreshCw } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import { fetchAdminAnalyticsWeeklySeries } from "@/app/store/slices/adminAnalyticsSlice";
import type { AdminAnalyticsSeriesItem } from "@/app/types/types";

const formatCompact = (value: number) =>
  new Intl.NumberFormat(undefined, { notation: "compact", maximumFractionDigits: 1 }).format(
    Number(value ?? 0),
  );

const statusTone = (active: number, total: number) => {
  if (total <= 0) return "secondary" as const;
  const ratio = active / total;
  if (ratio >= 0.6) return "default" as const;
  if (ratio >= 0.3) return "secondary" as const;
  return "outline" as const;
};

export default function RecentBookingsTable() {
  const dispatch = useAppDispatch();
  const { weeklySeries, loadingWeeklySeries } = useAppSelector(
    (state) => state.adminAnalytics,
  );

  const rows: AdminAnalyticsSeriesItem[] = weeklySeries?.data ?? [];
  const totalBookings = rows.reduce((sum, row) => sum + Number(row.totalBookings ?? 0), 0);
  const totalEarnings = rows.reduce((sum, row) => sum + Number(row.earnings ?? 0), 0);
  const avgActiveRate =
    rows.length > 0
      ? Math.round(
          (rows.reduce(
            (sum, row) =>
              sum + (row.totalBookings > 0 ? row.activeBookings / row.totalBookings : 0),
            0,
          ) /
            rows.length) *
            100,
        )
      : 0;

  return (
    <Card className="overflow-hidden rounded-3xl border border-border shadow-sm">
      <CardHeader className="space-y-4 border-b border-border bg-card px-5 py-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <CardTitle className="text-base font-semibold">Weekly Booking Intelligence</CardTitle>
            <p className="mt-1 text-xs text-muted-foreground">
              Period-over-period booking, activity, and earnings snapshot
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="rounded-xl"
            onClick={() => dispatch(fetchAdminAnalyticsWeeklySeries(8))}
            disabled={loadingWeeklySeries}
          >
            <RefreshCw className={`mr-2 h-3.5 w-3.5 ${loadingWeeklySeries ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>

        <div className="grid gap-2 sm:grid-cols-3">
          <div className="rounded-xl border border-border bg-muted/20 px-3 py-2.5">
            <p className="text-[11px] uppercase tracking-wide text-muted-foreground">Total bookings</p>
            <p className="mt-1 text-sm font-semibold text-foreground">{formatCompact(totalBookings)}</p>
          </div>
          <div className="rounded-xl border border-border bg-muted/20 px-3 py-2.5">
            <p className="text-[11px] uppercase tracking-wide text-muted-foreground">Total earnings</p>
            <p className="mt-1 text-sm font-semibold text-foreground">{formatCompact(totalEarnings)} ETB</p>
          </div>
          <div className="rounded-xl border border-border bg-muted/20 px-3 py-2.5">
            <p className="text-[11px] uppercase tracking-wide text-muted-foreground">Avg active rate</p>
            <p className="mt-1 text-sm font-semibold text-foreground">{avgActiveRate}%</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/30 hover:bg-muted/30">
              {[
                "Period",
                "Bookings",
                "Active",
                "Requests",
                "Taskers",
                "Earnings",
              ].map((h) => (
                <TableHead key={h} className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                  {h}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.label} className="transition-colors hover:bg-muted/20">
                <TableCell className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <CalendarClock className="h-3.5 w-3.5" />
                    </span>
                    <span className="font-medium text-foreground">{row.label}</span>
                  </div>
                </TableCell>
                <TableCell className="px-4 py-3 font-medium text-foreground">
                  {row.totalBookings.toLocaleString()}
                </TableCell>
                <TableCell className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Badge variant={statusTone(row.activeBookings, row.totalBookings)}>
                      {row.activeBookings.toLocaleString()}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {row.totalBookings > 0
                        ? `${Math.round((row.activeBookings / row.totalBookings) * 100)}%`
                        : "0%"}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="px-4 py-3 text-foreground">{row.totalRequests.toLocaleString()}</TableCell>
                <TableCell className="px-4 py-3 text-foreground">{row.totalTaskers.toLocaleString()}</TableCell>
                <TableCell className="px-4 py-3 font-semibold text-foreground">
                  <span className="inline-flex items-center gap-1">
                    <Activity className="h-3.5 w-3.5 text-primary" />
                    {row.earnings.toLocaleString()} ETB
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {!loadingWeeklySeries && rows.length === 0 && (
          <div className="py-10 text-center text-sm text-muted-foreground">
            No weekly analytics data available.
          </div>
        )}
      </CardContent>
    </Card>
  );
}


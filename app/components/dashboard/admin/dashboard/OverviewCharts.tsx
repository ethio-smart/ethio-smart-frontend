"use client";

import { useEffect, useMemo, useState } from "react";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import {
  fetchAdminAnalyticsMonthlySeries,
  fetchAdminAnalyticsWeeklySeries,
} from "@/app/store/slices/adminAnalyticsSlice";
import RechartsTooltip from "./RechartsTooltip";

export default function OverviewCharts() {
  const dispatch = useAppDispatch();
  const {
    weeklySeries,
    monthlySeries,
    loadingWeeklySeries,
    loadingMonthlySeries,
  } = useAppSelector(
    (state) => state.adminAnalytics,
  );

  const [period, setPeriod] = useState<"weekly" | "monthly">("weekly");
  const [weeks, setWeeks] = useState(8);
  const [months, setMonths] = useState(6);

  useEffect(() => {
    if (period === "weekly") {
      dispatch(fetchAdminAnalyticsWeeklySeries(weeks));
    } else {
      dispatch(fetchAdminAnalyticsMonthlySeries(months));
    }
  }, [dispatch, period, weeks, months]);

  const earningsData = useMemo(
    () =>
      ((period === "weekly" ? weeklySeries?.data : monthlySeries?.data) ?? []).map((item: any) => ({
        month: item.label,
        revenue: item.earnings,
      })),
    [monthlySeries?.data, period, weeklySeries?.data],
  );

  const bookingActivityData = useMemo(
    () =>
      ((period === "weekly" ? weeklySeries?.data : monthlySeries?.data) ?? []).map((item: any) => ({
        period: item.label,
        bookings: item.totalBookings,
      })),
    [monthlySeries?.data, period, weeklySeries?.data],
  );

  const periodLabel = period === "weekly" ? "Weekly" : "Monthly";
  const currentCount = period === "weekly" ? weeks : months;
  const isLoading = period === "weekly" ? loadingWeeklySeries : loadingMonthlySeries;
  const hasData = earningsData.length > 0;

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
      <Card className="overflow-hidden border-border shadow-sm">
        <CardHeader className="flex-row items-start justify-between space-y-0">
          <div>
            <CardTitle className="text-base">Earnings Overview</CardTitle>
            <p className="text-xs text-muted-foreground">
              {periodLabel} earnings trend
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Select
              value={period}
              onValueChange={(value) => setPeriod(value as "weekly" | "monthly")}
            >
              <SelectTrigger className="h-8 w-24 rounded-lg text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={String(currentCount)}
              onValueChange={(value) =>
                period === "weekly"
                  ? setWeeks(Number(value))
                  : setMonths(Number(value))
              }
            >
              <SelectTrigger className="h-8 w-20 rounded-lg text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 12 }, (_, index) => index + 1).map((value) => (
                  <SelectItem key={value} value={String(value)}>
                    {value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Badge variant="secondary">Line</Badge>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex h-64 items-center justify-center rounded-xl border border-dashed border-border bg-secondary/40 text-sm text-muted-foreground">
              Loading chart data...
            </div>
          ) : !hasData ? (
            <div className="flex h-64 items-center justify-center rounded-xl border border-dashed border-border bg-secondary/40 text-sm text-muted-foreground">
              No earnings data available for the selected range.
            </div>
          ) : (
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={earningsData}
                  margin={{ top: 6, right: 12, left: -12, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v) => `$${(Number(v) / 1000).toFixed(0)}k`}
                  />
                  <Tooltip content={<RechartsTooltip prefix="$" />} />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="var(--color-primary)"
                    strokeWidth={2.5}
                    dot={{ r: 3, fill: "var(--color-primary)", strokeWidth: 0 }}
                    activeDot={{ r: 5, fill: "var(--color-primary)" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="overflow-hidden border-border shadow-sm">
        <CardHeader className="flex-row items-start justify-between space-y-0">
          <div>
            <CardTitle className="text-base">Booking Activity</CardTitle>
            <p className="text-xs text-muted-foreground">
              {periodLabel} booking trend
            </p>
          </div>
          <Badge variant="secondary">Bar</Badge>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex h-64 items-center justify-center rounded-xl border border-dashed border-border bg-secondary/40 text-sm text-muted-foreground">
              Loading chart data...
            </div>
          ) : !hasData ? (
            <div className="flex h-64 items-center justify-center rounded-xl border border-dashed border-border bg-secondary/40 text-sm text-muted-foreground">
              No booking activity data available for the selected range.
            </div>
          ) : (
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={bookingActivityData}
                  margin={{ top: 6, right: 12, left: -12, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis
                    dataKey="period"
                    tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip content={<RechartsTooltip />} />
                  <Bar
                    dataKey="bookings"
                    fill="var(--color-primary)"
                    radius={[4, 4, 0, 0]}
                    opacity={0.85}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}


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
import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import {
  fetchAdminAnalyticsMonthlySeries,
  fetchAdminAnalyticsWeeklySeries,
} from "@/app/store/slices/adminAnalyticsSlice";
import RechartsTooltip from "./RechartsTooltip";

export default function OverviewCharts() {
  const dispatch = useAppDispatch();
  const { weeklySeries, monthlySeries } = useAppSelector(
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
      ((period === "weekly" ? weeklySeries?.data : monthlySeries?.data) ?? []).map((item) => ({
        month: item.label,
        revenue: item.earnings,
      })),
    [monthlySeries?.data, period, weeklySeries?.data],
  );

  const bookingActivityData = useMemo(
    () =>
      ((period === "weekly" ? weeklySeries?.data : monthlySeries?.data) ?? []).map((item) => ({
        period: item.label,
        bookings: item.totalBookings,
      })),
    [monthlySeries?.data, period, weeklySeries?.data],
  );

  const periodLabel = period === "weekly" ? "Weekly" : "Monthly";
  const currentCount = period === "weekly" ? weeks : months;

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
      <Card>
        <CardHeader className="flex-row items-start justify-between space-y-0">
          <div>
            <CardTitle className="text-base">Earnings Overview</CardTitle>
            <p className="text-xs text-muted-foreground">
              {periodLabel} earnings trend
            </p>
          </div>
          <div className="flex items-center gap-2">
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value as "weekly" | "monthly")}
              className="rounded-md border bg-background px-2 py-1 text-xs"
            >
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
            <select
              value={currentCount}
              onChange={(e) =>
                period === "weekly"
                  ? setWeeks(Number(e.target.value))
                  : setMonths(Number(e.target.value))
              }
              className="rounded-md border bg-background px-2 py-1 text-xs"
            >
              {Array.from({ length: 12 }, (_, index) => index + 1).map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
            <Badge variant="secondary">Line</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-55">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={earningsData}
                margin={{ top: 4, right: 8, left: -16, bottom: 0 }}
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
                  tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
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
        </CardContent>
      </Card>

      <Card>
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
          <div className="h-55">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={bookingActivityData}
                margin={{ top: 4, right: 8, left: -16, bottom: 0 }}
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
        </CardContent>
      </Card>
    </div>
  );
}


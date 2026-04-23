"use client";

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

export default function RecentBookingsTable() {
  const dispatch = useAppDispatch();
  const { weeklySeries, loadingWeeklySeries } = useAppSelector(
    (state) => state.adminAnalytics,
  );

  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <CardTitle className="text-base">Weekly Analytics</CardTitle>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => dispatch(fetchAdminAnalyticsWeeklySeries(8))}
        >
          Refresh
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              {[
                "Period",
                "Bookings",
                "Active",
                "Requests",
                "Taskers",
                "Earnings",
              ].map((h) => (
                <TableHead key={h}>{h}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {(weeklySeries?.data ?? []).map((row) => (
              <TableRow key={row.label}>
                <TableCell className="font-medium">{row.label}</TableCell>
                <TableCell>{row.totalBookings.toLocaleString()}</TableCell>
                <TableCell>{row.activeBookings.toLocaleString()}</TableCell>
                <TableCell>{row.totalRequests.toLocaleString()}</TableCell>
                <TableCell>{row.totalTaskers.toLocaleString()}</TableCell>
                <TableCell className="font-medium">
                  {row.earnings.toLocaleString()} ETB
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {!loadingWeeklySeries && (weeklySeries?.data?.length ?? 0) === 0 && (
          <div className="py-8 text-center text-sm text-muted-foreground">
            No weekly analytics data available.
          </div>
        )}
      </CardContent>
    </Card>
  );
}


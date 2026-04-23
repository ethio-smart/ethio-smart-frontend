"use client";

import { useEffect, useMemo, useState } from "react";

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
import type { Payment } from "@/app/types/types";
import {
  fetchAdminPaymentById,
  fetchAdminPayments,
} from "@/app/store/slices/adminPaymentsSlice";
import ViewPaymentModal from "../payment/ViewPaymentModal";

export default function RecentPaymentsTable() {
  const dispatch = useAppDispatch();
  const { payments, selectedPayment, loadingList, loadingDetail } = useAppSelector(
    (state) => state.adminPayments,
  );
  const [detailOpen, setDetailOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchAdminPayments());
  }, [dispatch]);

  const recentPayments = useMemo(
    () =>
      [...payments]
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        )
        .slice(0, 6),
    [payments],
  );

  const handleView = async (payment: Payment) => {
    setDetailOpen(true);
    await dispatch(fetchAdminPaymentById(payment.id));
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <CardTitle className="text-base">Recent Payments</CardTitle>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => dispatch(fetchAdminPayments())}
        >
          Refresh
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              {["Payment ID", "Booking ID", "Amount", "Status", "Date", "Action"].map(
                (h) => (
                  <TableHead key={h}>{h}</TableHead>
                )
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentPayments.map((row) => (
              <TableRow key={row.id}>
                <TableCell className="font-medium text-primary">{row.id}</TableCell>
                <TableCell className="font-mono text-xs">{row.bookingId}</TableCell>
                <TableCell className="font-medium">
                  {Number(row.amount ?? 0).toLocaleString()} ETB
                </TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell>
                  {new Date(row.createdAt).toLocaleDateString(undefined, {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                  })}
                </TableCell>
                <TableCell>
                  <Button variant="outline" size="sm" onClick={() => handleView(row)}>
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {!loadingList && recentPayments.length === 0 && (
          <div className="py-8 text-center text-sm text-muted-foreground">
            No payments available.
          </div>
        )}
      </CardContent>

      <ViewPaymentModal
        payment={selectedPayment}
        open={detailOpen && !loadingDetail}
        onClose={() => setDetailOpen(false)}
      />
    </Card>
  );
}


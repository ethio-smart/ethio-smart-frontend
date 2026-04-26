"use client";

import { useEffect, useMemo, useState } from "react";
import { CircleDollarSign, RefreshCw, ReceiptText } from "lucide-react";

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
import type { Payment } from "@/app/types/types";
import {
  fetchAdminPaymentById,
  fetchAdminPayments,
} from "@/app/store/slices/adminPaymentsSlice";
import ViewPaymentModal from "../payment/ViewPaymentModal";

const statusVariant = (status?: string) => {
  switch (String(status ?? "").toUpperCase()) {
    case "PAID":
    case "COMPLETED":
      return "default" as const;
    case "PENDING":
      return "secondary" as const;
    case "FAILED":
      return "destructive" as const;
    case "REFUNDED":
      return "outline" as const;
    default:
      return "outline" as const;
  }
};

const formatCompact = (value: number) =>
  new Intl.NumberFormat(undefined, { notation: "compact", maximumFractionDigits: 1 }).format(
    Number(value ?? 0),
  );

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

  const totalVolume = useMemo(
    () => recentPayments.reduce((sum, payment) => sum + Number(payment.amount ?? 0), 0),
    [recentPayments],
  );
  const completedCount = useMemo(
    () =>
      recentPayments.filter((payment) =>
        ["PAID", "COMPLETED"].includes(String(payment.status ?? "").toUpperCase()),
      ).length,
    [recentPayments],
  );
  const pendingCount = useMemo(
    () =>
      recentPayments.filter((payment) => String(payment.status ?? "").toUpperCase() === "PENDING")
        .length,
    [recentPayments],
  );

  const handleView = async (payment: Payment) => {
    setDetailOpen(true);
    await dispatch(fetchAdminPaymentById(payment.id));
  };

  return (
    <Card className="overflow-hidden rounded-3xl border border-border shadow-sm">
      <CardHeader className="space-y-4 border-b border-border bg-card px-5 py-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <CardTitle className="text-base font-semibold">Recent Payment Flow</CardTitle>
            <p className="mt-1 text-xs text-muted-foreground">
              Latest transactions with real-time status visibility
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="rounded-xl"
            onClick={() => dispatch(fetchAdminPayments())}
            disabled={loadingList}
          >
            <RefreshCw className={`mr-2 h-3.5 w-3.5 ${loadingList ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>

        <div className="grid gap-2 sm:grid-cols-3">
          <div className="rounded-xl border border-border bg-muted/20 px-3 py-2.5">
            <p className="text-[11px] uppercase tracking-wide text-muted-foreground">Recent volume</p>
            <p className="mt-1 text-sm font-semibold text-foreground">{formatCompact(totalVolume)} ETB</p>
          </div>
          <div className="rounded-xl border border-border bg-muted/20 px-3 py-2.5">
            <p className="text-[11px] uppercase tracking-wide text-muted-foreground">Completed</p>
            <p className="mt-1 text-sm font-semibold text-foreground">{completedCount}</p>
          </div>
          <div className="rounded-xl border border-border bg-muted/20 px-3 py-2.5">
            <p className="text-[11px] uppercase tracking-wide text-muted-foreground">Pending</p>
            <p className="mt-1 text-sm font-semibold text-foreground">{pendingCount}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/30 hover:bg-muted/30">
              {["Payment ID", "Booking ID", "Amount", "Status", "Date", "Action"].map(
                (h) => (
                  <TableHead key={h} className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                    {h}
                  </TableHead>
                )
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentPayments.map((row) => (
              <TableRow key={row.id} className="transition-colors hover:bg-muted/20">
                <TableCell className="px-4 py-3">
                  <span className="inline-flex max-w-40 truncate rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
                    {row.id}
                  </span>
                </TableCell>
                <TableCell className="px-4 py-3 font-mono text-xs text-foreground">{row.bookingId}</TableCell>
                <TableCell className="px-4 py-3 font-semibold text-foreground">
                  <span className="inline-flex items-center gap-1">
                    <CircleDollarSign className="h-3.5 w-3.5 text-primary" />
                    {Number(row.amount ?? 0).toLocaleString()} ETB
                  </span>
                </TableCell>
                <TableCell className="px-4 py-3">
                  <Badge variant={statusVariant(row.status)}>{row.status}</Badge>
                </TableCell>
                <TableCell className="px-4 py-3 text-foreground">
                  {new Date(row.createdAt).toLocaleDateString(undefined, {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                  })}
                </TableCell>
                <TableCell className="px-4 py-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-xl"
                    onClick={() => handleView(row)}
                  >
                    <ReceiptText className="mr-1.5 h-3.5 w-3.5" />
                    Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {!loadingList && recentPayments.length === 0 && (
          <div className="py-10 text-center text-sm text-muted-foreground">
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


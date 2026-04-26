"use client";

import { useEffect, useMemo, useState } from "react";

import PaymentFilters from "@/app/components/dashboard/admin/payment/PaymentFilters";
import PaymentStats from "@/app/components/dashboard/admin/payment/PaymentStats";
import PaymentTable from "@/app/components/dashboard/admin/payment/PaymentTable";
import ViewPaymentModal from "@/app/components/dashboard/admin/payment/ViewPaymentModal";
import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import type { Payment } from "@/app/types/types";
import {
  fetchAdminPaymentById,
  fetchAdminPayments,
} from "@/app/store/slices/adminPaymentsSlice";

export default function AdminPaymentsPage() {
  const dispatch = useAppDispatch();
  const { payments, selectedPayment, loadingList, loadingDetail, error } =
    useAppSelector((state) => state.adminPayments);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [detailOpen, setDetailOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchAdminPayments());
  }, [dispatch]);

  const filteredPayments = useMemo(() => {
    const query = search.toLowerCase();
    return payments.filter((payment) => {
      const matchesSearch =
        payment.id.toLowerCase().includes(query) ||
        payment.bookingId.toLowerCase().includes(query) ||
        String(payment.chapaRef ?? "")
          .toLowerCase()
          .includes(query);
      const matchesStatus = status === "all" || payment.status === status;
      return matchesSearch && matchesStatus;
    });
  }, [payments, search, status]);

  const stats = useMemo(() => {
    const totalVolume = payments.reduce((sum, payment) => sum + Number(payment.amount ?? 0), 0);
    const paidCount = payments.filter(
      (payment) => payment.status === "PAID" || payment.status === "COMPLETED",
    ).length;
    const pendingCount = payments.filter((payment) => payment.status === "PENDING").length;

    return [
      {
        type: "volume" as const,
        label: "Total Volume",
        bg: "bg-primary/10",
        color: "text-primary",
        value: `${totalVolume.toLocaleString()} ETB`,
      },
      {
        type: "fees" as const,
        label: "Total Payments",
        bg: "bg-blue-100",
        color: "text-blue-700",
        value: payments.length.toLocaleString(),
      },
      {
        type: "completed" as const,
        label: "Paid",
        bg: "bg-emerald-100",
        color: "text-emerald-700",
        value: paidCount.toLocaleString(),
      },
      {
        type: "pending" as const,
        label: "Pending",
        bg: "bg-amber-100",
        color: "text-amber-700",
        value: pendingCount.toLocaleString(),
      },
    ];
  }, [payments]);

  const handleView = async (payment: Payment) => {
    setDetailOpen(true);
    await dispatch(fetchAdminPaymentById(payment.id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Payment Management</h1>
          <p className="text-sm text-muted-foreground">
            Live payments from backend
          </p>
        </div>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <PaymentStats stats={stats} />

      <div className="rounded-xl border  p-4">
        <div className="mb-4 flex items-center justify-between gap-2">
          <PaymentFilters
            search={search}
            setSearch={setSearch}
            status={status}
            setStatus={setStatus}
          />
        </div>

        {loadingList ? (
          <div className="py-10 text-center text-sm text-muted-foreground">
            Loading payments...
          </div>
        ) : (
          <PaymentTable data={filteredPayments} onView={handleView} />
        )}
      </div>

      <ViewPaymentModal
        payment={selectedPayment}
        open={detailOpen && !loadingDetail}
        onClose={() => setDetailOpen(false)}
      />
    </div>
  );
}

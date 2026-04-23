'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Payment } from "@/app/types/types";

interface Props {
  payment: Payment | null;
  open: boolean;
  onClose: () => void;
}

export default function ViewPaymentModal({ payment, open, onClose }: Props) {
  if (!payment) return null;

  const statusClass =
    payment.status === "PAID" || payment.status === "COMPLETED"
      ? "bg-emerald-100 text-emerald-700"
      : payment.status === "FAILED"
      ? "bg-red-100 text-red-700"
      : payment.status === "REFUNDED"
      ? "bg-slate-100 text-slate-700"
      : "bg-amber-100 text-amber-700";

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader className="flex flex-row items-center justify-between">
          <div>
            <DialogTitle>Payment Details</DialogTitle>
            <p className="text-sm text-muted-foreground">{payment.id}</p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </DialogHeader>

        <div className="space-y-5 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-muted/40 p-3 rounded-lg">
              <p className="text-xs text-muted-foreground">Amount</p>
              <p className="text-xl font-semibold">
                {Number(payment.amount ?? 0).toLocaleString()} ETB
              </p>
            </div>

            <div className="bg-muted/40 p-3 rounded-lg">
              <p className="text-xs text-muted-foreground">Status</p>
              <span className={`inline-flex mt-1 px-2 py-0.5 rounded-full text-xs ${statusClass}`}>
                {payment.status}
              </span>
            </div>
          </div>

          <div className="space-y-3">
            {[
              ["Payment ID", payment.id],
              ["Booking ID", payment.bookingId],
              ["Chapa Ref", payment.chapaRef ?? "-"],
              [
                "Created At",
                new Date(payment.createdAt).toLocaleString(),
              ],
              [
                "Updated At",
                new Date(payment.updatedAt).toLocaleString(),
              ],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between border-b pb-2">
                <span className="text-sm text-muted-foreground">{label}</span>
                <span className="text-sm text-right max-w-[65%] break-all">{value}</span>
              </div>
            ))}
          </div>

          <div className="flex justify-end">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
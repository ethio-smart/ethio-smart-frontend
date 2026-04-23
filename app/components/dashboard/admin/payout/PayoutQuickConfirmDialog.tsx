"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import type { Payout } from "@/app/types/types";
import { useState } from "react";

export default function PayoutQuickConfirmDialog({
  payload,
  onClose,
  onConfirm,
}: {
  payload: { payout: Payout; action: "approve" | "reject" } | null;
  onClose: () => void;
  onConfirm: () => void;
}) {
  const [loading, setLoading] = useState(false);

  if (!payload) return null;

  const isApprove = payload.action === "approve";
  const { payout } = payload;

  const handleConfirm = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onConfirm();
    }, 1000);
  };

  return (
    <Dialog open={!!payload} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-center">
            {isApprove ? "Approve Payout" : "Reject Payout"}
          </DialogTitle>
        </DialogHeader>

        <div className="py-1 text-center space-y-4">
          <div
            className={`w-14 h-14 rounded-full mx-auto flex items-center justify-center ${
              isApprove
                ? "bg-emerald-100 dark:bg-emerald-900/30"
                : "bg-red-100 dark:bg-red-900/30"
            }`}
          >
            {isApprove ? (
              <CheckCircle
                className="size-6 text-emerald-600"
                aria-hidden
              />
            ) : (
              <XCircle className="size-6 text-red-600" aria-hidden />
            )}
          </div>
          <p className="text-sm text-muted-foreground">
            {isApprove
              ? `Approve payout of $${payout.amount.toFixed(
                  2,
                )} to ${payout.tasker}?`
              : `Reject payout request from ${payout.tasker}?`}
          </p>
        </div>

        <div className="flex gap-2 pt-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            type="button"
            size="sm"
            className="flex-1"
            variant={isApprove ? "default" : "destructive"}
            onClick={handleConfirm}
            disabled={loading}
          >
            {loading && (
              <Loader2 className="mr-2 size-4 animate-spin" />
            )}
            {loading ? "Processing..." : isApprove ? "Approve" : "Reject"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}


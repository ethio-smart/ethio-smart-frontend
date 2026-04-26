"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle } from "lucide-react";

export default function ConfirmActionDialog({
  type,
  open,
  onCancel,
  onConfirm,
}: {
  type: "approve" | "reject";
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  const isApprove = type === "approve";

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onCancel()}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-center">
            {isApprove ? "Approve Tasker?" : "Reject Application?"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 pt-1">
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto ${
              isApprove
                ? "bg-primary/10"
                : "bg-red-100 dark:bg-red-950/30"
            }`}
          >
            {isApprove ? (
              <CheckCircle className="w-6 h-6 text-primary" />
            ) : (
              <XCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
            )}
          </div>
          <p className="text-sm text-muted-foreground text-center">
            {isApprove
              ? "This will verify the tasker and allow them to accept bookings."
              : "This will reject the application. The tasker will be notified."}
          </p>
          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              className="flex-1 rounded-xl border-border bg-background py-2.5 text-sm font-semibold text-foreground hover:bg-muted"
              onClick={onCancel}
            >
              Cancel
            </Button>
            <Button
              type="button"
              className={`flex-1 rounded-xl py-2.5 text-sm font-semibold text-white transition-colors ${
                isApprove
                  ? "bg-primary hover:bg-primary/90"
                  : "bg-red-600 hover:bg-red-700"
              }`}
              onClick={onConfirm}
            >
              {isApprove ? "Approve" : "Reject"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}


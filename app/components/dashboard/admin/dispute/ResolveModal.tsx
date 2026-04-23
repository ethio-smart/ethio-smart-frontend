"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle2,
  ShieldCheck,
  X,
} from "lucide-react";
import StatusBadge from "./StatusBadge";
import SeverityBadge from "./SeverityBadge";
import type { Dispute } from "@/app/types/types";

export default function ResolveModal({
  dispute,
  onClose,
  onConfirm,
}: {
  dispute: Dispute | null;
  onClose: () => void;
  onConfirm: (d: Dispute) => void;
}) {
  return (
    <Dialog open={!!dispute} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between gap-3">
            <span className="flex items-center gap-2">
              <ShieldCheck className="size-4" aria-hidden />
              Resolve Dispute
            </span>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-8 w-8 p-0"
              onClick={onClose}
              aria-label="Close"
            >
              <X className="size-4" aria-hidden />
            </Button>
          </DialogTitle>
          <DialogDescription>
            Confirm the resolution. This will mark the dispute as resolved.
          </DialogDescription>
        </DialogHeader>

        {!dispute ? null : (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-sm font-medium">{dispute.id}</p>
                <p className="text-xs text-muted-foreground">
                  Booking: {dispute.bookingId}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <StatusBadge status={dispute.status} />
                <SeverityBadge severity={dispute.severity} />
              </div>
            </div>

            <div className="rounded-lg border bg-muted/30 p-4">
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm text-muted-foreground">
                  Amount
                </span>
                <span className="text-sm font-semibold">
                  ${dispute.amount}
                </span>
              </div>

              <div className="mt-3 flex items-center justify-between gap-3">
                <span className="text-sm text-muted-foreground">Issue</span>
                <Badge variant="outline">{dispute.issue}</Badge>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <Button
                variant="outline"
                onClick={onClose}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={() => onConfirm(dispute)}
                className="flex-1"
              >
                <CheckCircle2 className="mr-2 size-4" aria-hidden />
                Resolve
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}


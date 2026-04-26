"use client";

import { useEffect, useMemo, useState } from "react";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  Loader2,
  ShieldCheck,
  X,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import type { Dispute } from "@/app/types/types";
import type { DisputeResolutionBody, DisputeResolutionType } from "@/app/types/types";

const resolutionOptions: Array<{ value: DisputeResolutionType; label: string; description: string }> = [
  { value: "FULL_REFUND", label: "Full refund", description: "Refund the full payment amount" },
  { value: "NO_REFUND", label: "No refund", description: "Reject compensation and close the case" },
  { value: "PARTIAL_REFUND", label: "Partial refund", description: "Refund only part of the payment" },
];

export default function ResolveModal({
  dispute,
  onClose,
  onConfirm,
  actionLoading,
}: {
  dispute: Dispute | null;
  onClose: () => void;
  onConfirm: (body: DisputeResolutionBody) => Promise<void>;
  actionLoading: boolean;
}) {
  const [resolution, setResolution] = useState<DisputeResolutionType>("FULL_REFUND");
  const [resolutionNote, setResolutionNote] = useState("");
  const [refundAmount, setRefundAmount] = useState("");

  const paymentAmount = dispute?.booking?.payment?.amount ?? 0;

  useEffect(() => {
    if (!dispute) return;
    setResolution("FULL_REFUND");
    setResolutionNote("");
    setRefundAmount(String(paymentAmount || ""));
  }, [dispute, paymentAmount]);

  const needsRefundAmount = resolution === "PARTIAL_REFUND";

  const canSubmit = useMemo(() => {
    if (!resolutionNote.trim()) return false;
    if (resolution === "PARTIAL_REFUND") {
      const value = Number(refundAmount);
      return Number.isFinite(value) && value > 0;
    }
    return true;
  }, [resolution, resolutionNote, refundAmount]);

  const handleSubmit = async () => {
    const body: DisputeResolutionBody = {
      resolution,
      resolutionNote: resolutionNote.trim(),
      ...(resolution === "PARTIAL_REFUND"
        ? { refundAmount: Number(refundAmount) }
        : {}),
    };

    await onConfirm(body);
  };

  return (
    <Dialog open={!!dispute} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-2xl">
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
            <div className="rounded-2xl border border-border bg-muted/20 p-4 text-sm text-muted-foreground">
              <p className="font-medium text-foreground">{dispute.reason}</p>
              <p className="mt-1">Booking: {dispute.bookingId}</p>
              <p className="mt-1">Payment amount: ${Number(dispute.booking?.payment?.amount ?? 0).toLocaleString()}</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="resolution">Resolution</Label>
              <Select value={resolution} onValueChange={(value) => setResolution(value as DisputeResolutionType)}>
                <SelectTrigger id="resolution" className="w-full rounded-2xl">
                  <SelectValue placeholder="Select resolution" />
                </SelectTrigger>
                <SelectContent>
                  {resolutionOptions.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      <div className="flex flex-col items-start gap-0.5">
                        <span>{item.label}</span>
                        <span className="text-xs text-muted-foreground">{item.description}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="resolutionNote">Resolution note</Label>
              <Textarea
                id="resolutionNote"
                value={resolutionNote}
                onChange={(event) => setResolutionNote(event.target.value)}
                placeholder="Explain why you selected this resolution..."
                className="min-h-32 rounded-2xl"
              />
            </div>

            {needsRefundAmount ? (
              <div className="space-y-2">
                <Label htmlFor="refundAmount">Refund amount</Label>
                <Input
                  id="refundAmount"
                  type="number"
                  min="0"
                  step="0.01"
                  value={refundAmount}
                  onChange={(event) => setRefundAmount(event.target.value)}
                  placeholder="Enter partial refund amount"
                  className="rounded-2xl"
                />
              </div>
            ) : null}

            <div className="flex items-center justify-between gap-3 rounded-2xl border border-border bg-card p-4 text-sm">
              <span className="text-muted-foreground">Refund field required</span>
              <span className="font-semibold text-foreground">
                {needsRefundAmount ? 'Yes' : 'No'}
              </span>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">
              <Button variant="outline" onClick={onClose} className="flex-1 rounded-2xl">
                Cancel
              </Button>
              <Button
                onClick={() => void handleSubmit()}
                className="flex-1 rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90"
                disabled={actionLoading || !canSubmit}
              >
                {actionLoading ? <Loader2 className="mr-2 size-4 animate-spin" aria-hidden /> : <CheckCircle2 className="mr-2 size-4" aria-hidden />}
                Submit resolution
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}


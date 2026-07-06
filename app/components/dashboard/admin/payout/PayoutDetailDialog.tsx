"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  X,
  Building2,
  ShieldCheck,
  Loader2,
} from "lucide-react";
import type { Payout } from "@/app/types/types";
import { getAvatarColor, statusConfig } from "../data";

export default function PayoutDetailDialog({
  payout,
  onClose,
  onApprove,
  onReject,
}: {
  payout: Payout | null;
  onClose: () => void;
  onApprove: (id: string) => void;
  onReject: (id: string, note: string) => void;
}) {
  const [rejectNote, setRejectNote] = useState("");
  const [showRejectForm, setShowRejectForm] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!payout) return null;

  const handleApprove = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onApprove(payout.id);
    }, 1200);
  };

  const handleReject = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onReject(payout.id, rejectNote);
    }, 1000);
  };

  const statusCfg = statusConfig[payout.status];

  return (
    <Dialog open={!!payout} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0">
          <div className="space-y-0.5">
            <DialogTitle className="text-base">
              Payout Details
            </DialogTitle>
            <p className="text-sm text-muted-foreground font-data">
              {payout.id}
            </p>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={onClose}
          >
            <X className="size-4" aria-hidden />
          </Button>
        </DialogHeader>

        <div className="space-y-5 py-2">
          <div className="flex items-center gap-3 p-4 bg-muted/40 rounded-lg">
            <div
              className={`w-12 h-12 rounded-full ${getAvatarColor(
                payout.taskerAvatar,
              )} flex items-center justify-center text-white text-base font-semibold`}
            >
              {payout.taskerAvatar}
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">
                {payout.taskerName}
              </p>
              <p className="text-xs text-muted-foreground">
                {payout.taskerEmail}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {payout.completedJobs} completed jobs
              </p>
            </div>
            <div className="ml-auto">
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusCfg.className}`}
              >
                {statusCfg.label}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium text-foreground">
              Earnings Breakdown
            </h3>
            <div className="bg-muted/40 rounded-lg p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  Gross Earnings
                </span>
                <span className="font-data text-foreground">
                  ${payout.earnings.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  Tax Withholding
                </span>
                <span className="font-data text-red-500">
                  -${payout.tax.toFixed(2)}
                </span>
              </div>
              <div className="border-t border-border pt-2 flex justify-between text-sm font-semibold">
                <span className="text-foreground">Net Payout</span>
                <span className="font-data text-emerald-600">
                  ${payout.amount.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium text-foreground">
              Banking Details
            </h3>
            <div className="flex items-center gap-3 p-3 bg-muted/40 rounded-lg">
              <div className="w-8 h-8 rounded-lg bg-card border border-border flex items-center justify-center">
                <Building2 className="size-4 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm text-foreground">Bank Account</p>
                <p className="text-xs text-muted-foreground font-data">
                  •••• •••• •••• {payout.bankLast4}
                </p>
              </div>
              <div className="ml-auto">
                <span className="inline-flex items-center gap-1 text-xs text-emerald-600">
                  <ShieldCheck className="size-3" aria-hidden />
                  Verified
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between py-2 border-b border-border">
            <span className="text-sm text-muted-foreground">
              Request Date
            </span>
            <span className="text-sm font-data text-foreground">
              {payout.requestDate}
            </span>
          </div>

          {payout.notes && (
            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3">
              <p className="text-xs font-medium text-amber-700 dark:text-amber-400 mb-1">
                Admin Notes
              </p>
              <p className="text-sm text-amber-600 dark:text-amber-300">
                {payout.notes}
              </p>
            </div>
          )}

          {showRejectForm && (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-foreground">
                Rejection Reason
              </label>
              <Textarea
                value={rejectNote}
                onChange={(e) => setRejectNote(e.target.value)}
                placeholder="Provide a reason for rejection..."
                rows={3}
                className="text-sm font-normal resize-none"
              />
            </div>
          )}
        </div>

        {payout.status === "pending" ? (
          <div className="flex justify-end gap-2 pt-2 border-t border-border">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onClose}
            >
              Cancel
            </Button>
            {!showRejectForm ? (
              <>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                  onClick={() => setShowRejectForm(true)}
                >
                  Reject
                </Button>
                <Button
                  type="button"
                  size="sm"
                  onClick={handleApprove}
                  disabled={loading}
                >
                  {loading && (
                    <Loader2 className="mr-2 size-4 animate-spin" />
                  )}
                  {loading ? "Approving..." : "Approve Payout"}
                </Button>
              </>
            ) : (
              <>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setShowRejectForm(false)}
                >
                  Back
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="destructive"
                  onClick={handleReject}
                  disabled={loading || !rejectNote.trim()}
                >
                  {loading && (
                    <Loader2 className="mr-2 size-4 animate-spin" />
                  )}
                  {loading ? "Rejecting..." : "Confirm Rejection"}
                </Button>
              </>
            )}
          </div>
        ) : (
          <div className="flex justify-end pt-2 border-t border-border">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onClose}
            >
              Close
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}


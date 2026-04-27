"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  AlertTriangle,
  Calendar,
  Clock,
  CreditCard,
  DollarSign,
  Mail,
  MessageSquare,
  UserRound,
  Wallet,
  X,
} from "lucide-react";
import Avatar from "./Avatar";
import StatusBadge from "./StatusBadge";
import type { Dispute } from "@/app/types/types";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";

const formatCurrency = (value?: number | null) =>
  value == null ? "—" : `$${Number(value).toLocaleString()}`;

const fullName = (person?: { firstName?: string; lastName?: string } | null) =>
  `${person?.firstName ?? ''} ${person?.lastName ?? ''}`.trim() || "Unknown";

const initials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase() || "--";

const isResolvedDispute = (dispute: Dispute) =>
  dispute.resolved === true ||
  dispute.resolution != null ||
  ["resolved", "closed", "REJECTED", "RESOLVED"].includes(String(dispute.status ?? "").toUpperCase());

export default function DetailModal({
  dispute,
  onClose,
  onResolve,
}: {
  dispute: Dispute | null;
  onClose: () => void;
  onResolve: (d: Dispute) => void;
}) {
  const router = useRouter();
  const locale = useLocale();

  const raisedBy = dispute
    ? dispute.User_Dispute_raisedByIdToUser ?? dispute.booking?.user
    : null;
  const againstUser = dispute
    ? dispute.User_Dispute_againstUserIdToUser ?? dispute.booking?.tasker?.user
    : null;

  const handleOpenBooking = () => {
    if (!dispute?.bookingId) return;
    onClose();
    router.push(
      `/${locale}/admin/booking-management?bookingId=${encodeURIComponent(dispute.bookingId)}&disputeId=${encodeURIComponent(dispute.id)}`,
    );
  };

  return (
    <Dialog open={!!dispute} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between gap-3">
            <span className="flex items-center gap-2">
              <AlertTriangle className="size-4 text-primary" aria-hidden />
              Dispute Details
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
        </DialogHeader>

        {!dispute ? null : (
          <div className="space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-muted/20 p-4">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Dispute ID</p>
                <p className="mt-1 font-mono text-sm font-medium text-foreground">{dispute.id}</p>
              </div>
              <div className="flex items-center gap-2">
                <StatusBadge status={isResolvedDispute(dispute) ? 'resolved' : dispute.status ?? 'open'} />
              </div>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              <div className="rounded-2xl border border-border bg-card p-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <Avatar initials={initials(fullName(raisedBy))} />
                  Raised by
                </div>
                <div className="mt-3 space-y-1">
                  <p className="text-sm font-medium text-foreground">{fullName(raisedBy)}</p>
                  <p className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Mail className="size-3" aria-hidden />
                    {raisedBy?.email ?? '—'}
                  </p>
                  <p className="text-xs text-muted-foreground">{dispute.raisedById ?? '—'}</p>
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-card p-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <Avatar initials={initials(fullName(againstUser))} />
                  Against user
                </div>
                <div className="mt-3 space-y-1">
                  <p className="text-sm font-medium text-foreground">{fullName(againstUser)}</p>
                  <p className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Mail className="size-3" aria-hidden />
                    {againstUser?.email ?? '—'}
                  </p>
                  <p className="text-xs text-muted-foreground">{dispute.againstUserId ?? '—'}</p>
                </div>
              </div>
            </div>

            <div className="grid gap-3 lg:grid-cols-2">
              <div className="rounded-2xl border border-border bg-card p-4 space-y-3">
                <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <DollarSign className="size-4 text-primary" aria-hidden />
                  Financial summary
                </div>
                <div className="flex items-center justify-between gap-3 text-sm">
                  <span className="text-muted-foreground">Payment amount</span>
                  <span className="font-semibold text-foreground">{formatCurrency(dispute.booking?.payment?.amount)}</span>
                </div>
                <div className="flex items-center justify-between gap-3 text-sm">
                  <span className="text-muted-foreground">Refund amount</span>
                  <span className="font-semibold text-foreground">{formatCurrency(dispute.refundAmount)}</span>
                </div>
                <div className="flex items-center justify-between gap-3 text-sm">
                  <span className="text-muted-foreground">Booking status</span>
                  <span className="font-semibold text-foreground">{dispute.booking?.status ?? '—'}</span>
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-card p-4 space-y-3">
                <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <CreditCard className="size-4 text-primary" aria-hidden />
                  Booking context
                </div>
                <div className="flex items-center justify-between gap-3 text-sm">
                  <span className="text-muted-foreground">Booking ID</span>
                  <span className="font-medium text-foreground">{dispute.bookingId}</span>
                </div>
                <div className="flex items-center justify-between gap-3 text-sm">
                  <span className="text-muted-foreground">Created</span>
                  <span className="font-medium text-foreground">{dispute.createdAt}</span>
                </div>
                <div className="flex items-center justify-between gap-3 text-sm">
                  <span className="text-muted-foreground">Updated</span>
                  <span className="font-medium text-foreground">{dispute.updatedAt ?? '—'}</span>
                </div>
              </div>
            </div>

            <div className="grid gap-3 lg:grid-cols-2">
              <div className="rounded-2xl border border-border bg-muted/20 p-4 space-y-2">
                <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <AlertTriangle className="size-4 text-primary" aria-hidden />
                  Reason
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">{dispute.reason}</p>
              </div>

              <div className="rounded-2xl border border-border bg-muted/20 p-4 space-y-2">
                <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <MessageSquare className="size-4 text-primary" aria-hidden />
                  Description
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">{dispute.description ?? '—'}</p>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-4 space-y-2">
              <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <UserRound className="size-4 text-primary" aria-hidden />
                Resolution notes
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {dispute.resolutionNote || 'No resolution note yet.'}
              </p>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">
              <Button type="button" variant="outline" className="flex-1 rounded-2xl" onClick={onClose}>
                Close
              </Button>
              <Button
                type="button"
                variant="outline"
                className="flex-1 rounded-2xl"
                onClick={handleOpenBooking}
                disabled={!dispute.bookingId}
              >
                View Related Booking
              </Button>
              {!isResolvedDispute(dispute) ? (
                <Button type="button" className="flex-1 rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90" onClick={() => onResolve(dispute)}>
                  Resolve dispute
                </Button>
              ) : (
                <div className="flex-1 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-center text-sm font-semibold text-emerald-700">
                  Already resolved
                </div>
              )}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}


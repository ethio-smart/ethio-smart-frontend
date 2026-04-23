"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AlertTriangle,
  Calendar,
  Clock,
  DollarSign,
  Mail,
  MessageSquare,
  UserRound,
  X,
} from "lucide-react";
import Avatar from "./Avatar";
import StatusBadge from "./StatusBadge";
import SeverityBadge from "./SeverityBadge";
import type { Dispute } from "@/app/types/types";

export default function DetailModal({
  dispute,
  onClose,
}: {
  dispute: Dispute | null;
  onClose: () => void;
}) {
  return (
    <Dialog open={!!dispute} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between gap-3">
            <span>Dispute Details</span>
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
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">ID</span>
                <span className="font-mono text-sm font-medium">
                  {dispute.id}
                </span>
              </div>
              <div className="flex items-center gap-2">
                {dispute.status ? <StatusBadge status={dispute.status} /> : null}
                {dispute.severity ? (
                  <SeverityBadge severity={dispute.severity} />
                ) : null}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="rounded-lg border bg-muted/30 p-3 space-y-2">
                <div className="flex items-center gap-2">
                  <Avatar initials={dispute.client?.avatar ?? "--"} />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold">{dispute.client?.name ?? "Unknown Client"}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Mail className="size-3" aria-hidden />
                      <span className="truncate">{dispute.client?.email ?? "—"}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border bg-muted/30 p-3 space-y-2">
                <div className="flex items-center gap-2">
                  <Avatar initials={dispute.tasker?.avatar ?? "--"} />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold">{dispute.tasker?.name ?? "Unknown Tasker"}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Mail className="size-3" aria-hidden />
                      <span className="truncate">{dispute.tasker?.email ?? "—"}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg border bg-muted/30 p-3 space-y-2">
              <div className="flex items-center justify-between gap-3">
                <span className="flex items-center gap-2 text-muted-foreground text-sm">
                  <AlertTriangle className="size-4" aria-hidden />
                  Issue
                </span>
                <Badge variant="outline">{dispute.issue ?? dispute.reason}</Badge>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="flex items-center gap-2 text-muted-foreground text-sm">
                  <DollarSign className="size-4" aria-hidden />
                  Amount
                </span>
                <span className="font-semibold">
                  ${dispute.amount ?? 0}
                </span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="flex items-center gap-2 text-muted-foreground text-sm">
                  <Calendar className="size-4" aria-hidden />
                  Created
                </span>
                <span className="text-sm">{dispute.createdDate ?? dispute.createdAt}</span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="flex items-center gap-2 text-muted-foreground text-sm">
                  <Clock className="size-4" aria-hidden />
                  Updated
                </span>
                <span className="text-sm">{dispute.updatedDate ?? dispute.resolvedAt ?? "—"}</span>
              </div>
            </div>

            <div className="rounded-lg border bg-muted/30 p-3 space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MessageSquare className="size-4" aria-hidden />
                Description
              </div>
              <p className="text-sm leading-relaxed">{dispute.description ?? dispute.reason}</p>
            </div>

            <div className="rounded-lg border bg-muted/30 p-3 space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <UserRound className="size-4" aria-hidden />
                Admin Notes
              </div>
              <p className="text-sm leading-relaxed">
                {dispute.adminNotes || "—"}
              </p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}


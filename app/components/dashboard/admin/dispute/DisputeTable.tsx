"use client";

import { CheckCircle2, Eye } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Dispute } from "@/app/types/types";

import Avatar from "./Avatar";
import StatusBadge from "./StatusBadge";

const fullName = (person?: { firstName?: string; lastName?: string } | null) =>
  `${person?.firstName ?? ""} ${person?.lastName ?? ""}`.trim() || "Unknown";

const initials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase() || "--";

const disputeParty = (dispute: Dispute, party: "raisedBy" | "against") => {
  const user =
    party === "raisedBy"
      ? dispute.User_Dispute_raisedByIdToUser ?? dispute.booking?.user
      : dispute.User_Dispute_againstUserIdToUser ?? dispute.booking?.tasker?.user;

  const name = fullName(user);
  return {
    name,
    email: user?.email ?? "—",
    initials: initials(name),
  };
};

const getPaymentAmount = (dispute: Dispute) =>
  dispute.booking?.payment?.amount ?? dispute.amount ?? dispute.refundAmount ?? 0;

const isResolvedDispute = (dispute: Dispute) =>
  dispute.resolved === true ||
  dispute.resolution != null ||
  ["resolved", "closed", "REJECTED", "RESOLVED"].includes(String(dispute.status ?? "").toUpperCase());

export default function DisputeTable({
  data,
  onView,
  onResolve,
}: {
  data: Dispute[];
  onView: (d: Dispute) => void;
  onResolve: (d: Dispute) => void;
}) {
  return (
    <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/30 hover:bg-muted/30">
              <TableHead className="whitespace-nowrap px-4 py-3">Dispute</TableHead>
              <TableHead className="whitespace-nowrap px-4 py-3">Booking</TableHead>
              <TableHead className="whitespace-nowrap px-4 py-3">Raised by</TableHead>
              <TableHead className="whitespace-nowrap px-4 py-3">Against</TableHead>
              <TableHead className="whitespace-nowrap px-4 py-3">Status</TableHead>
              <TableHead className="whitespace-nowrap px-4 py-3">Payment</TableHead>
              <TableHead className="whitespace-nowrap px-4 py-3 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-border">
            {data.map((dispute) => {
              const raisedBy = disputeParty(dispute, "raisedBy");
              const against = disputeParty(dispute, "against");

              return (
                <TableRow key={dispute.id} className="transition-colors hover:bg-muted/20">
                  <TableCell className="px-4 py-4">
                    <div className="space-y-1">
                      <p className="font-mono text-sm font-medium text-foreground">
                        {dispute.id.slice(0, 8)}…
                      </p>
                      <p className="max-w-[18rem] truncate text-xs text-muted-foreground">
                        {dispute.reason}
                      </p>
                    </div>
                  </TableCell>

                  <TableCell className="px-4 py-4">
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-foreground">{dispute.bookingId}</p>
                      <p className="text-xs text-muted-foreground">Created {dispute.createdAt}</p>
                    </div>
                  </TableCell>

                  <TableCell className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <Avatar initials={raisedBy.initials} />
                      <div>
                        <p className="text-sm font-medium text-foreground">{raisedBy.name}</p>
                        <p className="text-xs text-muted-foreground">{raisedBy.email}</p>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <Avatar initials={against.initials} />
                      <div>
                        <p className="text-sm font-medium text-foreground">{against.name}</p>
                        <p className="text-xs text-muted-foreground">{against.email}</p>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="px-4 py-4">
                    <StatusBadge status={isResolvedDispute(dispute) ? "resolved" : dispute.status ?? "open"} />
                  </TableCell>

                  <TableCell className="px-4 py-4">
                    <div className="space-y-1">
                      <p className="text-sm font-semibold text-foreground">
                        ${getPaymentAmount(dispute).toLocaleString()}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Refund:{" "}
                        {dispute.refundAmount != null
                          ? `$${Number(dispute.refundAmount).toLocaleString()}`
                          : "—"}
                      </p>
                    </div>
                  </TableCell>

                  <TableCell className="px-4 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="h-9 w-9"
                        onClick={() => onView(dispute)}
                        aria-label="View dispute"
                      >
                        <Eye className="h-4 w-4" aria-hidden />
                      </Button>

                      {isResolvedDispute(dispute) ? (
                        <span className="inline-flex h-9 items-center rounded-full border border-emerald-200 bg-emerald-50 px-3 text-xs font-semibold text-emerald-700">
                          Resolved
                        </span>
                      ) : (
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          className="h-9 w-9 border-primary/30 bg-primary/10 text-primary hover:bg-primary/15"
                          onClick={() => onResolve(dispute)}
                          aria-label="Resolve dispute"
                        >
                          <CheckCircle2 className="h-4 w-4" aria-hidden />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

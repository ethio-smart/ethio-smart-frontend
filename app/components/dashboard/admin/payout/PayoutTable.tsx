"use client";

import { useMemo } from "react";
import { Search, ChevronLeft, ChevronRight, Eye, Check, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Payout, PayoutStatus } from "@/app/types/types";
import { getAvatarColor, statusConfig } from "../data";

export interface PayoutTableState {
  search: string;
  statusFilter: "all" | PayoutStatus;
  page: number;
}

export default function PayoutTable({
  payouts,
  state,
  onStateChange,
  getStatus,
  onViewDetails,
  onQuickApprove,
  onQuickReject,
}: {
  payouts: Payout[];
  state: PayoutTableState;
  onStateChange: (s: PayoutTableState) => void;
  getStatus: (p: Payout) => PayoutStatus;
  onViewDetails: (p: Payout) => void;
  onQuickApprove: (p: Payout) => void;
  onQuickReject: (p: Payout) => void;
}) {
  const perPage = 8;

  const filtered = useMemo(() => {
    return payouts.filter((p) => {
      const status = getStatus(p);
      const matchSearch =
        (p.taskerName || '').toLowerCase().includes(state.search.toLowerCase()) ||
        p.id.toLowerCase().includes(state.search.toLowerCase());
      const matchStatus =
        state.statusFilter === "all" || status === state.statusFilter;
      return matchSearch && matchStatus;
    });
  }, [payouts, state.search, state.statusFilter, getStatus]);

  const totalPages = Math.ceil(filtered.length / perPage) || 1;
  const currentPage = Math.min(state.page, totalPages);
  const paginated = filtered.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage,
  );

  const updateState = (patch: Partial<PayoutTableState>) =>
    onStateChange({ ...state, ...patch });

  return (
    <div className="rounded-xl border border-border bg-card shadow-sm">
      <div className="border-b border-border p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-semibold text-foreground">
              All Payout Requests
            </h2>
            <p className="text-sm text-muted-foreground mt-0.5">
              {filtered.length} requests
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search taskers..."
                value={state.search}
                onChange={(e) =>
                  updateState({ search: e.target.value, page: 1 })
                }
                className="pl-9 w-full sm:w-48 h-9"
              />
            </div>
            <Select
              value={state.statusFilter}
              onValueChange={(v) =>
                updateState({
                  statusFilter: v as PayoutTableState["statusFilter"],
                  page: 1,
                })
              }
            >
              <SelectTrigger className="h-9 w-40">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table className="min-w-200">
          <TableHeader>
            <TableRow className="border-b border-border bg-muted/30">
              <TableHead className="px-5 py-3 text-xs text-muted-foreground">
                Payout ID
              </TableHead>
              <TableHead className="px-4 py-3 text-xs text-muted-foreground">
                Tasker
              </TableHead>
              <TableHead className="px-4 py-3 text-right text-xs text-muted-foreground">
                Amount
              </TableHead>
              <TableHead className="px-4 py-3 text-right text-xs text-muted-foreground">
                Gross Earnings
              </TableHead>
              <TableHead className="px-4 py-3 text-xs text-muted-foreground">
                Request Date
              </TableHead>
              <TableHead className="px-4 py-3 text-xs text-muted-foreground">
                Status
              </TableHead>
              <TableHead className="px-4 py-3 text-center text-xs text-muted-foreground">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginated.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="px-5 py-12 text-center text-sm text-muted-foreground"
                >
                  No payout requests found.
                </TableCell>
              </TableRow>
            ) : (
              paginated.map((payout, idx) => {
                const status = getStatus(payout);
                const statusCfg = statusConfig[status];
                return (
                  <TableRow
                    key={payout.id}
                    className={`border-b border-border transition-colors hover:bg-muted/20 $
                      idx % 2 === 0 ? "" : "bg-muted/10"
                    }`}
                  >
                    <TableCell className="px-5 py-3.5 text-sm font-medium text-primary font-data">
                      {payout.id}
                    </TableCell>
                    <TableCell className="px-4 py-3.5">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-8 h-8 rounded-full ${getAvatarColor(
                            payout.taskerAvatar || 'T',
                          )} flex items-center justify-center text-white text-xs font-medium shrink-0`}
                        >
                          {payout.taskerAvatar || 'T'}
                        </div>
                        <div>
                          <p className="text-sm text-foreground">
                            {payout.taskerName}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {payout.completedJobs} jobs
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="px-4 py-3.5 text-sm text-right font-semibold text-foreground font-data">
                      ${(payout.amount || 0).toFixed(2)}
                    </TableCell>
                    <TableCell className="px-4 py-3.5 text-sm text-right text-muted-foreground font-data">
                      ${(payout.earnings || 0).toFixed(2)}
                    </TableCell>
                    <TableCell className="px-4 py-3.5 text-sm text-muted-foreground font-data">
                      {payout.requestDate}
                    </TableCell>
                    <TableCell className="px-4 py-3.5">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusCfg.className}`}
                      >
                        {statusCfg.label}
                      </span>
                    </TableCell>
                    <TableCell className="px-4 py-3.5">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          type="button"
                          onClick={() => onViewDetails(payout)}
                          className="flex h-7 w-7 items-center justify-center rounded hover:bg-muted transition-colors"
                          title="View details"
                        >
                          <Eye className="size-3.5 text-muted-foreground" />
                        </button>
                        {status === "PENDING" && (
                          <>
                            <button
                              type="button"
                              onClick={() => onQuickApprove(payout)}
                              className="flex h-7 w-7 items-center justify-center rounded transition-colors hover:bg-emerald-50 dark:hover:bg-emerald-900/20"
                              title="Approve payout"
                            >
                              <Check className="size-3.5 text-emerald-600" />
                            </button>
                            <button
                              type="button"
                              onClick={() => onQuickReject(payout)}
                              className="flex h-7 w-7 items-center justify-center rounded transition-colors hover:bg-red-50 dark:hover:bg-red-900/20"
                              title="Reject payout"
                            >
                              <X className="size-3.5 text-red-500" />
                            </button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-border px-5 py-3">
          <p className="text-sm text-muted-foreground">
            Showing {(currentPage - 1) * perPage + 1}–
            {Math.min(currentPage * perPage, filtered.length)} of{" "}
            {filtered.length}
          </p>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() =>
                updateState({ page: Math.max(1, currentPage - 1) })
              }
              disabled={currentPage === 1}
              className="flex h-8 w-8 items-center justify-center rounded border border-border text-muted-foreground transition-colors hover:bg-muted disabled:opacity-40"
            >
              <ChevronLeft className="size-3.5" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => updateState({ page: p })}
                className={`flex h-8 w-8 items-center justify-center rounded border text-sm font-medium transition-colors $
                  p === currentPage
                    ? "border-primary bg-primary text-white"
                    : "border-border text-muted-foreground hover:bg-muted"
                }`}
              >
                {p}
              </button>
            ))}
            <button
              type="button"
              onClick={() =>
                updateState({
                  page: Math.min(totalPages, currentPage + 1),
                })
              }
              disabled={currentPage === totalPages}
              className="flex h-8 w-8 items-center justify-center rounded border border-border text-muted-foreground transition-colors hover:bg-muted disabled:opacity-40"
            >
              <ChevronRight className="size-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}


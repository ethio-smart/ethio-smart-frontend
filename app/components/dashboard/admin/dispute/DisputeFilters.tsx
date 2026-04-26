"use client";

import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import type { BackendDisputeStatus } from "@/app/types/types";

export default function DisputeFilters({
  search,
  setSearch,
  status,
  setStatus,
  onRefresh,
  loading,
}: {
  search: string;
  setSearch: (v: string) => void;
  status: "all" | BackendDisputeStatus;
  setStatus: (v: "all" | BackendDisputeStatus) => void;
  onRefresh: () => Promise<void>;
  loading: boolean;
}) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-4 shadow-sm lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-1 flex-wrap items-center gap-3">
        <div className="flex min-w-72 flex-1 items-center gap-2 rounded-2xl border border-border  px-4 py-2.5">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by dispute, booking, client, tasker, or reason"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border-0 bg-transparent p-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>

        <Select value={status} onValueChange={(value) => setStatus(value as "all" | BackendDisputeStatus)}>
          <SelectTrigger className="h-11 min-w-44 rounded-2xl">
            <SelectValue placeholder="Filter status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            <SelectItem value="OPEN">Open</SelectItem>
            <SelectItem value="IN_REVIEW">In review</SelectItem>
            <SelectItem value="RESOLVED">Resolved</SelectItem>
            <SelectItem value="REJECTED">Rejected</SelectItem>
            <SelectItem value="CLOSED">Closed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button type="button" variant="outline" className="rounded-2xl" onClick={() => void onRefresh()} disabled={loading}>
        {loading ? "Refreshing..." : "Refresh disputes"}
      </Button>
    </div>
  );
}
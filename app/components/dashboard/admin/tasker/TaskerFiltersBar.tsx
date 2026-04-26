"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function TaskerFiltersBar({
  search,
  onSearchChange,
  filterVerification,
  onFilterVerificationChange,
  filterStatus,
  onFilterStatusChange,
}: {
  search: string;
  onSearchChange: (value: string) => void;
  filterVerification: string;
  onFilterVerificationChange: (value: string) => void;
  filterStatus: string;
  onFilterStatusChange: (value: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-3 border-b border-border p-4">
      <div className="relative flex-1" style={{ minWidth: '200px' }}>
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search taskers..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="rounded-lg border-border bg-background pl-9 pr-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:border-primary/30 focus-visible:ring-primary/20"
        />
      </div>

      <Select
        value={filterVerification}
        onValueChange={onFilterVerificationChange}
      >
        <SelectTrigger className="h-9 border-border bg-background text-sm text-foreground" style={{ width: '170px' }}>
          <SelectValue placeholder="All Verification" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Verification</SelectItem>
          <SelectItem value="verified">Verified</SelectItem>
          <SelectItem value="unverified">Unverified</SelectItem>
          <SelectItem value="pending">Pending</SelectItem>
        </SelectContent>
      </Select>

      <Select value={filterStatus} onValueChange={onFilterStatusChange}>
        <SelectTrigger className="h-9 border-border bg-background text-sm text-foreground" style={{ width: '150px' }}>
          <SelectValue placeholder="All Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="active">Active</SelectItem>
          <SelectItem value="suspended">Suspended</SelectItem>
          <SelectItem value="pending">Pending</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}


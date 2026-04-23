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
    <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex flex-wrap gap-3">
      <div className="relative flex-1 min-w-[200px]">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <Input
          type="text"
          placeholder="Search taskers..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9 pr-4 py-2 text-sm border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 placeholder-slate-400 focus-visible:ring-teal-500/30 focus-visible:border-teal-500"
        />
      </div>

      <Select
        value={filterVerification}
        onValueChange={onFilterVerificationChange}
      >
        <SelectTrigger className="w-[170px] h-9 text-sm bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
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
        <SelectTrigger className="w-[150px] h-9 text-sm bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
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


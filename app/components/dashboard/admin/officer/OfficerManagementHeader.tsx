"use client";

import { PlusCircle, RefreshCcw } from 'lucide-react';

import { Button } from '@/components/ui/button';

export default function OfficerManagementHeader({
  totalOfficers,
  filteredCount,
  onCreate,
  onRefresh,
}: {
  totalOfficers: number;
  filteredCount: number;
  onCreate: () => void;
  onRefresh: () => void;
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="font-heading text-[22px] font-semibold text-foreground">
          Officer Management
        </h1>
        <p className="mt-0.5 text-[14px] font-caption text-muted-foreground">
          {totalOfficers} officer{totalOfficers === 1 ? '' : 's'} registered on the platform
        </p>
      </div>

      <div className="flex items-center gap-2">
        <span className="rounded-md bg-muted px-3 py-1.5 text-[12px] font-caption text-muted-foreground">
          {filteredCount} result{filteredCount === 1 ? '' : 's'}
        </span>
        <Button type="button" variant="outline" onClick={onRefresh}>
          <RefreshCcw className="mr-2 size-4" />
          Refresh
        </Button>
        <Button type="button" onClick={onCreate}>
          <PlusCircle className="mr-2 size-4" />
          Add Officer
        </Button>
      </div>
    </div>
  );
}

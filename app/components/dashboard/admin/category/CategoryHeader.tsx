'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FolderKanban, Plus, RefreshCw } from 'lucide-react';

export default function CategoryHeader({
  totalCount,
  filteredCount,
  onRefresh,
  onCreate,
}: {
  totalCount: number;
  filteredCount: number;
  onRefresh: () => void;
  onCreate: () => void;
}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <div className="flex items-center gap-2">
          <FolderKanban className="size-5 text-primary" />
          <h1 className="text-2xl font-semibold text-foreground">Category Management</h1>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">
          View and review all service categories from the backend.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="secondary" className="rounded-full px-3 py-1">
          {totalCount} total
        </Badge>
        <Badge variant="outline" className="rounded-full px-3 py-1">
          {filteredCount} shown
        </Badge>
        <Button type="button" variant="outline" size="sm" onClick={onRefresh}>
          <RefreshCw className="mr-2 size-4" />
          Refresh
        </Button>
        <Button type="button" size="sm" onClick={onCreate}>
          <Plus className="mr-2 size-4" />
          Add Category
        </Button>
      </div>
    </div>
  );
}

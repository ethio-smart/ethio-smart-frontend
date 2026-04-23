'use client';

import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function CategoryFiltersBar({
  search,
  onSearchChange,
}: {
  search: string;
  onSearchChange: (value: string) => void;
}) {
  return (
    <div className="border-b border-border bg-muted/20 p-4">
      <div className="relative w-full">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search categories by name, description, or ID..."
          className="pl-9"
        />
      </div>
    </div>
  );
}

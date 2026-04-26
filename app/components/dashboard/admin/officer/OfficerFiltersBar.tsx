"use client";

import { Search } from 'lucide-react';

import { Input } from '@/components/ui/input';

export default function OfficerFiltersBar({
  search,
  onSearchChange,
}: {
  search: string;
  onSearchChange: (value: string) => void;
}) {
  return (
    <div className="relative w-full">
      <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder="Search by name, email, phone, or role..."
        className="pl-9"
      />
    </div>
  );
}

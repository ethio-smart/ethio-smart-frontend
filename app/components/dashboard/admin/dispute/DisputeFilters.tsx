"use client";

import { Input } from "@/components/ui/input";

export default function DisputeFilters({
  search,
  setSearch,
}: {
  search: string;
  setSearch: (v: string) => void;
}) {
  return (
    <div className="flex gap-3">
      <Input
        placeholder="Search disputes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}
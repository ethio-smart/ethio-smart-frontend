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

export type SortBy = "date-desc" | "date-asc" | "price-desc" | "price-asc";

export default function BookingFiltersBar({
  search,
  onSearchChange,
  category,
  onCategoryChange,
  categories,
  sortBy,
  onSortByChange,
}: {
  search: string;
  onSearchChange: (v: string) => void;
  category: string;
  onCategoryChange: (v: string) => void;
  categories: string[];
  sortBy: SortBy;
  onSortByChange: (v: SortBy) => void;
}) {
  return (
    <div className="flex flex-wrap gap-3">
      <div className="relative flex-1 min-w-[220px]">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <Input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by ID, client, or tasker..."
          className="pl-9"
        />
      </div>

      <Select value={category} onValueChange={onCategoryChange}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          {categories.map((c) => (
            <SelectItem key={c} value={c}>
              {c === "all" ? "All Categories" : c}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={sortBy} onValueChange={(v) => onSortByChange(v as SortBy)}>
        <SelectTrigger className="w-[220px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="date-desc">Date: Newest First</SelectItem>
          <SelectItem value="date-asc">Date: Oldest First</SelectItem>
          <SelectItem value="price-desc">Price: High to Low</SelectItem>
          <SelectItem value="price-asc">Price: Low to High</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}


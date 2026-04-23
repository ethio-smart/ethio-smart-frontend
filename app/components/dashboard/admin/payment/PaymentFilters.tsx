import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

type PaymentFiltersProps = {
  search: string;
  setSearch: (value: string) => void;
  status: string;
  setStatus: (value: string) => void;
};

export default function PaymentFilters({
  search,
  setSearch,
  status,
  setStatus,
}: PaymentFiltersProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <div className="relative">
        <Search className="w-4 h-4 absolute left-3 top-2.5 text-muted-foreground" />
        <Input
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      <select value={status} onChange={(e) => setStatus(e.target.value)} className="border rounded px-3">
        <option value="all">All Status</option>
        <option value="PAID">Paid</option>
        <option value="PENDING">Pending</option>
        <option value="FAILED">Failed</option>
        <option value="REFUNDED">Refunded</option>
        <option value="COMPLETED">Completed</option>
      </select>
    </div>
  );
}
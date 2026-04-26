import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

import { Eye } from "lucide-react";
import { Payment } from "@/app/types/types";

interface Props {
  data: Payment[];
  onView: (p: Payment) => void;
}

const statusClassMap: Record<string, string> = {
  PAID: "bg-emerald-100 text-emerald-700",
  COMPLETED: "bg-emerald-100 text-emerald-700",
  PENDING: "bg-amber-100 text-amber-700",
  FAILED: "bg-red-100 text-red-700",
  REFUNDED: "bg-muted text-muted-foreground",
};

export default function PaymentTable({ data, onView }: Props) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
      <Table>
      <TableHeader>
        <TableRow className="bg-muted/30">
          <TableHead>Payment ID</TableHead>
          <TableHead>Booking ID</TableHead>
          <TableHead>Chapa Ref</TableHead>
          <TableHead className="text-right">Amount</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Date</TableHead>
          <TableHead className="text-center">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {data.map((p) => {
          const status = p.status ?? "PENDING";
          const badgeClass = statusClassMap[status] ?? "bg-muted text-muted-foreground";

          return (
            <TableRow key={p.id}>
              <TableCell className="font-medium text-primary">{p.id}</TableCell>
              <TableCell className="font-mono text-xs">{p.bookingId}</TableCell>
              <TableCell className="max-w-40 truncate text-xs text-muted-foreground">
                {p.chapaRef ?? "-"}
              </TableCell>
              <TableCell className="text-right font-medium">
                {Number(p.amount ?? 0).toLocaleString()} ETB
              </TableCell>

              <TableCell>
                <span className={`px-2 py-0.5 rounded-full text-xs ${badgeClass}`}>
                  {status}
                </span>
              </TableCell>

              <TableCell>
                {new Date(p.createdAt).toLocaleDateString(undefined, {
                  month: "short",
                  day: "2-digit",
                  year: "numeric",
                })}
              </TableCell>

              <TableCell className="text-center">
                <div className="flex justify-center gap-2">
                  <button onClick={() => onView(p)}>
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
      </Table>
    </div>
  );
}
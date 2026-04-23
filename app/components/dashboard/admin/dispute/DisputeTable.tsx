"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Avatar from "./Avatar";
import StatusBadge from "./StatusBadge";
import SeverityBadge from "./SeverityBadge";
import { Dispute } from "@/app/types/types";

export default function DisputeTable({
  data,
  onView,
  onResolve,
}: {
  data: Dispute[];
  onView: (d: Dispute) => void;
  onResolve: (d: Dispute) => void;
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Client</TableHead>
          <TableHead>Tasker</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Severity</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead />
        </TableRow>
      </TableHeader>

      <TableBody>
        {data.map((d) => (
          <TableRow key={d.id}>
            <TableCell>{d.id}</TableCell>

            <TableCell className="flex items-center gap-2">
              <Avatar initials={d.client?.avatar ?? "--"} />
              {d.client?.name ?? "Unknown Client"}
            </TableCell>

            <TableCell className="flex items-center gap-2">
              <Avatar initials={d.tasker?.avatar ?? "--"} />
              {d.tasker?.name ?? "Unknown Tasker"}
            </TableCell>

            <TableCell>
              {d.status ? <StatusBadge status={d.status} /> : <span className="text-muted-foreground">—</span>}
            </TableCell>

            <TableCell>
              {d.severity ? <SeverityBadge severity={d.severity} /> : <span className="text-muted-foreground">—</span>}
            </TableCell>

            <TableCell>${d.amount ?? 0}</TableCell>

            <TableCell className="flex gap-2">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-8 w-8 p-0 hover:bg-transparent"
                onClick={() => onView(d)}
                aria-label="View dispute"
              >
                <Eye className="w-4 h-4" aria-hidden />
              </Button>

              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-8 w-8 p-0 hover:bg-transparent"
                onClick={() => onResolve(d)}
                aria-label="Resolve dispute"
              >
                <CheckCircle className="w-4 h-4" aria-hidden />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
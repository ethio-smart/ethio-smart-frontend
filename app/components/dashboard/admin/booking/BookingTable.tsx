"use client";

import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Booking } from "@/app/(dashboard)/admin/booking-management/data";
import { statusMeta } from "@/app/(dashboard)/admin/booking-management/data";

export default function BookingTable({
  bookings,
  onView,
}: {
  bookings: Booking[];
  onView: (b: Booking) => void;
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {[
            "Booking ID",
            "Client",
            "Tasker",
            "Category",
            "Status",
            "Price",
            "Date",
            "Actions",
          ].map((h) => (
            <TableHead key={h}>{h}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {bookings.map((b) => (
          <TableRow key={b.id}>
            <TableCell className="font-mono font-medium">{b.id}</TableCell>
            <TableCell className="font-medium">{b.client}</TableCell>
            <TableCell className="font-medium">{b.tasker}</TableCell>
            <TableCell>{b.serviceCategory}</TableCell>
            <TableCell>
              <Badge variant={statusMeta[b.status].badgeVariant}>
                {statusMeta[b.status].label}
              </Badge>
            </TableCell>
            <TableCell className="font-medium">${b.price}</TableCell>
            <TableCell className="text-muted-foreground">{b.date}</TableCell>
            <TableCell>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => onView(b)}
              >
                <Eye className="mr-2 size-4" />
                View
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}


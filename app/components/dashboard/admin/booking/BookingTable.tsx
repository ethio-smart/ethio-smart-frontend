"use client";

import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { bookingStatusStyles, paymentStatusStyles } from "@/app/lib/constants/booking";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Booking } from "@/app/types/types";

export default function BookingTable({
  bookings,
  onView,
}: {
  bookings: Booking[];
  onView: (bookingId: string) => void;
}) {
  const formatDate = (value?: string) => {
    if (!value) return "-";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "-";
    return date.toLocaleDateString();
  };

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
            <TableCell className="font-medium">
              {b.user ? `${b.user.firstName} ${b.user.lastName}` : "-"}
            </TableCell>
            <TableCell className="font-medium">
              {b.tasker?.user ? `${b.tasker.user.firstName} ${b.tasker.user.lastName}` : "-"}
            </TableCell>
            <TableCell>{b.serviceRequest?.category?.name ?? "-"}</TableCell>
            <TableCell>
              <Badge className={bookingStatusStyles[b.status]}>
                {b.status}
              </Badge>
            </TableCell>
            <TableCell>
              {b.payment ? (
                <Badge className={paymentStatusStyles[b.payment.status]}>{b.payment.status}</Badge>
              ) : (
                <Badge variant="outline">UNPAID</Badge>
              )}
            </TableCell>
            <TableCell className="font-medium">ETB {b.payment?.amount ?? b.serviceRequest?.budget ?? 0}</TableCell>
            <TableCell className="text-muted-foreground">{formatDate(b.createdAt)}</TableCell>
            <TableCell>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => onView(b.id)}
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


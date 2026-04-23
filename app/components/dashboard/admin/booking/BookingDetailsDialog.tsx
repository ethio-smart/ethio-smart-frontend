"use client";

import { Calendar, Clock, DollarSign, MapPin, TriangleAlert } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Booking } from "@/app/(dashboard)/admin/booking-management/data";
import { statusMeta } from "@/app/(dashboard)/admin/booking-management/data";

export default function BookingDetailsDialog({
  booking,
  onClose,
}: {
  booking: Booking | null;
  onClose: () => void;
}) {
  return (
    <Dialog open={!!booking} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <DialogTitle className="truncate">Booking Details</DialogTitle>
              <p className="mt-1 text-xs font-mono text-muted-foreground">
                {booking?.id}
              </p>
            </div>
            {booking && (
              <Badge variant={statusMeta[booking.status].badgeVariant}>
                {statusMeta[booking.status].label}
              </Badge>
            )}
          </div>
        </DialogHeader>

        {booking && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="rounded-lg border bg-muted/30 p-3">
                <p className="text-xs text-muted-foreground">Client</p>
                <p className="mt-1 text-sm font-semibold">{booking.client}</p>
              </div>
              <div className="rounded-lg border bg-muted/30 p-3">
                <p className="text-xs text-muted-foreground">Tasker</p>
                <p className="mt-1 text-sm font-semibold">{booking.tasker}</p>
              </div>
            </div>

            <div className="rounded-lg border bg-muted/30 p-3 space-y-2 text-sm">
              <div className="flex items-center justify-between gap-3">
                <span className="flex items-center gap-2 text-muted-foreground">
                  <TriangleAlert className="size-4" />
                  Service
                </span>
                <span className="font-medium">{booking.serviceCategory}</span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="size-4" />
                  Date
                </span>
                <span className="font-medium">{booking.date}</span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="size-4" />
                  Duration
                </span>
                <span className="font-medium">{booking.duration}</span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="flex items-center gap-2 text-muted-foreground">
                  <DollarSign className="size-4" />
                  Price
                </span>
                <span className="font-semibold">${booking.price}</span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="size-4" />
                  Location
                </span>
                <span className="font-medium text-right">{booking.location}</span>
              </div>
            </div>

            <div className="rounded-lg border bg-muted/30 p-3">
              <p className="text-xs text-muted-foreground">Description</p>
              <p className="mt-1 text-sm leading-relaxed">{booking.description}</p>
            </div>

            {booking.status === "disputed" && (
              <div className="flex flex-col sm:flex-row gap-2">
                <Button variant="outline" className="w-full">
                  Escalate Dispute
                </Button>
                <Button className="w-full">Resolve &amp; Refund</Button>
              </div>
            )}

            {booking.status === "active" && (
              <Button variant="destructive" className="w-full">
                Cancel Booking
              </Button>
            )}
          </div>
        )}

        <DialogFooter showCloseButton />
      </DialogContent>
    </Dialog>
  );
}


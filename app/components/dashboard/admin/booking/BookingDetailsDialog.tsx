"use client";

import { useState } from "react";
import { Calendar, Clock, DollarSign, MapPin, TriangleAlert } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { bookingStatusStyles } from "@/app/lib/constants/booking";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Booking } from "@/app/types/types";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { useAppDispatch } from "@/app/hooks/hooks";
import { payoutAdminBooking } from "@/app/store/slices/bookingSlice";

export default function BookingDetailsDialog({
  open,
  booking,
  isLoading,
  referralDisputeId,
  onClose,
}: {
  open: boolean;
  booking: Booking | null;
  isLoading: boolean;
  referralDisputeId?: string | null;
  onClose: () => void;
}) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const locale = useLocale();
  const [isPayouting, setIsPayouting] = useState(false);
  const [isPayouted, setIsPayouted] = useState(false);

  const formatDate = (value?: string) => {
    if (!value) return "-";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "-";
    return date.toLocaleString();
  };

  const getDisputeIdFromBooking = (currentBooking: Booking | null): string | null => {
    if (!currentBooking) return null;

    const bookingLike = currentBooking as Booking & {
      disputeId?: string;
      dispute?: { id?: string } | null;
      disputes?: Array<{ id?: string }>;
    };

    return (
      referralDisputeId ??
      bookingLike.disputeId ??
      bookingLike.dispute?.id ??
      bookingLike.disputes?.[0]?.id ??
      null
    );
  };

  const handleOpenDispute = () => {
    if (!booking) return;

    const disputeId = getDisputeIdFromBooking(booking);
    const query = disputeId
      ? `?disputeId=${encodeURIComponent(disputeId)}`
      : `?bookingId=${encodeURIComponent(booking.id)}`;

    onClose();
    router.push(`/${locale}/admin/disputes${query}`);
  };

  const handlePayout = async () => {
    if (!booking) return;

    try {
      setIsPayouting(true);
      await dispatch(payoutAdminBooking(booking.id)).unwrap();
      toast.success("Booking paid out successfully");
      setIsPayouted(true);
      // refresh current route (Next.js app router)
      router.refresh();
    } catch (error) {
      toast.error(typeof error === "string" ? error : "Failed to payout booking");
    } finally {
      setIsPayouting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <DialogTitle className="truncate">Booking Details</DialogTitle>
              <p className="mt-1 text-xs font-mono text-muted-foreground">
                {booking?.id ?? "Loading..."}
              </p>
            </div>
            {booking && (
              <Badge className={bookingStatusStyles[booking.status]}>
                {booking.status}
              </Badge>
            )}
          </div>
        </DialogHeader>

        {isLoading && (
          <div className="py-12 text-center text-sm text-muted-foreground">Loading booking details...</div>
        )}

        {!isLoading && !booking && (
          <div className="py-12 text-center text-sm text-muted-foreground">Booking details not found.</div>
        )}

        {booking && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="rounded-lg border bg-muted/30 p-3">
                <p className="text-xs text-muted-foreground">Client</p>
                <p className="mt-1 text-sm font-semibold">
                  {booking.user ? `${booking.user.firstName} ${booking.user.lastName}` : "-"}
                </p>
              </div>
              <div className="rounded-lg border bg-muted/30 p-3">
                <p className="text-xs text-muted-foreground">Tasker</p>
                <p className="mt-1 text-sm font-semibold">
                  {booking.tasker?.user
                    ? `${booking.tasker.user.firstName} ${booking.tasker.user.lastName}`
                    : "-"}
                </p>
              </div>
            </div>

            <div className="rounded-lg border bg-muted/30 p-3 space-y-2 text-sm">
              <div className="flex items-center justify-between gap-3">
                <span className="flex items-center gap-2 text-muted-foreground">
                  <TriangleAlert className="size-4" />
                  Service
                </span>
                <span className="font-medium">{booking.serviceRequest?.category?.name ?? "-"}</span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="size-4" />
                  Date
                </span>
                <span className="font-medium">{formatDate(booking.serviceRequest?.preferedDate || booking.createdAt)}</span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="size-4" />
                  Duration
                </span>
                <span className="font-medium">
                  {booking.serviceRequest?.dynamicData?.duration
                    ? `${booking.serviceRequest.dynamicData.duration} min`
                    : "-"}
                </span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="flex items-center gap-2 text-muted-foreground">
                  <DollarSign className="size-4" />
                  Price
                </span>
                <span className="font-semibold">ETB {booking.payment?.amount ?? booking.serviceRequest?.budget ?? 0}</span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="size-4" />
                  Location
                </span>
                <span className="font-medium text-right">{booking.serviceRequest?.location ?? "-"}</span>
              </div>
            </div>

            <div className="rounded-lg border bg-muted/30 p-3">
              <p className="text-xs text-muted-foreground">Description</p>
              <p className="mt-1 text-sm leading-relaxed">{booking.serviceRequest?.description ?? "-"}</p>
            </div>

            {booking.status === "DISPUTED" && (
              <Button className="w-full" onClick={handleOpenDispute}>
                Open Dispute Details
              </Button>
            )}

            {booking.status === "IN_PROGRESS" && (
              <Button variant="destructive" className="w-full">
                Cancel Booking
              </Button>
            )}

            {booking.status === "CANCELLED" && (
              <Button className="w-full" onClick={handlePayout} disabled={isPayouting || isPayouted}>
                {isPayouting || isPayouted ? "Processing payout..." : "Payout Tasker"}
            {booking.status === "COMPLETED" && (
              <Button className="w-full" onClick={handlePayout} disabled={isPayouting}>
                {isPayouting ? "Processing payout..." : "Payout Tasker"}
              </Button>
            )}
          </div>
        )}

        <DialogFooter showCloseButton />
      </DialogContent>
    </Dialog>
  );
}


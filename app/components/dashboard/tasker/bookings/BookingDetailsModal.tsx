"use client";

import * as React from "react";
import { Phone, TriangleAlert } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { BookingStatus, StatusBadge } from "../StatusBadge";
import { PaymentBadge, PaymentStatus } from "../PaymentBadge";
import { BookingTimeline } from "./BookingTimeline";
import { TaskerButton } from "../TaskerButton";
import { TaskerModal } from "../TaskerModal";


export type BookingDetails = {
  id: string;
  service: string;
  clientName: string;
  location: string;
  scheduledDate: string;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  budget: number;
  clientEmail: string;
  clientPhone: string;
  notes: string;
};

export type BookingDetailsModalProps = {
  booking: BookingDetails | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  timelineSteps: readonly string[];
  getTimelineStep: (status: BookingStatus) => number;
  onRaiseDispute: (bookingId: string) => void;
  className?: string;
};

export const BookingDetailsModal = React.memo(
  ({
    booking,
    open,
    onOpenChange,
    timelineSteps,
    getTimelineStep,
    onRaiseDispute,
    className,
  }: BookingDetailsModalProps) => {
    const b = booking;
    if (!b) return null;

    return (
      <TaskerModal
        open={open}
        onOpenChange={onOpenChange}
        title="Booking Details"
        description={b.id}
        contentClassName={cn(
          "p-0 overflow-hidden max-w-lg max-h-[90vh]",
          className
        )}
      >
        <div className="p-5 space-y-5 overflow-y-auto max-h-[calc(90vh-112px)]">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 rounded-lg bg-muted/50">
              <p className="text-xs text-muted-foreground mb-1">Service</p>
              <p className="text-sm font-medium text-foreground">{b.service}</p>
            </div>
            <div className="p-3 rounded-lg bg-muted/50">
              <p className="text-xs text-muted-foreground mb-1">Budget</p>
              <p className="text-sm font-medium text-foreground font-mono">
                ${b.budget}
              </p>
            </div>
          </div>

          <div className="p-4 rounded-lg border border-border">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
              Client Information
            </p>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                {b.clientName.charAt(0)}
              </div>
              <div>
                <p className="font-medium text-foreground">{b.clientName}</p>
                <p className="text-xs text-muted-foreground">{b.clientEmail}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Phone className="h-[13px] w-[13px]" />
              {b.clientPhone}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 rounded-lg bg-muted/50">
              <p className="text-xs text-muted-foreground mb-1">Location</p>
              <p className="text-sm font-medium text-foreground">{b.location}</p>
            </div>
            <div className="p-3 rounded-lg bg-muted/50">
              <p className="text-xs text-muted-foreground mb-1">Scheduled Date</p>
              <p className="text-sm font-medium text-foreground">{b.scheduledDate}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <StatusBadge status={b.status} />
            <PaymentBadge status={b.paymentStatus} />
          </div>

          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
              Booking Timeline
            </p>
            <BookingTimeline
              steps={timelineSteps}
              currentStep={getTimelineStep(b.status)}
            />
          </div>

          {b.notes ? (
            <div className="p-3 rounded-lg bg-amber-50 border border-amber-100">
              <p className="text-xs font-medium text-amber-700 mb-1">Notes</p>
              <p className="text-sm text-amber-800">{b.notes}</p>
            </div>
          ) : null}
        </div>

        <Separator />
        <div className="flex items-center justify-between p-5">
          <TaskerButton
            tone="warning"
            className="flex items-center gap-2 px-3 py-2 rounded-lg border border-amber-300 text-amber-700 text-sm hover:bg-amber-50"
            onClick={() => onRaiseDispute(b.id)}
          >
            <TriangleAlert className="h-[14px] w-[14px]" /> Raise Dispute
          </TaskerButton>
          <TaskerButton
            className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-secondary press-effect"
            onClick={() => onOpenChange(false)}
          >
            Close
          </TaskerButton>
        </div>
      </TaskerModal>
    );
  }
);
BookingDetailsModal.displayName = "BookingDetailsModal";


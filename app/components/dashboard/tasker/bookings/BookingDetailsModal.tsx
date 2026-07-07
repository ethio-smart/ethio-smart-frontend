
'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Clock } from 'lucide-react';
import { Booking, BookingStatus } from '@/app/types/types';
import { bookingStatusStyles } from '@/app/lib/constants/booking';
import RaiseDisputeModal from '@/app/components/modal/RaiseDisputeModal';
import CompleteTaskModal from './CompleteTaskModal';
import { cleaningCompletionFields, tutoringCompletionFields } from '@/app/lib/constants/task-completion.constants';
import { useState } from 'react';
import RescheduleRequestDialog from '../../client/requests/RescheduleRequestDialog';


type Props = {
  booking: Booking;
  children: React.ReactNode;
  onComplete: (id: string) => void;
  onDispute: (id: string) => void;
};

export default function BookingDetailsModal({
  booking,
  children,
  onDispute,
}: Props) {
  if (!booking) return null;

  const status: BookingStatus = booking.status;
  // const [open, setOpen] = useState(false);
  // const paymentStatus: PaymentStatus =
  //   booking.payment?.status || 'PENDING';

  // const date=new Date(booking.serviceRequest?.preferedDate)

  const serviceDate = booking.serviceRequest?.preferedDate
    ? new Date(booking.serviceRequest.preferedDate)
    : null;
  //format date
  const formattedDate = serviceDate
    ? serviceDate.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
    : 'Date not available';

  const formattedTime = serviceDate
    ? serviceDate.toLocaleTimeString([], {
      hour: 'numeric',
      minute: '2-digit',
    })
    : 'Time not available';


  const completionFieldMap = {
    Tutoring: tutoringCompletionFields,
    Cleaning: cleaningCompletionFields,
  };

  const serviceType = booking.serviceRequest.category.name
  const fields = completionFieldMap[serviceType as keyof typeof completionFieldMap];


  return (
    <Dialog>

      <DialogTrigger asChild>
        {children}
      </DialogTrigger>

      <DialogContent className="max-w-3xl p-10">
        {/* HEADER */}
        <DialogHeader className=''>
          <div className="flex justify-between">
            <DialogTitle>Booking Details</DialogTitle>
            <Badge variant="outline" className={`${bookingStatusStyles[status]}`}>{status}</Badge>
          </div>
        </DialogHeader>


        <div className="space-y-5">
          {/* SERVICE INFO */}
          <div>
            <h2 className="text-lg font-semibold">
              {booking.serviceRequest?.tittle}
            </h2>
            <p className="text-sm text-muted-foreground">
              {booking.serviceRequest?.description}
            </p>
          </div>

          {/* INFO GRID */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            {/* client name */}
            <div className='bg-neutral-100 rounded-md p-3'>
              <p className="text-muted-foreground">Client</p>
              <p className="font-medium">
                {booking.user?.firstName}{' '}
                {booking.user?.lastName}
              </p>
            </div>
            {/* location */}
            <div className='bg-neutral-100 rounded-md p-3'>
              <p className="text-muted-foreground">Location</p>
              <p className="font-medium ">
                {booking.serviceRequest?.location}
              </p>
            </div>
            {/* budget */}
            <div className='bg-neutral-100 rounded-md p-3'>
              <p className="text-muted-foreground">Budget</p>
              <p className="font-medium">
                ETB {booking.serviceRequest?.budget}
              </p>
            </div>
            {/*prefered date and time  */}
            <div className='bg-neutral-100 rounded-md p-4'>
              <p className="text-muted-foreground">Preferred Date & Time</p>
              <p className="font-medium">{formattedDate}</p>
              <p className="font-medium text-primary">{formattedTime}</p>
            </div>

          </div>

        </div>

        {/* ACTIONS */}
        <DialogFooter className="flex justify-between gap-4">
          <RaiseDisputeModal bookingId={booking.id}>
            {(booking.TaskCompletion?.status === "ACCEPTED" ||
              booking.status === "DISPUTED") ? null : (
              <Button
                variant="outline"
                onClick={() => onDispute(booking.id)}
                className='py-5'
              >
                <AlertTriangle className="w-4 h-4 mr-2" />
                Raise Dispute
              </Button>
            )}
          </RaiseDisputeModal>
          <CompleteTaskModal
            serviceType={fields}
            bookingId={booking.id}
            fields={fields}
          // onSuccess={() => setOpen(false)}

          >
            {booking.TaskCompletion.status === "PENDING" ?
             <Button className='py-5'>Complete Task</Button>
             : ""} 

          </CompleteTaskModal>
          {booking.status === "CONFIRMED" ?
            <RescheduleRequestDialog currentSchedule={booking.serviceRequest.preferedDate} bookingId={booking.id}>
              <Button
                size="sm"
                variant="outline"
                className=" py-5  border-primary text-primary"
              >
                <Clock className="w-4 h-4 mr-2" />
                Reschedule
              </Button>
            </RescheduleRequestDialog>
            : ""}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
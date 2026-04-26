'use client';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';

import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/AppIcon';
import RaiseDisputeModal from '@/app/components/modal/RaiseDisputeModal';
    export type TxStatus = 'Pending' | 'Completed' | 'Refunded' | 'Failed';

export interface Transaction {
  id: string;
  bookingId: string;
  client: string;
  amount: number;
  platformFee: number;
  netEarnings: number;
  status: TxStatus;
  date: string;
  paymentMethod: string;
}



export const statusConfig: Record<TxStatus, { label: string; className: string }> = {
  Pending: { label: 'Pending', className: 'bg-amber-50 text-amber-700' },
  Completed: { label: 'Completed', className: 'bg-emerald-50 text-emerald-700' },
  Refunded: { label: 'Refunded', className: 'bg-blue-50 text-blue-700' },
  Failed: { label: 'Failed', className: 'bg-red-50 text-red-700' },
};
interface TransactionDetailModalProps {
  transaction: Transaction | null;
  onClose: () => void;
}

export const TransactionDetailModal = ({ transaction, onClose }: TransactionDetailModalProps) => {
  if (!transaction) return null;

  return (
    <Dialog open={!!transaction} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Transaction Details</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-3 mt-2">
          {[
            { label: 'Booking Reference', value: transaction.bookingId },
            { label: 'Client', value: transaction.client },
            { label: 'Total Amount', value: `$${transaction.amount}` },
            { label: 'Platform Fee', value: `-$${transaction.platformFee}` },
            { label: 'Net Earnings', value: `$${transaction.netEarnings}` },
            { label: 'Payment Method', value: transaction.paymentMethod },
            { label: 'Date', value: transaction.date },
            { label: 'Status', value: transaction.status },
          ].map(item => (
            <div key={item.label} className={`p-2 bg-secondary rounded-md ${item.label === 'Net Earnings' ? 'col-span-2' : ''}`}>
              <p className="text-xs text-muted-foreground">{item.label}</p>
              <p className={`text-sm mt-0.5 ${item.label === 'Net Earnings' ? 'text-emerald-600 font-mono font-semibold' : 'text-foreground'}`}>{item.value}</p>
            </div>
          ))}
        </div>

        <DialogFooter className="mt-4 justify-between flex">
          <DialogClose>

          <Button variant="outline" >Close</Button>
          </DialogClose>
          <RaiseDisputeModal>

          <button  className="flex items-center gap-2 px-3 py-2 rounded-lg border border-amber-300 text-amber-700 text-sm hover:bg-amber-50 transition-standard">
                <Icon name="ExclamationTriangleIcon" size={14} variant="outline" /> Raise Dispute
              </button>
          </RaiseDisputeModal>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
'use client';
import { DataTable } from '@/components/ui/data-table/DataTable';
import { ColumnDef } from '@tanstack/react-table';
import Icon from '@/components/ui/AppIcon';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { useState } from 'react';
import { TransactionDetailModal } from './TransactionDetailModal';

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

interface TransactionTableProps {
  transactions: Transaction[];
}

export const TransactionTable = ({ transactions }: TransactionTableProps) => {
  const [viewingTx, setViewingTx] = useState<Transaction | null>(null);

  const columns: ColumnDef<Transaction>[] = [
    { accessorKey: 'id', header: 'Transaction ID' },
    {
      accessorKey: 'bookingId',
      header: 'Booking ID',
      cell: ({ row }: { row: any }) => (
        <span className="font-mono text-blue-600">{row.original.bookingId}</span>
      ),
    },
    { accessorKey: 'client', header: 'Client' },
    { accessorKey: 'amount', header: 'Amount',
         cell: ({ row }: { row: any }) => `$${row.original.amount}` },
    {
      accessorKey: 'platformFee',
      header: 'Platform Fee',
      cell: ({ row }: { row: any }) => (
        <span className="font-mono text-red-600">-${row.original.platformFee}</span>
      ),
    },
    { accessorKey: 'netEarnings', header: 'Net Earnings',
         cell: ({ row }: { row: any }) => (
        <span className="font-mono text-emerald-600">${row.original.netEarnings}</span>
         ),},
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }: { row: any }) => (
        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusConfig[row.original.status as TxStatus].className}`}>
          {row.original.status}
        </span>
      ),
    },
    { accessorKey: 'date', header: 'Date' },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }: { row: any }) => (
        <Dialog>
          <DialogTrigger asChild>
            <button className='flex text-xs text-neutral-400 items-center gap-1'  onClick={() => setViewingTx(row.original)}>
              <Icon name="EyeIcon" size={12} /> View
            </button>
          </DialogTrigger>
        </Dialog>
      ),
    },
  ];

  return (
    <>
      <DataTable columns={columns} data={transactions} />
      <TransactionDetailModal transaction={viewingTx} onClose={() => setViewingTx(null)} />
    </>
  );
};
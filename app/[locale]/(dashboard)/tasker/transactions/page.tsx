
'use client';

import { TransactionCard } from '@/app/components/dashboard/tasker/transaction/TransactionCard';
import { TransactionTable } from '@/app/components/dashboard/tasker/transaction/TransactionTable';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';

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


const MOCK_TRANSACTIONS: Transaction[] = [
  { id: 'TX-001', bookingId: 'BK-005', client: 'Daniel Tesfaye', amount: 350, platformFee: 35, netEarnings: 315, status: 'Completed', date: '2025-03-28', paymentMethod: 'CBE Bank Transfer' },
  { id: 'TX-002', bookingId: 'BK-003', client: 'Amara Bekele', amount: 240, platformFee: 24, netEarnings: 216, status: 'Completed', date: '2025-03-22', paymentMethod: 'Mobile Money' },
  { id: 'TX-003', bookingId: 'BK-004', client: 'Tigist Haile', amount: 300, platformFee: 30, netEarnings: 270, status: 'Pending', date: '2025-03-20', paymentMethod: 'CBE Bank Transfer' },
  { id: 'TX-004', bookingId: 'BK-008', client: 'Meron Tadesse', amount: 150, platformFee: 15, netEarnings: 135, status: 'Completed', date: '2025-03-18', paymentMethod: 'Telebirr' },
  { id: 'TX-005', bookingId: 'BK-006', client: 'Hana Girma', amount: 200, platformFee: 20, netEarnings: 180, status: 'Refunded', date: '2025-03-15', paymentMethod: 'CBE Bank Transfer' },
  { id: 'TX-006', bookingId: 'BK-007', client: 'Yonas Alemu', amount: 90, platformFee: 9, netEarnings: 81, status: 'Failed', date: '2025-03-10', paymentMethod: 'Mobile Money' },
  { id: 'TX-007', bookingId: 'BK-001', client: 'Sarah Johnson', amount: 180, platformFee: 18, netEarnings: 162, status: 'Pending', date: '2025-04-01', paymentMethod: 'Telebirr' },
  { id: 'TX-008', bookingId: 'BK-002', client: 'Michael Chen', amount: 120, platformFee: 12, netEarnings: 108, status: 'Completed', date: '2025-04-02', paymentMethod: 'CBE Bank Transfer' },
];

export default function TransactionsPage() {
  const [statusFilter, setStatusFilter] = useState<TxStatus | 'All'>('All');
  const filtered = MOCK_TRANSACTIONS.filter(t => statusFilter === 'All' || t.status === statusFilter);

  const totalEarnings = MOCK_TRANSACTIONS.filter(t => t.status === 'Completed').reduce((sum, t) => sum + t.netEarnings, 0);
  const pendingPayouts = MOCK_TRANSACTIONS.filter(t => t.status === 'Pending').reduce((sum, t) => sum + t.netEarnings, 0);
  const completedCount = MOCK_TRANSACTIONS.filter(t => t.status === 'Completed').length;

  return (
    <div className="min-h-screen p-4 lg:p-6 space-y-5">
      <h1 className="text-xl font-bold text-foreground">Transactions</h1>

      <TransactionCard cards={[
        { label: 'Total Earnings', value: `$${totalEarnings}`, icon: 'BanknotesIcon', color: 'text-emerald-600', bg: 'bg-emerald-50', desc: 'Net earnings from completed jobs' },
        { label: 'Pending Payouts', value: `$${pendingPayouts}`, icon: 'ClockIcon', color: 'text-amber-600', bg: 'bg-amber-50', desc: 'Awaiting payment processing' },
        { label: 'Completed Transactions', value: completedCount.toString(), icon: 'CheckCircleIcon', color: 'text-blue-600', bg: 'bg-blue-50', desc: 'Successfully processed payments' },
      ]} />

     <div className="bg-card rounded-lg border border-border p-4">
  <Select
    value={statusFilter}
    onValueChange={value => setStatusFilter(value as TxStatus | "All")}
  >
    <SelectTrigger className="">
      <SelectValue placeholder="All Statuses" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="All">All Statuses</SelectItem>
      <SelectItem value="Pending">Pending</SelectItem>
      <SelectItem value="Completed">Completed</SelectItem>
      <SelectItem value="Refunded">Refunded</SelectItem>
      <SelectItem value="Failed">Failed</SelectItem>
    </SelectContent>
  </Select>
</div>

      <TransactionTable transactions={filtered} />
    </div>
  );
}
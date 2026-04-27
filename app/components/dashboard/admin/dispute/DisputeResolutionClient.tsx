'use client';

import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';

import type { BackendDisputeStatus, Dispute, DisputeResolutionBody } from '@/app/types/types';
import { useAppDispatch, useAppSelector } from '@/app/hooks/hooks';
import {
  fetchAdminDisputeById,
  fetchAdminDisputes,
  resolveAdminDispute,
} from '@/app/store/slices/adminDisputesSlice';

import DisputeTable from './DisputeTable';
import DisputeFilters from './DisputeFilters';
import DisputeStats from './DisputeStats';
import DetailModal from './DetailModal';
import ResolveModal from './ResolveModal';

const matchesSearch = (dispute: Dispute, query: string) => {
  const q = query.toLowerCase();
  const raisedBy = dispute.User_Dispute_raisedByIdToUser ?? dispute.booking?.user;
  const against = dispute.User_Dispute_againstUserIdToUser ?? dispute.booking?.tasker?.user;

  const haystack = [
    dispute.id,
    dispute.bookingId,
    dispute.reason,
    dispute.description ?? '',
    raisedBy ? `${raisedBy.firstName} ${raisedBy.lastName}` : '',
    raisedBy?.email ?? '',
    against ? `${against.firstName} ${against.lastName}` : '',
    against?.email ?? '',
  ]
    .join(' ')
    .toLowerCase();

  return haystack.includes(q);
};

const getStatusLabel = (status?: BackendDisputeStatus) => (status ?? 'OPEN').toUpperCase();

export default function DisputeResolutionClient() {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const disputeIdParam = searchParams.get('disputeId');
  const bookingIdParam = searchParams.get('bookingId');
  const { disputes, loadingList, actionLoading, error } = useAppSelector(
    (state) => state.adminDisputes,
  ) as {
    disputes: Dispute[];
    loadingList: boolean;
    actionLoading: boolean;
    error: string | null;
  };

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | BackendDisputeStatus>('all');
  const [selectedDispute, setSelectedDispute] = useState<Dispute | null>(null);
  const [resolveDispute, setResolveDispute] = useState<Dispute | null>(null);

  useEffect(() => {
    dispatch(fetchAdminDisputes());
  }, [dispatch]);

  useEffect(() => {
    if (loadingList) return;

    if (disputeIdParam) {
      const existing = disputes.find((dispute) => dispute.id === disputeIdParam);
      if (existing) {
        setSelectedDispute(existing);
        return;
      }

      dispatch(fetchAdminDisputeById(disputeIdParam))
        .unwrap()
        .then((dispute) => {
          if (dispute) setSelectedDispute(dispute as Dispute);
        })
        .catch(() => {
          // no-op: error state is handled by slice
        });
      return;
    }

    if (bookingIdParam) {
      const match = disputes.find((dispute) => dispute.bookingId === bookingIdParam);
      if (match) setSelectedDispute(match);
    }
  }, [bookingIdParam, dispatch, disputeIdParam, disputes, loadingList]);

  const filtered = useMemo(() => {
    return disputes.filter((dispute) => {
      const matchSearch = matchesSearch(dispute, search);
      const matchStatus = statusFilter === 'all' || getStatusLabel(dispute.status) === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [disputes, search, statusFilter]);

  useEffect(() => {
    if (selectedDispute && !filtered.some((dispute) => dispute.id === selectedDispute.id)) {
      setSelectedDispute(null);
    }
  }, [filtered, selectedDispute]);

  const stats = useMemo(
    () => ({
      total: disputes.length,
      open: disputes.filter((dispute) => getStatusLabel(dispute.status) === 'OPEN').length,
      resolved: disputes.filter((dispute) => getStatusLabel(dispute.status) === 'RESOLVED').length,
      rejected: disputes.filter((dispute) => getStatusLabel(dispute.status) === 'REJECTED').length,
      partialRefunds: disputes.filter((dispute) => dispute.resolution === 'PARTIAL_REFUND').length,
    }),
    [disputes],
  );

  const refreshDisputes = async () => {
    await dispatch(fetchAdminDisputes()).unwrap();
  };

  const handleResolve = (dispute: Dispute) => {
    setResolveDispute(dispute);
  };

  const confirmResolve = async (body: DisputeResolutionBody) => {
    if (!resolveDispute) return;

    await dispatch(
      resolveAdminDispute({
        disputeId: resolveDispute.id,
        body,
      }),
    ).unwrap();

    setResolveDispute(null);
    await refreshDisputes();
  };

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-foreground">Dispute Resolution</h1>
        <p className="text-sm text-muted-foreground">
          Review live disputes, inspect booking context, and submit an admin resolution.
        </p>
      </div>

      <DisputeStats stats={stats} />

      <DisputeFilters
        search={search}
        setSearch={setSearch}
        status={statusFilter}
        setStatus={setStatusFilter}
        onRefresh={refreshDisputes}
        loading={loadingList}
      />

      {error ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 shadow-sm dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-300">
          {error}
        </div>
      ) : null}

      {loadingList ? (
        <div className="rounded-3xl border border-border bg-card p-10 text-center text-sm text-muted-foreground shadow-sm">
          Loading disputes...
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-border bg-card p-12 text-center shadow-sm">
          <p className="text-lg font-semibold text-foreground">No disputes found</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Try a different search term or status filter.
          </p>
        </div>
      ) : (
        <DisputeTable data={filtered} onView={setSelectedDispute} onResolve={handleResolve} />
      )}

      <DetailModal
        dispute={selectedDispute}
        onClose={() => setSelectedDispute(null)}
        onResolve={handleResolve}
      />
      <ResolveModal
        dispute={resolveDispute}
        onClose={() => setResolveDispute(null)}
        onConfirm={confirmResolve}
        actionLoading={actionLoading}
      />
    </div>
  );
}
'use client';

import { useEffect, useMemo, useState } from 'react';
import { BadgeCheck, Clock3, FileText, MapPin, Video } from 'lucide-react';

import PendingTaskerDetails from '@/app/components/dashboard/admin/pending-taskers/PendingTaskerDetails';
import PendingTaskerList from '@/app/components/dashboard/admin/pending-taskers/PendingTaskerList';
import PendingTaskersHeader from '@/app/components/dashboard/admin/pending-taskers/PendingTaskersHeader';
import RejectTaskerDialog from '@/app/components/dashboard/admin/pending-taskers/RejectTaskerDialog';
import type {
  PendingTaskerStat,
  TaskerApplicationStatus,
} from '@/app/components/dashboard/admin/pending-taskers/types';
import { useAppDispatch, useAppSelector } from '@/app/hooks/hooks';
import type { Tasker } from '@/app/types/types';
import {
  fetchPendingAdminTaskers,
  fetchRejectedAdminTaskers,
  rejectAdminTasker,
  verifyAdminTasker,
} from '@/app/store/slices/adminTaskersSlice';

export default function PendingTaskersPage() {
  const dispatch = useAppDispatch();
  const {
    pendingTaskers,
    rejectedTaskers,
    loadingPending,
    loadingRejected,
    actionLoading,
    error,
  } = useAppSelector(
    (state) => state.adminTaskers,
  ) as {
    pendingTaskers: Tasker[];
    rejectedTaskers: Tasker[];
    loadingPending: boolean;
    loadingRejected: boolean;
    actionLoading: boolean;
    error: string | null;
  };

  const [status, setStatus] = useState<TaskerApplicationStatus>('pending');
  const [search, setSearch] = useState('');
  const [selectedTaskerId, setSelectedTaskerId] = useState<string | null>(null);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [rejectTargetId, setRejectTargetId] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchPendingAdminTaskers());
    dispatch(fetchRejectedAdminTaskers());
  }, [dispatch]);

  useEffect(() => {
    setSelectedTaskerId(null);
  }, [status]);

  const sourceTaskers = status === 'rejected' ? rejectedTaskers : pendingTaskers;

  const filteredTaskers = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return sourceTaskers;

    return sourceTaskers.filter((tasker) => {
      const name = `${tasker.user?.firstName ?? ''} ${tasker.user?.lastName ?? ''}`.toLowerCase();
      const email = (tasker.user?.email ?? '').toLowerCase();
      const location = (tasker.location ?? '').toLowerCase();
      const bio = (tasker.bio ?? '').toLowerCase();
      const languages = (tasker.languages ?? []).join(' ').toLowerCase();
      const certifications = (tasker.certifications ?? []).join(' ').toLowerCase();

      return [name, email, location, bio, languages, certifications].some((field) =>
        field.includes(query),
      );
    });
  }, [sourceTaskers, search]);

  const effectiveSelectedTaskerId = useMemo(() => {
    if (!filteredTaskers.length) return null;
    if (selectedTaskerId && filteredTaskers.some((tasker) => tasker.id === selectedTaskerId)) {
      return selectedTaskerId;
    }
    return filteredTaskers[0].id;
  }, [filteredTaskers, selectedTaskerId]);

  const selectedTasker = useMemo(
    () => sourceTaskers.find((tasker) => tasker.id === effectiveSelectedTaskerId) ?? null,
    [effectiveSelectedTaskerId, sourceTaskers],
  );

  const stats = useMemo<PendingTaskerStat[]>(() => {
    const uniqueLocations = new Set(
      sourceTaskers.map((tasker) => tasker.location ?? '').filter(Boolean),
    ).size;
    const verifiedIds = sourceTaskers.filter((tasker) => tasker.isVerified).length;
    const withResume = sourceTaskers.filter((tasker) => Boolean(tasker.resumeUrl)).length;
    const withVideo = sourceTaskers.filter((tasker) => Boolean(tasker.proposalVideoUrl)).length;

    const primaryLabel = status === 'rejected' ? 'Rejected profiles' : 'Pending profiles';
    const primaryHelper =
      status === 'rejected'
        ? 'Applications rejected by admin review'
        : 'Requests waiting for admin review';

    return [
      {
        label: primaryLabel,
        value: sourceTaskers.length.toLocaleString(),
        helper: primaryHelper,
        icon: <Clock3 className="h-5 w-5 text-primary" />,
        accent: 'bg-primary/10',
      },
      {
        label: 'ID verified',
        value: verifiedIds.toLocaleString(),
        helper: 'National ID already confirmed',
        icon: <BadgeCheck className="h-5 w-5 text-primary" />,
        accent: 'bg-primary/10',
      },
      {
        label: 'With resume',
        value: withResume.toLocaleString(),
        helper: 'Taskers that uploaded a CV',
        icon: <FileText className="h-5 w-5 text-primary" />,
        accent: 'bg-primary/10',
      },
      {
        label: 'With video intro',
        value: withVideo.toLocaleString(),
        helper: 'Applications with proposal video',
        icon: <Video className="h-5 w-5 text-primary" />,
        accent: 'bg-primary/10',
      },
      {
        label: 'Locations',
        value: uniqueLocations.toLocaleString(),
        helper: 'Cities represented in the queue',
        icon: <MapPin className="h-5 w-5 text-primary" />,
        accent: 'bg-primary/10',
      },
    ];
  }, [sourceTaskers, status]);

  const refreshApplications = async () => {
    if (status === 'rejected') {
      await dispatch(fetchRejectedAdminTaskers()).unwrap();
      return;
    }

    await dispatch(fetchPendingAdminTaskers()).unwrap();
  };

  const handleVerify = async (taskerId: string) => {
    await dispatch(verifyAdminTasker(taskerId)).unwrap();
    await refreshApplications();
    await dispatch(fetchRejectedAdminTaskers());
  };

  const openRejectDialog = (taskerId: string) => {
    setRejectTargetId(taskerId);
    setRejectReason('');
    setRejectDialogOpen(true);
  };

  const closeRejectDialog = () => {
    setRejectDialogOpen(false);
    setRejectTargetId(null);
    setRejectReason('');
  };

  const handleReject = async () => {
    if (!rejectTargetId) return;

    await dispatch(
      rejectAdminTasker({
        taskerId: rejectTargetId,
        reason: rejectReason.trim() || undefined,
      }),
    ).unwrap();

    closeRejectDialog();
    await refreshApplications();
    await dispatch(fetchRejectedAdminTaskers());
  };

  const isLoadingCurrent = status === 'rejected' ? loadingRejected : loadingPending;
  const emptyTitle =
    status === 'rejected'
      ? 'No rejected applications right now'
      : 'No pending taskers right now';
  const emptySubtitle = search
    ? 'Try a different keyword or clear the search to see the full queue.'
    : status === 'rejected'
      ? 'Rejected tasker applications will appear here after admin review.'
      : 'All applications have been reviewed for the moment.';

  return (
    <div className="space-y-6">
      <PendingTaskersHeader
        search={search}
        onSearchChange={setSearch}
        stats={stats}
        loadingPending={isLoadingCurrent}
        status={status}
        onStatusChange={setStatus}
        onRefresh={refreshApplications}
      />

      {error ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 shadow-sm dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-300">
          {error}
        </div>
      ) : null}

      {isLoadingCurrent ? (
        <div className="rounded-3xl border border-border bg-card p-10 text-center text-sm text-muted-foreground shadow-sm">
          {status === 'rejected' ? 'Loading rejected applications...' : 'Loading pending applications...'}
        </div>
      ) : filteredTaskers.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-border bg-card p-12 text-center shadow-sm">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
            <BadgeCheck className="h-7 w-7" />
          </div>
          <h2 className="mt-4 text-xl font-semibold text-foreground">{emptyTitle}</h2>
          <p className="mt-2 text-sm text-muted-foreground">{emptySubtitle}</p>
        </div>
      ) : (
        <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <PendingTaskerList
            taskers={filteredTaskers}
            status={status}
            selectedTaskerId={effectiveSelectedTaskerId}
            actionLoading={actionLoading}
            onSelectTasker={setSelectedTaskerId}
            onVerifyTasker={status === 'pending' ? handleVerify : undefined}
            onRejectTasker={status === 'pending' ? openRejectDialog : undefined}
          />
          <PendingTaskerDetails
            tasker={selectedTasker}
            status={status}
            actionLoading={actionLoading}
            onVerifyTasker={status === 'pending' ? handleVerify : undefined}
            onRejectTasker={status === 'pending' ? openRejectDialog : undefined}
          />
        </div>
      )}

      {status === 'pending' ? (
        <RejectTaskerDialog
          open={rejectDialogOpen}
          actionLoading={actionLoading}
          reason={rejectReason}
          onReasonChange={setRejectReason}
          onClose={closeRejectDialog}
          onConfirm={handleReject}
        />
      ) : null}
    </div>
  );
}

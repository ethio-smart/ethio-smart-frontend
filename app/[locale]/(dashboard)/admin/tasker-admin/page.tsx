'use client';

import { useEffect, useMemo, useState } from 'react';

import ConfirmActionDialog from '@/app/components/dashboard/admin/tasker/ConfirmActionDialog';
import HeaderAndTabs from '@/app/components/dashboard/admin/tasker/HeaderAndTabs';
import PendingApprovalsList from '@/app/components/dashboard/admin/tasker/PendingApprovalsList';
import TaskerDetailDialog from '@/app/components/dashboard/admin/tasker/TaskerDetailDialog';
import TaskerFiltersBar from '@/app/components/dashboard/admin/tasker/TaskerFiltersBar';
import TaskerTable from '@/app/components/dashboard/admin/tasker/TaskerTable';
import type {
  AdminTasker,
  AdminTaskerStatus,
  AdminVerificationStatus,
  PendingTasker,
} from '@/app/types/types';
import { useAppDispatch, useAppSelector } from '@/app/hooks/hooks';
import type { Tasker as BackendTasker } from '@/app/types/types';
import {
  fetchAdminTaskerById,
  fetchAdminTaskers,
  fetchPendingAdminTaskers,
  rejectAdminTasker,
  suspendAdminTasker,
  unsuspendAdminTasker,
  verifyAdminTasker,
} from '@/app/store/slices/adminTaskersSlice';

const formatDate = (iso?: string) => {
  if (!iso) return '-';
  return new Date(iso).toLocaleDateString(undefined, {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  });
};

const getInitials = (firstName?: string, lastName?: string) =>
  `${firstName?.[0] ?? ''}${lastName?.[0] ?? ''}`.toUpperCase() || 'T';

const mapStatus = (status: BackendTasker['status']): AdminTaskerStatus => {
  switch (status) {
    case 'APPROVED':
      return 'active';
    case 'SUSPENDED':
      return 'suspended';
    case 'PENDING':
    case 'REJECTED':
    default:
      return 'pending';
  }
};

const mapVerification = (tasker: BackendTasker): AdminVerificationStatus => {
  if (tasker.status === 'REJECTED') return 'rejected';
  if (tasker.isVerified) return 'verified';
  if (tasker.status === 'PENDING') return 'pending';
  return 'unverified';
};

const toAdminTasker = (tasker: BackendTasker): AdminTasker => ({
  id: tasker.id,
  name: `${tasker.user?.firstName ?? ''} ${tasker.user?.lastName ?? ''}`.trim() || 'Unknown Tasker',
  avatar: getInitials(tasker.user?.firstName, tasker.user?.lastName),
  email: tasker.user?.email ?? '-',
  skills:
    tasker.services?.map((service) => service.title).filter(Boolean) ??
    tasker.languages ??
    [],
  rating: Number(tasker.rating ?? 0),
  completedJobs: Number(tasker.totalReviews ?? 0),
  status: mapStatus(tasker.status),
  verificationStatus: mapVerification(tasker),
  joinedDate: formatDate(tasker.createdAt),
  location: tasker.location ?? undefined,
  bio: tasker.bio ?? undefined,
});

const toPendingTasker = (tasker: BackendTasker): PendingTasker => ({
  id: tasker.id,
  name: `${tasker.user?.firstName ?? ''} ${tasker.user?.lastName ?? ''}`.trim() || 'Unknown Tasker',
  avatar: getInitials(tasker.user?.firstName, tasker.user?.lastName),
  skills:
    tasker.services?.map((service) => service.title).filter(Boolean) ??
    tasker.languages ??
    [],
  email: tasker.user?.email ?? '-',
  submittedDate: formatDate(tasker.createdAt),
  backgroundCheck: tasker.status === 'REJECTED' ? 'failed' : tasker.isVerified ? 'passed' : 'pending',
  idVerified: tasker.isVerified,
  bio: tasker.bio ?? '',
});

export default function TaskerAdministrationPage() {
  const dispatch = useAppDispatch();
  const {
    taskers,
    pendingTaskers,
    selectedTasker,
    loadingList,
    loadingPending,
    loadingDetail,
    actionLoading,
    error,
  } = useAppSelector((state) => state.adminTaskers);

  const [search, setSearch] = useState('');
  const [filterVerification, setFilterVerification] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [activeTab, setActiveTab] = useState<'all' | 'pending'>('all');
  const [selectedTaskerView, setSelectedTaskerView] =
    useState<AdminTasker | null>(null);
  const [confirmAction, setConfirmAction] = useState<{
    type: 'approve' | 'reject';
    id: string;
  } | null>(null);

  useEffect(() => {
    dispatch(fetchAdminTaskers());
    dispatch(fetchPendingAdminTaskers());
  }, [dispatch]);

  useEffect(() => {
    if (selectedTasker) {
      setSelectedTaskerView(toAdminTasker(selectedTasker));
    }
  }, [selectedTasker]);

  const taskerRows = useMemo(() => taskers.map(toAdminTasker), [taskers]);

  const pendingRows = useMemo(
    () => pendingTaskers.map(toPendingTasker),
    [pendingTaskers],
  );

  const filteredTaskers = useMemo(
    () =>
      taskerRows.filter((tasker) => {
        const query = search.toLowerCase();
        const matchSearch =
          tasker.name.toLowerCase().includes(query) ||
          tasker.email.toLowerCase().includes(query);
        const matchVerification =
          filterVerification === 'all' ||
          tasker.verificationStatus === filterVerification;
        const matchStatus =
          filterStatus === 'all' || tasker.status === filterStatus;

        return matchSearch && matchVerification && matchStatus;
      }),
    [taskerRows, search, filterVerification, filterStatus],
  );

  const refreshTaskers = async () => {
    await Promise.all([
      dispatch(fetchAdminTaskers()).unwrap(),
      dispatch(fetchPendingAdminTaskers()).unwrap(),
    ]);
  };

  const handleView = async (tasker: AdminTasker) => {
    setSelectedTaskerView(tasker);
    try {
      await dispatch(fetchAdminTaskerById(tasker.id)).unwrap();
    } catch {
      // keep the list row data in the modal if detail endpoint fails
    }
  };

  const handleSuspend = async (taskerId: string) => {
    const tasker = taskerRows.find((item) => item.id === taskerId);
    const isSuspended = tasker?.status === 'suspended';

    if (isSuspended) {
      await dispatch(unsuspendAdminTasker(taskerId)).unwrap();
    } else {
      await dispatch(suspendAdminTasker(taskerId)).unwrap();
    }

    await refreshTaskers();
  };

  const handleApprove = async (taskerId: string) => {
    await dispatch(verifyAdminTasker(taskerId)).unwrap();
    setConfirmAction(null);
    await refreshTaskers();
  };

  const handleReject = async (taskerId: string) => {
    await dispatch(rejectAdminTasker({ taskerId })).unwrap();
    setConfirmAction(null);
    await refreshTaskers();
  };

  return (
    <div className="space-y-5">
      <HeaderAndTabs
        pendingCount={pendingRows.length}
        taskerCount={taskerRows.length}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {(loadingList || loadingPending) && (
        <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
          Loading tasker data...
        </div>
      )}

      {activeTab === 'all' && (
        <div className=" rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
          <TaskerFiltersBar
            search={search}
            onSearchChange={setSearch}
            filterVerification={filterVerification}
            onFilterVerificationChange={setFilterVerification}
            filterStatus={filterStatus}
            onFilterStatusChange={setFilterStatus}
          />
          <TaskerTable
            taskers={filteredTaskers}
            onView={handleView}
            onToggleSuspend={handleSuspend}
          />
          {filteredTaskers.length === 0 && !loadingList && (
            <div className="py-12 text-center text-slate-400 dark:text-slate-500 text-sm">
              No taskers found matching your filters.
            </div>
          )}
        </div>
      )}

      {activeTab === 'pending' && (
        <PendingApprovalsList
          pendingTaskers={pendingRows}
          onApprove={(id) => setConfirmAction({ type: 'approve', id })}
          onReject={(id) => setConfirmAction({ type: 'reject', id })}
        />
      )}

      <TaskerDetailDialog
        tasker={selectedTaskerView}
        onClose={() => setSelectedTaskerView(null)}
        onToggleSuspend={handleSuspend}
      />

      <ConfirmActionDialog
        type={confirmAction?.type ?? 'approve'}
        open={!!confirmAction}
        onCancel={() => setConfirmAction(null)}
        onConfirm={async () => {
          if (!confirmAction || actionLoading) return;
          if (confirmAction.type === 'approve') {
            await handleApprove(confirmAction.id);
          } else {
            await handleReject(confirmAction.id);
          }
        }}
      />

      {(loadingDetail || actionLoading) && (
        <div className="fixed bottom-4 right-4 rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs text-slate-600 shadow-sm">
          Processing request...
        </div>
      )}
    </div>
  );
}

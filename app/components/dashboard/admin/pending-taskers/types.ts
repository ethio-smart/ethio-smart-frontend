import type { ReactNode } from 'react';

import type { Tasker } from '@/app/types/types';

export type TaskerApplicationStatus = 'pending' | 'rejected';

export type PendingTaskerStat = {
  label: string;
  value: string;
  helper: string;
  icon: ReactNode;
  accent: string;
};

export type PendingTaskerListProps = {
  taskers: Tasker[];
  status: TaskerApplicationStatus;
  selectedTaskerId: string | null;
  actionLoading: boolean;
  onSelectTasker: (taskerId: string) => void;
  onVerifyTasker?: (taskerId: string) => Promise<void>;
  onRejectTasker?: (taskerId: string) => void;
};

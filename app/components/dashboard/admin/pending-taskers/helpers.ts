import type { Tasker } from '@/app/types/types';

export const formatDate = (value?: string | null) => {
  if (!value) return '-';
  return new Date(value).toLocaleDateString(undefined, {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  });
};

export const getInitials = (tasker: Tasker) =>
  `${tasker.user?.firstName?.[0] ?? ''}${tasker.user?.lastName?.[0] ?? ''}`.toUpperCase() ||
  'T';

export const formatCurrency = (value?: number | null) => {
  const amount = Number(value ?? 0);
  return `${amount.toLocaleString()} ETB`;
};

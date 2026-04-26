'use client';

import { useEffect } from 'react';

import DashboardOverviewHeader from '@/app/components/dashboard/admin/dashboard/DashboardOverviewHeader';
import OverviewCharts from '@/app/components/dashboard/admin/dashboard/OverviewCharts';
import RecentBookingsTable from '@/app/components/dashboard/admin/dashboard/RecentBookingsTable';
import RecentPaymentsTable from '@/app/components/dashboard/admin/dashboard/RecentPaymentsTable';
import StatCardsGrid from '@/app/components/dashboard/admin/dashboard/StatCardsGrid';
import { useAppDispatch, useAppSelector } from '@/app/hooks/hooks';
import {
  fetchAdminAnalyticsMonthly,
  fetchAdminAnalyticsMonthlySeries,
  fetchAdminAnalyticsOverview,
  fetchAdminAnalyticsWeekly,
  fetchAdminAnalyticsWeeklySeries,
} from '@/app/store/slices/adminAnalyticsSlice';

export default function DashboardOverviewPage() {
  const dispatch = useAppDispatch();
  const {
    error,
    loadingOverview,
    loadingWeekly,
    loadingMonthly,
    loadingWeeklySeries,
    loadingMonthlySeries,
  } = useAppSelector((state) => state.adminAnalytics);

  useEffect(() => {
    dispatch(fetchAdminAnalyticsOverview());
    dispatch(fetchAdminAnalyticsWeekly());
    dispatch(fetchAdminAnalyticsMonthly());
    dispatch(fetchAdminAnalyticsWeeklySeries(8));
    dispatch(fetchAdminAnalyticsMonthlySeries(6));
  }, [dispatch]);

  const isLoading =
    loadingOverview ||
    loadingWeekly ||
    loadingMonthly ||
    loadingWeeklySeries ||
    loadingMonthlySeries;

  return (
    <>
      <DashboardOverviewHeader />

      {error && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {isLoading && (
        <div className="mb-4 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
          Loading dashboard analytics...
        </div>
      )}

      <div className="mb-6">
        <StatCardsGrid />
      </div>

      <div className="mb-6">
        <OverviewCharts />
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <RecentBookingsTable />
        <RecentPaymentsTable />
      </div>
    </>
  );
}

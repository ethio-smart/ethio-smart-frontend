'use client';

import { useEffect } from 'react';
import { Sparkles } from 'lucide-react';

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
    loadingOverview 
    loadingWeekly 
    loadingMonthly 
    loadingWeeklySeries 
    loadingMonthlySeries;

  return (
    <div className="space-y-6">
      <section className="relative overflow-hidden rounded-[2rem] border border-border bg-linear-to-br from-primary/15 via-secondary to-card p-6 shadow-sm lg:p-8">
        <div className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />
        <div className="pointer-events-none absolute -left-10 -bottom-10 h-40 w-40 rounded-full bg-primary/10 blur-2xl" />
        <div className="relative z-10 flex items-start justify-between gap-4">
          <DashboardOverviewHeader />
          <div className="hidden items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary sm:inline-flex">
            <Sparkles className="h-3.5 w-3.5" />
            Live analytics
          </div>
        </div>
      </section>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {isLoading && (
        <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
          Loading dashboard analytics...
        </div>
      )}

      <div>
        <StatCardsGrid />
      </div>

      <div>
        <OverviewCharts />
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-12">
        <div className="xl:col-span-7">
          <RecentBookingsTable />
        </div>
        <div className="xl:col-span-5">
          <RecentPaymentsTable />
        </div>
      </div>
    </div>
  );
}
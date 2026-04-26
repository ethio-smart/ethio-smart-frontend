import { Loader2, Search, ShieldCheck } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import type { PendingTaskerStat, TaskerApplicationStatus } from './types';

function StatCard({
  label,
  value,
  helper,
  icon,
  accent,
}: PendingTaskerStat) {
  return (
    <div className="rounded-3xl border border-border/60 bg-card p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="mt-2 text-2xl font-semibold text-foreground">{value}</p>
          <p className="mt-1 text-xs text-muted-foreground">{helper}</p>
        </div>
        <div className={`rounded-2xl p-3 ${accent}`}>{icon}</div>
      </div>
    </div>
  );
}

export default function PendingTaskersHeader({
  search,
  onSearchChange,
  stats,
  loadingPending,
  status,
  onStatusChange,
  onRefresh,
}: {
  search: string;
  stats: PendingTaskerStat[];
  loadingPending: boolean;
  status: TaskerApplicationStatus;
  onStatusChange: (value: TaskerApplicationStatus) => void;
  onRefresh: () => Promise<void>;
}) {
  const isRejected = status === 'rejected';

  return (
    <section className="overflow-hidden rounded-[2rem] border border-border bg-card shadow-sm">
      <div className="grid gap-6 p-6 lg:grid-cols-[1.2fr_0.8fr] lg:p-8">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-semibold tracking-wide text-primary">
            <ShieldCheck className="h-4 w-4" />
            Admin review queue
          </div>

          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Tasker Applications
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground md:text-base">
              Review all applicant states in one place, from pending requests to rejected submissions.
            </p>
          </div>

          <div className="inline-flex w-fit items-center gap-1 rounded-2xl border border-border bg-background p-1 shadow-sm">
            <Button
              type="button"
              size="sm"
              variant={isRejected ? 'ghost' : 'secondary'}
              className="rounded-xl"
              onClick={() => onStatusChange('pending')}
            >
              Pending
            </Button>
            <Button
              type="button"
              size="sm"
              variant={isRejected ? 'secondary' : 'ghost'}
              className="rounded-xl"
              onClick={() => onStatusChange('rejected')}
            >
              Rejected
            </Button>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex min-w-70 flex-1 items-center gap-3 rounded-2xl border border-border bg-background px-4 py-3">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                value={search}
                onChange={(event) => onSearchChange(event.target.value)}
                placeholder={
                  isRejected
                    ? 'Search rejected applicants by name, email, city or language...'
                    : 'Search pending applicants by name, email, city or language...'
                }
                className="border-0 bg-transparent p-0 text-foreground placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>
            <Button
              type="button"
              
              onClick={() => void onRefresh()}
              disabled={loadingPending}
              className="rounded-2xl"
            >
              {loadingPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Refresh queue
            </Button>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {stats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}

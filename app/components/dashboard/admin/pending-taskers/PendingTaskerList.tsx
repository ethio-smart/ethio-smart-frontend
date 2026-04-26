import { Building2, CheckCircle2, Clock3, Loader2, Mail, MapPin, Star, XCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { formatDate, getInitials } from './helpers';
import type { PendingTaskerListProps } from './types';

const renderTagList = (items: string[]) => {
  if (!items.length) {
    return <span className="text-xs text-muted-foreground">No data provided</span>;
  }

  return items.map((item) => (
    <span
      key={item}
      className="rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground"
    >
      {item}
    </span>
  ));
};

export default function PendingTaskerList({
  taskers,
  status,
  selectedTaskerId,
  actionLoading,
  onSelectTasker,
  onVerifyTasker,
  onRejectTasker,
}: PendingTaskerListProps) {
  const isRejected = status === 'rejected';

  return (
    <section className="rounded-[2rem] border border-border bg-card shadow-sm">
      <div className="flex items-center justify-between gap-3 border-b border-border px-5 py-4">
        <div>
          <h2 className="text-base font-semibold text-foreground">Application Queue</h2>
          <p className="text-sm text-muted-foreground">
            {taskers.length} tasker request{taskers.length === 1 ? '' : 's'} available for review
          </p>
        </div>
      </div>

      <div className="divide-y divide-border">
        {taskers.map((tasker) => {
          const selected = tasker.id === selectedTaskerId;
          const fullName =
            `${tasker.user?.firstName ?? ''} ${tasker.user?.lastName ?? ''}`.trim() ||
            'Unknown Tasker';

          return (
            <div
              key={tasker.id}
              className={`cursor-pointer px-5 py-4 transition-all duration-200 hover:bg-muted/20 $
                selected ? 'bg-secondary ring-1 ring-inset ring-border' : ''
              }`}
              onClick={() => onSelectTasker(tasker.id)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  onSelectTasker(tasker.id);
                }
              }}
              role="button"
              tabIndex={0}
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="flex gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-primary to-primary/80 text-base font-bold text-primary-foreground shadow-sm">
                    {getInitials(tasker)}
                  </div>

                  <div className="min-w-0 space-y-2">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-base font-semibold text-foreground">{fullName}</h3>
                        {isRejected ? (
                          <span className="rounded-full border border-red-200 bg-red-50 px-2.5 py-1 text-[11px] font-semibold text-red-700 dark:border-red-900/40 dark:bg-red-950/20 dark:text-red-300">
                            Rejected
                          </span>
                        ) : (
                          <span className="rounded-full bg-secondary px-2.5 py-1 text-[11px] font-semibold text-secondary-foreground">
                            Pending review
                          </span>
                        )}
                      </div>
                      <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                        <span className="inline-flex items-center gap-1.5">
                          <Mail className="h-3.5 w-3.5" />
                          {tasker.user?.email ?? 'No email'}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <MapPin className="h-3.5 w-3.5" />
                          {tasker.location ?? 'Location not provided'}
                        </span>
                      </div>
                    </div>

                    <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
                      {tasker.bio ?? 'No bio was submitted for this application.'}
                    </p>

                    <div className="flex flex-wrap gap-2">{renderTagList(tasker.languages ?? [])}</div>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5">
                        <Clock3 className="h-3.5 w-3.5" />
                        Submitted {formatDate(tasker.createdAt)}
                      </span>
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5">
                        <Star className="h-3.5 w-3.5" />
                        {Number(tasker.rating ?? 0).toFixed(1)} rating
                      </span>
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5">
                        <Building2 className="h-3.5 w-3.5" />
                        {tasker.certifications?.length ?? 0} certifications
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex shrink-0 flex-wrap items-center gap-2 lg:justify-end">
                  <Button
                    type="button"
                    variant="outline"
                    className="rounded-2xl"
                    onClick={(event) => {
                      event.stopPropagation();
                      onSelectTasker(tasker.id);
                    }}
                  >
                    View details
                  </Button>
                  {!isRejected ? (
                    <>
                      <Button
                        type="button"
                        variant="outline"
                        className="rounded-2xl border-primary/30 bg-primary/10 text-primary hover:bg-primary/15"
                        disabled={actionLoading || !onVerifyTasker}
                        onClick={(event) => {
                          event.stopPropagation();
                          if (onVerifyTasker) {
                            void onVerifyTasker(tasker.id);
                          }
                        }}
                      >
                        {actionLoading && selectedTaskerId === tasker.id ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          <CheckCircle2 className="mr-2 h-4 w-4" />
                        )}
                        Verify
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        className="rounded-2xl border-red-200 bg-red-50 text-red-700 hover:bg-red-100 dark:border-red-900/40 dark:bg-red-950/20 dark:text-red-300"
                        disabled={actionLoading || !onRejectTasker}
                        onClick={(event) => {
                          event.stopPropagation();
                          if (onRejectTasker) {
                            onRejectTasker(tasker.id);
                          }
                        }}
                      >
                        <XCircle className="mr-2 h-4 w-4" />
                        Reject
                      </Button>
                    </>
                  ) : (
                    <span className="inline-flex items-center rounded-2xl border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-700 dark:border-red-900/40 dark:bg-red-950/20 dark:text-red-300">
                      Rejected application
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

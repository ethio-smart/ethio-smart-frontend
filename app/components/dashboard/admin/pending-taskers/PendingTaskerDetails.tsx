import {
  Building2,
  CheckCircle2,
  ExternalLink,
  FileText,
  Globe2,
  Loader2,
  ShieldCheck,
  XCircle,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import type { Tasker } from '@/app/types/types';
import type { TaskerApplicationStatus } from './types';

import { formatCurrency, formatDate, getInitials } from './helpers';

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border bg-muted/20 p-4">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">{label}</p>
      <p className="mt-2 text-sm font-medium text-foreground">{value}</p>
    </div>
  );
}

export default function PendingTaskerDetails({
  tasker,
  status,
  actionLoading,
  onVerifyTasker,
  onRejectTasker,
}: {
  tasker: Tasker | null;
  status: TaskerApplicationStatus;
  actionLoading: boolean;
  onVerifyTasker?: (taskerId: string) => Promise<void>;
  onRejectTasker?: (taskerId: string) => void;
}) {
  const isRejected = status === 'rejected';

  if (!tasker) {
    return (
      <section className="rounded-[2rem] border border-border bg-card shadow-sm">
        <div className="flex h-full min-h-130 items-center justify-center p-8 text-center">
          <div className="max-w-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-secondary text-muted-foreground">
              <ShieldCheck className="h-8 w-8" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-foreground">Select a tasker request</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Pick a row from the queue to review the full profile, documents,
              and account details.
            </p>
          </div>
        </div>
      </section>
    );
  }

  const fullName = `${tasker.user?.firstName ?? ''} ${tasker.user?.lastName ?? ''}`.trim() || 'Unknown Tasker';

  return (
    <section className="rounded-[2rem] border border-border bg-card shadow-sm">
      <div className="space-y-6 p-5 md:p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-linear-to-br from-primary to-primary/80 text-xl font-bold text-primary-foreground shadow-sm">
              {getInitials(tasker)}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-xl font-semibold text-foreground">{fullName}</h2>
                {isRejected ? (
                  <span className="rounded-full border border-red-200 bg-red-50 px-2.5 py-1 text-[11px] font-semibold text-red-700 dark:border-red-900/40 dark:bg-red-950/20 dark:text-red-300">
                    Rejected
                  </span>
                ) : (
                  <span className="rounded-full bg-secondary px-2.5 py-1 text-[11px] font-semibold text-secondary-foreground">
                    Pending decision
                  </span>
                )}
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                {tasker.user?.email ?? 'No email provided'}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {tasker.languages?.length
                  ? tasker.languages.map((language) => (
                      <span
                        key={language}
                        className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground"
                      >
                        {language}
                      </span>
                    ))
                  : null}
              </div>
            </div>
          </div>

          {!isRejected ? (
            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                className="rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90"
                disabled={actionLoading || !onVerifyTasker}
                onClick={() => {
                  if (onVerifyTasker) {
                    void onVerifyTasker(tasker.id);
                  }
                }}
              >
                {actionLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <CheckCircle2 className="mr-2 h-4 w-4" />}
                Verify tasker
              </Button>
              <Button
                type="button"
                variant="outline"
                className="rounded-2xl border-red-200 bg-red-50 text-red-700 hover:bg-red-100 dark:border-red-900/40 dark:bg-red-950/20 dark:text-red-300"
                disabled={actionLoading || !onRejectTasker}
                onClick={() => {
                  if (onRejectTasker) {
                    onRejectTasker(tasker.id);
                  }
                }}
              >
                <XCircle className="mr-2 h-4 w-4" />
                Reject request
              </Button>
            </div>
          ) : (
            <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 dark:border-red-900/40 dark:bg-red-950/20 dark:text-red-300">
              This application is currently rejected.
            </div>
          )}
        </div>

        <Separator className="bg-border" />

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          <InfoRow label="Location" value={tasker.location ?? 'Not provided'} />
          <InfoRow label="Submitted" value={formatDate(tasker.createdAt)} />
          <InfoRow label="Updated" value={formatDate(tasker.updatedAt)} />
          <InfoRow label="Bank" value={tasker.bankName ?? 'No bank added'} />
          <InfoRow label="Account number" value={tasker.bankAccountNumber ?? 'Not provided'} />
          <InfoRow label="National ID" value={tasker.nationalIdNumber ?? 'Not provided'} />
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-3xl border border-border bg-muted/20 p-5">
            <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <Globe2 className="h-4 w-4 text-primary" />
              About the tasker
            </div>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              {tasker.bio ?? 'The applicant did not include a bio.'}
            </p>
          </div>

          <div className="rounded-3xl border border-border bg-muted/20 p-5">
            <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <ShieldCheck className="h-4 w-4 text-primary" />
              Verification checklist
            </div>
            <div className="mt-4 space-y-3 text-sm text-muted-foreground">
              <div className="flex items-center justify-between gap-3 rounded-2xl bg-card px-4 py-3 shadow-sm">
                <span>Identity verified</span>
                <span className="font-semibold text-primary">{tasker.isVerified ? 'Yes' : 'No'}</span>
              </div>
              <div className="flex items-center justify-between gap-3 rounded-2xl bg-card px-4 py-3 shadow-sm">
                <span>Availability</span>
                <span className="font-semibold text-foreground">
                  {tasker.availability ? 'Available' : 'Unavailable'}
                </span>
              </div>
              <div className="flex items-center justify-between gap-3 rounded-2xl bg-card px-4 py-3 shadow-sm">
                <span>Rating</span>
                <span className="font-semibold text-foreground">{Number(tasker.rating ?? 0).toFixed(1)}</span>
              </div>
              <div className="flex items-center justify-between gap-3 rounded-2xl bg-card px-4 py-3 shadow-sm">
                <span>Total reviews</span>
                <span className="font-semibold text-foreground">{tasker.totalReviews ?? 0}</span>
              </div>
              <div className="flex items-center justify-between gap-3 rounded-2xl bg-card px-4 py-3 shadow-sm">
                <span>Total earnings</span>
                <span className="font-semibold text-foreground">{formatCurrency(tasker.totalEarnings)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-3xl border border-border bg-muted/20 p-5">
            <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <Building2 className="h-4 w-4 text-primary" />
              Certifications
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {tasker.certifications?.length ? (
                tasker.certifications.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground"
                  >
                    {item}
                  </span>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No certifications were provided.</p>
              )}
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-muted/20 p-5">
            <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <FileText className="h-4 w-4 text-primary" />
              Documents and media
            </div>
            <div className="mt-4 space-y-3 text-sm text-muted-foreground">
              <div className="flex items-center justify-between rounded-2xl bg-card px-4 py-3 shadow-sm">
                <span>Resume</span>
                {tasker.resumeUrl ? (
                  <a
                    href={tasker.resumeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 font-semibold text-primary hover:underline"
                  >
                    Open resume
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                ) : (
                  <span className="font-semibold text-muted-foreground">Not uploaded</span>
                )}
              </div>
              <div className="flex items-center justify-between rounded-2xl bg-card px-4 py-3 shadow-sm">
                <span>Proposal video</span>
                {tasker.proposalVideoUrl ? (
                  <a
                    href={tasker.proposalVideoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 font-semibold text-primary hover:underline"
                  >
                    Watch video
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                ) : (
                  <span className="font-semibold text-muted-foreground">Not uploaded</span>
                )}
              </div>
              <div className="flex items-center justify-between rounded-2xl bg-card px-4 py-3 shadow-sm">
                <span>Services</span>
                <span className="font-semibold text-foreground">{tasker.services?.length ?? 0}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

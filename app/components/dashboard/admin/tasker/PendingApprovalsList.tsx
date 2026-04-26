"use client";

import { ShieldAlert, ShieldCheck, IdCard, Check, X } from "lucide-react";
import type { PendingTasker } from "@/app/types/types";

export default function PendingApprovalsList({
  pendingTaskers,
  onApprove,
  onReject,
}: {
  pendingTaskers: PendingTasker[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}) {
  if (pendingTaskers.length === 0) {
    return (
      <div className="rounded-xl border border-border bg-card p-12 text-center">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400">
          <Check className="h-6 w-6" />
        </div>
        <p className="font-medium text-muted-foreground">
          All caught up! No pending approvals.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {pendingTaskers.map((tasker) => (
        <div
          key={tasker.id}
          className="rounded-xl border border-border bg-card p-5 shadow-sm transition-shadow duration-200 hover:shadow-md"
        >
          <div className="flex flex-wrap gap-4 items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                {tasker.avatar}
              </div>
              <div>
                <h3 className="text-sm font-bold text-foreground">
                  {tasker.name}
                </h3>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {tasker.email}
                </p>
                <p className="mt-2 max-w-md text-xs text-muted-foreground">
                  {tasker.bio}
                </p>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {tasker.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-border bg-secondary px-2 py-0.5 text-xs text-secondary-foreground"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2 items-end">
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span
                  className={`flex items-center gap-1 font-medium ${
                    tasker.backgroundCheck === "passed"
                      ? "text-emerald-600 dark:text-emerald-400"
                      : tasker.backgroundCheck === "failed"
                      ? "text-red-600"
                      : "text-amber-600"
                  }`}
                >
                  {tasker.backgroundCheck === "passed" ? (
                    <ShieldCheck className="w-3.5 h-3.5" />
                  ) : (
                    <ShieldAlert className="w-3.5 h-3.5" />
                  )}
                  Background: {tasker.backgroundCheck}
                </span>
                <span
                  className={`flex items-center gap-1 font-medium ${
                    tasker.idVerified
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-red-600 dark:text-red-400"
                  }`}
                >
                  <IdCard className="w-3.5 h-3.5" />
                  ID: {tasker.idVerified ? "Verified" : "Not Verified"}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                Submitted {tasker.submittedDate}
              </p>
              <div className="flex gap-2 mt-1">
                <button
                  type="button"
                  onClick={() => onReject(tasker.id)}
                  className="flex items-center gap-1.5 rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-xs font-semibold text-red-600 transition-colors duration-150 hover:bg-red-100 dark:border-red-900/40 dark:bg-red-950/20 dark:text-red-400 dark:hover:bg-red-900/40"
                >
                  <X className="w-3.5 h-3.5" />
                  Reject
                </button>
                <button
                  type="button"
                  onClick={() => onApprove(tasker.id)}
                  className="flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-sm transition-colors duration-150 hover:bg-primary/90"
                >
                  <Check className="w-3.5 h-3.5" />
                  Approve
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}


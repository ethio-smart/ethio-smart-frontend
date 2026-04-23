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
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-12 text-center">
        <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mx-auto mb-3">
          <Check className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
        </div>
        <p className="text-slate-600 dark:text-slate-400 font-medium">
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
          className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm p-5 hover:shadow-md transition-shadow duration-200"
        >
          <div className="flex flex-wrap gap-4 items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-linear-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-sm font-bold shrink-0">
                {tasker.avatar}
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">
                  {tasker.name}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  {tasker.email}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 max-w-md">
                  {tasker.bio}
                </p>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {tasker.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 text-xs rounded-full bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-400 border border-teal-100 dark:border-teal-800"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2 items-end">
              <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
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
              <p className="text-xs text-slate-400">
                Submitted {tasker.submittedDate}
              </p>
              <div className="flex gap-2 mt-1">
                <button
                  type="button"
                  onClick={() => onReject(tasker.id)}
                  className="px-4 py-2 text-xs font-semibold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors duration-150 flex items-center gap-1.5"
                >
                  <X className="w-3.5 h-3.5" />
                  Reject
                </button>
                <button
                  type="button"
                  onClick={() => onApprove(tasker.id)}
                  className="px-4 py-2 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg transition-colors duration-150 shadow-sm flex items-center gap-1.5"
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


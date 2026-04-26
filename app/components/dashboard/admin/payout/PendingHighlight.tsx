"use client";

import { AlertTriangle, Check, X } from "lucide-react";
import type { Payout } from "@/app/types/types";
import { getAvatarColor } from "../data";

export default function PendingHighlight({
  pendingPayouts,
  onQuickApprove,
  onQuickReject,
}: {
  pendingPayouts: Payout[];
  onQuickApprove: (p: Payout) => void;
  onQuickReject: (p: Payout) => void;
}) {
  if (pendingPayouts.length === 0) return null;

  return (
    <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
      <div className="flex items-center gap-2 mb-3">
        <AlertTriangle className="size-4 text-amber-600 dark:text-amber-400" />
        <h3 className="text-sm font-semibold text-amber-800 dark:text-amber-300">
          {pendingPayouts.length} Payout Requests Awaiting Review
        </h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {pendingPayouts.slice(0, 4).map((p) => (
          <div
            key={p.id}
            className="flex items-center gap-2 bg-white dark:bg-card border border-amber-200 dark:border-amber-800 rounded-lg px-3 py-2"
          >
            <div
              className={`w-6 h-6 rounded-full ${getAvatarColor(
                p.taskerAvatar,
              )} flex items-center justify-center text-white text-xs font-medium`}
            >
              {p.taskerAvatar}
            </div>
            <div>
              <p className="text-xs font-medium text-foreground">
                {p.tasker}
              </p>
              <p className="text-xs text-muted-foreground font-data">
                ${p.amount.toFixed(2)}
              </p>
            </div>
            <div className="flex gap-1 ml-2">
              <button
                type="button"
                onClick={() => onQuickApprove(p)}
                className="w-6 h-6 flex items-center justify-center rounded bg-emerald-100 dark:bg-emerald-900/30 hover:bg-emerald-200 dark:hover:bg-emerald-900/50 transition-standard"
                title="Quick approve"
              >
                <Check className="size-3 text-emerald-600" />
              </button>
              <button
                type="button"
                onClick={() => onQuickReject(p)}
                className="w-6 h-6 flex items-center justify-center rounded bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-900/50 transition-standard"
                title="Quick reject"
              >
                <X className="size-3 text-red-600" />
              </button>
            </div>
          </div>
        ))}
        {pendingPayouts.length > 4 && (
          <div className="flex items-center px-3 py-2 text-xs text-amber-700 dark:text-amber-400">
            +{pendingPayouts.length - 4} more
          </div>
        )}
      </div>
    </div>
  );
}


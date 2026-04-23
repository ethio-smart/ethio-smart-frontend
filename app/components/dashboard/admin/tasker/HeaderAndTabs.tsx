"use client";

import { BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HeaderAndTabs({
  pendingCount,
  taskerCount,
  activeTab,
  onTabChange,
}: {
  pendingCount: number;
  taskerCount: number;
  activeTab: "all" | "pending";
  onTabChange: (tab: "all" | "pending") => void;
}) {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-800 dark:text-slate-100">
            Tasker Administration
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Manage tasker profiles, verifications, and approvals
          </p>
        </div>
        <div className="flex items-center gap-2">
          {pendingCount > 0 && (
            <span className="flex items-center gap-1.5 text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200 dark:bg-amber-900/20 dark:border-amber-800 dark:text-amber-400 px-3 py-1.5 rounded-full">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              {pendingCount} Pending Approvals
            </span>
          )}
        </div>
      </div>

      <div className="flex gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg w-fit">
        {(["all", "pending"] as const).map((tab) => (
          <Button
            key={tab}
            type="button"
            size="sm"
            variant="ghost"
            onClick={() => onTabChange(tab)}
            className={`px-4 py-1.5 h-auto rounded-md text-sm font-medium transition-all duration-200 ${
              activeTab === tab
                ? "bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 shadow-sm"
                : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
            }`}
          >
            {tab === "all"
              ? `All Taskers (${taskerCount})`
              : `Pending Approvals (${pendingCount})`}
            {tab === "pending" && pendingCount > 0 && (
              <BadgeCheck className="ml-1.5 w-3.5 h-3.5 text-amber-500" />
            )}
          </Button>
        ))}
      </div>
    </div>
  );
}


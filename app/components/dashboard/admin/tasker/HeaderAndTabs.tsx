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
          <h1 className="text-xl font-bold text-foreground">
            Tasker Administration
          </h1>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Manage tasker profiles, verifications, and approvals
          </p>
        </div>
        <div className="flex items-center gap-2">
          {pendingCount > 0 && (
            <span className="flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700 dark:border-amber-900/40 dark:bg-amber-950/20 dark:text-amber-400">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              {pendingCount} Pending Approvals
            </span>
          )}
        </div>
      </div>

      <div className="flex w-fit gap-1 rounded-lg border border-border bg-muted p-1">
        {(["all", "pending"] as const).map((tab) => (
          <Button
            key={tab}
            type="button"
            size="sm"
            variant="ghost"
            onClick={() => onTabChange(tab)}
            className={`px-4 py-1.5 h-auto rounded-md text-sm font-medium transition-all duration-200 ${
              activeTab === tab
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
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


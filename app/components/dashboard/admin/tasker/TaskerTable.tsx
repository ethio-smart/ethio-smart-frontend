"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import type { AdminTasker } from "@/app/types/types";
import { statusColors, verificationColors } from "../data";
import StarRating from "./StarRating";

export default function TaskerTable({
  taskers,
  onView,
  onToggleSuspend,
}: {
  taskers: AdminTasker[];
  onView: (t: AdminTasker) => void;
  onToggleSuspend: (id: string) => void;
}) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <Table className="w-full">
          <TableHeader>
            <TableRow className="bg-slate-50 dark:bg-slate-800/50">
              {[
                "Tasker",
                "Skills",
                "Rating",
                "Completed Jobs",
                "Status",
                "Verification",
                "Actions",
              ].map((h) => (
                <TableHead
                  key={h}
                  className="px-4 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider whitespace-nowrap"
                >
                  {h}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-slate-100 dark:divide-slate-800">
            {taskers.map((tasker) => (
              <TableRow
                key={tasker.id}
                className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors duration-150"
              >
                <TableCell className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-linear-to-br from-teal-400 to-emerald-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
                      {tasker.avatar}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                        {tasker.name}
                      </p>
                      <p className="text-xs text-slate-400">{tasker.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="px-4 py-3">
                  <div className="flex flex-wrap gap-1 max-w-45">
                    {tasker.skills.slice(0, 2).map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 text-xs rounded-full bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-400 border border-teal-100 dark:border-teal-800"
                      >
                        {skill}
                      </span>
                    ))}
                    {tasker.skills.length > 2 && (
                      <span className="px-2 py-0.5 text-xs rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500">
                        +{tasker.skills.length - 2}
                      </span>
                    )}
                  </div>
                </TableCell>
                <TableCell className="px-4 py-3">
                  <StarRating rating={tasker.rating} />
                </TableCell>
                <TableCell className="px-4 py-3">
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    {tasker.completedJobs.toLocaleString()}
                  </span>
                </TableCell>
                <TableCell className="px-4 py-3">
                  <span
                    className={`px-2.5 py-1 text-xs font-semibold rounded-full ${statusColors[tasker.status]}`}
                  >
                    {tasker.status.charAt(0).toUpperCase() +
                      tasker.status.slice(1)}
                  </span>
                </TableCell>
                <TableCell className="px-4 py-3">
                  <span
                    className={`px-2.5 py-1 text-xs font-semibold rounded-full ${verificationColors[tasker.verificationStatus]}`}
                  >
                    {tasker.verificationStatus
                      .charAt(0)
                      .toUpperCase() +
                      tasker.verificationStatus.slice(1)}
                  </span>
                </TableCell>
                <TableCell className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      size="xs"
                      variant="outline"
                      className="text-xs font-medium text-teal-700 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/20 border-teal-200 dark:border-teal-800 hover:bg-teal-100 dark:hover:bg-teal-900/40"
                      onClick={() => onView(tasker)}
                    >
                      View
                    </Button>
                    <Button
                      type="button"
                      size="xs"
                      variant="outline"
                      className={`text-xs font-medium rounded-lg border transition-colors duration-150 ${
                        tasker.status === "suspended"
                          ? "text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100"
                          : "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 hover:bg-red-100"
                      }`}
                      onClick={() => onToggleSuspend(tasker.id)}
                    >
                      {tasker.status === "suspended"
                        ? "Unsuspend"
                        : "Suspend"}
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}


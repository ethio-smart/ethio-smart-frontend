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
    <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
      <div className="overflow-x-auto">
        <Table className="w-full">
          <TableHeader>
            <TableRow className="bg-muted/30">
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
                  className="whitespace-nowrap px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                >
                  {h}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-border">
            {taskers.map((tasker) => (
              <TableRow
                key={tasker.id}
                className="transition-colors duration-150 hover:bg-muted/20"
              >
                <TableCell className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                      {tasker.avatar}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        {tasker.name}
                      </p>
                      <p className="text-xs text-muted-foreground">{tasker.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="px-4 py-3">
                  <div className="flex flex-wrap gap-1 max-w-45">
                    {tasker.skills.slice(0, 2).map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full border border-border  px-2 py-0.5 text-xs text-secondary-foreground"
                      >
                        {skill}
                      </span>
                    ))}
                    {tasker.skills.length > 2 && (
                      <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                        +{tasker.skills.length - 2}
                      </span>
                    )}
                  </div>
                </TableCell>
                <TableCell className="px-4 py-3">
                  <StarRating rating={tasker.rating} />
                </TableCell>
                <TableCell className="px-4 py-3">
                  <span className="text-sm font-semibold text-foreground">
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
                      className="border-border bg-background text-xs font-medium text-primary hover:bg-muted"
                      onClick={() => onView(tasker)}
                    >
                      View
                    </Button>
                    <Button
                      type="button"
                      size="xs"
                      variant="outline"
                      className={`rounded-lg border text-xs font-medium transition-colors duration-150 ${
                        tasker.status === "suspended"
                            ? "border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                            : "border-red-200 bg-red-50 text-red-600 hover:bg-red-100"
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


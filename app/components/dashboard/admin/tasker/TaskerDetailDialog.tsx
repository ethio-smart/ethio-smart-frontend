"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import type { AdminTasker } from "@/app/types/types";
import { statusColors, verificationColors } from "../data";

export default function TaskerDetailDialog({
  tasker,
  onClose,
  onToggleSuspend,
}: {
  tasker: AdminTasker | null;
  onClose: () => void;
  onToggleSuspend: (id: string) => void;
}) {
  if (!tasker) return null;

  return (
    <Dialog open={!!tasker} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-lg">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0">
          <DialogTitle className="text-lg font-bold">
            Tasker Details
          </DialogTitle>
          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="h-8 w-8"
            onClick={onClose}
          >
            <X className="w-4 h-4" aria-hidden />
          </Button>
        </DialogHeader>

        <div className="space-y-4 pt-2">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-linear-to-br from-teal-400 to-emerald-500 flex items-center justify-center text-white text-xl font-bold">
              {tasker.avatar}
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground">
                {tasker.name}
              </h3>
              <p className="text-sm text-muted-foreground">{tasker.email}</p>
              <div className="flex items-center gap-2 mt-1">
                <span
                  className={`px-2 py-0.5 text-xs font-semibold rounded-full ${statusColors[tasker.status]}`}
                >
                  {tasker.status}
                </span>
                <span
                  className={`px-2 py-0.5 text-xs font-semibold rounded-full ${verificationColors[tasker.verificationStatus]}`}
                >
                  {tasker.verificationStatus}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-xl border border-border bg-muted/20 p-3 text-center">
              <p className="text-xl font-bold text-foreground">
                {tasker.rating}
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">Rating</p>
            </div>
            <div className="rounded-xl border border-border bg-muted/20 p-3 text-center">
              <p className="text-xl font-bold text-foreground">
                {tasker.completedJobs}
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">Jobs Done</p>
            </div>
            <div className="rounded-xl border border-border bg-muted/20 p-3 text-center">
              <p className="mt-1 text-xs font-semibold text-foreground">
                {tasker.joinedDate}
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">Joined</p>
            </div>
          </div>

          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Skills
            </p>
            <div className="flex flex-wrap gap-1.5">
              {tasker.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-border bg-secondary px-2.5 py-1 text-xs text-secondary-foreground"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              className={`flex-1 py-2.5 text-sm font-semibold rounded-xl border transition-colors duration-150 ${
                tasker.status === "suspended"
                  ? "text-emerald-700 bg-emerald-50 border-emerald-200 hover:bg-emerald-100"
                  : "text-red-600 bg-red-50 border-red-200 hover:bg-red-100"
              }`}
              onClick={() => {
                onToggleSuspend(tasker.id);
                onClose();
              }}
            >
              {tasker.status === "suspended"
                ? "Unsuspend Tasker"
                : "Suspend Tasker"}
            </Button>
            <Button
              type="button"
              className="flex-1 py-2.5 text-sm font-semibold"
              onClick={onClose}
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}


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
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">
                {tasker.name}
              </h3>
              <p className="text-sm text-slate-400">{tasker.email}</p>
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
            <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-3 text-center">
              <p className="text-xl font-bold text-slate-800 dark:text-slate-100">
                {tasker.rating}
              </p>
              <p className="text-xs text-slate-500 mt-0.5">Rating</p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-3 text-center">
              <p className="text-xl font-bold text-slate-800 dark:text-slate-100">
                {tasker.completedJobs}
              </p>
              <p className="text-xs text-slate-500 mt-0.5">Jobs Done</p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-3 text-center">
              <p className="text-xs font-semibold text-slate-600 dark:text-slate-300 mt-1">
                {tasker.joinedDate}
              </p>
              <p className="text-xs text-slate-500 mt-0.5">Joined</p>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
              Skills
            </p>
            <div className="flex flex-wrap gap-1.5">
              {tasker.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-2.5 py-1 text-xs rounded-full bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-400 border border-teal-100 dark:border-teal-800"
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


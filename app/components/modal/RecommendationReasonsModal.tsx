"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  reasons: string[];
}

export default function RecommendationReasonsModal({
  open,
  onOpenChange,
  reasons,
}: Props) {
  if (!reasons || reasons.length === 0) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="space-y-4 max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-green-700">
            Why this match?
          </DialogTitle>
        </DialogHeader>

        <div className="bg-green-50 border border-green-200 rounded-md p-3 space-y-2">
          {reasons.map((reason, i) => (
            <p key={i} className="text-sm text-green-600">
              ✔ {reason}
            </p>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
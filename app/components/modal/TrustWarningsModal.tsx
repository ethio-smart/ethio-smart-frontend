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
  warnings: string[];
}

export default function TrustWarningsModal({
  open,
  onOpenChange,
  warnings,
}: Props) {
  if (!warnings || warnings.length === 0) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="space-y-4 max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-red-600">
            ⚠️ Trust Warnings
          </DialogTitle>
        </DialogHeader>

        <div className="bg-red-50 border border-red-200 rounded-md p-3 space-y-2">
          {warnings.map((warn, i) => (
            <p key={i} className="text-sm text-red-600">
              • {warn}
            </p>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
import { Loader2, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';

export default function RejectTaskerDialog({
  open,
  actionLoading,
  reason,
  onReasonChange,
  onClose,
  onConfirm,
}: {
  open: boolean;
  actionLoading: boolean;
  reason: string;
  onReasonChange: (value: string) => void;
  onClose: () => void;
  onConfirm: () => Promise<void>;
}) {
  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Reject tasker request</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 pt-2">
          <p className="text-sm leading-6 text-muted-foreground">
            You can add a short reason for the rejection. The reason is optional,
            but it helps with future audits.
          </p>

          <Textarea
            value={reason}
            onChange={(event) => onReasonChange(event.target.value)}
            placeholder="Example: Missing certifications or incomplete identity documents"
            className="min-h-35 rounded-2xl"
          />

          <div className="flex items-center justify-end gap-3 pt-1">
            <Button type="button" variant="outline" className="rounded-2xl" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              className="rounded-2xl"
              disabled={actionLoading}
              onClick={() => void onConfirm()}
            >
              {actionLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <X className="mr-2 h-4 w-4" />
              )}
              Confirm rejection
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

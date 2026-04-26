'use client';

import { Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import type { Category } from '@/app/types/types';

export default function CategoryDeleteDialog({
  category,
  open,
  loading,
  onClose,
  onConfirm,
}: {
  category: Category | null;
  open: boolean;
  loading: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={(value) => !value && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Trash2 className="size-5 text-red-600" />
            Delete Category
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Are you sure you want to delete{' '}
            <span className="font-semibold text-foreground">{category?.name}</span>?
            This action cannot be undone.
          </p>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              disabled={loading}
              onClick={onConfirm}
            >
              {loading ? 'Deleting...' : 'Delete Category'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

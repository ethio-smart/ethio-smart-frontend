'use client';

import { CalendarDays, Hash, FolderKanban, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import type { Category } from '@/app/types/types';

const formatDate = (value?: string) =>
  value
    ? new Date(value).toLocaleDateString(undefined, {
        month: 'long',
        day: '2-digit',
        year: 'numeric',
      })
    : '—';

export default function CategoryDetailDialog({
  category,
  open,
  loading,
  onClose,
}: {
  category: Category | null;
  open: boolean;
  loading: boolean;
  onClose: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={(value) => !value && onClose()}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FolderKanban className="size-5 text-primary" />
            Category Details
          </DialogTitle>
          <DialogDescription>
            Backend category details for administration and service mapping.
          </DialogDescription>
        </DialogHeader>

        {loading ? (
          <div className="py-10 text-center text-sm text-muted-foreground">
            Loading category details...
          </div>
        ) : category ? (
          <div className="space-y-4">
            <div className="rounded-xl border bg-muted/20 p-4 space-y-3">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">Name</p>
                  <h3 className="mt-1 text-xl font-semibold text-foreground">{category.name}</h3>
                </div>
                <Badge variant="secondary" className="rounded-full px-3 py-1">
                  Active
                </Badge>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="rounded-lg border bg-background p-3">
                  <p className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Hash className="size-4" />
                    Category ID
                  </p>
                  <p className="mt-1 break-all font-mono text-sm text-foreground">
                    {category.id}
                  </p>
                </div>

                <div className="rounded-lg border bg-background p-3">
                  <p className="flex items-center gap-2 text-xs text-muted-foreground">
                    <CalendarDays className="size-4" />
                    Created At
                  </p>
                  <p className="mt-1 text-sm text-foreground">
                    {formatDate(category.createdAt)}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border bg-background p-4">
              <p className="flex items-center gap-2 text-xs uppercase tracking-wide text-muted-foreground">
                <FileText className="size-4" />
                Description
              </p>
              <p className="mt-2 text-sm leading-6 text-foreground">
                {category.description}
              </p>
            </div>

            <div className="flex justify-end">
              <Button type="button" variant="outline" onClick={onClose}>
                Close
              </Button>
            </div>
          </div>
        ) : (
          <div className="py-10 text-center text-sm text-muted-foreground">
            No category selected.
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

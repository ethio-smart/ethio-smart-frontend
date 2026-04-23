'use client';

import { useEffect, useState } from 'react';
import { PencilLine } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import type { Category } from '@/app/types/types';

export default function CategoryEditDialog({
  category,
  open,
  loading,
  onClose,
  onSave,
}: {
  category: Category | null;
  open: boolean;
  loading: boolean;
  onClose: () => void;
  onSave: (payload: { name: string; description: string }) => void;
}) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    setName(category?.name ?? '');
    setDescription(category?.description ?? '');
  }, [category]);

  const canSave = name.trim().length > 1 && description.trim().length > 5;

  return (
    <Dialog open={open} onOpenChange={(value) => !value && onClose()}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <PencilLine className="size-5 text-primary" />
            Edit Category
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Name</label>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Category name" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Description</label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Category description"
              rows={5}
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="button"
              disabled={!canSave || loading}
              onClick={() => onSave({ name: name.trim(), description: description.trim() })}
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

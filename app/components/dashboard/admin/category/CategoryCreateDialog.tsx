'use client';

import { useState } from 'react';
import { PlusCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function CategoryCreateDialog({
  open,
  loading,
  onClose,
  onCreate,
}: {
  open: boolean;
  loading: boolean;
  onClose: () => void;
  onCreate: (payload: { name: string; description: string }) => void;
}) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const reset = () => {
    setName('');
    setDescription('');
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const canCreate = name.trim().length > 1 && description.trim().length > 5;

  return (
    <Dialog open={open} onOpenChange={(value) => !value && handleClose()}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <PlusCircle className="size-5 text-primary" />
            Create Category
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Name</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Category name"
            />
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
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              type="button"
              disabled={!canCreate || loading}
              onClick={() => {
                onCreate({ name: name.trim(), description: description.trim() });
                reset();
              }}
            >
              {loading ? 'Creating...' : 'Create Category'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

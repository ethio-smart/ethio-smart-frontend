
'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ChangePasswordModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ChangePasswordModal({
  open,
  onOpenChange,
}: ChangePasswordModalProps) {
  const [form, setForm] = useState({
    current: '',
    newPass: '',
    confirm: '',
  });

  const handleSubmit = () => {
    if (!form.current || !form.newPass || !form.confirm) {
      toast.error('Please fill in all fields');
      return;
    }

    if (form.newPass !== form.confirm) {
      toast.error('New passwords do not match');
      return;
    }

    // Here you would call your actual API
    toast.success('Password changed successfully');
    onOpenChange(false);
    setForm({ current: '', newPass: '', confirm: '' });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Change Password</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="current">Current Password</Label>
            <Input
              id="current"
              type="password"
              value={form.current}
              onChange={(e) => setForm((p) => ({ ...p, current: e.target.value }))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="newPass">New Password</Label>
            <Input
              id="newPass"
              type="password"
              value={form.newPass}
              onChange={(e) => setForm((p) => ({ ...p, newPass: e.target.value }))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirm">Confirm New Password</Label>
            <Input
              id="confirm"
              type="password"
              value={form.confirm}
              onChange={(e) => setForm((p) => ({ ...p, confirm: e.target.value }))}
            />
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Update Password</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
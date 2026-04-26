"use client";

import { useEffect, useMemo, useState } from 'react';
import { UserPlus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import type { CreateOfficerPayload } from '@/app/types/types';

const emptyForm: CreateOfficerPayload = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  password: '',
};

export default function OfficerCreateDialog({
  open,
  loading,
  onClose,
  onCreate,
}: {
  open: boolean;
  loading: boolean;
  onClose: () => void;
  onCreate: (payload: CreateOfficerPayload) => Promise<void>;
}) {
  const [form, setForm] = useState<CreateOfficerPayload>(emptyForm);

  useEffect(() => {
    if (!open) {
      setForm(emptyForm);
    }
  }, [open]);

  const canSubmit = useMemo(
    () =>
      form.firstName.trim().length > 1 &&
      form.lastName.trim().length > 1 &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()) &&
      form.phone.trim().length > 5 &&
      form.password.trim().length >= 6,
    [form],
  );

  const updateField = <K extends keyof CreateOfficerPayload>(key: K, value: string) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const handleClose = () => {
    setForm(emptyForm);
    onClose();
  };

  const handleSubmit = async () => {
    try {
      await onCreate({
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        password: form.password,
      });
      setForm(emptyForm);
    } catch {
      // keep the form values so the user can correct and retry
    }
  };

  return (
    <Dialog open={open} onOpenChange={(value) => !value && handleClose()}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserPlus className="size-5 text-primary" />
            Add Officer
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">First name</label>
            <Input
              value={form.firstName}
              onChange={(event) => updateField('firstName', event.target.value)}
              placeholder="First name"
              autoComplete="given-name"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Last name</label>
            <Input
              value={form.lastName}
              onChange={(event) => updateField('lastName', event.target.value)}
              placeholder="Last name"
              autoComplete="family-name"
            />
          </div>

          <div className="space-y-2 sm:col-span-2">
            <label className="text-sm font-medium text-foreground">Email</label>
            <Input
              value={form.email}
              onChange={(event) => updateField('email', event.target.value)}
              placeholder="officer@example.com"
              type="email"
              autoComplete="email"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Phone</label>
            <Input
              value={form.phone}
              onChange={(event) => updateField('phone', event.target.value)}
              placeholder="+251900000000"
              autoComplete="tel"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Password</label>
            <Input
              value={form.password}
              onChange={(event) => updateField('password', event.target.value)}
              placeholder="Password"
              type="password"
              autoComplete="new-password"
            />
          </div>
        </div>

        <div className="mt-2 flex items-center justify-end gap-2">
          <Button type="button" variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="button" disabled={!canSubmit || loading} onClick={handleSubmit}>
            {loading ? 'Creating...' : 'Create Officer'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

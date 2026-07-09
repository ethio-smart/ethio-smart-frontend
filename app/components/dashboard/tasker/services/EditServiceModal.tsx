'use client';

import * as React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Switch } from '@/components/ui/switch';

import { Service } from '@/app/types/types';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '@/app/hooks/hooks';
import { updateService } from '@/app/store/slices/serviceSlice';

interface Category {
  id: string;
  name: string;
}

interface EditServiceModalProps {
  categories: Category[];
  service: Service;
  open: boolean;
  onClose: () => void;
}

interface FormErrors {
  title?: string;
  categoryId?: string;
  price?: string;
}

export function EditServiceModal({
  categories,
  service,
  open,
  onClose,
}: EditServiceModalProps) {
  const dispatch = useAppDispatch();

  const [form, setForm] = useState<Service>(service);
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  
  useEffect(() => {
    setForm(service);
  }, [service]);

  const validateForm = () => {
    const errors: FormErrors = {};

    if (!form.title.trim()) errors.title = 'Service title is required';
    if (!form.categoryId) errors.categoryId = 'Category is required';
    if (!form.price || Number(form.price) <= 0)
      errors.price = 'Valid price is required';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) return;

    dispatch(updateService({ id: form.id, data: form }));

    toast.success('Service updated successfully');
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Service</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Title */}
          <div className="space-y-2">
            <Label className='text-neutral-500'>Service Title </Label>
            <Input
              value={form.title}
              onChange={(e) =>
                setForm((f) => ({ ...f, title: e.target.value }))
              }
            />
            {formErrors.title && (
              <p className="text-xs text-red-500">{formErrors.title}</p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label className='text-neutral-500'>Description</Label>
            <Textarea
              value={form.description}
              onChange={(e) =>
                setForm((f) => ({ ...f, description: e.target.value }))
              }
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label className='text-neutral-500'>Category </Label>
            <Select
              value={form.categoryId}
              onValueChange={(value) =>
                setForm((f) => ({ ...f, categoryId: value }))
              }
            >
              <SelectTrigger className='w-full'>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>

              <SelectContent>
                {categories.map((c) => (
                  <SelectItem key={c.id} value={c.id}>
                    {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {formErrors.categoryId && (
              <p className="text-xs text-red-500">
                {formErrors.categoryId}
              </p>
            )}
          </div>

          {/* Price + Type */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className='text-neutral-500'>Price </Label>
              <Input
                type="number"
                value={form.price}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    price: Number(e.target.value),
                  }))
                }
              />
              {formErrors.price && (
                <p className="text-xs text-red-500">
                  {formErrors.price}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label className='text-neutral-500'>Price Type</Label>
              <Select
                value={form.priceType}
                onValueChange={(value: any) =>
                  setForm((f) => ({ ...f, priceType: value }))
                }
              >
                <SelectTrigger className='w-full'>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="HOURLY">HOURLY</SelectItem>
                  <SelectItem value="DAILY">DAILY</SelectItem>
                  <SelectItem value="WEEKLY">WEEKLY</SelectItem>
                  <SelectItem value="MONTHLY">MONTHLY</SelectItem>
                  <SelectItem value="FIXED">FIXED</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Status */}
          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border">
            <p className="text-sm font-medium">Active Status</p>

            <Switch
              checked={form.isActive}
              onCheckedChange={(value) =>
                setForm((f) => ({ ...f, isActive: value }))
              }
            />
          </div>
        </div>

        <DialogFooter className="mt-4">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>

          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
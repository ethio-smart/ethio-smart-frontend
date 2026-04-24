/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
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

import { useAppDispatch, useAppSelector } from '@/app/hooks/hooks';
import { createService, fetchServicesByTaskerId } from '@/app/store/slices/serviceSlice';


type ServiceForm = {
  title: string;
  description: string;
  categoryId: string;
  price: string;
  priceType: 'HOURLY' | 'DAILY' | 'WEEKLY' | 'MONTHLY';
  active: boolean;
};

const defaultForm: ServiceForm = {
  title: '',
  description: '',
  categoryId: '',
  price: '',
  priceType: 'HOURLY',
  active: true,
};

export function CreateServiceModal({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  const { creating } = useAppSelector((state) => state.service);
  const { categories } = useAppSelector((state) => state.category);

  const [form, setForm] = useState<ServiceForm>(defaultForm);
  const [errors, setErrors] = useState<Partial<ServiceForm>>({});
  const [open, setOpen] = useState(false);
  // console.log('service forms',form)

  //form validation
  const validate = () => {
    const validationErrors: Partial<ServiceForm> = {};


    if (!form.title.trim()) {
      validationErrors.title = 'Title required';
    }

    if (!form.categoryId) {
      validationErrors.categoryId = 'Category required';
    }

    if (!form.price || Number(form.price) <= 0) {
      validationErrors.price = 'Valid price required';
    }

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };
//handle create service
  const handleCreate = async () => {
    if (!validate()) return;

    const payload = {
      title: form.title.trim(),
      description: form.description.trim(),
      categoryId: form.categoryId,
      price: Number(form.price),
      priceType: form.priceType,
      isActive: form.active,
    };

    try {
      await dispatch(createService(payload)).unwrap();
      toast.success('Service created successfully');
      setForm(defaultForm);
        dispatch(fetchServicesByTaskerId());
      setOpen(false);
    } catch (error: any) {
      toast.error(error || 'Failed to create service');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-center">
            Create New Service
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5">
          {/* TITLE */}
          <div className="space-y-3">
            <Label>Service Title</Label>
            <Input
              value={form.title}
              onChange={(event) =>
                setForm((previousState) => ({
                  ...previousState,
                  title: event.target.value,
                }))
              }
              placeholder="e.g. AC Repair, House Cleaning, Plumbing Service"
            />
            {errors.title && (
              <p className="text-xs text-red-500">{errors.title}</p>
            )}
          </div>

          {/* DESCRIPTION */}
          <div className="space-y-3">
            <Label>Description</Label>
            <Textarea
              value={form.description}
              onChange={(event) =>
                setForm((previousState) => ({
                  ...previousState,
                  description: event.target.value,
                }))
              }
              placeholder="Write a short description of what your service includes..."
              className="h-24"
            />
          </div>

          {/* CATEGORY */}
          <div className="space-y-3">
            <Label>Category</Label>

            <Select
              value={form.categoryId}
              onValueChange={(value) =>
                setForm((previousState) => ({
                  ...previousState,
                  categoryId: value,
                }))
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a service category" />
              </SelectTrigger>

              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {errors.categoryId && (
              <p className="text-xs text-red-500">
                {errors.categoryId}
              </p>
            )}
          </div>

          {/* PRICE + TYPE */}
          <div className="grid grid-cols-2 gap-4">
            {/* PRICE */}
            <div className="space-y-3">
              <Label>Price</Label>
              <Input
                type="number"
                value={form.price}
                onChange={(event) =>
                  setForm((previousState) => ({
                    ...previousState,
                    price: event.target.value,
                  }))
                }
                placeholder="Enter price (e.g. 50)"
              />
              {errors.price && (
                <p className="text-xs text-red-500">{errors.price}</p>
              )}
            </div>

            {/* PRICE TYPE */}
            <div className="space-y-3">
              <Label>Price Type</Label>

              <Select
                value={form.priceType}
                onValueChange={(value: ServiceForm['priceType']) =>
                  setForm((previousState) => ({
                    ...previousState,
                    priceType: value,
                  }))
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select pricing type" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="HOURLY">Hourly</SelectItem>
                  <SelectItem value="DAILY">Daily</SelectItem>
                  <SelectItem value="WEEKLY">Weekly</SelectItem>
                  <SelectItem value="MONTHLY">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* ACTIONS */}
        <DialogFooter className="mt-6">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>

          <Button onClick={handleCreate} disabled={creating}>
            {creating ? 'Creating...' : 'Create Service'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
'use client';


import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Service } from '@/app/types/types';
import { useEffect } from 'react';
import { fetchCategoryById } from '@/app/store/slices/categorySlice';
import { useAppDispatch, useAppSelector } from '@/app/hooks/hooks';


interface ServiceDetailModalProps {
  service: Service;
    open: boolean;
  onClose: () => void;

}

export function ServiceDetailModal({ service, open, onClose }: ServiceDetailModalProps) {
  const { selectedCategory } = useAppSelector((state) => state.category);
  const dispatch = useAppDispatch();
 console.log('selectedCategory from service detail',selectedCategory)
 console.log('category id',service.categoryId
 )
 //fetch category
useEffect(() => {
  if (service.categoryId) {
    dispatch(fetchCategoryById(service.categoryId));
  }
}, [service.categoryId, dispatch]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Service Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex justify-between items-start">
            <div className="bg-muted/ rounded-lg p-3 flex-">
                <p className="text-xs text-muted-foreground">Title</p>
              <h3 className="text-base font-semibold">{service.title}</h3>
          
            </div>
           <Badge variant={service.isActive ? 'secondary' : 'destructive'}>
              {service.isActive ? 'Active' : 'Inactive'}
           </Badge>

          </div>
          <div className="bg-muted/50 rounded-lg p-3">
            <p className="text-xs text-muted-foreground">Description</p>
            <p className="text-sm font-medium mt-0.5 leading-5  ">{service.description || 'No description provided.'}</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-lg bg-muted/50">
              <p className="text-xs text-muted-foreground">Category</p>
              <p className="text-sm font-medium mt-0.5">{selectedCategory?.name}</p>
            </div>
            <div className="p-3 rounded-lg bg-muted/50">
              <p className="text-xs text-muted-foreground">Price</p>
              <p className="text-sm font-medium mt-0.5">${service.price}</p>
            </div>
            <div className="p-3 rounded-lg bg-muted/50">
              <p className="text-xs text-muted-foreground">Price Type</p>
              <p className="text-sm font-medium mt-0.5">{service.priceType}</p>
            </div>
            {/* <div className="p-3 rounded-lg bg-muted/50">
              <p className="text-xs text-muted-foreground">Service Type</p>
              <p className="text-sm font-medium mt-0.5">{service.serviceType}</p>
            </div> */}
            <div className="p-3 rounded-lg bg-muted/50">
              <p className="text-xs text-muted-foreground">Created Date</p>
              <p className="text-sm font-medium mt-0.5">{service.createdAt.split('T')[0]}</p>
            </div>
          </div>
        </div>

        <DialogFooter className="flex justify-end mt-4">
          <DialogClose asChild>
             <Button >Close</Button>
          </DialogClose>
        
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
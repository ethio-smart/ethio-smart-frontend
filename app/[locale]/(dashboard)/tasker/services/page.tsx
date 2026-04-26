/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';

import { useState, useEffect, useMemo } from 'react';
import { toast } from 'sonner';

import Icon from '@/components/ui/AppIcon';
import { DataTable } from '@/components/ui/data-table/DataTable';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAppDispatch, useAppSelector } from '@/app/hooks/hooks';
import { activateService, deactivateService, fetchServicesByTaskerId } from '@/app/store/slices/serviceSlice';
import { CreateServiceModal } from '@/app/components/dashboard/tasker/services/CreateServiceModal';
import { EditServiceModal } from '@/app/components/dashboard/tasker/services/EditServiceModal';
import { ServiceDetailModal } from '@/app/components/dashboard/tasker/services/ServiceDetailModal';
import { Service } from '@/app/types/types';


export default function ServicesPage() {
  const dispatch = useAppDispatch();
  const { services } = useAppSelector(
    (state) => state.service
  );
  const { categories } = useAppSelector(
    (state) => state.category
  );
  console.log(' services🎯🎯', services)

  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [editService, setEditService] = useState<Service | null>(null);
  const [viewService, setViewService] = useState<Service | null>(null);

  console.log('services page states✨✨✨', {
    editService, viewService
  })
  // Fetch data
  useEffect(() => {
    dispatch(fetchServicesByTaskerId());
  }, [dispatch]);


  // Category Map
  const categoryMap = useMemo(() => {
    return (categories || []).reduce((acc: any, cat: any) => {
      acc[cat.id] = cat.name;
      return acc;
    }, {});
  }, [categories]);

  const safeServices: Service[] = Array.isArray(services) ? services : [];


  // Filter
  const filteredServices = useMemo(() => {
    return (safeServices || [])
      .filter((service): service is Service => !!service && !!service.title)
      .filter((service) => {
        const matchSearch = service.title
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

        const categoryName = categoryMap[service.categoryId];

        const matchCategory =
          categoryFilter === 'All' ||
          categoryName === categoryFilter;

        const matchStatus =
          statusFilter === 'All' ||
          service.isActive === (statusFilter === 'Active');

        return matchSearch && matchCategory && matchStatus;
      });
  }, [safeServices, searchQuery, categoryFilter, statusFilter, categoryMap]);
  //handle activate/deactivate service
  const handleToggleService = async (service: Service) => {
    try {
      if (service.isActive) {
        await dispatch(deactivateService(service.id)).unwrap();
        toast.success('Service deactivated');
      } else {
        await dispatch(activateService(service.id)).unwrap();
        toast.success('Service activated');
      }
    } catch (err: any) {
      toast.error(err || 'Action failed');
    }
  };



  const columns = [
 
    {
      id: 'title',
      header: 'Service Title',
      cell: ({ row }: any) => (
        <div>
          <p className="font-medium text-foreground">
            {row.original.title}
          </p>
        </div>
      ),
    },
    {
      id: 'category',
      header: 'Category',
      cell: ({ row }: any) => (
        <span className="px-2 py-1 rounded-md bg-muted text-xs font-medium">
          {categoryMap[row.original.categoryId] || '—'}
        </span>
      ),
    },
    {
      id: 'price',
      header: 'Price',
      cell: ({ row }: any) => (
        <span className="font-mono font-medium">
          br{row.original.price}
        </span>
      ),
    },
    {
      id: 'priceType',
      header: 'Price Type',
      cell: ({ row }: any) => (
        <span className="px-2 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-700">
          {row.original.priceType}
        </span>
      ),
    },
    {
      id: 'status',
      header: 'Status',
      cell: ({ row }: any) => {
        const isActive = row.original.isActive;

        return (
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${isActive
                ? 'bg-emerald-50 text-emerald-700'
                : 'bg-gray-100 text-gray-600'
              }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-emerald-500' : 'bg-gray-400'
                }`}
            />
            {isActive ? 'Active' : 'Inactive'}
          </span>
        );
      },
    },
    {
      id: 'createdDate',
      header: 'Created Date',
      cell: ({ row }: any) => row.original.createdAt.split('T')[0],
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }: any) => {
        const service = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-2 rounded-md hover:bg-muted">
                <Icon name="EllipsisVerticalIcon" size={16} />
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-44">
              <DropdownMenuItem onClick={() => setEditService(service)}>
                <Icon name="PencilSquareIcon" size={14} className="mr-2" />
                Edit
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => handleToggleService(service)}>
                <Icon
                  name={service.isActive ? 'XMarkIcon' : 'CheckIcon'}
                  size={14}
                  className="mr-2"
                />
                <span>{service.isActive ? 'Deactivate' : 'Activate'}</span>
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => setViewService(service)}>
                <Icon name="EyeIcon" size={14} className="mr-2" />
                View Details
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];


  // Loading

  // if (loading) {
  //   return (
  //     <div className="flex items-center justify-center min-h-screen">
  //       <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
  //     </div>
  //   );
  // }


  return (
    <div className="min-h-screen p-4 lg:p-6 space-y-4">
      {/* Header */}
      <div className="flex justify-between">
        <h1 className="text-xl font-bold">Services</h1>

        <CreateServiceModal>
          <Button>Create New Service</Button>
        </CreateServiceModal>
      </div>

      {/* Filters */}
      <div className="flex  gap-4 bg-white rounded-lg shadow-xs px-5 py-4">
        <Input
          placeholder="Search service..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All</SelectItem>
            {categories.map((category: any) => (
              <SelectItem key={category.id} value={category.name}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All</SelectItem>
            <SelectItem value="Active">Active</SelectItem>
            <SelectItem value="Inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <DataTable columns={columns} data={filteredServices} />

      {/* Modals */}
      {editService && (
        <EditServiceModal
          categories={categories}
          service={editService}
          // key={Key}
          open={!!editService}
          onClose={() => setEditService(null)}
        />
      )}

      {viewService && (
        <ServiceDetailModal
          service={viewService}
          open={!!viewService}
          onClose={() => setViewService(null)}
        />
      )}
    </div>
  );
}
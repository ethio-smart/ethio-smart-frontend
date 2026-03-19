'use client';

import { useState, useEffect, useMemo } from 'react';
import { toast } from 'sonner';
import Icon from '@/components/ui/AppIcon';
import { DataTable, DataTableColumnDef } from '@/components/ui/data-table/DataTable';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { EditServiceModal, Service, ServiceFormData } from '@/app/components/dashboard/tasker/services/EditServiceModal';
import { CreateServiceModal } from '@/app/components/dashboard/tasker/services/CreateServiceModal';
import { ServiceDetailModal } from '@/app/components/dashboard/tasker/services/ServiceDetailModal';

const CATEGORIES = ['Cleaning','Plumbing','Electrical','Moving','Gardening','Painting','Carpentry','IT Support','Tutoring','Cooking'];


const MOCK_SERVICES: Service[] = [
  {
    id: 'SVC-001',
    title: 'Deep House Cleaning',
    category: 'Cleaning',
    price: 45,
    priceType: 'HOURLY',
    serviceType: 'Per Hour',
    status: 'Active',
    createdDate: '2025-01-15',
    description: 'Professional deep cleaning service.',
  },
  {
    id: 'SVC-002',
    title: 'Pipe Leak Repair',
    category: 'Plumbing',
    price: 120,
    priceType: 'FIXED HOURLY',
    serviceType: 'Per Service',
    status: 'Active',
    createdDate: '2025-02-03',
    description: 'Fix leaking pipes and faucets.',
  },
  {
    id: 'SVC-003',
    title: 'Electrical Wiring',
    category: 'Electrical',
    price: 80,
    priceType: 'HOURLY',
    serviceType: 'Per Hour',
    status: 'Active',
    createdDate: '2025-02-18',
    description: 'Safe electrical wiring installation.',
  },
  {
    id: 'SVC-004',
    title: 'Furniture Moving',
    category: 'Moving',
    price: 200,
    priceType: 'DAILY',
    serviceType: 'Per Service',
    status: 'Inactive',
    createdDate: '2025-03-01',
    description: 'Careful furniture relocation.',
  },
  {
    id: 'SVC-005',
    title: 'Garden Landscaping',
    category: 'Gardening',
    price: 60,
    priceType: 'HOURLY',
    serviceType: 'Per Hour',
    status: 'Active',
    createdDate: '2025-03-10',
    description: 'Beautiful garden design and maintenance.',
  },
  {
    id: 'SVC-006',
    title: 'Interior Painting',
    category: 'Painting',
    price: 350,
    priceType: 'FIXED HOURLY',
    serviceType: 'Fixed',
    status: 'Active',
    createdDate: '2025-03-22',
    description: 'Professional interior painting.',
  },
];

export default function ServicesPage() {
  const [isHydrated, setIsHydrated] = useState(false);
  const [services, setServices] = useState<Service[]>(MOCK_SERVICES);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [editService, setEditService] = useState<Service | null>(null);
  const [viewService, setViewService] = useState<Service | null>(null);

  useEffect(() => setIsHydrated(true), []);

  const filteredServices = useMemo(() => {
    return services.filter(s => {
      const matchSearch = s.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCat = categoryFilter === 'All' || s.category === categoryFilter;
      const matchStatus = statusFilter === 'All' || s.status === statusFilter;
      return matchSearch && matchCat && matchStatus;
    });
  }, [services, searchQuery, categoryFilter, statusFilter]);

  const handleToggleStatus = (id: string) => {
    setServices(prev =>
      prev.map(s =>
        s.id === id
          ? { ...s, status: s.status === 'Active' ? 'Inactive' : 'Active' }
          : s
      )
    );
    toast.success('Service status updated');
  };

  const handleDelete = (id: string) => {
    setServices(prev => prev.filter(s => s.id !== id));
    toast.success('Service deleted');
  };

  const handleSaveEdit = (data: ServiceFormData) => {
    if (!editService) return;

    setServices(prev =>
      prev.map(s =>
        s.id === editService.id
          ? {
              ...s,
              ...data,
              price: Number(data.price),
              status: data.active ? 'Active' : 'Inactive',
            }
          : s
      )
    );
  };

  const columns: DataTableColumnDef<Service>[] = [
    {
      id: 'title',
      header: 'Service Title',
      accessorKey: 'title',
      cell: ({ row }) => (
        <div>
          <p className="font-medium text-foreground">{row.original.title}</p>
          <p className="text-xs text-muted-foreground">{row.original.id}</p>
        </div>
      ),
    },
    {
      id: 'category',
      header: 'Category',
      accessorKey: 'category',
      cell: ({ row }) => (
        <span className="px-2 py-1 rounded-md bg-muted text-xs font-medium">
          {row.original.category}
        </span>
      ),
    },
    {
      id: 'price',
      header: 'Price',
      accessorKey: 'price',
      cell: ({ row }) => (
        <span className="font-mono font-medium">${row.original.price}</span>
      ),
    },
    {
      id: 'priceType',
      header: 'Price Type',
      accessorKey: 'priceType',
      cell: ({ row }) => (
        <span className="px-2 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-700">
          {row.original.priceType}
        </span>
      ),
    },
    {
      id: 'serviceType',
      header: 'Service Type',
      accessorKey: 'serviceType',
      cell: ({ row }) => (
        <span className="px-2 py-1 rounded-md text-xs font-medium">
          {row.original.serviceType}
        </span>
      ),
    },
    {
      id: 'status',
      header: 'Status',
      accessorKey: 'status',
      cell: ({ row }) => (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${row.original.status==='Active'?'bg-emerald-50 text-emerald-700':'bg-gray-100 text-gray-600'}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${row.original.status==='Active'?'bg-emerald-500':'bg-gray-400'}`} />
          {row.original.status}
        </span>
      ),
    },
    {
      id: 'createdDate',
      header: 'Created Date',
      accessorKey: 'createdDate',
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => {
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

              <DropdownMenuItem onClick={() => handleToggleStatus(service.id)}>
                <Icon name={service.status === 'Active' ? 'XMarkIcon' : 'CheckIcon'} size={14} className="mr-2" />
                {service.status === 'Active' ? 'Deactivate' : 'Activate'}
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => setViewService(service)}>
                <Icon name="EyeIcon" size={14} className="mr-2" />
                View Details
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => handleDelete(service.id)}
                className="text-red-600"
              >
                <Icon name="TrashIcon" size={14} className="mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  if (!isHydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 rounded-full border-4 border-primary border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 lg:p-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-bold">Services</h1>

        <CreateServiceModal
          categories={CATEGORIES}
          onSave={s => setServices(prev => [...prev, s])}
        >
          <Button>Create New Service</Button>
        </CreateServiceModal>
      </div>

      <div className="flex gap-4 mb-4 bg-white rounded-lg shadow-xs px-5 py-4">
        <Input
          placeholder="Search service..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />

        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className='w-35'><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All</SelectItem>
            {CATEGORIES.map(c => (
              <SelectItem key={c} value={c}>{c}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className='w-35'><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All</SelectItem>
            <SelectItem value="Active">Active</SelectItem>
            <SelectItem value="Inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <DataTable columns={columns} data={filteredServices} />

      {editService && (
        <EditServiceModal
          categories={CATEGORIES}
          service={editService}
          open={!!editService}
          onClose={() => setEditService(null)}
          onSave={handleSaveEdit}
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
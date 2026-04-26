'use client';

import { useEffect, useMemo, useState } from 'react';

import OfficerCreateDialog from '@/app/components/dashboard/admin/officer/OfficerCreateDialog';
import OfficerFiltersBar from '@/app/components/dashboard/admin/officer/OfficerFiltersBar';
import OfficerManagementHeader from '@/app/components/dashboard/admin/officer/OfficerManagementHeader';
import OfficerTable from '@/app/components/dashboard/admin/officer/OfficerTable';
import { useAppDispatch, useAppSelector } from '@/app/hooks/hooks';
import type { CreateOfficerPayload, OfficerListItem } from '@/app/types/types';
import {
  createAdminOfficer,
  fetchAdminOfficers,
} from '@/app/store/slices/adminOfficersSlice';

const sortOfficers = (officers: OfficerListItem[]) =>
  [...officers].sort((a, b) => {
    const aDate = a.createdAt ? new Date(a.createdAt).getTime() : 0;
    const bDate = b.createdAt ? new Date(b.createdAt).getTime() : 0;
    return bDate - aDate;
  });

export default function OfficersPage() {
  const dispatch = useAppDispatch();
  const { officers: apiOfficers, loading, creating, error } = useAppSelector(
    (state) => state.adminOfficers,
  );

  const [officers, setOfficers] = useState<OfficerListItem[]>([]);
  const [search, setSearch] = useState('');
  const [createOpen, setCreateOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchAdminOfficers());
  }, [dispatch]);

  useEffect(() => {
    setOfficers(sortOfficers(apiOfficers));
  }, [apiOfficers]);

  const filteredOfficers = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return officers;

    return officers.filter((officer) => {
      const searchable = [
        officer.firstName,
        officer.lastName,
        officer.fullName,
        officer.email,
        officer.phone,
        officer.role,
        officer.id,
      ]
        .join(' ')
        .toLowerCase();

      return searchable.includes(query);
    });
  }, [officers, search]);

  const handleRefresh = () => {
    dispatch(fetchAdminOfficers());
  };

  const handleCreateOfficer = async (payload: CreateOfficerPayload) => {
    await dispatch(createAdminOfficer(payload)).unwrap();
    setCreateOpen(false);
    await dispatch(fetchAdminOfficers()).unwrap();
  };

  return (
    <div className="space-y-5">
      <OfficerManagementHeader
        totalOfficers={loading ? 0 : officers.length}
        filteredCount={filteredOfficers.length}
        onCreate={() => setCreateOpen(true)}
        onRefresh={handleRefresh}
      />

      {error ? (
        <div className="rounded-lg border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      ) : null}

      <OfficerFiltersBar search={search} onSearchChange={setSearch} />

      {loading ? (
        <div className="rounded-lg border bg-card p-6 text-sm text-muted-foreground">
          Loading officers...
        </div>
      ) : filteredOfficers.length === 0 ? (
        <div className="rounded-lg border bg-card px-4 py-8 text-center text-sm text-muted-foreground">
          No officers match your search criteria.
        </div>
      ) : (
        <OfficerTable officers={filteredOfficers} />
      )}

      <OfficerCreateDialog
        open={createOpen}
        loading={creating}
        onClose={() => setCreateOpen(false)}
        onCreate={handleCreateOfficer}
      />
    </div>
  );
}

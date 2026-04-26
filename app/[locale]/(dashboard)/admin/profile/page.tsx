'use client';

import { useEffect } from 'react';
import { RefreshCw } from 'lucide-react';

import AdminProfileDetails from '@/app/components/dashboard/admin/profile/AdminProfileDetails';
import AdminProfileHero from '@/app/components/dashboard/admin/profile/AdminProfileHero';
import AdminProfileHighlights from '@/app/components/dashboard/admin/profile/AdminProfileHighlights';
import { useAppDispatch, useAppSelector } from '@/app/hooks/hooks';
import { fetchAdminProfile } from '@/app/store/slices/adminProfileSlice';
import { Button } from '@/components/ui/button';

export default function AdminProfilePage() {
  const dispatch = useAppDispatch();
  const { profile, loading, error } = useAppSelector((state) => state.adminProfile);

  useEffect(() => {
    dispatch(fetchAdminProfile());
  }, [dispatch]);

  const handleRefresh = () => {
    dispatch(fetchAdminProfile());
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-end">
        <Button type="button" variant="outline" onClick={handleRefresh} disabled={loading}>
          <RefreshCw className={`mr-2 size-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh Profile
        </Button>
      </div>

      {error ? (
        <div className="rounded-lg border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      ) : null}

      {loading && !profile ? (
        <div className="rounded-lg border bg-card p-6 text-sm text-muted-foreground">
          Loading admin profile...
        </div>
      ) : null}

      {profile ? (
        <>
          <AdminProfileHero profile={profile} />
          <AdminProfileHighlights profile={profile} />
          <AdminProfileDetails profile={profile} />
        </>
      ) : null}
    </div>
  );
}

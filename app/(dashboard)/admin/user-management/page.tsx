'use client';

import { useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks/hooks';
import type { UserManagementUser } from '@/app/types/types';
import { fetchAdminUsers } from '@/app/store/slices/adminUsersSlice';
import UserManagementHeader from '@/app/components/dashboard/admin/user/UserManagementHeader';
import UserFiltersBar, {
  type RoleFilter,
  type VerificationFilter,
} from '@/app/components/dashboard/admin/user/UserFiltersBar';
import UserTable from '@/app/components/dashboard/admin/user/UserTable';
import UserDetailsDialog from '@/app/components/dashboard/admin/user/UserDetailsDialog';

export default function UserManagementPage() {
  const dispatch = useAppDispatch();
  const { users: apiUsers, loading, error } = useAppSelector(
    (state) => state.adminUsers,
  );

  const [users, setUsers] = useState<UserManagementUser[]>([]);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<RoleFilter>('All');
  const [verificationFilter, setVerificationFilter] =
    useState<VerificationFilter>('All');
  const [selectedUser, setSelectedUser] = useState<{
    user: UserManagementUser;
    index: number;
  } | null>(null);

  useEffect(() => {
    dispatch(fetchAdminUsers());
  }, [dispatch]);

  useEffect(() => {
    setUsers(apiUsers);
  }, [apiUsers]);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchSearch =
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase()) ||
        (user.phone ?? '').toLowerCase().includes(search.toLowerCase());
      const matchRole = roleFilter === 'All' || user.role === roleFilter;
      const matchVerification =
        verificationFilter === 'All' || user.verificationStatus === verificationFilter;
      return matchSearch && matchRole && matchVerification;
    });
  }, [users, search, roleFilter, verificationFilter]);

  const toggleVerify = (id: string) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id
          ? {
              ...user,
              verified: !user.verified,
              verificationStatus: user.verified ? 'Unverified' : 'Verified',
            }
          : user
      )
    );

    setSelectedUser((prev) => {
      if (!prev || prev.user.id !== id) return prev;
      return {
        ...prev,
        user: {
          ...prev.user,
          verified: !prev.user.verified,
          verificationStatus: prev.user.verified ? 'Unverified' : 'Verified',
        },
      };
    });
  };

  return (
    <div className="space-y-4">
      <UserManagementHeader
        totalUsers={loading ? 0 : users.length}
        filteredCount={filteredUsers.length}
      />

      {error ? (
        <div className="rounded-lg border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      ) : null}

      <UserFiltersBar
        search={search}
        onSearchChange={setSearch}
        roleFilter={roleFilter}
        onRoleFilterChange={setRoleFilter}
        verificationFilter={verificationFilter}
        onVerificationFilterChange={setVerificationFilter}
      />

      {loading ? (
        <div className="rounded-lg border bg-card p-6 text-sm text-muted-foreground">
          Loading users...
        </div>
      ) : (
        <UserTable
          users={filteredUsers}
          allUsers={users}
          onView={(user, index) => setSelectedUser({ user, index })}
          onToggleVerify={toggleVerify}
        />
      )}

      <UserDetailsDialog
        user={selectedUser?.user ?? null}
        index={selectedUser?.index ?? 0}
        onClose={() => setSelectedUser(null)}
        onToggleVerify={() => {
          if (selectedUser) {
            toggleVerify(selectedUser.user.id);
          }
        }}
      />
    </div>
  );
}

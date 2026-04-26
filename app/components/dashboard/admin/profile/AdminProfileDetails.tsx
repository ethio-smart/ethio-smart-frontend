"use client";

import type { AdminProfile } from '@/app/types/types';

const formatDateTime = (value: string) =>
  new Date(value).toLocaleString(undefined, {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

export default function AdminProfileDetails({ profile }: { profile: AdminProfile }) {
  const details = [
    { label: 'First Name', value: profile.firstName },
    { label: 'Last Name', value: profile.lastName },
    { label: 'Email', value: profile.email },
    { label: 'Phone', value: profile.phone ?? 'Not provided' },
    { label: 'Password (masked)', value: profile.maskedPassword },
    { label: 'Role', value: profile.role },
    { label: 'Created At', value: formatDateTime(profile.createdAt) },
    { label: 'Last Updated', value: formatDateTime(profile.updatedAt) },
    { label: 'Admin ID', value: profile.id },
  ];

  return (
    <section className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-foreground">Profile Details</h2>
        <p className="text-sm text-muted-foreground">
          Data loaded securely from the <code>/admin/me</code> endpoint.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {details.map((item) => (
          <div key={item.label} className="rounded-xl border bg-muted/20 p-3">
            <p className="text-xs text-muted-foreground">{item.label}</p>
            <p className="mt-1 break-words text-sm font-medium text-foreground">{item.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

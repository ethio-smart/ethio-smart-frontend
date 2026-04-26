"use client";

import { BadgeCheck, Mail, Phone } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import type { AdminProfile } from '@/app/types/types';

const formatRole = (role: string) => role.replaceAll('_', ' ');

const getInitials = (firstName: string, lastName: string) =>
  `${firstName?.[0] ?? ''}${lastName?.[0] ?? ''}`.toUpperCase();

export default function AdminProfileHero({ profile }: { profile: AdminProfile }) {
  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-border bg-linear-to-br from-primary/20 via-secondary to-card p-6 shadow-sm lg:p-8">
      <div className="pointer-events-none absolute -right-10 -top-8 h-40 w-40 rounded-full bg-primary/20 blur-3xl" />
      <div className="pointer-events-none absolute -left-10 -bottom-10 h-40 w-40 rounded-full bg-secondary/60 blur-3xl" />

      <div className="relative z-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-center gap-4">
          <Avatar className="size-18 border border-white/50 shadow-sm">
            {profile.imageurl ? (
              <AvatarImage src={profile.imageurl} alt={profile.fullName} />
            ) : null}
            <AvatarFallback className="bg-primary/15 text-lg font-semibold text-primary">
              {getInitials(profile.firstName, profile.lastName)}
            </AvatarFallback>
          </Avatar>

          <div className="min-w-0">
            <h1 className="truncate text-2xl font-semibold text-foreground lg:text-3xl">
              {profile.fullName}
            </h1>
            <p className="mt-1 truncate text-sm text-muted-foreground">Administrator profile</p>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <Badge variant="outline" className="bg-background/70">
                {formatRole(profile.role)}
              </Badge>
              <Badge
                variant="outline"
                className={
                  profile.isVerified
                    ? 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-300'
                    : 'border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-300'
                }
              >
                <BadgeCheck className="mr-1.5 size-3.5" />
                {profile.isVerified ? 'Verified account' : 'Unverified account'}
              </Badge>
            </div>
          </div>
        </div>

        <div className="grid gap-2 text-sm text-muted-foreground">
          <div className="inline-flex items-center gap-2 rounded-md border bg-card/70 px-3 py-2">
            <Mail className="size-4 text-primary" />
            <span className="truncate">{profile.email}</span>
          </div>
          <div className="inline-flex items-center gap-2 rounded-md border bg-card/70 px-3 py-2">
            <Phone className="size-4 text-primary" />
            <span>{profile.phone ?? 'No phone'}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

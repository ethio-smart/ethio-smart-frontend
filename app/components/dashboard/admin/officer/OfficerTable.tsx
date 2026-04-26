"use client";

import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { OfficerListItem } from '@/app/types/types';

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString(undefined, {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  });

const roleStyles: Record<string, string> = {
  SYSTEM_ADMIN: 'bg-primary/10 text-primary',
  SUPER_ADMIN: 'bg-purple-100 text-purple-700 dark:bg-purple-500/10 dark:text-purple-300',
  TASKER: 'bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300',
  USER: 'bg-muted text-muted-foreground',
};

export default function OfficerTable({ officers }: { officers: OfficerListItem[] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-border bg-card shadow-sm">
      <Table className="min-w-225">
        <TableHeader>
          <TableRow className="bg-muted/30">
            <TableHead className="w-65">Officer</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Joined</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {officers.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="py-12 text-center text-muted-foreground">
                No officers found.
              </TableCell>
            </TableRow>
          ) : (
            officers.map((officer, index) => (
              <TableRow key={officer.id} className={index % 2 === 0 ? 'bg-background' : 'bg-muted/10'}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                      {officer.fullName
                        .split(' ')
                        .map((part) => part[0])
                        .join('')
                        .slice(0, 2)
                        .toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate font-medium text-foreground">{officer.fullName}</p>
                      <p className="truncate text-xs text-muted-foreground">{officer.id}</p>
                    </div>
                  </div>
                </TableCell>

                <TableCell className="text-muted-foreground">{officer.email}</TableCell>
                <TableCell className="text-muted-foreground">{officer.phone}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={roleStyles[officer.role] ?? 'bg-muted text-muted-foreground'}>
                    {officer.role}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">{formatDate(officer.createdAt)}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={
                      officer.isVerified
                        ? 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-300'
                        : 'border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-300'
                    }
                  >
                    {officer.isVerified ? 'Verified' : 'Unverified'}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

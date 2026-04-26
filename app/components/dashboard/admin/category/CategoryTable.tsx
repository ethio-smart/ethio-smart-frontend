'use client';

import { Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { Category } from '@/app/types/types';

const truncate = (value: string, max = 120) =>
  value.length > max ? `${value.slice(0, max).trim()}…` : value;

const formatDate = (value?: string) =>
  value
    ? new Date(value).toLocaleDateString(undefined, {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
      })
    : '—';

export default function CategoryTable({
  categories,
  onView,
  onEdit,
  onDelete,
}: {
  categories: Category[];
  onView: (category: Category) => void;
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
}) {
  return (
    <div className="overflow-x-auto">
      <Table className="min-w-205">
        <TableHeader>
          <TableRow className="bg-muted/30">
            <TableHead className="w-70">Category</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="w-40">Created At</TableHead>
              <TableHead className="w-55 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((category, index) => (
            <TableRow key={category.id} className={index % 2 === 0 ? 'bg-background' : 'bg-muted/10'}>
              <TableCell>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-foreground">{category.name}</h3>
                    <Badge variant="secondary" className="rounded-full text-[11px]">
                      #{index + 1}
                    </Badge>
                  </div>
                  <p className="font-mono break-all text-xs text-muted-foreground">{category.id}</p>
                </div>
              </TableCell>
              <TableCell>
                <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
                  {truncate(category.description, 50)}
                </p>
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {formatDate(category.createdAt)}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                  <Button type="button" variant="outline" size="sm" onClick={() => onView(category)}>
                    <Eye className="mr-2 size-4" />
                    View
                  </Button>
                  <Button type="button" variant="outline" size="sm" onClick={() => onEdit(category)}>
                    Edit
                  </Button>
                  <Button type="button" variant="destructive" size="sm" onClick={() => onDelete(category)}>
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

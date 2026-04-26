'use client';

import { useEffect, useMemo, useState } from 'react';
import { Layers3, RefreshCw, ChevronLeft, ChevronRight } from 'lucide-react';

import { useAppDispatch, useAppSelector } from '@/app/hooks/hooks';
import type { Category } from '@/app/types/types';
import {
  createCategory,
  deleteCategory,
  fetchCategories,
  fetchCategoryById,
  updateCategory,
} from '@/app/store/slices/categorySlice';
import CategoryHeader from '@/app/components/dashboard/admin/category/CategoryHeader';
import CategoryStats from '@/app/components/dashboard/admin/category/CategoryStats';
import CategoryFiltersBar from '@/app/components/dashboard/admin/category/CategoryFiltersBar';
import CategoryTable from '@/app/components/dashboard/admin/category/CategoryTable';
import CategoryDetailDialog from '@/app/components/dashboard/admin/category/CategoryDetailDialog';
import CategoryEditDialog from '@/app/components/dashboard/admin/category/CategoryEditDialog';
import CategoryDeleteDialog from '@/app/components/dashboard/admin/category/CategoryDeleteDialog';
import CategoryCreateDialog from '@/app/components/dashboard/admin/category/CategoryCreateDialog';

const formatDate = (value?: string) => {
  if (!value) return '—';
  return new Date(value).toLocaleDateString(undefined, {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  });
};

export default function CategoryManagementPage() {
  const dispatch = useAppDispatch();
  const { categories, selectedCategory, loading, loadingById, creating, updating, deleting, error, page, limit, total, totalPages } =
    useAppSelector((state) => state.category);

  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Category | null>(null);
  const [creatingCategory, setCreatingCategory] = useState(false);
  const [editing, setEditing] = useState<Category | null>(null);
  const [deletingCategoryItem, setDeletingCategoryItem] = useState<Category | null>(null);
  const [localPage, setLocalPage] = useState(1);
  const [localLimit, setLocalLimit] = useState(2);

  useEffect(() => {
    dispatch(fetchCategories({ page: localPage, limit: localLimit }));
  }, [dispatch, localPage, localLimit]);

  useEffect(() => {
    if (selectedCategory) {
      setSelected(selectedCategory);
    }
  }, [selectedCategory]);

  const filteredCategories = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return categories;

    return categories.filter(
      (category) =>
        category.name.toLowerCase().includes(query) ||
        category.description.toLowerCase().includes(query) ||
        category.id.toLowerCase().includes(query),
    );
  }, [categories, search]);

  const latestCategory = useMemo(() => {
    const sorted = [...categories].sort((a, b) => {
      const aDate = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const bDate = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return bDate - aDate;
    });
    return sorted[0] ?? null;
  }, [categories]);

  const stats = useMemo(() => {
    const averageDescriptionLength = categories.length
      ? Math.round(
          categories.reduce((sum, category) => sum + category.description.length, 0) /
            categories.length,
        )
      : 0;

    return {
      total: categories.length,
      filtered: filteredCategories.length,
      latest: latestCategory,
      avgDescriptionLength: averageDescriptionLength,
    };
  }, [categories, filteredCategories.length, latestCategory]);

  const handleRefresh = () => {
    dispatch(fetchCategories({ page: localPage, limit: localLimit }));
  };

  const handleView = async (category: Category) => {
    setSelected(category);
    try {
      const result = await dispatch(fetchCategoryById(category.id)).unwrap();
      setSelected(result);
    } catch {
      // fallback to list data if detail fetch fails
    }
  };

  const handleEdit = (category: Category) => {
    setEditing(category);
  };

  const handleCreate = () => {
    setCreatingCategory(true);
  };

  const handleDelete = (category: Category) => {
    setDeletingCategoryItem(category);
  };

  const handleSaveCategory = async (payload: { name: string; description: string }) => {
    if (!editing) return;
    await dispatch(updateCategory({ id: editing.id, data: payload })).unwrap();
    setEditing(null);
    dispatch(fetchCategories({ page: localPage, limit: localLimit }));
  };

  const handleCreateCategory = async (payload: { name: string; description: string }) => {
    await dispatch(createCategory(payload)).unwrap();
    setCreatingCategory(false);
    setLocalPage(1);
    dispatch(fetchCategories({ page: 1, limit: localLimit }));
  };

  const handleConfirmDelete = async () => {
    if (!deletingCategoryItem) return;
    await dispatch(deleteCategory(deletingCategoryItem.id)).unwrap();
    setDeletingCategoryItem(null);
    dispatch(fetchCategories({ page: localPage, limit: localLimit }));
  };

  const goToPage = (nextPage: number) => {
    setLocalPage(Math.max(1, Math.min(nextPage, totalPages || 1)));
  };

  return (
    <div className="space-y-6">
      <CategoryHeader
        totalCount={total || stats.total}
        filteredCount={stats.filtered}
        onRefresh={handleRefresh}
        onCreate={handleCreate}
      />

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <CategoryStats
        total={total || stats.total}
        filtered={stats.filtered}
        latestName={stats.latest?.name ?? '—'}
        latestDate={formatDate(stats.latest?.createdAt)}
        averageDescriptionLength={stats.avgDescriptionLength}
      />

      <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
        <CategoryFiltersBar search={search} onSearchChange={setSearch} />

        {loading ? (
          <div className="flex items-center justify-center gap-2 py-16 text-sm text-muted-foreground">
            <RefreshCw className="size-4 animate-spin" />
            Loading categories...
          </div>
        ) : filteredCategories.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-2 py-16 text-center">
            <Layers3 className="size-10 text-muted-foreground" />
            <p className="text-sm font-medium text-foreground">No categories found</p>
            <p className="text-xs text-muted-foreground max-w-md">
              Try a different search term or refresh the category list.
            </p>
          </div>
        ) : (
          <CategoryTable
            categories={filteredCategories}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}

        <div className="flex flex-col gap-3 border-t border-border bg-muted/20 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>
              Page <strong className="text-foreground">{page || localPage}</strong> of{' '}
              <strong className="text-foreground">{totalPages || 1}</strong>
            </span>
            <span className="hidden sm:inline">•</span>
            <span>
              {total || categories.length} total categories
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => goToPage((page || localPage) - 1)}
              disabled={(page || localPage) <= 1 || loading}
              className="inline-flex h-9 items-center justify-center rounded-md border border-border px-3 text-sm text-foreground disabled:opacity-40"
            >
              <ChevronLeft className="mr-1 size-4" />
              Prev
            </button>

            <button
              type="button"
              onClick={() => goToPage((page || localPage) + 1)}
              disabled={(page || localPage) >= (totalPages || 1) || loading}
              className="inline-flex h-9 items-center justify-center rounded-md border border-border px-3 text-sm text-foreground disabled:opacity-40"
            >
              Next
              <ChevronRight className="ml-1 size-4" />
            </button>

            <select
              value={localLimit}
              onChange={(e) => {
                setLocalLimit(Number(e.target.value));
                setLocalPage(1);
              }}
              className="h-9 rounded-md border border-border bg-background px-3 text-sm"
            >
              <option value={2}>2 / page</option>
              <option value={5}>5 / page</option>
              <option value={10}>10 / page</option>
            </select>
          </div>
        </div>
      </div>

      <CategoryDetailDialog
        category={selected}
        open={!!selected}
        loading={loadingById}
        onClose={() => setSelected(null)}
      />

      <CategoryEditDialog
        category={editing}
        open={!!editing}
        loading={updating}
        onClose={() => setEditing(null)}
        onSave={handleSaveCategory}
      />

      <CategoryDeleteDialog
        category={deletingCategoryItem}
        open={!!deletingCategoryItem}
        loading={deleting}
        onClose={() => setDeletingCategoryItem(null)}
        onConfirm={handleConfirmDelete}
      />

      <CategoryCreateDialog
        open={creatingCategory}
        loading={creating}
        onClose={() => setCreatingCategory(false)}
        onCreate={handleCreateCategory}
      />
    </div>
  );
}

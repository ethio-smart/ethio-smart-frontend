/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Category, CategoryApiResponse, CategoriesResponse } from '@/app/types/types';
import { api } from '@/app/utils/axiosinstance';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';


interface CategoryState {
  categories: Category[];
  loading: boolean;
  loadingById: boolean;
  creating: boolean;
  updating: boolean;
  deleting: boolean;
  error: string | null;
  selectedCategory: Category | null;
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

const initialState: CategoryState = {
  categories: [],
  loading: false,
  loadingById: false,
  creating: false,
  updating: false,
  deleting: false,
  error: null,
  selectedCategory: null,
  page: 1,
  limit: 0,
  total: 0,
  totalPages: 0,
};

const normalizeCategory = (category: CategoryApiResponse): Category => ({
  id: category.id,
  name: category.name,
  description: category.description,
  createdAt: category.createdAt,
});

const coerceCategoriesResponse = (payload: unknown): CategoriesResponse | null => {
  if (!payload || typeof payload !== 'object') return null;
  const typed = payload as Partial<CategoriesResponse> & { data?: unknown };
  const data = Array.isArray(typed.data) ? typed.data : [];
  return {
    page: Number(typed.page ?? 1),
    limit: Number(typed.limit ?? data.length ?? 0),
    total: Number(typed.total ?? data.length ?? 0),
    totalPages: Number(typed.totalPages ?? 1),
    data: data as CategoryApiResponse[],
  };
};

const upsertCategoryInList = (categories: Category[], updated: Category) => {
  const index = categories.findIndex((category) => category.id === updated.id);
  if (index === -1) return [updated, ...categories];

  const next = [...categories];
  next[index] = { ...next[index], ...updated };
  return next;
};

// FETCH
export const fetchCategories = createAsyncThunk(
  'category/fetchCategories',
  async (
    params: { page?: number; limit?: number } = {},
    { rejectWithValue },
  ) => {
    try {
      const page = params.page ?? 1;
      const limit = params.limit ?? 10;
      const res = await api.get('/categories', {
        params: { page, limit },
      });
      const response =
        coerceCategoriesResponse(res.data) ??
        coerceCategoriesResponse(res.data?.data);
      if (!response) {
        return {
          page,
          limit,
          total: 0,
          totalPages: 0,
          categories: [] as Category[],
        };
      }

      return {
        page: response.page,
        limit: response.limit,
        total: response.total,
        totalPages: response.totalPages,
        categories: response.data.map(normalizeCategory),
      };
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch');
    }
  }
);
//fetch category by id
export const fetchCategoryById = createAsyncThunk(
  'category/fetchCategoryById',
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await api.get(`/categories/${id}`);
      const payload = res.data?.data ?? res.data;
      if (payload && typeof payload === 'object') {
        return normalizeCategory(payload as CategoryApiResponse);
      }
      return payload as Category;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch');
    }
  }
);

export const updateCategory = createAsyncThunk(
  'category/updateCategory',
  async (
    {
      id,
      data,
    }: {
      id: string;
      data: Partial<Pick<Category, 'name' | 'description'>>;
    },
    { rejectWithValue },
  ) => {
    try {
      const res = await api.patch(`/categories/${id}`, data);
      const payload = res.data?.data ?? res.data;
      return normalizeCategory(payload as CategoryApiResponse);
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to update category');
    }
  },
);

export const createCategory = createAsyncThunk(
  'category/createCategory',
  async (
    data: Pick<Category, 'name' | 'description'>,
    { rejectWithValue },
  ) => {
    try {
      const res = await api.post('/categories', data);
      const payload = res.data?.data ?? res.data;
      return normalizeCategory(payload as CategoryApiResponse);
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to create category');
    }
  },
);

export const deleteCategory = createAsyncThunk(
  'category/deleteCategory',
  async (id: string, { rejectWithValue }) => {
    try {
      await api.delete(`/categories/${id}`);
      return id;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to delete category');
    }
  },
);

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // FETCH CATEGORIES
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload.categories;
        state.page = action.payload.page;
        state.limit = action.payload.limit;
        state.total = action.payload.total;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
        // FETCH CATEGORY BY ID
    builder
      .addCase(fetchCategoryById.pending, (state) => {
        state.loadingById = true;
        state.error = null;
        })
        .addCase(fetchCategoryById.fulfilled, (state, action: PayloadAction<Category>) => {
            state.loadingById = false;
            state.selectedCategory = action.payload;
            // const index = state.categories.findIndex(cat => cat.id === action.payload.id);
            // if (index !== -1) {
            //     state.categories[index] = action.payload;
            // } else {
            //     state.categories.push(action.payload);
            // }
        })
        .addCase(fetchCategoryById.rejected, (state, action) => {
          state.loadingById = false;
            state.error = action.payload as string;
        });

    builder
      .addCase(createCategory.pending, (state) => {
        state.creating = true;
        state.error = null;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.creating = false;
        state.categories = upsertCategoryInList(state.categories, action.payload);
        state.total = state.total + 1;
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.creating = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(updateCategory.pending, (state) => {
        state.updating = true;
        state.error = null;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.updating = false;
        state.selectedCategory = action.payload;
        state.categories = upsertCategoryInList(state.categories, action.payload);
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.updating = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(deleteCategory.pending, (state) => {
        state.deleting = true;
        state.error = null;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.deleting = false;
        state.categories = state.categories.filter((category) => category.id !== action.payload);
        if (state.selectedCategory?.id === action.payload) {
          state.selectedCategory = null;
        }
        state.total = Math.max(0, state.total - 1);
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.deleting = false;
        state.error = action.payload as string;
      });
  },
});

export default categorySlice.reducer;
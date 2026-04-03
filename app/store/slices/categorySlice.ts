/* eslint-disable @typescript-eslint/no-explicit-any */
import { Category } from '@/app/types/types';
import { api } from '@/app/utils/axiosinstance';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';


interface CategoryState {
  categories: Category[];
  loading: boolean;
  error: string | null;
  selectedCategory: Category | null;
}

const initialState: CategoryState = {
  categories: [],
  loading: false,
  error: null,
  selectedCategory: null,
};

// FETCH
export const fetchCategories = createAsyncThunk(
  'category/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get('/categories');
      // console.log('category response--fetch',res)
      return res.data.data; 
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch');
    }
  }
);
//fetch category by id
export const fetchCategoryById = createAsyncThunk(
  'category/fetchCategoryById',
  async (id: string, { rejectWithValue }) => {
    console.log('💥💥💥')
    try {
      const res = await api.get(`/categories/${id}`);
      // console.log('category response--fetch',res)
      // console.log('category response--fetch',res.data)
      return res.data; 
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch');
    }
  }
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
      })
      .addCase(fetchCategories.fulfilled, (state, action: PayloadAction<Category[]>) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
        // FETCH CATEGORY BY ID
    builder
      .addCase(fetchCategoryById.pending, (state) => {
        state.loading = true;
        })
        .addCase(fetchCategoryById.fulfilled, (state, action: PayloadAction<Category>) => {
            state.loading = false;
            state.selectedCategory = action.payload;
            // const index = state.categories.findIndex(cat => cat.id === action.payload.id);
            // if (index !== -1) {
            //     state.categories[index] = action.payload;
            // } else {
            //     state.categories.push(action.payload);
            // }
        })
        .addCase(fetchCategoryById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });
  },
});

export default categorySlice.reducer;
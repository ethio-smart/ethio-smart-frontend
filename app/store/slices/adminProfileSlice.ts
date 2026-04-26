/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { api } from '@/app/utils/axiosinstance';
import type { AdminMeApiResponse, AdminProfile } from '@/app/types/types';

type AdminProfileState = {
  profile: AdminProfile | null;
  loading: boolean;
  error: string | null;
};

const initialState: AdminProfileState = {
  profile: null,
  loading: false,
  error: null,
};

const maskPassword = (value?: string) => {
  if (!value) return '********';
  if (value.length <= 10) return '********';
  return `${value.slice(0, 10)}...`;
};

const normalizeAdminProfile = (payload: AdminMeApiResponse): AdminProfile => ({
  id: payload.id,
  firstName: payload.firstName,
  lastName: payload.lastName,
  fullName: `${payload.firstName} ${payload.lastName}`.trim(),
  email: payload.email,
  phone: payload.phone,
  role: payload.role,
  createdAt: payload.createdAt,
  updatedAt: payload.updatedAt,
  isVerified: payload.isVerified,
  imageurl: payload.imageurl,
  maskedPassword: maskPassword(payload.password),
});

export const fetchAdminProfile = createAsyncThunk(
  'adminProfile/fetchAdminProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/admin/me');
      const payload = (response.data?.data ?? response.data) as AdminMeApiResponse;
      return normalizeAdminProfile(payload);
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch admin profile',
      );
    }
  },
);

const adminProfileSlice = createSlice({
  name: 'adminProfile',
  initialState,
  reducers: {
    clearAdminProfileError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchAdminProfile.fulfilled,
        (state, action: PayloadAction<AdminProfile>) => {
          state.loading = false;
          state.profile = action.payload;
        },
      )
      .addCase(fetchAdminProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearAdminProfileError } = adminProfileSlice.actions;
export default adminProfileSlice.reducer;

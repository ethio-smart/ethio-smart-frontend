/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { api } from '@/app/utils/axiosinstance';
import type {
  CreateOfficerPayload,
  OfficerApiResponse,
  OfficerListItem,
} from '@/app/types/types';

type AdminOfficersState = {
  officers: OfficerListItem[];
  loading: boolean;
  creating: boolean;
  error: string | null;
};

const initialState: AdminOfficersState = {
  officers: [],
  loading: false,
  creating: false,
  error: null,
};

const formatJoinedDate = (createdAt: string) =>
  new Date(createdAt).toLocaleDateString(undefined, {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  });

const normalizeOfficer = (officer: OfficerApiResponse): OfficerListItem => ({
  id: officer.id,
  firstName: officer.firstName,
  lastName: officer.lastName,
  fullName: `${officer.firstName} ${officer.lastName}`.trim(),
  email: officer.email,
  phone: officer.phone,
  role: officer.role,
  createdAt: officer.createdAt,
  updatedAt: officer.updatedAt,
  isVerified: officer.isVerified,
  imageurl: officer.imageurl,
});

const coerceOfficerArray = (payload: unknown): OfficerApiResponse[] => {
  if (Array.isArray(payload)) return payload as OfficerApiResponse[];

  if (payload && typeof payload === 'object') {
    const typedPayload = payload as Record<string, unknown>;
    const nestedCandidates = [typedPayload.data, typedPayload.officers, typedPayload.result];

    for (const candidate of nestedCandidates) {
      if (Array.isArray(candidate)) return candidate as OfficerApiResponse[];
    }

    if (typedPayload.id && typedPayload.firstName && typedPayload.lastName) {
      return [payload as OfficerApiResponse];
    }
  }

  return [];
};

const upsertOfficer = (officers: OfficerListItem[], officer: OfficerListItem) => {
  const index = officers.findIndex((item) => item.id === officer.id);
  if (index === -1) {
    return [officer, ...officers].sort((a, b) => {
      const aDate = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const bDate = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return bDate - aDate;
    });
  }

  const next = [...officers];
  next[index] = { ...next[index], ...officer };
  return next;
};

export const fetchAdminOfficers = createAsyncThunk(
  'adminOfficers/fetchAdminOfficers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/admin/officers');
      const officers = coerceOfficerArray(response.data?.data ?? response.data);
      return officers.map(normalizeOfficer).sort((a, b) => {
        const aDate = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const bDate = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return bDate - aDate;
      });
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch officers',
      );
    }
  },
);

export const createAdminOfficer = createAsyncThunk(
  'adminOfficers/createAdminOfficer',
  async (payload: CreateOfficerPayload, { rejectWithValue }) => {
    try {
      const response = await api.post('/admin/officers', payload);
      const officer = response.data?.data ?? response.data;
      return normalizeOfficer(officer as OfficerApiResponse);
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to create officer',
      );
    }
  },
);

const adminOfficersSlice = createSlice({
  name: 'adminOfficers',
  initialState,
  reducers: {
    clearAdminOfficersError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminOfficers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchAdminOfficers.fulfilled,
        (state, action: PayloadAction<OfficerListItem[]>) => {
          state.loading = false;
          state.officers = action.payload;
        },
      )
      .addCase(fetchAdminOfficers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(createAdminOfficer.pending, (state) => {
        state.creating = true;
        state.error = null;
      })
      .addCase(createAdminOfficer.fulfilled, (state, action) => {
        state.creating = false;
        state.officers = upsertOfficer(state.officers, action.payload);
      })
      .addCase(createAdminOfficer.rejected, (state, action) => {
        state.creating = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearAdminOfficersError } = adminOfficersSlice.actions;
export default adminOfficersSlice.reducer;

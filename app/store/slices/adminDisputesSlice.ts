/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import type { Dispute, DisputeResolutionBody } from '@/app/types/types';
import { api } from '@/app/utils/axiosinstance';

type AdminDisputesState = {
  disputes: Dispute[];
  selectedDispute: Dispute | null;
  loadingList: boolean;
  loadingDetail: boolean;
  actionLoading: boolean;
  error: string | null;
};

const initialState: AdminDisputesState = {
  disputes: [],
  selectedDispute: null,
  loadingList: false,
  loadingDetail: false,
  actionLoading: false,
  error: null,
};

const toDisputeArray = (payload: unknown): Dispute[] => {
  if (Array.isArray(payload)) return payload as Dispute[];

  if (payload && typeof payload === 'object') {
    const typedPayload = payload as Record<string, unknown>;
    const candidates = [typedPayload.data, typedPayload.disputes, typedPayload.result, typedPayload.items];

    for (const candidate of candidates) {
      if (Array.isArray(candidate)) {
        return candidate as Dispute[];
      }
    }

    if (typedPayload.id) {
      return [payload as Dispute];
    }
  }

  return [];
};

const toSingleDispute = (payload: unknown): Dispute | null => {
  const disputes = toDisputeArray(payload);
  return disputes.length > 0 ? disputes[0] : null;
};

const getErrorMessage = (error: any, fallback: string) =>
  error?.response?.data?.message || fallback;

export const fetchAdminDisputes = createAsyncThunk(
  'adminDisputes/fetchAdminDisputes',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/admin/disputes');
      return toDisputeArray(response.data?.data ?? response.data);
    } catch (error: any) {
      return rejectWithValue(getErrorMessage(error, 'Failed to fetch disputes'));
    }
  },
);

export const fetchAdminDisputeById = createAsyncThunk(
  'adminDisputes/fetchAdminDisputeById',
  async (disputeId: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/admin/disputes/${disputeId}`);
      const dispute = toSingleDispute(response.data?.data ?? response.data);
      if (!dispute) {
        return rejectWithValue('Dispute not found');
      }
      return dispute;
    } catch (error: any) {
      return rejectWithValue(getErrorMessage(error, 'Failed to fetch dispute'));
    }
  },
);

export const resolveAdminDispute = createAsyncThunk(
  'adminDisputes/resolveAdminDispute',
  async (
    {
      disputeId,
      body,
    }: {
      disputeId: string;
      body: DisputeResolutionBody;
    },
    { rejectWithValue },
  ) => {
    try {
      const response = await api.patch(`/admin/disputes/${disputeId}/resolve`, body);
      return toSingleDispute(response.data?.data ?? response.data) ?? { id: disputeId };
    } catch (error: any) {
      return rejectWithValue(getErrorMessage(error, 'Failed to resolve dispute'));
    }
  },
);

const updateDisputeInList = (disputes: Dispute[], updated: Dispute | null) => {
  if (!updated?.id) return disputes;
  return disputes.map((dispute) =>
    dispute.id === updated.id ? { ...dispute, ...updated } : dispute,
  );
};

const adminDisputesSlice = createSlice({
  name: 'adminDisputes',
  initialState,
  reducers: {
    clearAdminDisputesError: (state) => {
      state.error = null;
    },
    clearSelectedDispute: (state) => {
      state.selectedDispute = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminDisputes.pending, (state) => {
        state.loadingList = true;
        state.error = null;
      })
      .addCase(fetchAdminDisputes.fulfilled, (state, action) => {
        state.loadingList = false;
        state.disputes = action.payload;
      })
      .addCase(fetchAdminDisputes.rejected, (state, action) => {
        state.loadingList = false;
        state.error = action.payload as string;
      })
      .addCase(fetchAdminDisputeById.pending, (state) => {
        state.loadingDetail = true;
        state.error = null;
      })
      .addCase(fetchAdminDisputeById.fulfilled, (state, action) => {
        state.loadingDetail = false;
        state.selectedDispute = action.payload;
      })
      .addCase(fetchAdminDisputeById.rejected, (state, action) => {
        state.loadingDetail = false;
        state.error = action.payload as string;
      })
      .addCase(resolveAdminDispute.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })
      .addCase(resolveAdminDispute.fulfilled, (state, action) => {
        state.actionLoading = false;
        const updatedDispute = {
          ...(action.payload as Dispute),
          status: 'RESOLVED' as const,
          resolved: true,
        };
        state.disputes = updateDisputeInList(state.disputes, updatedDispute);
        if (state.selectedDispute?.id === updatedDispute.id) {
          state.selectedDispute = {
            ...state.selectedDispute,
            ...updatedDispute,
          };
        }
      })
      .addCase(resolveAdminDispute.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearAdminDisputesError, clearSelectedDispute } = adminDisputesSlice.actions;

export default adminDisputesSlice.reducer;

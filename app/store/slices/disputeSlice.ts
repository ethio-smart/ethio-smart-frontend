/* eslint-disable @typescript-eslint/no-explicit-any */

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { api } from '@/app/utils/axiosinstance';
import { Dispute } from '@/app/types/types';



type DisputeState = {
  creating: boolean;
  success: boolean;
  error: string | null;
};

// INITIAL STATE

const initialState: DisputeState = {
  creating: false,
  success: false,
  error: null,
};


export const createDispute = createAsyncThunk(
  'dispute/createDispute',
  async (data: Dispute, { rejectWithValue }) => {
    try {
      const res = await api.post('/disputes', data);

      console.log('createDispute response:', res.data);

      return res.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to create dispute'
      );
    }
  }
);

const disputeSlice = createSlice({
  name: 'dispute',
  initialState,
  reducers: {
    clearDisputeState: (state) => {
      state.creating = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder

      /* CREATE DISPUTE */
      .addCase(createDispute.pending, (state) => {
        state.creating = true;
        state.error = null;
        state.success = false;
      })

      .addCase(
        createDispute.fulfilled,
        (state, action: PayloadAction<Dispute>) => {
          state.creating = false;
          state.success = true;
        }
      )

      .addCase(createDispute.rejected, (state, action) => {
        state.creating = false;
        state.error = action.payload as string;
      });
  },
});


export const { clearDisputeState } = disputeSlice.actions;
export default disputeSlice.reducer;
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import type { Payment } from "@/app/types/types";
import { api } from "@/app/utils/axiosinstance";

type AdminPaymentsState = {
  payments: Payment[];
  selectedPayment: Payment | null;
  loadingList: boolean;
  loadingDetail: boolean;
  error: string | null;
};

const initialState: AdminPaymentsState = {
  payments: [],
  selectedPayment: null,
  loadingList: false,
  loadingDetail: false,
  error: null,
};

const getErrorMessage = (error: any, fallback: string) =>
  error?.response?.data?.message || fallback;

const toPaymentArray = (payload: unknown): Payment[] => {
  if (Array.isArray(payload)) return payload as Payment[];

  if (payload && typeof payload === "object") {
    const typedPayload = payload as Record<string, unknown>;
    const candidates = [typedPayload.data, typedPayload.items, typedPayload.result];

    for (const candidate of candidates) {
      if (Array.isArray(candidate)) {
        return candidate as Payment[];
      }
    }

    if (typedPayload.id) {
      return [payload as Payment];
    }
  }

  return [];
};

const toSinglePayment = (payload: unknown): Payment | null => {
  const payments = toPaymentArray(payload);
  return payments[0] ?? null;
};

export const fetchAdminPayments = createAsyncThunk(
  "adminPayments/fetchAdminPayments",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/admin/payments");
      return toPaymentArray(response.data?.data ?? response.data);
    } catch (error: any) {
      return rejectWithValue(getErrorMessage(error, "Failed to fetch payments"));
    }
  },
);

export const fetchAdminPaymentById = createAsyncThunk(
  "adminPayments/fetchAdminPaymentById",
  async (paymentId: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/admin/payments/${paymentId}`);
      const payment = toSinglePayment(response.data?.data ?? response.data);
      if (!payment) {
        return rejectWithValue("Payment not found");
      }
      return payment;
    } catch (error: any) {
      return rejectWithValue(getErrorMessage(error, "Failed to fetch payment details"));
    }
  },
);

const adminPaymentsSlice = createSlice({
  name: "adminPayments",
  initialState,
  reducers: {
    clearAdminPaymentsError: (state) => {
      state.error = null;
    },
    clearSelectedPayment: (state) => {
      state.selectedPayment = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminPayments.pending, (state) => {
        state.loadingList = true;
        state.error = null;
      })
      .addCase(fetchAdminPayments.fulfilled, (state, action) => {
        state.loadingList = false;
        state.payments = action.payload;
      })
      .addCase(fetchAdminPayments.rejected, (state, action) => {
        state.loadingList = false;
        state.error = action.payload as string;
      })
      .addCase(fetchAdminPaymentById.pending, (state) => {
        state.loadingDetail = true;
        state.error = null;
      })
      .addCase(fetchAdminPaymentById.fulfilled, (state, action) => {
        state.loadingDetail = false;
        state.selectedPayment = action.payload;
      })
      .addCase(fetchAdminPaymentById.rejected, (state, action) => {
        state.loadingDetail = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearAdminPaymentsError, clearSelectedPayment } =
  adminPaymentsSlice.actions;

export default adminPaymentsSlice.reducer;
